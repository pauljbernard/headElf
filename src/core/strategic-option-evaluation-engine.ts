/**
 * Strategic Option Evaluation Engine
 *
 * Provides comprehensive evaluation framework for strategic options using
 * multi-criteria decision analysis, scenario planning, and real options valuation.
 */

export interface StrategicOption {
  id: string;
  name: string;
  description: string;
  category: 'growth' | 'efficiency' | 'innovation' | 'risk-mitigation' | 'transformation';

  financialProjections: {
    initialInvestment: number; // In millions
    operatingCosts: number[]; // Annual costs over 5 years
    revenues: number[]; // Annual revenues over 5 years
    cashFlows: number[]; // Net cash flows
    terminalValue: number;
    discountRate: number;
  };

  implementation: {
    duration: number; // In months
    complexity: number; // 1-5 scale
    resourceRequirements: {
      personnel: number; // FTE count
      technology: number; // Investment in millions
      external: number; // External costs in millions
    };
    dependencies: string[];
    milestones: Array<{
      phase: string;
      duration: number; // In months
      deliverables: string[];
      successCriteria: string[];
    }>;
  };

  strategic: {
    alignment: number; // 1-10 scale with strategy
    competitiveAdvantage: number; // 1-10 scale
    marketOpportunity: number; // Market size in billions
    differentiation: number; // 1-10 scale
    sustainability: number; // 1-10 scale (how defensible)
    synergies: string[];
    strategicValue: number; // Qualitative value 1-10
  };

  risks: {
    executionRisk: number; // 1-5 scale
    marketRisk: number; // 1-5 scale
    competitiveRisk: number; // 1-5 scale
    technicalRisk: number; // 1-5 scale
    regulatoryRisk: number; // 1-5 scale
    mitigation: string[];
  };

  stakeholders: {
    supportLevel: number; // 1-10 scale
    resistanceLevel: number; // 1-10 scale
    champions: string[];
    opponents: string[];
    neutral: string[];
  };

  alternatives: string[]; // IDs of alternative options
  prerequisites: string[]; // Required prior options
}

export interface EvaluationCriteria {
  financial: {
    weight: number;
    subCriteria: {
      npv: number;
      irr: number;
      paybackPeriod: number;
      riskAdjustedReturns: number;
    };
  };
  strategic: {
    weight: number;
    subCriteria: {
      strategyAlignment: number;
      competitiveAdvantage: number;
      marketOpportunity: number;
      differentiation: number;
      sustainability: number;
    };
  };
  risk: {
    weight: number;
    subCriteria: {
      executionRisk: number;
      marketRisk: number;
      competitiveRisk: number;
      technicalRisk: number;
      regulatoryRisk: number;
    };
  };
  implementation: {
    weight: number;
    subCriteria: {
      feasibility: number;
      timeline: number;
      resourceAvailability: number;
      complexity: number;
      dependencies: number;
    };
  };
  stakeholder: {
    weight: number;
    subCriteria: {
      supportLevel: number;
      changeReadiness: number;
      culturalFit: number;
      leadershipAlignment: number;
    };
  };
}

export interface ScenarioAnalysis {
  baseCase: {
    probability: number;
    npv: number;
    outcomes: string[];
  };
  optimistic: {
    probability: number;
    npv: number;
    outcomes: string[];
  };
  pessimistic: {
    probability: number;
    npv: number;
    outcomes: string[];
  };
  expectedValue: number;
  variance: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  sensitivityAnalysis: Array<{
    variable: string;
    impact: number; // NPV change per 1% change in variable
    elasticity: number;
  }>;
}

export interface PortfolioAnalysis {
  options: StrategicOption[];
  correlations: Array<{
    option1: string;
    option2: string;
    correlation: number;
  }>;
  portfolioMetrics: {
    totalInvestment: number;
    expectedReturn: number;
    portfolioRisk: number;
    diversificationBenefit: number;
    sharpeRatio: number;
  };
  optimalPortfolio: {
    selectedOptions: string[];
    totalValue: number;
    riskAdjustedValue: number;
    implementation: {
      phases: Array<{
        phase: number;
        duration: number;
        options: string[];
        investment: number;
        expectedReturns: number;
      }>;
    };
  };
  constraints: {
    budgetLimit: number;
    timeLimit: number;
    resourceLimit: number;
    riskTolerance: number;
  };
}

export interface OptionEvaluation {
  option: StrategicOption;
  scores: {
    financial: number; // 0-100
    strategic: number; // 0-100
    risk: number; // 0-100 (higher is better, i.e., lower risk)
    implementation: number; // 0-100
    stakeholder: number; // 0-100
    overall: number; // Weighted average
  };
  ranking: number;
  recommendation: 'proceed' | 'modify' | 'delay' | 'reject';
  rationale: string;
  scenarios: ScenarioAnalysis;
  sensitivity: Array<{
    factor: string;
    currentValue: number;
    breakEvenValue: number;
    riskLevel: 'low' | 'medium' | 'high';
  }>;
  realOptionsValue: number; // Value of flexibility/optionality
  competitiveResponse: {
    likelihood: number; // 1-5 scale
    potentialActions: string[];
    timeToResponse: number; // In months
    counterStrategies: string[];
  };
}

export interface DecisionFramework {
  decisionType: 'single-option' | 'multiple-selection' | 'portfolio-optimization' | 'sequential-decisions';
  timeHorizon: number; // In years
  decisionCriteria: EvaluationCriteria;
  constraints: {
    budget: number;
    timeline: number;
    resources: number;
    riskTolerance: number;
    strategicPriorities: string[];
  };
  stakeholderWeights: {
    [stakeholder: string]: number;
  };
  methodology: 'weighted-scoring' | 'ahp' | 'real-options' | 'monte-carlo' | 'multi-criteria';
}

export class StrategicOptionEvaluationEngine {
  private optionsDatabase: Map<string, StrategicOption> = new Map();
  private evaluationHistory: Map<string, OptionEvaluation> = new Map();

  constructor() {
    this.initializeStrategicOptions();
  }

