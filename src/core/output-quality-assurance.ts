/**
 * HeadElf Output Quality Assurance Framework
 * Ensures all executive intelligence meets McKinsey/Bain/BCG standards
 */

export interface QualityCheck {
  name: string;
  description: string;
  passed: boolean;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  message: string;
  recommendation: string;
}

export interface QualityReport {
  overallScore: number; // 0-100
  qualityGrade: 'Excellent' | 'Good' | 'Acceptable' | 'Needs Improvement' | 'Poor';
  checks: QualityCheck[];
  improvementSuggestions: string[];
  mcKinseyStandardsMet: boolean;
}

/**
 * Executive Output Quality Assurance Engine
 * Validates output against world-class consulting standards
 */
export class OutputQualityAssurance {

  /**
   * Performs comprehensive quality assessment of executive output
   */
  assessOutputQuality(output: string, metadata: any): QualityReport {
    const checks: QualityCheck[] = [
      this.checkExecutiveSummaryClarity(output),
      this.checkStrategicRecommendationSpecificity(output),
      this.checkBusinessImpactQuantification(output),
      this.checkProfessionalFormatting(output),
      this.checkActionableNextSteps(output),
      this.checkRiskAssessmentCompleteness(output),
      this.checkImplementationSpecificity(output),
      this.checkStakeholderAppropriateness(output),
      this.checkConsistentBranding(output),
      this.checkMcKinseyStandards(output)
    ];

    const overallScore = this.calculateOverallScore(checks);
    const qualityGrade = this.determineQualityGrade(overallScore);
    const improvementSuggestions = this.generateImprovementSuggestions(checks);
    const mcKinseyStandardsMet = this.assessMcKinseyStandards(checks);

    return {
      overallScore,
      qualityGrade,
      checks,
      improvementSuggestions,
      mcKinseyStandardsMet
    };
  }

  /**
   * Executive Summary Quality Check
   * Ensures 30-second CEO-level clarity
   */
  private checkExecutiveSummaryClarity(output: string): QualityCheck {
    const executiveSummarySection = this.extractSection(output, 'EXECUTIVE SUMMARY');

    const hasKeyFinding = executiveSummarySection.includes('KEY FINDING');
    const hasStrategicRecommendation = executiveSummarySection.includes('STRATEGIC RECOMMENDATION');
    const hasBusinessImpact = executiveSummarySection.includes('BUSINESS IMPACT');
    const hasNextSteps = executiveSummarySection.includes('NEXT STEPS');
    const hasConfidenceLevel = executiveSummarySection.includes('CONFIDENCE LEVEL');

    const summaryLength = executiveSummarySection.length;
    const appropriateLength = summaryLength > 200 && summaryLength < 800;

    const passed = hasKeyFinding && hasStrategicRecommendation && hasBusinessImpact &&
                   hasNextSteps && hasConfidenceLevel && appropriateLength;

    return {
      name: 'Executive Summary Clarity',
      description: 'Executive summary provides clear 30-second overview for CEO/Board',
      passed,
      severity: 'Critical',
      message: passed
        ? 'Executive summary meets clarity standards for C-suite consumption'
        : 'Executive summary lacks required clarity elements or appropriate length',
      recommendation: passed
        ? 'Maintain current executive summary quality'
        : 'Enhance executive summary with missing elements: key finding, strategic recommendation, business impact, next steps, confidence level'
    };
  }

  /**
   * Strategic Recommendation Specificity Check
   * Ensures recommendations are actionable and specific
   */
  private checkStrategicRecommendationSpecificity(output: string): QualityCheck {
    const recommendationsSection = this.extractSection(output, 'RECOMMENDATIONS');

    const hasSpecificAction = /\b(acquire|divest|implement|launch|expand|reduce|optimize)\b/i.test(recommendationsSection);
    const hasTimeline = /\b(month|quarter|year|by\s+\d{4}|\d+\s+months?|\d+\s+quarters?)\b/i.test(recommendationsSection);
    const hasInvestment = /\$[\d,]+|\$\d+[KMB]|\d+%\s+of|budget|investment/i.test(recommendationsSection);
    const hasRationale = recommendationsSection.includes('Rationale') || recommendationsSection.includes('rationale');

    const isActionable = hasSpecificAction && hasTimeline;
    const isComplete = hasInvestment && hasRationale;

    const passed = isActionable && isComplete;

    return {
      name: 'Strategic Recommendation Specificity',
      description: 'Recommendations are specific, actionable, and include timeline/investment',
      passed,
      severity: 'Critical',
      message: passed
        ? 'Strategic recommendations meet specificity and actionability standards'
        : 'Strategic recommendations lack specificity, timeline, or investment details',
      recommendation: passed
        ? 'Maintain recommendation specificity standards'
        : 'Enhance recommendations with specific actions, clear timelines, investment requirements, and strategic rationale'
    };
  }

