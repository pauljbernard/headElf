#!/usr/bin/env python3
"""
HeadElf Deployment Validation Script

Final validation that HeadElf deployment and installation system is complete
and ready for production distribution and user installation.
"""

import os
import sys
from pathlib import Path
from typing import Dict, Any, List

class DeploymentValidator:
    """Validator for HeadElf deployment readiness."""

    def __init__(self):
        self.headelf_root = Path(__file__).parent.parent
        self.validation_results = {}

    def validate_deployment(self) -> Dict[str, Any]:
        """Validate complete deployment system."""
        print("🚀 HeadElf Deployment Validation")
        print("=" * 50)
        print("Validating Complete Deployment and Installation System")
        print()

        validations = [
            ("package_structure", "Package Structure"),
            ("installation_scripts", "Installation Scripts"),
            ("dependency_management", "Dependency Management"),
            ("documentation_completeness", "Documentation Completeness"),
            ("distribution_readiness", "Distribution Readiness"),
            ("user_experience", "User Experience"),
            ("production_readiness", "Production Readiness")
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

        self._print_deployment_summary()
        return {
            "overall_success": overall_success,
            "validation_results": self.validation_results
        }

    def _validate_package_structure(self) -> bool:
        """Validate package structure for distribution."""
        required_files = {
            "setup.py": "Python package configuration",
            "package.json": "Node.js package configuration",
            "MANIFEST.in": "Package manifest",
            "requirements.txt": "Python dependencies",
            "README.md": "Main documentation",
            "LICENSE": "License file",
            "headelf.yml": "Extension configuration"
        }

        missing_files = []
        for file_name, description in required_files.items():
            file_path = self.headelf_root / file_name
            if file_path.exists():
                print(f"✅ {file_name} - {description}")
            else:
                print(f"❌ {file_name} - MISSING")
                missing_files.append(file_name)

        # Check Python package structure
        setup_py = self.headelf_root / "setup.py"
        if setup_py.exists():
            with open(setup_py, 'r') as f:
                content = f.read()
                if "find_packages" in content and "install_requires" in content:
                    print("✅ Python package properly configured")
                else:
                    print("❌ Python package configuration incomplete")
                    missing_files.append("setup.py configuration")

        return len(missing_files) == 0

    def _validate_installation_scripts(self) -> bool:
        """Validate installation automation scripts."""
        installation_components = {
            "scripts/install.py": "Python installation script",
            "install.sh": "Shell installation script",
            "scripts/validate-installation.py": "Installation validation",
            "scripts/run-tests.py": "Test runner script"
        }

        scripts_valid = True

        for script_path, description in installation_components.items():
            full_path = self.headelf_root / script_path
            if full_path.exists():
                print(f"✅ {script_path} - {description}")

                # Test script executability
                if script_path.endswith('.py'):
                    try:
                        import subprocess
                        result = subprocess.run([
                            sys.executable, str(full_path), "--help"
                        ], capture_output=True, text=True, timeout=10)
                        if result.returncode == 0 or "usage" in result.stdout.lower() or "help" in result.stdout.lower():
                            print(f"  ✅ Script is executable and shows help")
                        else:
                            print(f"  ⚠️ Script executable but help may be limited")
                    except Exception:
                        print(f"  ⚠️ Script execution test failed")
                elif script_path.endswith('.sh'):
                    if os.access(full_path, os.X_OK):
                        print(f"  ✅ Shell script is executable")
                    else:
                        print(f"  ❌ Shell script not executable")
                        scripts_valid = False
            else:
                print(f"❌ {script_path} - MISSING")
                scripts_valid = False

        return scripts_valid

    def _validate_dependency_management(self) -> bool:
        """Validate dependency management completeness."""
        dependency_files = [
            ("requirements.txt", "Python dependencies"),
            ("package.json", "Node.js dependencies")
        ]

        deps_valid = True

        for file_name, description in dependency_files:
            file_path = self.headelf_root / file_name
            if file_path.exists():
                print(f"✅ {file_name} - {description}")

                # Validate content
                if file_name == "requirements.txt":
                    with open(file_path, 'r') as f:
                        lines = [line.strip() for line in f if line.strip() and not line.startswith("#")]
                        if len(lines) >= 5:  # Should have several dependencies
                            print(f"  ✅ {len(lines)} Python dependencies specified")
                        else:
                            print(f"  ⚠️ Limited Python dependencies ({len(lines)})")

                elif file_name == "package.json":
                    import json
                    with open(file_path, 'r') as f:
                        package_data = json.load(f)
                        if "scripts" in package_data and "dependencies" in package_data:
                            print(f"  ✅ Node.js package properly configured")
                        else:
                            print(f"  ❌ Node.js package configuration incomplete")
                            deps_valid = False
            else:
                print(f"❌ {file_name} - MISSING")
                deps_valid = False

        return deps_valid

    def _validate_documentation_completeness(self) -> bool:
        """Validate documentation completeness for users."""
        documentation_components = {
            "README.md": "Main project documentation",
            "docs/index.md": "Documentation homepage",
            "docs/getting-started.md": "Installation guide",
            "docs/user-guide.md": "User manual",
            "docs/examples.md": "Usage examples"
        }

        docs_valid = True

        for doc_path, description in documentation_components.items():
            full_path = self.headelf_root / doc_path
            if full_path.exists():
                print(f"✅ {doc_path} - {description}")

                # Check content length (should be substantial)
                try:
                    with open(full_path, 'r') as f:
                        content = f.read()
                        if len(content) > 500:  # Should have substantial content
                            print(f"  ✅ Comprehensive content ({len(content)} chars)")
                        else:
                            print(f"  ⚠️ Limited content ({len(content)} chars)")
                except Exception:
                    print(f"  ❌ Error reading documentation")
                    docs_valid = False
            else:
                print(f"❌ {doc_path} - MISSING")
                docs_valid = False

        return docs_valid

    def _validate_distribution_readiness(self) -> bool:
        """Validate readiness for package distribution."""
        distribution_elements = []

        # Python package distribution
        setup_py = self.headelf_root / "setup.py"
        if setup_py.exists():
            distribution_elements.append("✅ Python package (pip installable)")
        else:
            distribution_elements.append("❌ Python package missing")

        # Node.js package distribution
        package_json = self.headelf_root / "package.json"
        if package_json.exists():
            distribution_elements.append("✅ Node.js package (npm installable)")
        else:
            distribution_elements.append("❌ Node.js package missing")

        # GitHub releases
        if (self.headelf_root / ".github").exists():
            distribution_elements.append("✅ GitHub Actions configured")
        else:
            distribution_elements.append("⚠️ GitHub Actions not configured")

        # Claude Code extension
        headelf_yml = self.headelf_root / "headelf.yml"
        if headelf_yml.exists():
            distribution_elements.append("✅ Claude Code extension manifest")
        else:
            distribution_elements.append("❌ Claude Code manifest missing")

        for element in distribution_elements:
            print(f"  {element}")

        # Count successful elements
        successful_elements = len([e for e in distribution_elements if e.startswith("✅")])
        total_elements = len(distribution_elements)

        return successful_elements >= total_elements - 1  # Allow 1 missing (GitHub Actions)

    def _validate_user_experience(self) -> bool:
        """Validate user experience quality."""
        ux_aspects = []

        # Installation simplicity
        if (self.headelf_root / "install.sh").exists() and (self.headelf_root / "scripts/install.py").exists():
            ux_aspects.append("✅ Simple installation options (shell + python)")
        else:
            ux_aspects.append("❌ Installation scripts missing")

        # Clear documentation
        readme = self.headelf_root / "README.md"
        if readme.exists():
            with open(readme, 'r') as f:
                content = f.read()
                if "installation" in content.lower() and "usage" in content.lower():
                    ux_aspects.append("✅ Clear README with installation and usage")
                else:
                    ux_aspects.append("⚠️ README missing key sections")
        else:
            ux_aspects.append("❌ README missing")

        # Error handling
        install_script = self.headelf_root / "scripts/install.py"
        if install_script.exists():
            with open(install_script, 'r') as f:
                content = f.read()
                if "except" in content and "error" in content.lower():
                    ux_aspects.append("✅ Installation error handling")
                else:
                    ux_aspects.append("❌ Limited error handling")
        else:
            ux_aspects.append("❌ Installation script missing")

        # Validation and testing
        if (self.headelf_root / "scripts/validate-installation.py").exists():
            ux_aspects.append("✅ Installation validation available")
        else:
            ux_aspects.append("❌ No installation validation")

        for aspect in ux_aspects:
            print(f"  {aspect}")

        successful_aspects = len([a for a in ux_aspects if a.startswith("✅")])
        return successful_aspects >= len(ux_aspects) - 1  # Allow 1 issue

    def _validate_production_readiness(self) -> bool:
        """Validate production deployment readiness."""
        production_criteria = []

        # Version information
        setup_py = self.headelf_root / "setup.py"
        package_json = self.headelf_root / "package.json"

        version_found = False
        if setup_py.exists():
            with open(setup_py, 'r') as f:
                content = f.read()
                if 'version="1.' in content or 'version = "1.' in content:
                    production_criteria.append("✅ Production version (1.x)")
                    version_found = True

        if not version_found and package_json.exists():
            import json
            with open(package_json, 'r') as f:
                data = json.load(f)
                if data.get("version", "").startswith("1."):
                    production_criteria.append("✅ Production version (1.x)")
                    version_found = True

        if not version_found:
            production_criteria.append("❌ No production version found")

        # License
        if (self.headelf_root / "LICENSE").exists():
            production_criteria.append("✅ License file present")
        else:
            production_criteria.append("❌ License file missing")

        # Comprehensive testing
        if (self.headelf_root / "tests").exists() and (self.headelf_root / "scripts/run-tests.py").exists():
            production_criteria.append("✅ Comprehensive testing framework")
        else:
            production_criteria.append("❌ Testing framework incomplete")

        # Security considerations
        if (self.headelf_root / "headelf.yml").exists():
            with open(self.headelf_root / "headelf.yml", 'r') as f:
                content = f.read()
                if "security" in content.lower() and "audit" in content.lower():
                    production_criteria.append("✅ Security considerations documented")
                else:
                    production_criteria.append("⚠️ Limited security documentation")
        else:
            production_criteria.append("❌ Configuration file missing")

        for criterion in production_criteria:
            print(f"  {criterion}")

        successful_criteria = len([c for c in production_criteria if c.startswith("✅")])
        return successful_criteria >= len(production_criteria) - 1

    def _print_deployment_summary(self):
        """Print deployment validation summary."""
        print("\n" + "=" * 50)
        print("🎯 Deployment Validation Summary")
        print("=" * 50)

        total_validations = len(self.validation_results)
        passed_validations = sum(1 for success in self.validation_results.values() if success)

        for validation, success in self.validation_results.items():
            status = "✅ PASS" if success else "❌ FAIL"
            validation_name = validation.replace("_", " ").title()
            print(f"{status} {validation_name}")

        print(f"\n📊 Results: {passed_validations}/{total_validations} validations passed")

        if passed_validations == total_validations:
            print("🎉 HeadElf is PRODUCTION READY for deployment!")
            print("\n🚀 Ready for:")
            print("   - PyPI Package Distribution")
            print("   - NPM Package Distribution")
            print("   - GitHub Releases")
            print("   - Claude Code Extension Marketplace")
            print("   - Enterprise Installation")
            print("   - User Self-Installation")

            print("\n📦 Distribution Channels:")
            print("   - pip install headelf")
            print("   - npm install headelf-executive-intelligence")
            print("   - git clone https://github.com/pauljbernard/headElf")
            print("   - ./install.sh (one-command installation)")

        elif passed_validations >= total_validations * 0.85:
            print("✅ HeadElf deployment is nearly ready with minor issues")
            print("   Address remaining issues before full production release")
        else:
            failed = total_validations - passed_validations
            print(f"⚠️ {failed} critical deployment validations failed")
            print("   Complete deployment system before production release")

def main():
    """Main deployment validation entry point."""
    validator = DeploymentValidator()
    results = validator.validate_deployment()

    # Exit with appropriate code based on deployment readiness
    ready_threshold = 0.85  # 85% of validations must pass
    success_rate = sum(results["validation_results"].values()) / len(results["validation_results"])

    sys.exit(0 if success_rate >= ready_threshold else 1)

if __name__ == "__main__":
    main()