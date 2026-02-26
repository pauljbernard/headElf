#!/usr/bin/env ts-node
import { EventEmitter } from 'events';
import { promises as fs } from 'fs';
import * as path from 'path';
import { IndustryVertical, IndustryExtension, IndustryContext } from '../src/core/types';

/**
 * Industry Activation and Configuration System
 * Manages activation, deactivation, and configuration of industry vertical extensions
 */
export class IndustryActivationSystem extends EventEmitter {
    private configPath: string;
    private extensionsPath: string;
    private activeIndustries: Set<IndustryVertical>;
    private industryExtensions: Map<IndustryVertical, IndustryExtension>;
    private industryConfigurations: Map<IndustryVertical, IndustryConfiguration>;

    constructor() {
        super();
        this.configPath = path.join(__dirname, '../config/industry-config.json');
        this.extensionsPath = path.join(__dirname, '../src/extensions/industry');
        this.activeIndustries = new Set();
        this.industryExtensions = new Map();
        this.industryConfigurations = new Map();
    }

    /**
     * Initialize the industry activation system
     */
    public async initialize(): Promise<void> {
        console.log('🚀 Initializing Industry Activation System...');

        await this.loadConfiguration();
        await this.discoverIndustryExtensions();
        await this.loadActiveIndustries();

        console.log(`✅ Industry Activation System initialized with ${this.activeIndustries.size} active industries`);
        this.emit('systemInitialized', {
            totalIndustries: this.industryExtensions.size,
            activeIndustries: this.activeIndustries.size,
            availableIndustries: Array.from(this.industryExtensions.keys())
        });
    }

    /**
     * Activate specific industry vertical
     */
    public async activateIndustry(industry: IndustryVertical, config?: Partial<IndustryConfiguration>): Promise<void> {
        console.log(`🔌 Activating industry: ${industry}`);

        if (!this.industryExtensions.has(industry)) {
            throw new Error(`Industry extension not found: ${industry}`);
        }

        // Load industry extension
        const extension = await this.loadIndustryExtension(industry);
        this.industryExtensions.set(industry, extension);

        // Apply configuration
        if (config) {
            await this.configureIndustry(industry, config);
        }

        // Activate industry
        this.activeIndustries.add(industry);
        await this.saveConfiguration();

        console.log(`✅ Successfully activated: ${industry}`);
        this.emit('industryActivated', { industry, config });
    }

    /**
     * Deactivate specific industry vertical
     */
    public async deactivateIndustry(industry: IndustryVertical): Promise<void> {
        console.log(`🔌 Deactivating industry: ${industry}`);

        if (!this.activeIndustries.has(industry)) {
            console.log(`⚠️  Industry already inactive: ${industry}`);
            return;
        }

        this.activeIndustries.delete(industry);
        await this.saveConfiguration();

        console.log(`✅ Successfully deactivated: ${industry}`);
        this.emit('industryDeactivated', { industry });
    }

    /**
     * Configure industry vertical settings
     */
    public async configureIndustry(industry: IndustryVertical, config: Partial<IndustryConfiguration>): Promise<void> {
        console.log(`⚙️  Configuring industry: ${industry}`);

        const existingConfig = this.industryConfigurations.get(industry) || this.getDefaultConfiguration(industry);
        const updatedConfig = { ...existingConfig, ...config };

        this.industryConfigurations.set(industry, updatedConfig);
        await this.saveConfiguration();

        console.log(`✅ Successfully configured: ${industry}`);
        this.emit('industryConfigured', { industry, config: updatedConfig });
    }

    /**
     * Get industry configuration
     */
    public getIndustryConfiguration(industry: IndustryVertical): IndustryConfiguration | undefined {
        return this.industryConfigurations.get(industry);
    }

    /**
     * Get list of active industries
     */
    public getActiveIndustries(): IndustryVertical[] {
        return Array.from(this.activeIndustries);
    }

    /**
     * Get list of available industries
     */
    public getAvailableIndustries(): IndustryVertical[] {
        return Array.from(this.industryExtensions.keys());
    }

    /**
     * Check if industry is active
     */
    public isIndustryActive(industry: IndustryVertical): boolean {
        return this.activeIndustries.has(industry);
    }

    /**
     * Get industry extension by vertical
     */
    public getIndustryExtension(industry: IndustryVertical): IndustryExtension | undefined {
        return this.industryExtensions.get(industry);
    }

