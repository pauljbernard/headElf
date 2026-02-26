import { EventEmitter } from 'events';
import {
    IndustryVertical,
    IndustryContext,
    IndustryExtension,
    CsuiteRole,
    ExecutiveDecision,
    ExecutiveRecommendation
} from './types';

/**
 * Industry Context Detection and Routing System
 * Intelligently detects industry context from queries and routes to appropriate extensions
 */
export class IndustryContextRouter extends EventEmitter {
    private industryExtensions: Map<IndustryVertical, IndustryExtension>;
    private contextPatterns: Map<IndustryVertical, ContextPattern[]>;
    private routingRules: RoutingRule[];
    private activeIndustries: Set<IndustryVertical>;

    constructor() {
        super();
        this.industryExtensions = new Map();
        this.contextPatterns = new Map();
        this.routingRules = [];
        this.activeIndustries = new Set();
        this.initializeContextPatterns();
        this.initializeRoutingRules();
    }

    /**
     * Register an industry extension
     */
    public registerIndustryExtension(extension: IndustryExtension): void {
        this.industryExtensions.set(extension.industry, extension);
        this.emit('extensionRegistered', { industry: extension.industry });
    }

    /**
     * Set active industries
     */
    public setActiveIndustries(industries: IndustryVertical[]): void {
        this.activeIndustries = new Set(industries);
        this.emit('activeIndustriesUpdated', { industries });
    }

    /**
     * Detect industry context from input
     */
    public async detectIndustryContext(input: ContextDetectionInput): Promise<IndustryContextResult[]> {
        const results: IndustryContextResult[] = [];

        // Multi-stage context detection
        const textAnalysis = await this.analyzeTextContent(input.text || '');
        const businessMetrics = await this.analyzeBusinessMetrics(input.businessMetrics);
        const domainAnalysis = await this.analyzeDomainContext(input.domain);
        const complianceSignals = await this.analyzeComplianceSignals(input.complianceRequirements);

        // Score each industry
        for (const [industry, extension] of this.industryExtensions) {
            // Only consider active industries unless explicitly requested
            if (!this.activeIndustries.has(industry) && !input.includeInactive) {
                continue;
            }

            const confidence = await this.calculateIndustryConfidence(
                industry,
                textAnalysis,
                businessMetrics,
                domainAnalysis,
                complianceSignals,
                input
            );

            if (confidence > (input.confidenceThreshold || 0.3)) {
                results.push({
                    industry,
                    confidence,
                    extension,
                    matchingPatterns: await this.getMatchingPatterns(industry, input),
                    contextEnrichment: await this.enrichIndustryContext(industry, input),
                    recommendedActions: await this.getRecommendedActions(industry, confidence)
                });
            }
        }

        // Sort by confidence
        results.sort((a, b) => b.confidence - a.confidence);

        this.emit('contextDetected', { results, input });
        return results;
    }

    /**
     * Route executive decision to appropriate industry extensions
     */
    public async routeExecutiveDecision(
        role: CsuiteRole,
        decision: ExecutiveDecision,
        context?: IndustryContext
    ): Promise<IndustryRoutingResult[]> {
        const routingResults: IndustryRoutingResult[] = [];

        // Detect relevant industries if context not provided
        let relevantIndustries: IndustryContextResult[] = [];
        if (context) {
            relevantIndustries = await this.detectIndustryContext({
                text: decision.description,
                businessMetrics: context.businessMetrics,
                domain: context.domain,
                confidenceThreshold: 0.5
            });
        }

        // Apply routing rules
        const applicableRules = this.getApplicableRoutingRules(role, decision, relevantIndustries);

        for (const rule of applicableRules) {
            for (const industry of rule.targetIndustries) {
                const extension = this.industryExtensions.get(industry);
                if (extension && this.activeIndustries.has(industry)) {
                    try {
                        const enhancedRecommendation = await extension.enhanceCsuiteDecision(
                            role,
                            decision,
                            context || this.createContextFromDecision(decision)
                        );

                        routingResults.push({
                            industry,
                            extension,
                            rule,
                            enhancedRecommendation,
                            processingTime: Date.now(),
                            success: true
                        });
                    } catch (error) {
                        routingResults.push({
                            industry,
                            extension,
                            rule,
                            error: error as Error,
                            processingTime: Date.now(),
                            success: false
                        });
                    }
                }
            }
        }

        this.emit('decisionRouted', { role, decision, results: routingResults });
        return routingResults;
    }