  private initializeStrategicOptions(): void {
    // M&A Growth Options
    this.optionsDatabase.set('fintech-acquisition', {
      id: 'fintech-acquisition',
      name: 'Strategic Fintech Acquisition',
      description: 'Acquire mid-sized fintech company to accelerate digital transformation and expand customer base',
      category: 'growth',

      financialProjections: {
        initialInvestment: 250,
        operatingCosts: [45, 52, 58, 65, 72],
        revenues: [85, 125, 175, 225, 285],
        cashFlows: [-250, 40, 73, 117, 160, 213],
        terminalValue: 450,
        discountRate: 0.12
      },

      implementation: {
        duration: 18,
        complexity: 4,
        resourceRequirements: {
          personnel: 25,
          technology: 15,
          external: 35
        },
        dependencies: ['regulatory-approval', 'due-diligence', 'integration-planning'],
        milestones: [
          {
            phase: 'Due Diligence & Negotiation',
            duration: 4,
            deliverables: ['Financial audit', 'Technology assessment', 'Cultural fit analysis'],
            successCriteria: ['Confirmed synergies', 'Acceptable valuation', 'Regulatory clearance']
          },
          {
            phase: 'Integration Planning',
            duration: 6,
            deliverables: ['Integration roadmap', 'Team structure', 'Technology architecture'],
            successCriteria: ['Detailed integration plan', 'Key talent retention', 'System compatibility']
          },
          {
            phase: 'Post-Merger Integration',
            duration: 8,
            deliverables: ['Unified platform', 'Combined operations', 'Synergy realization'],
            successCriteria: ['Revenue synergies achieved', 'Cost synergies realized', 'Culture integration']
          }
        ]
      },

      strategic: {
        alignment: 9,
        competitiveAdvantage: 8,
        marketOpportunity: 45.2,
        differentiation: 7,
        sustainability: 8,
        synergies: [
          'Cross-selling opportunities',
          'Technology capabilities',
          'Market expansion',
          'Operational efficiencies',
          'Talent acquisition'
        ],
        strategicValue: 9
      },

      risks: {
        executionRisk: 3,
        marketRisk: 2,
        competitiveRisk: 3,
        technicalRisk: 3,
        regulatoryRisk: 4,
        mitigation: [
          'Comprehensive due diligence',
          'Cultural integration planning',
          'Regulatory pre-clearance',
          'Key talent retention programs',
          'Phased integration approach'
        ]
      },

      stakeholders: {
        supportLevel: 7,
        resistanceLevel: 4,
        champions: ['CEO', 'Chief Strategy Officer', 'Business Development'],
        opponents: ['CFO (cost concerns)', 'IT (integration complexity)'],
        neutral: ['Operations', 'HR', 'Legal']
      },

      alternatives: ['organic-growth', 'partnership-strategy'],
      prerequisites: ['regulatory-assessment', 'financial-capacity']
    });

    // Technology Innovation Option
    this.optionsDatabase.set('ai-platform-development', {
      id: 'ai-platform-development',
      name: 'AI-Powered Analytics Platform',
      description: 'Develop proprietary AI platform for predictive analytics and automated decision-making',
      category: 'innovation',

      financialProjections: {
        initialInvestment: 75,
        operatingCosts: [25, 32, 38, 42, 48],
        revenues: [15, 45, 85, 135, 195],
        cashFlows: [-75, -10, 13, 47, 93, 147],
        terminalValue: 280,
        discountRate: 0.15
      },

      implementation: {
        duration: 24,
        complexity: 5,
        resourceRequirements: {
          personnel: 35,
          technology: 20,
          external: 10
        },
        dependencies: ['ai-talent-acquisition', 'data-infrastructure', 'platform-architecture'],
        milestones: [
          {
            phase: 'Foundation & Research',
            duration: 6,
            deliverables: ['AI strategy', 'Technology stack', 'Data architecture'],
            successCriteria: ['Proven algorithms', 'Scalable architecture', 'Data quality framework']
          },
          {
            phase: 'MVP Development',
            duration: 8,
            deliverables: ['Core platform', 'Initial models', 'User interface'],
            successCriteria: ['Working prototype', 'Model accuracy targets', 'User acceptance']
          },
          {
            phase: 'Market Launch',
            duration: 6,
            deliverables: ['Production platform', 'Customer onboarding', 'Support systems'],
            successCriteria: ['Customer acquisition', 'Platform reliability', 'Revenue generation']
          },
          {
            phase: 'Scale & Enhancement',
            duration: 4,
            deliverables: ['Advanced features', 'Scale infrastructure', 'Market expansion'],
            successCriteria: ['Market penetration', 'Feature adoption', 'Competitive differentiation']
          }
        ]
      },

      strategic: {
        alignment: 10,
        competitiveAdvantage: 9,
        marketOpportunity: 125.8,
        differentiation: 9,
        sustainability: 8,
        synergies: [
          'Enhanced customer insights',
          'Operational automation',
          'New revenue streams',
          'Competitive differentiation',
          'Data monetization'
        ],
        strategicValue: 10
      },

      risks: {
        executionRisk: 4,
        marketRisk: 3,
        competitiveRisk: 4,
        technicalRisk: 5,
        regulatoryRisk: 3,
        mitigation: [
          'Agile development methodology',
          'Strong technical leadership',
          'Customer co-development',
          'Intellectual property protection',
          'Privacy by design'
        ]
      },

      stakeholders: {
        supportLevel: 8,
        resistanceLevel: 3,
        champions: ['CTO', 'Innovation team', 'Product management'],
        opponents: ['Traditional IT', 'Compliance (AI risks)'],
        neutral: ['Sales', 'Customer service', 'Finance']
      },

      alternatives: ['ai-partnership', 'incremental-enhancement'],
      prerequisites: ['ai-strategy', 'data-readiness']
    });

    // Operational Excellence Option
    this.optionsDatabase.set('digital-transformation', {
      id: 'digital-transformation',
      name: 'End-to-End Digital Transformation',
      description: 'Comprehensive digitalization of operations, customer experience, and business model',
      category: 'transformation',

      financialProjections: {
        initialInvestment: 125,
        operatingCosts: [35, 42, 45, 48, 50],
        revenues: [285, 320, 365, 415, 475],
        cashFlows: [-125, -35, -22, 0, 27, 75],
        terminalValue: 180,
        discountRate: 0.10
      },

      implementation: {
        duration: 36,
        complexity: 5,
        resourceRequirements: {
          personnel: 65,
          technology: 45,
          external: 25
        },
        dependencies: ['change-management', 'technology-infrastructure', 'process-redesign'],
        milestones: [
          {
            phase: 'Assessment & Strategy',
            duration: 4,
            deliverables: ['Current state analysis', 'Digital strategy', 'Roadmap'],
            successCriteria: ['Baseline established', 'Clear vision', 'Stakeholder alignment']
          },
          {
            phase: 'Foundation Building',
            duration: 8,
            deliverables: ['Core infrastructure', 'Data platform', 'Security framework'],
            successCriteria: ['Scalable architecture', 'Data integration', 'Security compliance']
          },
          {
            phase: 'Process Digitization',
            duration: 12,
            deliverables: ['Automated workflows', 'Digital customer journey', 'Analytics dashboard'],
            successCriteria: ['Process efficiency gains', 'Customer satisfaction', 'Data insights']
          },
          {
            phase: 'Advanced Capabilities',
            duration: 8,
            deliverables: ['AI integration', 'Predictive analytics', 'New business models'],
            successCriteria: ['Advanced automation', 'Predictive insights', 'Innovation capacity']
          },
          {
            phase: 'Optimization & Scale',
            duration: 4,
            deliverables: ['Performance optimization', 'Scale operations', 'Continuous improvement'],
            successCriteria: ['Operational excellence', 'Scalable platform', 'Innovation culture']
          }
        ]
      },

      strategic: {
        alignment: 9,
        competitiveAdvantage: 8,
        marketOpportunity: 85.5,
        differentiation: 7,
        sustainability: 9,
        synergies: [
          'Operational efficiency',
          'Customer experience enhancement',
          'Data-driven insights',
          'Innovation enablement',
          'Cost optimization'
        ],
        strategicValue: 9
      },

      risks: {
        executionRisk: 4,
        marketRisk: 2,
        competitiveRisk: 2,
        technicalRisk: 4,
        regulatoryRisk: 3,
        mitigation: [
          'Phased implementation approach',
          'Strong change management',
          'Employee training programs',
          'Technology partner support',
          'Continuous monitoring'
        ]
      },

      stakeholders: {
        supportLevel: 6,
        resistanceLevel: 5,
        champions: ['CEO', 'CTO', 'Innovation team'],
        opponents: ['Legacy operations', 'Traditional workforce'],
        neutral: ['Finance', 'HR', 'Compliance']
      },

      alternatives: ['incremental-digitization', 'technology-partnership'],
      prerequisites: ['leadership-commitment', 'budget-allocation']
    });

    // Market Expansion Option
    this.optionsDatabase.set('international-expansion', {
      id: 'international-expansion',
      name: 'European Market Entry',
      description: 'Strategic expansion into European markets through direct investment and partnerships',
      category: 'growth',

      financialProjections: {
        initialInvestment: 85,
        operatingCosts: [28, 35, 42, 48, 52],
        revenues: [25, 65, 115, 175, 235],
        cashFlows: [-85, -3, 30, 73, 127, 183],
        terminalValue: 320,
        discountRate: 0.14
      },

      implementation: {
        duration: 30,
        complexity: 4,
        resourceRequirements: {
          personnel: 45,
          technology: 15,
          external: 20
        },
        dependencies: ['regulatory-compliance', 'local-partnerships', 'market-research'],
        milestones: [
          {
            phase: 'Market Analysis & Planning',
            duration: 6,
            deliverables: ['Market research', 'Regulatory analysis', 'Entry strategy'],
            successCriteria: ['Market opportunity validated', 'Compliance framework', 'Go-to-market strategy']
          },
          {
            phase: 'Foundation Establishment',
            duration: 8,
            deliverables: ['Legal entity', 'Local partnerships', 'Initial team'],
            successCriteria: ['Operational entity', 'Strategic partnerships', 'Local capabilities']
          },
          {
            phase: 'Market Launch',
            duration: 8,
            deliverables: ['Product localization', 'Sales operations', 'Customer acquisition'],
            successCriteria: ['Market entry', 'Customer traction', 'Revenue generation']
          },
          {
            phase: 'Growth & Scale',
            duration: 8,
            deliverables: ['Market expansion', 'Operations scale', 'Profitability'],
            successCriteria: ['Market share growth', 'Operational efficiency', 'Financial targets']
          }
        ]
      },

      strategic: {
        alignment: 8,
        competitiveAdvantage: 7,
        marketOpportunity: 165.2,
        differentiation: 6,
        sustainability: 7,
        synergies: [
          'Geographic diversification',
          'Revenue growth',
          'Brand expansion',
          'Learning opportunities',
          'Risk distribution'
        ],
        strategicValue: 8
      },

      risks: {
        executionRisk: 3,
        marketRisk: 4,
        competitiveRisk: 4,
        technicalRisk: 2,
        regulatoryRisk: 4,
        mitigation: [
          'Local partnership strategy',
          'Phased market entry',
          'Regulatory expertise',
          'Cultural adaptation',
          'Risk monitoring'
        ]
      },

      stakeholders: {
        supportLevel: 7,
        resistanceLevel: 3,
        champions: ['CEO', 'Business Development', 'International team'],
        opponents: ['Cost-conscious stakeholders', 'Risk-averse board members'],
        neutral: ['Operations', 'Technology', 'HR']
      },

      alternatives: ['partnership-expansion', 'acquisition-entry'],
      prerequisites: ['market-research', 'regulatory-readiness']
    });
  }

