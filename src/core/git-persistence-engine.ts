/**
 * Git-Based Persistence Engine for HeadElf
 *
 * Leverages Git repository model for data persistence, providing:
 * - Decision history tracking with full audit trail
 * - Context retention across sessions
 * - Version control for all executive decisions
 * - Distributed backup through Git's nature
 */

import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface DecisionRecord {
    id: string;
    timestamp: string;
    executiveRole: string;
    decisionType: string;
    query: string;
    context: any;
    recommendation: any;
    confidence: number;
    userId: string;
    sessionId: string;
    gitCommitHash?: string;
}

export interface ExecutiveContext {
    userId: string;
    organizationProfile: any;
    rolePreferences: any;
    historicalDecisions: string[];
    learningPatterns: any;
    customExtensions: string[];
    lastUpdated: string;
}

export interface AnalyticsSnapshot {
    timeRange: { start: string; end: string; };
    totalDecisions: number;
    decisionsByRole: Record<string, number>;
    confidenceMetrics: {
        average: number;
        distribution: Record<string, number>;
    };
    mostActiveAreas: string[];
    trendAnalysis: any;
}

export class GitPersistenceEngine {
    private readonly repoRoot: string;
    private readonly dataDir: string;
    private readonly decisionsDir: string;
    private readonly contextsDir: string;
    private readonly analyticsDir: string;
    private readonly extensionsDir: string;

    constructor(repoRoot?: string) {
        this.repoRoot = repoRoot || process.cwd();
        this.dataDir = path.join(this.repoRoot, 'data');
        this.decisionsDir = path.join(this.dataDir, 'decisions');
        this.contextsDir = path.join(this.dataDir, 'contexts');
        this.analyticsDir = path.join(this.dataDir, 'analytics');
        this.extensionsDir = path.join(this.dataDir, 'extensions');

        this.initializeDirectories();
    }

