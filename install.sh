#!/bin/bash
# HeadElf Quick Installation Script
# Automated installation for Unix-like systems (macOS, Linux)

set -e

echo "🚀 HeadElf Quick Installation"
echo "============================="
echo "Comprehensive C-Suite Executive Intelligence System"
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check system requirements
check_requirements() {
    log_info "Checking system requirements..."

    # Python 3.9+
    if command_exists python3; then
        python_version=$(python3 --version | cut -d ' ' -f 2)
        log_success "Python $python_version found"
    else
        log_error "Python 3 not found. Please install Python 3.9 or higher."
        exit 1
    fi

    # Node.js 16+
    if command_exists node; then
        node_version=$(node --version)
        log_success "Node.js $node_version found"
    else
        log_error "Node.js not found. Please install Node.js 16 or higher."
        exit 1
    fi

    # npm
    if command_exists npm; then
        npm_version=$(npm --version)
        log_success "npm $npm_version found"
    else
        log_error "npm not found. Please install npm."
        exit 1
    fi

    # Git (optional)
    if command_exists git; then
        git_version=$(git --version)
        log_success "$git_version found"
    else
        log_warning "Git not found (optional but recommended)"
    fi
}

# Install Python dependencies
install_python_deps() {
    log_info "Installing Python dependencies..."

    if [ -f "requirements.txt" ]; then
        python3 -m pip install -r requirements.txt
        log_success "Python dependencies installed"
    else
        log_error "requirements.txt not found"
        exit 1
    fi
}

# Install Node.js dependencies
install_node_deps() {
    log_info "Installing Node.js dependencies..."

    if [ -f "package.json" ]; then
        npm install
        log_success "Node.js dependencies installed"

        log_info "Building TypeScript modules..."
        npm run build || log_warning "TypeScript build had issues (continuing anyway)"
        log_success "Build process completed"
    else
        log_error "package.json not found"
        exit 1
    fi
}

# Setup Claude Code integration
setup_claude_code() {
    log_info "Setting up Claude Code integration..."

    # Common Claude Code locations
    CLAUDE_DIRS=(
        "$HOME/.claude"
        "$HOME/.claude-code"
        "/opt/claude-code"
        "/usr/local/claude-code"
    )

    # Check environment variable first
    if [ -n "$CLAUDE_CODE_PATH" ]; then
        CLAUDE_DIRS=("$CLAUDE_CODE_PATH" "${CLAUDE_DIRS[@]}")
    fi

    CLAUDE_DIR=""
    for dir in "${CLAUDE_DIRS[@]}"; do
        if [ -d "$dir" ]; then
            CLAUDE_DIR="$dir"
            break
        fi
    done

    if [ -n "$CLAUDE_DIR" ]; then
        log_success "Found Claude Code directory: $CLAUDE_DIR"

        # Create extensions directory
        mkdir -p "$CLAUDE_DIR/extensions"

        # Create symbolic link
        EXTENSION_LINK="$CLAUDE_DIR/extensions/headelf"
        if [ -e "$EXTENSION_LINK" ]; then
            log_info "Removing existing HeadElf extension..."
            rm -rf "$EXTENSION_LINK"
        fi

        ln -s "$(pwd)" "$EXTENSION_LINK"
        log_success "HeadElf extension linked to Claude Code"
    else
        log_warning "Claude Code directory not found"
        log_info "You can manually link HeadElf to Claude Code later"
        log_info "Set CLAUDE_CODE_PATH environment variable or install to a standard location"
    fi
}

# Run validation tests
run_validation() {
    log_info "Running installation validation..."

    if [ -f "scripts/validate-installation.py" ]; then
        python3 scripts/validate-installation.py
        log_success "Installation validation completed"
    else
        log_warning "Validation script not found, skipping validation"
    fi
}

# Print usage information
print_usage() {
    echo
    log_success "🎉 HeadElf Installation Complete!"
    echo
    echo "📚 Next Steps:"
    echo "  1. Restart Claude Code to load HeadElf extension"
    echo "  2. Test installation: python3 scripts/validate-installation.py"
    echo "  3. Run tests: python3 scripts/run-tests.py"
    echo
    echo "💡 Usage Examples:"
    echo "  - 'Develop a technology strategy for our AI platform'"
    echo "  - 'Analyze M&A opportunities in fintech'"
    echo "  - 'Create a digital transformation roadmap'"
    echo
    echo "📖 Documentation:"
    echo "  - User Guide: https://pauljbernard.github.io/headElf/user-guide"
    echo "  - Examples: https://pauljbernard.github.io/headElf/examples"
    echo "  - GitHub: https://github.com/pauljbernard/headElf"
    echo
}

# Main installation process
main() {
    # Parse command line arguments
    SKIP_DEPS=false
    SKIP_CLAUDE=false
    SKIP_VALIDATION=false

    while [[ $# -gt 0 ]]; do
        case $1 in
            --skip-deps)
                SKIP_DEPS=true
                shift
                ;;
            --skip-claude-code)
                SKIP_CLAUDE=true
                shift
                ;;
            --skip-validation)
                SKIP_VALIDATION=true
                shift
                ;;
            --help|-h)
                echo "Usage: $0 [OPTIONS]"
                echo
                echo "Options:"
                echo "  --skip-deps          Skip dependency installation"
                echo "  --skip-claude-code   Skip Claude Code integration"
                echo "  --skip-validation    Skip validation tests"
                echo "  --help, -h          Show this help message"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                echo "Use --help for usage information"
                exit 1
                ;;
        esac
    done

    # Run installation steps
    check_requirements

    if [ "$SKIP_DEPS" != true ]; then
        install_python_deps
        install_node_deps
    else
        log_info "Skipping dependency installation"
    fi

    if [ "$SKIP_CLAUDE" != true ]; then
        setup_claude_code
    else
        log_info "Skipping Claude Code integration"
    fi

    if [ "$SKIP_VALIDATION" != true ]; then
        run_validation
    else
        log_info "Skipping validation tests"
    fi

    print_usage
}

# Run main installation
main "$@"