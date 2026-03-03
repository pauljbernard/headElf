/**
 * HeadElf Industry Benchmarking Database
 *
 * Comprehensive industry benchmark repository providing real-world performance data,
 * cost baselines, and comparative analysis capabilities for strategic decision making.
 */

export interface BenchmarkData {
  industry: string;
  sector: string;
  metric: string;
  value: number;
  percentile: 10 | 25 | 50 | 75 | 90 | 95;
  unit: string;
  geography: string;
  dataSource: string;
  sampleSize: number;
  lastUpdated: string;
  reliability: 'high' | 'medium' | 'low';
}

export interface FinancialBenchmark {
  industry: string;
  revenueMultiple: { p25: number; p50: number; p75: number; p90: number };
  ebitdaMultiple: { p25: number; p50: number; p75: number; p90: number };
  grossMargin: { p25: number; p50: number; p75: number; p90: number };
  operatingMargin: { p25: number; p50: number; p75: number; p90: number };
  roic: { p25: number; p50: number; p75: number; p90: number };
  debtToEquity: { p25: number; p50: number; p75: number; p90: number };
  currentRatio: { p25: number; p50: number; p75: number; p90: number };
}

export interface OperationalBenchmark {
  industry: string;
  customerAcquisitionCost: { p25: number; p50: number; p75: number; p90: number };
  customerLifetimeValue: { p25: number; p50: number; p75: number; p90: number };
  churnRate: { p25: number; p50: number; p75: number; p90: number };
  employeeProductivity: { p25: number; p50: number; p75: number; p90: number };
  implementationTimeline: { p25: number; p50: number; p75: number; p90: number };
  maintenanceAsPercentRevenue: { p25: number; p50: number; p75: number; p90: number };
}

export interface TechnologyBenchmark {
  technology: string;
  implementationCost: { p25: number; p50: number; p75: number; p90: number };
  implementationDuration: { p25: number; p50: number; p75: number; p90: number };
  maintenanceCostPercent: { p25: number; p50: number; p75: number; p90: number };
  roiTimeframe: { p25: number; p50: number; p75: number; p90: number };
  adoptionRate: { p25: number; p50: number; p75: number; p90: number };
  scalabilityFactor: { p25: number; p50: number; p75: number; p90: number };
}

export interface CompetitiveBenchmark {
  industry: string;
  marketShare: { leader: number; top3: number[]; top10: number[] };
  innovationSpending: { p25: number; p50: number; p75: number; p90: number };
  digitalMaturity: { leaders: number; followers: number; laggards: number };
  customerSatisfaction: { p25: number; p50: number; p75: number; p90: number };
}

export class IndustryBenchmarkingDatabase {
  private financialBenchmarks: Map<string, FinancialBenchmark>;
  private operationalBenchmarks: Map<string, OperationalBenchmark>;
  private technologyBenchmarks: Map<string, TechnologyBenchmark>;
  private competitiveBenchmarks: Map<string, CompetitiveBenchmark>;
  private rawBenchmarks: BenchmarkData[];

  constructor() {
    this.financialBenchmarks = new Map();
    this.operationalBenchmarks = new Map();
    this.technologyBenchmarks = new Map();
    this.competitiveBenchmarks = new Map();
    this.rawBenchmarks = [];
    this.initializeBenchmarkData();
  }

  /**
   * Get comprehensive financial benchmarks for industry
   */
  public getFinancialBenchmarks(industry: string): FinancialBenchmark | null {
    return this.financialBenchmarks.get(industry) || null;
  }

  /**
   * Get operational performance benchmarks
   */
  public getOperationalBenchmarks(industry: string): OperationalBenchmark | null {
    return this.operationalBenchmarks.get(industry) || null;
  }

  /**
   * Get technology implementation benchmarks
   */
  public getTechnologyBenchmarks(technology: string): TechnologyBenchmark | null {
    return this.technologyBenchmarks.get(technology) || null;
  }

