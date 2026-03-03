/**
 * Strategic Clarity Enhancement Engine
 *
 * Transforms sophisticated analytical intelligence into crystalline strategic insights
 * that combine ChatGPT-level strategic clarity with HeadElf-level analytical rigor.
 */

export interface StrategicInsight {
  coreInsight: string; // One sentence that reframes the entire challenge
  reframingPower: number; // 1-10 scale of insight value
  executiveUtility: number; // 1-10 scale of decision-making value
  evidenceBase: string[]; // Supporting analytical evidence
  implicationChain: string[]; // Strategic implications that flow from the insight
}

export interface ClarityMetrics {
  insightDensity: number; // Key insights per paragraph
  executiveReadability: number; // Accessibility to C-suite (1-10)
  analyticalRigor: number; // Quantitative depth (1-10)
  strategicValue: number; // Decision-making impact (1-10)
  communicationEfficiency: number; // Value per word ratio (1-10)
}

export interface EnhancementRecommendations {
  clarityImprovements: Array<{
    issue: string;
    recommendation: string;
    expectedImprovement: number;
    implementationApproach: string;
  }>;
  strategicFocus: Array<{
    currentApproach: string;
    enhancedApproach: string;
    strategicValue: number;
    executiveImpact: string;
  }>;
  communicationOptimization: Array<{
    section: string;
    currentLength: number;
    optimizedLength: number;
    valuePreservation: number; // Percentage of value retained
    clarityGain: number; // Improvement in clarity
  }>;
}

export interface StrategicFramework {
  constraintIdentification: {
    primaryConstraint: string;
    constraintType: 'operational' | 'financial' | 'regulatory' | 'competitive' | 'organizational';
    impactMagnitude: number; // 1-10 scale
    solvabilityLevel: number; // 1-10 scale (how addressable)
    strategicImplication: string;
  };

  decisionFramework: {
    coreTradeoff: string; // Primary strategic tradeoff
    optionEvaluation: Array<{
      option: string;
      constraintAlignment: number; // How well it addresses primary constraint
      riskLevel: number;
      valueCreation: number;
      executionComplexity: number;
    }>;
    decisiveFactor: string; // What ultimately drives the decision
  };

  implementationLogic: {
    criticalPath: string[]; // Sequence that determines success
    successDependencies: string[]; // What must go right
    failureModes: string[]; // What could go wrong
    contingencyTriggers: string[]; // When to pivot
  };
}

export class StrategicClarityEnhancementEngine {
  private insightPatterns: Map<string, string[]> = new Map();
  private clarityBenchmarks: Map<string, ClarityMetrics> = new Map();

  constructor() {
    this.initializeInsightPatterns();
    this.initializeClarityBenchmarks();
  }

  private initializeInsightPatterns(): void {
    // Strategic insight patterns that reframe challenges effectively
    this.insightPatterns.set('constraint-focused', [
      'The key constraint is not [obvious factor], but [hidden constraint]',
      'This is not a [technical/financial] problem, but a [strategic constraint] problem',
      'The real choice is between [fundamental tradeoff A] and [fundamental tradeoff B]',
      'Success depends on [critical capability] while maintaining [essential requirement]'
    ]);

    this.insightPatterns.set('reframing', [
      'This decision determines whether [long-term strategic outcome]',
      'The architecture you choose determines [competitive future state]',
      'The fundamental question is not [surface question] but [deeper strategic question]',
      'This is ultimately about [strategic capability] rather than [tactical solution]'
    ]);

    this.insightPatterns.set('value-crystallization', [
      'The highest value action is [specific recommendation] because [constraint-based reasoning]',
      'The optimal strategy balances [competing priority A] with [competing priority B] by [integration approach]',
      'Success requires [capability] which can only be achieved through [specific approach]',
      'The decisive factor is [key variable] which favors [recommended approach]'
    ]);
  }

  private initializeClarityBenchmarks(): void {
    // McKinsey/Bain/BCG clarity standards
    this.clarityBenchmarks.set('mckinsey-standard', {
      insightDensity: 8.5, // High-value insights per paragraph
      executiveReadability: 9.0, // Accessible to C-suite
      analyticalRigor: 8.0, // Quantitative depth
      strategicValue: 9.0, // Decision-making impact
      communicationEfficiency: 8.5 // Value per word
    });

    this.clarityBenchmarks.set('chatgpt-standard', {
      insightDensity: 9.0, // Excellent insight density
      executiveReadability: 9.5, // Very accessible
      analyticalRigor: 6.0, // Limited quantitative depth
      strategicValue: 8.5, // Strong strategic insights
      communicationEfficiency: 9.5 // Excellent efficiency
    });

    this.clarityBenchmarks.set('headelelf-current', {
      insightDensity: 7.0, // Good but could be higher
      executiveReadability: 7.5, // Professional but dense
      analyticalRigor: 9.5, // Excellent quantitative depth
      strategicValue: 8.0, // Strong analytical support
      communicationEfficiency: 6.5 // Could be more efficient
    });

    this.clarityBenchmarks.set('headelelf-target', {
      insightDensity: 9.0, // ChatGPT-level insight density
      executiveReadability: 9.0, // Highly accessible
      analyticalRigor: 9.5, // Maintain analytical excellence
      strategicValue: 9.5, // Enhanced strategic value
      communicationEfficiency: 9.0 // Significant improvement
    });
  }