    /**
     * Get industry-specific analysis for a context
     */
    public async getIndustryAnalysis(
        industry: IndustryVertical,
        context: IndustryContext
    ): Promise<any> {
        const extension = this.industryExtensions.get(industry);
        if (!extension) {
            throw new Error(`Industry extension not found: ${industry}`);
        }

        return await extension.analyzeIndustryContext(context);
    }

    /**
     * Get multi-industry analysis
     */
    public async getMultiIndustryAnalysis(
        industries: IndustryVertical[],
        context: IndustryContext
    ): Promise<Map<IndustryVertical, any>> {
        const results = new Map();

        await Promise.all(
            industries.map(async (industry) => {
                try {
                    const analysis = await this.getIndustryAnalysis(industry, context);
                    results.set(industry, analysis);
                } catch (error) {
                    results.set(industry, { error: error.message });
                }
            })
        );

        return results;
    }

    // Private implementation methods
    private initializeContextPatterns(): void {
        this.contextPatterns.set(IndustryVertical.REAL_ESTATE_RENTAL_LEASING, [
            { keywords: ['real estate', 'property', 'rental', 'leasing', 'reit', 'cap rate'], weight: 0.8 },
            { keywords: ['commercial property', 'residential', 'office space', 'retail space'], weight: 0.7 },
            { keywords: ['property management', 'tenant', 'landlord', 'occupancy'], weight: 0.6 }
        ]);

        this.contextPatterns.set(IndustryVertical.PROFESSIONAL_BUSINESS_SERVICES, [
            { keywords: ['consulting', 'legal services', 'accounting', 'professional services'], weight: 0.8 },
            { keywords: ['advisory', 'audit', 'tax', 'compliance', 'risk management'], weight: 0.7 },
            { keywords: ['client', 'billable hours', 'utilization', 'engagement'], weight: 0.6 }
        ]);

        this.contextPatterns.set(IndustryVertical.MANUFACTURING, [
            { keywords: ['manufacturing', 'production', 'factory', 'assembly line', 'oee'], weight: 0.8 },
            { keywords: ['lean', 'six sigma', 'quality control', 'supply chain'], weight: 0.7 },
            { keywords: ['inventory', 'throughput', 'cycle time', 'defect rate'], weight: 0.6 }
        ]);

        this.contextPatterns.set(IndustryVertical.FINANCE_INSURANCE, [
            { keywords: ['banking', 'insurance', 'financial services', 'credit', 'loans'], weight: 0.8 },
            { keywords: ['underwriting', 'risk assessment', 'compliance', 'regulatory'], weight: 0.7 },
            { keywords: ['basel', 'dodd-frank', 'solvency', 'capital adequacy'], weight: 0.6 }
        ]);

        this.contextPatterns.set(IndustryVertical.HEALTHCARE_EDUCATION, [
            { keywords: ['healthcare', 'medical', 'hospital', 'patient', 'clinical'], weight: 0.8 },
            { keywords: ['education', 'university', 'school', 'student', 'academic'], weight: 0.8 },
            { keywords: ['hipaa', 'ferpa', 'accreditation', 'outcomes'], weight: 0.7 }
        ]);

        // Add patterns for remaining industries...
        this.addRemainingContextPatterns();
    }

