# Vibe 1.1.0 Foundation Fixes

**Version**: 1.0.0 → 1.1.0
**Date**: 2025-11-14
**Status**: Specification (Implementation Pending)
**Purpose**: Fix methodological foundation before Phase 1 (Media Integration)

---

## Executive Summary

### What We're Fixing

Version 1.0.0 forces both English (ESL) and Ukrainian (UFL) into the same PPP/TTT structures, which don't naturally fit Ukrainian grammar-focused teaching. Version 1.1.0 adds:

1. ✅ **GPPC structure** for Ukrainian (A1-B1 levels)
2. ✅ **CEFR structure** for Ukrainian (B1+ levels)
3. ✅ **Bilingual support** (Ukrainian + English explanations with student toggle)
4. ✅ **7 new Ukrainian sample lessons** (3 GPPC + 4 CEFR)
5. ✅ **Context-aware phase labels** (different labels for different structures)

### Impact

- **Breaking Changes**: None (backwards compatible)
- **New Features**: 2 new lesson structures, bilingual explanations
- **Sample Lessons**: 7 English (existing) + 7 Ukrainian (new) = 14 total
- **Implementation Time**: 1-2 days
- **Testing Goal**: Present v1.1.0 to Ukrainian teachers for feedback

---

## 1. Add New Lesson Structures

### Current State (v1.0.0)

```typescript
// src/types.ts
export type LessonStructure = 'PPP' | 'TTT';
```

**Problem**: Ukrainian lessons forced into ESL structures

### Target State (v1.1.0)

```typescript
// src/types.ts
export type LessonStructure =
  | 'PPP'   // Presentation-Practice-Production (ESL communicative)
  | 'TTT'   // Test-Teach-Test (ESL discovery)
  | 'GPPC'  // Grammar-Presentation-Practice-Communication (Ukrainian A1-B1)
  | 'CEFR'; // CEFR Task-Based (Ukrainian B1+, more communicative)
```

### Structure Definitions

#### GPPC (Grammar-Presentation-Practice-Communication)

**Target**: Ukrainian A1-B1 (Beginner to Intermediate)
**Focus**: Grammar foundation with communicative application
**Best for**: Cases, verb aspects, declensions, morphology

| Phase | Duration | Purpose |
|-------|----------|---------|
| **Введення теми** (Topic Introduction) | 5-10 min | Activate context, pre-teach vocabulary |
| **Презентація граматики** (Grammar Presentation) | 15-20 min | Explicit rules, tables, paradigms |
| **Контрольована практика** (Controlled Practice) | 15-20 min | Accuracy drills, immediate feedback |
| **Комунікативна практика** (Communicative Practice) | 15-20 min | Apply in context, meaningful use |

**Example topics**: Instrumental case, perfective/imperfective aspect, motion verbs

#### CEFR (Task-Based Approach)

**Target**: Ukrainian B1+ (Intermediate to Advanced)
**Focus**: Task completion with grammar as support
**Best for**: Functional language, discourse, complex communication

| Phase | Duration | Purpose |
|-------|----------|---------|
| **Завдання** (Task Introduction) | 10 min | Present communicative task/goal |
| **Підготовка** (Preparation) | 15 min | Activate language resources needed |
| **Виконання** (Task Execution) | 20 min | Complete task, use language |
| **Рефлексія** (Reflection & Language Focus) | 15 min | Analyze language use, correct errors |

**Example topics**: Writing formal letters, participating in debates, presenting arguments, text analysis

---

## 2. Add Bilingual Support

### Current State (v1.0.0)

Grammar explanations only in Ukrainian:

```typescript
presentation: {
  explanation: 'Орудний відмінок відповідає на питання ким? чим?'
}
```

**Problem**: English speakers learning Ukrainian can't understand grammar explanations

### Target State (v1.1.0)

Grammar explanations in **both** Ukrainian and English:

```typescript
// src/types.ts - UPDATE
export interface Presentation {
  title: string;
  targetLanguage: string;
  examples: string[];

  // OPTION A: Simple string (backwards compatible)
  explanation: string;

  // OPTION B: Bilingual object (new)
  explanationBilingual?: {
    uk: string;  // Ukrainian explanation
    en: string;  // English explanation
  };

  // OPTION C: Array of bilingual examples (advanced)
  examplesBilingual?: {
    uk: string;
    en: string;
    note?: string;
  }[];

  duration?: number;
  mediaLinks?: string[];
  teacherNotes?: string;
}
```

### Implementation Strategy

