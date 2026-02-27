# Executive Decision Tree Library

## Crisis Response Decision Trees

### Technology Crisis Response
```
Crisis Detected
├── Scope Assessment (0-2 hours)
│   ├── Revenue Impact > $1M/hour
│   │   ├── Customer-facing systems affected
│   │   │   ├── Immediate: Activate incident commander, notify CEO, engage PR
│   │   │   ├── 2-4 hours: Customer communication, regulatory notification if required
│   │   │   └── 4-24 hours: Root cause analysis, recovery timeline, board briefing
│   │   └── Internal systems only
│   │       ├── Immediate: Assess workaround options, notify key stakeholders
│   │       ├── 2-6 hours: Implement temporary solutions, communicate impact
│   │       └── 6-24 hours: Permanent fix timeline, process improvement planning
│   └── Revenue Impact < $1M/hour
│       ├── Security breach suspected
│       │   ├── Immediate: Isolate affected systems, preserve forensics, legal counsel
│       │   ├── 2-8 hours: Impact assessment, regulatory notification requirements
│       │   └── 8-48 hours: Investigation, remediation, communication planning
│       └── Performance/availability issue
│           ├── Immediate: Performance monitoring, capacity assessment
│           ├── 1-4 hours: Scaling/optimization, stakeholder notification
│           └── 4-12 hours: Resolution, post-mortem planning, prevention measures
```

### Financial Crisis Response
```
Financial Distress Signal
├── Liquidity Assessment (0-4 hours)
│   ├── Cash runway < 90 days
│   │   ├── Covenant breach imminent
│   │   │   ├── Immediate: Legal counsel, lender relationship activation, board notification
│   │   │   ├── 24-48 hours: Waiver negotiations, emergency funding sources, operational cuts
│   │   │   └── 48-72 hours: Restructuring options, stakeholder communication, contingency planning
│   │   └── No covenant issues
│   │       ├── Immediate: Revenue acceleration, payables extension, receivables collection
│   │       ├── 1-7 days: Emergency financing options, cost reduction implementation
│   │       └── 7-30 days: Strategic alternatives, investor relations, operational restructuring
│   └── Cash runway > 90 days
│       ├── Market conditions deteriorating
│       │   ├── Immediate: Scenario planning, cost structure assessment, investor communication
│       │   ├── 1-14 days: Strategic plan adjustment, guidance revision, stakeholder alignment
│       │   └── 14-90 days: Business model adaptation, market positioning, competitive response
│       └── Internal performance issues
│           ├── Immediate: Performance analysis, management assessment, corrective action planning
│           ├── 1-30 days: Operational improvements, team alignment, metric tracking
│           └── 30-90 days: Strategic repositioning, capability building, performance monitoring
```

### Security Incident Response
```
Security Incident Detected
├── Threat Classification (0-1 hour)
│   ├── Advanced Persistent Threat (APT) / Nation-State
│   │   ├── Evidence of data exfiltration
│   │   │   ├── Immediate: FBI notification, external IR firm, legal privilege establishment
│   │   │   ├── 1-8 hours: Forensic preservation, scope assessment, containment without alerting attacker
│   │   │   └── 8-72 hours: Regulatory notifications, customer communication, investigation coordination
│   │   └── System access only
│   │       ├── Immediate: Isolate affected systems, preserve forensics, assess lateral movement
│   │       ├── 1-24 hours: Full scope assessment, containment validation, eradication planning
│   │       └── 24-72 hours: System restoration, hardening, monitoring enhancement
│   ├── Ransomware
│   │   ├── Critical systems encrypted
│   │   │   ├── Immediate: Incident commander activation, system isolation, backup assessment
│   │   │   ├── 1-4 hours: Recovery vs. payment analysis, legal counsel, law enforcement notification
│   │   │   └── 4-24 hours: Recovery execution, business continuity activation, stakeholder communication
│   │   └── Non-critical systems affected
│   │       ├── Immediate: Containment, backup validation, affected system inventory
│   │       ├── 1-8 hours: Recovery prioritization, business impact assessment
│   │       └── 8-24 hours: Systematic recovery, security hardening, lessons learned
│   └── External attack (DDoS, breach attempt)
│       ├── Service degradation/outage
│       │   ├── Immediate: Traffic filtering, capacity scaling, attack pattern analysis
│       │   ├── 1-4 hours: Mitigation effectiveness, upstream provider coordination
│       │   └── 4-12 hours: Service restoration, monitoring enhancement, pattern documentation
│       └── Attempted breach blocked
│           ├── Immediate: Alert validation, attack pattern analysis, system hardening
│           ├── 1-6 hours: Vulnerability assessment, threat intelligence correlation
│           └── 6-24 hours: Preventive measures, monitoring tuning, threat hunting
```

