#!/bin/bash
# Vibe - Claude Code Startup Script
# Starts Claude with project context and auto-deploys extensions

set -e  # Exit on error

# Get script directory (project root)
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "📚 Starting Claude in Vibe project..."
echo "📁 Project: $PROJECT_DIR"

# Preflight check: Verify required tools
echo "🔍 Preflight check..."
MISSING_TOOLS=""
for tool in git node npm gh; do
    if ! command -v $tool &> /dev/null; then
        MISSING_TOOLS="$MISSING_TOOLS $tool"
    fi
done

if [ -n "$MISSING_TOOLS" ]; then
    echo "❌ Error: Missing required tools:$MISSING_TOOLS"
    echo "Install with: brew install$MISSING_TOOLS"
    exit 1
fi
echo "✅ All required tools installed"

# Change to project directory
cd "$PROJECT_DIR"

# Show current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "🌿 Current branch: $CURRENT_BRANCH"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules not found. Run 'npm install' first."
    read -p "Install dependencies now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📦 Installing dependencies..."
        npm install
        if [ $? -ne 0 ]; then
            echo "❌ Error: Failed to install dependencies"
            exit 1
        fi
        echo "✅ Dependencies installed"
    else
        echo "⚠️  Continuing without dependencies. Some features may not work."
    fi
fi

# Deploy Claude Code extensions (if changed)
if [ -d "claude_extensions" ]; then
    echo "🔧 Deploying Claude Code extensions..."
    ./claude_extensions/deploy.sh --quiet
    if [ $? -eq 0 ]; then
        echo "✅ Extensions deployed"
    else
        echo "⚠️  Extension deployment had issues"
    fi
fi

# Show Node.js version
NODE_VERSION=$(node --version)
echo "✅ Node.js: $NODE_VERSION"

# Show helpful reminders based on branch
case "$CURRENT_BRANCH" in
    main)
        echo ""
        echo "🚀 MAIN BRANCH - Production-ready code"
        echo "  • Version: 1.0.0"
        echo "  • Deployed: https://krisztiankoos.github.io/vibe/"
        echo "  • Before committing: Run /test and /security-check"
        ;;
    develop|dev)
        echo ""
        echo "⚙️  DEV BRANCH - Development environment"
        echo "  • Test new features here"
        echo "  • Run npm run dev for local server"
        ;;
    feature/*)
        echo ""
        echo "🔨 FEATURE BRANCH - Working on: ${CURRENT_BRANCH#feature/}"
        echo "  • Remember to test thoroughly"
        echo "  • Use /test before creating PR"
        ;;
    *)
        echo ""
        echo "📍 Current branch: $CURRENT_BRANCH"
        ;;
esac

# Show quick tips
echo ""
echo "💡 Quick Tips:"
echo "  • Type / to see available slash commands"
echo "  • Use /test before committing changes"
echo "  • Check CLAUDE.md for quick reference"
echo "  • See docs/guides/DEVELOPMENT_GUIDE.md for detailed workflows"

# Show available skills (if any deployed)
if [ -d ".claude/skills" ]; then
    SKILL_COUNT=$(find .claude/skills -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')
    if [ "$SKILL_COUNT" -gt 0 ]; then
        echo ""
        echo "🎓 Available Teaching Skills:"
        find .claude/skills -mindepth 1 -maxdepth 1 -type d | while read -r skill_dir; do
            skill_name=$(basename "$skill_dir")
            echo "  • $skill_name"
        done
    fi
fi

# Check build status
if [ -d "dist" ]; then
    echo "✅ Production build exists (npm run build)"
else
    echo "ℹ️  No production build found. Run 'npm run build' to create one."
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  You have uncommitted changes"
fi

# Start Claude
echo ""
echo "🤖 Launching Claude Code..."
echo ""
claude "$@"
