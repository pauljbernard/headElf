#!/usr/bin/env python3
"""
HeadElf Execution Testing Script

Tests the complete execution bridge from Claude Code skill invocation through
to TypeScript implementation and result formatting.
"""

import os
import sys
import json
import asyncio
import subprocess
from pathlib import Path
from typing import Dict, Any

# Add HeadElf to Python path
headelf_root = Path(__file__).parent.parent
sys.path.append(str(headelf_root))
sys.path.append(str(headelf_root / "scripts/skill-executors"))

async def test_cto_skill_execution():
    """Test CTO intelligence skill execution end-to-end."""
    print("🧪 Testing CTO Intelligence Skill Execution")
    print("=" * 50)

    try:
        # Import the CTO executor
        from cto_executor import execute_cto_intelligence

        # Test data
        test_input = {
            "decision_type": "technology_strategy",
            "query": "Help me develop a technology strategy for our AI platform",
            "context": {
                "organization": "tech_startup",
                "industry": "artificial_intelligence",
                "size": "medium",
                "urgency": "high"
            }
        }

        test_context = {
            "user": "test_user",
            "session_id": "test_session",
            "timestamp": "2024-02-26T10:00:00Z"
        }

        print(f"📥 Input: {json.dumps(test_input, indent=2)}")
        print(f"🔧 Context: {json.dumps(test_context, indent=2)}")

        # Execute skill
        print("\n🚀 Executing CTO Intelligence Skill...")
        result = await execute_cto_intelligence(
            json.dumps(test_input),
            json.dumps(test_context)
        )

        # Parse and display result
        parsed_result = json.loads(result)
        print(f"\n✅ Execution Result:")
        print(f"Success: {parsed_result.get('success', False)}")
        print(f"Executive Role: {parsed_result.get('executive_role', 'Unknown')}")

        if parsed_result.get('success'):
            print(f"Confidence: {parsed_result.get('execution_metadata', {}).get('confidence', 'N/A')}")
            print(f"Execution Time: {parsed_result.get('execution_metadata', {}).get('execution_time', 'N/A')}ms")
            print(f"Fallback Used: {parsed_result.get('execution_metadata', {}).get('fallback_used', False)}")

            # Show recommendation summary
            recommendation = parsed_result.get('recommendation', {})
            if recommendation:
                print(f"\n📋 Recommendation Summary:")
                print(f"- Decision Type: {recommendation.get('decision_type', 'N/A')}")
                print(f"- Strategic Direction: {recommendation.get('strategic_direction', 'N/A')}")
                print(f"- Timeline: {recommendation.get('timeline', 'N/A')}")

        return parsed_result

    except Exception as e:
        print(f"❌ CTO Skill Execution Failed: {str(e)}")
        return None

async def test_node_bridge():
    """Test the Node.js TypeScript bridge directly."""
    print("\n🧪 Testing Node.js TypeScript Bridge")
    print("=" * 50)

    try:
        # Test Node bridge availability
        node_bridge = headelf_root / "scripts/ts-executors/node-bridge.js"

        if not node_bridge.exists():
            print(f"❌ Node bridge not found at: {node_bridge}")
            return False

        print(f"✅ Node bridge found: {node_bridge}")

        # Test data for Node bridge
        test_data = {
            "skill_id": "cto-intelligence-test",
            "input": {
                "decision_type": "venture_capital",
                "query": "Evaluate this startup for investment"
            },
            "context": {
                "organization": "venture_fund",
                "investment_focus": "ai_startups"
            }
        }

        # Execute Node bridge
        cmd = [
            "node",
            str(node_bridge),
            "cto-intelligence",
            json.dumps(test_data)
        ]

        print(f"🔧 Command: {' '.join(cmd[:3])}")

        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=str(headelf_root)
        )

        stdout, stderr = await process.communicate()

        if process.returncode == 0:
            result = json.loads(stdout.decode())
            print(f"✅ Node Bridge Execution Successful")
            print(f"Module: {result.get('moduleName', 'Unknown')}")
            print(f"Success: {result.get('success', False)}")
            print(f"Execution Time: {result.get('executionTime', 0)}ms")
            return True
        else:
            print(f"❌ Node Bridge Execution Failed")
            print(f"Error: {stderr.decode()}")
            return False

    except Exception as e:
        print(f"❌ Node Bridge Test Failed: {str(e)}")
        return False

