# Ukrainian Methodology Specification

**Version**: 1.1.0
**Date**: 2025-11-14
**Status**: Specification for Implementation
**Purpose**: Complete specification for Ukrainian language teaching methodologies in Vibe

---

## Overview

This document provides comprehensive specifications for implementing two Ukrainian language teaching methodologies in Vibe:

1. **GPPC** (Grammar-Presentation-Practice-Communication) - For A1-B1 learners
2. **CEFR** (Task-Based Approach) - For B1+ learners

Both methodologies support **bilingual explanations** (Ukrainian + English) to accommodate learners from different language backgrounds.

---

## Table of Contents

1. [GPPC Methodology (A1-B1)](#gppc-methodology)
2. [CEFR Methodology (B1+)](#cefr-methodology)
3. [Bilingual Support Specification](#bilingual-support)
4. [Lesson Templates](#lesson-templates)
5. [Exercise Type Recommendations](#exercise-types)
6. [Assessment Criteria](#assessment)
7. [Implementation Guidelines](#implementation)

---

## GPPC Methodology (A1-B1) {#gppc-methodology}

### Theoretical Foundation

**Full Name**: Grammar-Presentation-Practice-Communication

**Pedagogical Basis**:
- **Deductive grammar teaching** (rule → example → practice)
- **Explicit instruction** before practice
- **Accuracy-first** approach with fluency development
- **Systematic** progression through grammar system

**Best For**:
- Case system (6 cases, 7 forms)
- Verb aspects (perfective/imperfective)
- Declension patterns
- Morphological rules
- A1-B1 levels (beginners to lower-intermediate)

### Four Phases of GPPC

#### Phase 1: Введення теми (Topic Introduction)

**Duration**: 5-10 minutes
**Goal**: Activate prior knowledge and create context for new grammar

**Activities**:
- Review previously learned grammar (e.g., "What cases have you studied?")
- Present situational context (e.g., show images of tools for instrumental case)
- Pre-teach essential vocabulary
- Establish learning objectives
- Ask guiding questions to activate thinking

**Teacher Role**: Facilitator, question-asker
**Student Role**: Active participants, recall prior knowledge

**Example** (Instrumental Case):
```
Teacher: "Чим ви пишете?" (What do you write with?)
Students: "Ручкою, олівцем" (With pen, with pencil)
Teacher: "Today we'll learn the grammar rule for these endings!"
```

#### Phase 2: Презентація граматики (Grammar Presentation)

**Duration**: 15-20 minutes
**Goal**: Explicit explanation of grammar rules with paradigms

**Activities**:
- Present grammar rule explicitly
- Show declension/conjugation tables
- Explain patterns and exceptions
- Provide multiple examples
- Use visual aids (tables, diagrams)
- **Bilingual explanations** (Ukrainian + English)

**Teacher Role**: Expert, explainer
**Student Role**: Listeners, note-takers, ask clarification questions

**Content Structure**:
1. **Rule statement** (e.g., "Орудний відмінок відповідає на питання ким? чим?")
2. **Paradigm table** (endings for each declension)
3. **Usage contexts** (when to use this structure)
4. **Examples in sentences** (real usage)
5. **Common errors** (what to avoid)

**Example** (Verb Aspects):
```
UKRAINIAN EXPLANATION:
Дієслова в українській мові мають два види:
1. Недоконаний вид - дія в процесі (читати, писати)
2. Доконаний вид - завершена дія (прочитати, написати)

Таблиця видових пар:
| Недоконаний (imperfective) | Доконаний (perfective) |
|----------------------------|------------------------|
| читати (to read, ongoing)  | прочитати (to finish reading) |
| писати (to write, ongoing) | написати (to finish writing) |

ENGLISH EXPLANATION:
Ukrainian verbs have two aspects:
1. Imperfective aspect - ongoing action (reading, writing)
2. Perfective aspect - completed action (read, wrote)

Aspect pairs table:
| Imperfective | Perfective |
|--------------|------------|
| читати (to be reading) | прочитати (to have read) |
| писати (to be writing) | написати (to have written) |
```

#### Phase 3: Контрольована практика (Controlled Practice)

**Duration**: 15-20 minutes
**Goal**: Accuracy drills with immediate feedback

**Activities**:
- Gap-fill exercises (fill in correct endings)
- Multiple choice (choose correct form)
- Transformation drills (change form as instructed)
- Matching exercises (pairs, categories)
- Error correction (find and fix mistakes)
- Sentence completion

**Teacher Role**: Monitor, provide immediate feedback
**Student Role**: Practice accuracy, self-correct

**Characteristics**:
- **One correct answer** for each item
- **Immediate feedback** (teacher or answer key)
- **Focus on form**, not meaning
- **Repetitive** to build automaticity
- **Scaffolded** (start easy, increase difficulty)

**Example Exercises**:

```typescript
// Gap-fill (case endings)
{
  type: 'gap-fill',
  instruction: 'Поставте іменники в дужках у форму орудного відмінка.',
  text: 'Я пишу (ручка) ____. Він їсть хліб з (масло) ____.',
  answers: ['ручкою', 'маслом']
}

// Multiple choice (aspect selection)
{
  type: 'multiple-choice',
  question: 'Я вже ____ цю книгу. (I already ____ this book - completed)',
  options: ['читаю', 'читав', 'прочитав', 'буду читати'],
  correctAnswer: 2  // прочитав (perfective past)
}

// Matching (declension patterns)
{
  type: 'matching',
  pairs: [
    { left: 'І відміна (жін. рід)', right: '-ою, -ею' },
    { left: 'ІІ відміна (чол./сер.)', right: '-ом, -ем' },
    { left: 'ІІІ відміна (жін. рід)', right: '-ю, -\'ю' }
  ]
}
```

#### Phase 4: Комунікативна практика (Communicative Practice)

**Duration**: 15-20 minutes
**Goal**: Apply grammar in meaningful, communicative contexts

**Activities**:
- Free writing (use target structure in personal context)
- Role-plays (situational dialogues)
- Discussions (express opinions using target grammar)
- Creative tasks (stories, descriptions)
- Information gap activities (with grammar focus)
- Project work (presentations, reports)

**Teacher Role**: Facilitator, observer, note errors for later
**Student Role**: Communicators, focus on meaning

**Characteristics**:
- **Multiple correct answers** possible
- **Meaning-focused** (grammar as tool, not goal)
- **Personal relevance** (students' lives, opinions)
- **Fluency over accuracy** (errors OK if message clear)
- **Delayed correction** (don't interrupt communication)

**Example Tasks**:

```typescript
// Free writing (personal context)
{
  type: 'free-text',
  instruction: 'Напишіть 6-8 речень про те, ким ви пишаєтеся в житті.',
  prompt: 'Use instrumental case: Я пишаюся (ким/чим)...',
  minWords: 80,
  grammarFocus: 'instrumental case',
  assessmentCriteria: [
    'Uses instrumental case correctly (60%)',
    'Expresses personal meaning clearly (30%)',
    'Vocabulary range (10%)'
  ]
}

// Role-play (situational)
{
  type: 'role-play',
  instruction: 'Розіграйте діалог у ресторані.',
  scenario: 'Офіціант пропонує страви. Клієнт запитує, з чим вони подаються.',
  studentA: 'Waiter - offer dishes, explain ingredients',
  studentB: 'Customer - ask questions using instrumental case',
  duration: '5-7 minutes',
  grammarFocus: 'instrumental case (з чим? - with what?)',
  examplePrompts: [
    'З чим подається борщ?',
    'Що ви рекомендуєте з картоплею?',
    'Чим приправлений цей салат?'
  ]
}
```

### GPPC Lesson Structure Template

```typescript
{
  id: string,
  title: string,                    // e.g., "Орудний відмінок"
  level: 'A1' | 'A2' | 'B1',
  targetLanguage: 'Українська мова',
  structure: 'GPPC',
  duration: 60,                      // minutes
  objectives: string[],              // 3-5 learning objectives

  // Phase 1: Topic Introduction
  leadIn: {
    title: 'Введення теми: ...',
    description: string,
    content: string,                 // Teacher instructions
    duration: 5-10,
    mediaLinks: string[],
    teacherNotes: string
  },

  // Phase 2: Grammar Presentation
  presentation: {
    title: 'Презентація граматики: ...',
    explanationBilingual: {
      uk: string,                    // Ukrainian explanation
      en: string                     // English explanation
    },
    examples: string[],              // 5-8 example sentences
    duration: 15-20,
    mediaLinks: string[],
    teacherNotes: string
  },

  // Phase 3: Controlled Practice
  controlledPractice: {
    type: 'controlled',
    exercises: Exercise[],           // Gap-fill, multiple-choice, matching
    duration: 15-20
  },

  // Phase 4: Communicative Practice
  freePractice: {
    type: 'free',
    exercises: Exercise[],           // Free-text, role-play, discussion
    duration: 15-20
  },

  teacherNotes: string,
  createdAt: string
}
```

### When to Use GPPC

**Ideal for**:
- ✅ Case system (all 6 cases, 7 forms)
- ✅ Verb aspects (perfective/imperfective)
- ✅ Declension patterns (nouns, adjectives)
- ✅ Conjugation patterns (present, past, future)
- ✅ Number-noun agreement (cardinal, ordinal)
- ✅ Motion verbs (unidirectional/multidirectional)
- ✅ Beginner to intermediate levels (A1-B1)

**NOT ideal for**:
- ❌ Advanced discourse features (B2+)
- ❌ Purely functional language (requesting, apologizing)
- ❌ Cultural topics without grammar focus
- ❌ Conversation skills without specific structure

---

## CEFR Methodology (B1+) {#cefr-methodology}

### Theoretical Foundation

**Full Name**: CEFR Task-Based Language Teaching

**Pedagogical Basis**:
- **Task completion** as primary goal
- **Meaning-focused** instruction
- **Language emerges** from task needs
- **Holistic competence** (grammar + discourse + pragmatics)
- **Authentic communication** situations

**Best For**:
- Functional language use (writing letters, giving presentations)
- Discourse skills (argumentation, narration)
- Complex communication (debates, analyses)
- Real-world tasks
- B1-C1 levels (intermediate to advanced)

### Four Phases of CEFR

#### Phase 1: Завдання (Task Introduction)

**Duration**: 10 minutes
**Goal**: Present communicative task and establish relevance

**Activities**:
- Introduce real-world task (e.g., "Write a formal complaint letter")
- Discuss task relevance (Why do we need this skill?)
- Show authentic examples (real letters, presentations, debates)
- Establish success criteria
- Activate schema (What do you already know about this?)

**Teacher Role**: Task presenter, motivator
**Student Role**: Understand task, ask questions, connect to experience

**Example** (Formal Letter Writing):
```
Teacher: "Today you'll write a formal letter to a university about admission.
Have you ever written a formal letter? What's different from informal writing?"

Show authentic example:
"Шановний декане факультету!"
"З повагою, Іван Петренко"

Discuss: tone, structure, vocabulary, conventions
```

#### Phase 2: Підготовка (Preparation)

**Duration**: 15 minutes
**Goal**: Activate and provide language resources needed for task

**Activities**:
- Brainstorm vocabulary (semantic fields)
- Review relevant grammar structures
- Analyze model texts (what makes them effective?)
- Practice key phrases
- Plan task approach (outline, structure)

**Teacher Role**: Resource provider, facilitator
**Student Role**: Gather tools, plan approach

**Language Focus**:
- **Functional chunks** (e.g., "Звертаюсь до Вас з проханням..." - I am writing to request...)
- **Discourse markers** (по-перше, по-друге, отже - firstly, secondly, therefore)
- **Register-appropriate vocabulary** (formal vs informal)
- **Text structure** (how to organize)

**Example** (Debate Preparation):
```
Brainstorm language for:
- Expressing opinion: "На мою думку...", "Я вважаю, що..."
- Agreeing: "Погоджуюсь з...", "Маєте рацію..."
- Disagreeing: "Не можу погодитися...", "З іншого боку..."
- Giving examples: "Наприклад...", "Як показує практика..."
```

#### Phase 3: Виконання (Task Execution)

**Duration**: 20 minutes
**Goal**: Complete the communicative task

**Activities**:
- Students perform task (write, speak, present)
- Use language resources from preparation
- Focus on achieving communicative goal
- Teacher monitors, doesn't interrupt
- Peer collaboration possible (pair/group tasks)

**Teacher Role**: Observer, available for help
**Student Role**: Task performer, language user

**Characteristics**:
- **Authentic communication** purpose
- **Success = task completed** (not perfect grammar)
- **Fluency prioritized** over accuracy
- **Student autonomy** (make language choices)
- **Real-world context**

**Example Tasks**:

```typescript
// Written task (formal letter)
{
  type: 'free-text',
  instruction: 'Напишіть офіційний лист до декана факультету.',
  prompt: 'You want to request a meeting to discuss your thesis topic.',
  taskComponents: [
    'Formal greeting and self-introduction',
    'State purpose of letter clearly',
    'Provide reasons for request',
    'Suggest 2-3 possible meeting times',
    'Formal closing'
  ],
  minWords: 150,
  timeLimit: 20,
  assessmentFocus: 'Task completion + register appropriateness'
}

// Oral task (presentation)
{
  type: 'presentation',
  instruction: 'Підготуйте 5-хвилинну презентацію на тему...',
  topic: 'Вплив соціальних мереж на сучасну молодь',
  structure: [
    'Introduction (state position)',
    'Point 1 with examples',
    'Point 2 with examples',
    'Counterargument and response',
    'Conclusion'
  ],
  duration: 5,
  preparationTime: 10,
  visualAidsAllowed: true
}
```

#### Phase 4: Рефлексія та фокус на мові (Reflection & Language Focus)

**Duration**: 15 minutes
**Goal**: Analyze language use, focus on form post-task

**Activities**:
- Review task outcomes (Did you achieve the goal?)
- Analyze errors (teacher noted during execution)
- Focus on specific grammar/vocabulary issues
- Compare with model texts
- Peer feedback
- Self-assessment against criteria

**Teacher Role**: Feedback provider, language analyst
**Student Role**: Reflective learner, error identifier

**Feedback Types**:
- **Content feedback** (Was task successful? Why/why not?)
- **Language feedback** (Common errors, better alternatives)
- **Strategic feedback** (How to improve next time?)

**Example** (Post-Debate Reflection):
```
1. Content: Did you express your opinion clearly? Were your arguments convincing?

2. Language Focus:
   ✗ "Я думаю що..." (missing comma)
   ✓ "Я думаю, що..."

   ✗ "По моя думка..." (calque from Russian)
   ✓ "На мою думку..."

3. Improvements for next time:
   - Use more discourse markers (по-перше, по-друге)
   - Provide specific examples, not just opinions
   - Practice counterargument phrases
```

### CEFR Lesson Structure Template

```typescript
{
  id: string,
  title: string,                    // e.g., "Написання офіційного листа"
  level: 'B1' | 'B2' | 'C1',
  targetLanguage: 'Українська мова',
  structure: 'CEFR',
  duration: 60,
  objectives: string[],             // Task-based objectives

  // Phase 1: Task Introduction
  leadIn: {
    title: 'Завдання: ...',
    description: string,
    content: string,                // Authentic examples, schema activation
    duration: 10,
    mediaLinks: string[],
    teacherNotes: string
  },

  // Phase 2: Preparation
  presentation: {
    title: 'Підготовка: Мовні ресурси',
    explanationBilingual: {
      uk: string,                   // Language resources in Ukrainian
      en: string                    // Language resources in English
    },
    examples: string[],             // Model texts, key phrases
    duration: 15,
    mediaLinks: string[],
    teacherNotes: string
  },

  // Phase 3: Task Execution
  controlledPractice: {
    type: 'controlled',
    exercises: Exercise[],          // Usually 1 main task exercise
    duration: 20
  },

  // Phase 4: Reflection & Language Focus
  freePractice: {
    type: 'free',
    exercises: Exercise[],          // Reflection, peer feedback, error analysis
    duration: 15
  },

  taskSuccessCriteria: string[],    // How is task success measured?
  assessmentRubric: Rubric,         // Optional: detailed rubric
  teacherNotes: string,
  createdAt: string
}
```

### When to Use CEFR

**Ideal for**:
- ✅ Real-world communicative tasks
- ✅ Functional language (requesting, complaining, presenting)
- ✅ Discourse skills (argumentation, narration)
- ✅ Text production (letters, essays, reports)
- ✅ Presentation skills
- ✅ Intermediate to advanced levels (B1-C1)

**NOT ideal for**:
- ❌ Pure grammar lessons (case endings, conjugations)
- ❌ Absolute beginners (A1)
- ❌ Systematic grammar progression
- ❌ Accuracy-focused drills

---

## Bilingual Support Specification {#bilingual-support}

### Rationale

Ukrainian learners come from diverse language backgrounds:
- **English speakers** learning Ukrainian (need English explanations)
- **Slavic speakers** learning Ukrainian (Ukrainian-only OK)
- **Mixed classrooms** (bilingual support helps everyone)

**Bilingual support** allows learners to toggle between Ukrainian and English explanations while always seeing Ukrainian examples.

### What Should Be Bilingual

✅ **Grammar explanations** - Rules, patterns, usage contexts
✅ **Exercise instructions** - What to do
✅ **Learning objectives** - What you'll learn
✅ **Teacher notes** - Optional (for teachers' reference)

❌ **Ukrainian example sentences** - Always in Ukrainian only
❌ **Vocabulary items** - Target language only
❌ **Reading texts** - Ukrainian only (with translation questions possible)

### Implementation

#### Data Model

```typescript
interface BilingualText {
  uk: string;  // Ukrainian version
  en: string;  // English version
}

interface Presentation {
  // ... other fields

  // Option 1: Simple explanation (backwards compatible)
  explanation?: string;

  // Option 2: Bilingual explanation (new)
  explanationBilingual?: BilingualText;

  // Option 3: Bilingual examples with translations (advanced)
  examplesBilingual?: {
    uk: string;
    en: string;
    note?: string;
  }[];
}
```

#### Student View UI

```typescript
// Toggle component (only shows if bilingual content exists)
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

// Display explanation in selected language
{presentation.explanationBilingual ? (
  <div className="explanation">
    {presentation.explanationBilingual[explanationLang]}
  </div>
) : (
  <div className="explanation">
    {presentation.explanation}
  </div>
)}

// Examples always in Ukrainian (with optional translation notes)
<div className="examples">
  {presentation.examples.map((example, i) => (
    <div key={i} className="example-sentence">
      <span className="ukrainian">{example}</span>
      {/* Optional: English gloss for very complex structures */}
    </div>
  ))}
</div>
```

#### Teacher Creation Form

```typescript
// Grammar explanation field with bilingual option
<div className="form-group">
  <label>Grammar Explanation</label>

  <div className="bilingual-toggle">
    <input
      type="checkbox"
      checked={useBilingual}
      onChange={(e) => setUseBilingual(e.target.checked)}
    />
    <label>Add English translation for learners</label>
  </div>

  {useBilingual ? (
    <>
      <label>Ukrainian explanation</label>
      <textarea
        value={presentation.explanationBilingual?.uk || ''}
        onChange={(e) => updateExplanation('uk', e.target.value)}
        rows={8}
      />

      <label>English explanation</label>
      <textarea
        value={presentation.explanationBilingual?.en || ''}
        onChange={(e) => updateExplanation('en', e.target.value)}
        rows={8}
        placeholder="Translate the Ukrainian explanation or write English version"
      />
    </>
  ) : (
    <textarea
      value={presentation.explanation || ''}
      onChange={(e) => updateExplanation('single', e.target.value)}
      rows={8}
    />
  )}
</div>
```

### Bilingual Content Guidelines

**For Teachers Creating Lessons**:

1. **Write Ukrainian first** (your primary audience)
2. **Add English second** (optional, for English-speaking learners)
3. **English should be equivalent**, not word-for-word translation
4. **Use linguistic terminology** appropriately in both languages
5. **Maintain same structure** (if Ukrainian has 3 sections, English should too)

**Example**:

```typescript
explanationBilingual: {
  uk: `Орудний відмінок відповідає на питання ким? чим?

Закінчення:
І відміна: -ою, -ею (мамою, землею)
ІІ відміна: -ом, -ем (столом, полем)
ІІІ відміна: -'ю, -ю (річчю, міддю)

Використання:
1. Знаряддя дії: писати ручкою
2. Спосіб дії: йти лісом
3. Супровід: з друзями`,

  en: `The instrumental case answers "by/with whom?" "by/with what?"

Endings:
1st declension (fem.): -ою, -ею (with-mother, with-earth)
2nd declension (masc./neut.): -ом, -ем (with-table, in-field)
3rd declension (fem.): -'ю, -ю (with-thing, with-copper)

Usage:
1. Instrument: to write with-pen
2. Manner/route: to go by-forest (through the forest)
3. Accompaniment: with friends`
}
```

---

## Exercise Type Recommendations {#exercise-types}

### For GPPC (Grammar-Focused)

**Controlled Practice Phase**:
1. **gap-fill** ⭐⭐⭐ - Fill in case endings, verb forms
2. **matching** ⭐⭐⭐ - Match declensions, pair aspects
3. **multiple-choice** ⭐⭐ - Choose correct form
4. **sentence-scramble** ⭐⭐ - Practice word order
5. **true-false** ⭐ - Check grammar concept understanding

**Communicative Practice Phase**:
1. **free-text** ⭐⭐⭐ - Write using target grammar
2. **role-play** ⭐⭐ - Situational dialogues
3. **information-gap** ⭐ - (less common in Ukrainian)

### For CEFR (Task-Based)

**Task Execution Phase**:
1. **free-text** ⭐⭐⭐ - Letters, essays, reports
2. **presentation** ⭐⭐⭐ - Oral presentations (not in types yet - ADD)
3. **role-play** ⭐⭐ - Complex scenarios
4. **debate** ⭐⭐ - (not in types yet - ADD)

**Reflection Phase**:
1. **free-text** (reflection) - Self-assessment, error analysis
2. **peer-review** - (not in types yet - ADD)

### New Exercise Types Needed for v1.1.0

```typescript
// ADD to types.ts
export type ExerciseType =
  | 'gap-fill' | 'sorting' | 'matching' | 'free-text'
  | 'multiple-choice' | 'true-false' | 'sentence-scramble'
  | 'information-gap' | 'role-play' | 'collocation' | 'lexical-set'
  | 'presentation'    // NEW: For CEFR oral tasks
  | 'debate'          // NEW: For CEFR argumentation
  | 'peer-review';    // NEW: For CEFR reflection phase
```

---

## Assessment Criteria {#assessment}

### GPPC Assessment (Accuracy-Focused)

**Controlled Practice** (Phase 3):
- ✅ **100% correct = mastery**
- Each item scored: correct/incorrect
- Immediate feedback
- Repetition until mastery

**Communicative Practice** (Phase 4):
- **60-70%**: Grammar accuracy (target structure used correctly)
- **20-30%**: Task completion (message conveyed clearly)
- **10%**: Vocabulary range

### CEFR Assessment (Task-Focused)

**Task Execution** (Phase 3):
- **50%**: Task completion (goal achieved?)
- **30%**: Communication effectiveness (message clear?)
- **20%**: Language appropriateness (register, discourse)

**Language Focus** (Phase 4):
- Error analysis (not graded, for learning)
- Identification of improvement areas

### Sample Rubric (CEFR Formal Letter)

| Criterion | Excellent (4) | Good (3) | Adequate (2) | Needs Work (1) |
|-----------|---------------|----------|--------------|----------------|
| **Task Completion** | All required elements present, purpose crystal clear | All elements present, purpose mostly clear | Some elements missing, purpose unclear | Many elements missing |
| **Register & Tone** | Consistently formal, appropriate throughout | Mostly formal, minor lapses | Inconsistent register | Inappropriate register |
| **Organization** | Logical structure, clear paragraphing, excellent cohesion | Good structure, clear paragraphs | Some organization issues | Poorly organized |
| **Language Accuracy** | Minor errors, don't impede understanding | Some errors, message still clear | Frequent errors, some confusion | Many errors, hard to understand |
| **Vocabulary** | Rich, varied, topic-appropriate | Good range, mostly appropriate | Limited range, some inappropriate | Very limited, often inappropriate |

---

## Implementation Guidelines {#implementation}

### Phase-by-Phase Implementation

**Week 1**:
- [ ] Add `GPPC` and `CEFR` to LessonStructure type
- [ ] Add bilingual support to Presentation interface
- [ ] Update translations.ts with phase labels
- [ ] Test backwards compatibility

**Week 2**:
- [ ] Create 3 GPPC sample lessons (A1, A2, B1)
- [ ] Create 4 CEFR sample lessons (B1, B2, B2, C1)
- [ ] Add bilingual explanations to all 7 lessons
- [ ] Validate lesson quality with Ukrainian teachers

**Week 3**:
- [ ] Update structure selection UI
- [ ] Add bilingual toggle to StudentLessonView
- [ ] Add level selector (A1-C1)
- [ ] Test all flows end-to-end

### Quality Assurance

**Before Presenting to Teachers**:
1. All 14 sample lessons load correctly
2. Bilingual toggle works in student view
3. Progress bar shows correct phase labels for each structure
4. Export/import preserves bilingual content
5. Build succeeds with zero errors
6. Manual testing checklist complete

### Teacher Feedback Questions

When presenting v1.1.0 to Ukrainian teachers, ask:

1. **Methodology appropriateness**:
   - Does GPPC structure match how you teach grammar?
   - Is CEFR structure useful for advanced levels?

2. **Bilingual support**:
   - Would English explanations help your students?
   - Should English be optional or required?

3. **Sample lessons**:
   - Are the 7 topics appropriate?
   - Is difficulty progression logical?
   - Any topics missing?

4. **Usability**:
   - Is the structure selection clear?
   - Are phase labels intuitive?
   - Any confusing terminology?

---

**Last Updated**: 2025-11-14
**Version**: 1.1.0 Specification
**Next**: Create 7 sample Ukrainian lessons following these specifications