**Phase 1: Add optional bilingual fields** (backwards compatible)
- Keep existing `explanation` field (Ukrainian only)
- Add `explanationBilingual: { uk, en }` (optional)
- If `explanationBilingual` exists, use it; otherwise use `explanation`

**Phase 2: Student view toggle**
```typescript
// src/components/StudentLessonView.tsx - ADD
const [explanationLanguage, setExplanationLanguage] = useState<'uk' | 'en'>('uk');

// Toggle button
<div className="language-toggle">
  <button onClick={() => setExplanationLanguage('uk')}>
    🇺🇦 Українська
  </button>
  <button onClick={() => setExplanationLanguage('en')}>
    🇬🇧 English explanations
  </button>
</div>

// Display explanation
{presentation.explanationBilingual ? (
  <p>{presentation.explanationBilingual[explanationLanguage]}</p>
) : (
  <p>{presentation.explanation}</p>
)}
```

### Bilingual Content Guidelines

**What should be bilingual**:
- ✅ Grammar explanations (rules, patterns)
- ✅ Instructions for exercises
- ✅ Learning objectives
- ✅ Teacher notes (optional)

**What should stay Ukrainian-only**:
- ❌ Ukrainian example sentences (always in Ukrainian)
- ❌ Vocabulary items (target language)
- ❌ Text for comprehension exercises

**Example bilingual content**:

```typescript
presentation: {
  explanationBilingual: {
    uk: `Орудний відмінок відповідає на питання ким? чим?

    Закінчення:
    І відміна: -ою, -ею (сестрою, землею)
    ІІ відміна: -ом, -ем (столом, полем)
    ІІІ відміна: -ю, -'ю (річчю, міддю)

    Вживання:
    - знаряддя дії: писати ручкою
    - спосіб дії: йти лісом
    - після прийменників: з, над, під, між`,

    en: `The instrumental case answers the questions "by whom?" "by what?"

    Endings:
    1st declension: -ою, -ею (sister-INST, earth-INST)
    2nd declension: -ом, -ем (table-INST, field-INST)
    3rd declension: -ю, -'ю (thing-INST, copper-INST)

    Usage:
    - instrument of action: write with-pen
    - manner of action: go by-forest (through the forest)
    - after prepositions: with, above, under, between`
  },
  examples: [
    'Учень пише олівцем. (The student writes with a pencil)',
    'Я пишаюся батьками. (I am proud of my parents)',
    'Над річкою розкінувся місток. (A bridge spans over the river)'
  ]
}
```

---

## 3. Context-Aware Phase Labels

### Current State (v1.0.0)

All lessons show same labels regardless of structure:

```
Lead-In → Presentation → Controlled Practice → Free Practice
```

**Problem**: "Presentation" doesn't describe Ukrainian grammar explanation phase

### Target State (v1.1.0)

Labels change based on lesson structure:

```typescript
// src/translations.ts - ADD COMPLETE STRUCTURE DESCRIPTIONS

export const translations = {
  en: {
    // ... existing translations

    // Common structure labels
    phases: 'Phases',
    bestFor: 'Best for',

    // PPP Structure (English ESL)
    ppp: {
      title: 'PPP (Presentation-Practice-Production)',
      description: 'Communicative grammar instruction with fluency focus',
      step1: 'Presentation',      // Context → Notice → Understand
      step2: 'Controlled Practice', // Accuracy drills with correction
      step3: 'Free Production',     // Meaningful communication
      bestFor: 'Grammar lessons (verb tenses, modals, conditionals), A1-B2 levels'
    },

    // TTT Structure (English ESL)
    ttt: {
      title: 'TTT (Test-Teach-Test)',
      description: 'Discovery-based learning through authentic tasks',
      step1: 'Test 1 (Diagnostic)',   // Find gaps in knowledge
      step2: 'Teach (Gap Filling)',   // Address specific problems
      step3: 'Test 2 (Assessment)',   // Measure improvement
      bestFor: 'Revision, authentic texts, student-led discovery, B1+ levels'
    },

    // GPPC Structure (Ukrainian UFL)
    gppc: {
      title: 'GPPC (Grammar-Presentation-Practice-Communication)',
      description: 'Grammar foundation with explicit rules and communicative practice',
      step1: 'Topic Introduction',       // Activate prior grammar knowledge
      step2: 'Grammar Presentation',     // Explicit rules + paradigm tables
      step3: 'Controlled Practice',      // Accuracy drills (gap-fills, matching)
      step4: 'Communicative Practice',   // Apply grammar in context
      bestFor: 'Cases (all 6), verb aspects, declensions, motion verbs, A1-B1 levels'
    },

    // CEFR Structure (Ukrainian UFL)
    cefr: {
      title: 'CEFR Task-Based Learning',
      description: 'Real-world tasks with language focus after completion',
      step1: 'Task Introduction',         // Present authentic task
      step2: 'Preparation',               // Activate language resources
      step3: 'Task Execution',            // Complete the task
      step4: 'Reflection & Language Focus', // Analyze errors, focus on form
      bestFor: 'Formal writing, debates, presentations, literature analysis, B1-C1 levels'
    }
  },

  uk: {
    // ... existing translations

    // Common structure labels
    phases: 'Фази',
    bestFor: 'Найкраще для',

    // PPP Structure (English ESL)
    ppp: {
      title: 'PPP (Презентація-Практика-Продукція)',
      description: 'Комунікативне навчання граматики з фокусом на вільність',
      step1: 'Презентація',          // Контекст → Помічання → Розуміння
      step2: 'Контрольована практика', // Вправи на точність з корекцією
      step3: 'Вільна продукція',      // Змістовна комунікація
      bestFor: 'Граматичні уроки (часи дієслів, модальні, умовні), рівні A1-B2'
    },

    // TTT Structure (English ESL)
    ttt: {
      title: 'TTT (Тест-Навчання-Тест)',
      description: 'Навчання через відкриття за допомогою автентичних завдань',
      step1: 'Тест 1 (Діагностика)',    // Виявлення прогалин у знаннях
      step2: 'Навчання (Заповнення прогалин)', // Робота над конкретними проблемами
      step3: 'Тест 2 (Оцінювання)',     // Вимірювання покращення
      bestFor: 'Повторення, автентичні тексти, навчання під керівництвом студента, рівні B1+'
    },

    // GPPC Structure (Ukrainian UFL)
    gppc: {
      title: 'ГППК (Граматика-Презентація-Практика-Комунікація)',
      description: 'Граматична основа з явними правилами та комунікативною практикою',
      step1: 'Введення теми',             // Активація попередніх граматичних знань
      step2: 'Презентація граматики',     // Явні правила + парадигми
      step3: 'Контрольована практика',    // Вправи на точність (заповнення пропусків, зіставлення)
      step4: 'Комунікативна практика',    // Застосування граматики в контексті
      bestFor: 'Відмінки (всі 6), види дієслів, відміни, дієслова руху, рівні A1-B1'
    },

    // CEFR Structure (Ukrainian UFL)
    cefr: {
      title: 'CEFR Навчання на основі завдань',
      description: 'Реальні завдання з мовним фокусом після виконання',
      step1: 'Завдання',                   // Представлення автентичного завдання
      step2: 'Підготовка',                 // Активація мовних ресурсів
      step3: 'Виконання',                  // Виконання завдання
      step4: 'Рефлексія та мовний фокус',  // Аналіз помилок, фокус на формі
      bestFor: 'Формальне письмо, дебати, презентації, аналіз літератури, рівні B1-C1'
    }
  }
};
```

### UI Updates

#### Structure Selection Screen