    private addRemainingContextPatterns(): void {
        // IT Industry
        this.contextPatterns.set(IndustryVertical.INFORMATION_TECHNOLOGY, [
            { keywords: ['software', 'technology', 'development', 'cloud', 'cybersecurity'], weight: 0.8 },
            { keywords: ['agile', 'devops', 'api', 'infrastructure', 'data'], weight: 0.7 }
        ]);

        // Government
        this.contextPatterns.set(IndustryVertical.GOVERNMENT, [
            { keywords: ['government', 'public sector', 'federal', 'state', 'municipal'], weight: 0.8 },
            { keywords: ['policy', 'regulation', 'compliance', 'citizen services'], weight: 0.7 }
        ]);

        // Transportation & Warehousing
        this.contextPatterns.set(IndustryVertical.TRANSPORTATION_WAREHOUSING, [
            { keywords: ['logistics', 'transportation', 'shipping', 'freight', 'supply chain'], weight: 0.8 },
            { keywords: ['warehouse', 'distribution', 'delivery', 'fleet'], weight: 0.7 }
        ]);

        // Retail
        this.contextPatterns.set(IndustryVertical.RETAIL_TRADE, [
            { keywords: ['retail', 'store', 'customer', 'sales', 'merchandise'], weight: 0.8 },
            { keywords: ['e-commerce', 'inventory', 'point of sale', 'consumer'], weight: 0.7 }
        ]);

        // Wholesale
        this.contextPatterns.set(IndustryVertical.WHOLESALE_TRADE, [
            { keywords: ['wholesale', 'distribution', 'b2b', 'supplier', 'vendor'], weight: 0.8 },
            { keywords: ['procurement', 'inventory', 'logistics', 'trade'], weight: 0.7 }
        ]);

        // Add remaining patterns for other industries...
    }

    private initializeRoutingRules(): void {
        // Financial decisions route to finance and related industries
        this.routingRules.push({
            id: 'financial-decisions',
            conditions: {
                decisionTypes: ['STRATEGIC', 'OPERATIONAL'],
                keywords: ['budget', 'investment', 'financial', 'cost', 'revenue']
            },
            targetIndustries: [
                IndustryVertical.FINANCE_INSURANCE,
                IndustryVertical.PROFESSIONAL_BUSINESS_SERVICES
            ],
            priority: 'HIGH'
        });

        // Technology decisions
        this.routingRules.push({
            id: 'technology-decisions',
            conditions: {
                decisionTypes: ['STRATEGIC', 'OPERATIONAL'],
                keywords: ['technology', 'digital', 'software', 'system', 'automation']
            },
            targetIndustries: [
                IndustryVertical.INFORMATION_TECHNOLOGY,
                IndustryVertical.MANUFACTURING,
                IndustryVertical.PROFESSIONAL_BUSINESS_SERVICES
            ],
            priority: 'HIGH'
        });

        // Regulatory/compliance decisions
        this.routingRules.push({
            id: 'compliance-decisions',
            conditions: {
                decisionTypes: ['COMPLEX'],
                keywords: ['compliance', 'regulatory', 'legal', 'audit', 'risk']
            },
            targetIndustries: [
                IndustryVertical.FINANCE_INSURANCE,
                IndustryVertical.HEALTHCARE_EDUCATION,
                IndustryVertical.GOVERNMENT,
                IndustryVertical.PROFESSIONAL_BUSINESS_SERVICES
            ],
            priority: 'HIGH'
        });

        // Operational decisions
        this.routingRules.push({
            id: 'operational-decisions',
            conditions: {
                decisionTypes: ['OPERATIONAL', 'TACTICAL'],
                keywords: ['operations', 'efficiency', 'productivity', 'process']
            },
            targetIndustries: [
                IndustryVertical.MANUFACTURING,
                IndustryVertical.TRANSPORTATION_WAREHOUSING,
                IndustryVertical.RETAIL_TRADE
            ],
            priority: 'MEDIUM'
        });
    }

