#!/usr/bin/env python3
"""
HeadElf Python Package Setup

Python package configuration for HeadElf C-Suite Executive Intelligence System
enabling pip installation and dependency management.
"""

from setuptools import setup, find_packages
from pathlib import Path
import os

# Read the README file for long description
README_PATH = Path(__file__).parent / "README.md"
if README_PATH.exists():
    with open(README_PATH, "r", encoding="utf-8") as fh:
        long_description = fh.read()
else:
    long_description = "Comprehensive C-Suite Executive Intelligence System for Claude Code"

# Read requirements
REQUIREMENTS_PATH = Path(__file__).parent / "requirements.txt"
requirements = []
if REQUIREMENTS_PATH.exists():
    with open(REQUIREMENTS_PATH, "r", encoding="utf-8") as fh:
        requirements = [line.strip() for line in fh if line.strip() and not line.startswith("#")]

# Read version from package
VERSION = "1.0.0"

setup(
    name="headelf",
    version=VERSION,
    author="HeadElf Executive Intelligence System",
    author_email="contact@headelf.ai",
    description="Comprehensive C-Suite Executive Intelligence System for Claude Code",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/pauljbernard/headElf",
    project_urls={
        "Bug Tracker": "https://github.com/pauljbernard/headElf/issues",
        "Documentation": "https://pauljbernard.github.io/headElf",
        "Source Code": "https://github.com/pauljbernard/headElf",
    },

    # Package discovery
    packages=find_packages(include=["skills", "skills.*", "scripts", "scripts.*"]),

    # Include additional files
    include_package_data=True,
    package_data={
        "": [
            "*.md",
            "*.yml",
            "*.yaml",
            "*.json",
            "*.ts",
            "*.js"
        ],
        "skills": [
            "**/skill.md",
            "**/metadata.yml",
            "**/__init__.py"
        ],
        "scripts": [
            "**/*.py",
            "**/*.js"
        ],
        "src": [
            "**/*.ts"
        ]
    },

    # Dependencies
    install_requires=requirements,

    # Optional dependencies for enhanced features
    extras_require={
        "dev": [
            "pytest>=7.2.0",
            "pytest-asyncio>=0.21.0",
            "black>=23.0.0",
            "flake8>=6.0.0",
            "mypy>=1.0.0"
        ],
        "enterprise": [
            "sqlalchemy>=2.0.0",
            "ldap3>=2.9.1",
            "cryptography>=40.0.0",
            "jwt>=1.3.1"
        ],
        "cloud": [
            "boto3>=1.26.0",
            "azure-identity>=1.12.0",
            "google-cloud>=0.34.0"
        ],
        "analytics": [
            "pandas>=2.0.0",
            "numpy>=1.24.0",
            "matplotlib>=3.7.0",
            "plotly>=5.13.0"
        ],
        "monitoring": [
            "prometheus-client>=0.16.0",
            "opentelemetry-api>=1.17.0"
        ]
    },

    # Python version requirement
    python_requires=">=3.9",

    # Classification
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "Intended Audience :: End Users/Desktop",
        "Topic :: Office/Business :: Financial :: Investment",
        "Topic :: Office/Business :: Office Suites",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Programming Language :: TypeScript",
        "Operating System :: OS Independent",
        "Environment :: Console",
        "Framework :: AsyncIO",
    ],

    # Keywords for discoverability
    keywords=[
        "claude-code",
        "executive-intelligence",
        "c-suite",
        "cto", "cio", "ciso", "cfo", "coo", "clo", "chro", "cmso", "cpo",
        "business-intelligence",
        "enterprise-architecture",
        "decision-making",
        "artificial-intelligence",
        "venture-capital",
        "mergers-acquisitions",
        "digital-transformation",
        "risk-management",
        "regulatory-compliance",
        "financial-analysis",
        "technology-strategy",
        "operational-excellence"
    ],

    # Entry points for command-line tools
    entry_points={
        "console_scripts": [
            "headelf-install=scripts.install:main",
            "headelf-test=scripts.run_tests:main",
            "headelf-validate=scripts.validate_installation:main"
        ]
    },

    # Data files to include
    data_files=[
        ("", ["headelf.yml", "README.md", "LICENSE"]),
        ("docs", ["docs/index.md"]),
    ],

    # Zip safe
    zip_safe=False,
)