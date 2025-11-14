# Claude Code Extensions for Vibe

Version-controlled Claude Code extensions for the English Lesson Builder project.

## Structure

```
claude_extensions/
├── skills/              # Specialized teaching methodology skills
│   ├── esl_teaching/    # English as Second Language (PPP methodology)
│   └── ukrainian_teaching/  # Ukrainian traditional grammar
├── commands/            # Slash commands for workflows
│   ├── test.md
│   ├── translate.md
│   ├── security-check.md
│   ├── add-exercise.md
│   ├── release.md
│   └── review.md
├── prompts/             # Reusable prompt templates (future)
├── examples/            # Example workflows
├── deploy.sh            # Deployment script
└── README.md           # This file
```

## Skills

### ESL Teaching Skill
**Purpose**: English as Second Language teaching expertise
- **Methodology**: PPP (Presentation, Practice, Production)
- **Approach**: Communicative, student-centered
- **Focus**: Fluency, real-world usage, authentic materials

### Ukrainian Teaching Skill
**Purpose**: Ukrainian language teaching expertise
- **Methodology**: Traditional grammar-translation
- **Approach**: Grammar-focused, rule-based
- **Focus**: Accuracy, grammatical structures, written competence

**Important**: These are NOT translation skills. Each language uses a completely different teaching methodology and is taught in its own language. English lessons teach English using English (ESL). Ukrainian lessons teach Ukrainian using Ukrainian (traditional grammar).

## Deployment

Deploy extensions from this version-controlled directory to `.claude/`:

```bash
# Deploy all extensions
./claude_extensions/deploy.sh

# Or use the start script (auto-deploys)
./start-claude.sh
```

## Creating New Skills

1. Create directory in `skills/`:
   ```bash
   mkdir -p claude_extensions/skills/new_skill/{examples,tests}
   ```

2. Add required files:
   - `skill.md` - The actual skill definition (>50 characters)
   - `README.md` - Usage documentation with examples
   - `examples/` - At least one example workflow

3. Deploy:
   ```bash
   ./claude_extensions/deploy.sh
   ```

## Creating New Commands

1. Create `.md` file in `commands/`:
   ```bash
   touch claude_extensions/commands/my-command.md
   ```

2. Add command definition (see existing commands for templates)

3. Deploy - command becomes available as `/my-command`

## Validation

Before committing new extensions:

1. Ensure skill.md is substantive (>50 chars)
2. Include README.md with usage examples
3. Test deployment: `./claude_extensions/deploy.sh`
4. Test in Claude Code

## Version Control

**Tracked in git**:
- `claude_extensions/` - All source files
- `deploy.sh` - Deployment script
- `start-claude.sh` - Startup script

**NOT tracked** (in .gitignore):
- `.claude/` - Generated from claude_extensions/
- `CLAUDE.local.md` - Personal notes

## Workflow

1. Edit files in `claude_extensions/`
2. Run `./start-claude.sh` (auto-deploys)
3. Changes are deployed to `.claude/`
4. Claude Code picks up changes automatically

---

**Note**: This structure follows the pattern from professional Claude Code projects, allowing version control of extensions while keeping local overrides separate.

**Last Updated**: 2025-11-14
