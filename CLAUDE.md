# Vibe - English Lesson Builder

**Live Production**: https://krisztiankoos.github.io/vibe/
**Version**: 1.0.0

## Project Overview

Bilingual web application for language teachers to create, share, and deliver interactive language lessons. Supports English (ESL) and Ukrainian teaching methodologies with student-facing interactive exercises.

## Tech Stack

- **Frontend**: React 19.2.0, TypeScript 5.9.3
- **Build**: Vite 7.2.2
- **Deployment**: GitHub Pages (auto-deploy from main branch)
- **State**: React Hooks + localStorage

## Quick Start

```bash
# First time setup
npm install          # Install dependencies

# Development
./start-claude.sh    # Start Claude Code (auto-deploys extensions)
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm audit            # Check for vulnerabilities
```

## Project Structure

```
src/
├── components/       # 13 React components (App, LeadInForm, StudentLessonView, etc.)
├── data/            # 14 sample lessons (7 EN + 7 UK)
├── hooks/           # Custom React hooks
├── utils/           # Security, import/export, help text
├── types.ts         # TypeScript definitions
├── translations.ts  # 170+ bilingual strings
└── App.css          # All styles
```

## Key Files

- `src/types.ts` - Core types: `Lesson`, `Exercise`, `Language`
- `src/translations.ts` - All UI strings (English/Ukrainian)
- `src/utils/security.ts` - Input validation & sanitization (MUST use for all user input)
- `src/utils/lessonUtils.ts` - Import/export/print functions
- `docs/guides/DEVELOPMENT_GUIDE.md` - Comprehensive AI-assisted development guide
- `docs/` - All project documentation organized by category
- `claude_extensions/` - Version-controlled Claude Code skills and commands
- `start-claude.sh` - Startup script that auto-deploys extensions

## Code Standards

### TypeScript
- Strict mode enabled
- No `any` types
- Explicit return types on functions
- All props destructured with types

### React
- Functional components only
- Follow Rules of Hooks
- Stable keys in lists (use `id`, not array index)

### Security (Critical)
```typescript
import { validateInput, sanitizeInput, validateURL } from './utils/security';

// Always validate/sanitize user input:
const clean = sanitizeInput(userInput);
const isValid = validateInput(userInput, { maxLength: 1000 });
const url = validateURL(userUrl);
```

### Translations
```typescript
// Never hardcode strings - always use translations:
const t = translations;
<button>{t.lessonBuilder.saveButton[language]}</button>
```

## Development Workflow

1. **Feature Branch**: `git checkout -b feature/description`
2. **Implement**: Follow patterns in existing components
3. **Translations**: Add to `translations.ts` for both `en` and `uk`
4. **Security**: Validate all inputs with `utils/security.ts`
5. **Test**: Manual testing checklist (TESTING_PLAN_V1.md)
6. **Document**: Update CHANGELOG.md
7. **Commit**: Use conventional commits (`feat:`, `fix:`, `refactor:`, etc.)
8. **PR**: Merge to main → auto-deploy to GitHub Pages

## Testing

**Current**: Manual testing via TESTING_PLAN_V1.md
**Planned**: Vitest (unit), React Testing Library (component), Playwright (E2E)

Run before every PR:
- ✅ `npm run build` succeeds
- ✅ `npm audit` shows 0 vulnerabilities
- ✅ All 11 exercise types render correctly
- ✅ Both English and Ukrainian UI work
- ✅ Import/export/save/load functions work
- ✅ Student view displays lessons correctly

## Git Workflow

**Branches**:
- `main` - Production (auto-deploys to GitHub Pages)
- `feature/*` - New features
- `fix/*` - Bug fixes
- `refactor/*` - Code improvements

**Commit Format**:
```
feat: add pronunciation practice exercise type
fix: correct infinite loop in useKeyboardShortcuts
docs: update README with collaboration guide
refactor: extract exercise validation to custom hook
test: add E2E tests for student lesson flow
```

## Common Tasks

### Add New Exercise Type
1. Add type to `Exercise` in `src/types.ts`
2. Add builder form in `src/components/ExerciseBuilder.tsx`
3. Add student view in `src/components/StudentExercise.tsx`
4. Add translations to `src/translations.ts`
5. Add help text to `src/utils/helpText.ts`
6. Test with both languages

### Add New Sample Lesson
1. Add to `src/data/sampleLessons.ts` (English)
2. Add to `src/data/sampleLessonsUkrainian.ts` (Ukrainian)
3. Follow existing lesson structure
4. Include all metadata (title, level, duration, objectives)

### Fix Security Issue
1. Review `docs/security/SECURITY_AUDIT.md` for patterns
2. Always use `utils/security.ts` functions
3. Never use `dangerouslySetInnerHTML`
4. Run `npm audit` after dependency changes

## AI-Assisted Development

This project follows professional AI-assisted development practices with Claude Code.

**See docs/guides/DEVELOPMENT_GUIDE.md for**:
- Anthropic best practices
- Prompt engineering guidelines
- Skills development plan
- Agent architecture
- Detailed workflow documentation

**Key Principle**: Write clear, contextual prompts with:
- Task description
- Current state & relevant files
- Requirements & constraints
- Success criteria

## Known Issues / Warnings

- ⚠️ Keyboard shortcuts were removed due to React error #310 (infinite render loop)
- ⚠️ All data stored in localStorage (no backend yet)
- ⚠️ No user authentication (coming in future version)
- ⚠️ No automated tests yet (manual testing only)

## Next Steps

**Immediate**:
- Set up Vercel development environment
- Add unit tests (Vitest)
- Build Translation Agent for bilingual automation

**Short-term**:
- Complete testing suite (unit + component + E2E)
- Implement Testing & Security agents
- Improve translation quality

**Long-term**:
- Backend (Firebase/Supabase)
- User authentication
- Lesson collaboration features
- Mobile app

## Resources

- **Anthropic Docs**: https://docs.anthropic.com/claude/docs/prompt-engineering
- **React Docs**: https://react.dev/
- **Project Security**: docs/security/SECURITY_AUDIT.md
- **Testing Plan**: docs/plans/TESTING_PLAN_V1.md
- **Full Dev Guide**: docs/guides/DEVELOPMENT_GUIDE.md
- **Setup Summary**: docs/guides/SETUP_SUMMARY.md
- **All Documentation**: docs/README.md

---

**Last Updated**: 2025-11-14
**Maintained by**: AI-assisted development with Claude Code