    private async analyzeTextContent(text: string): Promise<TextAnalysisResult> {
        const words = text.toLowerCase().split(/\s+/);
        const industryMatches: Map<IndustryVertical, number> = new Map();

        for (const [industry, patterns] of this.contextPatterns) {
            let score = 0;
            for (const pattern of patterns) {
                const matchingKeywords = pattern.keywords.filter(keyword =>
                    words.some(word => word.includes(keyword) || keyword.includes(word))
                );
                score += matchingKeywords.length * pattern.weight;
            }
            if (score > 0) {
                industryMatches.set(industry, score);
            }
        }

        return { industryMatches, totalWords: words.length };
    }

    private async analyzeBusinessMetrics(metrics?: any): Promise<BusinessMetricsAnalysisResult> {
        if (!metrics) return { industryIndicators: new Map() };

        const industryIndicators: Map<IndustryVertical, number> = new Map();

        // Analyze metric names and values for industry indicators
        if (metrics.revenue || metrics.sales) {
            industryIndicators.set(IndustryVertical.RETAIL_TRADE, 0.6);
            industryIndicators.set(IndustryVertical.WHOLESALE_TRADE, 0.5);
        }

        if (metrics.oee || metrics.throughput || metrics.defectRate) {
            industryIndicators.set(IndustryVertical.MANUFACTURING, 0.8);
        }

        if (metrics.patientSatisfaction || metrics.readmissionRate) {
            industryIndicators.set(IndustryVertical.HEALTHCARE_EDUCATION, 0.9);
        }

        return { industryIndicators };
    }

    private async analyzeDomainContext(domain?: string): Promise<DomainAnalysisResult> {
        if (!domain) return { industrySignals: new Map() };

        const industrySignals: Map<IndustryVertical, number> = new Map();

        // Domain-based industry detection
        const domainLower = domain.toLowerCase();

        if (domainLower.includes('.gov') || domainLower.includes('government')) {
            industrySignals.set(IndustryVertical.GOVERNMENT, 0.9);
        }

        if (domainLower.includes('bank') || domainLower.includes('financial')) {
            industrySignals.set(IndustryVertical.FINANCE_INSURANCE, 0.8);
        }

        if (domainLower.includes('tech') || domainLower.includes('software')) {
            industrySignals.set(IndustryVertical.INFORMATION_TECHNOLOGY, 0.8);
        }

        return { industrySignals };
    }

    private async analyzeComplianceSignals(requirements?: any[]): Promise<ComplianceAnalysisResult> {
        if (!requirements) return { industryCompliance: new Map() };

        const industryCompliance: Map<IndustryVertical, number> = new Map();

        for (const req of requirements) {
            const framework = req.framework?.toLowerCase() || '';

            if (framework.includes('hipaa') || framework.includes('joint commission')) {
                industryCompliance.set(IndustryVertical.HEALTHCARE_EDUCATION, 0.9);
            }

            if (framework.includes('basel') || framework.includes('dodd-frank')) {
                industryCompliance.set(IndustryVertical.FINANCE_INSURANCE, 0.9);
            }

            if (framework.includes('osha')) {
                industryCompliance.set(IndustryVertical.MANUFACTURING, 0.8);
                industryCompliance.set(IndustryVertical.CONSTRUCTION, 0.8);
            }
        }

        return { industryCompliance };
    }

    private async calculateIndustryConfidence(
        industry: IndustryVertical,
        textAnalysis: TextAnalysisResult,
        businessMetrics: BusinessMetricsAnalysisResult,
        domainAnalysis: DomainAnalysisResult,
        complianceSignals: ComplianceAnalysisResult,
        input: ContextDetectionInput
    ): Promise<number> {
        let confidence = 0;

        // Text analysis weight: 40%
        const textScore = textAnalysis.industryMatches.get(industry) || 0;
        confidence += (textScore / Math.max(textAnalysis.totalWords * 0.1, 1)) * 0.4;

        // Business metrics weight: 25%
        const metricsScore = businessMetrics.industryIndicators.get(industry) || 0;
        confidence += metricsScore * 0.25;

        // Domain analysis weight: 20%
        const domainScore = domainAnalysis.industrySignals.get(industry) || 0;
        confidence += domainScore * 0.2;

        // Compliance signals weight: 15%
        const complianceScore = complianceSignals.industryCompliance.get(industry) || 0;
        confidence += complianceScore * 0.15;

        return Math.min(confidence, 1.0);
    }