async def test_skill_discovery():
    """Test skill discovery and registration."""
    print("\n🧪 Testing Skill Discovery and Registration")
    print("=" * 50)

    try:
        # Import skill registry
        sys.path.append(str(headelf_root / "skills"))
        from skills import get_skill_registry, register_all_skills

        # Test skill registration
        registry = get_skill_registry()
        print(f"✅ Skill registry loaded")

        # Get skill summary
        summary = registry.get_skill_summary()
        print(f"📊 Skill Summary:")
        print(f"- Total Skills: {summary['total_skills']}")
        print(f"- Executive Skills: {summary['executive_skills']}")
        print(f"- Industry Skills: {summary['industry_skills']}")
        print(f"- Architecture Skills: {summary['architecture_skills']}")

        # Test skill search
        print(f"\n🔍 Testing Skill Search:")
        matches = registry.find_skill_by_query("cto technology strategy")
        print(f"- Query: 'cto technology strategy'")
        print(f"- Matches Found: {len(matches)}")

        if matches:
            best_match = matches[0]
            print(f"- Best Match: {best_match['skill']['name']} (score: {best_match['score']:.2f})")

        return True

    except Exception as e:
        print(f"❌ Skill Discovery Test Failed: {str(e)}")
        return False

def test_file_structure():
    """Test that all required files exist."""
    print("\n🧪 Testing File Structure")
    print("=" * 50)

    required_files = [
        "skills/__init__.py",
        "skills/executive/cto-intelligence/__init__.py",
        "skills/executive/cto-intelligence/skill.md",
        "skills/executive/cto-intelligence/metadata.yml",
        "scripts/skill-executors/cto_executor.py",
        "scripts/ts-executors/node-bridge.js",
        "src/core/cto-intelligence-module.ts",
        "src/core/executive-intelligence-engine.ts",
        "headelf.yml"
    ]

    all_exist = True
    for file_path in required_files:
        full_path = headelf_root / file_path
        exists = full_path.exists()
        status = "✅" if exists else "❌"
        print(f"{status} {file_path}")

        if not exists:
            all_exist = False

    print(f"\n📋 File Structure Status: {'✅ Complete' if all_exist else '❌ Missing files'}")
    return all_exist

async def run_all_tests():
    """Run all execution bridge tests."""
    print("🚀 HeadElf Execution Bridge Testing")
    print("=" * 60)

    test_results = {}

    # Test 1: File Structure
    print("\n" + "="*60)
    test_results["file_structure"] = test_file_structure()

    # Test 2: Skill Discovery
    print("\n" + "="*60)
    test_results["skill_discovery"] = await test_skill_discovery()

    # Test 3: Node Bridge
    print("\n" + "="*60)
    test_results["node_bridge"] = await test_node_bridge()

    # Test 4: CTO Skill Execution
    print("\n" + "="*60)
    cto_result = await test_cto_skill_execution()
    test_results["cto_execution"] = cto_result is not None

    # Summary
    print("\n" + "="*60)
    print("🎯 TEST SUMMARY")
    print("="*60)

    passed = 0
    total = len(test_results)

    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name.replace('_', ' ').title()}")
        if result:
            passed += 1

    print(f"\n📊 Results: {passed}/{total} tests passed")

    if passed == total:
        print("🎉 All tests passed! Execution bridge is working.")
        return True
    else:
        print(f"⚠️ {total - passed} tests failed. Execution bridge needs attention.")
        return False

if __name__ == "__main__":
    # Run all tests
    success = asyncio.run(run_all_tests())
    sys.exit(0 if success else 1)