## Strategic Investment Decision Trees

### Technology Investment Decision
```
Technology Investment Proposal
├── Strategic Alignment Assessment
│   ├── Core business capability
│   │   ├── Competitive advantage potential
│   │   │   ├── Build: High control, 18+ month timeline, $5M+ investment
│   │   │   ├── Buy: Fast deployment, 6-12 months, $1-10M + integration
│   │   │   └── Partner: Shared risk, 3-6 months, revenue sharing model
│   │   └── Table stakes capability
│   │       ├── Buy commercial solution: Proven technology, standard implementation
│   │       ├── Open source + services: Cost effective, customization possible
│   │       └── SaaS solution: Fastest deployment, ongoing operational cost
│   ├── Supporting capability
│   │   ├── High integration requirements
│   │   │   ├── Build integration layer: Control, complexity, longer timeline
│   │   │   ├── Acquire specialist vendor: Capability + team, higher cost
│   │   │   └── Partner with system integrator: External expertise, shared risk
│   │   └── Standard integration
│   │       ├── Commercial off-the-shelf: Standard APIs, proven integration
│   │       ├── Cloud-native solution: Modern architecture, scalability
│   │       └── Hybrid approach: Phased implementation, risk mitigation
│   └── Experimental/innovation
│       ├── High potential impact
│       │   ├── Internal R&D: Full IP control, long timeline, high risk
│       │   ├── Startup partnership: Shared development, equity participation
│       │   └── Acquisition pipeline: Build capability through M&A
│       └── Learning/exploration
│           ├── Proof of concept: Small budget, fast cycle, learning focus
│           ├── Pilot program: Real environment, limited scope, measurable outcomes
│           └── Innovation lab: Dedicated team, experimentation budget, portfolio approach
```

### M&A Evaluation Decision Tree
```
M&A Target Evaluation
├── Strategic Fit Assessment
│   ├── Core business synergy
│   │   ├── Technology integration feasible
│   │   │   ├── Team retention likely (>80%)
│   │   │   │   ├── Premium justified: Strategic value, competitive positioning
│   │   │   │   └── Standard multiple: Financial returns, integration efficiency
│   │   │   └── Team retention uncertain (<80%)
│   │   │       ├── Knowledge transfer plan: Documentation, training, redundancy
│   │   │       └── Technology extraction: IP acquisition, system integration only
│   │   └── Technology integration complex
│   │       ├── Standalone operation: Separate P&L, limited integration, portfolio approach
│   │       ├── Selective integration: Key technologies only, gradual approach
│   │       └── Pass: Integration risk exceeds strategic value
│   ├── Adjacent market opportunity
│   │   ├── Market timing favorable
│   │   │   ├── Strong team + good tech: Full integration, market acceleration
│   │   │   ├── Strong team + weak tech: Team-focused acquisition, technology upgrade
│   │   │   └── Good tech + weak team: Technology acquisition, team replacement
│   │   └── Market timing uncertain
│   │       ├── Defensive acquisition: Prevent competitor access, option value
│   │       ├── Portfolio hold: Separate operation, market timing optimization
│   │       └── Pass: Market risk + integration risk too high
│   └── Financial/defensive
│       ├── Distressed pricing
│       │   ├── Asset value exceeds price: Asset strip, core business focus
│       │   ├── Customer base valuable: Integration for cross-selling, efficiency
│       │   └── IP portfolio valuable: Patent acquisition, licensing opportunities
│       └── Competitive blocking
│           ├── Key competitor target: Defensive acquisition, integration secondary
│           ├── Strategic customer: Relationship protection, revenue security
│           └── Critical supplier: Supply chain security, cost optimization
```

