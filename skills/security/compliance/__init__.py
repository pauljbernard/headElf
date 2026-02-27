"""
HeadElf Security - Compliance & Governance Security Leadership

This package provides world-class compliance and governance security leadership capabilities
including regulatory compliance, security audit, data privacy governance, and GRC coordination.

Compliance & Governance Security Roles:
- Compliance Director Intelligence: Regulatory compliance frameworks and audit coordination
- Audit Director Intelligence: Security audit leadership and assurance programs
- Privacy Director Intelligence: Data protection governance and privacy compliance
- GRC Director Intelligence: Governance, risk, and compliance coordination

Each role embodies Fortune 500 enterprise compliance and governance expertise with
comprehensive certification coverage and cross-functional integration capabilities.
"""

__version__ = "1.0.0"
__author__ = "HeadElf Security Intelligence Framework"

# Import compliance and governance security roles
from .compliance_director_intelligence import ComplianceDirectorIntelligence
from .audit_director_intelligence import AuditDirectorIntelligence
from .privacy_director_intelligence import PrivacyDirectorIntelligence
from .grc_director_intelligence import GRCDirectorIntelligence

__all__ = [
    'ComplianceDirectorIntelligence',
    'AuditDirectorIntelligence',
    'PrivacyDirectorIntelligence',
    'GRCDirectorIntelligence'
]