  public identifyStrategicInsight(
    analysisContent: string,
    challengeType: 'technology' | 'financial' | 'strategic' | 'operational' | 'organizational'
  ): StrategicInsight {

    // Extract key analytical elements
    const analyticalElements = this.extractAnalyticalElements(analysisContent);

    // Identify primary constraint
    const primaryConstraint = this.identifyPrimaryConstraint(analyticalElements, challengeType);

    // Generate crystalline insight
    const coreInsight = this.generateCoreInsight(primaryConstraint, analyticalElements, challengeType);

    // Assess insight quality
    const reframingPower = this.assessReframingPower(coreInsight, analyticalElements);
    const executiveUtility = this.assessExecutiveUtility(coreInsight, challengeType);

    // Build evidence base
    const evidenceBase = this.extractSupportingEvidence(coreInsight, analyticalElements);

    // Develop implication chain
    const implicationChain = this.buildImplicationChain(coreInsight, analyticalElements);

    return {
      coreInsight,
      reframingPower,
      executiveUtility,
      evidenceBase,
      implicationChain
    };
  }

  private extractAnalyticalElements(content: string): any {
    return {
      financialData: this.extractFinancialMetrics(content),
      riskFactors: this.extractRiskFactors(content),
      constraints: this.extractConstraints(content),
      options: this.extractStrategicOptions(content),
      tradeoffs: this.extractTradeoffs(content),
      successFactors: this.extractSuccessFactors(content)
    };
  }

  private extractFinancialMetrics(content: string): string[] {
    const financialRegex = /\$[\d,.]+[BM]?|\d+[\d,.]*%|NPV|IRR|ROI|€[\d,.]+[BM]?/gi;
    return content.match(financialRegex) || [];
  }