## Operational Crisis Decision Trees

### Supply Chain Disruption
```
Supply Chain Disruption Event
├── Impact Severity Assessment (0-4 hours)
│   ├── Critical component affected
│   │   ├── Single source supplier
│   │   │   ├── <30 days inventory: Emergency sourcing, customer notification, production adjustment
│   │   │   ├── 30-90 days inventory: Alternative sourcing, qualification acceleration, customer planning
│   │   │   └── >90 days inventory: Systematic alternative development, risk mitigation, cost optimization
│   │   └── Multiple suppliers available
│   │       ├── Capacity sufficient: Supplier reallocation, logistics optimization, cost management
│   │       ├── Capacity insufficient: Emergency qualification, temporary alternatives, customer prioritization
│   │       └── Quality concerns: Enhanced inspection, customer communication, risk assessment
│   ├── Non-critical component affected
│   │   ├── Customer impact likely
│   │   │   ├── Feature elimination: Product simplification, customer communication, pricing adjustment
│   │   │   ├── Substitute component: Re-engineering, testing acceleration, regulatory approval
│   │   │   └── Supplier diversification: Dual sourcing implementation, contract renegotiation
│   │   └── No customer impact
│   │       ├── Cost optimization opportunity: Supplier consolidation, negotiation leverage, efficiency
│   │       ├── Inventory adjustment: Safety stock optimization, carrying cost management
│   │       └── Process improvement: Supplier development, quality enhancement, relationship building
│   └── Service/support affected
│       ├── Customer-facing impact
│       │   ├── Immediate: Alternative service providers, internal capability surge, customer communication
│       │   ├── Short-term: Service level adjustment, pricing negotiation, capacity building
│       │   └── Long-term: Service strategy revision, make vs. buy analysis, capability investment
│       └── Internal operations impact
│           ├── Immediate: Workaround implementation, resource reallocation, priority adjustment
│           ├── Short-term: Alternative solutions, vendor negotiation, process optimization
│           └── Long-term: Operational redesign, technology investment, capability development
```

## Resource Allocation Decision Framework

### Budget Allocation Under Constraints
```
Budget Constraint Scenario
├── Constraint Severity
│   ├── >30% budget reduction required
│   │   ├── Mission-critical only: Revenue protection, customer retention, regulatory compliance
│   │   ├── Strategic pivot: Core capability focus, non-essential elimination, efficiency maximization
│   │   └── Survival mode: Cash preservation, essential operations, stakeholder management
│   ├── 10-30% budget reduction required
│   │   ├── Efficiency focus: Process automation, vendor renegotiation, resource optimization
│   │   ├── Priority resequencing: Defer non-essential, accelerate high-ROI, maintain strategic
│   │   └── Creative funding: Alternative financing, partnership opportunities, revenue acceleration
│   └── <10% budget reduction required
│       ├── Operational efficiency: Process improvement, cost optimization, productivity enhancement
│       ├── Investment reallocation: Lower ROI to higher ROI, risk-adjusted prioritization
│       └── Strategic acceleration: Competitive advantage, market share, capability building
```

Each decision tree includes:
- **Time constraints**: Specific decision windows
- **Information requirements**: What data is needed at each decision point
- **Resource implications**: Budget, personnel, time commitments
- **Escalation triggers**: When to involve higher authority
- **Success criteria**: How to measure decision effectiveness
- **Risk mitigation**: Fallback options at each branch