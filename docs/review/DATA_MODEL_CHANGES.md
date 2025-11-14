# Data Model Changes for Version 1.1.0

Complete technical specification for TypeScript type system changes required for v1.1.0 foundation fixes.

## Overview

Version 1.1.0 adds:
- New lesson structures (GPPC, CEFR) for Ukrainian
- Bilingual explanation support
- CEFR level tagging
- Context-aware phase labels

**Backwards Compatibility**: ✅ All changes are additive. Existing v1.0.0 lessons continue to work without modification.

---

## 1. Core Type Changes

### 1.1 LessonStructure Type

**File**: `src/types.ts`

**Before** (v1.0.0):
```typescript
export type LessonStructure = 'PPP' | 'TTT';
```

**After** (v1.1.0):
```typescript
export type LessonStructure = 'PPP' | 'TTT' | 'GPPC' | 'CEFR';
```

**Impact**:
- ✅ Additive change (existing values unchanged)
- Components using `LessonStructure` will accept new values
- Need to update structure selection UI (App.tsx)
- Need to update progress bar labels (context-aware)

**Migration**: None needed. Existing lessons with `'PPP'` or `'TTT'` remain valid.

---

### 1.2 BilingualText Interface (NEW)

**File**: `src/types.ts`

**New interface** (v1.1.0):
```typescript
export interface BilingualText {
  uk: string;  // Ukrainian text
  en: string;  // English text
}
```

**Purpose**: Support bilingual grammar explanations for Ukrainian lessons

**Usage**:
```typescript
const explanation: BilingualText = {
  uk: 'Орудний відмінок відповідає на питання ким? чим?...',
  en: 'The instrumental case answers "by/with whom?" "by/with what?"...'
};
```

**Impact**: New interface, no breaking changes.

---

### 1.3 Presentation Interface Update

**File**: `src/types.ts`

**Before** (v1.0.0):
```typescript
export interface Presentation {
  targetLanguage?: string;
  explanation: string;  // Required field
  examples?: string[];
}
```

**After** (v1.1.0):
```typescript
export interface Presentation {
  targetLanguage?: string;
  explanation?: string;  // NOW OPTIONAL (backwards compatible)
  explanationBilingual?: BilingualText;  // NEW: Optional bilingual support
  examples?: string[];
}
```

**Breaking Change Analysis**:
- ❌ POTENTIAL ISSUE: Making `explanation` optional could break code expecting it
- ✅ SOLUTION: Update components to check `explanation || explanationBilingual`

**Safe Implementation Pattern**:
```typescript
// StudentLessonView.tsx - Display logic
const getExplanationText = (
  presentation: Presentation,
  currentLang: 'uk' | 'en'
): string => {
  // Prioritize bilingual if available
  if (presentation.explanationBilingual) {
    return presentation.explanationBilingual[currentLang];
  }

  // Fallback to monolingual
  return presentation.explanation || '';
};
```

**Migration Strategy**:
1. Existing lessons: `explanation` field continues to work
2. New Ukrainian lessons: Use `explanationBilingual` instead
3. Components: Check both fields, prioritize `explanationBilingual`

---

### 1.4 Lesson Interface Update

**File**: `src/types.ts`

**Before** (v1.0.0):
```typescript
export interface Lesson {
  id: string;
  title: string;
  language: Language;
  structure: LessonStructure;  // 'PPP' | 'TTT'
  duration?: number;
  objectives?: string[];

  leadIn?: LeadIn;
  presentation?: Presentation;
  controlledPractice?: Practice;
  freePractice?: Practice;
  ttt?: TTT;
}
```

**After** (v1.1.0):
```typescript
export interface Lesson {
  id: string;
  title: string;
  language: Language;
  structure: LessonStructure;  // 'PPP' | 'TTT' | 'GPPC' | 'CEFR'
  level?: string;  // NEW: "A1", "A2", "B1", "B2", "C1", "C2"
  duration?: number;
  objectives?: string[];

  leadIn?: LeadIn;
  presentation?: Presentation;
  controlledPractice?: Practice;
  freePractice?: Practice;
  ttt?: TTT;
}
```