  public evaluateOption(
    optionId: string,
    criteria: EvaluationCriteria,
    framework: DecisionFramework
  ): OptionEvaluation {
    const option = this.optionsDatabase.get(optionId);
    if (!option) {
      throw new Error(`Option not found: ${optionId}`);
    }

    // Calculate financial scores
    const financialScores = this.calculateFinancialScores(option);
    const strategicScores = this.calculateStrategicScores(option);
    const riskScores = this.calculateRiskScores(option);
    const implementationScores = this.calculateImplementationScores(option);
    const stakeholderScores = this.calculateStakeholderScores(option);

    // Calculate weighted overall score
    const overallScore = this.calculateOverallScore(
      { financial: financialScores, strategic: strategicScores, risk: riskScores,
        implementation: implementationScores, stakeholder: stakeholderScores },
      criteria
    );

    // Generate scenario analysis
    const scenarios = this.generateScenarioAnalysis(option);

    // Calculate real options value
    const realOptionsValue = this.calculateRealOptionsValue(option, scenarios);

    // Generate recommendation
    const recommendation = this.generateRecommendation(overallScore, scenarios, option);

    const evaluation: OptionEvaluation = {
      option,
      scores: {
        financial: financialScores,
        strategic: strategicScores,
        risk: riskScores,
        implementation: implementationScores,
        stakeholder: stakeholderScores,
        overall: overallScore
      },
      ranking: 0, // Set by portfolio analysis
      recommendation,
      rationale: this.generateRationale(option, overallScore, scenarios),
      scenarios,
      sensitivity: this.generateSensitivityAnalysis(option),
      realOptionsValue,
      competitiveResponse: this.assessCompetitiveResponse(option)
    };

    this.evaluationHistory.set(optionId, evaluation);
    return evaluation;
  }

