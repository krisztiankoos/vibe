# Vibe - Language Lesson Builder

**Production**: https://krisztiankoos.github.io/vibe/ | **Version**: 1.0.0 | **Branch**: `dev` → `main` (auto-deploy)
**Stack**: React 19 + TypeScript 5.9 + Vite 7 | **State**: localStorage (no backend)

> **For planning & architecture**: See CLAUDE_PLANNING.md (comprehensive context)
> **For execution**: Use this file (concise, action-oriented)

---

## 🚨 CRITICAL RULES (Always Follow)

### 1. Security First
**ALWAYS validate and sanitize ALL user input. No exceptions.**

```typescript
import { validateInput, sanitizeInput, validateURL } from './utils/security';

// ✅ CORRECT
const clean = sanitizeInput(userInput);
if (!validateInput(clean, { maxLength: 1000 })) {
  return; // reject invalid input
}

// ❌ WRONG
const data = userInput; // NEVER use raw input
innerHTML = userInput;  // NEVER use dangerouslySetInnerHTML
```

**Why**: This is a teaching app - XSS could expose student/teacher data.

### 2. Bilingual Everything
**ALWAYS use translations. NEVER hardcode strings.**

```typescript
import { translations } from './translations';

// ✅ CORRECT
<button>{translations.lessonBuilder.saveButton[language]}</button>

// ❌ WRONG
<button>Save</button>
<button>{language === 'en' ? 'Save' : 'Зберегти'}</button>
```

**Why**: Every UI element needs English AND Ukrainian. Missing translations break UX.

**Action**: When adding ANY text:
1. Add to `src/translations.ts` under correct category
2. Provide both `en` and `uk` values
3. Use `translations.category.key[language]` in component

### 3. TypeScript Strict Mode
**ALWAYS use explicit types. NEVER use `any`.**

```typescript
// ✅ CORRECT
interface Props {
  lesson: Lesson;
  onSave: (lesson: Lesson) => void;
}

const Component: React.FC<Props> = ({ lesson, onSave }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  return <div>...</div>;
};

// ❌ WRONG
const Component = (props: any) => { ... }
const [data, setData] = useState();
```

**Why**: Strict typing catches bugs at compile time, not runtime.

---

## 📋 Decision Trees (Common Scenarios)

### Scenario: User wants to add new feature

```
Is it UI-facing text?
├─ YES → Add to src/translations.ts (both en + uk)
└─ NO → Continue

Does it accept user input?
├─ YES → Use validateInput() + sanitizeInput()
└─ NO → Continue

Does it modify lesson/exercise data?
├─ YES → Update src/types.ts first, then components
└─ NO → Continue

Does it need new exercise type?
├─ YES → Follow "Add Exercise Type" workflow (see below)
└─ NO → Implement feature

Test in both languages?
└─ ALWAYS YES → Switch language toggle, verify both work
```

### Scenario: User reports bug

```
Is it security-related?
├─ YES → Priority 1, fix immediately, check security.ts usage
└─ NO → Continue

Does it affect both languages?
├─ YES → Check translations.ts for missing/incorrect keys
├─ NO → Check language-specific logic
└─ UNKNOWN → Test both languages first

Is it TypeScript error?
├─ YES → Check types.ts, ensure no `any` types used
└─ NO → Continue

Can you reproduce it?
├─ YES → Fix, test, commit
└─ NO → Ask for steps to reproduce
```

---

## 🎯 Code Patterns (Follow These)

### Pattern 1: Adding New Exercise Type

**Step-by-step** (complete ALL steps):
1. `src/types.ts` → Add type to `Exercise` union
2. `src/components/ExerciseBuilder.tsx` → Add builder form UI
3. `src/components/StudentExercise.tsx` → Add student view
4. `src/translations.ts` → Add all UI strings (en + uk)
5. `src/utils/helpText.ts` → Add help text
6. **Test**: Create exercise in both languages, verify student view works

**Example commit**:
```
feat: add pronunciation practice exercise type

- Added PronunciationExercise type to types.ts
- Built form in ExerciseBuilder with audio upload
- Student view plays audio with recording comparison
- Added 12 translation strings (en/uk)
- Help text explains IPA and stress patterns

Tested in both English and Ukrainian interfaces.
```

### Pattern 2: Working with Translations

```typescript
// Component structure
import { translations } from '../translations';
import { Language } from '../types';

const MyComponent: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations.myCategory; // namespace

  return (
    <>
      <h1>{t.title[language]}</h1>
      <button>{t.buttonLabel[language]}</button>
      <p>{t.helpText[language]}</p>
    </>
  );
};
```

**When translations are missing**:
1. Add to `src/translations.ts`:
```typescript
export const translations = {
  // ... existing
  myCategory: {
    title: { en: 'English Title', uk: 'Український Заголовок' },
    buttonLabel: { en: 'Click Me', uk: 'Натисни мене' },
    helpText: { en: 'Help text...', uk: 'Текст допомоги...' }
  }
};
```

### Pattern 3: Security Validation

**For all text inputs**:
```typescript
const handleInput = (value: string) => {
  const sanitized = sanitizeInput(value);
  const isValid = validateInput(sanitized, {
    maxLength: 1000,
    minLength: 1,
    allowedChars: /^[a-zA-Z0-9\s\-.,!?'"]+$/
  });

  if (!isValid) {
    setError(translations.errors.invalidInput[language]);
    return;
  }

  // Safe to use
  setValue(sanitized);
};
```