**Changes**:
- `structure` now accepts `'GPPC' | 'CEFR'`
- `level` field added (optional, backwards compatible)

**Impact**: ✅ Additive change, no breaking changes.

**Usage**:
```typescript
// New Ukrainian GPPC lesson
const lesson: Lesson = {
  id: 'uk-instrumental-case',
  title: 'Орудний відмінок',
  language: 'uk',
  structure: 'GPPC',
  level: 'A2',  // NEW field
  duration: 60,
  // ...
};

// Old English PPP lesson (still valid)
const oldLesson: Lesson = {
  id: 'en-present-simple',
  title: 'Present Simple',
  language: 'en',
  structure: 'PPP',
  // level is optional - not required
  duration: 60,
  // ...
};
```

---

## 2. Component Interface Changes

### 2.1 ProgressBar Props Update

**File**: `src/components/ProgressBar.tsx`

**Before** (v1.0.0):
```typescript
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  language: Language;
}
```

**After** (v1.1.0):
```typescript
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  language: Language;
  structure: LessonStructure;  // NEW: Needed for context-aware labels
}
```

**Impact**: Must update all `<ProgressBar>` call sites to pass `structure` prop.

**Example Update**:
```typescript
// App.tsx - Before
<ProgressBar
  currentStep={step}
  totalSteps={6}
  language={language}
/>

// App.tsx - After
<ProgressBar
  currentStep={step}
  totalSteps={6}
  language={language}
  structure={lesson.structure}  // NEW required prop
/>
```

---

### 2.2 StudentLessonView Props Update

**File**: `src/components/StudentLessonView.tsx`

No interface changes needed, but internal logic must handle:
1. New `GPPC` and `CEFR` structures
2. Bilingual explanation display with language toggle
3. CEFR level display

**New internal state**:
```typescript
const [explanationLang, setExplanationLang] = useState<'uk' | 'en'>('uk');
```

**New UI elements**:
```tsx
{lesson.presentation?.explanationBilingual && (
  <div className="language-toggle">
    <button
      className={explanationLang === 'uk' ? 'active' : ''}
      onClick={() => setExplanationLang('uk')}
    >
      🇺🇦 Українська
    </button>
    <button
      className={explanationLang === 'en' ? 'active' : ''}
      onClick={() => setExplanationLang('en')}
    >
      🇬🇧 English explanations
    </button>
  </div>
)}
```

---

## 3. Translation Type Changes

### 3.1 Add New Translation Keys

**File**: `src/translations.ts`

**New keys required**:
```typescript
interface Translations {
  // Existing keys...

  // NEW: Common structure UI labels
  phases: { en: string; uk: string };
  bestFor: { en: string; uk: string };

  // NEW: PPP structure (English ESL) - COMPLETE descriptions
  ppp: {
    title: { en: string; uk: string };
    description: { en: string; uk: string };
    step1: { en: string; uk: string };
    step2: { en: string; uk: string };
    step3: { en: string; uk: string };
    bestFor: { en: string; uk: string };
  };

  // NEW: TTT structure (English ESL) - COMPLETE descriptions
  ttt: {
    title: { en: string; uk: string };
    description: { en: string; uk: string };
    step1: { en: string; uk: string };
    step2: { en: string; uk: string };
    step3: { en: string; uk: string };
    bestFor: { en: string; uk: string };
  };

  // NEW: GPPC structure (Ukrainian UFL) - COMPLETE descriptions
  gppc: {
    title: { en: string; uk: string };
    description: { en: string; uk: string };
    step1: { en: string; uk: string };  // Введення теми / Topic Introduction
    step2: { en: string; uk: string };  // Презентація граматики / Grammar Presentation
    step3: { en: string; uk: string };  // Контрольована практика / Controlled Practice
    step4: { en: string; uk: string };  // Комунікативна практика / Communicative Practice
    bestFor: { en: string; uk: string };
  };

  // NEW: CEFR structure (Ukrainian UFL) - COMPLETE descriptions
  cefr: {
    title: { en: string; uk: string };
    description: { en: string; uk: string };
    step1: { en: string; uk: string };  // Завдання / Task Introduction
    step2: { en: string; uk: string };  // Підготовка / Preparation
    step3: { en: string; uk: string };  // Виконання / Task Execution
    step4: { en: string; uk: string };  // Рефлексія / Reflection & Language Focus
    bestFor: { en: string; uk: string };
  };

  // NEW: CEFR level selector
  cefrLevel: {
    label: { en: string; uk: string };  // "CEFR Level"
    placeholder: { en: string; uk: string };  // "Select level (optional)"
    a1: { en: string; uk: string };
    a2: { en: string; uk: string };
    b1: { en: string; uk: string };
    b2: { en: string; uk: string };
    c1: { en: string; uk: string };
  };

  // NEW: Bilingual toggle
  bilingualToggle: {
    label: { en: string; uk: string };  // "Add English translation for learners"
    helpText: { en: string; uk: string };  // "Helps non-native speakers understand grammar"
  };
}
```