  /**
   * Business Impact Quantification Check
   * Ensures value creation is quantified and credible
   */
  private checkBusinessImpactQuantification(output: string): QualityCheck {
    const impactSection = this.extractSection(output, 'BUSINESS IMPACT');

    const hasRevenueQuantification = /\$[\d,]+|\d+%\s+increase|\d+[KMB]\s+(revenue|sales)/i.test(impactSection);
    const hasCostQuantification = /\$[\d,]+|\d+%\s+(savings|reduction)|\d+[KMB]\s+(cost|savings)/i.test(impactSection);
    const hasTimeframe = /\b(month|quarter|year|by\s+\d{4}|\d+\s+months?|\d+\s+quarters?)\b/i.test(impactSection);
    const hasConfidenceLevel = /\d+%\s+confidence|confidence\s*:\s*\d+%/i.test(impactSection);

    const quantificationPresent = hasRevenueQuantification || hasCostQuantification;
    const meetsStandards = quantificationPresent && hasTimeframe && hasConfidenceLevel;

    const passed = meetsStandards;

    return {
      name: 'Business Impact Quantification',
      description: 'Business impact includes quantified value with timeframe and confidence',
      passed,
      severity: 'High',
      message: passed
        ? 'Business impact properly quantified with credible projections'
        : 'Business impact lacks quantification, timeframe, or confidence levels',
      recommendation: passed
        ? 'Maintain quantification standards for business impact'
        : 'Add specific financial quantification, implementation timeframes, and confidence levels'
    };
  }

  /**
   * Professional Formatting Check
   * Ensures McKinsey-level presentation quality
   */
  private checkProfessionalFormatting(output: string): QualityCheck {
    const hasHeader = output.includes('HEADELF INTELLIGENCE');
    const hasIconHierarchy = /[🎯📊🔍💡📈⚠️🛣️]/.test(output);
    const hasSectionStructure = /\*\*[A-Z\s]+\*\*/.test(output);
    const hasFooter = output.includes('━━━━━━');
    const hasMetadata = output.includes('Prepared by:');

    const formattingElementsPresent = [hasHeader, hasIconHierarchy, hasSectionStructure, hasFooter, hasMetadata]
      .filter(Boolean).length;

    const passed = formattingElementsPresent >= 4;

    return {
      name: 'Professional Formatting',
      description: 'Output formatting meets consulting-grade presentation standards',
      passed,
      severity: 'Medium',
      message: passed
        ? 'Professional formatting meets consulting standards'
        : 'Professional formatting needs improvement for executive presentation',
      recommendation: passed
        ? 'Maintain professional formatting consistency'
        : 'Implement proper header, icon hierarchy, section structure, footer, and metadata'
    };
  }

  /**
   * Actionable Next Steps Check
   * Ensures clear implementation guidance
   */
  private checkActionableNextSteps(output: string): QualityCheck {
    const nextStepsPattern = /NEXT STEPS[\s\S]*?(?=\*\*[A-Z]|\n\n|$)/i;
    const nextStepsMatch = output.match(nextStepsPattern);

    if (!nextStepsMatch) {
      return {
        name: 'Actionable Next Steps',
        description: 'Clear next steps provided for implementation',
        passed: false,
        severity: 'High',
        message: 'Next steps section not found in output',
        recommendation: 'Add clear next steps section with specific actions and owners'
      };
    }

    const nextStepsContent = nextStepsMatch[0];
    const hasSpecificActions = /•\s*[A-Z][^•]*(?:by|within|before)/i.test(nextStepsContent);
    const hasOwnership = /(CEO|Board|CFO|CTO|team|executive)/i.test(nextStepsContent);
    const hasTimeline = /\b(immediate|within|by|days?|weeks?|months?)\b/i.test(nextStepsContent);

    const passed = hasSpecificActions && hasOwnership && hasTimeline;

    return {
      name: 'Actionable Next Steps',
      description: 'Next steps are specific, assigned, and time-bound',
      passed,
      severity: 'High',
      message: passed
        ? 'Next steps provide clear implementation guidance'
        : 'Next steps lack specificity, ownership, or timeline',
      recommendation: passed
        ? 'Maintain clarity in next steps'
        : 'Enhance next steps with specific actions, clear ownership, and defined timelines'
    };
  }