```typescript
// src/App.tsx - UPDATE structure selection
{currentStep === 'structure' && (
  <div className="step-content">
    <h2>{t.chooseStructure}</h2>

    {/* Language-specific methodology explanation */}
    <div className="methodology-info">
      <p className="methodology-note">
        {language === 'en' ? (
          <>
            <strong>English (ESL)</strong> uses communicative teaching methods:
            PPP (grammar-focused) and TTT (discovery-based).
          </>
        ) : (
          <>
            <strong>Українська мова (УІМ)</strong> використовує гібридний підхід:
            ГППК (граматична основа) та CEFR (навчання через завдання).
          </>
        )}
      </p>
    </div>

    {/* Show different structures based on teaching language */}
    {language === 'en' ? (
      // English: PPP and TTT
      <div className="structure-selection">
        <div
          className={`structure-card PPP ${lesson.structure === 'PPP' ? 'selected' : ''}`}
          onClick={() => updateLesson({ structure: 'PPP' })}
        >
          <div className="structure-header">
            <h3>{t.ppp.title}</h3>
            <span className="structure-badge">ESL Method</span>
          </div>
          <p className="structure-description">{t.ppp.description}</p>
          <div className="structure-phases">
            <strong>{t.phases}:</strong>
            <ol>
              <li>{t.ppp.step1}</li>
              <li>{t.ppp.step2}</li>
              <li>{t.ppp.step3}</li>
            </ol>
          </div>
          <p className="structure-best-for">
            <strong>{t.bestFor}:</strong> {t.ppp.bestFor}
          </p>
        </div>

        <div
          className={`structure-card TTT ${lesson.structure === 'TTT' ? 'selected' : ''}`}
          onClick={() => updateLesson({ structure: 'TTT' })}
        >
          <div className="structure-header">
            <h3>{t.ttt.title}</h3>
            <span className="structure-badge">ESL Method</span>
          </div>
          <p className="structure-description">{t.ttt.description}</p>
          <div className="structure-phases">
            <strong>{t.phases}:</strong>
            <ol>
              <li>{t.ttt.step1}</li>
              <li>{t.ttt.step2}</li>
              <li>{t.ttt.step3}</li>
            </ol>
          </div>
          <p className="structure-best-for">
            <strong>{t.bestFor}:</strong> {t.ttt.bestFor}
          </p>
        </div>
      </div>
    ) : (
      // Ukrainian: GPPC and CEFR
      <div className="structure-selection">
        <div
          className={`structure-card GPPC ${lesson.structure === 'GPPC' ? 'selected' : ''}`}
          onClick={() => updateLesson({ structure: 'GPPC' })}
        >
          <div className="structure-header">
            <h3>{t.gppc.title}</h3>
            <span className="structure-badge">УІМ Метод</span>
          </div>
          <p className="structure-description">{t.gppc.description}</p>
          <div className="structure-phases">
            <strong>{t.phases}:</strong>
            <ol>
              <li>{t.gppc.step1}</li>
              <li>{t.gppc.step2}</li>
              <li>{t.gppc.step3}</li>
              <li>{t.gppc.step4}</li>
            </ol>
          </div>
          <p className="structure-best-for">
            <strong>{t.bestFor}:</strong> {t.gppc.bestFor}
          </p>
        </div>

        <div
          className={`structure-card CEFR ${lesson.structure === 'CEFR' ? 'selected' : ''}`}
          onClick={() => updateLesson({ structure: 'CEFR' })}
        >
          <div className="structure-header">
            <h3>{t.cefr.title}</h3>
            <span className="structure-badge">УІМ Метод</span>
          </div>
          <p className="structure-description">{t.cefr.description}</p>
          <div className="structure-phases">
            <strong>{t.phases}:</strong>
            <ol>
              <li>{t.cefr.step1}</li>
              <li>{t.cefr.step2}</li>
              <li>{t.cefr.step3}</li>
              <li>{t.cefr.step4}</li>
            </ol>
          </div>
          <p className="structure-best-for">
            <strong>{t.bestFor}:</strong> {t.cefr.bestFor}
          </p>
        </div>
      </div>
    )}

    {/* Lesson title input */}
    <div className="form-group">
      <label>{t.lessonTitle}</label>
      <input
        type="text"
        value={lesson.title}
        onChange={(e) => updateLesson({ title: e.target.value })}
      />
    </div>
  </div>
)}
```

#### Progress Bar

```typescript
// src/App.tsx - UPDATE progress bar
<div className="progress-bar">
  {getStructureLabels(lesson.structure, language).map((label, index) => (
    <div
      key={index}
      className={`progress-step ${index <= currentStepIndex ? 'active' : ''}`}
    >
      {label}
    </div>
  ))}
</div>

// Helper function
function getStructureLabels(structure: LessonStructure, lang: Language): string[] {
  const t = getTranslation(lang);

  switch (structure) {
    case 'PPP':
      return [t.structure, t.leadIn, t.presentation, t.controlled, t.free, t.preview];
    case 'TTT':
      return [t.structure, t.leadIn, t.test1, t.teach, t.test2, t.preview];
    case 'GPPC':
      return [t.structure, t.gppc.step1, t.gppc.step2, t.gppc.step3, t.gppc.step4, t.preview];
    case 'CEFR':
      return [t.structure, t.cefr.step1, t.cefr.step2, t.cefr.step3, t.cefr.step4, t.preview];
  }
}
```

---

## 4. Seven Ukrainian Sample Lessons

### Distribution

**Total**: 7 lessons
- **3 GPPC lessons** (A1-B1: grammar-focused)
- **4 CEFR lessons** (B1-C1: task-focused)

### GPPC Lessons (Grammar-Focused, A1-B1)

#### Lesson 1: Instrumental Case (Орудний відмінок)
**Level**: A2
**Structure**: GPPC
**Topic**: Noun declensions - instrumental case
**Key Grammar**: Case endings, usage with instruments/manner