**Full Implementation**:
```typescript
export const translations: Translations = {
  // ... existing translations ...

  gppc: {
    step1: {
      en: 'Topic Introduction',
      uk: 'Введення теми'
    },
    step2: {
      en: 'Grammar Presentation',
      uk: 'Презентація граматики'
    },
    step3: {
      en: 'Controlled Practice',
      uk: 'Контрольована практика'
    },
    step4: {
      en: 'Communicative Practice',
      uk: 'Комунікативна практика'
    }
  },

  cefr: {
    step1: {
      en: 'Task Introduction',
      uk: 'Завдання'
    },
    step2: {
      en: 'Preparation',
      uk: 'Підготовка'
    },
    step3: {
      en: 'Task Execution',
      uk: 'Виконання'
    },
    step4: {
      en: 'Reflection & Language Focus',
      uk: 'Рефлексія'
    }
  },

  cefrLevel: {
    label: {
      en: 'CEFR Level',
      uk: 'Рівень CEFR'
    },
    placeholder: {
      en: 'Select level (A1-C1)',
      uk: 'Оберіть рівень (A1-C1)'
    },
    a1: { en: 'A1 - Beginner', uk: 'A1 - Початковий' },
    a2: { en: 'A2 - Elementary', uk: 'A2 - Базовий' },
    b1: { en: 'B1 - Intermediate', uk: 'B1 - Середній' },
    b2: { en: 'B2 - Upper-Intermediate', uk: 'B2 - Вище середнього' },
    c1: { en: 'C1 - Advanced', uk: 'C1 - Просунутий' }
  },

  bilingualToggle: {
    label: {
      en: 'Add English translation for learners',
      uk: 'Додати англійський переклад для учнів'
    },
    helpText: {
      en: 'Helps non-Ukrainian speakers understand grammar explanations',
      uk: 'Допомагає іноземним студентам зрозуміти граматичні пояснення'
    }
  }
};
```

---

## 4. Helper Function Changes

### 4.1 Context-Aware Progress Labels

**File**: `src/components/ProgressBar.tsx`

**New helper function**:
```typescript
const getStepLabels = (
  structure: LessonStructure,
  language: Language
): string[] => {
  const t = translations;

  switch (structure) {
    case 'PPP':
      return [
        t.structure[language],
        t.leadIn[language],
        t.presentation[language],
        t.controlledPractice[language],
        t.freePractice[language],
        t.preview[language]
      ];

    case 'TTT':
      return [
        t.structure[language],
        t.leadIn[language],
        t.ttt.step1[language],  // Test 1
        t.ttt.step2[language],  // Teach
        t.ttt.step3[language],  // Test 2
        t.preview[language]
      ];

    case 'GPPC':
      return [
        t.structure[language],
        t.gppc.step1[language],  // Введення теми
        t.gppc.step2[language],  // Презентація граматики
        t.gppc.step3[language],  // Контрольована практика
        t.gppc.step4[language],  // Комунікативна практика
        t.preview[language]
      ];

    case 'CEFR':
      return [
        t.structure[language],
        t.cefr.step1[language],  // Завдання
        t.cefr.step2[language],  // Підготовка
        t.cefr.step3[language],  // Виконання
        t.cefr.step4[language],  // Рефлексія
        t.preview[language]
      ];
  }
};
```