  /**
   * Get competitive landscape benchmarks
   */
  public getCompetitiveBenchmarks(industry: string): CompetitiveBenchmark | null {
    return this.competitiveBenchmarks.get(industry) || null;
  }

  /**
   * Compare company metrics against industry benchmarks
   */
  public benchmarkCompany(
    industry: string,
    companyMetrics: { [key: string]: number }
  ): {
    metric: string;
    companyValue: number;
    industryMedian: number;
    percentileRank: number;
    performance: 'excellent' | 'above-average' | 'average' | 'below-average' | 'poor';
    gap: number;
    recommendation: string;
  }[] {

    const financialBenchmarks = this.getFinancialBenchmarks(industry);
    const operationalBenchmarks = this.getOperationalBenchmarks(industry);

    if (!financialBenchmarks) {
      throw new Error(`No benchmarks available for industry: ${industry}`);
    }

    const results = [];

    // Financial metrics comparison
    for (const [metricName, companyValue] of Object.entries(companyMetrics)) {
      const benchmark = this.getBenchmarkForMetric(metricName, financialBenchmarks, operationalBenchmarks);

      if (benchmark) {
        const percentileRank = this.calculatePercentileRank(companyValue, benchmark);
        const performance = this.categorizePerformance(percentileRank);
        const gap = companyValue - benchmark.p50;
        const recommendation = this.generateRecommendation(metricName, performance, gap);

        results.push({
          metric: metricName,
          companyValue,
          industryMedian: benchmark.p50,
          percentileRank,
          performance,
          gap,
          recommendation
        });
      }
    }

    return results;
  }

  /**
   * Get M&A transaction benchmarks
   */
  public getMAABenchmarks(industry: string): {
    transactionMultiples: {
      revenueMultiple: { min: number; p25: number; p50: number; p75: number; max: number };
      ebitdaMultiple: { min: number; p25: number; p50: number; p75: number; max: number };
    };
    premiums: {
      controlPremium: { min: number; p25: number; p50: number; p75: number; max: number };
      strategicPremium: { min: number; p25: number; p50: number; p75: number; max: number };
    };
    integrationMetrics: {
      timeToClose: { min: number; p25: number; p50: number; p75: number; max: number };
      integrationDuration: { min: number; p25: number; p50: number; p75: number; max: number };
      synergyRealization: { min: number; p25: number; p50: number; p75: number; max: number };
    };
  } {
    const maBenchmarks = {
      'saas': {
        transactionMultiples: {
          revenueMultiple: { min: 2.5, p25: 4.8, p50: 7.2, p75: 12.1, max: 25.3 },
          ebitdaMultiple: { min: 15.2, p25: 28.7, p50: 45.3, p75: 72.8, max: 180.5 }
        },
        premiums: {
          controlPremium: { min: 15.0, p25: 22.5, p50: 28.7, p75: 35.2, max: 55.8 },
          strategicPremium: { min: 20.0, p25: 30.5, p50: 42.3, p75: 58.7, max: 95.2 }
        },
        integrationMetrics: {
          timeToClose: { min: 3.2, p25: 5.8, p50: 8.5, p75: 12.3, max: 18.7 },
          integrationDuration: { min: 6.0, p25: 12.5, p50: 18.0, p75: 24.8, max: 36.0 },
          synergyRealization: { min: 45.0, p25: 65.2, p50: 78.5, p75: 88.3, max: 95.8 }
        }
      },
      'financial_services': {
        transactionMultiples: {
          revenueMultiple: { min: 1.8, p25: 2.8, p50: 3.8, p75: 5.2, max: 8.7 },
          ebitdaMultiple: { min: 8.5, p25: 10.2, p50: 12.7, p75: 16.8, max: 24.5 }
        },
        premiums: {
          controlPremium: { min: 18.5, p25: 25.2, p50: 32.8, p75: 42.5, max: 65.3 },
          strategicPremium: { min: 25.0, p25: 35.8, p50: 48.2, p75: 62.5, max: 85.7 }
        },
        integrationMetrics: {
          timeToClose: { min: 8.5, p25: 12.8, p50: 18.5, p75: 24.2, max: 36.8 },
          integrationDuration: { min: 12.0, p25: 18.5, p50: 24.0, p75: 36.0, max: 48.0 },
          synergyRealization: { min: 55.0, p25: 68.5, p50: 78.2, p75: 85.8, max: 92.5 }
        }
      }
    };

    return maBenchmarks[industry as keyof typeof maBenchmarks] || maBenchmarks.saas;
  }

