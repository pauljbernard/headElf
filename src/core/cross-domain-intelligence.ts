/**
 * Cross-Domain Intelligence Framework
 *
 * Provides pattern recognition and behavioral prediction models that work
 * across different types of influential roles - political, financial, competitive, etc.
 */

import { UniversalPersonaConfig, DecisionScenario, DecisionAnalysis } from './universal-persona-engine';

export interface IntelligencePattern {
  id: string;
  name: string;
  description: string;
  domains: string[]; // Which domains this pattern applies to
  triggers: PatternTrigger[];
  indicators: PatternIndicator[];
  predictions: PatternPrediction[];
  confidence: number; // 0-1
}

export interface PatternTrigger {
  condition: string;
  threshold?: number;
  timeframe?: string;
  stakeholder?: string;
}

export interface PatternIndicator {
  signal: string;
  strength: 'weak' | 'moderate' | 'strong';
  timelag: number; // days
  reliability: number; // 0-1
}

export interface PatternPrediction {
  outcome: string;
  probability: number; // 0-1
  timeframe: string;
  dependencies: string[];
}

/**
 * Universal behavioral patterns that apply across all influential roles
 */
export const UNIVERSAL_PATTERNS: IntelligencePattern[] = [
  {
    id: 'crisis_defensive_response',
    name: 'Crisis Defensive Response',
    description: 'When under pressure, influential actors prioritize defensive measures over offensive strategies',
    domains: ['political', 'financial', 'competitive', 'corporate'],
    triggers: [
      { condition: 'negative_media_coverage', threshold: 5, timeframe: '7_days' },
      { condition: 'stakeholder_criticism', threshold: 3, timeframe: '3_days' },
      { condition: 'performance_decline', threshold: 0.15, timeframe: '30_days' }
    ],
    indicators: [
      { signal: 'communication_frequency_increase', strength: 'strong', timelag: 1, reliability: 0.85 },
      { signal: 'conservative_positioning', strength: 'strong', timelag: 2, reliability: 0.80 },
      { signal: 'stakeholder_outreach_increase', strength: 'moderate', timelag: 3, reliability: 0.75 }
    ],
    predictions: [
      { outcome: 'reduced_risk_taking', probability: 0.90, timeframe: '30_days', dependencies: ['crisis_severity'] },
      { outcome: 'increased_transparency', probability: 0.70, timeframe: '14_days', dependencies: ['stakeholder_pressure'] },
      { outcome: 'coalition_building', probability: 0.60, timeframe: '21_days', dependencies: ['support_availability'] }
    ],
    confidence: 0.82
  },
  {
    id: 'election_cycle_behavior',
    name: 'Performance Cycle Pressure',
    description: 'As evaluation periods approach, behavior becomes more conservative and stakeholder-focused',
    domains: ['political', 'corporate', 'financial'],
    triggers: [
      { condition: 'evaluation_period_approach', threshold: 90, timeframe: 'days_remaining' },
      { condition: 'performance_pressure', threshold: 0.20, timeframe: 'current_cycle' }
    ],
    indicators: [
      { signal: 'stakeholder_engagement_increase', strength: 'strong', timelag: 60, reliability: 0.88 },
      { signal: 'risk_aversion_increase', strength: 'moderate', timelag: 45, reliability: 0.75 },
      { signal: 'short_term_focus', strength: 'strong', timelag: 30, reliability: 0.85 }
    ],
    predictions: [
      { outcome: 'popular_position_adoption', probability: 0.75, timeframe: '60_days', dependencies: ['polling_data'] },
      { outcome: 'controversial_delay', probability: 0.80, timeframe: '45_days', dependencies: ['evaluation_proximity'] },
      { outcome: 'resource_allocation_shift', probability: 0.65, timeframe: '30_days', dependencies: ['performance_gaps'] }
    ],
    confidence: 0.78
  },
  {
    id: 'competitive_escalation',
    name: 'Competitive Response Escalation',
    description: 'Competitive pressures lead to increasingly aggressive responses until equilibrium',
    domains: ['competitive', 'financial', 'political'],
    triggers: [
      { condition: 'competitor_aggressive_move', threshold: 1, timeframe: '30_days' },
      { condition: 'market_share_loss', threshold: 0.05, timeframe: '90_days' }
    ],
    indicators: [
      { signal: 'resource_reallocation', strength: 'strong', timelag: 7, reliability: 0.85 },
      { signal: 'communication_tone_shift', strength: 'moderate', timelag: 3, reliability: 0.70 },
      { signal: 'alliance_formation', strength: 'moderate', timelag: 14, reliability: 0.65 }
    ],
    predictions: [
      { outcome: 'counter_aggressive_response', probability: 0.85, timeframe: '21_days', dependencies: ['resource_availability'] },
      { outcome: 'market_disruption', probability: 0.60, timeframe: '60_days', dependencies: ['escalation_spiral'] },
      { outcome: 'coalition_warfare', probability: 0.45, timeframe: '90_days', dependencies: ['ally_availability'] }
    ],
    confidence: 0.72
  }
];