**Usage**:
```typescript
const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  language,
  structure  // NEW prop
}) => {
  const stepLabels = getStepLabels(structure, language);

  return (
    <div className="progress-bar">
      {stepLabels.map((label, index) => (
        <div key={index} className={currentStep === index ? 'active' : ''}>
          {label}
        </div>
      ))}
    </div>
  );
};
```

---

## 5. localStorage Format Changes

### 5.1 Backwards Compatibility

**Storage key**: `'vibe-lessons'`

**Old format** (v1.0.0):
```json
[
  {
    "id": "lesson-1",
    "title": "Present Simple",
    "language": "en",
    "structure": "PPP",
    "presentation": {
      "explanation": "Present Simple is used for habits..."
    }
  }
]
```

**New format** (v1.1.0):
```json
[
  {
    "id": "lesson-1",
    "title": "Present Simple",
    "language": "en",
    "structure": "PPP",
    "presentation": {
      "explanation": "Present Simple is used for habits..."
    }
  },
  {
    "id": "lesson-2",
    "title": "Орудний відмінок",
    "language": "uk",
    "structure": "GPPC",
    "level": "A2",
    "presentation": {
      "explanationBilingual": {
        "uk": "Орудний відмінок...",
        "en": "The instrumental case..."
      }
    }
  }
]
```

**Migration**: ✅ No migration needed. Old lessons load correctly with new code.

**Validation Logic**:
```typescript
const isValidLesson = (lesson: any): lesson is Lesson => {
  // Required fields
  if (!lesson.id || !lesson.title || !lesson.language || !lesson.structure) {
    return false;
  }

  // Valid structure
  if (!['PPP', 'TTT', 'GPPC', 'CEFR'].includes(lesson.structure)) {
    return false;
  }

  // If has presentation, must have explanation OR explanationBilingual
  if (lesson.presentation) {
    const hasExplanation = lesson.presentation.explanation;
    const hasBilingual = lesson.presentation.explanationBilingual;

    if (!hasExplanation && !hasBilingual) {
      return false;
    }
  }

  return true;
};
```

---

## 6. Import/Export Format

### 6.1 JSON Export

**No changes needed**. TypeScript types are serialized to JSON naturally.

**Example export** (v1.1.0 with new fields):
```json
{
  "version": "1.1.0",
  "exportDate": "2025-11-14T12:00:00Z",
  "lesson": {
    "id": "uk-instrumental",
    "title": "Орудний відмінок",
    "language": "uk",
    "structure": "GPPC",
    "level": "A2",
    "presentation": {
      "explanationBilingual": {
        "uk": "Орудний відмінок відповідає на питання ким? чим?",
        "en": "The instrumental case answers 'by/with whom?' 'by/with what?'"
      }
    }
  }
}
```

**Import validation**:
```typescript
const validateImport = (data: any): Lesson | null => {
  try {
    // Check version compatibility
    if (data.version && !isCompatibleVersion(data.version)) {
      console.warn(`Importing from older version: ${data.version}`);
    }

    // Validate lesson structure
    if (!isValidLesson(data.lesson)) {
      throw new Error('Invalid lesson format');
    }

    return data.lesson;
  } catch (error) {
    console.error('Import failed:', error);
    return null;
  }
};
```

---

## 7. Sample Lessons Data Structure

### 7.1 New Ukrainian Sample Lessons

