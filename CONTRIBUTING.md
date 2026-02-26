# Contributing to HeadElf

Thank you for your interest in contributing to HeadElf, the comprehensive C-Suite Executive Intelligence System for Claude Code!

## Two Contribution Models

HeadElf supports two distinct contribution models based on your use case:

### 1. Framework Contributors 🛠️

**For developers enhancing the core HeadElf framework itself:**

```bash
# Clone the main HeadElf repository
git clone https://github.com/pauljbernard/headElf.git
cd headElf

# Install dependencies and set up development environment
./install.sh
npm install
pip install -r requirements.txt

# Make your changes to core framework
# - Add new C-suite executive capabilities
# - Enhance existing intelligence modules
# - Improve architecture and performance
# - Add new testing frameworks

# Commit and push your changes
git add .
git commit -m "feat: Add new CFO risk assessment framework"
git push origin feature/cfo-risk-assessment

# Submit pull request for review
```

### 2. Extension Contributors 🔌

**For domain experts contributing industry verticals or enterprise contexts:**

```bash
# Create your own extension repository
git init my-headelf-extension-fintech
cd my-headelf-extension-fintech

# Follow HeudElf extension template
# (Details in Extension Development Guide)

# Publish your extension
git remote add origin https://github.com/yourusername/headelf-extension-fintech
git push origin main

# Register with HeadElf marketplace
# (Submit PR to main HeadElf registry)
```

## Development Setup

### Prerequisites

- **Python 3.9+** with pip
- **Node.js 16+** with npm
- **Git** with GitHub account
- **Claude Code** installed and configured

### Local Development

1. **Clone and Setup:**
   ```bash
   git clone https://github.com/pauljbernard/headElf.git
   cd headElf
   ./install.sh --dev
   ```

2. **Run Tests:**
   ```bash
   python3 scripts/run-tests.py --all
   npm test
   ```

3. **Validate Installation:**
   ```bash
   python3 scripts/validate-installation.py
   python3 scripts/validate-git-architecture.py
   ```

## Contribution Guidelines

### Code Standards

- **TypeScript:** Use strict mode with comprehensive interfaces
- **Python:** Follow PEP 8 with type hints
- **Documentation:** Include comprehensive docstrings and comments
- **Testing:** Maintain 80%+ test coverage for new code

### Git Workflow

1. **Branch naming:**
   - `feat/description` for new features
   - `fix/description` for bug fixes
   - `docs/description` for documentation
   - `test/description` for testing improvements

2. **Commit messages:**
   ```
   type(scope): brief description

   Detailed explanation if needed

   - Bullet points for specific changes
   - Reference issues: Fixes #123
   ```

3. **Pull Request Process:**
   - Create descriptive PR title and description
   - Link to relevant issues
   - Ensure all tests pass
   - Request review from maintainers

### Areas for Contribution

#### Core Framework (Framework Contributors)

- **Executive Intelligence Modules:**
  - Enhance existing C-suite capabilities (CTO, CIO, CISO, CFO, COO, CLO, CHRO, CMSO, CPO)
  - Add new decision-making frameworks
  - Improve cross-functional coordination

- **Architecture & Performance:**
  - Optimize TypeScript execution performance
  - Enhance Git-based persistence system
  - Improve security and access control

- **Testing & Quality:**
  - Add comprehensive test coverage
  - Create performance benchmarks
  - Enhance validation frameworks

#### Extensions (Extension Contributors)

- **Industry Verticals:**
  - Financial Services (banking, insurance, investments)
  - Healthcare (hospitals, medical devices, pharma)
  - Manufacturing (automotive, aerospace, industrial)
  - Technology (SaaS, hardware, telecommunications)
  - Energy (oil & gas, renewables, utilities)

- **Enterprise Contexts:**
  - Startup patterns and frameworks
  - Enterprise organizational models
  - Multinational corporation contexts
  - Public company governance patterns
  - Private equity operational models

- **Specialized Capabilities:**
  - Regulatory compliance frameworks
  - Crisis management procedures
  - M&A integration playbooks
  - Digital transformation methodologies

## Extension Development

### Creating New Extensions

1. **Extension Structure:**
   ```
   headelf-extension-[name]/
   ├── headelf.extension.json     # Extension metadata
   ├── README.md                  # Documentation
   ├── skills/                    # Extension skills
   │   └── [skill-name]/
   │       ├── skill.md
   │       └── metadata.yml
   ├── src/                       # TypeScript implementation
   ├── install.sh                 # Installation script
   └── tests/                     # Test suite
   ```

2. **Extension Metadata (headelf.extension.json):**
   ```json
   {
     "name": "headelf-extension-financial-services",
     "version": "1.0.0",
     "description": "Financial services industry vertical",
     "author": "Your Name",
     "repository": "https://github.com/yourusername/headelf-extension-financial-services",
     "license": "MIT",
     "keywords": ["financial-services", "banking", "compliance"],
     "headelfVersion": ">=1.0.0",
     "supportedRoles": ["CFO", "CISO", "CLO"],
     "industries": ["financial-services"],
     "dependencies": {}
   }
   ```

3. **Quality Standards:**
   - Comprehensive documentation with real-world examples
   - Privacy-preserving anonymization for enterprise contexts
   - Thorough testing with industry-specific scenarios
   - Compliance with relevant regulations and standards

## Security and Privacy

### Security Guidelines

- **No Secrets in Code:** Never commit API keys, passwords, or sensitive data
- **Privacy by Design:** Anonymize all enterprise-specific information
- **Access Control:** Use GitHub's permission model for access control
- **Audit Trail:** Leverage Git commit history for comprehensive auditing

### Data Handling

- **Decision Data:** Store in structured JSON/YAML with anonymization
- **User Context:** Include only non-sensitive organizational patterns
- **Extensions:** Ensure industry compliance requirements are met

## Community

### Communication Channels

- **GitHub Issues:** Bug reports and feature requests
- **GitHub Discussions:** General questions and community discussion
- **GitHub Wiki:** Collaborative documentation
- **Documentation Site:** https://pauljbernard.github.io/headElf

### Community Standards

- **Respectful Communication:** Professional, inclusive, and constructive
- **Collaborative Spirit:** Help others succeed and learn
- **Quality Focus:** Maintain high standards for code and documentation
- **Executive Focus:** Remember that end users are C-suite executives

## Recognition

Contributors will be recognized through:

- **Contributors list** in README.md
- **Release notes** acknowledgments
- **Extension marketplace** author attribution
- **Community highlights** for significant contributions

## Questions?

- **Documentation:** https://pauljbernard.github.io/headElf
- **Issues:** https://github.com/pauljbernard/headElf/issues
- **Discussions:** https://github.com/pauljbernard/headElf/discussions

---

By contributing to HeadElf, you're helping create the most comprehensive C-Suite Executive Intelligence System available, enabling better business decisions through world-class executive expertise.

Thank you for your contribution! 🚀