/**
 * Domain-specific patterns for different role types
 */
export const POLITICAL_PATTERNS: IntelligencePattern[] = [
  {
    id: 'partisan_pressure_response',
    name: 'Partisan Pressure Response',
    description: 'Under party pressure, politicians prioritize party loyalty over independent positioning',
    domains: ['political'],
    triggers: [
      { condition: 'party_leadership_pressure', threshold: 1, timeframe: 'immediate' },
      { condition: 'primary_threat_increase', threshold: 0.10, timeframe: '6_months' }
    ],
    indicators: [
      { signal: 'voting_alignment_increase', strength: 'strong', timelag: 1, reliability: 0.92 },
      { signal: 'independent_statement_decrease', strength: 'moderate', timelag: 3, reliability: 0.80 },
      { signal: 'party_event_participation', strength: 'moderate', timelag: 7, reliability: 0.70 }
    ],
    predictions: [
      { outcome: 'party_line_voting', probability: 0.85, timeframe: '30_days', dependencies: ['pressure_intensity'] },
      { outcome: 'bipartisan_cooperation_decline', probability: 0.70, timeframe: '60_days', dependencies: ['political_climate'] }
    ],
    confidence: 0.88
  },
  {
    id: 'donor_influence_pattern',
    name: 'Donor Influence on Policy Positioning',
    description: 'Major donor preferences influence policy positions and voting patterns',
    domains: ['political'],
    triggers: [
      { condition: 'major_donor_position', threshold: 1, timeframe: 'immediate' },
      { condition: 'fundraising_pressure', threshold: 0.25, timeframe: 'quarterly' }
    ],
    indicators: [
      { signal: 'policy_position_shift', strength: 'moderate', timelag: 14, reliability: 0.75 },
      { signal: 'committee_focus_change', strength: 'weak', timelag: 30, reliability: 0.60 },
      { signal: 'amendment_priority_shift', strength: 'moderate', timelag: 21, reliability: 0.65 }
    ],
    predictions: [
      { outcome: 'donor_aligned_voting', probability: 0.70, timeframe: '90_days', dependencies: ['donation_size', 'political_cost'] },
      { outcome: 'industry_advocacy', probability: 0.55, timeframe: '60_days', dependencies: ['committee_position'] }
    ],
    confidence: 0.68
  }
];

export const FINANCIAL_PATTERNS: IntelligencePattern[] = [
  {
    id: 'risk_parity_rebalancing',
    name: 'Risk Parity Rebalancing Pattern',
    description: 'Fund managers rebalance portfolios based on risk parity principles during volatility',
    domains: ['financial'],
    triggers: [
      { condition: 'volatility_spike', threshold: 1.5, timeframe: '5_days' },
      { condition: 'correlation_increase', threshold: 0.15, timeframe: '10_days' }
    ],
    indicators: [
      { signal: 'position_size_adjustment', strength: 'strong', timelag: 2, reliability: 0.88 },
      { signal: 'sector_rotation', strength: 'moderate', timelag: 5, reliability: 0.75 },
      { signal: 'hedge_ratio_increase', strength: 'strong', timelag: 1, reliability: 0.90 }
    ],
    predictions: [
      { outcome: 'defensive_positioning', probability: 0.85, timeframe: '7_days', dependencies: ['volatility_persistence'] },
      { outcome: 'liquidity_preservation', probability: 0.75, timeframe: '14_days', dependencies: ['redemption_risk'] }
    ],
    confidence: 0.82
  },
  {
    id: 'performance_pressure_response',
    name: 'Performance Pressure Response',
    description: 'Under performance pressure, fund managers increase risk-taking to catch up',
    domains: ['financial'],
    triggers: [
      { condition: 'underperformance', threshold: -0.05, timeframe: 'quarter' },
      { condition: 'redemption_pressure', threshold: 0.10, timeframe: 'month' }
    ],
    indicators: [
      { signal: 'concentration_increase', strength: 'strong', timelag: 7, reliability: 0.80 },
      { signal: 'leverage_increase', strength: 'moderate', timelag: 14, reliability: 0.70 },
      { signal: 'high_conviction_positioning', strength: 'strong', timelag: 10, reliability: 0.75 }
    ],
    predictions: [
      { outcome: 'increased_risk_taking', probability: 0.80, timeframe: '30_days', dependencies: ['performance_gap'] },
      { outcome: 'strategy_drift', probability: 0.45, timeframe: '60_days', dependencies: ['pressure_intensity'] }
    ],
    confidence: 0.73
  }
];

