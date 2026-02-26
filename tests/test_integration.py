#!/usr/bin/env python3
"""
Integration Testing Framework

End-to-end integration tests for cross-functional C-suite coordination,
decision orchestration, and comprehensive business scenario validation.
"""

import pytest
import asyncio
import json
from pathlib import Path
from typing import Dict, Any, List

class TestIntegration:
    """Integration test suite for HeadElf executive coordination."""

    def setup_method(self):
        """Setup for each test method."""
        self.headelf_root = Path(__file__).parent.parent

    async def execute_cross_functional_scenario(self, scenario: Dict[str, Any]) -> Dict[str, Any]:
        """Execute a cross-functional business scenario across multiple C-suite roles."""
        # Import the skill registry
        import sys
        sys.path.append(str(self.headelf_root / "skills"))
        from skills import get_skill_registry

        registry = get_skill_registry()
        results = {}

        # Execute each role's analysis
        for role, role_query in scenario["role_queries"].items():
            try:
                # Import the specific executor
                executor_module = __import__(f"scripts.skill_executors.{role}_executor", fromlist=[f"execute_{role}_intelligence"])
                executor_func = getattr(executor_module, f"execute_{role}_intelligence")

                # Execute the role's analysis
                input_data = {
                    "decision_type": role_query["decision_type"],
                    "query": role_query["query"],
                    "context": scenario["context"]
                }

                result = await executor_func(json.dumps(input_data), json.dumps(scenario["context"]))
                results[role] = json.loads(result)

            except Exception as e:
                results[role] = {
                    "success": False,
                    "error": str(e),
                    "role": role
                }

        return {
            "scenario": scenario["name"],
            "success": all(result.get("success", False) for result in results.values()),
            "role_results": results,
            "cross_functional_coordination": self._analyze_coordination(results)
        }

    def _analyze_coordination(self, results: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze cross-functional coordination quality."""
        successful_roles = [role for role, result in results.items() if result.get("success", False)]
        coordination_score = len(successful_roles) / len(results) if results else 0

        return {
            "coordination_score": coordination_score,
            "successful_roles": successful_roles,
            "coordination_quality": "excellent" if coordination_score >= 0.9 else
                                   "good" if coordination_score >= 0.7 else
                                   "needs_improvement"
        }

    @pytest.mark.asyncio
    async def test_ma_acquisition_scenario(self):
        """Test comprehensive M&A acquisition analysis scenario."""
        scenario = {
            "name": "M&A Acquisition Analysis",
            "context": {
                "target_company": "AI Startup Inc.",
                "deal_size": "500M",
                "industry": "artificial_intelligence",
                "urgency": "high",
                "strategic_rationale": "technology_acquisition"
            },
            "role_queries": {
                "cto": {
                    "decision_type": "ma_technology_assessment",
                    "query": "Assess technology stack and integration feasibility"
                },
                "cfo": {
                    "decision_type": "ma_financial_analysis",
                    "query": "Analyze financial metrics and valuation"
                },
                "ciso": {
                    "decision_type": "security_due_diligence",
                    "query": "Evaluate security posture and compliance risks"
                },
                "clo": {
                    "decision_type": "legal_due_diligence",
                    "query": "Review legal structure and regulatory implications"
                },
                "chro": {
                    "decision_type": "talent_integration",
                    "query": "Plan talent retention and cultural integration"
                }
            }
        }

        result = await self.execute_cross_functional_scenario(scenario)

        assert result["success"] is True
        assert result["cross_functional_coordination"]["coordination_score"] >= 0.8
        assert len(result["cross_functional_coordination"]["successful_roles"]) >= 4

    @pytest.mark.asyncio
    async def test_digital_transformation_scenario(self):
        """Test comprehensive digital transformation planning scenario."""
        scenario = {
            "name": "Digital Transformation Initiative",
            "context": {
                "organization": "Fortune_500_Manufacturing",
                "transformation_scope": "enterprise_wide",
                "timeline": "24_months",
                "budget": "100M",
                "urgency": "medium"
            },
            "role_queries": {
                "cio": {
                    "decision_type": "digital_transformation",
                    "query": "Design comprehensive digital transformation roadmap"
                },
                "cto": {
                    "decision_type": "technology_platform",
                    "query": "Define technology architecture and platform strategy"
                },
                "cfo": {
                    "decision_type": "investment_analysis",
                    "query": "Analyze ROI and financial impact of transformation"
                },
                "coo": {
                    "decision_type": "operational_transformation",
                    "query": "Plan operational process optimization and automation"
                },
                "chro": {
                    "decision_type": "change_management",
                    "query": "Design change management and skills development program"
                }
            }
        }

        result = await self.execute_cross_functional_scenario(scenario)

        assert result["success"] is True
        assert result["cross_functional_coordination"]["coordination_score"] >= 0.8

    @pytest.mark.asyncio
    async def test_crisis_management_scenario(self):
        """Test comprehensive crisis management response scenario."""
        scenario = {
            "name": "Global Crisis Management",
            "context": {
                "crisis_type": "cybersecurity_incident",
                "impact_level": "critical",
                "affected_regions": ["north_america", "europe", "asia_pacific"],
                "timeline": "immediate_response",
                "urgency": "critical"
            },
            "role_queries": {
                "ciso": {
                    "decision_type": "incident_response",
                    "query": "Coordinate immediate security incident response"
                },
                "cio": {
                    "decision_type": "business_continuity",
                    "query": "Ensure business continuity and system recovery"
                },
                "clo": {
                    "decision_type": "legal_crisis_management",
                    "query": "Manage legal and regulatory compliance requirements"
                },
                "coo": {
                    "decision_type": "operational_crisis",
                    "query": "Coordinate operational response and stakeholder communication"
                },
                "cfo": {
                    "decision_type": "financial_impact_assessment",
                    "query": "Assess financial impact and insurance coverage"
                }
            }
        }

        result = await self.execute_cross_functional_scenario(scenario)

        assert result["success"] is True
        assert result["cross_functional_coordination"]["coordination_quality"] in ["good", "excellent"]

    @pytest.mark.asyncio
    async def test_skill_discovery_integration(self):
        """Test skill discovery and execution integration."""
        import sys
        sys.path.append(str(self.headelf_root / "skills"))
        from skills import find_skills, get_skill_registry

        # Test skill discovery
        registry = get_skill_registry()
        cto_matches = registry.find_skill_by_query("cto technology strategy")

        # Verify skill discovery works
        assert len(registry.get_all_skills()) >= 40
        assert len(registry.get_executive_skills()) >= 8

    def test_claude_code_integration(self):
        """Test Claude Code extension manifest and configuration."""
        headelf_yml = self.headelf_root / "headelf.yml"
        assert headelf_yml.exists()

        with open(headelf_yml, 'r') as f:
            import yaml
            config = yaml.safe_load(f)

        assert config["name"] == "HeadElf"
        assert config["claude_code"]["extension_type"] == "skills_package"
        assert len(config["capabilities"]["executive_intelligence"]["skills"]) == 9

    @pytest.mark.asyncio
    async def test_performance_benchmarks(self):
        """Test performance benchmarks for executive decision-making."""
        # Test CTO skill performance
        import sys
        sys.path.append(str(self.headelf_root / "scripts/skill-executors"))
        from cto_executor import execute_cto_intelligence

        start_time = asyncio.get_event_loop().time()

        input_data = {
            "decision_type": "technology_strategy",
            "query": "Quick technology assessment",
            "context": {"urgency": "high"}
        }

        result = await execute_cto_intelligence(
            json.dumps(input_data),
            json.dumps({})
        )

        execution_time = (asyncio.get_event_loop().time() - start_time) * 1000

        result_data = json.loads(result)
        assert result_data["success"] is True
        assert execution_time < 5000  # Should complete within 5 seconds

    @pytest.mark.asyncio
    async def test_industry_vertical_integration(self):
        """Test industry vertical extension integration."""
        # Test financial services extension
        scenario = {
            "name": "Financial Services Regulatory Compliance",
            "context": {
                "industry": "financial_services",
                "organization": "regional_bank",
                "regulatory_requirements": ["Basel_III", "Dodd_Frank"],
                "compliance_timeline": "6_months"
            },
            "role_queries": {
                "ciso": {
                    "decision_type": "regulatory_compliance",
                    "query": "Ensure regulatory compliance across all security frameworks"
                },
                "clo": {
                    "decision_type": "regulatory_strategy",
                    "query": "Develop regulatory compliance strategy and implementation plan"
                }
            }
        }

        result = await self.execute_cross_functional_scenario(scenario)

        # Should handle industry-specific context
        assert result is not None
        assert "role_results" in result

if __name__ == "__main__":
    # Run integration tests
    pytest.main([__file__, "-v", "--tb=short"])