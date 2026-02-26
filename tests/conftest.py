"""
PyTest Configuration for HeadElf Testing Framework

Global test configuration, fixtures, and shared utilities for comprehensive
HeadElf testing across all modules, skills, and integration scenarios.
"""

import pytest
import asyncio
import sys
from pathlib import Path

# Add HeadElf paths to Python path
headelf_root = Path(__file__).parent.parent
sys.path.append(str(headelf_root))
sys.path.append(str(headelf_root / "skills"))
sys.path.append(str(headelf_root / "scripts/skill-executors"))

@pytest.fixture(scope="session")
def headelf_root():
    """Provide HeadElf root directory path."""
    return Path(__file__).parent.parent

@pytest.fixture(scope="session")
def skill_registry():
    """Provide global skill registry."""
    from skills import get_skill_registry
    return get_skill_registry()

@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture
def sample_executive_context():
    """Provide sample executive decision context."""
    return {
        "organization": "fortune_500_tech",
        "urgency": "high",
        "decision_authority": "c_suite",
        "stakeholders": ["board", "investors", "employees"],
        "timeline": "30_days",
        "budget_authority": "unlimited"
    }

@pytest.fixture
def sample_ma_scenario():
    """Provide sample M&A acquisition scenario."""
    return {
        "target_company": "AI Innovation Labs",
        "deal_size": "750M",
        "industry": "artificial_intelligence",
        "strategic_rationale": "technology_acquisition",
        "timeline": "6_months",
        "due_diligence_required": True,
        "regulatory_approvals": ["DOJ", "EU_Competition"],
        "financing_structure": "cash_and_stock"
    }

@pytest.fixture
def sample_crisis_scenario():
    """Provide sample crisis management scenario."""
    return {
        "crisis_type": "data_breach",
        "severity": "critical",
        "affected_customers": "1M+",
        "affected_regions": ["us", "eu", "asia"],
        "regulatory_notifications": ["SEC", "GDPR", "state_ags"],
        "media_attention": "high",
        "stakeholder_impact": "critical"
    }

# Test markers
def pytest_configure(config):
    """Configure custom pytest markers."""
    config.addinivalue_line(
        "markers", "integration: mark test as integration test"
    )
    config.addinivalue_line(
        "markers", "performance: mark test as performance benchmark"
    )
    config.addinivalue_line(
        "markers", "slow: mark test as slow running"
    )
    config.addinivalue_line(
        "markers", "executive: mark test as executive intelligence test"
    )

def pytest_collection_modifyitems(config, items):
    """Modify test collection to add markers automatically."""
    for item in items:
        # Add markers based on test file names
        if "test_integration" in str(item.fspath):
            item.add_marker(pytest.mark.integration)
        if "test_performance" in str(item.fspath):
            item.add_marker(pytest.mark.performance)
        if "test_core" in str(item.fspath):
            item.add_marker(pytest.mark.executive)

# Test data validation
@pytest.fixture
def validate_executive_result():
    """Validator for executive intelligence results."""
    def _validate(result):
        required_fields = ["success", "executive_role", "confidence"]
        for field in required_fields:
            assert field in result, f"Missing required field: {field}"

        assert isinstance(result["success"], bool)
        assert isinstance(result["confidence"], (int, float))
        assert 0.0 <= result["confidence"] <= 1.0

        if result["success"]:
            assert result["confidence"] >= 0.5
            assert "recommendation" in result or "analysis" in result

    return _validate