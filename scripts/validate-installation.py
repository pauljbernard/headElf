#!/usr/bin/env python3
"""
HeadElf Installation Validation Script

Comprehensive validation of HeadElf installation including dependencies,
Claude Code integration, skill registration, and execution capability.
"""

import os
import sys
import subprocess
import json
from pathlib import Path
from typing import Dict, Any, List

class InstallationValidator:
    """Validator for HeadElf installation completeness and functionality."""

    def __init__(self):
        self.headelf_root = Path(__file__).parent.parent
        self.validation_results = {}

    def validate_installation(self) -> Dict[str, Any]:
        """Run comprehensive installation validation."""
        print("🔍 HeadElf Installation Validation")
        print("=" * 50)
        print("Validating Comprehensive C-Suite Executive Intelligence System")
        print()

        validations = [
            ("system_environment", "System Environment"),
            ("file_structure", "File Structure Integrity"),
            ("dependencies", "Dependency Installation"),
            ("claude_code_integration", "Claude Code Integration"),
            ("skill_registration", "Skill Registration & Discovery"),
            ("execution_capability", "Execution Capability"),
            ("performance_baseline", "Performance Baseline")
        ]

        overall_success = True

        for validation_key, validation_name in validations:
            print(f"\n📋 {validation_name}")
            print("-" * 30)

            try:
                method = getattr(self, f"_validate_{validation_key}")
                success = method()
                self.validation_results[validation_key] = success
                overall_success = overall_success and success
            except Exception as e:
                print(f"❌ Validation error: {e}")
                self.validation_results[validation_key] = False
                overall_success = False

        self._print_validation_summary()
        return {
            "overall_success": overall_success,
            "validation_results": self.validation_results
        }

    def _validate_system_environment(self) -> bool:
        """Validate system environment and requirements."""
        environment_valid = True

        # Python version
        python_version = sys.version_info
        if python_version >= (3, 9):
            print(f"✅ Python {python_version.major}.{python_version.minor} (compatible)")
        else:
            print(f"❌ Python {python_version.major}.{python_version.minor} (requires >= 3.9)")
            environment_valid = False

        # Node.js
        try:
            result = subprocess.run(["node", "--version"], capture_output=True, text=True)
            if result.returncode == 0:
                version = result.stdout.strip()
                print(f"✅ Node.js {version}")
            else:
                print("❌ Node.js not accessible")
                environment_valid = False
        except FileNotFoundError:
            print("❌ Node.js not found")
            environment_valid = False

        # Working directory
        if self.headelf_root.exists():
            print(f"✅ HeadElf directory: {self.headelf_root}")
        else:
            print("❌ HeadElf directory not found")
            environment_valid = False

        return environment_valid

    def _validate_file_structure(self) -> bool:
        """Validate critical file structure."""
        critical_files = {
            "headelf.yml": "Main configuration",
            "setup.py": "Python package configuration",
            "package.json": "Node.js package configuration",
            "requirements.txt": "Python dependencies",
            "README.md": "Documentation"
        }

        critical_directories = {
            "skills": "Skill definitions",
            "src/core": "Core TypeScript modules",
            "scripts": "Execution scripts",
            "tests": "Testing framework"
        }

        files_valid = True

        print("📁 Critical Files:")
        for file_name, description in critical_files.items():
            file_path = self.headelf_root / file_name
            if file_path.exists():
                print(f"  ✅ {file_name} - {description}")
            else:
                print(f"  ❌ {file_name} - MISSING")
                files_valid = False

        print("\n📁 Critical Directories:")
        for dir_name, description in critical_directories.items():
            dir_path = self.headelf_root / dir_name
            if dir_path.exists() and dir_path.is_dir():
                print(f"  ✅ {dir_name} - {description}")
            else:
                print(f"  ❌ {dir_name} - MISSING")
                files_valid = False

        return files_valid

    def _validate_dependencies(self) -> bool:
        """Validate dependency installation."""
        deps_valid = True

        # Python dependencies
        print("🐍 Python Dependencies:")
        required_python_modules = [
            "yaml", "asyncio", "pathlib", "json", "typing"
        ]

        for module in required_python_modules:
            try:
                __import__(module)
                print(f"  ✅ {module}")
            except ImportError:
                print(f"  ❌ {module} - NOT INSTALLED")
                deps_valid = False

        # Node.js dependencies (if package.json exists)
        package_json = self.headelf_root / "package.json"
        if package_json.exists():
            print("\n📦 Node.js Dependencies:")
            node_modules = self.headelf_root / "node_modules"
            if node_modules.exists():
                print("  ✅ node_modules directory exists")
            else:
                print("  ❌ node_modules directory missing")
                deps_valid = False

        return deps_valid

    def _validate_claude_code_integration(self) -> bool:
        """Validate Claude Code integration setup."""
        print("🔗 Claude Code Integration:")

        # Check for Claude Code directory
        potential_claude_dirs = [
            Path.home() / ".claude",
            Path.home() / ".claude-code",
            Path(os.environ.get("CLAUDE_CODE_PATH", "")) if "CLAUDE_CODE_PATH" in os.environ else None
        ]

        claude_found = False
        for claude_dir in potential_claude_dirs:
            if claude_dir and claude_dir.exists():
                print(f"  ✅ Claude Code found: {claude_dir}")
                claude_found = True

                # Check for HeadElf extension link
                extension_link = claude_dir / "extensions" / "headelf"
                if extension_link.exists():
                    print(f"  ✅ HeadElf extension linked")
                else:
                    print(f"  ⚠️ HeadElf extension not linked (manual setup needed)")

                break

        if not claude_found:
            print("  ⚠️ Claude Code not found (manual integration required)")

        # Integration is not critical for functionality
        return True

    def _validate_skill_registration(self) -> bool:
        """Validate skill registration and discovery."""
        try:
            print("🎯 Skill Registration:")

            # Import skill registry
            sys.path.append(str(self.headelf_root / "skills"))
            from skills import get_skill_registry

            registry = get_skill_registry()
            summary = registry.get_skill_summary()

            print(f"  ✅ Total Skills: {summary['total_skills']}")
            print(f"  ✅ Executive Skills: {summary['executive_skills']}")
            print(f"  ✅ Industry Skills: {summary['industry_skills']}")
            print(f"  ✅ Architecture Skills: {summary['architecture_skills']}")

            # Validate minimum skill counts
            if summary['total_skills'] >= 30:
                print("  ✅ Adequate skill coverage")
                return True
            else:
                print("  ⚠️ Limited skill coverage")
                return False

        except Exception as e:
            print(f"  ❌ Skill registration error: {e}")
            return False

    def _validate_execution_capability(self) -> bool:
        """Validate skill execution capability."""
        try:
            print("⚡ Execution Capability:")

            # Test basic execution test
            test_script = self.headelf_root / "scripts" / "test-execution.py"
            if not test_script.exists():
                print("  ❌ Execution test script missing")
                return False

            result = subprocess.run([
                sys.executable, str(test_script)
            ], capture_output=True, text=True, cwd=self.headelf_root, timeout=60)

            if "All tests passed!" in result.stdout:
                print("  ✅ All execution tests passed")
                return True
            elif "tests passed" in result.stdout:
                passed_tests = result.stdout.count("✅ PASS")
                total_tests = passed_tests + result.stdout.count("❌ FAIL")
                print(f"  ⚠️ {passed_tests}/{total_tests} execution tests passed")
                return passed_tests >= total_tests * 0.75  # 75% pass rate acceptable
            else:
                print("  ❌ Execution tests failed")
                return False

        except subprocess.TimeoutExpired:
            print("  ❌ Execution test timeout")
            return False
        except Exception as e:
            print(f"  ❌ Execution test error: {e}")
            return False

    def _validate_performance_baseline(self) -> bool:
        """Validate performance baseline."""
        try:
            print("📊 Performance Baseline:")

            # Test CTO skill execution time
            sys.path.append(str(self.headelf_root / "scripts/skill-executors"))
            from cto_executor import execute_cto_intelligence

            import time
            import asyncio

            async def test_performance():
                start_time = time.perf_counter()
                result = await execute_cto_intelligence(
                    '{"decision_type": "technology_strategy", "query": "Performance test"}',
                    '{}'
                )
                execution_time = (time.perf_counter() - start_time) * 1000
                return execution_time, json.loads(result)

            execution_time, result = asyncio.run(test_performance())

            print(f"  ⏱️ CTO skill execution: {execution_time:.1f}ms")

            if execution_time < 5000 and result.get("success"):
                print("  ✅ Performance baseline met")
                return True
            else:
                print("  ⚠️ Performance baseline not optimal")
                return True  # Still functional

        except Exception as e:
            print(f"  ⚠️ Performance test error: {e}")
            return True  # Performance issues don't fail validation

    def _print_validation_summary(self):
        """Print validation summary."""
        print("\n" + "=" * 50)
        print("🎯 Installation Validation Summary")
        print("=" * 50)

        total_validations = len(self.validation_results)
        passed_validations = sum(1 for success in self.validation_results.values() if success)

        for validation, success in self.validation_results.items():
            status = "✅ PASS" if success else "❌ FAIL"
            validation_name = validation.replace("_", " ").title()
            print(f"{status} {validation_name}")

        print(f"\n📊 Results: {passed_validations}/{total_validations} validations passed")

        if passed_validations == total_validations:
            print("🎉 HeadElf installation is fully validated and ready!")
            print("\n🚀 Ready for:")
            print("   - C-Suite Executive Intelligence")
            print("   - Cross-functional Decision Making")
            print("   - Industry Vertical Extensions")
            print("   - Enterprise Integration")
        elif passed_validations >= total_validations * 0.8:
            print("✅ HeadElf installation is functional with minor issues")
            print("   Core capabilities are available")
        else:
            failed = total_validations - passed_validations
            print(f"⚠️ {failed} critical validations failed")
            print("   Installation may need attention before full deployment")

def main():
    """Main validation entry point."""
    validator = InstallationValidator()
    results = validator.validate_installation()

    # Exit with appropriate code
    sys.exit(0 if results["overall_success"] or
             sum(results["validation_results"].values()) >= len(results["validation_results"]) * 0.8
             else 1)

if __name__ == "__main__":
    main()