  private calculateFinancialScores(option: StrategicOption): number {
    const { financialProjections } = option;

    // Calculate NPV
    const npv = this.calculateNPV(financialProjections.cashFlows, financialProjections.discountRate);

    // Calculate IRR
    const irr = this.calculateIRR(financialProjections.cashFlows);

    // Calculate payback period
    const paybackPeriod = this.calculatePaybackPeriod(financialProjections.cashFlows);

    // Score components (0-100 scale)
    const npvScore = Math.min(Math.max((npv / 100) * 100, 0), 100); // $1M NPV = 1 point
    const irrScore = Math.min(Math.max((irr - financialProjections.discountRate) * 500, 0), 100);
    const paybackScore = Math.min(Math.max((60 - paybackPeriod) * 2, 0), 100); // 5 years = 0 points

    return (npvScore * 0.4 + irrScore * 0.4 + paybackScore * 0.2);
  }

  private calculateStrategicScores(option: StrategicOption): number {
    const { strategic } = option;

    const alignmentScore = strategic.alignment * 10;
    const advantageScore = strategic.competitiveAdvantage * 10;
    const opportunityScore = Math.min((strategic.marketOpportunity / 200) * 100, 100);
    const differentiationScore = strategic.differentiation * 10;
    const sustainabilityScore = strategic.sustainability * 10;

    return (alignmentScore * 0.25 + advantageScore * 0.25 + opportunityScore * 0.2 +
            differentiationScore * 0.15 + sustainabilityScore * 0.15);
  }

  private calculateRiskScores(option: StrategicOption): number {
    const { risks } = option;

    // Lower risk values are better, so invert the scale
    const executionScore = (6 - risks.executionRisk) * 20;
    const marketScore = (6 - risks.marketRisk) * 20;
    const competitiveScore = (6 - risks.competitiveRisk) * 20;
    const technicalScore = (6 - risks.technicalRisk) * 20;
    const regulatoryScore = (6 - risks.regulatoryRisk) * 20;

    return (executionScore * 0.25 + marketScore * 0.2 + competitiveScore * 0.2 +
            technicalScore * 0.2 + regulatoryScore * 0.15);
  }

  private calculateImplementationScores(option: StrategicOption): number {
    const { implementation } = option;

    const complexityScore = (6 - implementation.complexity) * 20;
    const timelineScore = Math.min(Math.max((60 - implementation.duration) * 2, 0), 100);
    const resourceScore = 80; // Simplified assumption
    const dependencyScore = Math.min(Math.max((10 - implementation.dependencies.length) * 10, 0), 100);

    return (complexityScore * 0.3 + timelineScore * 0.3 + resourceScore * 0.2 + dependencyScore * 0.2);
  }

  private calculateStakeholderScores(option: StrategicOption): number {
    const { stakeholders } = option;

    const supportScore = stakeholders.supportLevel * 10;
    const resistanceScore = (11 - stakeholders.resistanceLevel) * 10;
    const championScore = Math.min(stakeholders.champions.length * 20, 100);

    return (supportScore * 0.5 + resistanceScore * 0.3 + championScore * 0.2);
  }

  private calculateOverallScore(
    scores: any,
    criteria: EvaluationCriteria
  ): number {
    return (
      scores.financial * criteria.financial.weight +
      scores.strategic * criteria.strategic.weight +
      scores.risk * criteria.risk.weight +
      scores.implementation * criteria.implementation.weight +
      scores.stakeholder * criteria.stakeholder.weight
    );
  }

  private calculateNPV(cashFlows: number[], discountRate: number): number {
    return cashFlows.reduce((npv, cf, index) => {
      return npv + cf / Math.pow(1 + discountRate, index);
    }, 0);
  }

  private calculateIRR(cashFlows: number[]): number {
    // Simplified IRR calculation using Newton-Raphson method
    let irr = 0.1; // Initial guess
    const tolerance = 0.0001;
    const maxIterations = 100;

    for (let i = 0; i < maxIterations; i++) {
      const npv = cashFlows.reduce((sum, cf, index) => sum + cf / Math.pow(1 + irr, index), 0);
      const derivative = cashFlows.reduce((sum, cf, index) => sum - (index * cf) / Math.pow(1 + irr, index + 1), 0);

      const newIrr = irr - npv / derivative;

      if (Math.abs(newIrr - irr) < tolerance) {
        return newIrr;
      }

      irr = newIrr;
    }

    return irr;
  }

