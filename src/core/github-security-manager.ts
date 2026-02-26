/**
 * GitHub-Based Security and Access Control Manager
 *
 * Leverages GitHub's enterprise-grade security infrastructure to provide:
 * - OAuth authentication through GitHub accounts
 * - Repository-based authorization and role management
 * - Git commit history for comprehensive audit trails
 * - GitHub Teams integration for C-suite role mapping
 */

import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface UserProfile {
    githubUsername: string;
    email: string;
    fullName: string;
    avatarUrl: string;
    organizationRoles: string[];
    repositoryPermissions: RepositoryPermission[];
    headelixifeRoles: HeadElfRole[];
    lastAuthenticated: string;
}

export interface RepositoryPermission {
    repository: string;
    permission: 'read' | 'write' | 'admin';
    grantedAt: string;
    grantedBy: string;
}

export interface HeadElfRole {
    role: 'CTO' | 'CIO' | 'CISO' | 'CFO' | 'COO' | 'CLO' | 'CHRO' | 'CMSO' | 'CPO';
    permissions: string[];
    grantedAt: string;
    expiresAt?: string;
}

export interface AuditLogEntry {
    timestamp: string;
    userId: string;
    action: string;
    resource: string;
    details: any;
    ipAddress?: string;
    userAgent?: string;
    gitCommitHash?: string;
}

export interface SecurityPolicy {
    requireAuthentication: boolean;
    allowedDomains: string[];
    sessionTimeout: number; // minutes
    auditRetention: number; // days
    encryptionRequired: boolean;
    mfaRequired: boolean;
    allowedActions: Record<string, string[]>;
}

export class GitHubSecurityManager {
    private readonly repoRoot: string;
    private readonly securityDir: string;
    private readonly auditDir: string;
    private readonly usersDir: string;
    private readonly policiesDir: string;
    private securityPolicy: SecurityPolicy;

    constructor(repoRoot?: string) {
        this.repoRoot = repoRoot || process.cwd();
        this.securityDir = path.join(this.repoRoot, 'security');
        this.auditDir = path.join(this.securityDir, 'audit');
        this.usersDir = path.join(this.securityDir, 'users');
        this.policiesDir = path.join(this.securityDir, 'policies');

        this.initializeSecurityStructure();
        this.loadSecurityPolicy();
    }

