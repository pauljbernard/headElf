/**
 * HeadElf Executive Output Engine
 * World-Class Executive Intelligence Output System
 *
 * Transforms technical analysis into McKinsey/Bain/BCG-quality executive intelligence
 * through structured templates, professional branding, and stakeholder-appropriate communication.
 */

export interface ExecutiveOutputMetadata {
  preparedBy: string;
  executiveRole: 'CTO' | 'CFO' | 'CISO' | 'COO' | 'CLO' | 'CHRO' | 'CMSO' | 'CPO';
  confidenceLevel: number; // 0-100
  authorityLevel: 'Board Approval Required' | 'Executive Autonomous' | 'Board Notification Required';
  classification: 'Confidential' | 'Executive Only' | 'Internal Use' | 'Strategic';
  timestamp: string;
  documentId: string;
}

export interface ExecutiveSummary {
  keyFinding: string;
  strategicRecommendation: string;
  businessImpact: string;
  nextSteps: string[];
  confidenceLevel: number;
  timeline: string;
}

export interface SituationAssessment {
  currentState: string;
  keyChallenge: string;
  strategicContext: string;
  stakeholderImplications: string[];
}

export interface OptionsAnalysis {
  option: string;
  description: string;
  pros: string[];
  cons: string[];
  businessImpact: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  confidenceLevel: number;
}

export interface StrategicRecommendation {
  primary: {
    recommendation: string;
    rationale: string;
    implementation: string;
    timeline: string;
    investment: string;
  };
  alternatives: OptionsAnalysis[];
}

export interface BusinessImpact {
  revenueImpact: {
    amount: string;
    timeline: string;
    confidence: number;
  };
  costSavings?: {
    amount: string;
    timeline: string;
    confidence: number;
  };
  competitiveAdvantage: string[];
  operationalImpact: string[];
  riskMitigation: string[];
}

export interface RiskAssessment {
  keyRisks: Array<{
    risk: string;
    impact: 'Low' | 'Medium' | 'High';
    probability: 'Low' | 'Medium' | 'High';
    mitigation: string;
  }>;
  contingencyPlans: string[];
  monitoringRequirements: string[];
}

export interface ImplementationPlan {
  phases: Array<{
    phase: string;
    duration: string;
    milestones: Array<{
      milestone: string;
      deliverable: string;
      dueDate: string;
    }>;
    resourceRequirements: {
      team: string[];
      budget: string;
      tools: string[];
    };
    successMetrics: string[];
  }>;
}

export interface ExecutiveOutput {
  metadata: ExecutiveOutputMetadata;
  executiveSummary: ExecutiveSummary;
  situationAssessment: SituationAssessment;
  strategicAnalysis: string; // Framework-based analysis
  recommendations: StrategicRecommendation;
  businessImpact: BusinessImpact;
  riskAnalysis: RiskAssessment;
  implementation: ImplementationPlan;
}

/**
 * Executive Output Engine - Formats analysis into professional executive intelligence
 */
export class ExecutiveOutputEngine {
  private readonly ICONS = {
    EXECUTIVE_SUMMARY: '🎯',
    SITUATION_ASSESSMENT: '📊',
    STRATEGIC_ANALYSIS: '🔍',
    RECOMMENDATIONS: '💡',
    BUSINESS_IMPACT: '📈',
    RISK_ANALYSIS: '⚠️',
    IMPLEMENTATION: '🛣️'
  };

  /**
   * Generates world-class executive output from analysis data
   */
  generateExecutiveReport(data: ExecutiveOutput): string {
    const header = this.generateHeader(data.metadata);
    const executiveSummary = this.generateExecutiveSummary(data.executiveSummary);
    const situationAssessment = this.generateSituationAssessment(data.situationAssessment);
    const strategicAnalysis = this.generateStrategicAnalysis(data.strategicAnalysis);
    const recommendations = this.generateRecommendations(data.recommendations);
    const businessImpact = this.generateBusinessImpact(data.businessImpact);
    const riskAnalysis = this.generateRiskAnalysis(data.riskAnalysis);
    const implementation = this.generateImplementationPlan(data.implementation);
    const footer = this.generateFooter(data.metadata);

    return [
      header,
      executiveSummary,
      situationAssessment,
      strategicAnalysis,
      recommendations,
      businessImpact,
      riskAnalysis,
      implementation,
      footer
    ].join('\n\n');
  }

