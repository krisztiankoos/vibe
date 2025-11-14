# Vibe Documentation

Comprehensive documentation for the English Lesson Builder project.

## Quick Links

- **[Project README](../README.md)** - User-facing documentation
- **[CLAUDE.md](../CLAUDE.md)** - AI-assisted development guide (primary reference)
- **[CHANGELOG](../CHANGELOG.md)** - Version history

## Documentation Structure

### 📚 Guides

Comprehensive how-to guides and development documentation:

- **[Development Guide](guides/DEVELOPMENT_GUIDE.md)** - Complete AI-assisted development manual
  - Anthropic best practices
  - Prompt engineering guidelines
  - Skills development plan
  - Agent architecture
  - Testing and deployment strategies

- **[Prompt Engineering Guide](guides/PROMPT_ENGINEERING_GUIDE.md)** - AI Integration guide
  - Three-tier approach (beginner/intermediate/expert)
  - Prompt template library
  - Smart prompting techniques
  - Implementation architecture
  - Best practices for teachers

- **[Setup Summary](guides/SETUP_SUMMARY.md)** - Project setup completion summary
  - What was configured
  - How to use the setup
  - Next steps and milestones

### 📋 Plans

Project planning and roadmap documents:

- **[Testing Plan V1](plans/TESTING_PLAN_V1.md)** - Comprehensive manual testing checklist
  - Teacher mode testing
  - Student mode testing
  - Cross-browser compatibility
  - Bilingual verification

- **[Development Roadmap](plans/ROADMAP.md)** - Complete feature roadmap
  - Phase 1: AI-Powered Content Generation
  - Phase 2: Enhanced Teacher Workflow
  - Phase 3: Student Experience Enhancement
  - Phase 4: AI Prompt Engineering Integration
  - Phase 5: Advanced Features
  - Phase 6: Platform & Infrastructure

### 🔒 Security

Security documentation and audits:

- **[Security Audit](security/SECURITY_AUDIT.md)** - Complete security assessment
  - Input validation review
  - XSS prevention measures
  - Dependency security
  - Security recommendations

## For New Developers

**Start here**:
1. Read [../README.md](../README.md) for project overview
2. Read [../CLAUDE.md](../CLAUDE.md) for development quick start
3. Dive into [guides/DEVELOPMENT_GUIDE.md](guides/DEVELOPMENT_GUIDE.md) for comprehensive guidance

## For AI-Assisted Development

**Claude Code automatically reads**:
- `../CLAUDE.md` - Primary project context
- `.claude/` directory - Configuration and commands

**Reference documentation**:
- Use `/` to see available slash commands
- Check `guides/DEVELOPMENT_GUIDE.md` for detailed workflows
- Review `plans/TESTING_PLAN_V1.md` before testing

## Documentation Standards

### Creating New Documents

**Location**:
- User-facing docs → Root directory
- Development guides → `docs/guides/`
- Plans and roadmaps → `docs/plans/`
- Security documents → `docs/security/`
- Architecture diagrams → `docs/architecture/` (to be created)

**Format**:
- Use Markdown (.md)
- Include table of contents for long docs (>100 lines)
- Add "Last Updated" date at bottom
- Use relative links for cross-references

**Style**:
- Clear, concise headers
- Code examples with syntax highlighting
- Screenshots for UI-related docs
- Bullet points for lists
- Tables for comparisons

### Updating Existing Documents

When code changes affect documentation:
1. Update relevant section
2. Update "Last Updated" date
3. Add note to CHANGELOG.md if user-facing
4. Commit with: `docs: update [topic] in [filename]`

### Documentation Types

**MUST update when**:
- `README.md` - New features, changed requirements, updated setup
- `CLAUDE.md` - New patterns, workflow changes, common tasks
- `CHANGELOG.md` - Every release, user-facing changes
- `TESTING_PLAN_V1.md` - New features, new test cases

**UPDATE as needed**:
- `guides/DEVELOPMENT_GUIDE.md` - New best practices, major methodology changes
- `security/SECURITY_AUDIT.md` - Security reviews, vulnerability fixes
- `plans/*` - New roadmap items, milestone completions

## Contributing to Documentation

### For Team Members

1. Keep documentation up-to-date with code changes
2. Add examples and screenshots
3. Write clearly for future developers
4. Review docs in PRs alongside code

### For AI-Assisted Development

Use Claude to:
```
/review docs/path/to/doc.md
```

Ask Claude to:
- "Update CLAUDE.md with new workflow pattern"
- "Add security best practice to DEVELOPMENT_GUIDE.md"
- "Create testing checklist for new feature"

## Documentation Roadmap

### Planned Additions

- [ ] **Architecture Diagrams** - System architecture, component relationships
- [ ] **API Documentation** - When backend is added
- [ ] **Deployment Guide** - Multi-environment setup
- [ ] **Troubleshooting Guide** - Common issues and solutions
- [ ] **Contributing Guide** - For open-source contributions
- [ ] **Teacher's Guide** - How to create effective lessons
- [ ] **Student Guide** - How to use the learning platform

### Maintenance Schedule

- **Weekly**: Review CHANGELOG.md
- **Monthly**: Audit all docs for accuracy
- **Quarterly**: Major documentation review and restructuring
- **Per Release**: Update version numbers, feature lists, screenshots

## Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Write the Docs](https://www.writethedocs.org/)

---

**Last Updated**: 2025-11-14
**Maintained by**: AI-assisted development with Claude Code
