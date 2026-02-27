"""
HeadElf Skills Package

Claude Code skill registration and discovery for all HeadElf capabilities.
Provides comprehensive C-suite executive intelligence and industry vertical extensions.
"""

import os
import importlib
from pathlib import Path
from typing import Dict, List, Any, Optional

class HeadElfSkillRegistry:
    """Registry for all HeadElf skills and capabilities."""

    def __init__(self):
        self.skills = {}
        self.executive_skills = {}
        self.industry_skills = {}
        self.security_skills = {}
        self.architecture_skills = {}
        self.advanced_skills = {}
        self.reasoning_skills = {}
        self._initialize_skills()

    def _initialize_skills(self):
        """Initialize all HeadElf skills."""
        skills_dir = Path(__file__).parent

        # Load executive skills
        self._load_executive_skills(skills_dir / "executive")

        # Load industry skills
        self._load_industry_skills(skills_dir / "industry")

        # Load security skills
        self._load_security_skills(skills_dir / "security")

        # Load advanced reasoning skills
        self._load_advanced_skills(skills_dir / "advanced")

        # Load architecture skills
        self._load_architecture_skills(skills_dir)

    def _load_executive_skills(self, executive_dir: Path):
        """Load all C-suite executive skills."""
        if not executive_dir.exists():
            return

        executive_skill_dirs = [
            "cto-intelligence",
            "cio-intelligence",
            "ciso-intelligence",
            "cfo-intelligence",
            "coo-intelligence",
            "clo-intelligence",
            "chro-intelligence",
            "cmso-intelligence",
            "cpo-intelligence"
        ]

        for skill_dir_name in executive_skill_dirs:
            skill_dir = executive_dir / skill_dir_name
            if skill_dir.exists():
                self._load_skill(skill_dir, "executive")

    def _load_industry_skills(self, industry_dir: Path):
        """Load all industry vertical skills."""
        if not industry_dir.exists():
            return

        # Scan for industry skill directories
        for skill_dir in industry_dir.iterdir():
            if skill_dir.is_dir() and (skill_dir / "skill.md").exists():
                self._load_skill(skill_dir, "industry")

    def _load_security_skills(self, security_dir: Path):
        """Load all security framework skills."""
        if not security_dir.exists():
            return

        # Load security skills from all categories
        security_categories = [
            ("executive", "security-executive"),  # CSO, CRO, CPO-Privacy
            ("operational", "security-operational"),  # SOC, IAM, etc.
            ("compliance", "security-compliance"),  # Compliance, Audit, etc.
            ("specialized", "security-specialized")  # Forensics, Incident Response, etc.
        ]

        for category_name, skill_category in security_categories:
            category_dir = security_dir / category_name
            if category_dir.exists():
                self._load_skills_from_category(category_dir, skill_category)

    def _load_advanced_skills(self, advanced_dir: Path):
        """Load all advanced reasoning skills."""
        if not advanced_dir.exists():
            return

        # Load advanced reasoning skills
        advanced_skill_names = [
            "adversarial-intelligence",
            "formal-proof-construction",
            "system-builder-experience",
            "intellectual-honesty-enforcement",
            "risk-managed-analysis",
            "executive-diagnostic-depth",
            "conviction-based-decision-making",
            "financial-fluency-and-modeling",
            "political-dynamics-analysis",
            "regulatory-and-compliance-fluency",
            "premise-challenging-analysis"
        ]

        for skill_name in advanced_skill_names:
            skill_dir = advanced_dir / skill_name
            if skill_dir.exists():
                self._load_skill(skill_dir, "advanced-reasoning")

    def _load_architecture_skills(self, skills_dir: Path):
        """Load architecture and advanced skills."""
        architecture_categories = [
            "application",
            "cloud-mastery",
            "architecture-mastery",
            "advanced"
        ]

        for category in architecture_categories:
            category_dir = skills_dir / category
            if category_dir.exists():
                self._load_skills_from_category(category_dir, category)

    def _load_skills_from_category(self, category_dir: Path, category: str):
        """Load all skills from a category directory."""
        for skill_dir in category_dir.iterdir():
            if skill_dir.is_dir() and (skill_dir / "skill.md").exists():
                self._load_skill(skill_dir, category)

    def _load_skill(self, skill_dir: Path, category: str):
        """Load a single skill from its directory."""
        try:
            skill_name = skill_dir.name
            skill_id = f"headelf-{category}-{skill_name}"

            # Try to load Python __init__.py if it exists
            init_file = skill_dir / "__init__.py"
            skill_module = None

            if init_file.exists():
                try:
                    # Import the skill module
                    module_name = f"skills.{category}.{skill_name.replace('-', '_')}"
                    skill_module = importlib.import_module(module_name)
                except ImportError:
                    skill_module = None

            # Load skill.md content
            skill_md_file = skill_dir / "skill.md"
            skill_content = ""
            if skill_md_file.exists():
                with open(skill_md_file, 'r', encoding='utf-8') as f:
                    skill_content = f.read()

            # Create skill registration
            skill_info = {
                "id": skill_id,
                "name": skill_name.replace('-', ' ').title(),
                "category": category,
                "directory": str(skill_dir),
                "has_module": skill_module is not None,
                "has_content": bool(skill_content),
                "content": skill_content,
                "module": skill_module
            }

            # Add to appropriate skill collection
            self.skills[skill_id] = skill_info

            if category == "executive":
                self.executive_skills[skill_id] = skill_info
            elif category == "industry":
                self.industry_skills[skill_id] = skill_info
            elif category.startswith("security-"):
                self.security_skills[skill_id] = skill_info
            elif category == "advanced-reasoning":
                self.reasoning_skills[skill_id] = skill_info
            elif category in ["application", "cloud-mastery", "architecture-mastery"]:
                self.architecture_skills[skill_id] = skill_info
            elif category == "advanced":
                self.advanced_skills[skill_id] = skill_info

        except Exception as e:
            print(f"Error loading skill from {skill_dir}: {e}")

    def get_all_skills(self) -> Dict[str, Any]:
        """Get all registered skills."""
        return self.skills

    def get_executive_skills(self) -> Dict[str, Any]:
        """Get all C-suite executive skills."""
        return self.executive_skills

    def get_industry_skills(self) -> Dict[str, Any]:
        """Get all industry vertical skills."""
        return self.industry_skills

    def get_security_skills(self) -> Dict[str, Any]:
        """Get all security framework skills."""
        return self.security_skills

    def get_reasoning_skills(self) -> Dict[str, Any]:
        """Get all advanced reasoning skills."""
        return self.reasoning_skills

    def get_architecture_skills(self) -> Dict[str, Any]:
        """Get all software architecture skills."""
        return self.architecture_skills

    def find_skill_by_query(self, query: str) -> List[Dict[str, Any]]:
        """Find skills matching a query string."""
        query_lower = query.lower()
        matches = []

        for skill_id, skill_info in self.skills.items():
            score = 0.0

            # Check skill name
            if query_lower in skill_info["name"].lower():
                score += 0.8

            # Check skill content
            if skill_info["content"] and query_lower in skill_info["content"].lower():
                score += 0.6

            # Check if it's a module with matching capability
            if skill_info["module"] and hasattr(skill_info["module"], 'skill_matches'):
                module_score = skill_info["module"].skill_matches(query)
                score = max(score, module_score)

            if score > 0.5:
                matches.append({
                    "skill": skill_info,
                    "score": score
                })

        # Sort by score
        matches.sort(key=lambda x: x["score"], reverse=True)
        return matches

    def get_skill_summary(self) -> Dict[str, Any]:
        """Get a summary of all registered skills."""
        return {
            "total_skills": len(self.skills),
            "executive_skills": len(self.executive_skills),
            "industry_skills": len(self.industry_skills),
            "security_skills": len(self.security_skills),
            "reasoning_skills": len(self.reasoning_skills),
            "architecture_skills": len(self.architecture_skills),
            "advanced_skills": len(self.advanced_skills),
            "skill_categories": {
                "executive": list(self.executive_skills.keys()),
                "industry": list(self.industry_skills.keys()),
                "security": list(self.security_skills.keys()),
                "reasoning": list(self.reasoning_skills.keys()),
                "architecture": list(self.architecture_skills.keys()),
                "advanced": list(self.advanced_skills.keys())
            }
        }

