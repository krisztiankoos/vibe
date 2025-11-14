# Vibe - Planning & Architecture Context

**Purpose**: Deep context for planning, architecture decisions, and complex feature design.
**Companion to**: CLAUDE.md (execution-focused, concise)
**Use when**: Planning features, refactoring, understanding architecture, designing APIs

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Design Philosophy](#design-philosophy)
3. [Component Architecture](#component-architecture)
4. [State Management Strategy](#state-management-strategy)
5. [Translation Architecture](#translation-architecture)
6. [Security Architecture](#security-architecture)
7. [Data Model Deep Dive](#data-model-deep-dive)
8. [User Journey Mapping](#user-journey-mapping)
9. [Exercise Type System](#exercise-type-system)
10. [Extensibility Patterns](#extensibility-patterns)
11. [Technical Constraints](#technical-constraints)
12. [Future Architecture](#future-architecture)

---

## Architecture Overview

### System Architecture (Current State)

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Pages (Static Host)              │
│                  https://krisztiankoos.github.io/vibe/      │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │ (deploy from main branch)
                              │
┌─────────────────────────────────────────────────────────────┐
│                         Vibe SPA                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  App Component (Root)                                 │  │
│  │  - Language switcher (en/uk)                          │  │
│  │  - View switcher (builder/student)                    │  │
│  │  - Current lesson state                               │  │
│  └───────────────────────────────────────────────────────┘  │
│           ▲                           ▲                      │
│           │                           │                      │
│  ┌────────┴────────┐        ┌────────┴─────────┐           │
│  │ Builder View    │        │ Student View     │           │
│  │                 │        │                  │           │
│  │ - LeadInForm    │        │ - StudentLesson  │           │
│  │ - ExerciseList  │        │ - StudentExercise│           │
│  │ - ExerciseBuilder│       │ - ProgressTracker│           │
│  │ - LessonMeta    │        │ - Navigation     │           │
│  └─────────────────┘        └──────────────────┘           │
│           │                           │                      │
│           ▼                           ▼                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            Shared Utilities Layer                   │    │
│  │  - translations.ts (bilingual strings)              │    │
│  │  - security.ts (validation/sanitization)            │    │
│  │  - lessonUtils.ts (import/export/print)             │    │
│  │  - types.ts (TypeScript definitions)                │    │
│  └─────────────────────────────────────────────────────┘    │
│           │                                                  │
│           ▼                                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │          Browser localStorage (Persistence)         │    │
│  │  - lessons: Lesson[]                                │    │
│  │  - currentLesson: Lesson | null                     │    │
│  │  - language: 'en' | 'uk'                            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

**Decision 1: Single Page Application (SPA)**
- **Why**: Simplicity, no backend needed, fast user experience
- **Trade-off**: No server-side rendering, all data client-side
- **Impact**: Can't share lessons via URL (yet), no collaboration

**Decision 2: localStorage for Persistence**
- **Why**: Zero infrastructure, works offline, instant saves
- **Trade-off**: Limited to ~5-10MB, no cross-device sync
- **Impact**: Future migration to backend will require data migration strategy

**Decision 3: Single CSS File (App.css)**
- **Why**: Simplicity, no CSS-in-JS overhead, easy to understand
- **Trade-off**: No scoped styles, potential naming collisions
- **Impact**: Use consistent naming conventions (BEM-like)

**Decision 4: Bilingual Baked-In (Not i18n Library)**
- **Why**: Only 2 languages, custom structure fits teaching context
- **Trade-off**: Adding 3rd language requires refactoring
- **Impact**: translations.ts is critical infrastructure

**Decision 5: No State Management Library (Redux/Zustand)**
- **Why**: App complexity doesn't warrant it, React hooks sufficient
- **Trade-off**: Prop drilling in some places
- **Impact**: Keep component tree shallow, lift state carefully

---

## Design Philosophy

### Core Principles

**1. Teacher-First Design**
- Teachers are the primary users (builders), students are secondary (consumers)
- Builder UX prioritizes speed and flexibility
- Student UX prioritizes clarity and simplicity
- When in conflict, optimize for teacher workflow

**2. Bilingual from Day One**
- Not "English with Ukrainian translation" - both are first-class
- Each language has its own teaching methodology
  - English: Communicative (PPP/TTT) - fluency-focused
  - Ukrainian: Traditional grammar-translation - accuracy-focused
- UI must feel native in both languages (not "translated")

**3. Progressive Enhancement**
- Core functionality works without JavaScript (future: server-side rendering)
- Lessons are printable (CSS print styles)
- Exportable as JSON (portable, future-proof)
- No vendor lock-in

**4. Security by Default**
- All user input is untrusted until validated
- No XSS attack surface (never use innerHTML without sanitization)
- No external scripts (all resources self-hosted)
- Privacy-first (no analytics, no tracking, no cookies)

**5. Offline-First**
- App should work without internet after first load
- Service worker for caching (future enhancement)
- All data local until explicitly shared

### Non-Goals (What We're NOT Building)

- ❌ Learning Management System (LMS) - no grades, no student accounts
- ❌ Social network - no likes, comments, followers
- ❌ Marketplace - no paid content, no ads
- ❌ Mobile app - web-first, responsive design sufficient
- ❌ Real-time collaboration - async sharing only

---

## Component Architecture

### Component Hierarchy

```
App
├── LanguageSwitcher (en/uk toggle)
├── ViewSwitcher (builder/student toggle)
│
├── [Builder View]
│   ├── LessonMetadataForm
│   │   ├── TitleInput
│   │   ├── LevelSelector
│   │   ├── DurationInput
│   │   └── ObjectivesList
│   │
│   ├── LeadInForm
│   │   ├── QuestionsList
│   │   ├── ImageUploader
│   │   └── InstructionsEditor
│   │
│   ├── ExerciseList
│   │   ├── ExerciseCard (for each exercise)
│   │   │   ├── ExercisePreview
│   │   │   ├── EditButton
│   │   │   ├── DeleteButton
│   │   │   └── ReorderControls
│   │   └── AddExerciseButton
│   │
│   ├── ExerciseBuilder (modal/drawer)
│   │   ├── ExerciseTypeSelector
│   │   ├── [Dynamic Form based on type]
│   │   │   ├── MultipleChoiceForm
│   │   │   ├── GapFillForm
│   │   │   ├── MatchingForm
│   │   │   ├── OrderingForm
│   │   │   ├── DiscussionForm
│   │   │   ├── RolePlayForm
│   │   │   ├── ReadingForm
│   │   │   ├── WritingForm
│   │   │   ├── ListeningForm
│   │   │   └── PronunciationForm
│   │   └── SaveButton
│   │
│   └── LessonActions
│       ├── SaveButton
│       ├── ExportButton
│       ├── PrintButton
│       ├── ShareButton (future)
│       └── DeleteButton
│
└── [Student View]
    ├── LessonHeader
    │   ├── Title
    │   ├── Level
    │   ├── Duration
    │   └── Objectives
    │
    ├── LeadInDisplay
    │   ├── Questions
    │   └── Images
    │
    ├── ExerciseSequence
    │   ├── StudentExercise (for each)
    │   │   ├── Instructions
    │   │   ├── [Interactive Component by type]
    │   │   ├── SubmitButton
    │   │   ├── FeedbackDisplay
    │   │   └── NavigationButtons
    │   └── ProgressIndicator
    │
    └── CompletionScreen
        ├── Summary
        ├── Score (if applicable)
        └── RetryButton
```

### Component Responsibility Matrix

| Component | Data | Logic | Presentation | State |
|-----------|------|-------|--------------|-------|
| App | ✅ Lesson list, current lesson | ✅ View switching, language switching | ❌ | ✅ Global state |
| LessonMetadataForm | ❌ | ✅ Form validation | ✅ | ✅ Local form state |
| ExerciseBuilder | ❌ | ✅ Exercise creation/editing | ✅ | ✅ Local form state |
| ExerciseList | ❌ | ✅ Reordering, deletion | ✅ | ❌ |
| StudentExercise | ❌ | ✅ Answer checking, feedback | ✅ | ✅ Answer state |

### Component Communication Patterns

**Pattern 1: Props Down, Events Up**
```typescript
// Parent (App)
const [lesson, setLesson] = useState<Lesson>(initialLesson);

return (
  <ExerciseBuilder
    lesson={lesson}
    onSave={(updatedLesson) => setLesson(updatedLesson)}
  />
);

// Child (ExerciseBuilder)
const ExerciseBuilder: React.FC<Props> = ({ lesson, onSave }) => {
  const handleSubmit = () => {
    onSave({ ...lesson, exercises: [...lesson.exercises, newExercise] });
  };
};
```

**Pattern 2: Controlled Components**
```typescript
// All form inputs are controlled
<input
  value={title}
  onChange={(e) => setTitle(sanitizeInput(e.target.value))}
/>
```

**Pattern 3: Composition Over Inheritance**
```typescript
// Build complex UIs by composing simple components
<ExerciseCard>
  <ExercisePreview exercise={exercise} />
  <ExerciseActions onEdit={...} onDelete={...} />
</ExerciseCard>
```

---

## State Management Strategy

### State Categories

**1. Global State (App Level)**
- Current lesson being edited
- Saved lessons list
- UI language (en/uk)
- Current view (builder/student)
- Current exercise being edited (modal state)

**2. Local Component State**
- Form input values
- Validation errors
- Loading states
- Temporary UI states (expanded/collapsed)

**3. Derived State**
- Exercise count (derived from exercises array)
- Lesson duration (calculated from exercises)
- Completion percentage (in student view)

### State Flow Examples

**Example 1: Creating New Exercise**
```
User clicks "Add Exercise"
  ↓
App sets currentExercise = { type: null, ... }
  ↓
ExerciseBuilder opens with empty form
  ↓
User fills form, clicks Save
  ↓
ExerciseBuilder validates, calls onSave(newExercise)
  ↓
App updates lesson.exercises = [...exercises, newExercise]
  ↓
App saves to localStorage
  ↓
ExerciseList re-renders with new exercise
```

**Example 2: Switching Languages**
```
User clicks language toggle
  ↓
App sets language = 'uk' (was 'en')
  ↓
All components using translations re-render
  ↓
translations.*.uk values displayed instead of .en
  ↓
localStorage.setItem('language', 'uk')
```

### localStorage Schema

```typescript
// Key: 'vibe-lessons'
{
  lessons: Lesson[],
  currentLessonId: string | null,
  language: 'en' | 'uk',
  preferences: {
    theme: 'light' | 'dark', // future
    autoSave: boolean
  }
}
```

---

## Translation Architecture

### Translation Structure

```typescript
// translations.ts structure
export const translations = {
  // Top-level language switcher
  languageSwitcher: {
    english: { en: 'English', uk: 'English' },
    ukrainian: { en: 'Ukrainian', uk: 'Українська' }
  },

  // Feature-based namespaces
  lessonBuilder: {
    title: { en: 'Lesson Builder', uk: 'Конструктор Уроків' },
    // ... all builder strings
  },

  studentView: {
    // ... all student strings
  },

  exercises: {
    multipleChoice: { en: 'Multiple Choice', uk: 'Вибір Варіанта' },
    // ... all exercise type names
  },

  // Shared/common strings
  common: {
    save: { en: 'Save', uk: 'Зберегти' },
    cancel: { en: 'Cancel', uk: 'Скасувати' },
    // ... all common actions
  },

  // Error messages
  errors: {
    invalidInput: { en: 'Invalid input', uk: 'Неправильний ввід' },
    // ... all error messages
  },

  // Help text
  help: {
    // ... contextual help strings
  }
};
```

### Translation Guidelines

**1. Namespace by Feature, Not by Type**
- ✅ Good: `translations.lessonBuilder.saveButton`
- ❌ Bad: `translations.buttons.save`
- **Why**: Easier to find all strings for a feature

**2. Context Matters**
- "Save" button vs "Save" as in "cost savings" - different translations
- Include context in key names: `saveButton` vs `saveVerb` vs `saveNoun`

**3. Pluralization Strategy**
```typescript
// Handle plurals explicitly
exercises: {
  count: {
    en: (n: number) => n === 1 ? '1 exercise' : `${n} exercises`,
    uk: (n: number) => {
      if (n % 10 === 1 && n % 100 !== 11) return `${n} вправа`;
      if ([2,3,4].includes(n % 10) && ![12,13,14].includes(n % 100)) return `${n} вправи`;
      return `${n} вправ`;
    }
  }
}
```

**4. RTL Considerations** (future)
- English: LTR (left-to-right)
- Ukrainian: LTR
- Future Arabic/Hebrew: RTL (right-to-left)
- Use CSS logical properties: `margin-inline-start` instead of `margin-left`

---

## Security Architecture

### Threat Model

**Primary Threats**:
1. **XSS (Cross-Site Scripting)** - Malicious lesson content injected by attacker
2. **Data Injection** - Malformed JSON causing app crashes
3. **Privacy Leaks** - Lessons containing sensitive student data

**Secondary Threats** (lower priority):
4. **DoS (Denial of Service)** - Huge lessons crashing browser
5. **CSRF** - Not applicable (no backend yet)
6. **Clickjacking** - Low risk (no sensitive actions)

### Defense Layers

**Layer 1: Input Validation (Whitelist)**
```typescript
// security.ts - validateInput()
export function validateInput(input: string, options: ValidationOptions): boolean {
  // Check length
  if (input.length > options.maxLength) return false;
  if (input.length < options.minLength) return false;

  // Check allowed characters (whitelist)
  if (options.allowedChars && !options.allowedChars.test(input)) return false;

  // Check for suspicious patterns
  if (containsSQLInjection(input)) return false;
  if (containsScriptTags(input)) return false;

  return true;
}
```

**Layer 2: Input Sanitization (Escape)**
```typescript
// security.ts - sanitizeInput()
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

**Layer 3: Content Security Policy (CSP)**
```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self';
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: blob:;">
```

**Layer 4: URL Validation**
```typescript
// security.ts - validateURL()
export function validateURL(url: string): string | null {
  try {
    const parsed = new URL(url);

    // Only allow safe protocols
    if (!['http:', 'https:', 'data:'].includes(parsed.protocol)) {
      return null;
    }

    // Block javascript: protocol
    if (parsed.protocol === 'javascript:') return null;

    return parsed.toString();
  } catch {
    return null;
  }
}
```

### Security Checklist for New Features

- [ ] All user input validated with `validateInput()`
- [ ] All user input sanitized with `sanitizeInput()`
- [ ] All URLs validated with `validateURL()`
- [ ] No use of `dangerouslySetInnerHTML`
- [ ] No use of `eval()` or `Function()` constructor
- [ ] No inline event handlers (`onclick`, etc.)
- [ ] Review `npm audit` output
- [ ] Test with malicious input (XSS payloads)

---

## Data Model Deep Dive

### Core Types (Detailed)

```typescript
// types.ts - Full schema with business logic

export type Language = 'en' | 'uk';

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Lesson {
  id: string;                    // UUID v4
  title: string;                 // Max 200 chars, required
  level: Level;                  // CEFR level, required
  duration: number;              // Minutes, 5-240 range
  objectives: string[];          // Learning objectives, 1-5 items
  language: Language;            // Lesson's teaching language
  leadIn: LeadIn;                // Warm-up activity
  exercises: Exercise[];         // Main content, 1-20 exercises
  createdAt: Date;               // ISO 8601 timestamp
  updatedAt: Date;               // ISO 8601 timestamp
  tags?: string[];               // Optional categorization
  notes?: string;                // Teacher notes, not shown to students
}

export interface LeadIn {
  questions: string[];           // Warm-up questions, 1-10 items
  images?: string[];             // Image URLs (data URLs or external)
  instructions?: string;         // Optional teacher instructions
}

// Exercise types (discriminated union)
export type Exercise =
  | MultipleChoiceExercise
  | GapFillExercise
  | MatchingExercise
  | OrderingExercise
  | DiscussionExercise
  | RolePlayExercise
  | ReadingExercise
  | WritingExercise
  | ListeningExercise
  | PronunciationExercise
  | CustomExercise;

// Base interface (shared fields)
interface BaseExercise {
  id: string;                    // UUID v4
  title: string;                 // Exercise name
  instructions: string;          // Student-facing instructions
  timeLimit?: number;            // Optional time limit (seconds)
  points?: number;               // Optional points for scoring
}

// Specific exercise types
export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multipleChoice';
  questions: {
    question: string;
    options: string[];           // 2-6 options
    correctAnswer: number;       // Index of correct option (0-based)
    explanation?: string;        // Why this answer is correct
  }[];
}

export interface GapFillExercise extends BaseExercise {
  type: 'gapFill';
  text: string;                  // Text with [gap] placeholders
  answers: string[];             // Answers in order of gaps
  caseSensitive?: boolean;       // Default: false
}

// ... other exercise types
```

### Data Validation Rules

**Lesson Validation**:
- Title: 1-200 chars, no HTML tags
- Level: Must be valid CEFR level
- Duration: 5-240 minutes
- Objectives: 1-5 items, each 10-500 chars
- Exercises: 1-20 items, valid exercise objects

**Exercise Validation** (by type):
- Multiple Choice: 2-10 questions, 2-6 options each
- Gap Fill: 1-50 gaps, text max 5000 chars
- Matching: 3-15 pairs
- Ordering: 3-15 items
- Discussion: 3-20 questions
- Role Play: 2-4 roles, scenario 50-2000 chars

### Data Migration Strategy (Future)

When moving from localStorage to backend:

```typescript
// migrations/v1_to_v2.ts
export function migrateLessonV1toV2(oldLesson: any): Lesson {
  return {
    ...oldLesson,
    // Add new fields with defaults
    tags: oldLesson.tags || [],
    notes: oldLesson.notes || '',
    // Transform old structure if needed
    exercises: oldLesson.exercises.map(migrateExercise),
    // Update version marker
    schemaVersion: 2
  };
}
```

---

## User Journey Mapping

### Teacher Journey (Builder Flow)

**Journey 1: Creating First Lesson**
```
1. Lands on app → sees empty state
   ↓
2. Clicks "Create New Lesson" or "Try Sample"
   ↓
3. Fills metadata (title, level, duration, objectives)
   Decision point: Choose from scratch or use sample
   ↓
4. Creates lead-in (warm-up questions/images)
   ↓
5. Adds first exercise
   - Selects type (sees 11 options)
   - Fills form (sees help text)
   - Previews exercise
   - Saves
   ↓
6. Adds more exercises (repeat step 5)
   ↓
7. Reviews lesson in student view (clicks preview)
   ↓
8. Saves lesson (auto-saved to localStorage)
   ↓
9. Exports as JSON or prints
```

**Journey 2: Editing Existing Lesson**
```
1. Views lesson list
   ↓
2. Clicks lesson to edit
   ↓
3. Makes changes (edit metadata, add/remove/reorder exercises)
   ↓
4. Saves (auto-save or manual)
```

**Journey 3: Sharing Lesson**
```
1. Opens lesson
   ↓
2. Clicks "Export"
   ↓
3. Downloads JSON file
   ↓
4. Sends file to colleague (email, chat, etc.)
   ↓
5. Colleague imports JSON
   ↓
6. Lesson appears in their builder
```

### Student Journey (Consumer Flow)

**Journey 1: Taking Lesson**
```
1. Teacher shares lesson (print, URL, or projects screen)
   ↓
2. Student opens lesson in student view
   ↓
3. Reads lead-in questions
   ↓
4. Does exercises sequentially
   - Reads instructions
   - Interacts with exercise
   - Submits answer
   - Gets immediate feedback
   - Moves to next
   ↓
5. Completes all exercises
   ↓
6. Sees completion summary
```

**Journey 2: Self-Study**
```
1. Student has exported JSON file
   ↓
2. Opens app, imports lesson
   ↓
3. Works through at own pace
   ↓
4. Can retry exercises
```

### Pain Points & Solutions

**Pain Point 1**: "I don't know which exercise type to use"
- **Solution**: Add exercise type wizard (future)
- **Workaround**: Improve help text, add examples

**Pain Point 2**: "I made a typo in 50 questions"
- **Solution**: Bulk edit mode (future)
- **Workaround**: Export JSON, edit in text editor, re-import

**Pain Point 3**: "I can't share with students easily"
- **Solution**: Add shareable links with backend (future)
- **Workaround**: Export JSON, teacher imports on classroom computer

---

## Exercise Type System

### Exercise Type Categories

**1. Controlled Practice** (Accuracy-focused)
- Multiple Choice - Test comprehension
- Gap Fill - Practice form
- Matching - Connect concepts
- Ordering - Sequence understanding

**2. Free Practice** (Fluency-focused)
- Discussion - Open-ended speaking
- Role Play - Situational practice
- Writing - Production task

**3. Skills Practice**
- Reading - Comprehension
- Listening - Aural comprehension
- Pronunciation - Phonetic practice

**4. Meta** (Lesson structure)
- Lead In - Warm-up/schema activation

### Adding New Exercise Type (Detailed)

**Step 1: Define Type (types.ts)**
```typescript
export interface VocabularyMatchingExercise extends BaseExercise {
  type: 'vocabularyMatching';
  words: string[];              // Target vocabulary
  definitions: string[];        // Definitions (same length as words)
  images?: string[];            // Optional image hints
  shuffleDefinitions: boolean;  // Randomize order?
}

// Add to Exercise union
export type Exercise =
  | ...
  | VocabularyMatchingExercise;
```

**Step 2: Add Builder Form (ExerciseBuilder.tsx)**
```typescript
const VocabularyMatchingForm: React.FC<Props> = ({ exercise, onChange }) => {
  return (
    <>
      <WordsInput words={exercise.words} onChange={handleWordsChange} />
      <DefinitionsInput definitions={exercise.definitions} onChange={handleDefsChange} />
      <ImageUploader images={exercise.images} onChange={handleImagesChange} />
      <Toggle label="Shuffle" checked={exercise.shuffleDefinitions} onChange={handleToggle} />
    </>
  );
};

// Add to ExerciseBuilder switch
case 'vocabularyMatching':
  return <VocabularyMatchingForm exercise={exercise} onChange={handleChange} />;
```

**Step 3: Add Student View (StudentExercise.tsx)**
```typescript
const VocabularyMatchingStudent: React.FC<Props> = ({ exercise, onComplete }) => {
  const [matches, setMatches] = useState<Record<number, number>>({});

  const handleSubmit = () => {
    const correct = Object.entries(matches).every(
      ([wordIdx, defIdx]) => Number(wordIdx) === Number(defIdx)
    );
    onComplete({ correct, score: correct ? 100 : 0 });
  };

  return (
    <div className="vocabulary-matching">
      <WordColumn words={exercise.words} />
      <DefinitionColumn
        definitions={exercise.shuffleDefinitions ? shuffle(exercise.definitions) : exercise.definitions}
        onMatch={(wordIdx, defIdx) => setMatches({ ...matches, [wordIdx]: defIdx })}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

// Add to StudentExercise switch
case 'vocabularyMatching':
  return <VocabularyMatchingStudent exercise={exercise} onComplete={onComplete} />;
```

**Step 4: Add Translations (translations.ts)**
```typescript
exercises: {
  // ... existing
  vocabularyMatching: {
    en: 'Vocabulary Matching',
    uk: 'Поєднання Слів'
  }
},

vocabularyMatchingForm: {
  wordsLabel: { en: 'Words', uk: 'Слова' },
  definitionsLabel: { en: 'Definitions', uk: 'Визначення' },
  // ... all form labels
}
```

**Step 5: Add Help Text (helpText.ts)**
```typescript
vocabularyMatching: {
  en: 'Students match words with their definitions. Great for introducing new vocabulary.',
  uk: 'Учні поєднують слова з їх визначеннями. Чудово підходить для вивчення нової лексики.'
}
```

**Step 6: Add Sample Exercise (sampleLessons.ts)**
```typescript
{
  id: 'vocab-match-1',
  type: 'vocabularyMatching',
  title: 'Food Vocabulary',
  words: ['Apple', 'Carrot', 'Bread'],
  definitions: ['A red or green fruit', 'An orange vegetable', 'Made from flour'],
  shuffleDefinitions: true
}
```

---

## Extensibility Patterns

### Pattern 1: Plugin Architecture (Future)

```typescript
// plugins/exercise-types/custom-exercise.ts
export const CustomExercisePlugin: ExerciseTypePlugin = {
  type: 'customType',
  name: { en: 'Custom Exercise', uk: 'Власна Вправа' },
  icon: '🎨',
  category: 'custom',

  // Builder component
  BuilderForm: CustomExerciseForm,

  // Student component
  StudentView: CustomExerciseStudent,

  // Validation
  validate: (exercise: CustomExercise) => {
    // return validation errors or null
  },

  // Default values
  create: () => ({
    type: 'customType',
    id: generateId(),
    // ... defaults
  })
};

// Register plugin
ExerciseTypeRegistry.register(CustomExercisePlugin);
```

### Pattern 2: Hook System (Future)

```typescript
// Allow extending behavior without modifying core
export const useExerciseHooks = () => {
  const hooks = useContext(HooksContext);

  // Before save hook
  hooks.beforeSave((exercise) => {
    // Custom logic
    return modifiedExercise;
  });

  // After submit hook
  hooks.afterSubmit((result) => {
    // Analytics, logging, etc.
  });
};
```

### Pattern 3: Custom Fields (Future)

```typescript
// Allow adding fields without modifying types
export interface ExtensibleExercise extends BaseExercise {
  customFields?: Record<string, any>;
}

// Usage
exercise.customFields = {
  difficulty: 'advanced',
  tags: ['grammar', 'conditionals'],
  internalNotes: 'Review after 2 weeks'
};
```

---

## Technical Constraints

### Browser Limitations

**localStorage**:
- ~5-10MB per domain (browser-dependent)
- Synchronous API (blocks main thread)
- String storage only (must JSON.stringify/parse)
- Can be cleared by user
- Not accessible across domains

**Solution**: Compress data, lazy load lessons, migrate to IndexedDB if needed

**Single-threaded JavaScript**:
- Large lessons (100+ exercises) can cause UI jank
- JSON parsing blocks rendering

**Solution**: Use Web Workers for heavy processing (future), virtualize long lists

### React Constraints

**No built-in internationalization**:
- Must build custom translation system
- No RTL support out of the box

**Solution**: Use logical CSS properties, test with browser dev tools

**Key handling**:
- Must use stable keys in lists
- Can't use array indices if items reorder

**Solution**: Always use `id` field as key

### TypeScript Constraints

**Discriminated unions require type guards**:
```typescript
// Must narrow type before accessing type-specific fields
function renderExercise(exercise: Exercise) {
  if (exercise.type === 'multipleChoice') {
    // TypeScript now knows: exercise is MultipleChoiceExercise
    return <div>{exercise.questions}</div>;
  }
}
```

### Build Constraints

**Vite limitations**:
- Can't use Node.js APIs in client code
- Must use `import.meta.env` for env vars
- Public assets go in `/public`, not `/src`

**GitHub Pages limitations**:
- Static hosting only (no server-side code)
- SPA routing requires `404.html` trick
- HTTPS only (good for security)

---

## Future Architecture

### Phase 1: Backend Integration (Q2 2025)

```
┌─────────────────────────────────────────┐
│           Frontend (SPA)                │
│  - Same React app                       │
│  - API client replaces localStorage     │
└─────────────┬───────────────────────────┘
              │ REST/GraphQL API
              ▼
┌─────────────────────────────────────────┐
│        Backend (Node.js/Python)         │
│  - Express/FastAPI                      │
│  - Authentication (JWT)                 │
│  - Authorization (RBAC)                 │
│  - Rate limiting                        │
└─────────────┬───────────────────────────┘
              │ SQL/NoSQL
              ▼
┌─────────────────────────────────────────┐
│     Database (PostgreSQL/Firebase)      │
│  - Users                                │
│  - Lessons (versioned)                  │
│  - Shares (permissions)                 │
└─────────────────────────────────────────┘
```

**Migration Strategy**:
1. Add API client layer (adaptor pattern)
2. Feature flag: localStorage vs API
3. Migrate users incrementally
4. Keep localStorage as fallback

### Phase 2: Collaboration (Q3 2025)

**Features**:
- Real-time co-editing (WebSocket/CRDT)
- Comments/suggestions
- Version history
- Lesson forking

**Architecture**:
```
Frontend ← WebSocket → Collaboration Server
                              ↓
                       OT/CRDT Engine
                              ↓
                         Database
```

### Phase 3: AI Integration (Q4 2025)

See `PROMPT_ENGINEERING_GUIDE.md` for full details.

**Features**:
- AI lesson generation
- Exercise suggestions
- Auto-translation
- Content enhancement

**Architecture**:
```
Frontend → API Gateway → AI Service (OpenAI/Anthropic)
                              ↓
                      Prompt Templates
                              ↓
                    Validation & Filtering
```

### Phase 4: Analytics & Insights (2026)

**Features**:
- Student progress tracking
- Exercise effectiveness metrics
- Teacher dashboards
- A/B testing exercises

**Architecture**:
```
Student Interactions → Event Stream → Analytics Pipeline
                                             ↓
                                    Data Warehouse
                                             ↓
                                    Dashboard/Reports
```

---

## Appendix: Glossary

**PPP**: Presentation, Practice, Production - ESL teaching methodology
**TTT**: Test, Teach, Test - ESL teaching methodology
**CEFR**: Common European Framework of Reference (A1-C2 levels)
**ESL**: English as a Second Language
**XSS**: Cross-Site Scripting (security vulnerability)
**SPA**: Single Page Application
**localStorage**: Browser API for client-side storage
**CRDT**: Conflict-free Replicated Data Type (for real-time collaboration)
**OT**: Operational Transformation (for real-time collaboration)

---

**Last Updated**: 2025-11-14
**Maintained by**: AI-assisted development with Claude Code
**Next Review**: Before major feature planning or architecture changes
