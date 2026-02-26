"""
HeadElf CTO Intelligence Skill

Claude Code skill registration and integration for CTO Executive Intelligence capabilities.
"""

import json
import asyncio
from pathlib import Path
from typing import Dict, Any, List

# Skill metadata
SKILL_METADATA = {
    "id": "headelf-cto-intelligence",
    "name": "CTO Executive Intelligence",
    "version": "1.0.0",
    "category": "executive",
    "description": "World-class Chief Technology Officer capabilities spanning technology strategy, innovation leadership, venture capital frameworks, M&A integration, and platform architecture",
    "author": "HeadElf Executive Intelligence System",
    "keywords": ["cto", "technology strategy", "venture capital", "m&a", "platform architecture"],
    "execution_time": "5-30 minutes",
    "complexity": "high"
}

# Claude Code skill registration
def register_skill():
    """Register the CTO Intelligence skill with Claude Code."""
    return SKILL_METADATA

def get_skill_info():
    """Get detailed skill information for Claude Code."""
    skill_dir = Path(__file__).parent

    # Load metadata from YAML file
    metadata_file = skill_dir / "metadata.yml"
    skill_md_file = skill_dir / "skill.md"

    info = {
        "metadata": SKILL_METADATA,
        "has_metadata_file": metadata_file.exists(),
        "has_skill_file": skill_md_file.exists(),
        "skill_directory": str(skill_dir),
        "execution_script": str(skill_dir.parent.parent.parent / "scripts/skill-executors/cto-executor.py")
    }

    return info

async def execute_skill(query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
    """
    Execute the CTO Intelligence skill.

    Args:
        query: The user query or command
        context: Execution context and parameters

    Returns:
        Skill execution results
    """
    try:
        # Import the executor
        import sys
        executor_path = Path(__file__).parent.parent.parent.parent / "scripts/skill-executors"
        sys.path.append(str(executor_path))

        from cto_executor import execute_cto_intelligence

        # Prepare input data
        input_data = {
            "query": query,
            "skill_id": SKILL_METADATA["id"],
            "version": SKILL_METADATA["version"]
        }

        if context:
            input_data.update(context)

        # Execute skill
        result_json = await execute_cto_intelligence(json.dumps(input_data), json.dumps(context or {}))
        result = json.loads(result_json)

        return result

    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "skill_id": SKILL_METADATA["id"]
        }

# Claude Code integration functions
def skill_matches(query: str) -> float:
    """
    Determine if this skill matches the user query.

    Returns a confidence score between 0.0 and 1.0.
    """
    query_lower = query.lower()

    # Direct matches
    if any(keyword in query_lower for keyword in ["cto", "chief technology officer"]):
        return 0.95

    # Technology strategy matches
    if any(term in query_lower for term in ["technology strategy", "tech strategy"]):
        return 0.90

    # Venture capital matches
    if any(term in query_lower for term in ["venture capital", "vc", "startup investment"]):
        return 0.85

    # M&A matches
    if any(term in query_lower for term in ["m&a", "merger", "acquisition", "technology integration"]):
        return 0.85

    # Platform architecture matches
    if any(term in query_lower for term in ["platform architecture", "technology platform"]):
        return 0.80

    # Innovation matches
    if any(term in query_lower for term in ["innovation strategy", "r&d", "research and development"]):
        return 0.75

    # General technology leadership
    if any(term in query_lower for term in ["technology leadership", "tech leadership"]):
        return 0.70

    return 0.0

def get_skill_triggers() -> List[str]:
    """Get list of trigger phrases for this skill."""
    return [
        "cto",
        "chief technology officer",
        "technology strategy",
        "venture capital",
        "m&a technology",
        "platform architecture",
        "innovation strategy",
        "r&d management",
        "technology leadership",
        "tech strategy"
    ]

def get_usage_examples() -> List[str]:
    """Get usage examples for this skill."""
    return [
        "Develop a technology strategy for our AI platform",
        "Evaluate this startup for venture capital investment",
        "Plan the technology integration for our M&A",
        "Design our platform architecture roadmap",
        "Create an innovation strategy for emerging technologies"
    ]

# Export skill interface
__all__ = [
    'SKILL_METADATA',
    'register_skill',
    'get_skill_info',
    'execute_skill',
    'skill_matches',
    'get_skill_triggers',
    'get_usage_examples'
]