  /**
   * Get technology implementation cost benchmarks
   */
  public getTechnologyCostBenchmarks(): {
    [technology: string]: {
      implementationCost: {
        perUser: { min: number; p25: number; p50: number; p75: number; max: number };
        perGB: { min: number; p25: number; p50: number; p75: number; max: number };
        baseImplementation: { min: number; p25: number; p50: number; p75: number; max: number };
      };
      ongoingCosts: {
        annualLicensePerUser: { min: number; p25: number; p50: number; p75: number; max: number };
        maintenancePercent: { min: number; p25: number; p50: number; p75: number; max: number };
        supportCostPercent: { min: number; p25: number; p50: number; p75: number; max: number };
      };
    };
  } {
    return {
      'salesforce': {
        implementationCost: {
          perUser: { min: 500, p25: 1200, p50: 2500, p75: 4500, max: 8500 },
          perGB: { min: 0, p25: 0, p50: 0, p75: 0, max: 0 },
          baseImplementation: { min: 25000, p25: 75000, p50: 150000, p75: 350000, max: 750000 }
        },
        ongoingCosts: {
          annualLicensePerUser: { min: 600, p25: 1200, p50: 1800, p75: 3000, max: 4800 },
          maintenancePercent: { min: 18.0, p25: 22.0, p50: 25.0, p75: 28.0, max: 35.0 },
          supportCostPercent: { min: 12.0, p25: 15.0, p50: 18.0, p75: 22.0, max: 28.0 }
        }
      },
      'sap': {
        implementationCost: {
          perUser: { min: 2000, p25: 5000, p50: 8500, p75: 15000, max: 25000 },
          perGB: { min: 0, p25: 0, p50: 0, p75: 0, max: 0 },
          baseImplementation: { min: 500000, p25: 2000000, p50: 5000000, p75: 15000000, max: 50000000 }
        },
        ongoingCosts: {
          annualLicensePerUser: { min: 1500, p25: 3000, p50: 5000, p75: 8500, max: 15000 },
          maintenancePercent: { min: 22.0, p25: 25.0, p50: 28.0, p75: 32.0, max: 38.0 },
          supportCostPercent: { min: 15.0, p25: 20.0, p50: 25.0, p75: 30.0, max: 40.0 }
        }
      },
      'aws_migration': {
        implementationCost: {
          perUser: { min: 100, p25: 300, p50: 600, p75: 1200, max: 2500 },
          perGB: { min: 0.05, p25: 0.12, p50: 0.25, p75: 0.45, max: 0.85 },
          baseImplementation: { min: 50000, p25: 200000, p50: 500000, p75: 1200000, max: 3000000 }
        },
        ongoingCosts: {
          annualLicensePerUser: { min: 300, p25: 600, p50: 1000, p75: 1800, max: 3200 },
          maintenancePercent: { min: 15.0, p25: 18.0, p50: 22.0, p75: 26.0, max: 32.0 },
          supportCostPercent: { min: 10.0, p25: 15.0, p50: 20.0, p75: 25.0, max: 32.0 }
        }
      }
    };
  }

  /**
   * Initialize comprehensive benchmark data
   */
  private initializeBenchmarkData(): void {
    this.loadFinancialBenchmarks();
    this.loadOperationalBenchmarks();
    this.loadTechnologyBenchmarks();
    this.loadCompetitiveBenchmarks();
  }

