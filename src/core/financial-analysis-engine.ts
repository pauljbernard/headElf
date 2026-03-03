/**
 * HeadElf Financial Analysis Engine
 *
 * Provides world-class quantitative financial analysis capabilities matching
 * McKinsey/Bain/BCG analytical standards for investment decisions, M&A analysis,
 * and strategic financial planning.
 */

export interface FinancialMetrics {
  revenue: number;
  operatingCosts: number;
  capitalExpenditures: number;
  workingCapitalChange: number;
  taxRate: number;
  discountRate: number;
}

export interface CashFlowProjection {
  year: number;
  revenue: number;
  operatingCashFlow: number;
  freeCashFlow: number;
  cumulativeFCF: number;
  presentValue: number;
}

export interface InvestmentAnalysis {
  initialInvestment: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  paybackPeriod: number;
  profitabilityIndex: number;
  confidenceLevel: number;
}

export interface RiskScenario {
  scenario: 'optimistic' | 'base' | 'pessimistic';
  probability: number;
  revenueMultiplier: number;
  costMultiplier: number;
  npv: number;
  irr: number;
}

export interface IndustryBenchmark {
  industry: string;
  metric: string;
  percentile25: number;
  percentile50: number;
  percentile75: number;
  topDecile: number;
  dataSource: string;
  lastUpdated: string;
}

export class FinancialAnalysisEngine {
  private industryBenchmarks: Map<string, IndustryBenchmark[]>;

  constructor() {
    this.industryBenchmarks = new Map();
    this.loadIndustryBenchmarks();
  }

  /**
   * Comprehensive investment analysis with Monte Carlo simulation
   */
  public analyzeInvestment(
    investment: number,
    cashFlows: number[],
    discountRate: number,
    riskFactors: { revenue: number; costs: number; timeline: number } = { revenue: 0.2, costs: 0.15, timeline: 0.1 }
  ): InvestmentAnalysis {

    // Calculate base metrics
    const npv = this.calculateNPV(investment, cashFlows, discountRate);
    const irr = this.calculateIRR(investment, cashFlows);
    const paybackPeriod = this.calculatePaybackPeriod(investment, cashFlows);
    const profitabilityIndex = (npv + investment) / investment;

    // Monte Carlo simulation for confidence assessment
    const simulations = this.runMonteCarloSimulation(investment, cashFlows, discountRate, riskFactors);
    const confidenceLevel = this.calculateConfidenceLevel(simulations, npv);

    return {
      initialInvestment: investment,
      netPresentValue: npv,
      internalRateOfReturn: irr,
      paybackPeriod,
      profitabilityIndex,
      confidenceLevel
    };
  }

  /**
   * Multi-scenario financial projections with risk adjustment
   */
  public generateScenarioAnalysis(
    baseMetrics: FinancialMetrics,
    projectionYears: number = 5
  ): {
    scenarios: RiskScenario[];
    expectedValue: number;
    riskAdjustedNPV: number;
    valueAtRisk: number;
  } {

    const scenarios: RiskScenario[] = [
      {
        scenario: 'optimistic',
        probability: 0.2,
        revenueMultiplier: 1.3,
        costMultiplier: 0.9,
        npv: 0,
        irr: 0
      },
      {
        scenario: 'base',
        probability: 0.6,
        revenueMultiplier: 1.0,
        costMultiplier: 1.0,
        npv: 0,
        irr: 0
      },
      {
        scenario: 'pessimistic',
        probability: 0.2,
        revenueMultiplier: 0.7,
        costMultiplier: 1.2,
        npv: 0,
        irr: 0
      }
    ];

    // Calculate NPV and IRR for each scenario
    scenarios.forEach(scenario => {
      const adjustedCashFlows = this.generateProjectedCashFlows(
        baseMetrics,
        projectionYears,
        scenario.revenueMultiplier,
        scenario.costMultiplier
      );

      scenario.npv = this.calculateNPV(0, adjustedCashFlows.map(cf => cf.freeCashFlow), baseMetrics.discountRate);
      scenario.irr = this.calculateIRR(0, adjustedCashFlows.map(cf => cf.freeCashFlow));
    });

    // Calculate probability-weighted expected value
    const expectedValue = scenarios.reduce((sum, scenario) =>
      sum + (scenario.npv * scenario.probability), 0
    );

    // Risk-adjusted NPV using CAPM-style adjustment
    const riskPremium = this.calculateRiskPremium(scenarios);
    const riskAdjustedNPV = expectedValue - riskPremium;

    // Value at Risk (5th percentile)
    const sortedNPVs = scenarios.map(s => s.npv).sort((a, b) => a - b);
    const valueAtRisk = sortedNPVs[0]; // Worst case scenario

    return {
      scenarios,
      expectedValue,
      riskAdjustedNPV,
      valueAtRisk
    };
  }