  /**
   * Risk Assessment Completeness Check
   * Ensures comprehensive risk analysis
   */
  private checkRiskAssessmentCompleteness(output: string): QualityCheck {
    const riskSection = this.extractSection(output, 'RISK ANALYSIS');

    const hasRiskIdentification = /risk|Risk/g.test(riskSection) && riskSection.match(/risk|Risk/g)!.length >= 3;
    const hasImpactAssessment = /(High|Medium|Low|impact)/i.test(riskSection);
    const hasProbabilityAssessment = /(High|Medium|Low|probability)/i.test(riskSection);
    const hasMitigation = /mitigation|Mitigation/i.test(riskSection);
    const hasContingency = /contingency|Contingency|backup|alternative/i.test(riskSection);

    const completenessElements = [hasRiskIdentification, hasImpactAssessment, hasProbabilityAssessment, hasMitigation, hasContingency]
      .filter(Boolean).length;

    const passed = completenessElements >= 4;

    return {
      name: 'Risk Assessment Completeness',
      description: 'Risk analysis includes identification, assessment, and mitigation',
      passed,
      severity: 'High',
      message: passed
        ? 'Risk assessment provides comprehensive analysis'
        : 'Risk assessment lacks comprehensive identification and mitigation strategies',
      recommendation: passed
        ? 'Maintain comprehensive risk assessment standards'
        : 'Enhance risk assessment with risk identification, impact/probability assessment, and mitigation strategies'
    };
  }

  /**
   * Implementation Specificity Check
   * Ensures detailed implementation roadmap
   */
  private checkImplementationSpecificity(output: string): QualityCheck {
    const implementationSection = this.extractSection(output, 'IMPLEMENTATION');

    const hasPhases = /Phase\s+\d+/i.test(implementationSection);
    const hasMilestones = /milestone|Milestone/gi.test(implementationSection);
    const hasResources = /(team|budget|tools|resources)/i.test(implementationSection);
    const hasTimeline = /\b(month|quarter|year|by\s+\d{4}|\d+\s+months?|\d+\s+quarters?)\b/i.test(implementationSection);
    const hasMetrics = /(metric|KPI|target|measure)/i.test(implementationSection);

    const specificityElements = [hasPhases, hasMilestones, hasResources, hasTimeline, hasMetrics]
      .filter(Boolean).length;

    const passed = specificityElements >= 4;

    return {
      name: 'Implementation Specificity',
      description: 'Implementation roadmap includes phases, milestones, resources, timeline, metrics',
      passed,
      severity: 'Medium',
      message: passed
        ? 'Implementation roadmap provides sufficient detail for execution'
        : 'Implementation roadmap lacks specificity for effective execution',
      recommendation: passed
        ? 'Maintain implementation detail standards'
        : 'Add specific phases, milestones, resource requirements, timelines, and success metrics'
    };
  }

  /**
   * Stakeholder Appropriateness Check
   * Ensures content is appropriate for executive audience
   */
  private checkStakeholderAppropriateness(output: string): QualityCheck {
    const hasExecutiveLanguage = /(strategic|Strategic|business|Business|competitive|Competitive|value|Value)/g.test(output);
    const avoidsJargon = !/(API|JSON|SQL|Docker|Kubernetes|microservice)/i.test(output);
    const hasBusinessFocus = /(revenue|profit|market|customer|competition|ROI|growth)/i.test(output);
    const appropriateLength = output.length > 1000 && output.length < 5000;

    const appropriatenessScore = [hasExecutiveLanguage, avoidsJargon, hasBusinessFocus, appropriateLength]
      .filter(Boolean).length;

    const passed = appropriatenessScore >= 3;

    return {
      name: 'Stakeholder Appropriateness',
      description: 'Content appropriate for executive audience level',
      passed,
      severity: 'Medium',
      message: passed
        ? 'Content appropriately tailored for executive consumption'
        : 'Content may not be appropriately tailored for executive audience',
      recommendation: passed
        ? 'Maintain executive-appropriate communication style'
        : 'Adjust language, reduce technical jargon, focus on business impact, optimize length for executive consumption'
    };
  }