  private generateHeader(metadata: ExecutiveOutputMetadata): string {
    const roleName = this.getExecutiveRoleName(metadata.executiveRole);

    return `┌─────────────────────────────────────────────────────────┐
│                    HEADELF INTELLIGENCE                 │
│                 ${roleName} Analysis Report                │
└─────────────────────────────────────────────────────────┘`;
  }

  private generateExecutiveSummary(summary: ExecutiveSummary): string {
    const nextStepsList = summary.nextSteps.map(step => `• ${step}`).join('\n');

    return `${this.ICONS.EXECUTIVE_SUMMARY} **EXECUTIVE SUMMARY**

**KEY FINDING**: ${summary.keyFinding}

**STRATEGIC RECOMMENDATION**: ${summary.strategicRecommendation}

**BUSINESS IMPACT**: ${summary.businessImpact}

**NEXT STEPS**:
${nextStepsList}

**CONFIDENCE LEVEL**: ${summary.confidenceLevel}% | **TIMELINE**: ${summary.timeline}`;
  }

  private generateSituationAssessment(assessment: SituationAssessment): string {
    const implications = assessment.stakeholderImplications.map(item => `• ${item}`).join('\n');

    return `${this.ICONS.SITUATION_ASSESSMENT} **SITUATION ASSESSMENT**

**Current State**: ${assessment.currentState}

**Key Challenge**: ${assessment.keyChallenge}

**Strategic Context**: ${assessment.strategicContext}

**Stakeholder Implications**:
${implications}`;
  }

  private generateStrategicAnalysis(analysis: string): string {
    return `${this.ICONS.STRATEGIC_ANALYSIS} **STRATEGIC ANALYSIS**

${analysis}`;
  }

  private generateRecommendations(recommendations: StrategicRecommendation): string {
    let output = `${this.ICONS.RECOMMENDATIONS} **RECOMMENDATIONS**

**PRIMARY RECOMMENDATION**: ${recommendations.primary.recommendation}
• **Rationale**: ${recommendations.primary.rationale}
• **Implementation**: ${recommendations.primary.implementation}
• **Timeline**: ${recommendations.primary.timeline}
• **Investment**: ${recommendations.primary.investment}`;

    if (recommendations.alternatives.length > 0) {
      output += '\n\n**ALTERNATIVE OPTIONS**:\n';
      recommendations.alternatives.forEach((alt, index) => {
        const pros = alt.pros.map(pro => `  ✓ ${pro}`).join('\n');
        const cons = alt.cons.map(con => `  ✗ ${con}`).join('\n');

        output += `
${index + 1}. **${alt.option}** - ${alt.description}
   • **Pros**:
${pros}
   • **Cons**:
${cons}
   • **Impact**: ${alt.businessImpact}
   • **Risk Level**: ${alt.riskLevel} | **Confidence**: ${alt.confidenceLevel}%`;
      });
    }

    return output;
  }

  private generateBusinessImpact(impact: BusinessImpact): string {
    let output = `${this.ICONS.BUSINESS_IMPACT} **BUSINESS IMPACT**

**Revenue Impact**: ${impact.revenueImpact.amount} over ${impact.revenueImpact.timeline} (${impact.revenueImpact.confidence}% confidence)`;

    if (impact.costSavings) {
      output += `\n**Cost Savings**: ${impact.costSavings.amount} over ${impact.costSavings.timeline} (${impact.costSavings.confidence}% confidence)`;
    }

    const advantages = impact.competitiveAdvantage.map(adv => `• ${adv}`).join('\n');
    const operations = impact.operationalImpact.map(op => `• ${op}`).join('\n');
    const risks = impact.riskMitigation.map(risk => `• ${risk}`).join('\n');

    output += `

**Competitive Advantage**:
${advantages}

**Operational Impact**:
${operations}

**Risk Mitigation**:
${risks}`;

    return output;
  }

  private generateRiskAnalysis(risks: RiskAssessment): string {
    const risksList = risks.keyRisks.map(risk =>
      `• **${risk.risk}** (Impact: ${risk.impact}, Probability: ${risk.probability})
  Mitigation: ${risk.mitigation}`).join('\n\n');

    const contingencies = risks.contingencyPlans.map(plan => `• ${plan}`).join('\n');
    const monitoring = risks.monitoringRequirements.map(req => `• ${req}`).join('\n');

    return `${this.ICONS.RISK_ANALYSIS} **RISK ANALYSIS**

**Key Risks**:
${risksList}

**Contingency Plans**:
${contingencies}

**Monitoring Requirements**:
${monitoring}`;
  }

