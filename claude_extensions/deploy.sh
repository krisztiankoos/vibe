#!/bin/bash
# Deploy Claude Code extensions from version-controlled source to .claude/ directory

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Get project root (directory containing this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SOURCE_DIR="$SCRIPT_DIR"
TARGET_DIR="$PROJECT_ROOT/.claude"

QUIET=false
DRY_RUN=false
DEPLOYED_COUNT=0
WARNINGS=0

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --quiet|-q)
            QUIET=true
            shift
            ;;
        --dry-run|-n)
            DRY_RUN=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Deploy Claude Code extensions from claude_extensions/ to .claude/"
            echo ""
            echo "Options:"
            echo "  --quiet, -q     Minimal output"
            echo "  --dry-run, -n   Show what would be deployed without deploying"
            echo "  --help, -h      Show this help"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

# Logging functions
log() {
    if [ "$QUIET" = false ]; then
        echo -e "$1"
    fi
}

warn() {
    log "${YELLOW}⚠️  WARNING: $1${NC}"
    ((WARNINGS++))
}

error() {
    echo -e "${RED}❌ ERROR: $1${NC}"
    exit 1
}

success() {
    log "${GREEN}✅ $1${NC}"
}

# Validate source directory
if [ ! -d "$SOURCE_DIR" ]; then
    error "Source directory not found: $SOURCE_DIR"
fi

# Header
if [ "$DRY_RUN" = true ]; then
    log "${BOLD}🔍 DRY RUN MODE - No changes will be made${NC}\n"
else
    log "${BOLD}🚀 Deploying Claude Code Extensions${NC}\n"
fi

log "Source: $SOURCE_DIR"
log "Target: $TARGET_DIR"
log ""

# Create backup if .claude exists and not in dry-run
if [ -d "$TARGET_DIR" ] && [ "$DRY_RUN" = false ]; then
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    BACKUP_DIR="$PROJECT_ROOT/.claude_backup_$TIMESTAMP"

    log "${CYAN}📦 Creating backup: .claude_backup_$TIMESTAMP${NC}"
    cp -r "$TARGET_DIR" "$BACKUP_DIR"
fi

# Create target directory
if [ "$DRY_RUN" = false ]; then
    mkdir -p "$TARGET_DIR"
fi

# Deploy function
deploy_category() {
    local category=$1
    local display_name=$2
    local source_path="$SOURCE_DIR/$category"
    local target_path="$TARGET_DIR/$category"

    if [ ! -d "$source_path" ]; then
        return 0
    fi

    # Count items (excluding hidden files and __pycache__)
    local item_count=$(find "$source_path" -mindepth 1 -maxdepth 1 ! -name '.*' ! -name '__pycache__' | wc -l | tr -d ' ')

    if [ "$item_count" -eq 0 ]; then
        return 0
    fi

    log "${BLUE}📁 Deploying $display_name:${NC}"

    if [ "$DRY_RUN" = false ]; then
        mkdir -p "$target_path"
    fi

    # Deploy each item
    find "$source_path" -mindepth 1 -maxdepth 1 ! -name '.*' ! -name '__pycache__' | while read -r item; do
        local item_name=$(basename "$item")

        if [ -d "$item" ]; then
            log "   📂 $item_name/"
            if [ "$DRY_RUN" = false ]; then
                rm -rf "$target_path/$item_name" 2>/dev/null || true
                cp -r "$item" "$target_path/$item_name"
            fi
        else
            log "   📄 $item_name"
            if [ "$DRY_RUN" = false ]; then
                cp "$item" "$target_path/$item_name"
            fi
        fi

        ((DEPLOYED_COUNT++))
    done
}

# Deploy each category
deploy_category "skills" "Skills"
deploy_category "prompts" "Prompts"
deploy_category "commands" "Commands"

# Copy README to .claude if it exists
if [ -f "$SOURCE_DIR/README.md" ] && [ "$DRY_RUN" = false ]; then
    cp "$SOURCE_DIR/README.md" "$TARGET_DIR/README.md"
fi

# Summary
log ""
log "${BOLD}$(printf '=%.0s' {1..50})${NC}"

if [ "$DEPLOYED_COUNT" -gt 0 ]; then
    success "Deployed $DEPLOYED_COUNT extension(s)"
else
    log "${CYAN}ℹ️  No extensions to deploy${NC}"
fi

if [ "$WARNINGS" -gt 0 ]; then
    log "${YELLOW}⚠️  $WARNINGS warning(s) occurred${NC}"
fi

if [ "$DRY_RUN" = true ]; then
    log "${CYAN}ℹ️  Dry run complete. Run without --dry-run to deploy.${NC}"
fi

log "${BOLD}$(printf '=%.0s' {1..50})${NC}"
log ""

exit 0