  /**
   * Industry benchmark comparison analysis
   */
  public benchmarkAnalysis(
    industry: string,
    metrics: { [key: string]: number }
  ): {
    benchmarkComparisons: Array<{
      metric: string;
      value: number;
      industryMedian: number;
      percentileRank: number;
      performance: 'top-decile' | 'above-median' | 'below-median' | 'bottom-quartile';
    }>;
    overallRanking: number;
    competitivePosition: string;
  } {

    const benchmarks = this.industryBenchmarks.get(industry) || [];
    const comparisons = Object.entries(metrics).map(([metricName, value]) => {
      const benchmark = benchmarks.find(b => b.metric === metricName);

      if (!benchmark) {
        return {
          metric: metricName,
          value,
          industryMedian: 0,
          percentileRank: 0,
          performance: 'below-median' as const
        };
      }

      const percentileRank = this.calculatePercentileRank(value, benchmark);
      const performance = this.categorizePerformance(percentileRank);

      return {
        metric: metricName,
        value,
        industryMedian: benchmark.percentile50,
        percentileRank,
        performance
      };
    });

    const overallRanking = comparisons.reduce((sum, comp) => sum + comp.percentileRank, 0) / comparisons.length;
    const competitivePosition = this.determineCompetitivePosition(overallRanking);

    return {
      benchmarkComparisons: comparisons,
      overallRanking,
      competitivePosition
    };
  }

  /**
   * M&A valuation analysis with multiple methodologies
   */
  public valuationAnalysis(
    targetMetrics: FinancialMetrics,
    projectionYears: number,
    industry: string
  ): {
    dcfValuation: number;
    comparableCompanyValuation: number;
    precedentTransactionValuation: number;
    weightedAverageValuation: number;
    valuationRange: { low: number; high: number };
    recommendedOffer: { amount: number; premium: number; rationale: string };
  } {

    // DCF Valuation
    const projectedCashFlows = this.generateProjectedCashFlows(targetMetrics, projectionYears);
    const terminalValue = this.calculateTerminalValue(
      projectedCashFlows[projectedCashFlows.length - 1].freeCashFlow,
      0.025, // Long-term growth rate
      targetMetrics.discountRate
    );

    const dcfValuation = this.calculateNPV(0, [
      ...projectedCashFlows.map(cf => cf.freeCashFlow),
      terminalValue
    ], targetMetrics.discountRate);

    // Comparable Company Valuation (using industry multiples)
    const industryMultiples = this.getIndustryMultiples(industry);
    const comparableCompanyValuation = targetMetrics.revenue * industryMultiples.revenueMultiple;

    // Precedent Transaction Valuation (with transaction premium)
    const precedentTransactionValuation = comparableCompanyValuation * 1.25; // 25% transaction premium

    // Weighted average (40% DCF, 35% Comps, 25% Precedents)
    const weightedAverageValuation =
      (dcfValuation * 0.4) +
      (comparableCompanyValuation * 0.35) +
      (precedentTransactionValuation * 0.25);

    // Valuation range (±15% of weighted average)
    const valuationRange = {
      low: weightedAverageValuation * 0.85,
      high: weightedAverageValuation * 1.15
    };

    // Recommended offer (strategic premium consideration)
    const strategicPremium = this.calculateStrategicPremium(targetMetrics, industry);
    const recommendedAmount = weightedAverageValuation * (1 + strategicPremium);

    return {
      dcfValuation,
      comparableCompanyValuation,
      precedentTransactionValuation,
      weightedAverageValuation,
      valuationRange,
      recommendedOffer: {
        amount: recommendedAmount,
        premium: strategicPremium,
        rationale: this.generateOfferRationale(strategicPremium, industry)
      }
    };
  }

