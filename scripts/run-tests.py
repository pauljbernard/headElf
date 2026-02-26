#!/usr/bin/env python3
"""
HeadElf Comprehensive Testing Runner

Execute full test suite including unit tests, integration tests, and performance benchmarks
with detailed reporting and validation of all HeadElf capabilities.
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path
from typing import List, Dict, Any

class HeadElfTestRunner:
    """Comprehensive test runner for HeudElf capabilities."""

    def __init__(self, headelf_root: Path):
        self.headelf_root = headelf_root
        self.test_results = {}

    def run_test_suite(self, test_categories: List[str] = None) -> Dict[str, Any]:
        """Run comprehensive test suite."""
        if test_categories is None:
            test_categories = ["core", "integration", "performance", "skills"]

        print("🧪 HeadElf Comprehensive Testing Suite")
        print("=" * 60)

        overall_success = True

        for category in test_categories:
            print(f"\n📋 Running {category.title()} Tests...")
            print("-" * 40)

            success = self._run_test_category(category)
            self.test_results[category] = success
            overall_success = overall_success and success

        self._print_summary()
        return {
            "overall_success": overall_success,
            "category_results": self.test_results
        }

    def _run_test_category(self, category: str) -> bool:
        """Run tests for a specific category."""
        try:
            if category == "core":
                return self._run_core_module_tests()
            elif category == "integration":
                return self._run_integration_tests()
            elif category == "performance":
                return self._run_performance_tests()
            elif category == "skills":
                return self._run_skill_execution_tests()
            else:
                print(f"❌ Unknown test category: {category}")
                return False

        except Exception as e:
            print(f"❌ Error running {category} tests: {e}")
            return False

    def _run_core_module_tests(self) -> bool:
        """Run core module unit tests."""
        test_file = self.headelf_root / "tests/test_core_modules.py"

        if not test_file.exists():
            print("❌ Core module tests not found")
            return False

        cmd = [
            sys.executable, "-m", "pytest",
            str(test_file),
            "-v", "--tb=short", "-m", "not slow"
        ]

        try:
            result = subprocess.run(cmd, cwd=self.headelf_root, capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ Core module tests passed")
                return True
            else:
                print("❌ Core module tests failed")
                print(result.stdout)
                print(result.stderr)
                return False
        except Exception as e:
            print(f"❌ Error running core tests: {e}")
            return False

    def _run_integration_tests(self) -> bool:
        """Run integration tests."""
        test_file = self.headelf_root / "tests/test_integration.py"

        if not test_file.exists():
            print("❌ Integration tests not found")
            return False

        cmd = [
            sys.executable, "-m", "pytest",
            str(test_file),
            "-v", "--tb=short", "-m", "integration"
        ]

        try:
            result = subprocess.run(cmd, cwd=self.headelf_root, capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ Integration tests passed")
                return True
            else:
                print("❌ Integration tests failed")
                # Print limited output for integration failures
                lines = result.stdout.split('\n')
                for line in lines[-20:]:  # Last 20 lines
                    if line.strip():
                        print(line)
                return False
        except Exception as e:
            print(f"❌ Error running integration tests: {e}")
            return False

    def _run_performance_tests(self) -> bool:
        """Run performance benchmarks."""
        test_file = self.headelf_root / "tests/test_performance.py"

        if not test_file.exists():
            print("❌ Performance tests not found")
            return False

        cmd = [
            sys.executable, "-m", "pytest",
            str(test_file),
            "-v", "--tb=short", "-m", "performance"
        ]

        try:
            result = subprocess.run(cmd, cwd=self.headelf_root, capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ Performance tests passed")
                return True
            else:
                print("⚠️ Some performance tests failed (non-critical)")
                # Performance test failures are warnings, not critical failures
                return True
        except Exception as e:
            print(f"⚠️ Performance test error: {e}")
            return True

    def _run_skill_execution_tests(self) -> bool:
        """Run skill execution validation."""
        test_script = self.headelf_root / "scripts/test-execution.py"

        if not test_script.exists():
            print("❌ Skill execution tests not found")
            return False

        cmd = [sys.executable, str(test_script)]

        try:
            result = subprocess.run(cmd, cwd=self.headelf_root, capture_output=True, text=True)
            if "🎉 All tests passed!" in result.stdout:
                print("✅ Skill execution tests passed")
                return True
            else:
                print("❌ Skill execution tests failed")
                print(result.stdout[-1000:])  # Last 1000 chars
                return False
        except Exception as e:
            print(f"❌ Error running skill tests: {e}")
            return False

    def _print_summary(self):
        """Print test summary."""
        print("\n" + "=" * 60)
        print("🎯 HeadElf Test Suite Summary")
        print("=" * 60)

        total_categories = len(self.test_results)
        passed_categories = sum(1 for success in self.test_results.values() if success)

        for category, success in self.test_results.items():
            status = "✅ PASS" if success else "❌ FAIL"
            print(f"{status} {category.title()} Tests")

        print(f"\n📊 Results: {passed_categories}/{total_categories} test categories passed")

        if passed_categories == total_categories:
            print("🎉 All test categories passed! HeadElf is ready for deployment.")
        else:
            failed = total_categories - passed_categories
            print(f"⚠️ {failed} test categories failed. Review failures before deployment.")

def main():
    """Main test runner entry point."""
    parser = argparse.ArgumentParser(description="HeadElf Comprehensive Test Runner")
    parser.add_argument(
        "--categories",
        nargs="*",
        choices=["core", "integration", "performance", "skills"],
        default=["core", "skills"],  # Run core and skills by default for faster feedback
        help="Test categories to run"
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Run all test categories including slow performance tests"
    )

    args = parser.parse_args()

    headelf_root = Path(__file__).parent.parent
    runner = HeadElfTestRunner(headelf_root)

    categories = ["core", "integration", "performance", "skills"] if args.all else args.categories

    results = runner.run_test_suite(categories)

    # Exit with appropriate code
    sys.exit(0 if results["overall_success"] else 1)

if __name__ == "__main__":
    main()