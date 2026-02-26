#!/usr/bin/env python3
"""
CTO Executive Intelligence Skill Executor

This script provides the execution bridge between Claude Code and the HeadElf
CTO Intelligence TypeScript implementation, handling skill invocation,
parameter processing, and result formatting.
"""

import os
import sys
import json
import asyncio
import subprocess
import logging
from typing import Dict, Any, Optional
from pathlib import Path

# Add HeadElf to Python path
headelf_root = Path(__file__).parent.parent.parent
sys.path.append(str(headelf_root))

# Import Git-based persistence
try:
    from scripts.skill_executors.persistence_manager import GitPersistenceManager, ExecutorPersistenceIntegration
    PERSISTENCE_AVAILABLE = True
except ImportError:
    PERSISTENCE_AVAILABLE = False
    logging.warning("Git-based persistence not available")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CTOIntelligenceExecutor:
    """
    CTO Executive Intelligence Skill Executor

    Handles execution of CTO intelligence capabilities by bridging Claude Code
    skill requests to the TypeScript implementation and returning formatted results.
    """

    def __init__(self):
        self.skill_id = "headelf-cto-intelligence"
        self.version = "1.0.0"
        self.typescript_module = headelf_root / "src/core/cto-intelligence-module.ts"
        self.node_executor = headelf_root / "scripts/ts-executors/node-bridge.js"

        # Initialize Git-based persistence if available
        if PERSISTENCE_AVAILABLE:
            self.persistence = GitPersistenceManager(str(headelf_root))
            self.persistence_integration = ExecutorPersistenceIntegration(self.persistence)
        else:
            self.persistence = None
            self.persistence_integration = None

    async def execute_skill(self,
                           input_data: Dict[str, Any],
                           context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Execute CTO intelligence skill with provided input data and context.

        Args:
            input_data: Skill execution parameters
            context: Executive and organizational context

        Returns:
            Formatted skill execution results
        """
        try:
            # Validate input data
            validated_input = self._validate_input(input_data, context)

            # Execute TypeScript implementation
            typescript_result = await self._execute_typescript(validated_input)

            # Format results for Claude Code
            formatted_result = self._format_output(typescript_result)

            # Persist decision using Git-based persistence
            if self.persistence_integration:
                try:
                    decision_id = await self.persistence_integration.persist_decision_result(
                        executive_role="CTO",
                        decision_type=input_data.get("decision_type", "technology_strategy"),
                        query=input_data.get("query", ""),
                        result=formatted_result,
                        context=context or {}
                    )

                    # Add persistence metadata to result
                    formatted_result["persistence"] = {
                        "decision_id": decision_id,
                        "persisted": True,
                        "git_tracked": True
                    }

                    logger.info(f"Decision persisted with ID: {decision_id}")
                except Exception as e:
                    logger.warning(f"Failed to persist decision: {e}")
                    formatted_result["persistence"] = {
                        "persisted": False,
                        "error": str(e)
                    }

            # Log execution success
            logger.info(f"CTO Intelligence skill executed successfully: {self.skill_id}")

            return formatted_result

        except Exception as e:
            logger.error(f"CTO Intelligence skill execution failed: {str(e)}")
            return self._format_error(str(e))

    def _validate_input(self, input_data: Dict[str, Any], context: Optional[Dict[str, Any]]) -> Dict[str, Any]:
        """Validate and normalize input data according to skill schema."""
        validated = {
            "skill_id": self.skill_id,
            "version": self.version,
            "timestamp": asyncio.get_event_loop().time(),
            "input": input_data,
            "context": context or {}
        }

        # Ensure required fields are present
        required_fields = ["decision_type", "executive_context"]
        for field in required_fields:
            if field not in input_data:
                # Provide sensible defaults
                if field == "decision_type":
                    validated["input"][field] = "strategic_technology"
                elif field == "executive_context":
                    validated["input"][field] = self._get_default_context()

        return validated

    async def _execute_typescript(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute the TypeScript CTO intelligence module."""
        try:
            # Prepare TypeScript execution command
            cmd = [
                "node",
                str(self.node_executor),
                "cto-intelligence",
                json.dumps(input_data)
            ]

            # Execute TypeScript module
            process = await asyncio.create_subprocess_exec(
                *cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=str(headelf_root)
            )

            stdout, stderr = await process.communicate()

            if process.returncode != 0:
                raise RuntimeError(f"TypeScript execution failed: {stderr.decode()}")

            # Parse TypeScript result
            result = json.loads(stdout.decode())
            return result

        except Exception as e:
            logger.error(f"TypeScript execution error: {str(e)}")
            # Fallback to skill.md-only execution
            return await self._fallback_execution(input_data)

    async def _fallback_execution(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Fallback execution using only the skill.md content when TypeScript fails.
        This provides a degraded but functional capability.
        """
        logger.info("Using fallback execution mode (skill.md only)")

        # Read skill.md content
        skill_md_path = headelf_root / "skills/executive/cto-intelligence/skill.md"
        with open(skill_md_path, 'r') as f:
            skill_content = f.read()

        # Create basic CTO intelligence response
        decision_type = input_data.get("input", {}).get("decision_type", "technology_strategy")

        return {
            "success": True,
            "fallback_mode": True,
            "recommendation": {
                "decision_type": decision_type,
                "executive_role": "CTO",
                "guidance": f"Based on CTO Executive Intelligence Framework for {decision_type}",
                "framework_applied": "CTO Executive Intelligence",
                "skill_content_applied": True
            },
            "skill_content": skill_content[:2000] + "..." if len(skill_content) > 2000 else skill_content
        }

    def _format_output(self, typescript_result: Dict[str, Any]) -> Dict[str, Any]:
        """Format TypeScript results for Claude Code consumption."""
        return {
            "skill_id": self.skill_id,
            "version": self.version,
            "success": True,
            "executive_role": "CTO",
            "recommendation": typescript_result.get("recommendation", {}),
            "implementation_plan": typescript_result.get("implementationPlan", {}),
            "risk_assessment": typescript_result.get("riskAssessment", {}),
            "success_metrics": typescript_result.get("successMetrics", {}),
            "rationale": typescript_result.get("rationale", ""),
            "execution_metadata": {
                "execution_time": typescript_result.get("executionTime", 0),
                "confidence": typescript_result.get("confidence", 0.85),
                "data_sources": typescript_result.get("dataSources", []),
                "fallback_used": typescript_result.get("fallback_mode", False)
            }
        }

    def _format_error(self, error_message: str) -> Dict[str, Any]:
        """Format error response for Claude Code."""
        return {
            "skill_id": self.skill_id,
            "version": self.version,
            "success": False,
            "error": error_message,
            "fallback_available": True,
            "suggested_action": "Try simplified request or contact support"
        }

    def _get_default_context(self) -> Dict[str, Any]:
        """Provide default executive context when none is provided."""
        return {
            "organization": "default_enterprise",
            "industry": "technology",
            "size": "large_enterprise",
            "maturity": "established",
            "context_type": "strategic_decision"
        }

# Claude Code Skill Interface Functions
async def execute_cto_intelligence(input_data: str, context_data: str = "") -> str:
    """
    Main entry point for Claude Code skill execution.

    Args:
        input_data: JSON string containing skill parameters
        context_data: JSON string containing execution context

    Returns:
        JSON string containing execution results
    """
    try:
        # Parse input data
        parsed_input = json.loads(input_data) if input_data else {}
        parsed_context = json.loads(context_data) if context_data else {}

        # Execute CTO intelligence
        executor = CTOIntelligenceExecutor()
        result = await executor.execute_skill(parsed_input, parsed_context)

        # Return JSON result
        return json.dumps(result, indent=2)

    except Exception as e:
        error_result = {
            "success": False,
            "error": str(e),
            "skill_id": "headelf-cto-intelligence"
        }
        return json.dumps(error_result, indent=2)

def main():
    """Command line interface for testing the skill executor."""
    if len(sys.argv) < 2:
        print("Usage: cto-executor.py <input_json> [context_json]")
        sys.exit(1)

    input_data = sys.argv[1]
    context_data = sys.argv[2] if len(sys.argv) > 2 else ""

    # Run async execution
    result = asyncio.run(execute_cto_intelligence(input_data, context_data))
    print(result)

if __name__ == "__main__":
    main()