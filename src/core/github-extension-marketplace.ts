/**
 * GitHub-Based Extension Marketplace for HeadElf
 *
 * Leverages GitHub's repository ecosystem to provide:
 * - Extension discovery through GitHub topics and search
 * - Peer review through GitHub pull request process
 * - Distribution via Git clone/fork model
 * - Version management with Git tags and releases
 * - Community governance through GitHub issues and discussions
 */

import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface ExtensionMetadata {
    name: string;
    version: string;
    description: string;
    author: string;
    repository: string;
    homepage?: string;
    license: string;
    keywords: string[];
    headelfVersion: string;
    supportedRoles: string[];
    industries: string[];
    installationInstructions: string;
    dependencies: Record<string, string>;
    createdAt: string;
    updatedAt: string;
}

export interface ExtensionRegistry {
    extensions: Record<string, ExtensionMetadata>;
    lastUpdated: string;
    registryVersion: string;
    totalExtensions: number;
    categories: Record<string, string[]>;
}

export interface ExtensionReview {
    extensionName: string;
    reviewer: string;
    rating: number; // 1-5
    reviewText: string;
    pros: string[];
    cons: string[];
    recommendedFor: string[];
    createdAt: string;
    githubPullRequest?: string;
}

export interface InstallationResult {
    success: boolean;
    extensionName: string;
    installedVersion: string;
    installPath: string;
    message: string;
    warnings?: string[];
    errors?: string[];
}

export interface MarketplaceConfig {
    registryRepository: string;
    extensionPrefix: string;
    requiredTopics: string[];
    approvedAuthors: string[];
    minimumStars: number;
    reviewRequirement: boolean;
}

export class GitHubExtensionMarketplace {
    private readonly repoRoot: string;
    private readonly extensionsDir: string;
    private readonly marketplaceDir: string;
    private readonly registryFile: string;
    private readonly reviewsDir: string;
    private readonly config: MarketplaceConfig;

    constructor(repoRoot?: string) {
        this.repoRoot = repoRoot || process.cwd();
        this.extensionsDir = path.join(this.repoRoot, 'extensions');
        this.marketplaceDir = path.join(this.repoRoot, 'marketplace');
        this.registryFile = path.join(this.marketplaceDir, 'registry.json');
        this.reviewsDir = path.join(this.marketplaceDir, 'reviews');

        this.config = this.loadMarketplaceConfig();
        this.initializeMarketplaceStructure();
    }

    private loadMarketplaceConfig(): MarketplaceConfig {
        const configPath = path.join(this.repoRoot, 'marketplace.config.json');

        const defaultConfig: MarketplaceConfig = {
            registryRepository: 'https://github.com/pauljbernard/headElf',
            extensionPrefix: 'headelf-extension-',
            requiredTopics: ['headelf-extension', 'executive-intelligence'],
            approvedAuthors: ['pauljbernard'], // Bootstrap with core maintainer
            minimumStars: 1,
            reviewRequirement: false // Will be enabled as community grows
        };

        try {
            if (fs.existsSync(configPath)) {
                const configContent = fs.readFileSync(configPath, 'utf-8');
                return { ...defaultConfig, ...JSON.parse(configContent) };
            }
        } catch (error) {
            console.warn('Error loading marketplace config, using defaults:', error);
        }

        // Create default config file
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
        return defaultConfig;
    }