  private generateImplementationPlan(plan: ImplementationPlan): string {
    let output = `${this.ICONS.IMPLEMENTATION} **IMPLEMENTATION ROADMAP**\n`;

    plan.phases.forEach((phase, index) => {
      const milestones = phase.milestones.map(m =>
        `• ${m.milestone}: ${m.deliverable} (Due: ${m.dueDate})`).join('\n');

      const team = phase.resourceRequirements.team.join(', ');
      const tools = phase.resourceRequirements.tools.join(', ');
      const metrics = phase.successMetrics.map(metric => `• ${metric}`).join('\n');

      output += `
**Phase ${index + 1} (${phase.duration}): ${phase.phase}**
Milestones:
${milestones}

Resources: ${team} | Budget: ${phase.resourceRequirements.budget} | Tools: ${tools}

Success Metrics:
${metrics}`;
    });

    return output;
  }

  private generateFooter(metadata: ExecutiveOutputMetadata): string {
    return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prepared by: HeadElf ${metadata.executiveRole} Intelligence | Confidence: ${metadata.confidenceLevel}%
Authority Level: ${metadata.authorityLevel} | Generated: ${metadata.timestamp}
Classification: ${metadata.classification} | Document ID: ${metadata.documentId}`;
  }

  private getExecutiveRoleName(role: string): string {
    const roleNames = {
      'CTO': 'Technology Strategy',
      'CFO': 'Financial Strategy',
      'CISO': 'Security Strategy',
      'COO': 'Operational Strategy',
      'CLO': 'Legal Strategy',
      'CHRO': 'People Strategy',
      'CMSO': 'Marketing & Sales Strategy',
      'CPO': 'Product Strategy'
    };
    return roleNames[role as keyof typeof roleNames] || 'Executive Strategy';
  }

  /**
   * Generates stakeholder-appropriate output layers
   */
  generateExecutiveSummaryOnly(summary: ExecutiveSummary, metadata: ExecutiveOutputMetadata): string {
    const header = this.generateHeader(metadata);
    const execSummary = this.generateExecutiveSummary(summary);
    const footer = this.generateFooter(metadata);

    return `${header}\n\n${execSummary}\n\n${footer}`;
  }

  /**
   * Quality assurance validation
   */
  validateOutput(output: ExecutiveOutput): Array<{ check: string; passed: boolean; message: string }> {
    const checks = [
      {
        check: 'Executive Summary Clarity',
        passed: output.executiveSummary.keyFinding.length > 0 &&
                output.executiveSummary.strategicRecommendation.length > 0,
        message: 'Executive summary must have clear key finding and strategic recommendation'
      },
      {
        check: 'Business Impact Quantification',
        passed: output.businessImpact.revenueImpact.amount.length > 0,
        message: 'Business impact must include quantified revenue implications'
      },
      {
        check: 'Actionable Recommendations',
        passed: output.recommendations.primary.recommendation.length > 0 &&
                output.recommendations.primary.timeline.length > 0,
        message: 'Recommendations must be specific and include timeline'
      },
      {
        check: 'Risk Assessment Completeness',
        passed: output.riskAnalysis.keyRisks.length > 0,
        message: 'Risk analysis must identify and mitigate key risks'
      },
      {
        check: 'Implementation Specificity',
        passed: output.implementation.phases.length > 0 &&
                output.implementation.phases.every(p => p.milestones.length > 0),
        message: 'Implementation plan must have specific phases and milestones'
      }
    ];

    return checks;
  }
}

/**
 * Executive Output Factory - Creates role-specific output engines
 */
export class ExecutiveOutputFactory {
  static createCTOOutput(): ExecutiveOutputEngine {
    return new ExecutiveOutputEngine();
  }

  static createCFOOutput(): ExecutiveOutputEngine {
    return new ExecutiveOutputEngine();
  }

  static createCISOOutput(): ExecutiveOutputEngine {
    return new ExecutiveOutputEngine();
  }

  static createExecutiveOrchestrator(): ExecutiveOutputEngine {
    return new ExecutiveOutputEngine();
  }
}