**File**: `src/data/sampleLessonsUkrainian.ts`

**GPPC Example**:
```typescript
export const ukrainianGPPCSamples: Lesson[] = [
  {
    id: 'sample-uk-gppc-instrumental',
    title: 'Орудний відмінок іменників',
    language: 'uk',
    structure: 'GPPC',
    level: 'A2',
    duration: 60,
    objectives: [
      'Розпізнавати орудний відмінок у реченнях',
      'Утворювати форми орудного відмінка',
      'Використовувати орудний відмінок у комунікації'
    ],

    leadIn: {
      title: 'Введення теми: Як ми описуємо інструменти?',
      content: 'Покажіть картинки з інструментами. Запитайте: "Чим ви пишете? Чим ви їсте?" Активуйте питання "чим?"'
    },

    presentation: {
      title: 'Презентація граматики: Орудний відмінок',
      explanationBilingual: {
        uk: `Орудний відмінок відповідає на питання ким? чим?

Закінчення:
І відміна (жін. рід): -ою, -ею (сестрою, землею)
ІІ відміна (чол./сер.): -ом, -ем (столом, полем)
ІІІ відміна (жін. рід): -'ю, -ю (річчю, міддю)

Вживання:
1. Знаряддя дії: писати ручкою
2. Спосіб дії: йти лісом
3. Після прийменників: з, над, під, між`,

        en: `The instrumental case answers "by/with whom?" "by/with what?"

Endings:
1st declension (fem.): -ою, -ею (with-sister, with-earth)
2nd declension (masc./neut.): -ом, -ем (with-table, in-field)
3rd declension (fem.): -'ю, -ю (with-thing, with-copper)

Usage:
1. Instrument of action: to write with-pen
2. Manner/route: to go by-forest
3. After prepositions: with, over, under, between`
      },
      examples: [
        'Я пишу ручкою. (I write with a pen)',
        'Над річкою міст. (Over the river is a bridge)',
        'Я пишаюся своїм братом. (I\'m proud of my brother)'
      ]
    },

    controlledPractice: {
      title: 'Контрольована практика',
      exercises: [
        {
          id: 'cp-1',
          type: 'gap-fill',
          text: 'Я пишу (ручка) ____.',
          answer: 'ручкою'
        },
        {
          id: 'cp-2',
          type: 'matching',
          pairs: [
            { left: 'І відміна', right: '-ою, -ею' },
            { left: 'ІІ відміна', right: '-ом, -ем' },
            { left: 'ІІІ відміна', right: '-\'ю, -ю' }
          ]
        },
        {
          id: 'cp-3',
          type: 'multiple-choice',
          question: 'Я їм (ложка) ____.',
          options: ['ложка', 'ложки', 'ложкою', 'ложці'],
          correctIndex: 2
        }
      ]
    },

    freePractice: {
      title: 'Комунікативна практика',
      exercises: [
        {
          id: 'fp-1',
          type: 'free-text',
          prompt: 'Напишіть 5 речень про те, ким або чим ви пишаєтесь.'
        },
        {
          id: 'fp-2',
          type: 'role-play',
          scenario: 'Ресторан: Запитайте офіціанта "З чим подається борщ?"'
        }
      ]
    }
  }
];
```

**CEFR Example**:
```typescript
export const ukrainianCEFRSamples: Lesson[] = [
  {
    id: 'sample-uk-cefr-formal-letter',
    title: 'Написання офіційного листа',
    language: 'uk',
    structure: 'CEFR',
    level: 'B1',
    duration: 60,
    objectives: [
      'Написати офіційний лист з дотриманням структури',
      'Використовувати формальний реєстр мовлення',
      'Чітко викласти мету звернення'
    ],

    leadIn: {
      title: 'Завдання: Написати офіційний електронний лист',
      content: 'Покажіть приклади офіційних листів. Обговоріть: Що робить їх офіційними? Яка структура?'
    },

    presentation: {
      title: 'Підготовка: Структура офіційного листа',
      explanationBilingual: {
        uk: `Структура офіційного листа:
1. Привітання: Шановний/Шановна + прізвище
2. Мета листа: Звертаюсь до Вас з проханням/запитанням...
3. Деталі: Викладення суті звернення
4. Завершення: З повагою, + ваше ім'я та прізвище

Формальна лексика:
- Звертаюсь до Вас...
- Прошу розглянути...
- Буду вдячний/вдячна за...
- Сподіваюсь на...`,

        en: `Formal letter structure:
1. Greeting: Dear Mr./Ms. + surname
2. Purpose: I am writing to request/inquire...
3. Details: Explanation of the matter
4. Closing: Respectfully, + your full name

Formal vocabulary:
- I am writing to you...
- Please consider...
- I would be grateful for...
- I hope for...`
      },
      examples: [
        'Шановний пане Коваленко,\nЗвертаюсь до Вас з проханням...',
        'Прошу розглянути моє прохання про...',
        'З повагою,\nОлександр Петренко'
      ]
    },

    controlledPractice: {
      title: 'Виконання завдання',
      exercises: [
        {
          id: 'task-1',
          type: 'free-text',
          prompt: `Напишіть офіційний лист до декана факультету з проханням про зустріч для обговорення теми дипломної роботи.

Мінімум: 150 слів

Критерії:
- Формальний реєстр
- Чітка структура
- Ввічливий тон
- Правильне оформлення`
        }
      ]
    },

    freePractice: {
      title: 'Рефлексія та покращення',
      exercises: [
        {
          id: 'reflection-1',
          type: 'free-text',
          prompt: 'Обміняйтесь листами з партнером. Перевірте: Чи формальний тон? Чи правильна структура? Що можна покращити?'
        }
      ]
    }
  }
];
```

---

## 8. Migration Checklist

### Phase 1: Types and Interfaces (src/types.ts)
- [ ] Add `'GPPC' | 'CEFR'` to `LessonStructure` type
- [ ] Create `BilingualText` interface
- [ ] Update `Presentation` interface (make `explanation` optional, add `explanationBilingual?`)
- [ ] Add `level?: string` to `Lesson` interface
- [ ] Update type exports

### Phase 2: Translations (src/translations.ts)
- [ ] Add `gppc` object with 4 step labels
- [ ] Add `cefr` object with 4 step labels
- [ ] Add `cefrLevel` object with label, placeholder, and 5 level options
- [ ] Add `bilingualToggle` object with label and help text

### Phase 3: Components
- [ ] **ProgressBar.tsx**: Add `structure` prop, implement `getStepLabels()` helper
- [ ] **App.tsx**: Update structure selection UI to show all 4 options
- [ ] **App.tsx**: Add CEFR level selector in lesson metadata form
- [ ] **PresentationForm.tsx**: Add bilingual toggle checkbox and dual textarea
- [ ] **StudentLessonView.tsx**: Add language toggle for bilingual explanations
- [ ] **StudentLessonView.tsx**: Handle `GPPC` and `CEFR` structures in display logic

### Phase 4: Sample Lessons
- [ ] Create 3 GPPC sample lessons (Instrumental Case, Verb Aspects, Motion Verbs)
- [ ] Create 4 CEFR sample lessons (Formal Letter, Debate, Literature, Presentation)
- [ ] Update `src/data/sampleLessonsUkrainian.ts` with new samples
- [ ] Ensure all 7 lessons have bilingual explanations

### Phase 5: Testing
- [ ] Load old v1.0.0 lessons (verify backwards compatibility)
- [ ] Create new GPPC lesson with bilingual explanation
- [ ] Create new CEFR lesson with bilingual explanation
- [ ] Test language toggle in student view
- [ ] Test import/export with new fields
- [ ] Test all 4 structures show correct progress labels

### Phase 6: Documentation
- [ ] Update CHANGELOG.md with v1.1.0 changes
- [ ] Update README.md with new features
- [ ] Update CLAUDE.md with new types

