/**
 * Core types for HeadElf Executive Intelligence and Extensibility Framework
 */

// Executive Intelligence Core Types
export enum CSSuiteRole {
  CTO = 'cto',
  CIO = 'cio',
  CISO = 'ciso',
  CFO = 'cfo',
  COO = 'coo'
}

export interface ExecutiveContext {
  organizationId: string;
  userId: string;
  sessionId: string;
  timestamp: Date;

  // Business context
  businessContext: BusinessContext;
  organizationalContext: OrganizationalContext;
  strategicContext: StrategicContext;

  // Operational context
  operationalScope: OperationalScope;
  authorityLevel: AuthorityLevel;
  stakeholders: Stakeholder[];

  // Technical context
  technologyStack: TechnologyStack;
  systemArchitecture: SystemArchitecture;
  securityProfile: SecurityProfile;

  // Financial context
  budgetaryAuthority: BudgetaryAuthority;
  financialConstraints: FinancialConstraint[];
  investmentContext: InvestmentContext;
}

export interface ExecutiveDecision {
  id: string;
  type: ExecutiveDecisionType;
  context: ExecutiveContext;
  timestamp: Date;
  initiatedBy: CSSuiteRole;

  // Decision content
  title: string;
  description: string;
  rationale: string;
  alternatives: Alternative[];
  selectedAlternative: string;

  // Analysis and recommendations
  analysis: ExecutiveAnalysis;
  recommendations: Recommendation[];
  riskAssessment: RiskAssessment;

  // Implementation details
  implementation: ImplementationPlan;
  timeline: Timeline;
  resourceRequirements: ResourceRequirement[];
  successMetrics: SuccessMetric[];

  // Approval and governance
  approvalRequired: boolean;
  approvers: string[];
  approvalStatus: ApprovalStatus;

  // Additional considerations
  stakeholderImpact: StakeholderImpact[];
  complianceConsiderations: ComplianceConsideration[];
  considerations?: string[];
}

export enum ExecutiveDecisionType {
  STRATEGIC = 'strategic',
  OPERATIONAL = 'operational',
  FINANCIAL = 'financial',
  TECHNICAL = 'technical',
  ORGANIZATIONAL = 'organizational',
  RISK_MANAGEMENT = 'risk_management',
  COMPLIANCE = 'compliance',
  INVESTMENT = 'investment',
  MERGER_ACQUISITION = 'merger_acquisition',
  CRISIS_MANAGEMENT = 'crisis_management'
}

// Business Context Types
export interface BusinessContext {
  industry: string;
  marketPosition: MarketPosition;
  competitiveEnvironment: CompetitiveEnvironment;
  businessModel: BusinessModel;
  lifecycle: BusinessLifecycle;
  geographicScope: GeographicScope;
}

export interface OrganizationalContext {
  size: OrganizationSize;
  structure: OrganizationalStructure;
  culture: OrganizationalCulture;
  maturity: OrganizationalMaturity;
  changeCapability: ChangeCapability;
}

export interface StrategicContext {
  vision: string;
  mission: string;
  strategicObjectives: StrategicObjective[];
  keyInitiatives: KeyInitiative[];
  priorities: Priority[];
  constraints: StrategyConstraint[];
}

export interface MarketPosition {
  marketShare: number;
  growthRate: number;
  competitiveAdvantage: string[];
  threats: string[];
  opportunities: string[];
}

export interface CompetitiveEnvironment {
  intensity: 'low' | 'moderate' | 'high' | 'extreme';
  keyCompetitors: Competitor[];
  competitivePressures: string[];
  differentiationFactors: string[];
}

export interface BusinessModel {
  type: BusinessModelType;
  revenueStreams: RevenueStream[];
  valuePropositions: ValueProposition[];
  customerSegments: CustomerSegment[];
  keyPartners: Partner[];
}

export enum BusinessModelType {
  B2B = 'b2b',
  B2C = 'b2c',
  B2B2C = 'b2b2c',
  PLATFORM = 'platform',
  MARKETPLACE = 'marketplace',
  SUBSCRIPTION = 'subscription',
  FREEMIUM = 'freemium',
  TRANSACTION = 'transaction',
  ADVERTISING = 'advertising',
  HYBRID = 'hybrid'
}

