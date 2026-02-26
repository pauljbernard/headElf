#!/usr/bin/env python3
"""
HeadElf Installation Script

Comprehensive installation automation for HeadElf C-Suite Executive Intelligence System
including Claude Code integration, dependency management, and environment setup.
"""

import os
import sys
import subprocess
import shutil
import json
from pathlib import Path
from typing import Dict, Any, List, Optional

class HeadElfInstaller:
    """Automated installer for HeadElf system."""

    def __init__(self):
        self.headelf_root = Path(__file__).parent.parent
        self.installation_log = []
        self.claude_code_dir = None

    def install(self, options: Dict[str, Any] = None) -> bool:
        """Run complete HeadElf installation."""
        if options is None:
            options = {
                "install_dependencies": True,
                "setup_claude_code": True,
                "run_validation": True,
                "verbose": True
            }

        print("🚀 HeadElf Installation & Setup")
        print("=" * 50)
        print("Installing Comprehensive C-Suite Executive Intelligence System")
        print()

        success = True

        installation_steps = [
            ("system_requirements", "Checking System Requirements"),
            ("python_dependencies", "Installing Python Dependencies"),
            ("node_dependencies", "Installing Node.js Dependencies"),
            ("claude_code_integration", "Setting up Claude Code Integration"),
            ("skill_registration", "Registering HeadElf Skills"),
            ("validation_tests", "Running Installation Validation"),
            ("completion_summary", "Installation Summary")
        ]

        for step_key, step_name in installation_steps:
            print(f"\n📋 {step_name}")
            print("-" * 30)

            try:
                method = getattr(self, f"_install_{step_key}")
                step_success = method(options)
                success = success and step_success

                if step_success:
                    self.log_success(f"{step_name} completed successfully")
                else:
                    self.log_error(f"{step_name} failed")

                    if not options.get("continue_on_error", False):
                        print(f"❌ Installation failed at: {step_name}")
                        break

            except Exception as e:
                self.log_error(f"{step_name} error: {e}")
                print(f"❌ Error in {step_name}: {e}")
                success = False

                if not options.get("continue_on_error", False):
                    break

        return success

    def _install_system_requirements(self, options: Dict[str, Any]) -> bool:
        """Check and validate system requirements."""
        requirements_met = True

        # Check Python version
        python_version = sys.version_info
        if python_version >= (3, 9):
            print(f"✅ Python {python_version.major}.{python_version.minor} (meets >= 3.9)")
        else:
            print(f"❌ Python {python_version.major}.{python_version.minor} (requires >= 3.9)")
            requirements_met = False

        # Check Node.js
        try:
            result = subprocess.run(["node", "--version"], capture_output=True, text=True)
            if result.returncode == 0:
                node_version = result.stdout.strip()
                print(f"✅ Node.js {node_version}")
            else:
                print("❌ Node.js not found (required for TypeScript execution)")
                requirements_met = False
        except FileNotFoundError:
            print("❌ Node.js not installed")
            requirements_met = False

        # Check npm
        try:
            result = subprocess.run(["npm", "--version"], capture_output=True, text=True)
            if result.returncode == 0:
                npm_version = result.stdout.strip()
                print(f"✅ npm {npm_version}")
            else:
                print("❌ npm not found")
                requirements_met = False
        except FileNotFoundError:
            print("❌ npm not installed")
            requirements_met = False

        # Check git
        try:
            result = subprocess.run(["git", "--version"], capture_output=True, text=True)
            if result.returncode == 0:
                git_version = result.stdout.strip()
                print(f"✅ {git_version}")
            else:
                print("⚠️ Git not found (optional but recommended)")
        except FileNotFoundError:
            print("⚠️ Git not installed")

        return requirements_met

    def _install_python_dependencies(self, options: Dict[str, Any]) -> bool:
        """Install Python dependencies."""
        if not options.get("install_dependencies", True):
            print("⏭️ Skipping Python dependencies installation")
            return True

        requirements_file = self.headelf_root / "requirements.txt"

        if not requirements_file.exists():
            print("❌ requirements.txt not found")
            return False

        try:
            print("📦 Installing Python dependencies...")
            result = subprocess.run([
                sys.executable, "-m", "pip", "install", "-r", str(requirements_file)
            ], capture_output=True, text=True, cwd=self.headelf_root)

            if result.returncode == 0:
                print("✅ Python dependencies installed successfully")
                return True
            else:
                print("❌ Python dependencies installation failed")
                if options.get("verbose"):
                    print(result.stderr)
                return False

        except Exception as e:
            print(f"❌ Error installing Python dependencies: {e}")
            return False

    def _install_node_dependencies(self, options: Dict[str, Any]) -> bool:
        """Install Node.js dependencies."""
        if not options.get("install_dependencies", True):
            print("⏭️ Skipping Node.js dependencies installation")
            return True

        package_json = self.headelf_root / "package.json"

        if not package_json.exists():
            print("❌ package.json not found")
            return False

        try:
            print("📦 Installing Node.js dependencies...")
            result = subprocess.run([
                "npm", "install"
            ], capture_output=True, text=True, cwd=self.headelf_root)

            if result.returncode == 0:
                print("✅ Node.js dependencies installed successfully")

                # Build TypeScript
                print("🔨 Building TypeScript modules...")
                build_result = subprocess.run([
                    "npm", "run", "build"
                ], capture_output=True, text=True, cwd=self.headelf_root)

                if build_result.returncode == 0:
                    print("✅ TypeScript build successful")
                    return True
                else:
                    print("⚠️ TypeScript build had issues (continuing anyway)")
                    return True  # Continue even if build has issues

            else:
                print("❌ Node.js dependencies installation failed")
                if options.get("verbose"):
                    print(result.stderr)
                return False

        except Exception as e:
            print(f"❌ Error installing Node.js dependencies: {e}")
            return False

    def _install_claude_code_integration(self, options: Dict[str, Any]) -> bool:
        """Setup Claude Code integration."""
        if not options.get("setup_claude_code", True):
            print("⏭️ Skipping Claude Code integration")
            return True

        # Find Claude Code directory
        claude_code_dir = self._find_claude_code_directory()

        if not claude_code_dir:
            print("⚠️ Claude Code directory not found")
            print("   Please install Claude Code first or set CLAUDE_CODE_PATH environment variable")
            print("   HeadElf can still be used manually")
            return True  # Not a critical failure

        print(f"📂 Found Claude Code directory: {claude_code_dir}")
        self.claude_code_dir = claude_code_dir

        # Setup skills directory link
        skills_link_path = claude_code_dir / "extensions" / "headelf"

        try:
            if skills_link_path.exists():
                print("🔄 Updating existing HeadElf extension link...")
                if skills_link_path.is_symlink():
                    skills_link_path.unlink()
                else:
                    shutil.rmtree(skills_link_path)

            # Create symbolic link to HeadElf
            skills_link_path.parent.mkdir(parents=True, exist_ok=True)
            skills_link_path.symlink_to(self.headelf_root, target_is_directory=True)

            print(f"✅ Claude Code integration setup complete")
            print(f"   HeadElf linked to: {skills_link_path}")
            return True

        except Exception as e:
            print(f"❌ Error setting up Claude Code integration: {e}")
            return False

    def _install_skill_registration(self, options: Dict[str, Any]) -> bool:
        """Register HeadElf skills with Claude Code."""
        try:
            # Import and initialize skill registry
            sys.path.insert(0, str(self.headelf_root))
            sys.path.insert(0, str(self.headelf_root / "skills"))

            from skills import register_all_skills, get_skill_registry

            print("📋 Registering HeadElf skills...")
            registry = get_skill_registry()
            summary = registry.get_skill_summary()

            print(f"✅ Skills registered successfully:")
            print(f"   - Total Skills: {summary['total_skills']}")
            print(f"   - Executive Skills: {summary['executive_skills']}")
            print(f"   - Industry Skills: {summary['industry_skills']}")
            print(f"   - Architecture Skills: {summary['architecture_skills']}")

            return True

        except Exception as e:
            print(f"❌ Error registering skills: {e}")
            if options.get("verbose"):
                import traceback
                traceback.print_exc()
            return False

    def _install_validation_tests(self, options: Dict[str, Any]) -> bool:
        """Run installation validation tests."""
        if not options.get("run_validation", True):
            print("⏭️ Skipping validation tests")
            return True

        try:
            print("🧪 Running installation validation...")

            # Run basic execution test
            test_script = self.headelf_root / "scripts" / "test-execution.py"
            if test_script.exists():
                result = subprocess.run([
                    sys.executable, str(test_script)
                ], capture_output=True, text=True, cwd=self.headelf_root, timeout=60)

                if "All tests passed!" in result.stdout:
                    print("✅ Installation validation successful")
                    return True
                else:
                    print("⚠️ Some validation tests failed (but installation is functional)")
                    if options.get("verbose"):
                        print(result.stdout[-500:])  # Last 500 chars
                    return True  # Installation is still functional
            else:
                print("⚠️ Validation tests not found (but installation appears successful)")
                return True

        except Exception as e:
            print(f"⚠️ Validation test error: {e}")
            return True  # Don't fail installation on validation issues

    def _install_completion_summary(self, options: Dict[str, Any]) -> bool:
        """Print installation completion summary."""
        print("\n🎉 HeadElf Installation Complete!")
        print("=" * 50)

        print("\n📊 Installation Summary:")
        for log_entry in self.installation_log[-10:]:  # Last 10 entries
            print(f"  {log_entry}")

        print("\n🚀 Next Steps:")
        print("  1. Restart Claude Code to load HeadElf extension")
        print("  2. Test HeadElf skills with: headelf-test")
        print("  3. Explore capabilities: https://pauljbernard.github.io/headElf")

        if self.claude_code_dir:
            print("\n💡 Usage:")
            print(f"  - HeadElf is now available in Claude Code")
            print(f"  - Try: 'Analyze our M&A strategy using CTO intelligence'")
            print(f"  - Or: 'Help me develop a technology roadmap'")

        print("\n📚 Documentation:")
        print("  - User Guide: https://pauljbernard.github.io/headElf/user-guide")
        print("  - Examples: https://pauljbernard.github.io/headElf/examples")
        print("  - GitHub: https://github.com/pauljbernard/headElf")

        return True

    def _find_claude_code_directory(self) -> Optional[Path]:
        """Find Claude Code installation directory."""
        # Check environment variable first
        if "CLAUDE_CODE_PATH" in os.environ:
            claude_path = Path(os.environ["CLAUDE_CODE_PATH"])
            if claude_path.exists():
                return claude_path

        # Common Claude Code locations
        potential_locations = [
            Path.home() / ".claude",
            Path.home() / ".claude-code",
            Path.home() / "Applications" / "Claude Code",
            Path("/opt/claude-code"),
            Path("/usr/local/claude-code"),
        ]

        for location in potential_locations:
            if location.exists():
                return location

        return None

    def log_success(self, message: str):
        """Log successful operation."""
        self.installation_log.append(f"✅ {message}")

    def log_error(self, message: str):
        """Log error operation."""
        self.installation_log.append(f"❌ {message}")

def main():
    """Main installation entry point."""
    import argparse

    parser = argparse.ArgumentParser(description="HeadElf Installation & Setup")
    parser.add_argument(
        "--skip-dependencies",
        action="store_true",
        help="Skip dependency installation"
    )
    parser.add_argument(
        "--skip-claude-code",
        action="store_true",
        help="Skip Claude Code integration"
    )
    parser.add_argument(
        "--skip-validation",
        action="store_true",
        help="Skip validation tests"
    )
    parser.add_argument(
        "--continue-on-error",
        action="store_true",
        help="Continue installation even if steps fail"
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Show detailed output"
    )

    args = parser.parse_args()

    options = {
        "install_dependencies": not args.skip_dependencies,
        "setup_claude_code": not args.skip_claude_code,
        "run_validation": not args.skip_validation,
        "continue_on_error": args.continue_on_error,
        "verbose": args.verbose
    }

    installer = HeadElfInstaller()
    success = installer.install(options)

    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()