  private calculatePaybackPeriod(cashFlows: number[]): number {
    let cumulativeCashFlow = 0;

    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i];
      if (cumulativeCashFlow > 0) {
        return i + (cumulativeCashFlow - cashFlows[i]) / cashFlows[i];
      }
    }

    return cashFlows.length; // Never pays back
  }

  private generateScenarioAnalysis(option: StrategicOption): ScenarioAnalysis {
    const baseCaseNPV = this.calculateNPV(option.financialProjections.cashFlows, option.financialProjections.discountRate);

    // Generate optimistic scenario (20% revenue upside, 10% cost reduction)
    const optimisticCashFlows = option.financialProjections.cashFlows.map((cf, index) => {
      if (index === 0) return cf; // Initial investment unchanged
      const revenue = option.financialProjections.revenues[index - 1] || 0;
      const cost = option.financialProjections.operatingCosts[index - 1] || 0;
      return (revenue * 1.2) - (cost * 0.9);
    });

    const optimisticNPV = this.calculateNPV(optimisticCashFlows, option.financialProjections.discountRate);

    // Generate pessimistic scenario (20% revenue downside, 15% cost increase)
    const pessimisticCashFlows = option.financialProjections.cashFlows.map((cf, index) => {
      if (index === 0) return cf; // Initial investment unchanged
      const revenue = option.financialProjections.revenues[index - 1] || 0;
      const cost = option.financialProjections.operatingCosts[index - 1] || 0;
      return (revenue * 0.8) - (cost * 1.15);
    });

    const pessimisticNPV = this.calculateNPV(pessimisticCashFlows, option.financialProjections.discountRate);

    // Calculate expected value and variance
    const baseProbability = 0.5;
    const optimisticProbability = 0.25;
    const pessimisticProbability = 0.25;

    const expectedValue = (baseCaseNPV * baseProbability) +
                         (optimisticNPV * optimisticProbability) +
                         (pessimisticNPV * pessimisticProbability);

    const variance = (Math.pow(baseCaseNPV - expectedValue, 2) * baseProbability) +
                    (Math.pow(optimisticNPV - expectedValue, 2) * optimisticProbability) +
                    (Math.pow(pessimisticNPV - expectedValue, 2) * pessimisticProbability);

    const standardDeviation = Math.sqrt(variance);

    return {
      baseCase: {
        probability: baseProbability,
        npv: baseCaseNPV,
        outcomes: ['Target performance achieved', 'Expected market conditions', 'Standard execution']
      },
      optimistic: {
        probability: optimisticProbability,
        npv: optimisticNPV,
        outcomes: ['Market expansion success', 'Strong customer adoption', 'Operational excellence']
      },
      pessimistic: {
        probability: pessimisticProbability,
        npv: pessimisticNPV,
        outcomes: ['Market challenges', 'Execution difficulties', 'Competitive pressure']
      },
      expectedValue,
      variance,
      confidenceInterval: {
        lower: expectedValue - (1.96 * standardDeviation),
        upper: expectedValue + (1.96 * standardDeviation)
      },
      sensitivityAnalysis: [
        { variable: 'Revenue Growth', impact: expectedValue * 0.15, elasticity: 1.5 },
        { variable: 'Cost Structure', impact: expectedValue * -0.12, elasticity: -1.2 },
        { variable: 'Market Adoption', impact: expectedValue * 0.18, elasticity: 1.8 },
        { variable: 'Competitive Response', impact: expectedValue * -0.08, elasticity: -0.8 }
      ]
    };
  }

  private calculateRealOptionsValue(option: StrategicOption, scenarios: ScenarioAnalysis): number {
    // Simplified real options valuation using Black-Scholes approach
    const volatility = Math.sqrt(scenarios.variance) / scenarios.expectedValue;
    const timeToMaturity = option.implementation.duration / 12; // Convert to years
    const riskFreeRate = 0.03; // 3% risk-free rate

    // Option to expand if successful
    const expansionValue = Math.max(scenarios.optimistic.npv * 0.5, 0);

    // Option to abandon if unsuccessful
    const abandonmentValue = Math.max(option.financialProjections.initialInvestment * 0.3, 0);

    return (expansionValue + abandonmentValue) * 0.6; // Discount for uncertainty
  }

  private generateRecommendation(
    overallScore: number,
    scenarios: ScenarioAnalysis,
    option: StrategicOption
  ): 'proceed' | 'modify' | 'delay' | 'reject' {
    if (overallScore >= 75 && scenarios.expectedValue > 0) {
      return 'proceed';
    } else if (overallScore >= 60 && scenarios.expectedValue > -20) {
      return 'modify';
    } else if (overallScore >= 45) {
      return 'delay';
    } else {
      return 'reject';
    }
  }

  private generateRationale(
    option: StrategicOption,
    overallScore: number,
    scenarios: ScenarioAnalysis
  ): string {
    const recommendation = this.generateRecommendation(overallScore, scenarios, option);

    switch (recommendation) {
      case 'proceed':
        return `Strong strategic fit with expected NPV of $${scenarios.expectedValue.toFixed(1)}M. High alignment with strategic priorities and manageable risk profile.`;
      case 'modify':
        return `Good strategic potential but requires modifications to improve risk-return profile. Consider phased implementation or scope adjustments.`;
      case 'delay':
        return `Strategic merit exists but timing or market conditions not optimal. Monitor market developments and reassess in 6-12 months.`;
      case 'reject':
        return `Insufficient strategic value or excessive risk relative to expected returns. Resources better allocated to alternative opportunities.`;
      default:
        return 'Comprehensive analysis required before making final recommendation.';
    }
  }

  private generateSensitivityAnalysis(option: StrategicOption): OptionEvaluation['sensitivity'] {
    return [
      {
        factor: 'Market Demand',
        currentValue: 100,
        breakEvenValue: 85,
        riskLevel: 'medium'
      },
      {
        factor: 'Implementation Timeline',
        currentValue: option.implementation.duration,
        breakEvenValue: option.implementation.duration * 1.3,
        riskLevel: 'low'
      },
      {
        factor: 'Initial Investment',
        currentValue: option.financialProjections.initialInvestment,
        breakEvenValue: option.financialProjections.initialInvestment * 1.25,
        riskLevel: 'medium'
      },
      {
        factor: 'Competitive Response',
        currentValue: 2.5,
        breakEvenValue: 3.5,
        riskLevel: 'high'
      }
    ];
  }

  private assessCompetitiveResponse(option: StrategicOption): OptionEvaluation['competitiveResponse'] {
    return {
      likelihood: option.strategic.competitiveAdvantage > 7 ? 4 : 3,
      potentialActions: [
        'Price competition',
        'Feature matching',
        'Strategic partnerships',
        'Acquisition threats',
        'Market flooding'
      ],
      timeToResponse: option.category === 'innovation' ? 18 : 12,
      counterStrategies: [
        'Speed to market advantage',
        'Customer loyalty programs',
        'Intellectual property protection',
        'Network effects building',
        'Operational excellence'
      ]
    };
  }

  public optimizePortfolio(
    optionIds: string[],
    constraints: PortfolioAnalysis['constraints'],
    criteria: EvaluationCriteria
  ): PortfolioAnalysis {
    const options = optionIds.map(id => this.optionsDatabase.get(id)).filter(Boolean) as StrategicOption[];

    if (options.length === 0) {
      throw new Error('No valid options provided for portfolio optimization');
    }

    // Evaluate all options
    const evaluations = options.map(option =>
      this.evaluateOption(option.id, criteria, {
        decisionType: 'portfolio-optimization',
        timeHorizon: 5,
        decisionCriteria: criteria,
        constraints,
        stakeholderWeights: {},
        methodology: 'weighted-scoring'
      })
    );

    // Calculate correlations between options
    const correlations = this.calculateOptionCorrelations(options);

    // Generate portfolio metrics
    const portfolioMetrics = this.calculatePortfolioMetrics(evaluations, correlations);

    // Optimize portfolio selection
    const optimalPortfolio = this.selectOptimalPortfolio(evaluations, constraints, correlations);

    return {
      options,
      correlations,
      portfolioMetrics,
      optimalPortfolio,
      constraints
    };
  }

  private calculateOptionCorrelations(options: StrategicOption[]): PortfolioAnalysis['correlations'] {
    const correlations: PortfolioAnalysis['correlations'] = [];

    for (let i = 0; i < options.length; i++) {
      for (let j = i + 1; j < options.length; j++) {
        const option1 = options[i];
        const option2 = options[j];

        // Calculate correlation based on market overlap, resource requirements, and strategic focus
        let correlation = 0;

        // Market overlap correlation
        if (option1.category === option2.category) {
          correlation += 0.3;
        }

        // Resource competition correlation
        const resourceOverlap = Math.min(
          option1.implementation.resourceRequirements.personnel / 100,
          option2.implementation.resourceRequirements.personnel / 100
        );
        correlation += resourceOverlap * 0.4;

        // Strategic synergy (negative correlation = diversification benefit)
        const strategySynergy = option1.strategic.synergies.filter(s =>
          option2.strategic.synergies.includes(s)
        ).length / Math.max(option1.strategic.synergies.length, option2.strategic.synergies.length);
        correlation += strategySynergy * 0.3;

        correlations.push({
          option1: option1.id,
          option2: option2.id,
          correlation: Math.min(correlation, 0.95) // Cap at 95% correlation
        });
      }
    }

    return correlations;
  }

  private calculatePortfolioMetrics(
    evaluations: OptionEvaluation[],
    correlations: PortfolioAnalysis['correlations']
  ): PortfolioAnalysis['portfolioMetrics'] {
    const totalInvestment = evaluations.reduce((sum, eval) =>
      sum + eval.option.financialProjections.initialInvestment, 0);

    const expectedReturn = evaluations.reduce((sum, eval) =>
      sum + eval.scenarios.expectedValue, 0);

    // Calculate portfolio risk considering correlations
    const individualRisks = evaluations.map(eval => Math.sqrt(eval.scenarios.variance));
    let portfolioVariance = 0;

    // Individual variances
    individualRisks.forEach(risk => {
      portfolioVariance += Math.pow(risk, 2);
    });

    // Correlation effects
    correlations.forEach(corr => {
      const eval1 = evaluations.find(e => e.option.id === corr.option1);
      const eval2 = evaluations.find(e => e.option.id === corr.option2);
      if (eval1 && eval2) {
        const risk1 = Math.sqrt(eval1.scenarios.variance);
        const risk2 = Math.sqrt(eval2.scenarios.variance);
        portfolioVariance += 2 * corr.correlation * risk1 * risk2;
      }
    });

    const portfolioRisk = Math.sqrt(portfolioVariance);
    const sharpeRatio = expectedReturn / (portfolioRisk || 1);

    const diversificationBenefit = (individualRisks.reduce((sum, risk) => sum + risk, 0) - portfolioRisk) /
                                 individualRisks.reduce((sum, risk) => sum + risk, 0);

    return {
      totalInvestment,
      expectedReturn,
      portfolioRisk,
      diversificationBenefit,
      sharpeRatio
    };
  }

  private selectOptimalPortfolio(
    evaluations: OptionEvaluation[],
    constraints: PortfolioAnalysis['constraints'],
    correlations: PortfolioAnalysis['correlations']
  ): PortfolioAnalysis['optimalPortfolio'] {
    // Sort evaluations by score
    const sortedEvaluations = evaluations.sort((a, b) => b.scores.overall - a.scores.overall);

    // Greedy selection with constraints
    const selectedOptions: string[] = [];
    let totalInvestment = 0;
    let totalValue = 0;

    for (const evaluation of sortedEvaluations) {
      const option = evaluation.option;
      const investmentCost = option.financialProjections.initialInvestment;

      if (totalInvestment + investmentCost <= constraints.budgetLimit &&
          selectedOptions.length < 5) { // Practical limit
        selectedOptions.push(option.id);
        totalInvestment += investmentCost;
        totalValue += evaluation.scenarios.expectedValue;
      }
    }

    // Create implementation phases
    const phases = this.createImplementationPhases(selectedOptions, evaluations);

    return {
      selectedOptions,
      totalValue,
      riskAdjustedValue: totalValue * 0.85, // Apply risk discount
      implementation: { phases }
    };
  }

  private createImplementationPhases(
    selectedOptions: string[],
    evaluations: OptionEvaluation[]
  ): PortfolioAnalysis['optimalPortfolio']['implementation']['phases'] {
    const phases: PortfolioAnalysis['optimalPortfolio']['implementation']['phases'] = [];

    // Group options by implementation timeline and dependencies
    const sortedOptions = selectedOptions
      .map(id => evaluations.find(e => e.option.id === id)!)
      .sort((a, b) => a.option.implementation.duration - b.option.implementation.duration);

    let currentPhase = 1;
    let phaseOptions: string[] = [];
    let phaseInvestment = 0;
    let phaseReturns = 0;

    sortedOptions.forEach((evaluation, index) => {
      phaseOptions.push(evaluation.option.id);
      phaseInvestment += evaluation.option.financialProjections.initialInvestment;
      phaseReturns += evaluation.scenarios.expectedValue;

      // Create phase every 2 options or at the end
      if (phaseOptions.length === 2 || index === sortedOptions.length - 1) {
        phases.push({
          phase: currentPhase,
          duration: Math.max(...phaseOptions.map(id =>
            evaluations.find(e => e.option.id === id)!.option.implementation.duration
          )),
          options: [...phaseOptions],
          investment: phaseInvestment,
          expectedReturns: phaseReturns
        });

        currentPhase++;
        phaseOptions = [];
        phaseInvestment = 0;
        phaseReturns = 0;
      }
    });

    return phases;
  }

  public generateComprehensiveEvaluationReport(
    optionIds: string[],
    criteria: EvaluationCriteria,
    framework: DecisionFramework
  ): string {
    try {
      const evaluations = optionIds.map(id => this.evaluateOption(id, criteria, framework));
      const rankedEvaluations = evaluations.sort((a, b) => b.scores.overall - a.scores.overall);

      // Assign rankings
      rankedEvaluations.forEach((evaluation, index) => {
        evaluation.ranking = index + 1;
      });

      return `
# STRATEGIC OPTION EVALUATION REPORT

## EXECUTIVE SUMMARY

**Analysis Framework**: ${framework.methodology.toUpperCase()}
**Decision Type**: ${framework.decisionType.replace('-', ' ').toUpperCase()}
**Time Horizon**: ${framework.timeHorizon} years
**Options Evaluated**: ${optionIds.length}

### Top Recommendations
${rankedEvaluations.slice(0, 3).map((eval, index) => `
**${index + 1}. ${eval.option.name}** (Score: ${eval.scores.overall.toFixed(1)})
- **Recommendation**: ${eval.recommendation.toUpperCase()}
- **Expected NPV**: $${eval.scenarios.expectedValue.toFixed(1)}M
- **Investment**: $${eval.option.financialProjections.initialInvestment}M
- **Timeline**: ${eval.option.implementation.duration} months
- **Rationale**: ${eval.rationale}
`).join('')}

## DETAILED EVALUATIONS

${rankedEvaluations.map(evaluation => `
### ${evaluation.ranking}. ${evaluation.option.name}

**Overall Score**: ${evaluation.scores.overall.toFixed(1)}/100
**Recommendation**: **${evaluation.recommendation.toUpperCase()}**

#### Strategic Overview
${evaluation.option.description}

**Category**: ${evaluation.option.category.charAt(0).toUpperCase() + evaluation.option.category.slice(1)}
**Strategic Alignment**: ${evaluation.option.strategic.alignment}/10

#### Financial Analysis
**Initial Investment**: $${evaluation.option.financialProjections.initialInvestment}M
**Expected NPV**: $${evaluation.scenarios.expectedValue.toFixed(1)}M
**IRR**: ${(this.calculateIRR(evaluation.option.financialProjections.cashFlows) * 100).toFixed(1)}%
**Payback Period**: ${this.calculatePaybackPeriod(evaluation.option.financialProjections.cashFlows).toFixed(1)} years

**Scenario Analysis**:
- **Base Case** (${(evaluation.scenarios.baseCase.probability * 100).toFixed(0)}%): $${evaluation.scenarios.baseCase.npv.toFixed(1)}M NPV
- **Optimistic** (${(evaluation.scenarios.optimistic.probability * 100).toFixed(0)}%): $${evaluation.scenarios.optimistic.npv.toFixed(1)}M NPV
- **Pessimistic** (${(evaluation.scenarios.pessimistic.probability * 100).toFixed(0)}%): $${evaluation.scenarios.pessimistic.npv.toFixed(1)}M NPV

#### Scoring Breakdown
- **Financial**: ${evaluation.scores.financial.toFixed(1)}/100
- **Strategic**: ${evaluation.scores.strategic.toFixed(1)}/100
- **Risk**: ${evaluation.scores.risk.toFixed(1)}/100 (lower risk = higher score)
- **Implementation**: ${evaluation.scores.implementation.toFixed(1)}/100
- **Stakeholder**: ${evaluation.scores.stakeholder.toFixed(1)}/100

#### Implementation Plan
**Duration**: ${evaluation.option.implementation.duration} months
**Complexity**: ${evaluation.option.implementation.complexity}/5
**Resource Requirements**:
- Personnel: ${evaluation.option.implementation.resourceRequirements.personnel} FTE
- Technology: $${evaluation.option.implementation.resourceRequirements.technology}M
- External: $${evaluation.option.implementation.resourceRequirements.external}M

**Key Milestones**:
${evaluation.option.implementation.milestones.map(milestone => `
- **${milestone.phase}** (${milestone.duration} months)
  - Deliverables: ${milestone.deliverables.join(', ')}
  - Success Criteria: ${milestone.successCriteria.join(', ')}
`).join('')}

#### Risk Assessment
**Risk Profile**:
- Execution Risk: ${evaluation.option.risks.executionRisk}/5
- Market Risk: ${evaluation.option.risks.marketRisk}/5
- Competitive Risk: ${evaluation.option.risks.competitiveRisk}/5
- Technical Risk: ${evaluation.option.risks.technicalRisk}/5
- Regulatory Risk: ${evaluation.option.risks.regulatoryRisk}/5

**Key Risk Mitigation**:
${evaluation.option.risks.mitigation.map(m => `• ${m}`).join('\n')}

#### Competitive Response
**Response Likelihood**: ${evaluation.competitiveResponse.likelihood}/5
**Time to Response**: ${evaluation.competitiveResponse.timeToResponse} months

**Potential Competitor Actions**:
${evaluation.competitiveResponse.potentialActions.map(a => `• ${a}`).join('\n')}

**Counter-Strategies**:
${evaluation.competitiveResponse.counterStrategies.map(s => `• ${s}`).join('\n')}

#### Sensitivity Analysis
**Critical Success Factors**:
${evaluation.sensitivity.map(s => `• **${s.factor}**: Current ${s.currentValue}, Break-even ${s.breakEvenValue} (Risk: ${s.riskLevel})`).join('\n')}

#### Stakeholder Assessment
**Support Level**: ${evaluation.option.stakeholders.supportLevel}/10
**Resistance Level**: ${evaluation.option.stakeholders.resistanceLevel}/10

**Champions**: ${evaluation.option.stakeholders.champions.join(', ')}
**Opponents**: ${evaluation.option.stakeholders.opponents.join(', ')}

#### Strategic Synergies
${evaluation.option.strategic.synergies.map(s => `• ${s}`).join('\n')}

#### Real Options Value
**Optionality Value**: $${evaluation.realOptionsValue.toFixed(1)}M
This represents the value of flexibility and future decision rights embedded in this option.

---
`).join('')}

## PORTFOLIO OPTIMIZATION ANALYSIS

${framework.decisionType === 'portfolio-optimization' ? `
### Recommended Portfolio
Based on optimization constraints and strategic objectives:

**Budget Constraint**: $${framework.constraints.budget}M
**Timeline Constraint**: ${framework.constraints.timeline} months
**Risk Tolerance**: ${framework.constraints.riskTolerance}/5

**Optimal Portfolio Selection**:
${rankedEvaluations.filter(e => e.recommendation === 'proceed' || e.recommendation === 'modify').slice(0, 3).map(e => `
• **${e.option.name}**: $${e.option.financialProjections.initialInvestment}M investment, $${e.scenarios.expectedValue.toFixed(1)}M expected NPV
`).join('')}

**Portfolio Metrics**:
- Total Investment: $${rankedEvaluations.slice(0, 3).reduce((sum, e) => sum + e.option.financialProjections.initialInvestment, 0)}M
- Expected Portfolio NPV: $${rankedEvaluations.slice(0, 3).reduce((sum, e) => sum + e.scenarios.expectedValue, 0).toFixed(1)}M
- Risk-Adjusted Return: Multiple strategic options provide diversification benefits
` : ''}

## IMPLEMENTATION ROADMAP

### Immediate Actions (Next 90 Days)
${rankedEvaluations.filter(e => e.recommendation === 'proceed').slice(0, 2).map(e => `
• **${e.option.name}**: Begin ${e.option.implementation.milestones[0].phase}
  - Key Activities: ${e.option.implementation.milestones[0].deliverables.slice(0, 3).join(', ')}
  - Budget Required: $${(e.option.financialProjections.initialInvestment * 0.2).toFixed(1)}M
`).join('')}

### Medium-Term Execution (6-18 Months)
${rankedEvaluations.filter(e => e.recommendation === 'proceed' || e.recommendation === 'modify').map(e => `
• **${e.option.name}**: ${e.recommendation === 'modify' ? 'Refined implementation with' : 'Full execution of'} core capabilities
  - Timeline: ${e.option.implementation.duration} months
  - Key Milestone: ${e.option.implementation.milestones[Math.floor(e.option.implementation.milestones.length/2)].phase}
`).join('')}

### Strategic Reviews
- **Quarterly Reviews**: Progress against milestones and KPIs
- **Annual Strategic Assessment**: Market evolution and competitive response evaluation
- **Option Value Monitoring**: Real options value and strategic pivot opportunities

## CONCLUSION AND RECOMMENDATIONS

### Primary Recommendation
**${rankedEvaluations[0].recommendation === 'proceed' ? 'Proceed' : 'Modify approach'}** with **${rankedEvaluations[0].option.name}** as the flagship strategic initiative.

**Strategic Rationale**: ${rankedEvaluations[0].rationale}

### Portfolio Approach
${rankedEvaluations.filter(e => e.recommendation === 'proceed').length > 1 ?
`Implement a **portfolio approach** combining ${rankedEvaluations.filter(e => e.recommendation === 'proceed').length} strategic options for maximum strategic impact and risk diversification.` :
'Focus resources on the top-ranked option with contingency planning for the second-ranked alternative.'}

### Critical Success Factors
1. **Leadership Commitment**: Executive sponsorship and resource allocation
2. **Execution Excellence**: Disciplined project management and milestone tracking
3. **Market Responsiveness**: Continuous market monitoring and adaptive strategy
4. **Stakeholder Engagement**: Proactive change management and communication
5. **Competitive Intelligence**: Early warning systems and response readiness

### Risk Management
- Implement comprehensive risk monitoring across all selected options
- Establish clear go/no-go decision gates at major milestones
- Maintain strategic flexibility through real options management
- Develop contingency plans for competitive response scenarios

**Total Strategic Value Creation**: $${rankedEvaluations.filter(e => e.recommendation === 'proceed').reduce((sum, e) => sum + e.scenarios.expectedValue, 0).toFixed(1)}M in expected NPV across recommended initiatives.
`;

    } catch (error) {
      return `Error generating strategic option evaluation report: ${error}`;
    }
  }
}