export const COMPETITIVE_PATTERNS: IntelligencePattern[] = [
  {
    id: 'market_share_defense',
    name: 'Market Share Defense Pattern',
    description: 'When market share is threatened, companies prioritize defensive strategies',
    domains: ['competitive'],
    triggers: [
      { condition: 'market_share_decline', threshold: 0.02, timeframe: 'quarter' },
      { condition: 'new_competitor_entry', threshold: 1, timeframe: 'immediate' }
    ],
    indicators: [
      { signal: 'pricing_pressure_response', strength: 'strong', timelag: 14, reliability: 0.85 },
      { signal: 'customer_retention_focus', strength: 'strong', timelag: 7, reliability: 0.88 },
      { signal: 'competitive_intelligence_increase', strength: 'moderate', timelag: 21, reliability: 0.70 }
    ],
    predictions: [
      { outcome: 'defensive_pricing', probability: 0.80, timeframe: '30_days', dependencies: ['margin_pressure'] },
      { outcome: 'customer_lock_in_strategy', probability: 0.70, timeframe: '60_days', dependencies: ['switching_costs'] },
      { outcome: 'innovation_acceleration', probability: 0.60, timeframe: '90_days', dependencies: ['r_and_d_capacity'] }
    ],
    confidence: 0.76
  }
];

/**
 * Cross-Domain Intelligence Engine
 *
 * Analyzes patterns across different domains to predict behavior
 */
export class CrossDomainIntelligenceEngine {
  private patterns: Map<string, IntelligencePattern[]>;

  constructor() {
    this.patterns = new Map();
    this.patterns.set('universal', UNIVERSAL_PATTERNS);
    this.patterns.set('political', POLITICAL_PATTERNS);
    this.patterns.set('financial', FINANCIAL_PATTERNS);
    this.patterns.set('competitive', COMPETITIVE_PATTERNS);
  }

  /**
   * Analyze a scenario against all relevant patterns
   */
  analyzeScenario(
    scenario: DecisionScenario,
    personaConfig: UniversalPersonaConfig,
    historicalData: HistoricalDataPoint[]
  ): IntelligenceAnalysis {
    const relevantPatterns = this.getRelevantPatterns(personaConfig.roleType);
    const triggeredPatterns = this.identifyTriggeredPatterns(scenario, relevantPatterns, historicalData);
    const predictions = this.generatePredictions(triggeredPatterns, scenario);
    const confidence = this.calculateConfidence(triggeredPatterns);

    return {
      triggeredPatterns,
      predictions,
      confidence,
      recommendations: this.generateRecommendations(predictions, personaConfig)
    };
  }

  /**
   * Get patterns relevant to a specific role type
   */
  private getRelevantPatterns(roleType: string): IntelligencePattern[] {
    const universal = this.patterns.get('universal') || [];
    const specific = this.patterns.get(roleType) || [];
    return [...universal, ...specific];
  }

  /**
   * Identify which patterns are triggered by current scenario
   */
  private identifyTriggeredPatterns(
    scenario: DecisionScenario,
    patterns: IntelligencePattern[],
    historicalData: HistoricalDataPoint[]
  ): TriggeredPattern[] {
    const triggered: TriggeredPattern[] = [];

    patterns.forEach(pattern => {
      const triggerMatches = pattern.triggers.filter(trigger =>
        this.evaluateTrigger(trigger, scenario, historicalData)
      );

      if (triggerMatches.length > 0) {
        const indicatorStrength = this.calculateIndicatorStrength(pattern.indicators, historicalData);

        triggered.push({
          pattern,
          triggerMatches,
          indicatorStrength,
          activationProbability: this.calculateActivationProbability(pattern, triggerMatches, indicatorStrength)
        });
      }
    });

    return triggered.sort((a, b) => b.activationProbability - a.activationProbability);
  }