#### Lesson 2: Verb Aspects (Доконаний/Недоконаний вид)
**Level**: A2-B1
**Structure**: GPPC
**Topic**: Perfective vs imperfective aspects
**Key Grammar**: Aspect pairs, when to use each

#### Lesson 3: Motion Verbs (Дієслова руху)
**Level**: B1
**Structure**: GPPC
**Topic**: Йти/ходити, їхати/їздити distinctions
**Key Grammar**: Unidirectional vs multidirectional motion

### CEFR Lessons (Task-Based, B1-C1)

#### Lesson 4: Writing a Formal Letter (Офіційний лист)
**Level**: B1-B2
**Structure**: CEFR
**Task**: Write a formal complaint or application letter
**Language Focus**: Formal register, epistolary conventions

#### Lesson 5: Participating in a Debate (Дебати)
**Level**: B2
**Structure**: CEFR
**Task**: Present and defend a position on a social issue
**Language Focus**: Argumentation, discourse markers, persuasion

#### Lesson 6: Analyzing Literature (Аналіз літературного тексту)
**Level**: B2-C1
**Structure**: CEFR
**Task**: Analyze a poem or prose excerpt
**Language Focus**: Literary terminology, critical thinking, complex syntax

#### Lesson 7: Giving a Presentation (Презентація доповіді)
**Level**: B1-B2
**Structure**: CEFR
**Task**: Prepare and deliver a 5-minute presentation
**Language Focus**: Public speaking conventions, structuring discourse

### Sample Lesson Template (GPPC)

```typescript
{
  id: 'sample-uk-instrumental-case',
  title: 'Орудний відмінок іменників',
  level: 'A2',
  targetLanguage: 'Українська мова',
  structure: 'GPPC',
  duration: 60,
  objectives: [
    'Студенти зможуть правильно вживати іменники в орудному відмінку',
    'Студенти засвоять закінчення орудного відмінка для трьох відмін',
    'Студенти застосують орудний відмінок у реальних комунікативних ситуаціях'
  ],

  // Topic Introduction (GPPC Phase 1)
  leadIn: {
    title: 'Введення теми: Як ми описуємо інструменти?',
    description: 'Активувати знання про відмінки, підготувати до нової теми',
    content: 'Показати картки з різними інструментами (ручка, олівець, ніж, вилка). Запитати: "Чим ви пишете?" "Чим ви їсте?" Записати відповіді на дошці. Пояснити, що сьогодні вивчимо, як правильно називати інструменти та засоби.',
    duration: 10,
    mediaLinks: [],
    teacherNotes: 'Використати реальні предмети або картинки. Акцент на питання "чим?"'
  },

  // Grammar Presentation (GPPC Phase 2) - BILINGUAL
  presentation: {
    title: 'Презентація граматики: Орудний відмінок',
    explanationBilingual: {
      uk: `Орудний відмінок відповідає на питання ким? чим?

Закінчення іменників в орудному відмінку:
• І відміна (жін. рід на -а, -я): -ою, -ею
  Приклад: сестра → сестрою, земля → землею
• ІІ відміна (чол. рід, сер. рід): -ом, -ем
  Приклад: стіл → столом, поле → полем
• ІІІ відміна (жін. рід на приголосний): -'ю, -ю
  Приклад: річ → річчю, мідь → міддю

Вживання орудного відмінка:
1. Знаряддя дії: Я пишу ручкою. (інструмент)
2. Спосіб дії: Ми йдемо лісом. (маршрут)
3. Після прийменників: з, над, під, перед, між, за
   Приклад: над столом, під деревом, між будинками`,

      en: `The instrumental case answers the questions "by whom?" "by what?"

Noun endings in the instrumental case:
• 1st declension (fem. ending -а, -я): -ою, -ею
  Example: sister → with-sister, earth → with-earth
• 2nd declension (masc., neut.): -ом, -ем
  Example: table → on-table, field → in-field
• 3rd declension (fem. ending consonant): -'ю, -ю
  Example: thing → with-thing, copper → with-copper