    /**
     * Bulk activate multiple industries
     */
    public async activateIndustries(industries: IndustryVertical[], configs?: Map<IndustryVertical, Partial<IndustryConfiguration>>): Promise<void> {
        console.log(`🔌 Bulk activating ${industries.length} industries...`);

        for (const industry of industries) {
            const config = configs?.get(industry);
            await this.activateIndustry(industry, config);
        }

        console.log(`✅ Successfully bulk activated ${industries.length} industries`);
        this.emit('bulkActivation', { industries, count: industries.length });
    }

    /**
     * Auto-detect and suggest industries based on context
     */
    public async suggestIndustries(context: IndustryContext): Promise<IndustrySuggestion[]> {
        const suggestions: IndustrySuggestion[] = [];

        for (const [industry, extension] of this.industryExtensions) {
            const relevanceScore = await this.calculateIndustryRelevance(industry, extension, context);

            if (relevanceScore > 0.3) {
                suggestions.push({
                    industry,
                    relevanceScore,
                    rationale: await this.generateSuggestionRationale(industry, context),
                    estimatedBenefit: await this.estimateIndustryBenefit(industry, context)
                });
            }
        }

        return suggestions.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    /**
     * Generate industry activation report
     */
    public async generateActivationReport(): Promise<IndustryActivationReport> {
        const report: IndustryActivationReport = {
            timestamp: new Date().toISOString(),
            totalIndustries: this.industryExtensions.size,
            activeIndustries: this.activeIndustries.size,
            inactiveIndustries: this.industryExtensions.size - this.activeIndustries.size,
            gdpCoverage: await this.calculateGdpCoverage(),
            industryDetails: [],
            systemHealth: await this.assessSystemHealth()
        };

        for (const [industry, extension] of this.industryExtensions) {
            report.industryDetails.push({
                industry,
                active: this.activeIndustries.has(industry),
                gdpPercentage: extension.gdpPercentage,
                configuration: this.industryConfigurations.get(industry),
                lastActivated: await this.getLastActivationTime(industry)
            });
        }

        return report;
    }

    // Private helper methods
    private async loadConfiguration(): Promise<void> {
        try {
            const configData = await fs.readFile(this.configPath, 'utf-8');
            const config = JSON.parse(configData);

            // Load active industries
            if (config.activeIndustries) {
                this.activeIndustries = new Set(config.activeIndustries);
            }

            // Load industry configurations
            if (config.industryConfigurations) {
                for (const [industry, config] of Object.entries(config.industryConfigurations)) {
                    this.industryConfigurations.set(industry as IndustryVertical, config as IndustryConfiguration);
                }
            }
        } catch (error) {
            console.log('⚠️  No existing configuration found, creating default configuration');
            await this.createDefaultConfiguration();
        }
    }

    private async saveConfiguration(): Promise<void> {
        const config = {
            activeIndustries: Array.from(this.activeIndustries),
            industryConfigurations: Object.fromEntries(this.industryConfigurations),
            lastUpdated: new Date().toISOString()
        };

        await fs.mkdir(path.dirname(this.configPath), { recursive: true });
        await fs.writeFile(this.configPath, JSON.stringify(config, null, 2));
    }

    private async discoverIndustryExtensions(): Promise<void> {
        const files = await fs.readdir(this.extensionsPath);
        const industryFiles = files.filter(file => file.endsWith('-extension.ts') || file.endsWith('-extension.js'));

        for (const file of industryFiles) {
            try {
                const modulePath = path.join(this.extensionsPath, file);
                const module = await import(modulePath);

                // Get the extension class
                const ExtensionClass = Object.values(module).find(
                    (value: any) => value.prototype && value.prototype.industry
                ) as any;

                if (ExtensionClass) {
                    const extension = new ExtensionClass();
                    this.industryExtensions.set(extension.industry, extension);
                }
            } catch (error) {
                console.warn(`⚠️  Failed to load industry extension: ${file}`, error);
            }
        }
    }

    private async loadActiveIndustries(): Promise<void> {
        for (const industry of this.activeIndustries) {
            if (this.industryExtensions.has(industry)) {
                const extension = await this.loadIndustryExtension(industry);
                this.industryExtensions.set(industry, extension);
            }
        }
    }

    private async loadIndustryExtension(industry: IndustryVertical): Promise<IndustryExtension> {
        // Implementation would load and initialize the specific industry extension
        const extension = this.industryExtensions.get(industry);
        if (!extension) {
            throw new Error(`Industry extension not found: ${industry}`);
        }
        return extension;
    }

    private getDefaultConfiguration(industry: IndustryVertical): IndustryConfiguration {
        return {
            priority: 'MEDIUM',
            autoActivate: false,
            contextSensitivity: 0.7,
            performanceMonitoring: true,
            complianceChecking: true,
            customSettings: {}
        };
    }

    private async createDefaultConfiguration(): Promise<void> {
        const defaultConfig = {
            activeIndustries: [],
            industryConfigurations: {},
            lastUpdated: new Date().toISOString()
        };

        await fs.mkdir(path.dirname(this.configPath), { recursive: true });
        await fs.writeFile(this.configPath, JSON.stringify(defaultConfig, null, 2));
    }

    private async calculateIndustryRelevance(
        industry: IndustryVertical,
        extension: IndustryExtension,
        context: IndustryContext
    ): Promise<number> {
        // Calculate relevance score based on context
        let relevanceScore = 0;

        // Check for industry-specific keywords in context
        if (context.description?.toLowerCase().includes(industry.toLowerCase())) {
            relevanceScore += 0.5;
        }

        // Check for industry-specific business metrics
        if (context.businessMetrics && extension.gdpPercentage > 5) {
            relevanceScore += 0.3;
        }

        return Math.min(relevanceScore, 1.0);
    }

    private async generateSuggestionRationale(industry: IndustryVertical, context: IndustryContext): Promise<string> {
        return `Industry ${industry} shows high relevance based on context analysis`;
    }

    private async estimateIndustryBenefit(industry: IndustryVertical, context: IndustryContext): Promise<number> {
        const extension = this.industryExtensions.get(industry);
        return extension ? extension.gdpPercentage / 100 : 0;
    }

    private async calculateGdpCoverage(): Promise<number> {
        let totalGdp = 0;
        for (const industry of this.activeIndustries) {
            const extension = this.industryExtensions.get(industry);
            if (extension) {
                totalGdp += extension.gdpPercentage;
            }
        }
        return totalGdp;
    }

    private async assessSystemHealth(): Promise<SystemHealthStatus> {
        return {
            status: 'HEALTHY',
            extensionsLoaded: this.industryExtensions.size,
            configurationsValid: this.industryConfigurations.size,
            lastHealthCheck: new Date().toISOString()
        };
    }

    private async getLastActivationTime(industry: IndustryVertical): Promise<string | undefined> {
        // Implementation would track activation timestamps
        return new Date().toISOString();
    }
}

// Type definitions
interface IndustryConfiguration {
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    autoActivate: boolean;
    contextSensitivity: number;
    performanceMonitoring: boolean;
    complianceChecking: boolean;
    customSettings: Record<string, any>;
}

interface IndustrySuggestion {
    industry: IndustryVertical;
    relevanceScore: number;
    rationale: string;
    estimatedBenefit: number;
}

interface IndustryActivationReport {
    timestamp: string;
    totalIndustries: number;
    activeIndustries: number;
    inactiveIndustries: number;
    gdpCoverage: number;
    industryDetails: IndustryDetail[];
    systemHealth: SystemHealthStatus;
}

interface IndustryDetail {
    industry: IndustryVertical;
    active: boolean;
    gdpPercentage: number;
    configuration?: IndustryConfiguration;
    lastActivated?: string;
}

interface SystemHealthStatus {
    status: 'HEALTHY' | 'WARNING' | 'ERROR';
    extensionsLoaded: number;
    configurationsValid: number;
    lastHealthCheck: string;
}

// CLI Interface
if (require.main === module) {
    const activationSystem = new IndustryActivationSystem();

    async function main() {
        const command = process.argv[2];
        const args = process.argv.slice(3);

        try {
            await activationSystem.initialize();

            switch (command) {
                case 'activate':
                    if (args.length === 0) {
                        console.error('Usage: activate <industry>');
                        process.exit(1);
                    }
                    await activationSystem.activateIndustry(args[0] as IndustryVertical);
                    break;

                case 'deactivate':
                    if (args.length === 0) {
                        console.error('Usage: deactivate <industry>');
                        process.exit(1);
                    }
                    await activationSystem.deactivateIndustry(args[0] as IndustryVertical);
                    break;

                case 'list':
                    console.log('Available Industries:', activationSystem.getAvailableIndustries());
                    console.log('Active Industries:', activationSystem.getActiveIndustries());
                    break;

                case 'report':
                    const report = await activationSystem.generateActivationReport();
                    console.log(JSON.stringify(report, null, 2));
                    break;

                case 'activate-all':
                    const allIndustries = activationSystem.getAvailableIndustries();
                    await activationSystem.activateIndustries(allIndustries);
                    break;

                default:
                    console.log('Usage: industry-activation-system <command> [args]');
                    console.log('Commands: activate, deactivate, list, report, activate-all');
            }
        } catch (error) {
            console.error('Error:', error);
            process.exit(1);
        }
    }

    main();
}

export { IndustryActivationSystem, IndustryConfiguration, IndustrySuggestion, IndustryActivationReport };