  /**
   * Evaluate if a trigger condition is met
   */
  private evaluateTrigger(
    trigger: PatternTrigger,
    scenario: DecisionScenario,
    historicalData: HistoricalDataPoint[]
  ): boolean {
    // Implementation would check historical data against trigger conditions
    // This is a simplified example
    return Math.random() > 0.7; // Placeholder logic
  }

  /**
   * Calculate indicator strength from historical data
   */
  private calculateIndicatorStrength(
    indicators: PatternIndicator[],
    historicalData: HistoricalDataPoint[]
  ): number {
    // Implementation would analyze historical data for indicator signals
    // This is a simplified example
    return indicators.reduce((sum, indicator) => sum + indicator.reliability, 0) / indicators.length;
  }

  /**
   * Calculate probability that a pattern will activate
   */
  private calculateActivationProbability(
    pattern: IntelligencePattern,
    triggerMatches: PatternTrigger[],
    indicatorStrength: number
  ): number {
    const triggerScore = triggerMatches.length / pattern.triggers.length;
    return (triggerScore * 0.6 + indicatorStrength * 0.4) * pattern.confidence;
  }

  /**
   * Generate behavioral predictions based on triggered patterns
   */
  private generatePredictions(
    triggeredPatterns: TriggeredPattern[],
    scenario: DecisionScenario
  ): BehavioralPrediction[] {
    const predictions: BehavioralPrediction[] = [];

    triggeredPatterns.forEach(triggered => {
      triggered.pattern.predictions.forEach(prediction => {
        predictions.push({
          ...prediction,
          patternSource: triggered.pattern.name,
          adjustedProbability: prediction.probability * triggered.activationProbability,
          confidence: triggered.activationProbability * triggered.pattern.confidence
        });
      });
    });

    return predictions.sort((a, b) => b.adjustedProbability - a.adjustedProbability);
  }

  /**
   * Calculate overall confidence in analysis
   */
  private calculateConfidence(triggeredPatterns: TriggeredPattern[]): number {
    if (triggeredPatterns.length === 0) return 0;

    const weightedConfidence = triggeredPatterns.reduce((sum, pattern) =>
      sum + (pattern.activationProbability * pattern.pattern.confidence), 0
    );

    return weightedConfidence / triggeredPatterns.length;
  }

  /**
   * Generate strategic recommendations based on predictions
   */
  private generateRecommendations(
    predictions: BehavioralPrediction[],
    personaConfig: UniversalPersonaConfig
  ): StrategicRecommendation[] {
    const recommendations: StrategicRecommendation[] = [];

    // Generate role-specific recommendations based on predicted behavior
    predictions.forEach(prediction => {
      if (prediction.adjustedProbability > 0.6) {
        recommendations.push({
          action: `Prepare for ${prediction.outcome}`,
          rationale: `High probability (${(prediction.adjustedProbability * 100).toFixed(1)}%) based on ${prediction.patternSource}`,
          timeline: prediction.timeframe,
          priority: this.calculatePriority(prediction),
          riskMitigation: this.generateRiskMitigation(prediction, personaConfig)
        });
      }
    });

    return recommendations;
  }

  private calculatePriority(prediction: BehavioralPrediction): 'low' | 'medium' | 'high' | 'critical' {
    if (prediction.adjustedProbability > 0.8) return 'critical';
    if (prediction.adjustedProbability > 0.7) return 'high';
    if (prediction.adjustedProbability > 0.6) return 'medium';
    return 'low';
  }

  private generateRiskMitigation(
    prediction: BehavioralPrediction,
    personaConfig: UniversalPersonaConfig
  ): string[] {
    // Generate role-specific risk mitigation strategies
    return [`Monitor ${prediction.outcome} indicators`, `Prepare contingency response`];
  }
}

// Type definitions for cross-domain intelligence
export interface HistoricalDataPoint {
  timestamp: Date;
  event: string;
  outcome: string;
  stakeholder: string;
  metrics: Record<string, number>;
}

export interface TriggeredPattern {
  pattern: IntelligencePattern;
  triggerMatches: PatternTrigger[];
  indicatorStrength: number;
  activationProbability: number;
}

export interface BehavioralPrediction extends PatternPrediction {
  patternSource: string;
  adjustedProbability: number;
  confidence: number;
}

export interface IntelligenceAnalysis {
  triggeredPatterns: TriggeredPattern[];
  predictions: BehavioralPrediction[];
  confidence: number;
  recommendations: StrategicRecommendation[];
}

export interface StrategicRecommendation {
  action: string;
  rationale: string;
  timeline: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  riskMitigation: string[];
}