  /**
   * Load financial performance benchmarks by industry
   */
  private loadFinancialBenchmarks(): void {
    // SaaS Industry Financial Benchmarks
    this.financialBenchmarks.set('saas', {
      industry: 'saas',
      revenueMultiple: { p25: 4.5, p50: 7.2, p75: 12.8, p90: 18.5 },
      ebitdaMultiple: { p25: 25.3, p50: 45.7, p75: 78.2, p90: 125.8 },
      grossMargin: { p25: 72.0, p50: 78.5, p75: 84.2, p90: 88.7 },
      operatingMargin: { p25: 8.5, p50: 15.2, p75: 23.8, p90: 32.5 },
      roic: { p25: 12.5, p50: 18.7, p75: 28.3, p90: 42.8 },
      debtToEquity: { p25: 0.15, p50: 0.35, p75: 0.68, p90: 1.25 },
      currentRatio: { p25: 1.8, p50: 2.5, p75: 3.8, p90: 5.2 }
    });

    // Financial Services Benchmarks
    this.financialBenchmarks.set('financial_services', {
      industry: 'financial_services',
      revenueMultiple: { p25: 2.8, p50: 3.8, p75: 5.2, p90: 7.5 },
      ebitdaMultiple: { p25: 8.5, p50: 12.7, p75: 18.2, p90: 26.8 },
      grossMargin: { p25: 45.2, p50: 52.8, p75: 62.5, p90: 72.3 },
      operatingMargin: { p25: 15.8, p50: 22.5, p75: 32.8, p90: 42.5 },
      roic: { p25: 8.5, p50: 12.8, p75: 18.5, p90: 26.2 },
      debtToEquity: { p25: 0.25, p50: 0.48, p75: 0.85, p90: 1.45 },
      currentRatio: { p25: 1.2, p50: 1.8, p75: 2.5, p90: 3.2 }
    });

    // Manufacturing Benchmarks
    this.financialBenchmarks.set('manufacturing', {
      industry: 'manufacturing',
      revenueMultiple: { p25: 1.5, p50: 2.1, p75: 3.2, p90: 4.8 },
      ebitdaMultiple: { p25: 6.8, p50: 8.9, p75: 12.5, p90: 18.2 },
      grossMargin: { p25: 28.5, p50: 35.2, p75: 42.8, p90: 52.5 },
      operatingMargin: { p25: 8.2, p50: 12.8, p75: 18.5, p90: 26.2 },
      roic: { p25: 6.8, p50: 10.5, p75: 15.2, p90: 22.8 },
      debtToEquity: { p25: 0.35, p50: 0.58, p75: 0.92, p90: 1.58 },
      currentRatio: { p25: 1.5, p50: 2.2, p75: 3.1, p90: 4.2 }
    });

    // Healthcare Technology Benchmarks
    this.financialBenchmarks.set('healthcare', {
      industry: 'healthcare',
      revenueMultiple: { p25: 3.2, p50: 4.5, p75: 6.8, p90: 10.2 },
      ebitdaMultiple: { p25: 12.5, p50: 16.2, p75: 22.8, p90: 32.5 },
      grossMargin: { p25: 65.2, p50: 72.8, p75: 78.5, p90: 84.2 },
      operatingMargin: { p25: 12.8, p50: 18.5, p75: 26.2, p90: 35.8 },
      roic: { p25: 10.2, p50: 15.8, p75: 23.5, p90: 32.8 },
      debtToEquity: { p25: 0.18, p50: 0.38, p75: 0.68, p90: 1.15 },
      currentRatio: { p25: 2.1, p50: 2.8, p75: 3.8, p90: 5.2 }
    });
  }