# Global skill registry instance
_skill_registry = None

def get_skill_registry() -> HeadElfSkillRegistry:
    """Get the global HeadElf skill registry."""
    global _skill_registry
    if _skill_registry is None:
        _skill_registry = HeadElfSkillRegistry()
    return _skill_registry

def register_all_skills() -> Dict[str, Any]:
    """Register all HeadElf skills with Claude Code."""
    registry = get_skill_registry()
    return registry.get_skill_summary()

def find_skills(query: str) -> List[Dict[str, Any]]:
    """Find skills matching a query."""
    registry = get_skill_registry()
    return registry.find_skill_by_query(query)

def get_executive_capabilities() -> List[str]:
    """Get list of all executive capabilities."""
    return [
        "CTO - Technology Strategy & Innovation Leadership",
        "CIO - Digital Transformation & IT Operations",
        "CISO - Security Governance & Risk Management",
        "CFO - Financial Strategy & Investment Analysis",
        "COO - Operational Excellence & Performance Management",
        "CLO - Legal Strategy & Regulatory Compliance",
        "CHRO - Talent Management & Organizational Development",
        "CMSO - Marketing & Sales Operations Excellence",
        "CPO - Product Strategy & Innovation Management"
    ]

def get_industry_verticals() -> List[str]:
    """Get list of supported industry verticals."""
    registry = get_skill_registry()
    industry_skills = registry.get_industry_skills()

    industries = []
    for skill_id, skill_info in industry_skills.items():
        industry_name = skill_info["name"].replace("Intelligence", "").strip()
        industries.append(industry_name)

    return sorted(industries)

def get_security_capabilities() -> List[str]:
    """Get list of all security framework capabilities."""
    return [
        # Executive Security (4 roles)
        "CSO - Chief Security Officer Intelligence",
        "CRO - Chief Risk Officer Intelligence",
        "CPO-Privacy - Chief Privacy Officer Intelligence",

        # Operational Security (5 roles)
        "SOC Director - Security Operations Center Leadership",
        "IAM Director - Identity & Access Management",
        "Security Architecture Director - Security Architecture & Design",
        "Vulnerability Management Director - Vulnerability Assessment & Management",
        "Threat Intelligence Director - Threat Intelligence & Analysis",

        # Compliance Security (4 roles)
        "Compliance Director - Regulatory Compliance & Governance",
        "Audit Director - Security Audit & Assessment",
        "GRC Director - Governance, Risk & Compliance",
        "Privacy Director - Privacy Engineering & Data Protection",

        # Specialized Security (4 roles)
        "Forensic Investigation Director - Digital Forensics & Investigation",
        "Incident Response Director - Crisis Response & Incident Management",
        "Security Research Director - Security Research & Innovation",
        "Business Continuity Director - Business Continuity & Resilience"
    ]

# Export main functions
__all__ = [
    'HeadElfSkillRegistry',
    'get_skill_registry',
    'register_all_skills',
    'find_skills',
    'get_executive_capabilities',
    'get_security_capabilities',
    'get_industry_verticals'
]