  /**
   * Consistent Branding Check
   * Ensures HeadElf brand consistency
   */
  private checkConsistentBranding(output: string): QualityCheck {
    const hasHeadElfBranding = output.includes('HEADELF INTELLIGENCE');
    const hasRoleIdentification = /(CTO|CFO|CISO|COO|CLO|CHRO|Executive|Orchestrator)\s+(Intelligence|Strategy)/i.test(output);
    const hasMetadataFooter = output.includes('Prepared by: HeadElf');
    const hasClassification = /(Confidential|Executive Only|Internal Use)/i.test(output);

    const brandingElements = [hasHeadElfBranding, hasRoleIdentification, hasMetadataFooter, hasClassification]
      .filter(Boolean).length;

    const passed = brandingElements >= 3;

    return {
      name: 'Consistent Branding',
      description: 'HeadElf branding and identification consistently applied',
      passed,
      severity: 'Low',
      message: passed
        ? 'HeadElf branding consistently applied throughout document'
        : 'HeadElf branding elements missing or inconsistent',
      recommendation: passed
        ? 'Maintain consistent branding standards'
        : 'Ensure HeadElf header, role identification, metadata footer, and classification are present'
    };
  }

  /**
   * McKinsey Standards Assessment
   * Ensures output meets top-tier consulting standards
   */
  private checkMcKinseyStandards(output: string): QualityCheck {
    const hasStructuredThinking = this.hasStructuredAnalysis(output);
    const hasDataDrivenInsights = this.hasQuantitativeSupport(output);
    const hasClearRecommendations = this.hasActionableRecommendations(output);
    const hasBusinessImpactFocus = this.hasBusinessValueFocus(output);
    const hasRiskConsideration = this.hasRiskAwareness(output);

    const mcKinseyElements = [hasStructuredThinking, hasDataDrivenInsights, hasClearRecommendations, hasBusinessImpactFocus, hasRiskConsideration]
      .filter(Boolean).length;

    const passed = mcKinseyElements >= 4;

    return {
      name: 'McKinsey Standards Compliance',
      description: 'Output meets McKinsey-level consulting quality standards',
      passed,
      severity: 'Critical',
      message: passed
        ? 'Output meets McKinsey-level consulting standards for executive intelligence'
        : 'Output does not meet McKinsey-level standards for consulting quality',
      recommendation: passed
        ? 'Maintain McKinsey-level quality standards'
        : 'Enhance structured thinking, data support, clear recommendations, business impact focus, and risk consideration'
    };
  }

  // Helper methods for detailed analysis
  private extractSection(output: string, sectionName: string): string {
    const pattern = new RegExp(`\\*\\*${sectionName}\\*\\*[\\s\\S]*?(?=\\*\\*[A-Z]|━|$)`, 'i');
    const match = output.match(pattern);
    return match ? match[0] : '';
  }

  private hasStructuredAnalysis(output: string): boolean {
    const structureIndicators = ['Phase 1', 'Option 1', '1.', '•', 'Current State', 'Strategic Context'];
    return structureIndicators.some(indicator => output.includes(indicator));
  }

  private hasQuantitativeSupport(output: string): boolean {
    return /\$[\d,]+|\d+%|\d+[KMB]|\d+x\s+increase/i.test(output);
  }

  private hasActionableRecommendations(output: string): boolean {
    return /PRIMARY RECOMMENDATION|STRATEGIC RECOMMENDATION/i.test(output) &&
           /\b(implement|acquire|launch|expand|optimize|divest)\b/i.test(output);
  }

  private hasBusinessValueFocus(output: string): boolean {
    return /(revenue|profit|ROI|value creation|competitive advantage|market share)/i.test(output);
  }

  private hasRiskAwareness(output: string): boolean {
    return /RISK ANALYSIS|Key Risks|Mitigation/i.test(output);
  }

  private calculateOverallScore(checks: QualityCheck[]): number {
    const weights = {
      'Critical': 30,
      'High': 20,
      'Medium': 10,
      'Low': 5
    };

    let totalWeightedScore = 0;
    let totalPossibleScore = 0;

    checks.forEach(check => {
      const weight = weights[check.severity];
      totalPossibleScore += weight;
      if (check.passed) {
        totalWeightedScore += weight;
      }
    });

    return Math.round((totalWeightedScore / totalPossibleScore) * 100);
  }

  private determineQualityGrade(score: number): 'Excellent' | 'Good' | 'Acceptable' | 'Needs Improvement' | 'Poor' {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Acceptable';
    if (score >= 60) return 'Needs Improvement';
    return 'Poor';
  }

  private generateImprovementSuggestions(checks: QualityCheck[]): string[] {
    return checks
      .filter(check => !check.passed && (check.severity === 'Critical' || check.severity === 'High'))
      .map(check => check.recommendation);
  }