    private async getMatchingPatterns(industry: IndustryVertical, input: ContextDetectionInput): Promise<string[]> {
        const patterns = this.contextPatterns.get(industry) || [];
        const matchingPatterns: string[] = [];

        const text = (input.text || '').toLowerCase();
        for (const pattern of patterns) {
            const matchingKeywords = pattern.keywords.filter(keyword => text.includes(keyword));
            if (matchingKeywords.length > 0) {
                matchingPatterns.push(`Keywords: ${matchingKeywords.join(', ')}`);
            }
        }

        return matchingPatterns;
    }

    private async enrichIndustryContext(industry: IndustryVertical, input: ContextDetectionInput): Promise<any> {
        return {
            industry,
            detectedPatterns: await this.getMatchingPatterns(industry, input),
            relevantMetrics: input.businessMetrics || {},
            timestamp: new Date().toISOString()
        };
    }

    private async getRecommendedActions(industry: IndustryVertical, confidence: number): Promise<string[]> {
        const actions: string[] = [];

        if (confidence > 0.8) {
            actions.push(`Highly confident match - Apply ${industry} expertise immediately`);
        } else if (confidence > 0.6) {
            actions.push(`Good match - Consider ${industry} industry factors`);
        } else if (confidence > 0.4) {
            actions.push(`Possible match - Review ${industry} implications`);
        }

        return actions;
    }

    private getApplicableRoutingRules(
        role: CsuiteRole,
        decision: ExecutiveDecision,
        industries: IndustryContextResult[]
    ): RoutingRule[] {
        return this.routingRules.filter(rule => {
            // Check decision type
            if (rule.conditions.decisionTypes && !rule.conditions.decisionTypes.includes(decision.type)) {
                return false;
            }

            // Check keywords
            if (rule.conditions.keywords) {
                const decisionText = decision.description.toLowerCase();
                const hasKeyword = rule.conditions.keywords.some(keyword =>
                    decisionText.includes(keyword.toLowerCase())
                );
                if (!hasKeyword) return false;
            }

            return true;
        });
    }

    private createContextFromDecision(decision: ExecutiveDecision): IndustryContext {
        return {
            description: decision.description,
            businessMetrics: {},
            timeHorizon: decision.timeHorizon,
            stakeholders: decision.stakeholders || [],
            riskTolerance: 'MEDIUM'
        };
    }
}

// Type definitions
interface ContextDetectionInput {
    text?: string;
    businessMetrics?: any;
    domain?: string;
    complianceRequirements?: any[];
    confidenceThreshold?: number;
    includeInactive?: boolean;
}

interface IndustryContextResult {
    industry: IndustryVertical;
    confidence: number;
    extension: IndustryExtension;
    matchingPatterns: string[];
    contextEnrichment: any;
    recommendedActions: string[];
}

interface IndustryRoutingResult {
    industry: IndustryVertical;
    extension: IndustryExtension;
    rule: RoutingRule;
    enhancedRecommendation?: ExecutiveRecommendation;
    error?: Error;
    processingTime: number;
    success: boolean;
}

interface ContextPattern {
    keywords: string[];
    weight: number;
}

interface RoutingRule {
    id: string;
    conditions: {
        decisionTypes?: string[];
        keywords?: string[];
        roles?: CsuiteRole[];
    };
    targetIndustries: IndustryVertical[];
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface TextAnalysisResult {
    industryMatches: Map<IndustryVertical, number>;
    totalWords: number;
}

interface BusinessMetricsAnalysisResult {
    industryIndicators: Map<IndustryVertical, number>;
}

interface DomainAnalysisResult {
    industrySignals: Map<IndustryVertical, number>;
}

interface ComplianceAnalysisResult {
    industryCompliance: Map<IndustryVertical, number>;
}

export { IndustryContextRouter, ContextDetectionInput, IndustryContextResult, IndustryRoutingResult };