---

## 9. Backwards Compatibility Validation

### Test Cases

**Test 1: Load old v1.0.0 PPP lesson**
```typescript
const oldLesson: Lesson = {
  id: 'old-1',
  title: 'Present Simple',
  language: 'en',
  structure: 'PPP',
  presentation: {
    explanation: 'Present Simple is used for habits...'
  }
};

// Should load and display correctly
// No errors, no migration needed
```
✅ **Expected**: Lesson loads, explanation displays normally

**Test 2: Load old v1.0.0 TTT lesson**
```typescript
const oldTTT: Lesson = {
  id: 'old-2',
  title: 'Passive Voice',
  language: 'en',
  structure: 'TTT',
  ttt: {
    test1: { /* ... */ },
    teach: { /* ... */ },
    test2: { /* ... */ }
  }
};
```
✅ **Expected**: Lesson loads, TTT phases display correctly

**Test 3: Create new GPPC lesson**
```typescript
const newGPPC: Lesson = {
  id: 'new-1',
  title: 'Орудний відмінок',
  language: 'uk',
  structure: 'GPPC',
  level: 'A2',
  presentation: {
    explanationBilingual: {
      uk: 'Орудний відмінок...',
      en: 'Instrumental case...'
    }
  }
};
```
✅ **Expected**: Lesson saves, bilingual toggle appears in student view

**Test 4: Mixed old and new lessons in localStorage**
```json
[
  { "structure": "PPP", "presentation": { "explanation": "..." } },
  { "structure": "GPPC", "level": "A2", "presentation": { "explanationBilingual": { ... } } }
]
```
✅ **Expected**: Both load correctly, app handles both formats

---

## 10. Error Handling

### Type Guards

```typescript
export const isBilingualPresentation = (
  presentation: Presentation
): presentation is Presentation & { explanationBilingual: BilingualText } => {
  return presentation.explanationBilingual !== undefined;
};

export const hasExplanation = (presentation: Presentation): boolean => {
  return !!(presentation.explanation || presentation.explanationBilingual);
};

export const isGPPCorCEFR = (structure: LessonStructure): boolean => {
  return structure === 'GPPC' || structure === 'CEFR';
};
```

### Safe Access Patterns

```typescript
// Safe explanation access
const getExplanation = (
  presentation: Presentation | undefined,
  lang: 'uk' | 'en'
): string => {
  if (!presentation) return '';

  if (presentation.explanationBilingual) {
    return presentation.explanationBilingual[lang];
  }

  return presentation.explanation || '';
};

// Safe level display
const getLevelDisplay = (lesson: Lesson): string => {
  if (!lesson.level) return '';
  return `CEFR ${lesson.level}`;
};
```

---

## Summary

**Type Changes**: 4 interfaces/types updated
- `LessonStructure` (2 new values)
- `BilingualText` (new interface)
- `Presentation` (1 optional field changed, 1 added)
- `Lesson` (1 field added)

**Component Changes**: 5 components
- ProgressBar (new prop, new helper function)
- App (structure selector, CEFR level selector)
- PresentationForm (bilingual toggle)
- StudentLessonView (language toggle)
- translations (4 new sections)

**Data Changes**: 7 new sample lessons

**Breaking Changes**: ❌ None (fully backwards compatible)

**Migration Effort**: 🟢 Low (2-4 hours implementation)

**Testing Effort**: 🟡 Medium (comprehensive backwards compatibility testing)

---

**Version**: 1.0.0
**Last Updated**: 2025-11-14
**Related Documents**:
- [FOUNDATION_FIXES.md](FOUNDATION_FIXES.md) - Complete v1.1.0 specification
- [UKRAINIAN_METHODOLOGY_SPEC.md](UKRAINIAN_METHODOLOGY_SPEC.md) - Pedagogical details
- [METHODOLOGY_REVIEW.md](METHODOLOGY_REVIEW.md) - Analysis of current implementation