    /**
     * Initialize data directory structure
     */
    private initializeDirectories(): void {
        const dirs = [
            this.dataDir,
            this.decisionsDir,
            this.contextsDir,
            this.analyticsDir,
            this.extensionsDir,
            path.join(this.contextsDir, 'users'),
            path.join(this.decisionsDir, 'by-role'),
            path.join(this.decisionsDir, 'by-date'),
            path.join(this.analyticsDir, 'snapshots'),
            path.join(this.analyticsDir, 'trends')
        ];

        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });

        // Create .gitignore for sensitive data if needed
        const gitignorePath = path.join(this.dataDir, '.gitignore');
        if (!fs.existsSync(gitignorePath)) {
            const gitignoreContent = `# Sensitive data patterns
*.key
*.secret
**/private/
**/temp/
**.tmp
`;
            fs.writeFileSync(gitignorePath, gitignoreContent);
        }
    }

    /**
     * Persist executive decision with Git commit
     */
    async persistDecision(decision: DecisionRecord): Promise<string> {
        const timestamp = new Date().toISOString();
        const dateStr = timestamp.split('T')[0];

        // Generate decision file paths
        const decisionId = decision.id || this.generateDecisionId();
        const fileName = `${dateStr}-${decision.executiveRole.toLowerCase()}-${decisionId}.json`;

        const mainPath = path.join(this.decisionsDir, fileName);
        const rolePath = path.join(this.decisionsDir, 'by-role', decision.executiveRole.toLowerCase(), fileName);
        const datePath = path.join(this.decisionsDir, 'by-date', dateStr, fileName);

        // Ensure subdirectories exist
        [
            path.dirname(rolePath),
            path.dirname(datePath)
        ].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });

        // Prepare decision record with metadata
        const enhancedDecision: DecisionRecord = {
            ...decision,
            id: decisionId,
            timestamp,
        };

        // Write decision to multiple organized locations
        const decisionJson = JSON.stringify(enhancedDecision, null, 2);
        fs.writeFileSync(mainPath, decisionJson);
        fs.writeFileSync(rolePath, decisionJson);
        fs.writeFileSync(datePath, decisionJson);

        // Create symbolic links for cross-referencing
        try {
            const mainRelative = path.relative(path.dirname(rolePath), mainPath);
            const dateRelative = path.relative(path.dirname(datePath), mainPath);

            if (!fs.existsSync(rolePath)) {
                fs.symlinkSync(mainRelative, rolePath);
            }
            if (!fs.existsSync(datePath)) {
                fs.symlinkSync(dateRelative, datePath);
            }
        } catch (error) {
            // Symbolic link creation optional - continue without if filesystem doesn't support
        }

        // Update user context with this decision
        await this.updateUserContext(decision.userId, {
            lastDecision: decisionId,
            lastActivity: timestamp,
            decisionCount: await this.getUserDecisionCount(decision.userId) + 1
        });

        // Commit to Git if in a Git repository
        const commitHash = await this.commitToGit([
            mainPath,
            rolePath,
            datePath
        ], `${decision.executiveRole} decision: ${decision.decisionType} - ${decision.query.substring(0, 50)}...`);

        enhancedDecision.gitCommitHash = commitHash;

        // Update the files with commit hash
        const finalDecisionJson = JSON.stringify(enhancedDecision, null, 2);
        fs.writeFileSync(mainPath, finalDecisionJson);

        return decisionId;
    }

    /**
     * Retrieve decision history for analysis
     */
    async getDecisionHistory(filters?: {
        userId?: string;
        executiveRole?: string;
        dateRange?: { start: string; end: string; };
        decisionType?: string;
        limit?: number;
    }): Promise<DecisionRecord[]> {
        const decisions: DecisionRecord[] = [];
        const searchDirs = [this.decisionsDir];

        // Add specific subdirectories based on filters
        if (filters?.executiveRole) {
            searchDirs.push(path.join(this.decisionsDir, 'by-role', filters.executiveRole.toLowerCase()));
        }

        if (filters?.dateRange?.start) {
            const startDate = filters.dateRange.start.split('T')[0];
            searchDirs.push(path.join(this.decisionsDir, 'by-date', startDate));
        }

        for (const searchDir of searchDirs) {
            if (!fs.existsSync(searchDir)) continue;

            const files = fs.readdirSync(searchDir)
                .filter(file => file.endsWith('.json'))
                .sort()
                .reverse(); // Most recent first

            for (const file of files) {
                if (filters?.limit && decisions.length >= filters.limit) break;

                try {
                    const filePath = path.join(searchDir, file);
                    const content = fs.readFileSync(filePath, 'utf-8');
                    const decision: DecisionRecord = JSON.parse(content);

                    // Apply filters
                    if (filters?.userId && decision.userId !== filters.userId) continue;
                    if (filters?.decisionType && decision.decisionType !== filters.decisionType) continue;
                    if (filters?.dateRange) {
                        const decisionDate = new Date(decision.timestamp);
                        const startDate = new Date(filters.dateRange.start);
                        const endDate = new Date(filters.dateRange.end);
                        if (decisionDate < startDate || decisionDate > endDate) continue;
                    }

                    decisions.push(decision);
                } catch (error) {
                    console.warn(`Error reading decision file ${file}:`, error);
                }
            }
        }

        // Remove duplicates (in case file was found in multiple directories)
        const uniqueDecisions = decisions.reduce((unique, decision) => {
            if (!unique.find(d => d.id === decision.id)) {
                unique.push(decision);
            }
            return unique;
        }, [] as DecisionRecord[]);

        return uniqueDecisions.slice(0, filters?.limit || uniqueDecisions.length);
    }

    /**
     * Persist and retrieve user context
     */
    async persistUserContext(userId: string, context: ExecutiveContext): Promise<void> {
        const contextPath = path.join(this.contextsDir, 'users', `${userId}.json`);
        const contextDir = path.dirname(contextPath);

        if (!fs.existsSync(contextDir)) {
            fs.mkdirSync(contextDir, { recursive: true });
        }

        const enhancedContext = {
            ...context,
            lastUpdated: new Date().toISOString()
        };

        fs.writeFileSync(contextPath, JSON.stringify(enhancedContext, null, 2));

        // Commit context updates
        await this.commitToGit([contextPath], `Update user context: ${userId}`);
    }

    async getUserContext(userId: string): Promise<ExecutiveContext | null> {
        const contextPath = path.join(this.contextsDir, 'users', `${userId}.json`);

        if (!fs.existsSync(contextPath)) {
            return null;
        }

        try {
            const content = fs.readFileSync(contextPath, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            console.warn(`Error reading user context for ${userId}:`, error);
            return null;
        }
    }

    /**
     * Generate analytics snapshots
     */
    async generateAnalytics(timeRange?: { start: string; end: string; }): Promise<AnalyticsSnapshot> {
        const defaultRange = {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
            end: new Date().toISOString()
        };

        const range = timeRange || defaultRange;
        const decisions = await this.getDecisionHistory({ dateRange: range });

        const analytics: AnalyticsSnapshot = {
            timeRange: range,
            totalDecisions: decisions.length,
            decisionsByRole: {},
            confidenceMetrics: {
                average: 0,
                distribution: {}
            },
            mostActiveAreas: [],
            trendAnalysis: {}
        };

        // Calculate analytics
        decisions.forEach(decision => {
            // Decisions by role
            analytics.decisionsByRole[decision.executiveRole] =
                (analytics.decisionsByRole[decision.executiveRole] || 0) + 1;

            // Confidence distribution
            const confidenceBucket = Math.floor(decision.confidence * 10) / 10;
            analytics.confidenceMetrics.distribution[confidenceBucket.toString()] =
                (analytics.confidenceMetrics.distribution[confidenceBucket.toString()] || 0) + 1;
        });

        // Average confidence
        analytics.confidenceMetrics.average =
            decisions.reduce((sum, d) => sum + d.confidence, 0) / decisions.length || 0;

        // Most active areas (by decision type)
        const decisionTypes: Record<string, number> = {};
        decisions.forEach(d => {
            decisionTypes[d.decisionType] = (decisionTypes[d.decisionType] || 0) + 1;
        });

        analytics.mostActiveAreas = Object.entries(decisionTypes)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([type]) => type);

        // Persist analytics snapshot
        const timestamp = new Date().toISOString();
        const snapshotPath = path.join(this.analyticsDir, 'snapshots', `${timestamp.split('T')[0]}.json`);
        fs.writeFileSync(snapshotPath, JSON.stringify(analytics, null, 2));

        await this.commitToGit([snapshotPath], `Analytics snapshot: ${range.start} to ${range.end}`);

        return analytics;
    }

    /**
     * Git integration methods
     */
    private async commitToGit(filePaths: string[], message: string): Promise<string | null> {
        try {
            // Check if we're in a Git repository
            await execAsync('git rev-parse --git-dir', { cwd: this.repoRoot });

            // Add files to Git
            for (const filePath of filePaths) {
                const relativePath = path.relative(this.repoRoot, filePath);
                await execAsync(`git add "${relativePath}"`, { cwd: this.repoRoot });
            }

            // Commit with HeadElf signature
            const commitMessage = `[HeadElf] ${message}

Generated by HeadElf Executive Intelligence System
Timestamp: ${new Date().toISOString()}
Files: ${filePaths.length} file(s)`;

            const { stdout } = await execAsync(`git commit -m "${commitMessage}"`, {
                cwd: this.repoRoot
            });

            // Get commit hash
            const { stdout: hash } = await execAsync('git rev-parse HEAD', {
                cwd: this.repoRoot
            });

            return hash.trim();
        } catch (error) {
            // Not in a Git repository or Git operation failed - continue without Git
            console.warn('Git operation failed (continuing without version control):', error);
            return null;
        }
    }

    /**
     * Utility methods
     */
    private generateDecisionId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    private async updateUserContext(userId: string, updates: any): Promise<void> {
        let context = await this.getUserContext(userId);

        if (!context) {
            context = {
                userId,
                organizationProfile: {},
                rolePreferences: {},
                historicalDecisions: [],
                learningPatterns: {},
                customExtensions: [],
                lastUpdated: new Date().toISOString()
            };
        }

        Object.assign(context, updates, {
            lastUpdated: new Date().toISOString()
        });

        await this.persistUserContext(userId, context);
    }

    private async getUserDecisionCount(userId: string): Promise<number> {
        const decisions = await this.getDecisionHistory({ userId });
        return decisions.length;
    }

    /**
     * Extension management using Git repositories
     */
    async registerExtension(extensionRepo: string, version?: string): Promise<boolean> {
        try {
            const extensionName = path.basename(extensionRepo).replace('.git', '');
            const extensionPath = path.join(this.extensionsDir, extensionName);

            if (fs.existsSync(extensionPath)) {
                // Update existing extension
                await execAsync('git pull origin main', { cwd: extensionPath });
            } else {
                // Clone new extension
                await execAsync(`git clone ${extensionRepo} ${extensionPath}`, {
                    cwd: this.extensionsDir
                });
            }

            // Checkout specific version if provided
            if (version) {
                await execAsync(`git checkout ${version}`, { cwd: extensionPath });
            }

            // Register in extensions manifest
            const manifestPath = path.join(this.extensionsDir, 'manifest.json');
            let manifest: any = {};

            if (fs.existsSync(manifestPath)) {
                manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
            }

            manifest[extensionName] = {
                repository: extensionRepo,
                version: version || 'main',
                installedAt: new Date().toISOString(),
                path: extensionPath
            };

            fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

            await this.commitToGit([manifestPath], `Register extension: ${extensionName}`);

            return true;
        } catch (error) {
            console.error('Extension registration failed:', error);
            return false;
        }
    }
}