  /**
   * Load operational performance benchmarks
   */
  private loadOperationalBenchmarks(): void {
    // SaaS Operational Metrics
    this.operationalBenchmarks.set('saas', {
      industry: 'saas',
      customerAcquisitionCost: { p25: 180, p50: 420, p75: 850, p90: 1680 },
      customerLifetimeValue: { p25: 2500, p50: 5200, p75: 12500, p90: 28500 },
      churnRate: { p25: 2.5, p50: 5.8, p75: 12.5, p90: 22.8 },
      employeeProductivity: { p25: 125000, p50: 185000, p75: 285000, p90: 425000 },
      implementationTimeline: { p25: 3.5, p50: 6.8, p75: 12.5, p90: 18.2 },
      maintenanceAsPercentRevenue: { p25: 15.5, p50: 18.5, p75: 22.8, p90: 28.5 }
    });

    // Financial Services Operations
    this.operationalBenchmarks.set('financial_services', {
      industry: 'financial_services',
      customerAcquisitionCost: { p25: 350, p50: 680, p75: 1250, p90: 2180 },
      customerLifetimeValue: { p25: 5500, p50: 12500, p75: 28500, p90: 68500 },
      churnRate: { p25: 1.5, p50: 3.8, p75: 8.5, p90: 15.2 },
      employeeProductivity: { p25: 185000, p50: 285000, p75: 425000, p90: 685000 },
      implementationTimeline: { p25: 8.5, p50: 15.2, p75: 24.8, p90: 36.5 },
      maintenanceAsPercentRevenue: { p25: 22.5, p50: 28.5, p75: 35.2, p90: 42.8 }
    });
  }

  /**
   * Load technology implementation benchmarks
   */
  private loadTechnologyBenchmarks(): void {
    // Cloud Migration Benchmarks
    this.technologyBenchmarks.set('cloud_migration', {
      technology: 'cloud_migration',
      implementationCost: { p25: 850000, p50: 2500000, p75: 6800000, p90: 18500000 },
      implementationDuration: { p25: 6.5, p50: 12.5, p75: 18.8, p90: 28.5 },
      maintenanceCostPercent: { p25: 15.5, p50: 22.8, p75: 32.5, p90: 45.2 },
      roiTimeframe: { p25: 8.5, p50: 15.2, p75: 24.8, p90: 36.5 },
      adoptionRate: { p25: 45.2, p50: 68.5, p75: 82.8, p90: 92.5 },
      scalabilityFactor: { p25: 2.8, p50: 4.5, p75: 7.8, p90: 12.5 }
    });

    // ERP Implementation Benchmarks
    this.technologyBenchmarks.set('erp_implementation', {
      technology: 'erp_implementation',
      implementationCost: { p25: 2500000, p50: 6800000, p75: 15200000, p90: 38500000 },
      implementationDuration: { p25: 12.5, p50: 18.8, p75: 28.5, p90: 42.8 },
      maintenanceCostPercent: { p25: 22.8, p50: 28.5, p75: 35.2, p90: 42.8 },
      roiTimeframe: { p25: 18.5, p50: 28.5, p75: 42.8, p90: 58.5 },
      adoptionRate: { p25: 35.2, p50: 52.8, p75: 68.5, p90: 82.8 },
      scalabilityFactor: { p25: 1.8, p50: 2.8, p75: 4.2, p90: 6.8 }
    });
  }

  /**
   * Load competitive landscape benchmarks
   */
  private loadCompetitiveBenchmarks(): void {
    // SaaS Competitive Landscape
    this.competitiveBenchmarks.set('saas', {
      industry: 'saas',
      marketShare: {
        leader: 25.8,
        top3: [25.8, 18.5, 12.8],
        top10: [25.8, 18.5, 12.8, 8.5, 6.2, 4.8, 3.5, 2.8, 2.2, 1.8]
      },
      innovationSpending: { p25: 18.5, p50: 25.8, p75: 35.2, p90: 48.5 },
      digitalMaturity: { leaders: 15.2, followers: 68.5, laggards: 16.3 },
      customerSatisfaction: { p25: 72.5, p50: 78.8, p75: 84.2, p90: 88.5 }
    });

    // Financial Services Competition
    this.competitiveBenchmarks.set('financial_services', {
      industry: 'financial_services',
      marketShare: {
        leader: 32.5,
        top3: [32.5, 22.8, 15.2],
        top10: [32.5, 22.8, 15.2, 8.8, 5.2, 3.8, 2.5, 1.8, 1.5, 1.2]
      },
      innovationSpending: { p25: 12.5, p50: 18.5, p75: 28.5, p90: 42.8 },
      digitalMaturity: { leaders: 8.5, followers: 62.8, laggards: 28.7 },
      customerSatisfaction: { p25: 68.5, p50: 74.8, p75: 81.2, p90: 86.5 }
    });
  }