Usage of the instrumental case:
1. Instrument of action: I write with-pen. (tool)
2. Manner of action: We go by-forest. (route, means)
3. After prepositions: with, over, under, before, between, behind
   Example: over the-table, under the-tree, between the-buildings`
    },
    examples: [
      'Учень пише олівцем.',
      'Дівчинка малює фарбами.',
      'Я пишаюся батьками.',
      'Над річкою розкінувся місток.',
      'Ми їмо хліб з маслом.'
    ],
    duration: 20,
    mediaLinks: [],
    teacherNotes: 'Використати таблицю з закінченнями. Підкреслити відмінності між відмінами.'
  },

  // Controlled Practice (GPPC Phase 3)
  controlledPractice: {
    type: 'controlled',
    exercises: [
      {
        type: 'gap-fill',
        id: 'gppc-ex-1',
        instruction: 'Поставте іменники в дужках у форму орудного відмінка.',
        text: 'Діти милуються (зима) ____. Тато пишається (син) ____. Учениця пише (ручка) ____. Над (ліс) ____ пролітають птахи. Мама розповідає про (війна) ____.',
        answers: ['зимою', 'сином', 'ручкою', 'лісом', 'війною']
      },
      {
        type: 'matching',
        id: 'gppc-ex-2',
        instruction: 'Поєднайте відміни з правильними закінченнями.',
        pairs: [
          { left: 'І відміна (сестра)', right: '-ою, -ею' },
          { left: 'ІІ відміна (стіл)', right: '-ом, -ем' },
          { left: 'ІІІ відміна (річ)', right: '-ю, -\'ю' }
        ]
      }
    ]
  },

  // Communicative Practice (GPPC Phase 4)
  freePractice: {
    type: 'free',
    exercises: [
      {
        type: 'free-text',
        id: 'gppc-ex-3',
        instruction: 'Напишіть 5-6 речень про те, чим ви пишаєтеся в житті. Використовуйте орудний відмінок.',
        prompt: 'Ким або чим ви пишаєтеся? (сім\'я, друзі, досягнення, місто, країна)',
        minWords: 60
      },
      {
        type: 'role-play',
        id: 'gppc-ex-4',
        instruction: 'Розіграйте діалог у ресторані. Використовуйте орудний відмінок для опису страв.',
        scenario: 'Офіціант пропонує страви. Клієнт запитує, з чим подаються різні страви.',
        prompts: [
          'З чим подається цей суп?',
          'Що ви їсте з картоплею?',
          'Чим ви приправляєте салат?'
        ]
      }
    ]
  },

  teacherNotes: 'Звертати увагу на чергування приголосних (вухо → вухом). Нагадати про м\'який знак у ІІІ відміні. Домашнє завдання: написати текст про свій звичайний день, використовуючи орудний відмінок (чим займаюся, з ким спілкуюся).',
  createdAt: new Date().toISOString()
}
```

---

## 5. Technical Implementation Checklist

### Phase 1: Update Types (src/types.ts)

```typescript
// ADD new structure types
export type LessonStructure = 'PPP' | 'TTT' | 'GPPC' | 'CEFR';

// ADD bilingual explanation support
export interface BilingualText {
  uk: string;
  en: string;
}

// UPDATE Presentation interface
export interface Presentation {
  title: string;
  targetLanguage: string;
  examples: string[];
  explanation: string;  // Keep for backwards compatibility
  explanationBilingual?: BilingualText;  // NEW: Optional bilingual support
  duration?: number;
  mediaLinks?: string[];
  teacherNotes?: string;
  teacherNotesBilingual?: BilingualText;  // NEW: Optional
}

// UPDATE Lesson interface
export interface Lesson {
  // ... existing fields
  structure: LessonStructure;  // Now supports GPPC, CEFR
  level?: string;  // ADD: "A1", "A2", "B1", "B2", "C1"
}
```

### Phase 2: Update Translations (src/translations.ts)

```typescript
// ADD GPPC structure labels (English)
gppc: {
  title: 'GPPC (Grammar-Based)',
  description: 'Grammar foundation with communicative practice',
  step1: 'Topic Introduction',
  step2: 'Grammar Presentation',
  step3: 'Controlled Practice',
  step4: 'Communicative Practice'
},

// ADD CEFR structure labels (English)
cefr: {
  title: 'CEFR Task-Based',
  description: 'Task-focused learning for intermediate+ learners',
  step1: 'Task Introduction',
  step2: 'Preparation',
  step3: 'Task Execution',
  step4: 'Reflection & Focus'
},

// ADD level labels
levels: {
  a1: 'A1 Beginner',
  a2: 'A2 Elementary',
  b1: 'B1 Intermediate',
  b2: 'B2 Upper-Intermediate',
  c1: 'C1 Advanced'
}
```

**Ukrainian translations**: Same structure in Ukrainian

### Phase 3: Update Structure Selection (src/App.tsx)