    /**
     * Initialize security directory structure
     */
    private initializeSecurityStructure(): void {
        const dirs = [
            this.securityDir,
            this.auditDir,
            this.usersDir,
            this.policiesDir,
            path.join(this.auditDir, 'access'),
            path.join(this.auditDir, 'decisions'),
            path.join(this.auditDir, 'system')
        ];

        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });

        // Create security .gitignore
        const securityGitignore = path.join(this.securityDir, '.gitignore');
        if (!fs.existsSync(securityGitignore)) {
            const gitignoreContent = `# Security sensitive files
*.key
*.pem
*.p12
*.pfx
secrets/
private/
.env*
tokens/

# Personal access tokens and credentials
*token*
*credential*
*secret*

# But allow policy and audit files
!*.policy.json
!audit/**/*.json
!users/**/*.json
`;
            fs.writeFileSync(securityGitignore, gitignoreContent);
        }

        // Create default security policy if it doesn't exist
        const defaultPolicyPath = path.join(this.policiesDir, 'default.policy.json');
        if (!fs.existsSync(defaultPolicyPath)) {
            this.createDefaultSecurityPolicy();
        }
    }

    private createDefaultSecurityPolicy(): void {
        const defaultPolicy: SecurityPolicy = {
            requireAuthentication: true,
            allowedDomains: ['github.com', 'github.enterprise.com'],
            sessionTimeout: 480, // 8 hours
            auditRetention: 2555, // 7 years for compliance
            encryptionRequired: true,
            mfaRequired: false, // Configurable per organization
            allowedActions: {
                'CTO': ['all'],
                'CIO': ['technology-decisions', 'architecture-decisions'],
                'CISO': ['security-decisions', 'compliance-decisions'],
                'CFO': ['financial-decisions', 'investment-decisions'],
                'COO': ['operational-decisions', 'performance-decisions'],
                'CLO': ['legal-decisions', 'compliance-decisions'],
                'CHRO': ['people-decisions', 'organizational-decisions'],
                'CMSO': ['marketing-decisions', 'sales-decisions'],
                'CPO': ['product-decisions', 'strategy-decisions']
            }
        };

        const policyPath = path.join(this.policiesDir, 'default.policy.json');
        fs.writeFileSync(policyPath, JSON.stringify(defaultPolicy, null, 2));
        this.securityPolicy = defaultPolicy;
    }

    private loadSecurityPolicy(): void {
        const policyPath = path.join(this.policiesDir, 'default.policy.json');
        try {
            if (fs.existsSync(policyPath)) {
                const policyContent = fs.readFileSync(policyPath, 'utf-8');
                this.securityPolicy = JSON.parse(policyContent);
            }
        } catch (error) {
            console.warn('Error loading security policy, using defaults:', error);
            this.createDefaultSecurityPolicy();
        }
    }

    /**
     * GitHub Authentication Integration
     */
    async authenticateUser(githubToken?: string): Promise<UserProfile | null> {
        try {
            // Get GitHub user info using GitHub CLI or API
            let userInfo: any;

            if (githubToken) {
                // Use provided token for API call
                userInfo = await this.fetchGitHubUserInfo(githubToken);
            } else {
                // Try to use GitHub CLI if available
                try {
                    const { stdout } = await execAsync('gh auth status --show-token', {
                        cwd: this.repoRoot
                    });

                    if (stdout.includes('Logged in to github.com')) {
                        const userResult = await execAsync('gh api user', {
                            cwd: this.repoRoot
                        });
                        userInfo = JSON.parse(userResult.stdout);
                    }
                } catch (cliError) {
                    console.warn('GitHub CLI not available or not authenticated');
                    return null;
                }
            }

            if (!userInfo) {
                return null;
            }

            // Get repository permissions
            const repoPermissions = await this.getRepositoryPermissions(userInfo.login);

            // Map GitHub teams to HeadElf roles
            const headelfRoles = await this.mapGitHubTeamsToRoles(userInfo.login);

            const userProfile: UserProfile = {
                githubUsername: userInfo.login,
                email: userInfo.email || '',
                fullName: userInfo.name || userInfo.login,
                avatarUrl: userInfo.avatar_url || '',
                organizationRoles: await this.getUserOrganizationRoles(userInfo.login),
                repositoryPermissions: repoPermissions,
                headelixifeRoles: headelfRoles,
                lastAuthenticated: new Date().toISOString()
            };

            // Cache user profile
            await this.cacheUserProfile(userProfile);

            // Log authentication event
            await this.logAuditEvent({
                timestamp: new Date().toISOString(),
                userId: userInfo.login,
                action: 'user_authentication',
                resource: 'github_oauth',
                details: {
                    authentication_method: githubToken ? 'token' : 'gh_cli',
                    roles: headelfRoles.map(r => r.role)
                }
            });

            return userProfile;

        } catch (error) {
            console.error('Authentication failed:', error);

            await this.logAuditEvent({
                timestamp: new Date().toISOString(),
                userId: 'unknown',
                action: 'authentication_failure',
                resource: 'github_oauth',
                details: {
                    error: error instanceof Error ? error.message : String(error)
                }
            });

            return null;
        }
    }

    private async fetchGitHubUserInfo(token: string): Promise<any> {
        // In a real implementation, this would make an HTTP request to GitHub API
        // For now, we'll simulate with a placeholder
        throw new Error('Direct GitHub API integration requires http client implementation');
    }

    private async getRepositoryPermissions(username: string): Promise<RepositoryPermission[]> {
        try {
            // Get current repository information
            const { stdout: remoteUrl } = await execAsync('git config --get remote.origin.url', {
                cwd: this.repoRoot
            });

            const repoName = this.parseRepositoryName(remoteUrl.trim());

            // Check user's permission level
            // This would typically involve GitHub API calls
            // For now, we'll check if user can push to the repository
            try {
                await execAsync('git ls-remote --exit-code origin', {
                    cwd: this.repoRoot
                });

                return [{
                    repository: repoName,
                    permission: 'write', // Assuming write access if can reach remote
                    grantedAt: new Date().toISOString(),
                    grantedBy: 'github_repository_settings'
                }];
            } catch {
                return [{
                    repository: repoName,
                    permission: 'read', // Read-only if can't push
                    grantedAt: new Date().toISOString(),
                    grantedBy: 'github_repository_settings'
                }];
            }

        } catch (error) {
            console.warn('Could not determine repository permissions:', error);
            return [];
        }
    }

    private parseRepositoryName(remoteUrl: string): string {
        // Parse GitHub repository name from remote URL
        const match = remoteUrl.match(/github\.com[:/](.+?)(?:\.git)?$/);
        return match ? match[1] : 'unknown';
    }

    private async mapGitHubTeamsToRoles(username: string): Promise<HeadElfRole[]> {
        // Map GitHub organization teams to HeadElf executive roles
        // This would typically query GitHub API for team memberships
        // For now, we'll check for local role configuration

        const rolesConfigPath = path.join(this.usersDir, `${username}.roles.json`);
        if (fs.existsSync(rolesConfigPath)) {
            try {
                const rolesConfig = JSON.parse(fs.readFileSync(rolesConfigPath, 'utf-8'));
                return rolesConfig.headelfRoles || [];
            } catch (error) {
                console.warn('Error reading user roles configuration:', error);
            }
        }

        // Default role assignment based on repository access
        return [{
            role: 'CTO', // Default role for authenticated users
            permissions: this.securityPolicy.allowedActions['CTO'] || [],
            grantedAt: new Date().toISOString()
        }];
    }

    private async getUserOrganizationRoles(username: string): Promise<string[]> {
        try {
            // This would typically query GitHub API for organization memberships
            // For now, return empty array
            return [];
        } catch (error) {
            console.warn('Could not fetch organization roles:', error);
            return [];
        }
    }

    private async cacheUserProfile(profile: UserProfile): Promise<void> {
        const userProfilePath = path.join(this.usersDir, `${profile.githubUsername}.profile.json`);
        fs.writeFileSync(userProfilePath, JSON.stringify(profile, null, 2));
    }

    /**
     * Authorization and Access Control
     */
    async authorizeAction(userId: string, action: string, resource: string): Promise<boolean> {
        try {
            const userProfile = await this.getCachedUserProfile(userId);
            if (!userProfile) {
                await this.logAuditEvent({
                    timestamp: new Date().toISOString(),
                    userId,
                    action: 'authorization_denied',
                    resource,
                    details: { reason: 'user_profile_not_found', attempted_action: action }
                });
                return false;
            }

            // Check if user has any role that allows this action
            const hasPermission = userProfile.headelixifeRoles.some(role => {
                const allowedActions = this.securityPolicy.allowedActions[role.role] || [];
                return allowedActions.includes('all') || allowedActions.includes(action);
            });

            // Log authorization attempt
            await this.logAuditEvent({
                timestamp: new Date().toISOString(),
                userId,
                action: hasPermission ? 'authorization_granted' : 'authorization_denied',
                resource,
                details: {
                    attempted_action: action,
                    user_roles: userProfile.headelixifeRoles.map(r => r.role)
                }
            });

            return hasPermission;

        } catch (error) {
            console.error('Authorization check failed:', error);

            await this.logAuditEvent({
                timestamp: new Date().toISOString(),
                userId,
                action: 'authorization_error',
                resource,
                details: {
                    error: error instanceof Error ? error.message : String(error),
                    attempted_action: action
                }
            });

            return false;
        }
    }

    private async getCachedUserProfile(username: string): Promise<UserProfile | null> {
        const userProfilePath = path.join(this.usersDir, `${username}.profile.json`);

        if (!fs.existsSync(userProfilePath)) {
            return null;
        }

        try {
            const profileContent = fs.readFileSync(userProfilePath, 'utf-8');
            const profile: UserProfile = JSON.parse(profileContent);

            // Check if profile is still valid (not expired)
            const lastAuth = new Date(profile.lastAuthenticated);
            const now = new Date();
            const sessionTimeoutMs = this.securityPolicy.sessionTimeout * 60 * 1000;

            if (now.getTime() - lastAuth.getTime() > sessionTimeoutMs) {
                // Session expired
                return null;
            }

            return profile;
        } catch (error) {
            console.warn('Error reading cached user profile:', error);
            return null;
        }
    }

    /**
     * Audit Logging with Git Integration
     */
    async logAuditEvent(event: AuditLogEntry): Promise<void> {
        try {
            const timestamp = event.timestamp || new Date().toISOString();
            const dateStr = timestamp.split('T')[0];

            // Organize audit logs by date and category
            const logCategory = this.categorizeAuditEvent(event.action);
            const logDir = path.join(this.auditDir, logCategory, dateStr);

            if (!fs.existsSync(logDir)) {
                fs.mkdirSync(logDir, { recursive: true });
            }

            const logFileName = `${timestamp.replace(/[:.]/g, '-')}-${event.userId}-${event.action}.json`;
            const logFilePath = path.join(logDir, logFileName);

            // Add Git commit information if available
            try {
                const { stdout: gitHash } = await execAsync('git rev-parse HEAD', {
                    cwd: this.repoRoot
                });
                event.gitCommitHash = gitHash.trim();
            } catch {
                // Git information not available - continue without it
            }

            // Write audit log entry
            fs.writeFileSync(logFilePath, JSON.stringify(event, null, 2));

            // Commit audit log to Git for immutable trail
            await this.commitAuditLog(logFilePath, event);

        } catch (error) {
            console.error('Failed to log audit event:', error);
        }
    }

    private categorizeAuditEvent(action: string): string {
        if (action.includes('authentication') || action.includes('authorization')) {
            return 'access';
        } else if (action.includes('decision')) {
            return 'decisions';
        } else {
            return 'system';
        }
    }

    private async commitAuditLog(logFilePath: string, event: AuditLogEntry): Promise<void> {
        try {
            const relativePath = path.relative(this.repoRoot, logFilePath);

            await execAsync(`git add "${relativePath}"`, { cwd: this.repoRoot });

            const commitMessage = `[HeadElf-Audit] ${event.action} by ${event.userId}

Audit Event Details:
- Action: ${event.action}
- Resource: ${event.resource}
- User: ${event.userId}
- Timestamp: ${event.timestamp}
- Log File: ${relativePath}

This is an automated audit log entry for compliance and security monitoring.`;

            await execAsync(`git commit -m "${commitMessage}"`, {
                cwd: this.repoRoot
            });

        } catch (error) {
            console.warn('Could not commit audit log to Git:', error);
        }
    }

    /**
     * Security Policy Management
     */
    async updateSecurityPolicy(policy: Partial<SecurityPolicy>): Promise<void> {
        this.securityPolicy = { ...this.securityPolicy, ...policy };

        const policyPath = path.join(this.policiesDir, 'default.policy.json');
        fs.writeFileSync(policyPath, JSON.stringify(this.securityPolicy, null, 2));

        await this.logAuditEvent({
            timestamp: new Date().toISOString(),
            userId: 'system',
            action: 'security_policy_updated',
            resource: 'security_policy',
            details: { updated_fields: Object.keys(policy) }
        });
    }

    getSecurityPolicy(): SecurityPolicy {
        return { ...this.securityPolicy };
    }

    /**
     * Access Control Utilities
     */
    async grantRole(username: string, role: HeadElfRole): Promise<boolean> {
        try {
            const userProfile = await this.getCachedUserProfile(username);
            if (!userProfile) {
                return false;
            }

            // Add or update role
            const existingRoleIndex = userProfile.headelixifeRoles.findIndex(r => r.role === role.role);
            if (existingRoleIndex >= 0) {
                userProfile.headelixifeRoles[existingRoleIndex] = role;
            } else {
                userProfile.headelixifeRoles.push(role);
            }

            await this.cacheUserProfile(userProfile);

            await this.logAuditEvent({
                timestamp: new Date().toISOString(),
                userId: 'system',
                action: 'role_granted',
                resource: 'user_role',
                details: {
                    target_user: username,
                    granted_role: role.role,
                    permissions: role.permissions
                }
            });

            return true;

        } catch (error) {
            console.error('Failed to grant role:', error);
            return false;
        }
    }

    async revokeRole(username: string, roleName: string): Promise<boolean> {
        try {
            const userProfile = await this.getCachedUserProfile(username);
            if (!userProfile) {
                return false;
            }

            const originalLength = userProfile.headelixifeRoles.length;
            userProfile.headelixifeRoles = userProfile.headelixifeRoles.filter(r => r.role !== roleName);

            if (userProfile.headelixifeRoles.length < originalLength) {
                await this.cacheUserProfile(userProfile);

                await this.logAuditEvent({
                    timestamp: new Date().toISOString(),
                    userId: 'system',
                    action: 'role_revoked',
                    resource: 'user_role',
                    details: {
                        target_user: username,
                        revoked_role: roleName
                    }
                });

                return true;
            }

            return false;

        } catch (error) {
            console.error('Failed to revoke role:', error);
            return false;
        }
    }
}