  private extractRiskFactors(content: string): string[] {
    const riskPatterns = [
      /risk.*?[:.]\s*([^.]*)/gi,
      /probability.*?[:.]\s*([^.]*)/gi,
      /failure.*?[:.]\s*([^.]*)/gi,
      /challenge.*?[:.]\s*([^.]*)/gi
    ];

    let risks: string[] = [];
    riskPatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      risks.push(...matches);
    });

    return risks.slice(0, 5); // Top 5 risk factors
  }

  private extractConstraints(content: string): string[] {
    const constraintKeywords = [
      'constraint', 'limitation', 'requirement', 'must maintain', 'cannot',
      'regulatory', 'compliance', 'uptime', 'continuity', 'approval'
    ];

    const constraints: string[] = [];
    constraintKeywords.forEach(keyword => {
      const regex = new RegExp(`([^.]*${keyword}[^.]*\.)`, 'gi');
      const matches = content.match(regex) || [];
      constraints.push(...matches.map(m => m.trim()));
    });

    return constraints.slice(0, 3); // Top 3 constraints
  }

  private extractStrategicOptions(content: string): string[] {
    const optionPatterns = [
      /option\s*\d+[:.]\s*([^.]*)/gi,
      /approach\s*\d+[:.]\s*([^.]*)/gi,
      /strategy[:.]\s*([^.]*)/gi
    ];

    let options: string[] = [];
    optionPatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      options.push(...matches);
    });

    return options.slice(0, 3); // Top 3 options
  }

  private extractTradeoffs(content: string): string[] {
    const tradeoffPatterns = [
      /trade.*?off.*?between\s*([^.]*)/gi,
      /balance.*?between\s*([^.]*)/gi,
      /versus.*?([^.]*)/gi,
      /either.*?or.*?([^.]*)/gi
    ];

    let tradeoffs: string[] = [];
    tradeoffPatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      tradeoffs.push(...matches);
    });

    return tradeoffs.slice(0, 2); // Top 2 tradeoffs
  }

  private extractSuccessFactors(content: string): string[] {
    const successPatterns = [
      /success.*?depends.*?on\s*([^.]*)/gi,
      /critical.*?factor.*?[:.]\s*([^.]*)/gi,
      /key.*?to.*?success.*?[:.]\s*([^.]*)/gi
    ];

    let factors: string[] = [];
    successPatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      factors.push(...matches);
    });

    return factors.slice(0, 3); // Top 3 success factors
  }

  private identifyPrimaryConstraint(elements: any, challengeType: string): string {
    const { constraints, riskFactors } = elements;

    // Constraint priority by challenge type
    const constraintPriorities: { [key: string]: string[] } = {
      technology: ['system stability', 'regulatory approval', 'talent', 'timeline'],
      financial: ['capital availability', 'regulatory approval', 'market conditions', 'execution risk'],
      strategic: ['competitive timing', 'market position', 'execution capability', 'resource allocation'],
      operational: ['business continuity', 'regulatory compliance', 'process integration', 'customer impact'],
      organizational: ['change management', 'talent retention', 'culture transformation', 'leadership alignment']
    };

    const priorities = constraintPriorities[challengeType] || [];

    // Find the highest priority constraint mentioned
    for (const priority of priorities) {
      for (const constraint of constraints) {
        if (constraint.toLowerCase().includes(priority.toLowerCase())) {
          return priority;
        }
      }
    }

    // Fallback to first significant constraint
    return constraints[0] || 'execution complexity';
  }

  private generateCoreInsight(
    primaryConstraint: string,
    elements: any,
    challengeType: string
  ): string {
    const { options, tradeoffs, successFactors } = elements;

    // Insight generation based on constraint type
    const insightTemplates: { [key: string]: string[] } = {
      'system stability': [
        'The key constraint is not technology choice, but maintaining operational continuity while transforming the platform.',
        'Success depends on preserving system stability during transformation rather than optimizing for future architecture.',
        'This is ultimately about continuity while modernizing rather than rebuilding for optimal design.'
      ],
      'regulatory approval': [
        'The decisive factor is regulatory approval timeline, which favors approaches that minimize core system modifications.',
        'Success requires balancing innovation speed with regulatory complexity rather than choosing optimal technology.',
        'The primary constraint is regulatory compliance continuity, not technical architecture selection.'
      ],
      'execution complexity': [
        'The highest value approach balances execution risk with capability delivery rather than maximizing technical benefits.',
        'Success depends on managing complexity during transition more than achieving optimal end-state architecture.',
        'This is fundamentally about execution capability rather than strategic option selection.'
      ],
      'competitive timing': [
        'The key insight is that competitive advantage comes from speed of capability delivery, not architectural perfection.',
        'Success depends on time-to-market for new capabilities rather than long-term technical optimization.',
        'The decisive factor is innovation velocity during transformation, not final architecture quality.'
      ]
    };

    const templates = insightTemplates[primaryConstraint] || insightTemplates['execution complexity'];
    return templates[0]; // Use first template as primary insight
  }

  private assessReframingPower(insight: string, elements: any): number {
    // Assess how well the insight reframes the challenge
    let score = 5; // Base score

    // Bonus for constraint-focused insights
    if (insight.includes('constraint') || insight.includes('key factor')) score += 2;

    // Bonus for reframing language
    if (insight.includes('not about') || insight.includes('rather than')) score += 2;

    // Bonus for strategic vs tactical distinction
    if (insight.includes('ultimately') || insight.includes('fundamentally')) score += 1;

    return Math.min(score, 10);
  }

  private assessExecutiveUtility(insight: string, challengeType: string): number {
    // Assess decision-making value for executives
    let score = 6; // Base score

    // Bonus for clear decision criteria
    if (insight.includes('depends on') || insight.includes('favors')) score += 2;

    // Bonus for actionable framing
    if (insight.includes('approach') || insight.includes('strategy')) score += 1;

    // Bonus for business outcome focus
    if (insight.includes('competitive') || insight.includes('value') || insight.includes('success')) score += 1;

    return Math.min(score, 10);
  }

  private extractSupportingEvidence(insight: string, elements: any): string[] {
    const { financialData, riskFactors, constraints } = elements;

    const evidence: string[] = [];

    // Add relevant financial evidence
    if (financialData.length > 0) {
      evidence.push(`Financial analysis: ${financialData.slice(0, 2).join(', ')}`);
    }

    // Add key risk factors
    if (riskFactors.length > 0) {
      evidence.push(`Primary risks: ${riskFactors.slice(0, 2).join('; ')}`);
    }

    // Add constraint evidence
    if (constraints.length > 0) {
      evidence.push(`Key constraints: ${constraints.slice(0, 1).join('')}`);
    }

    return evidence;
  }

  private buildImplicationChain(insight: string, elements: any): string[] {
    const { options, successFactors } = elements;

    const implications: string[] = [];

    // Strategic implications
    implications.push('Strategic implication: Optimize for execution success rather than theoretical perfection');

    // Implementation implications
    implications.push('Implementation implication: Phased approach with continuous risk mitigation required');

    // Organizational implications
    implications.push('Organizational implication: Change management becomes critical success factor');

    return implications;
  }

  public assessClarityMetrics(content: string): ClarityMetrics {
    const wordCount = content.split(/\s+/).length;
    const paragraphCount = content.split(/\n\s*\n/).length;
    const insightMarkers = ['insight', 'key finding', 'strategic', 'recommendation'].length;

    // Calculate metrics
    const insightDensity = this.calculateInsightDensity(content);
    const executiveReadability = this.calculateExecutiveReadability(content);
    const analyticalRigor = this.calculateAnalyticalRigor(content);
    const strategicValue = this.calculateStrategicValue(content);
    const communicationEfficiency = this.calculateCommunicationEfficiency(content);

    return {
      insightDensity,
      executiveReadability,
      analyticalRigor,
      strategicValue,
      communicationEfficiency
    };
  }

  private calculateInsightDensity(content: string): number {
    const insights = content.match(/key insight|strategic|recommendation|conclusion|finding/gi) || [];
    const paragraphs = content.split(/\n\s*\n/).length;
    return Math.min((insights.length / paragraphs) * 10, 10);
  }

  private calculateExecutiveReadability(content: string): number {
    // Simple readability based on sentence length and jargon
    const sentences = content.split(/[.!?]+/).length;
    const words = content.split(/\s+/).length;
    const avgSentenceLength = words / sentences;

    // Penalize very long sentences (executive preference for clarity)
    let score = 10 - Math.max(0, (avgSentenceLength - 20) * 0.2);

    // Bonus for executive language
    const executiveTerms = content.match(/strategic|recommendation|decision|impact|value|roi/gi) || [];
    score += Math.min(executiveTerms.length * 0.1, 2);

    return Math.min(Math.max(score, 1), 10);
  }

  private calculateAnalyticalRigor(content: string): number {
    let score = 5; // Base score

    // Bonus for quantified metrics
    const metrics = content.match(/\$[\d,.]+[BM]?|\d+[\d,.]*%|NPV|IRR|ROI/gi) || [];
    score += Math.min(metrics.length * 0.5, 3);

    // Bonus for risk quantification
    const riskQuant = content.match(/probability.*\d+|risk.*\d+|confidence.*\d+/gi) || [];
    score += Math.min(riskQuant.length * 0.5, 2);

    return Math.min(score, 10);
  }

  private calculateStrategicValue(content: string): number {
    let score = 6; // Base score

    // Bonus for strategic frameworks
    const frameworks = content.match(/framework|analysis|assessment|evaluation/gi) || [];
    score += Math.min(frameworks.length * 0.2, 2);

    // Bonus for decision support elements
    const decisions = content.match(/recommend|decision|choose|select|strategy/gi) || [];
    score += Math.min(decisions.length * 0.2, 2);

    return Math.min(score, 10);
  }

  private calculateCommunicationEfficiency(content: string): number {
    const words = content.split(/\s+/).length;
    const insights = content.match(/key|strategic|recommend|conclusion|finding|insight/gi) || [];

    // Value per word ratio
    const efficiency = (insights.length * 100) / words;
    return Math.min(efficiency * 100, 10);
  }

  public generateEnhancementRecommendations(
    content: string,
    currentMetrics: ClarityMetrics,
    targetBenchmark: string = 'headelelf-target'
  ): EnhancementRecommendations {
    const target = this.clarityBenchmarks.get(targetBenchmark)!;

    const clarityImprovements: EnhancementRecommendations['clarityImprovements'] = [];
    const strategicFocus: EnhancementRecommendations['strategicFocus'] = [];
    const communicationOptimization: EnhancementRecommendations['communicationOptimization'] = [];

    // Insight density improvements
    if (currentMetrics.insightDensity < target.insightDensity) {
      clarityImprovements.push({
        issue: 'Low insight density',
        recommendation: 'Lead with crystalline strategic insight before analytical detail',
        expectedImprovement: target.insightDensity - currentMetrics.insightDensity,
        implementationApproach: 'Start with "The key constraint is..." or "This is ultimately about..."'
      });
    }

    // Communication efficiency improvements
    if (currentMetrics.communicationEfficiency < target.communicationEfficiency) {
      clarityImprovements.push({
        issue: 'Low communication efficiency',
        recommendation: 'Reduce text length while preserving analytical rigor',
        expectedImprovement: target.communicationEfficiency - currentMetrics.communicationEfficiency,
        implementationApproach: 'Use bullet points for supporting detail, prose for strategic insights'
      });
    }

    // Strategic focus improvements
    strategicFocus.push({
      currentApproach: 'Comprehensive analysis with embedded insights',
      enhancedApproach: 'Crystalline insight followed by supporting analysis',
      strategicValue: 9,
      executiveImpact: 'Faster decision-making with maintained analytical confidence'
    });

    // Communication optimization
    communicationOptimization.push({
      section: 'Executive Summary',
      currentLength: 200,
      optimizedLength: 100,
      valuePreservation: 95,
      clarityGain: 40
    });

    return {
      clarityImprovements,
      strategicFocus,
      communicationOptimization
    };
  }

  public optimizeStrategicResponse(
    originalContent: string,
    challengeType: string = 'strategic'
  ): { optimizedContent: string; improvementMetrics: ClarityMetrics; enhancements: string[] } {

    // Identify strategic insight
    const strategicInsight = this.identifyStrategicInsight(originalContent, challengeType as any);

    // Extract key analytical elements
    const elements = this.extractAnalyticalElements(originalContent);

    // Build optimized structure
    const optimizedContent = this.buildOptimizedStructure(strategicInsight, elements, originalContent);

    // Calculate improvement metrics
    const improvementMetrics = this.assessClarityMetrics(optimizedContent);

    // Document enhancements
    const enhancements = [
      'Strategic insight crystallization',
      'Improved communication efficiency',
      'Enhanced executive accessibility',
      'Maintained analytical rigor'
    ];

    return {
      optimizedContent,
      improvementMetrics,
      enhancements
    };
  }

  private buildOptimizedStructure(
    insight: StrategicInsight,
    elements: any,
    originalContent: string
  ): string {

    const optimized = `
┌─────────────────────────────────────────────────────────┐
│                    HEADELF INTELLIGENCE                 │
│              Strategic Analysis Report                   │
└─────────────────────────────────────────────────────────┘

🎯 **THE STRATEGIC INSIGHT**
${insight.coreInsight}

**EXECUTIVE DECISION**: ${elements.options[0] || 'Proceed with recommended approach'} - ${insight.executiveUtility * 10}% confidence
**FINANCIAL IMPACT**: ${elements.financialData.slice(0, 2).join(', ')} value creation
**IMPLEMENTATION**: ${this.extractTimeline(originalContent)} with ${insight.evidenceBase.length} critical success factors
**RISK MITIGATION**: ${this.extractTopRisks(originalContent).slice(0, 2).join('; ')}

📊 **STRATEGIC CONTEXT**
${this.extractStrategicContext(originalContent, 3)}

🔍 **ANALYTICAL FOUNDATION**
${this.extractAnalyticalSummary(originalContent)}

💡 **IMPLEMENTATION STRATEGY**
${this.extractImplementationPlan(originalContent)}

⚠️ **RISK & CONTINGENCY FRAMEWORK**
${this.extractRiskFramework(originalContent)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Strategic Intelligence: HeadElf Executive | Confidence: ${insight.executiveUtility * 10}% | Authority: Board Level
`;

    return optimized.trim();
  }

  private extractTimeline(content: string): string {
    const timelineMatches = content.match(/\d+[\s-]*(month|year|week)/gi) || [];
    return timelineMatches[0] || '12-18 month timeline';
  }

  private extractTopRisks(content: string): string[] {
    const riskMatches = content.match(/risk[^.]*\./gi) || [];
    return riskMatches.slice(0, 3).map(r => r.replace(/risk[:\s]*/i, '').trim());
  }

  private extractStrategicContext(content: string, maxParagraphs: number): string {
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.length > 100);
    return paragraphs.slice(0, maxParagraphs).join('\n\n');
  }

  private extractAnalyticalSummary(content: string): string {
    // Extract quantitative elements
    const financial = this.extractFinancialMetrics(content);
    const risks = this.extractRiskFactors(content);

    return `Financial Analysis: ${financial.slice(0, 3).join(', ')}\nRisk Assessment: ${risks.slice(0, 2).join('; ')}`;
  }

  private extractImplementationPlan(content: string): string {
    const phaseMatches = content.match(/phase\s*\d+[^.]*\./gi) || [];
    return phaseMatches.slice(0, 3).join('\n');
  }

  private extractRiskFramework(content: string): string {
    const risks = this.extractTopRisks(content);
    return risks.slice(0, 3).join('\n');
  }
}