```typescript
// UPDATE structure selection logic
{currentStep === 'structure' && (
  <div className="step-content">
    <h2>{t.chooseStructure}</h2>

    {/* Language-specific structures */}
    <div className="structure-selection">
      {language === 'en' ? (
        <>
          <StructureCard structure="PPP" translation={t.ppp} />
          <StructureCard structure="TTT" translation={t.ttt} />
        </>
      ) : (
        <>
          <StructureCard structure="GPPC" translation={t.gppc} />
          <StructureCard structure="CEFR" translation={t.cefr} />
        </>
      )}
    </div>

    {/* Add level selector */}
    <div className="form-group">
      <label>{t.selectLevel}</label>
      <select
        value={lesson.level || ''}
        onChange={(e) => updateLesson({ level: e.target.value })}
      >
        <option value="">Select CEFR level...</option>
        <option value="A1">{t.levels.a1}</option>
        <option value="A2">{t.levels.a2}</option>
        <option value="B1">{t.levels.b1}</option>
        <option value="B2">{t.levels.b2}</option>
        <option value="C1">{t.levels.c1}</option>
      </select>
    </div>

    {/* Lesson title */}
    <div className="form-group">
      <label>{t.lessonTitle}</label>
      <input
        type="text"
        value={lesson.title}
        onChange={(e) => updateLesson({ title: e.target.value })}
      />
    </div>
  </div>
)}
```

### Phase 4: Update Progress Bar (src/App.tsx)

```typescript
// ADD helper function
function getStepLabels(structure: LessonStructure, language: Language): string[] {
  const t = getTranslation(language);

  switch (structure) {
    case 'PPP':
      return [t.structure, t.leadIn, t.presentation, t.controlled, t.free, t.preview];
    case 'TTT':
      return [t.structure, t.leadIn, t.ttt.step1, t.ttt.step2, t.ttt.step3, t.preview];
    case 'GPPC':
      return [t.structure, t.gppc.step1, t.gppc.step2, t.gppc.step3, t.gppc.step4, t.preview];
    case 'CEFR':
      return [t.structure, t.cefr.step1, t.cefr.step2, t.cefr.step3, t.cefr.step4, t.preview];
  }
}

// UPDATE progress bar rendering
<div className="progress-bar">
  {getStepLabels(lesson.structure, language).map((label, index) => (
    <div key={index} className={`progress-step ${index <= currentStepIndex ? 'active' : ''}`}>
      {label}
    </div>
  ))}
</div>
```

### Phase 5: Add Bilingual Display (src/components/StudentLessonView.tsx)

```typescript
// ADD language toggle state
const [explanationLang, setExplanationLang] = useState<'uk' | 'en'>('uk');

// ADD toggle UI (only show if bilingual content exists)
{lesson.presentation.explanationBilingual && (
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

// UPDATE explanation display
{lesson.presentation.explanationBilingual ? (
  <p className="explanation">
    {lesson.presentation.explanationBilingual[explanationLang]}
  </p>
) : (
  <p className="explanation">
    {lesson.presentation.explanation}
  </p>
)}
```

### Phase 6: Create 7 Ukrainian Sample Lessons

Files to create:
- `src/data/sampleLessonsUkrainian.ts` - REPLACE with 7 new lessons
  - 3 GPPC lessons (A1-B1)
  - 4 CEFR lessons (B1-C1)

### Phase 7: Update Documentation

Files to update:
- `CHANGELOG.md` - Add v1.1.0 entry
- `CLAUDE.md` - Update with new structures
- `README.md` - Mention bilingual support

---

## 6. Testing Checklist

### Manual Testing (Before Teacher Presentation)

- [ ] **English lessons still work** (7 PPP/TTT samples load correctly)
- [ ] **Ukrainian structure selection** (GPPC and CEFR cards show, not PPP/TTT)
- [ ] **Progress bar labels** change based on structure
- [ ] **Bilingual toggle** appears in student view for Ukrainian lessons
- [ ] **Language switch** (Ukrainian ↔ English) shows correct explanations
- [ ] **Level selector** works and saves to lesson
- [ ] **All 14 sample lessons** load without errors
- [ ] **Export/Import** works with new fields
- [ ] **Print lesson** includes bilingual content correctly
- [ ] **Both languages** (UI in English/Ukrainian) work

### Build Verification

```bash
npm run build
# Should complete with 0 errors

npm run preview
# Test production build locally
```

---

## 7. Version 1.1.0 Release Plan

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/ukrainian-methodology-v1.1.0

# Implement changes (Phases 1-7 above)

# Test thoroughly

# Commit with detailed message
git add .
git commit -m "feat: Add GPPC/CEFR structures and bilingual support for Ukrainian

