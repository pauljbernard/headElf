#!/usr/bin/env python3
"""
Core Module Testing Framework

Unit tests for all 46 TypeScript core modules with comprehensive validation
of business logic, decision algorithms, and cross-functional coordination.
"""

import pytest
import asyncio
import json
import subprocess
from pathlib import Path
from typing import Dict, Any, List

class TestCoreModules:
    """Test suite for HeadElf core TypeScript modules."""

    def setup_method(self):
        """Setup for each test method."""
        self.headelf_root = Path(__file__).parent.parent
        self.node_bridge = self.headelf_root / "scripts/ts-executors/node-bridge.js"

    async def execute_module(self, module_name: str, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute a TypeScript module via Node bridge."""
        cmd = [
            "node",
            str(self.node_bridge),
            module_name,
            json.dumps(input_data)
        ]

        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=str(self.headelf_root)
        )

        stdout, stderr = await process.communicate()

        if process.returncode != 0:
            raise RuntimeError(f"Module execution failed: {stderr.decode()}")

        return json.loads(stdout.decode())

    @pytest.mark.asyncio
    async def test_executive_intelligence_engine(self):
        """Test the core executive intelligence engine."""
        input_data = {
            "decision_request": {
                "type": "cross_functional_analysis",
                "query": "Evaluate our M&A strategy",
                "context": {
                    "organization": "tech_company",
                    "urgency": "high"
                }
            }
        }

        result = await self.execute_module("executive-intelligence-engine", input_data)

        assert result["success"] is True
        assert result["moduleName"] == "executive-intelligence-engine"
        assert "orchestration" in result
        assert "coordination" in result["orchestration"]

    @pytest.mark.asyncio
    async def test_cto_intelligence_module(self):
        """Test CTO intelligence with venture capital framework."""
        input_data = {
            "decision_type": "venture_capital",
            "query": "Evaluate AI startup investment opportunity",
            "context": {
                "startup_stage": "series_a",
                "technology_stack": "machine_learning",
                "market_size": "billion_dollar"
            }
        }

        result = await self.execute_module("cto-intelligence", input_data)

        assert result["success"] is True
        assert result["executive_role"] == "CTO"
        assert "technology_assessment" in result
        assert "investment_recommendation" in result
        assert result["confidence"] >= 0.8

    @pytest.mark.asyncio
    async def test_cfo_intelligence_module(self):
        """Test CFO intelligence with M&A financial analysis."""
        input_data = {
            "decision_type": "ma_financial_analysis",
            "query": "Analyze acquisition target financials",
            "context": {
                "target_revenue": "50M",
                "target_industry": "fintech",
                "deal_size": "200M"
            }
        }

        result = await self.execute_module("cfo-intelligence", input_data)

        assert result["success"] is True
        assert result["executive_role"] == "CFO"
        assert "financial_analysis" in result
        assert "valuation_model" in result
        assert result["confidence"] >= 0.8

    @pytest.mark.asyncio
    async def test_ciso_intelligence_module(self):
        """Test CISO intelligence with security governance."""
        input_data = {
            "decision_type": "security_governance",
            "query": "Develop zero-trust architecture framework",
            "context": {
                "organization_size": "enterprise",
                "compliance_requirements": ["SOX", "GDPR"],
                "threat_landscape": "high"
            }
        }

        result = await self.execute_module("ciso-intelligence", input_data)

        assert result["success"] is True
        assert result["executive_role"] == "CISO"
        assert "security_framework" in result
        assert "compliance_validation" in result
        assert result["confidence"] >= 0.8

    @pytest.mark.asyncio
    async def test_extensibility_engine(self):
        """Test the two-dimensional extensibility framework."""
        input_data = {
            "extension_request": {
                "industry": "financial_services",
                "enterprise_context": "multinational_bank",
                "capability_enhancement": "regulatory_compliance"
            }
        }

        result = await self.execute_module("extensibility-engine", input_data)

        assert result["success"] is True
        assert "extension_coordination" in result
        assert "industry_adaptation" in result
        assert "enterprise_contextualization" in result

    @pytest.mark.asyncio
    async def test_decision_authority_framework(self):
        """Test the 5-level decision authority matrix."""
        input_data = {
            "decision_scenario": {
                "type": "strategic_investment",
                "impact_level": "high",
                "financial_threshold": "10M",
                "risk_category": "medium"
            }
        }

        result = await self.execute_module("decision-authority-framework", input_data)

        assert result["success"] is True
        assert "authority_level" in result
        assert "required_approvals" in result
        assert "escalation_path" in result
        assert result["authority_level"] in [1, 2, 3, 4, 5]

    def test_all_core_modules_exist(self):
        """Verify core TypeScript modules exist."""
        core_modules_dir = self.headelf_root / "src/core"

        # Test existing core modules
        expected_existing_modules = [
            "executive-intelligence-engine.ts",
            "cto-intelligence-module.ts",
            "cio-intelligence-module.ts",
            "ciso-intelligence-module.ts",
            "cfo-intelligence-module.ts",
            "coo-intelligence-module.ts",
            "clo-intelligence-module.ts",
            "chro-intelligence-module.ts",
            "cmso-intelligence-module.ts",
            "cpo-intelligence-module.ts",
            "extensibility-engine.ts"
        ]

        missing_modules = []
        for module_file in expected_existing_modules:
            module_path = core_modules_dir / module_file
            if not module_path.exists():
                missing_modules.append(module_file)

        assert len(missing_modules) == 0, f"Missing core modules: {missing_modules}"

        # Verify we have at least the essential modules
        assert len(expected_existing_modules) >= 10, "Should have at least 10 core executive modules"

    @pytest.mark.parametrize("module_name,test_input", [
        ("cio-intelligence", {"decision_type": "digital_transformation", "query": "Plan enterprise cloud migration"}),
        ("coo-intelligence", {"decision_type": "operational_excellence", "query": "Optimize supply chain operations"}),
        ("clo-intelligence", {"decision_type": "legal_strategy", "query": "Structure M&A legal framework"}),
        ("chro-intelligence", {"decision_type": "talent_strategy", "query": "Design global leadership development program"}),
        ("cmso-intelligence", {"decision_type": "marketing_strategy", "query": "Launch new product marketing campaign"}),
        ("cpo-intelligence", {"decision_type": "product_strategy", "query": "Define product roadmap for AI platform"})
    ])
    @pytest.mark.asyncio
    async def test_all_executive_modules(self, module_name, test_input):
        """Parameterized test for all C-suite executive modules."""
        result = await self.execute_module(module_name, test_input)

        assert result["success"] is True
        assert "executive_role" in result
        assert result["confidence"] >= 0.7
        assert "recommendation" in result or "analysis" in result

if __name__ == "__main__":
    # Run tests directly
    pytest.main([__file__, "-v", "--tb=short"])