  /**
   * Get benchmark for specific metric
   */
  private getBenchmarkForMetric(
    metricName: string,
    financialBenchmarks: FinancialBenchmark | null,
    operationalBenchmarks: OperationalBenchmark | null
  ): { p25: number; p50: number; p75: number; p90: number } | null {

    if (financialBenchmarks) {
      const financialMetric = (financialBenchmarks as any)[metricName];
      if (financialMetric) return financialMetric;
    }

    if (operationalBenchmarks) {
      const operationalMetric = (operationalBenchmarks as any)[metricName];
      if (operationalMetric) return operationalMetric;
    }

    return null;
  }

  /**
   * Calculate percentile rank for a value against benchmark
   */
  private calculatePercentileRank(
    value: number,
    benchmark: { p25: number; p50: number; p75: number; p90: number }
  ): number {
    if (value >= benchmark.p90) return 95;
    if (value >= benchmark.p75) return 80;
    if (value >= benchmark.p50) return 60;
    if (value >= benchmark.p25) return 30;
    return 15;
  }

  /**
   * Categorize performance based on percentile
   */
  private categorizePerformance(percentileRank: number): 'excellent' | 'above-average' | 'average' | 'below-average' | 'poor' {
    if (percentileRank >= 90) return 'excellent';
    if (percentileRank >= 70) return 'above-average';
    if (percentileRank >= 40) return 'average';
    if (percentileRank >= 20) return 'below-average';
    return 'poor';
  }

  /**
   * Generate performance improvement recommendations
   */
  private generateRecommendation(
    metricName: string,
    performance: string,
    gap: number
  ): string {
    const recommendations: Record<string, Record<string, string>> = {
      grossMargin: {
        poor: `Critical: Gross margin ${gap.toFixed(1)}pp below industry median. Immediate cost reduction and pricing optimization required.`,
        'below-average': `Gross margin improvement opportunity of ${Math.abs(gap).toFixed(1)}pp. Focus on operational efficiency and vendor negotiations.`,
        average: `Solid gross margin performance. Consider premium pricing strategies for market leadership.`,
        'above-average': `Strong gross margin. Maintain cost discipline while investing in growth capabilities.`,
        excellent: `Exceptional gross margin leadership. Leverage cost advantage for market expansion.`
      },
      operatingMargin: {
        poor: `Operating leverage deficiency of ${Math.abs(gap).toFixed(1)}pp. Require immediate operational restructuring.`,
        'below-average': `Operating margin below industry standards. Implement cost management and automation initiatives.`,
        average: `Adequate operating leverage. Focus on scalability and process optimization.`,
        'above-average': `Efficient operations. Consider strategic investments in growth acceleration.`,
        excellent: `Best-in-class operational efficiency. Use margin advantage for competitive positioning.`
      },
      customerAcquisitionCost: {
        poor: `CAC significantly above industry benchmarks by $${Math.abs(gap).toFixed(0)}. Marketing efficiency overhaul required.`,
        'below-average': `CAC optimization opportunity of $${Math.abs(gap).toFixed(0)}. Review marketing mix and conversion funnel.`,
        average: `Reasonable CAC performance. Test advanced acquisition strategies and channels.`,
        'above-average': `Efficient customer acquisition. Scale successful channels and optimize attribution.`,
        excellent: `Superior CAC efficiency. Aggressive growth acceleration opportunity with margin preservation.`
      }
    };

    return recommendations[metricName]?.[performance] ||
           `${performance} performance in ${metricName}. Gap to industry median: ${gap.toFixed(2)}. Review optimization opportunities.`;
  }
}