export enum BusinessLifecycle {
  STARTUP = 'startup',
  GROWTH = 'growth',
  MATURITY = 'maturity',
  DECLINE = 'decline',
  TRANSFORMATION = 'transformation'
}

// Operational Context Types
export interface OperationalScope {
  regions: string[];
  businessUnits: string[];
  functionalAreas: string[];
  systemsImpacted: string[];
  peopleImpacted: number;
  customersImpacted: number;
}

export enum AuthorityLevel {
  FULL_AUTONOMY = 'full_autonomy',
  AUTONOMOUS_WITH_NOTIFICATION = 'autonomous_with_notification',
  COLLABORATIVE = 'collaborative',
  ESCALATION_REQUIRED = 'escalation_required',
  BOARD_APPROVAL_REQUIRED = 'board_approval_required'
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  type: StakeholderType;
  influence: 'low' | 'medium' | 'high' | 'critical';
  interest: 'low' | 'medium' | 'high' | 'critical';
  expectedImpact: 'positive' | 'neutral' | 'negative' | 'mixed';
}

export enum StakeholderType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  CUSTOMER = 'customer',
  PARTNER = 'partner',
  INVESTOR = 'investor',
  REGULATOR = 'regulator',
  COMMUNITY = 'community'
}

// Technology Context Types
export interface TechnologyStack {
  platforms: Platform[];
  frameworks: Framework[];
  databases: Database[];
  cloudProviders: CloudProvider[];
  integrations: Integration[];
}

export interface SystemArchitecture {
  patterns: ArchitecturalPattern[];
  principles: ArchitecturalPrinciple[];
  constraints: ArchitecturalConstraint[];
  qualityAttributes: QualityAttribute[];
}

export interface SecurityProfile {
  framework: SecurityFramework;
  classification: DataClassification;
  threats: SecurityThreat[];
  controls: SecurityControl[];
  compliance: SecurityCompliance[];
}

// Financial Context Types
export interface BudgetaryAuthority {
  maxAmount: number;
  currency: string;
  period: 'annual' | 'quarterly' | 'monthly';
  categories: BudgetCategory[];
  approvalRequired: boolean;
}

export interface FinancialConstraint {
  type: 'budget' | 'cash_flow' | 'capital' | 'regulatory' | 'covenant';
  description: string;
  limit: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
}

export interface InvestmentContext {
  stage: InvestmentStage;
  appetite: RiskAppetite;
  horizon: InvestmentHorizon;
  criteria: InvestmentCriteria[];
  constraints: InvestmentConstraint[];
}

// Executive Analysis Types
export interface ExecutiveAnalysis {
  situationAnalysis: SituationAnalysis;
  optionsAnalysis: OptionsAnalysis;
  impactAnalysis: ImpactAnalysis;
  riskAnalysis: RiskAnalysis;
  financialAnalysis: FinancialAnalysis;
  strategicAnalysis: StrategicAnalysis;
}

export interface SituationAnalysis {
  currentState: string;
  problemStatement: string;
  rootCauses: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
  complexity: 'low' | 'medium' | 'high' | 'extreme';
}

export interface OptionsAnalysis {
  criteria: EvaluationCriteria[];
  alternatives: Alternative[];
  comparison: ComparisonMatrix;
  recommendation: string;
}

export interface ImpactAnalysis {
  businessImpact: BusinessImpact;
  financialImpact: FinancialImpact;
  operationalImpact: OperationalImpact;
  technicalImpact: TechnicalImpact;
  organizationalImpact: OrganizationalImpact;
  strategicImpact: StrategicImpact;
}

export interface RiskAnalysis {
  riskProfile: RiskProfile;
  keyRisks: Risk[];
  mitigationStrategies: MitigationStrategy[];
  contingencyPlans: ContingencyPlan[];
  monitoring: RiskMonitoring[];
}

// Implementation Types
export interface ImplementationPlan {
  approach: ImplementationApproach;
  phases: ImplementationPhase[];
  dependencies: Dependency[];
  criticalPath: CriticalPathItem[];
  governance: ImplementationGovernance;
}

export interface Timeline {
  startDate: Date;
  endDate: Date;
  milestones: Milestone[];
  criticalDates: CriticalDate[];
  buffers: TimeBuffer[];
}

export interface ResourceRequirement {
  type: ResourceType;
  description: string;
  quantity: number;
  cost: Cost;
  availability: ResourceAvailability;
  skills: Skill[];
}