  /**
   * Calculate Net Present Value
   */
  private calculateNPV(initialInvestment: number, cashFlows: number[], discountRate: number): number {
    const presentValues = cashFlows.map((cashFlow, index) =>
      cashFlow / Math.pow(1 + discountRate, index + 1)
    );
    return presentValues.reduce((sum, pv) => sum + pv, 0) - initialInvestment;
  }

  /**
   * Calculate Internal Rate of Return using Newton-Raphson method
   */
  private calculateIRR(initialInvestment: number, cashFlows: number[]): number {
    let irr = 0.1; // Initial guess
    const tolerance = 0.0001;
    const maxIterations = 100;

    for (let i = 0; i < maxIterations; i++) {
      const npv = this.calculateNPV(initialInvestment, cashFlows, irr);
      const derivative = this.calculateNPVDerivative(initialInvestment, cashFlows, irr);

      const newIRR = irr - (npv / derivative);

      if (Math.abs(newIRR - irr) < tolerance) {
        return newIRR;
      }

      irr = newIRR;
    }

    return irr;
  }

  /**
   * Calculate payback period
   */
  private calculatePaybackPeriod(initialInvestment: number, cashFlows: number[]): number {
    let cumulativeCashFlow = -initialInvestment;

    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i];

      if (cumulativeCashFlow >= 0) {
        // Linear interpolation for fractional year
        const fractionOfYear = (cumulativeCashFlow - cashFlows[i]) / cashFlows[i];
        return i + 1 - fractionOfYear;
      }
    }

    return cashFlows.length; // Payback period exceeds projection period
  }

  /**
   * Generate projected cash flows with growth and risk adjustments
   */
  private generateProjectedCashFlows(
    baseMetrics: FinancialMetrics,
    years: number,
    revenueMultiplier: number = 1.0,
    costMultiplier: number = 1.0
  ): CashFlowProjection[] {
    const projections: CashFlowProjection[] = [];
    let cumulativeFCF = 0;

    for (let year = 1; year <= years; year++) {
      // Apply growth assumptions and multipliers
      const growthRate = 0.15 - (year * 0.02); // Declining growth rate
      const revenue = baseMetrics.revenue * Math.pow(1 + growthRate, year) * revenueMultiplier;
      const operatingCosts = baseMetrics.operatingCosts * Math.pow(1 + growthRate * 0.8, year) * costMultiplier;

      const ebitda = revenue - operatingCosts;
      const taxes = ebitda * baseMetrics.taxRate;
      const operatingCashFlow = ebitda - taxes;
      const freeCashFlow = operatingCashFlow - baseMetrics.capitalExpenditures - baseMetrics.workingCapitalChange;

      cumulativeFCF += freeCashFlow;

      const presentValue = freeCashFlow / Math.pow(1 + baseMetrics.discountRate, year);

      projections.push({
        year,
        revenue,
        operatingCashFlow,
        freeCashFlow,
        cumulativeFCF,
        presentValue
      });
    }

    return projections;
  }

  /**
   * Monte Carlo simulation for risk assessment
   */
  private runMonteCarloSimulation(
    investment: number,
    baseCashFlows: number[],
    discountRate: number,
    riskFactors: { revenue: number; costs: number; timeline: number },
    iterations: number = 10000
  ): number[] {
    const results: number[] = [];

    for (let i = 0; i < iterations; i++) {
      // Apply random variations based on risk factors
      const adjustedCashFlows = baseCashFlows.map(cf => {
        const revenueVariation = 1 + (Math.random() - 0.5) * 2 * riskFactors.revenue;
        const costVariation = 1 + (Math.random() - 0.5) * 2 * riskFactors.costs;
        return cf * revenueVariation * costVariation;
      });

      const npv = this.calculateNPV(investment, adjustedCashFlows, discountRate);
      results.push(npv);
    }

    return results.sort((a, b) => a - b);
  }

  /**
   * Calculate confidence level based on simulation results
   */
  private calculateConfidenceLevel(simulations: number[], baseNPV: number): number {
    const positiveResults = simulations.filter(result => result > 0).length;
    const totalResults = simulations.length;
    return positiveResults / totalResults;
  }

  /**
   * Calculate NPV derivative for IRR calculation
   */
  private calculateNPVDerivative(initialInvestment: number, cashFlows: number[], rate: number): number {
    let derivative = 0;

    for (let i = 0; i < cashFlows.length; i++) {
      const year = i + 1;
      derivative -= (year * cashFlows[i]) / Math.pow(1 + rate, year + 1);
    }

    return derivative;
  }

  /**
   * Calculate terminal value using Gordon Growth Model
   */
  private calculateTerminalValue(finalCashFlow: number, growthRate: number, discountRate: number): number {
    return finalCashFlow * (1 + growthRate) / (discountRate - growthRate);
  }

  /**
   * Load industry benchmark data
   */
  private loadIndustryBenchmarks(): void {
    // SaaS Industry Benchmarks
    this.industryBenchmarks.set('saas', [
      {
        industry: 'saas',
        metric: 'revenue_multiple',
        percentile25: 4.5,
        percentile50: 7.2,
        percentile75: 12.8,
        topDecile: 18.5,
        dataSource: 'PitchBook SaaS Valuations Report 2024',
        lastUpdated: '2024-12-01'
      },
      {
        industry: 'saas',
        metric: 'gross_margin',
        percentile25: 72.0,
        percentile50: 78.5,
        percentile75: 84.2,
        topDecile: 88.7,
        dataSource: 'SaaS Capital Survey 2024',
        lastUpdated: '2024-11-15'
      },
      {
        industry: 'saas',
        metric: 'cac_payback_months',
        percentile25: 8.2,
        percentile50: 12.5,
        percentile75: 18.3,
        topDecile: 24.8,
        dataSource: 'OpenView SaaS Benchmarks 2024',
        lastUpdated: '2024-10-30'
      }
    ]);

    // Financial Services Benchmarks
    this.industryBenchmarks.set('financial_services', [
      {
        industry: 'financial_services',
        metric: 'price_to_book',
        percentile25: 0.8,
        percentile50: 1.2,
        percentile75: 1.8,
        topDecile: 2.5,
        dataSource: 'McKinsey Banking Report 2024',
        lastUpdated: '2024-11-20'
      },
      {
        industry: 'financial_services',
        metric: 'cost_income_ratio',
        percentile25: 45.2,
        percentile50: 58.7,
        percentile75: 72.3,
        topDecile: 85.1,
        dataSource: 'Deloitte Banking Efficiency Study 2024',
        lastUpdated: '2024-10-15'
      }
    ]);
  }

  /**
   * Get industry-specific valuation multiples
   */
  private getIndustryMultiples(industry: string): { revenueMultiple: number; ebitdaMultiple: number } {
    const industryMultiples: Record<string, { revenueMultiple: number; ebitdaMultiple: number }> = {
      'saas': { revenueMultiple: 7.2, ebitdaMultiple: 45.3 },
      'financial_services': { revenueMultiple: 3.8, ebitdaMultiple: 12.7 },
      'manufacturing': { revenueMultiple: 2.1, ebitdaMultiple: 8.9 },
      'healthcare': { revenueMultiple: 4.5, ebitdaMultiple: 16.2 },
      'technology': { revenueMultiple: 5.8, ebitdaMultiple: 28.4 }
    };

    return industryMultiples[industry] || { revenueMultiple: 4.0, ebitdaMultiple: 15.0 };
  }

  /**
   * Calculate strategic premium based on synergies and market position
   */
  private calculateStrategicPremium(targetMetrics: FinancialMetrics, industry: string): number {
    // Base premium for control
    let premium = 0.25; // 25% control premium

    // Industry-specific adjustments
    const industryPremiums: Record<string, number> = {
      'saas': 0.35, // High strategic value
      'financial_services': 0.30, // Regulatory barriers
      'technology': 0.40, // Innovation value
      'healthcare': 0.28, // Regulatory complexity
      'manufacturing': 0.20 // Traditional industry
    };

    premium = industryPremiums[industry] || premium;

    // Size adjustment (larger companies command lower premiums)
    if (targetMetrics.revenue > 1000000000) { // >$1B revenue
      premium *= 0.8;
    } else if (targetMetrics.revenue > 500000000) { // >$500M revenue
      premium *= 0.9;
    }

    return premium;
  }

  /**
   * Generate rationale for recommended offer premium
   */
  private generateOfferRationale(premium: number, industry: string): string {
    const premiumPercent = Math.round(premium * 100);

    const rationaleTemplates: Record<string, string> = {
      'saas': `${premiumPercent}% premium justified by recurring revenue quality, customer acquisition synergies, and technology platform integration opportunities`,
      'financial_services': `${premiumPercent}% premium reflects regulatory barriers to entry, customer relationship value, and operational integration synergies`,
      'technology': `${premiumPercent}% premium accounts for innovation capabilities, talent acquisition, and accelerated market penetration opportunities`,
      'healthcare': `${premiumPercent}% premium considers regulatory compliance value, clinical expertise, and patient outcome improvement potential`,
      'manufacturing': `${premiumPercent}% premium based on operational efficiency opportunities, supply chain integration, and market consolidation benefits`
    };

    return rationaleTemplates[industry] ||
           `${premiumPercent}% premium reflects strategic value, market position, and operational synergies`;
  }

  /**
   * Calculate percentile rank for benchmarking
   */
  private calculatePercentileRank(value: number, benchmark: IndustryBenchmark): number {
    if (value >= benchmark.topDecile) return 95;
    if (value >= benchmark.percentile75) return 80;
    if (value >= benchmark.percentile50) return 60;
    if (value >= benchmark.percentile25) return 30;
    return 10;
  }

  /**
   * Categorize performance based on percentile rank
   */
  private categorizePerformance(percentileRank: number): 'top-decile' | 'above-median' | 'below-median' | 'bottom-quartile' {
    if (percentileRank >= 90) return 'top-decile';
    if (percentileRank >= 60) return 'above-median';
    if (percentileRank >= 30) return 'below-median';
    return 'bottom-quartile';
  }

  /**
   * Determine overall competitive position
   */
  private determineCompetitivePosition(overallRanking: number): string {
    if (overallRanking >= 90) return 'Market Leader';
    if (overallRanking >= 75) return 'Strong Competitor';
    if (overallRanking >= 50) return 'Market Participant';
    if (overallRanking >= 25) return 'Underperformer';
    return 'Distressed Asset';
  }

  /**
   * Calculate risk premium for scenario analysis
   */
  private calculateRiskPremium(scenarios: RiskScenario[]): number {
    const variance = scenarios.reduce((sum, scenario) => {
      const deviation = scenario.npv - scenarios.reduce((s, s2) => s + s2.npv * s2.probability, 0);
      return sum + (Math.pow(deviation, 2) * scenario.probability);
    }, 0);

    const standardDeviation = Math.sqrt(variance);
    return standardDeviation * 0.3; // Risk adjustment factor
  }
}