- Add GPPC (Grammar-Presentation-Practice-Communication) structure
- Add CEFR (Task-Based) structure for B1+ Ukrainian lessons
- Add bilingual explanation support (Ukrainian + English toggle)
- Create 7 new Ukrainian sample lessons (3 GPPC + 4 CEFR)
- Add context-aware phase labels (different labels per structure)
- Add CEFR level selector (A1-C1)
- Maintain backwards compatibility with existing lessons

Version: 1.0.0 → 1.1.0
Breaking Changes: None
New Features: Ukrainian-specific methodologies, bilingual support

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Merge to dev for testing
git checkout dev
git merge feature/ukrainian-methodology-v1.1.0

# Deploy to dev environment (Vercel)
git push origin dev

# Teachers test on dev site

# After approval, merge to main
git checkout main
git merge dev
git push origin main

# Tag release
git tag -a v1.1.0 -m "Version 1.1.0: Ukrainian Methodology Support"
git push origin v1.1.0
```

### Deployment Timeline

| Day | Activity | Deliverable |
|-----|----------|-------------|
| **Day 1** | Implementation (Phases 1-7) | Code complete |
| **Day 2 AM** | Testing + bug fixes | All tests pass |
| **Day 2 PM** | Deploy to dev branch | Dev site live |
| **Day 3** | Teacher review & feedback | Teacher approval |
| **Day 4** | Merge to main, tag v1.1.0 | Production release |

### Teacher Presentation Materials

Create for teachers:
1. **Demo video** (3-5 min)
   - Show GPPC structure selection
   - Show bilingual toggle in action
   - Walk through one sample lesson
2. **Feature overview** (1-page PDF)
   - New structures explained
   - Bilingual support benefits
   - How to create GPPC vs CEFR lessons
3. **Sample lesson showcase** (interactive)
   - Let teachers try all 7 Ukrainian lessons
   - Collect feedback via form

---

## 8. Success Criteria

### Version 1.1.0 is ready for teacher presentation when:

- ✅ All 14 sample lessons (7 English + 7 Ukrainian) load and display correctly
- ✅ Ukrainian teachers see GPPC and CEFR options (not PPP/TTT)
- ✅ English teachers still see PPP and TTT options (unchanged)
- ✅ Bilingual toggle works in student view for Ukrainian lessons
- ✅ Progress bar shows correct phase names for each structure
- ✅ Build passes with zero errors
- ✅ No breaking changes to existing English lessons
- ✅ Export/import preserves new fields
- ✅ Documentation updated

### Teacher feedback goals:

- Ukrainian teachers confirm GPPC structure matches their teaching approach
- Teachers understand when to use GPPC vs CEFR
- Bilingual support is useful (or: teachers prefer Ukrainian-only)
- Sample lessons are pedagogically sound
- No major usability issues

---

## 9. Rollback Plan

If teachers reject v1.1.0 changes:

**Option A: Quick revert**
```bash
git revert <commit-hash>
git push origin main
```

**Option B: Keep code, hide features**
```typescript
// Add feature flag
const ENABLE_UKRAINIAN_STRUCTURES = false;

// Conditionally show structures
{ENABLE_UKRAINIAN_STRUCTURES && language === 'uk' ? (
  <>{/* GPPC, CEFR */}</>
) : (
  <>{/* PPP, TTT */}</>
)}
```

**Option C: Branch for iteration**
```bash
# Keep v1.1.0 in dev branch
# Main branch stays at v1.0.0
# Iterate based on feedback
```

---

## 10. Open Questions for Implementation

1. **Bilingual field in teacher creation form**:
   - Should teachers fill in BOTH Ukrainian and English explanations?
   - Or: Teachers write Ukrainian, we add English translations later?
   - Or: English explanations are optional?

2. **Default explanation language in student view**:
   - Default to Ukrainian (students toggle to English if needed)?
   - Or: Detect browser language and default accordingly?

3. **CEFR level enforcement**:
   - Force teachers to select level (required field)?
   - Or: Optional (some lessons may not fit CEFR levels)?

4. **Backwards compatibility for existing Ukrainian samples**:
   - Replace all 7 existing Ukrainian samples with new GPPC/CEFR lessons?
   - Or: Keep old samples + add new ones (14 Ukrainian total)?

**Recommended answers**:
1. Ukrainian only (bilingual optional, add English later if teachers want)
2. Default to Ukrainian (toggle available)
3. Optional for now, can make required later
4. Replace (7 English + 7 Ukrainian = 14 total, cleaner)

---

**Next Steps**: Review this specification, confirm approach, then proceed to implementation.