export interface SuccessMetric {
  name: string;
  type: MetricType;
  target: number;
  baseline: number;
  measurement: MeasurementMethod;
  frequency: MeasurementFrequency;
  owner: string;
}

// Risk Management Types
export interface RiskAssessment {
  overallRiskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  riskFactors: RiskFactor[];
  mitigationMeasures: MitigationMeasure[];
  residualRisk: number;
  acceptanceLevel: number;
}

export interface Risk {
  id: string;
  category: RiskCategory;
  description: string;
  probability: number; // 0-1
  impact: number; // 0-1
  severity: RiskSeverity;
  owner: string;
  status: RiskStatus;
}

export enum RiskCategory {
  STRATEGIC = 'strategic',
  OPERATIONAL = 'operational',
  FINANCIAL = 'financial',
  COMPLIANCE = 'compliance',
  TECHNOLOGY = 'technology',
  REPUTATION = 'reputation',
  MARKET = 'market',
  LEGAL = 'legal',
  SECURITY = 'security',
  ENVIRONMENTAL = 'environmental'
}

export enum RiskSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum RiskStatus {
  IDENTIFIED = 'identified',
  ASSESSED = 'assessed',
  MITIGATED = 'mitigated',
  ACCEPTED = 'accepted',
  TRANSFERRED = 'transferred',
  AVOIDED = 'avoided'
}

// Recommendation Types
export interface Recommendation {
  id: string;
  type: RecommendationType;
  priority: Priority;
  description: string;
  rationale: string;
  benefits: string[];
  risks: string[];
  implementation: ImplementationGuidance;
  success: SuccessIndicator[];
}

export enum RecommendationType {
  STRATEGIC = 'strategic',
  TACTICAL = 'tactical',
  OPERATIONAL = 'operational',
  TECHNICAL = 'technical',
  FINANCIAL = 'financial',
  ORGANIZATIONAL = 'organizational',
  PROCESS = 'process',
  POLICY = 'policy'
}

export interface Priority {
  level: 'critical' | 'high' | 'medium' | 'low';
  reasoning: string;
  timeline: string;
  dependencies: string[];
}

// Supporting Types
export interface Alternative {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  cost: Cost;
  timeline: string;
  risks: string[];
  score: number;
}

export interface Cost {
  amount: number;
  currency: string;
  type: CostType;
  breakdown: CostBreakdown[];
  confidence: ConfidenceLevel;
}

export enum CostType {
  CAPEX = 'capex',
  OPEX = 'opex',
  MIXED = 'mixed',
  OPPORTUNITY = 'opportunity'
}

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  description: string;
}

export enum ConfidenceLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export enum ApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CONDITIONAL = 'conditional',
  WITHDRAWN = 'withdrawn'
}

// Compliance Types
export interface ComplianceConsideration {
  framework: string;
  requirement: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
  validation: string;
}

export interface StakeholderImpact {
  stakeholderId: string;
  impactType: 'positive' | 'negative' | 'neutral' | 'mixed';
  description: string;
  magnitude: 'low' | 'medium' | 'high' | 'critical';
  mitigation?: string;
}

// Enums and additional supporting types
export enum OrganizationSize {
  STARTUP = 'startup',        // <50 employees
  SMALL = 'small',           // 50-500 employees
  MEDIUM = 'medium',         // 500-5000 employees
  LARGE = 'large',           // 5000-50000 employees
  ENTERPRISE = 'enterprise'   // >50000 employees
}

export enum OrganizationalStructure {
  FLAT = 'flat',
  HIERARCHICAL = 'hierarchical',
  MATRIX = 'matrix',
  NETWORK = 'network',
  HYBRID = 'hybrid'
}

export interface OrganizationalCulture {
  decisionMakingStyle: 'consensus' | 'hierarchical' | 'collaborative' | 'autonomous';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  communicationStyle: 'formal' | 'informal' | 'mixed';
  innovationOrientation: 'low' | 'medium' | 'high';
  changeAdaptability: 'low' | 'medium' | 'high';
}

export enum OrganizationalMaturity {
  AD_HOC = 'ad_hoc',
  REPEATABLE = 'repeatable',
  DEFINED = 'defined',
  MANAGED = 'managed',
  OPTIMIZING = 'optimizing'
}