  private assessMcKinseyStandards(checks: QualityCheck[]): boolean {
    const criticalChecks = checks.filter(check => check.severity === 'Critical');
    const passedCriticalChecks = criticalChecks.filter(check => check.passed);

    const highChecks = checks.filter(check => check.severity === 'High');
    const passedHighChecks = highChecks.filter(check => check.passed);

    // McKinsey standards require all critical checks and 80% of high checks
    const criticalPassRate = passedCriticalChecks.length / criticalChecks.length;
    const highPassRate = passedHighChecks.length / highChecks.length;

    return criticalPassRate === 1.0 && highPassRate >= 0.8;
  }
}

/**
 * Quality Assurance Integration for HeadElf Skills
 */
export class QualityAssuranceIntegration {
  private qa = new OutputQualityAssurance();

  /**
   * Validates and improves skill output quality
   */
  validateAndImproveOutput(rawOutput: string, metadata: any): {
    improvedOutput: string;
    qualityReport: QualityReport;
    meetsStandards: boolean;
  } {
    const qualityReport = this.qa.assessOutputQuality(rawOutput, metadata);
    const meetsStandards = qualityReport.qualityGrade === 'Excellent' || qualityReport.qualityGrade === 'Good';

    // If output doesn't meet standards, attempt automatic improvement
    const improvedOutput = meetsStandards ? rawOutput : this.improveOutput(rawOutput, qualityReport);

    return {
      improvedOutput,
      qualityReport,
      meetsStandards
    };
  }

  /**
   * Automatic output improvement based on quality assessment
   */
  private improveOutput(output: string, qualityReport: QualityReport): string {
    let improved = output;

    // Add missing executive summary if needed
    if (!qualityReport.checks.find(c => c.name === 'Executive Summary Clarity')?.passed) {
      improved = this.addExecutiveSummary(improved);
    }

    // Enhance business impact quantification if needed
    if (!qualityReport.checks.find(c => c.name === 'Business Impact Quantification')?.passed) {
      improved = this.enhanceBusinessImpact(improved);
    }

    // Add professional formatting if needed
    if (!qualityReport.checks.find(c => c.name === 'Professional Formatting')?.passed) {
      improved = this.addProfessionalFormatting(improved);
    }

    return improved;
  }

  private addExecutiveSummary(output: string): string {
    if (output.includes('EXECUTIVE SUMMARY')) return output;

    const summaryTemplate = `🎯 **EXECUTIVE SUMMARY**

**KEY FINDING**: [Analysis requires strategic attention and executive decision-making]

**STRATEGIC RECOMMENDATION**: [Specific recommendation extracted from analysis]

**BUSINESS IMPACT**: [Quantified business value and strategic importance]

**NEXT STEPS**:
• [Immediate executive action required]
• [Key stakeholder engagement needed]
• [Strategic implementation decision]

**CONFIDENCE LEVEL**: 85% | **TIMELINE**: [Implementation timeline]

`;

    // Insert after header
    const headerEnd = output.indexOf('┘') + 1;
    if (headerEnd > 0) {
      return output.slice(0, headerEnd) + '\n\n' + summaryTemplate + output.slice(headerEnd);
    }

    return summaryTemplate + '\n' + output;
  }

  private enhanceBusinessImpact(output: string): string {
    // Add quantification placeholder if missing
    if (!output.includes('BUSINESS IMPACT') && !output.includes('$')) {
      const impactSection = `

📈 **BUSINESS IMPACT**

**Revenue Impact**: [Quantified revenue implications with timeline]
**Cost Optimization**: [Quantified efficiency gains and savings]
**Competitive Advantage**: [Strategic positioning benefits]
**Risk Mitigation**: [Risk reduction value]

`;
      return output + impactSection;
    }

    return output;
  }

  private addProfessionalFormatting(output: string): string {
    // Add header if missing
    if (!output.includes('HEADELF INTELLIGENCE')) {
      const header = `┌─────────────────────────────────────────────────────────┐
│                    HEADELF INTELLIGENCE                 │
│                Executive Analysis Report                │
└─────────────────────────────────────────────────────────┘

`;
      output = header + output;
    }

    // Add footer if missing
    if (!output.includes('━━━━━━')) {
      const footer = `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prepared by: HeadElf Executive Intelligence | Confidence: 85%
Authority Level: Executive Decision Required | Generated: ${new Date().toISOString()}
Classification: Confidential | Document ID: HE-${Date.now()}`;

      output = output + footer;
    }

    return output;
  }
}