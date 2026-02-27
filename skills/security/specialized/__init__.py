"""
HeadElf Security - Specialized Technical Security Leadership

This package provides world-class specialized technical security leadership capabilities
including digital forensics, incident response, security research, and business continuity.

Specialized Technical Security Roles:
- Forensic Investigation Director Intelligence: Digital forensics and investigation leadership
- Incident Response Director Intelligence: Crisis response coordination and incident management
- Security Research Director Intelligence: Threat research and security innovation leadership
- Business Continuity Director Intelligence: Resilience planning and continuity management

Each role embodies Fortune 500 enterprise specialized technical security expertise with
comprehensive certification coverage and cross-functional integration capabilities.
"""

__version__ = "1.0.0"
__author__ = "HeadElf Security Intelligence Framework"

# Import specialized technical security roles
from .forensic_investigation_director_intelligence import ForensicInvestigationDirectorIntelligence
from .incident_response_director_intelligence import IncidentResponseDirectorIntelligence
from .security_research_director_intelligence import SecurityResearchDirectorIntelligence
from .business_continuity_director_intelligence import BusinessContinuityDirectorIntelligence

__all__ = [
    'ForensicInvestigationDirectorIntelligence',
    'IncidentResponseDirectorIntelligence',
    'SecurityResearchDirectorIntelligence',
    'BusinessContinuityDirectorIntelligence'
]

# Specialized Technical Security Skills Registry
SPECIALIZED_SECURITY_SKILLS = {
    'forensic_investigation_director': {
        'class': ForensicInvestigationDirectorIntelligence,
        'description': 'Digital forensics and investigation leadership with comprehensive forensic program management',
        'certifications': ['EnCE', 'GCFA', 'GCFE', 'CCE'],
        'domains': ['digital_forensics_program', 'cyber_crime_investigation', 'ediscovery_litigation_support']
    },
    'incident_response_director': {
        'class': IncidentResponseDirectorIntelligence,
        'description': 'Crisis response coordination and incident management with enterprise IR program development',
        'certifications': ['GCIH', 'GCFA', 'CISSP', 'CISM'],
        'domains': ['enterprise_incident_response', 'crisis_response_coordination', 'security_operations_integration']
    },
    'security_research_director': {
        'class': SecurityResearchDirectorIntelligence,
        'description': 'Threat research and innovation leadership with comprehensive security research programs',
        'certifications': ['GREM', 'GCTI', 'CISSP', 'SABSA'],
        'domains': ['advanced_threat_research', 'security_innovation_development', 'threat_intelligence_excellence']
    },
    'business_continuity_director': {
        'class': BusinessContinuityDirectorIntelligence,
        'description': 'Resilience planning and continuity management with comprehensive BCP program development',
        'certifications': ['CBCP', 'MBCI', 'CISSP', 'CISA'],
        'domains': ['enterprise_business_continuity', 'crisis_management_emergency_response', 'operational_resilience']
    }
}

def get_specialized_security_skill(skill_name: str):
    """Get specialized technical security skill class by name"""
    skill_info = SPECIALIZED_SECURITY_SKILLS.get(skill_name)
    if skill_info:
        return skill_info['class']
    return None

def list_specialized_security_skills():
    """List all available specialized technical security skills"""
    return list(SPECIALIZED_SECURITY_SKILLS.keys())

def get_skill_info(skill_name: str):
    """Get detailed information about a specialized technical security skill"""
    return SPECIALIZED_SECURITY_SKILLS.get(skill_name)