export enum ChangeCapability {
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  EXCEPTIONAL = 'exceptional'
}

export enum GeographicScope {
  LOCAL = 'local',
  REGIONAL = 'regional',
  NATIONAL = 'national',
  INTERNATIONAL = 'international',
  GLOBAL = 'global'
}

// Additional placeholder types that would be fully defined in separate files
export interface StrategicObjective {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  timeline: string;
  owner: string;
  metrics: SuccessMetric[];
}

export interface KeyInitiative {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  budget: number;
  timeline: Timeline;
  resources: ResourceRequirement[];
}

export interface StrategyConstraint {
  type: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
}

export interface Competitor {
  name: string;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  strategy: string;
}

export interface RevenueStream {
  name: string;
  type: string;
  percentage: number;
  growth: number;
}

export interface ValueProposition {
  segment: string;
  value: string;
  differentiation: string;
}

export interface CustomerSegment {
  name: string;
  size: number;
  characteristics: string[];
  needs: string[];
}

export interface Partner {
  name: string;
  type: string;
  relationship: string;
  value: string;
}

export interface Platform {
  name: string;
  version: string;
  type: string;
  criticality: 'low' | 'medium' | 'high' | 'critical';
}

export interface Framework {
  name: string;
  version: string;
  purpose: string;
  dependencies: string[];
}

export interface Database {
  name: string;
  type: string;
  purpose: string;
  size: string;
}

export interface CloudProvider {
  name: string;
  services: string[];
  regions: string[];
  cost: number;
}

export interface Integration {
  name: string;
  type: string;
  systems: string[];
  criticality: 'low' | 'medium' | 'high' | 'critical';
}

export interface ArchitecturalPattern {
  name: string;
  description: string;
  benefits: string[];
  constraints: string[];
}

export interface ArchitecturalPrinciple {
  name: string;
  statement: string;
  rationale: string;
  implications: string[];
}

export interface ArchitecturalConstraint {
  type: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
}

export interface QualityAttribute {
  name: string;
  description: string;
  target: number;
  current: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface SecurityFramework {
  name: string;
  version: string;
  controls: string[];
  compliance: string[];
}

export interface DataClassification {
  public: number;
  internal: number;
  confidential: number;
  restricted: number;
}

export interface SecurityThreat {
  name: string;
  type: string;
  likelihood: number;
  impact: number;
  mitigation: string;
}

export interface SecurityControl {
  name: string;
  type: string;
  effectiveness: number;
  cost: number;
}

export interface SecurityCompliance {
  framework: string;
  level: string;
  status: string;
  lastAudit: Date;
}

export interface BudgetCategory {
  name: string;
  allocation: number;
  spent: number;
  available: number;
}

export interface InvestmentStage {
  current: string;
  next: string;
  timeline: string;
}

export interface RiskAppetite {
  level: 'conservative' | 'moderate' | 'aggressive';
  description: string;
  constraints: string[];
}

export interface InvestmentHorizon {
  short: number;
  medium: number;
  long: number;
}

export interface InvestmentCriteria {
  name: string;
  weight: number;
  threshold: number;
  description: string;
}

export interface InvestmentConstraint {
  type: string;
  description: string;
  limit: number;
}

// Additional supporting types would continue here...
export interface EvaluationCriteria {}
export interface ComparisonMatrix {}
export interface BusinessImpact {}
export interface FinancialImpact {}
export interface OperationalImpact {}
export interface TechnicalImpact {}
export interface OrganizationalImpact {}
export interface StrategicImpact {}
export interface RiskProfile {}
export interface MitigationStrategy {}
export interface ContingencyPlan {}
export interface RiskMonitoring {}
export interface ImplementationApproach {}
export interface ImplementationPhase {}
export interface Dependency {}
export interface CriticalPathItem {}
export interface ImplementationGovernance {}
export interface Milestone {}
export interface CriticalDate {}
export interface TimeBuffer {}
export interface ResourceType {}
export interface ResourceAvailability {}
export interface Skill {}
export interface MetricType {}
export interface MeasurementMethod {}
export interface MeasurementFrequency {}
export interface RiskFactor {}
export interface MitigationMeasure {}
export interface ImplementationGuidance {}
export interface SuccessIndicator {}
export interface FinancialAnalysis {}
export interface StrategicAnalysis {}