    private initializeMarketplaceStructure(): void {
        const dirs = [
            this.extensionsDir,
            this.marketplaceDir,
            this.reviewsDir,
            path.join(this.marketplaceDir, 'categories'),
            path.join(this.marketplaceDir, 'featured'),
            path.join(this.marketplaceDir, 'community')
        ];

        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });

        // Initialize empty registry if it doesn't exist
        if (!fs.existsSync(this.registryFile)) {
            this.initializeRegistry();
        }
    }

    private initializeRegistry(): void {
        const initialRegistry: ExtensionRegistry = {
            extensions: {},
            lastUpdated: new Date().toISOString(),
            registryVersion: '1.0.0',
            totalExtensions: 0,
            categories: {
                'industry-verticals': [],
                'executive-roles': [],
                'analytics': [],
                'integrations': [],
                'utilities': []
            }
        };

        fs.writeFileSync(this.registryFile, JSON.stringify(initialRegistry, null, 2));
    }

    /**
     * Extension Discovery and Registration
     */
    async discoverExtensions(searchTerms?: string[]): Promise<ExtensionMetadata[]> {
        console.log('🔍 Discovering HeadElf extensions on GitHub...');

        // In a real implementation, this would use GitHub API to search for repositories
        // with specific topics like 'headelf-extension', 'executive-intelligence'

        // For now, we'll simulate with known extension patterns
        const mockExtensions: ExtensionMetadata[] = [
            {
                name: 'headelf-extension-financial-services',
                version: '1.0.0',
                description: 'Financial services industry vertical extension with regulatory compliance frameworks',
                author: 'community-contributor',
                repository: 'https://github.com/community/headelf-extension-financial-services',
                license: 'MIT',
                keywords: ['financial-services', 'banking', 'compliance', 'basel-iii'],
                headelfVersion: '>=1.0.0',
                supportedRoles: ['CFO', 'CISO', 'CLO'],
                industries: ['financial-services'],
                installationInstructions: 'git clone and run install script',
                dependencies: {},
                createdAt: '2024-01-15T00:00:00Z',
                updatedAt: '2024-02-26T00:00:00Z'
            },
            {
                name: 'headelf-extension-healthcare',
                version: '1.2.0',
                description: 'Healthcare industry extension with HIPAA compliance and medical device regulations',
                author: 'healthcare-tech-corp',
                repository: 'https://github.com/healthcare-tech/headelf-extension-healthcare',
                license: 'Apache-2.0',
                keywords: ['healthcare', 'hipaa', 'medical-devices', 'fda'],
                headelfVersion: '>=1.0.0',
                supportedRoles: ['CIO', 'CISO', 'CLO', 'COO'],
                industries: ['healthcare'],
                installationInstructions: 'Requires HIPAA compliance review',
                dependencies: { 'crypto': '^1.0.0' },
                createdAt: '2024-01-20T00:00:00Z',
                updatedAt: '2024-02-25T00:00:00Z'
            }
        ];

        // Filter by search terms if provided
        if (searchTerms && searchTerms.length > 0) {
            return mockExtensions.filter(ext =>
                searchTerms.some(term =>
                    ext.name.toLowerCase().includes(term.toLowerCase()) ||
                    ext.description.toLowerCase().includes(term.toLowerCase()) ||
                    ext.keywords.some(keyword => keyword.toLowerCase().includes(term.toLowerCase()))
                )
            );
        }

        return mockExtensions;
    }

    async registerExtension(repositoryUrl: string): Promise<boolean> {
        console.log(`📦 Registering extension from ${repositoryUrl}...`);

        try {
            // Clone the repository temporarily to inspect metadata
            const tempDir = path.join(this.marketplaceDir, 'temp', Date.now().toString());
            fs.mkdirSync(tempDir, { recursive: true });

            await execAsync(`git clone ${repositoryUrl} .`, { cwd: tempDir });

            // Read extension metadata
            const metadataFile = path.join(tempDir, 'headelf.extension.json');
            if (!fs.existsSync(metadataFile)) {
                throw new Error('Extension metadata file (headelf.extension.json) not found');
            }

            const metadata: ExtensionMetadata = JSON.parse(fs.readFileSync(metadataFile, 'utf-8'));

            // Validate extension
            const validationResult = await this.validateExtension(tempDir, metadata);
            if (!validationResult.isValid) {
                throw new Error(`Extension validation failed: ${validationResult.errors.join(', ')}`);
            }

            // Add to registry
            await this.addToRegistry(metadata);

            // Cleanup temp directory
            await execAsync(`rm -rf ${tempDir}`);

            console.log(`✅ Extension ${metadata.name} registered successfully`);
            return true;

        } catch (error) {
            console.error('Extension registration failed:', error);
            return false;
        }
    }

    private async validateExtension(extensionPath: string, metadata: ExtensionMetadata): Promise<{
        isValid: boolean;
        errors: string[];
        warnings: string[];
    }> {
        const errors: string[] = [];
        const warnings: string[] = [];

        // Check required fields
        const requiredFields = ['name', 'version', 'description', 'author', 'repository'];
        requiredFields.forEach(field => {
            if (!metadata[field as keyof ExtensionMetadata]) {
                errors.push(`Missing required field: ${field}`);
            }
        });

        // Check naming convention
        if (!metadata.name.startsWith(this.config.extensionPrefix)) {
            errors.push(`Extension name must start with '${this.config.extensionPrefix}'`);
        }

        // Check for required files
        const requiredFiles = ['README.md', 'skills/', 'package.json'];
        requiredFiles.forEach(file => {
            const filePath = path.join(extensionPath, file);
            if (!fs.existsSync(filePath)) {
                errors.push(`Required file/directory missing: ${file}`);
            }
        });

        // Check HeadElf version compatibility
        if (!this.isVersionCompatible(metadata.headelfVersion)) {
            warnings.push(`HeadElf version compatibility may be outdated: ${metadata.headelfVersion}`);
        }

        // Security checks
        const securityCheck = await this.performSecurityScan(extensionPath);
        if (!securityCheck.passed) {
            errors.push(...securityCheck.errors);
            warnings.push(...securityCheck.warnings);
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }

    private isVersionCompatible(requiredVersion: string): boolean {
        // Simple version compatibility check
        // In a real implementation, this would use semver
        return requiredVersion.includes('1.0') || requiredVersion.includes('>=1.0');
    }

    private async performSecurityScan(extensionPath: string): Promise<{
        passed: boolean;
        errors: string[];
        warnings: string[];
    }> {
        const errors: string[] = [];
        const warnings: string[] = [];

        try {
            // Check for potentially dangerous patterns
            const dangerousPatterns = [
                'eval(',
                'Function(',
                'process.exit',
                'child_process',
                'fs.unlinkSync',
                'rm -rf'
            ];

            const files = await this.getAllSourceFiles(extensionPath);

            for (const file of files) {
                const content = fs.readFileSync(file, 'utf-8');

                dangerousPatterns.forEach(pattern => {
                    if (content.includes(pattern)) {
                        warnings.push(`Potentially dangerous pattern found in ${file}: ${pattern}`);
                    }
                });
            }

        } catch (error) {
            warnings.push('Security scan could not be completed');
        }

        return {
            passed: errors.length === 0,
            errors,
            warnings
        };
    }

    private async getAllSourceFiles(dirPath: string): Promise<string[]> {
        const files: string[] = [];
        const items = fs.readdirSync(dirPath);

        for (const item of items) {
            const itemPath = path.join(dirPath, item);
            const stat = fs.statSync(itemPath);

            if (stat.isDirectory()) {
                if (!item.startsWith('.') && item !== 'node_modules') {
                    files.push(...await this.getAllSourceFiles(itemPath));
                }
            } else if (item.endsWith('.ts') || item.endsWith('.js') || item.endsWith('.py')) {
                files.push(itemPath);
            }
        }

        return files;
    }

    private async addToRegistry(metadata: ExtensionMetadata): Promise<void> {
        const registry: ExtensionRegistry = JSON.parse(fs.readFileSync(this.registryFile, 'utf-8'));

        registry.extensions[metadata.name] = metadata;
        registry.totalExtensions = Object.keys(registry.extensions).length;
        registry.lastUpdated = new Date().toISOString();

        // Categorize extension
        this.categorizeExtension(registry, metadata);

        fs.writeFileSync(this.registryFile, JSON.stringify(registry, null, 2));

        // Commit registry update
        await this.commitRegistryUpdate(metadata.name, 'added');
    }

    private categorizeExtension(registry: ExtensionRegistry, metadata: ExtensionMetadata): void {
        // Categorize by industry
        if (metadata.industries && metadata.industries.length > 0) {
            metadata.industries.forEach(industry => {
                if (!registry.categories['industry-verticals'].includes(metadata.name)) {
                    registry.categories['industry-verticals'].push(metadata.name);
                }
            });
        }

        // Categorize by supported roles
        if (metadata.supportedRoles && metadata.supportedRoles.length > 0) {
            if (!registry.categories['executive-roles'].includes(metadata.name)) {
                registry.categories['executive-roles'].push(metadata.name);
            }
        }

        // Categorize by keywords
        const analyticsKeywords = ['analytics', 'reporting', 'dashboard', 'metrics'];
        const integrationKeywords = ['api', 'integration', 'connector', 'webhook'];

        if (metadata.keywords.some(k => analyticsKeywords.includes(k.toLowerCase()))) {
            if (!registry.categories['analytics'].includes(metadata.name)) {
                registry.categories['analytics'].push(metadata.name);
            }
        }

        if (metadata.keywords.some(k => integrationKeywords.includes(k.toLowerCase()))) {
            if (!registry.categories['integrations'].includes(metadata.name)) {
                registry.categories['integrations'].push(metadata.name);
            }
        }
    }

    /**
     * Extension Installation and Management
     */
    async installExtension(extensionName: string, version?: string): Promise<InstallationResult> {
        console.log(`📥 Installing extension: ${extensionName}${version ? `@${version}` : ''}...`);

        try {
            const registry = this.getRegistry();
            const metadata = registry.extensions[extensionName];

            if (!metadata) {
                throw new Error(`Extension ${extensionName} not found in registry`);
            }

            const installPath = path.join(this.extensionsDir, extensionName);

            // Check if already installed
            if (fs.existsSync(installPath)) {
                console.log('Extension already installed, updating...');
                await execAsync('git pull origin main', { cwd: installPath });
            } else {
                // Clone the extension repository
                await execAsync(`git clone ${metadata.repository} ${installPath}`);
            }

            // Checkout specific version if requested
            if (version) {
                try {
                    await execAsync(`git checkout v${version}`, { cwd: installPath });
                } catch (error) {
                    console.warn(`Version v${version} not found, using latest`);
                }
            }

            // Run installation script if present
            const installScript = path.join(installPath, 'install.sh');
            if (fs.existsSync(installScript)) {
                await execAsync('chmod +x install.sh && ./install.sh', { cwd: installPath });
            }

            // Update local installation registry
            await this.updateInstallationRegistry(extensionName, metadata, installPath);

            return {
                success: true,
                extensionName,
                installedVersion: version || 'latest',
                installPath,
                message: `Extension ${extensionName} installed successfully`
            };

        } catch (error) {
            return {
                success: false,
                extensionName,
                installedVersion: 'none',
                installPath: '',
                message: `Installation failed: ${error instanceof Error ? error.message : String(error)}`,
                errors: [error instanceof Error ? error.message : String(error)]
            };
        }
    }

    private async updateInstallationRegistry(extensionName: string, metadata: ExtensionMetadata, installPath: string): Promise<void> {
        const installRegistryPath = path.join(this.extensionsDir, 'installed.json');
        let installRegistry: any = {};

        if (fs.existsSync(installRegistryPath)) {
            installRegistry = JSON.parse(fs.readFileSync(installRegistryPath, 'utf-8'));
        }

        installRegistry[extensionName] = {
            ...metadata,
            installPath,
            installedAt: new Date().toISOString(),
            status: 'active'
        };

        fs.writeFileSync(installRegistryPath, JSON.stringify(installRegistry, null, 2));
    }

    async uninstallExtension(extensionName: string): Promise<boolean> {
        try {
            const installPath = path.join(this.extensionsDir, extensionName);

            if (!fs.existsSync(installPath)) {
                console.log(`Extension ${extensionName} not found`);
                return false;
            }

            // Run uninstall script if present
            const uninstallScript = path.join(installPath, 'uninstall.sh');
            if (fs.existsSync(uninstallScript)) {
                await execAsync('chmod +x uninstall.sh && ./uninstall.sh', { cwd: installPath });
            }

            // Remove extension directory
            await execAsync(`rm -rf ${installPath}`);

            // Update installation registry
            const installRegistryPath = path.join(this.extensionsDir, 'installed.json');
            if (fs.existsSync(installRegistryPath)) {
                const installRegistry = JSON.parse(fs.readFileSync(installRegistryPath, 'utf-8'));
                delete installRegistry[extensionName];
                fs.writeFileSync(installRegistryPath, JSON.stringify(installRegistry, null, 2));
            }

            console.log(`✅ Extension ${extensionName} uninstalled successfully`);
            return true;

        } catch (error) {
            console.error(`Failed to uninstall extension ${extensionName}:`, error);
            return false;
        }
    }

    /**
     * Community Features
     */
    async submitReview(extensionName: string, review: Omit<ExtensionReview, 'extensionName' | 'createdAt'>): Promise<boolean> {
        try {
            const reviewData: ExtensionReview = {
                ...review,
                extensionName,
                createdAt: new Date().toISOString()
            };

            const reviewFile = path.join(this.reviewsDir, `${extensionName}-${Date.now()}.json`);
            fs.writeFileSync(reviewFile, JSON.stringify(reviewData, null, 2));

            await this.commitRegistryUpdate(extensionName, 'review_added');

            console.log(`✅ Review submitted for ${extensionName}`);
            return true;

        } catch (error) {
            console.error('Failed to submit review:', error);
            return false;
        }
    }

    async getExtensionReviews(extensionName: string): Promise<ExtensionReview[]> {
        const reviews: ExtensionReview[] = [];

        if (!fs.existsSync(this.reviewsDir)) {
            return reviews;
        }

        const reviewFiles = fs.readdirSync(this.reviewsDir)
            .filter(file => file.startsWith(extensionName) && file.endsWith('.json'));

        reviewFiles.forEach(file => {
            try {
                const reviewPath = path.join(this.reviewsDir, file);
                const review: ExtensionReview = JSON.parse(fs.readFileSync(reviewPath, 'utf-8'));
                reviews.push(review);
            } catch (error) {
                console.warn(`Error reading review file ${file}:`, error);
            }
        });

        return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    /**
     * Registry Management
     */
    getRegistry(): ExtensionRegistry {
        try {
            return JSON.parse(fs.readFileSync(this.registryFile, 'utf-8'));
        } catch (error) {
            console.warn('Error reading registry, initializing new one:', error);
            this.initializeRegistry();
            return JSON.parse(fs.readFileSync(this.registryFile, 'utf-8'));
        }
    }

    async updateRegistry(): Promise<boolean> {
        try {
            console.log('🔄 Updating extension registry...');

            // Discover new extensions
            const discoveredExtensions = await this.discoverExtensions();

            const registry = this.getRegistry();
            let updatesCount = 0;

            discoveredExtensions.forEach(ext => {
                const existing = registry.extensions[ext.name];
                if (!existing || existing.version !== ext.version) {
                    registry.extensions[ext.name] = ext;
                    updatesCount++;
                }
            });

            if (updatesCount > 0) {
                registry.lastUpdated = new Date().toISOString();
                registry.totalExtensions = Object.keys(registry.extensions).length;

                fs.writeFileSync(this.registryFile, JSON.stringify(registry, null, 2));
                await this.commitRegistryUpdate('registry', 'updated');

                console.log(`✅ Registry updated with ${updatesCount} changes`);
            } else {
                console.log('Registry is up to date');
            }

            return true;

        } catch (error) {
            console.error('Failed to update registry:', error);
            return false;
        }
    }

    private async commitRegistryUpdate(item: string, action: string): Promise<void> {
        try {
            await execAsync('git add marketplace/', { cwd: this.repoRoot });

            const commitMessage = `[HeadElf-Marketplace] ${action}: ${item}

Extension marketplace ${action} for ${item}
Timestamp: ${new Date().toISOString()}

This is an automated marketplace registry update.`;

            await execAsync(`git commit -m "${commitMessage}"`, { cwd: this.repoRoot });

        } catch (error) {
            console.warn('Could not commit marketplace changes to Git:', error);
        }
    }

    /**
     * Utility Methods
     */
    async searchExtensions(query: string, filters?: {
        category?: string;
        role?: string;
        industry?: string;
        author?: string;
    }): Promise<ExtensionMetadata[]> {
        const registry = this.getRegistry();
        let extensions = Object.values(registry.extensions);

        // Apply text search
        if (query.trim()) {
            extensions = extensions.filter(ext =>
                ext.name.toLowerCase().includes(query.toLowerCase()) ||
                ext.description.toLowerCase().includes(query.toLowerCase()) ||
                ext.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
            );
        }

        // Apply filters
        if (filters) {
            if (filters.role) {
                extensions = extensions.filter(ext =>
                    ext.supportedRoles.includes(filters.role!)
                );
            }

            if (filters.industry) {
                extensions = extensions.filter(ext =>
                    ext.industries.includes(filters.industry!)
                );
            }

            if (filters.author) {
                extensions = extensions.filter(ext =>
                    ext.author === filters.author
                );
            }
        }

        return extensions.sort((a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    }

    getInstalledExtensions(): Record<string, any> {
        const installRegistryPath = path.join(this.extensionsDir, 'installed.json');

        if (!fs.existsSync(installRegistryPath)) {
            return {};
        }

        try {
            return JSON.parse(fs.readFileSync(installRegistryPath, 'utf-8'));
        } catch (error) {
            console.warn('Error reading installed extensions registry:', error);
            return {};
        }
    }
}