**For URLs** (file uploads, links):
```typescript
const handleURL = (url: string) => {
  const validatedURL = validateURL(url);
  if (!validatedURL) {
    setError(translations.errors.invalidURL[language]);
    return;
  }

  setImageURL(validatedURL);
};
```

---

## 📁 Project Structure (Quick Reference)

```
src/
├── components/          # 13 components (App, LeadInForm, ExerciseBuilder, etc.)
│   └── [Name].tsx       # All functional components, typed props
├── data/                # Sample lessons (sampleLessons.ts + sampleLessonsUkrainian.ts)
├── hooks/               # Custom React hooks
├── utils/
│   ├── security.ts      # validateInput, sanitizeInput, validateURL ⚠️ CRITICAL
│   ├── lessonUtils.ts   # Import/export/print functions
│   └── helpText.ts      # Contextual help strings
├── types.ts             # ALL TypeScript interfaces (Lesson, Exercise, Language, etc.)
├── translations.ts      # ALL UI strings (en/uk) ⚠️ CRITICAL
└── App.css              # All styles (single file)

docs/
├── guides/              # DEVELOPMENT_GUIDE.md, SETUP_SUMMARY.md
├── plans/               # TESTING_PLAN_V1.md, ROADMAP.md
└── security/            # SECURITY_AUDIT.md

claude_extensions/       # Skills + commands (deploy with ./start-claude.sh)
```

**Key files** (read these first for any task):
- `src/types.ts` - Understand data structures
- `src/translations.ts` - See existing translation patterns
- `src/utils/security.ts` - Know security functions

---

## ✅ Success Criteria (What "Good" Looks Like)

Before marking task complete, verify:

**For ANY code change**:
- [ ] `npm run build` succeeds with zero errors
- [ ] `npm audit` shows 0 vulnerabilities
- [ ] TypeScript strict mode passes (no `any`, all types explicit)
- [ ] Both English and Ukrainian UI tested and working

**For new features**:
- [ ] All user-facing text in `translations.ts`
- [ ] All user input validated with `security.ts` functions
- [ ] Added to both builder view AND student view
- [ ] Works with existing import/export/save/load
- [ ] Help text added if needed

**For bug fixes**:
- [ ] Root cause identified and documented
- [ ] Fix doesn't break other features
- [ ] Added to CHANGELOG.md

---

## ⚠️ Common Pitfalls (Avoid These)

### Pitfall 1: Forgetting Ukrainian
**Bad**: Add feature, test in English, commit
**Good**: Add feature, switch to Ukrainian, test again, then commit

### Pitfall 2: Skipping Validation
**Bad**: `const data = event.target.value; saveLesson(data);`
**Good**: `const raw = event.target.value; const clean = sanitizeInput(raw); if (validateInput(clean)) saveLesson(clean);`

### Pitfall 3: Hardcoding Strings
**Bad**: `alert("Saved successfully!");`
**Good**: `alert(translations.notifications.saveSuccess[language]);`

### Pitfall 4: Using Array Index as Key
**Bad**: `exercises.map((ex, i) => <div key={i}>...)</div>`
**Good**: `exercises.map(ex => <div key={ex.id}>...)</div>`

### Pitfall 5: Modifying Types Without Checking Usage
**Bad**: Change `Exercise` type, don't check where it's used → build breaks
**Good**: Search codebase for type usage, update all locations, then test

---

## 🚀 Quick Commands

```bash
npm run dev              # Start dev server (localhost:5173)
npm run build            # Production build (must pass before PR)
npm audit                # Check vulnerabilities (must be 0)
./start-claude.sh        # Deploy extensions + start Claude Code
```

---

## 📚 Deep Dives (When You Need Details)

**For comprehensive guides, see**:
- **Planning & architecture**: `CLAUDE_PLANNING.md` (component architecture, state management, security architecture, data models, user journeys, etc.)
- Architecture & workflows: `docs/guides/DEVELOPMENT_GUIDE.md`
- Testing procedures: `docs/plans/TESTING_PLAN_V1.md`
- Security patterns: `docs/security/SECURITY_AUDIT.md`
- Full roadmap: `docs/plans/ROADMAP.md`
- All docs index: `docs/README.md`

**External resources**:
- [React 19 Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Anthropic Prompt Engineering](https://docs.anthropic.com/claude/docs/prompt-engineering)

---

## 🎓 Teaching Context (Why This App Exists)

**Purpose**: Help ESL/Ukrainian teachers create interactive lessons
**Users**: Teachers (builders) + Students (lesson consumers)
**Methodology**:
- English: PPP/TTT communicative approach (focus on fluency)
- Ukrainian: Traditional grammar-translation (focus on accuracy)

**11 Exercise Types**: Multiple choice, gap-fill, matching, ordering, discussion, role-play, lead-in, reading, writing, listening, pronunciation

**Critical UX**:
- Teachers build lessons → export/print
- Students view lessons → interactive exercises → immediate feedback
- Both roles must work seamlessly in both languages

---

## 🐛 Known Constraints

- ⚠️ No backend yet (localStorage only)
- ⚠️ No auth (coming later)
- ⚠️ No automated tests (manual testing via TESTING_PLAN_V1.md)
- ⚠️ Keyboard shortcuts removed (React error #310 - infinite loop)

---

**Last Updated**: 2025-11-14 | **Maintained by**: AI-assisted development with Claude Code
