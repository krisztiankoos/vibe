# Activity-Based Architecture - Complete Design Document

**Date:** 2025-11-14
**Status:** APPROVED - Ready for Implementation
**Timeline:** 2-3 weeks (replaces v1.3.0)
**Goal:** Build "building stones" for Wordwall-style lesson builder

---

## 🎯 Executive Summary

**Problem:** Current phase-based architecture (PPP/TTT/GPPC/CEFR) is:
- Too rigid (forces teachers into fixed phases)
- Fake differentiation (GPPC/CEFR are just PPP/TTT with renamed labels)
- Incompatible with Wordwall-style "quick builder" UX

**Solution:** Pivot to activity-based architecture where:
- **Activities** are the atomic building blocks
- **Lessons** are ordered collections of activities
- **Templates** provide pre-configured activity sequences
- **Methodology** is optional metadata, not enforced structure

**Impact:**
- Enables Wordwall-style UI (v1.2.0)
- Makes templates meaningful (v1.4.0)
- Gives teachers flexibility to build any lesson structure
- Future-proof for potential rebuild

---

## 📊 Architecture Comparison

### Old (Phase-Based):
```
Lesson {
  structure: 'PPP' | 'TTT' | 'GPPC' | 'CEFR'
  leadIn: { ... }           // Fixed phase 1
  presentation: { ... }      // Fixed phase 2
  controlledPractice: { ... } // Fixed phase 3
  freePractice: { ... }      // Fixed phase 4
}
```

**Problems:**
- ❌ Phases are cosmetic labels only
- ❌ Can't reorder or skip phases
- ❌ GPPC/CEFR claim to be different but aren't
- ❌ Hard to add new methodologies

### New (Activity-Based):
```
Lesson {
  title: string
  language: 'en' | 'uk'
  activities: Activity[]     // Ordered, flexible list
  methodologyTag?: 'PPP' | 'TTT' | 'GPPC' | 'CEFR' | 'custom'
}

Activity {
  type: 'warm-up' | 'presentation' | 'exercise' | 'discussion' | 'task' | 'reflection'
  content: { ... }           // Type-specific content
  duration?: number
}
```

**Benefits:**
- ✅ Activities can be reordered, duplicated, deleted
- ✅ No fake structures - just flexible activities
- ✅ Methodology is descriptive, not prescriptive
- ✅ Easy to add new activity types

---

## 🏗️ Complete Type Definitions

```typescript
// src/types.ts - ACTIVITY-BASED ARCHITECTURE

//=====================================
// CORE TYPES
//=====================================

export type Language = 'en' | 'uk';
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
export type MethodologyTag = 'PPP' | 'TTT' | 'GPPC' | 'CEFR' | 'custom';

export interface BilingualText {
  uk: string;
  en: string;
}

//=====================================
// ACTIVITY TYPES
//=====================================

export type ActivityType =
  | 'warm-up'        // Engage, activate prior knowledge
  | 'presentation'   // Teach new content (grammar, vocab, etc.)
  | 'exercise'       // Practice activity (any exercise type)
  | 'discussion'     // Communicative discussion/debate
  | 'task'           // Real-world task (TBLT approach)
  | 'reflection';    // Review, analyze, consolidate

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  duration?: number;           // Minutes
  content: ActivityContent;
  tags?: string[];             // ['grammar', 'A2', 'cases']
  teacherNotes?: string;
}

//=====================================
// ACTIVITY CONTENT (Union Type)
//=====================================

export type ActivityContent =
  | WarmUpContent
  | PresentationContent
  | ExerciseContent
  | DiscussionContent
  | TaskContent
  | ReflectionContent;

export interface WarmUpContent {
  type: 'warm-up';
  description: string;
  instructions: string;
  mediaLinks?: string[];
  vocabularyPreTeach?: string[];  // Optional pre-teaching
}

export interface PresentationContent {
  type: 'presentation';
  targetLanguage: string;                    // What you're teaching
  explanation: string | BilingualText;       // Rules, patterns, etc.
  examples: string[];
  visualAids?: string[];                     // Tables, charts, images
  mediaLinks?: string[];                     // Videos, external resources
  contrastiveAnalysis?: string;              // Compare to other structures
}

export interface ExerciseContent {
  type: 'exercise';
  exercise: Exercise;        // Reuse existing Exercise type
}

export interface DiscussionContent {
  type: 'discussion';
  topic: string;
  prompt: string;
  discussionQuestions: string[];
  minTime: number;
  groupSize?: 'pairs' | 'small-group' | 'whole-class';
}

export interface TaskContent {
  type: 'task';
  taskDescription: string;         // The real-world task
  taskGoal: string;                // What students will produce
  contextSetting: string;          // Why this task matters
  instructions: string;
  exercises: Exercise[];           // Can include multiple exercises
  peerCollaboration?: boolean;
}

export interface ReflectionContent {
  type: 'reflection';
  reflectionPrompt: string;
  languageFocus?: string;          // Optional language analysis
  improvementAreas?: string[];     // What to work on next
  selfAssessmentQuestions?: string[];
}

//=====================================
// LESSON (Activity Collection)
//=====================================

export interface Lesson {
  id: string;
  title: string;
  language: Language;

  // Metadata
  level?: string;                  // "A2 Elementary", "6th Grade", etc.
  cefrLevel?: CEFRLevel;
  duration?: number;               // Total duration (auto-calculated from activities)
  objectives?: string[];
  materials?: string[];

  // THE CORE: Ordered list of activities
  activities: Activity[];

  // Optional methodology hint (not enforced!)
  methodologyTag?: MethodologyTag;
  methodologyNotes?: string;       // Why this methodology was chosen

  // Teacher-only
  teacherNotes?: string;

  // System
  createdAt: string;
  updatedAt?: string;
}

//=====================================
// TEMPLATES (Pre-configured Lessons)
//=====================================

export interface LessonTemplate {
  id: string;
  name: string;                    // "Ukrainian Accusative Case (GPPC)"
  language: Language;
  methodology: MethodologyTag;

  // Categorization
  level: string;
  cefrLevel?: CEFRLevel;
  topic: string;                   // "Cases", "Verb Tenses", "Writing"
  category: 'grammar' | 'vocabulary' | 'skills' | 'communication' | 'mixed';

  // Preview
  description: string;
  estimatedDuration: number;
  activityCount: number;
  thumbnail?: string;

  // The template structure
  activitySequence: ActivityTemplate[];

  // Usage tracking
  usageCount?: number;
  rating?: number;
}

export interface ActivityTemplate {
  type: ActivityType;
  title: string;
  placeholder: string;             // Help text for teacher
  defaultContent?: Partial<ActivityContent>;
  optional?: boolean;              // Can be skipped
  suggestedDuration?: number;
}

//=====================================
// EXERCISE TYPES (Keep Existing)
//=====================================

export type ExerciseType =
  | 'gap-fill'
  | 'multiple-choice'
  | 'true-false'
  | 'matching'
  | 'sorting'
  | 'sentence-scramble'
  | 'free-text'
  | 'information-gap'
  | 'role-play'
  | 'collocation'
  | 'lexical-set'
  | 'ordering';

// Exercise interfaces remain the same as current implementation
// ... (keep all existing exercise type definitions)
```

---

## 🎨 Example Lessons in New Architecture

### Example 1: Ukrainian GPPC Lesson (Accusative Case)

```typescript
const ukrainianGPPCLesson: Lesson = {
  id: 'uk-gppc-accusative',
  title: 'Знахідний відмінок іменників',
  language: 'uk',
  level: 'A2',
  cefrLevel: 'A2',
  methodologyTag: 'GPPC',

  activities: [
    // Phase 1: Topic Introduction (GPPC specific)
    {
      id: '1',
      type: 'warm-up',
      title: 'Що ми вже знаємо про відмінки?',
      duration: 5,
      content: {
        type: 'warm-up',
        description: 'Activate prior knowledge about cases',
        instructions: 'Discuss: What cases have you learned? What questions do they answer?',
        vocabularyPreTeach: ['відмінок', 'питання', 'закінчення']
      }
    },

    // Phase 2: Grammar Presentation (Explicit rules - GPPC)
    {
      id: '2',
      type: 'presentation',
      title: 'Знахідний відмінок - правила',
      duration: 15,
      content: {
        type: 'presentation',
        targetLanguage: 'Accusative Case (кого? що?)',
        explanation: {
          uk: 'Знахідний відмінок відповідає на питання кого? що?\n\nЗакінчення:\nI відміна: -у, -ю (сестру, землю)\nII відміна: = Nominative (стіл, поле)\nIII відміна: = Nominative (річ)',
          en: 'Accusative case answers who? what?\n\nEndings:\nI declension: -у, -ю\nII declension: = Nominative\nIII declension: = Nominative'
        },
        examples: [
          'Я бачу (кого?) сестру',
          'Вона читає (що?) книгу',
          'Ми любимо (що?) Україну'
        ],
        visualAids: ['Accusative Case Table'],
        contrastiveAnalysis: 'Unlike Nominative, Accusative shows the OBJECT of action'
      }
    },

    // Phase 3: Controlled Drills (Accuracy focus - GPPC)
    {
      id: '3',
      type: 'exercise',
      title: 'Gap Fill: Accusative Endings',
      duration: 10,
      content: {
        type: 'exercise',
        exercise: {
          type: 'gap-fill',
          id: 'ex-1',
          instruction: 'Fill in correct accusative form',
          text: 'Я люблю (мама) ____. Ми бачимо (школа) ____.',
          answers: ['маму', 'школу']
        }
      }
    },

    {
      id: '4',
      type: 'exercise',
      title: 'Multiple Choice: Case Recognition',
      duration: 5,
      content: {
        type: 'exercise',
        exercise: {
          type: 'multiple-choice',
          id: 'ex-2',
          instruction: 'Choose correct form',
          question: 'Я бачу ____',
          options: ['сестра', 'сестри', 'сестру', 'сестрою'],
          correctAnswer: 2
        }
      }
    },

    // Phase 4: Communicative Practice (Use in context - GPPC)
    {
      id: '5',
      type: 'task',
      title: 'Role-play: At the Market',
      duration: 10,
      content: {
        type: 'task',
        taskDescription: 'Buy items at Ukrainian market',
        taskGoal: 'Practice accusative case in real context',
        contextSetting: 'You are shopping at a Ukrainian bazaar',
        instructions: 'Student A: Seller, Student B: Buyer. Use "Я хочу купити..."',
        exercises: [{
          type: 'role-play',
          id: 'ex-3',
          instruction: 'Act out shopping scenario',
          scenario: 'At the market',
          roles: ['Seller', 'Buyer'],
          minDuration: 5
        }],
        peerCollaboration: true
      }
    }
  ],

  objectives: [
    'Use accusative case correctly after verbs',
    'Recognize accusative endings',
    'Use accusative in real communication'
  ],

  createdAt: new Date().toISOString()
};
```

### Example 2: English PPP Lesson (Present Perfect)

```typescript
const englishPPPLesson: Lesson = {
  id: 'en-ppp-present-perfect',
  title: 'Present Perfect Tense',
  language: 'en',
  level: 'B1',
  cefrLevel: 'B1',
  methodologyTag: 'PPP',

  activities: [
    // Presentation
    {
      id: '1',
      type: 'presentation',
      title: 'Present Perfect: Form and Meaning',
      duration: 15,
      content: {
        type: 'presentation',
        targetLanguage: 'Present Perfect: have/has + past participle',
        explanation: 'Used for:\n1. Past actions with present relevance\n2. Experiences (ever/never)\n3. Unfinished time (this week/today)',
        examples: [
          'I have been to Paris (experience)',
          'She has finished her homework (completed action)',
          'We have lived here for 5 years (unfinished time)'
        ],
        mediaLinks: ['https://youtube.com/present-perfect-tutorial']
      }
    },

    // Controlled Practice
    {
      id: '2',
      type: 'exercise',
      title: 'Gap Fill: Present Perfect Forms',
      duration: 10,
      content: {
        type: 'exercise',
        exercise: {
          type: 'gap-fill',
          id: 'ex-1',
          instruction: 'Complete with present perfect',
          text: 'I [have visited] London. She [has never eaten] sushi.',
          answers: ['have visited', 'has never eaten']
        }
      }
    },

    // Free Production
    {
      id: '3',
      type: 'discussion',
      title: 'Talk About Experiences',
      duration: 10,
      content: {
        type: 'discussion',
        topic: 'Life Experiences',
        prompt: 'Talk about places you have been and things you have done',
        discussionQuestions: [
          'Have you ever been abroad?',
          'What's the most interesting place you have visited?',
          'What's something you have never tried but want to?'
        ],
        minTime: 10,
        groupSize: 'pairs'
      }
    }
  ],

  createdAt: new Date().toISOString()
};
```

### Example 3: CEFR Task-Based Lesson (Email Writing)

```typescript
const cefrTaskLesson: Lesson = {
  id: 'uk-cefr-email-writing',
  title: 'Написання формального листа',
  language: 'uk',
  level: 'B1',
  cefrLevel: 'B1',
  methodologyTag: 'CEFR',

  activities: [
    // Phase 1: Task Introduction
    {
      id: '1',
      type: 'task',
      title: 'Real Task: Email to University',
      duration: 5,
      content: {
        type: 'task',
        taskDescription: 'Write formal email to Ukrainian university',
        taskGoal: 'Request information about admission',
        contextSetting: 'You want to study in Ukraine and need details',
        instructions: 'You will write a formal email asking about programs',
        exercises: [],
        peerCollaboration: false
      }
    },

    // Phase 2: Preparation
    {
      id: '2',
      type: 'warm-up',
      title: 'Preparation: Formal Language',
      duration: 10,
      content: {
        type: 'warm-up',
        description: 'Brainstorm formal phrases',
        instructions: 'What phrases do we use in formal emails? Шановний/Шановна...',
        vocabularyPreTeach: [
          'Шановний пане/пані',
          'Звертаюся до Вас з проханням',
          'З повагою'
        ]
      }
    },

    // Phase 3: Task Execution
    {
      id: '3',
      type: 'exercise',
      title: 'Write the Email',
      duration: 15,
      content: {
        type: 'exercise',
        exercise: {
          type: 'free-text',
          id: 'ex-1',
          instruction: 'Write formal email (100-150 words)',
          prompt: 'Write to Kyiv National University asking about Computer Science program',
          minWords: 100
        }
      }
    },

    // Phase 4: Reflection & Language Focus
    {
      id: '4',
      type: 'reflection',
      title: 'Review and Language Analysis',
      duration: 15,
      content: {
        type: 'reflection',
        reflectionPrompt: 'What language did you use for formal requests?',
        languageFocus: 'Formal vs Informal "you" (Ви vs ти)',
        improvementAreas: [
          'Using formal greetings',
          'Polite request forms',
          'Professional closings'
        ],
        selfAssessmentQuestions: [
          'Did I use formal language throughout?',
          'Did I state my request clearly?',
          'Did I use proper email structure?'
        ]
      }
    }
  ],

  createdAt: new Date().toISOString()
};
```

---

## 📋 Template System Design

### Template Categories:

```typescript
// Template Library Structure
const templateLibrary = {
  ukrainian: {
    GPPC: [
      {
        name: 'Nominative Case',
        topic: 'Cases',
        level: 'A1',
        activityCount: 5,
        duration: 45
      },
      {
        name: 'Accusative Case',
        topic: 'Cases',
        level: 'A2',
        activityCount: 5,
        duration: 45
      },
      {
        name: 'Motion Verbs: йти/ходити',
        topic: 'Verbs',
        level: 'A2',
        activityCount: 6,
        duration: 50
      },
      {
        name: 'Perfective/Imperfective Aspects',
        topic: 'Verbs',
        level: 'B1',
        activityCount: 6,
        duration: 50
      },
      {
        name: 'Genitive Case',
        topic: 'Cases',
        level: 'A2',
        activityCount: 5,
        duration: 45
      },
      {
        name: 'Dative Case',
        topic: 'Cases',
        level: 'B1',
        activityCount: 5,
        duration: 45
      }
    ],
    CEFR: [
      {
        name: 'Email to Ukrainian Friend',
        topic: 'Writing',
        level: 'A2',
        activityCount: 4,
        duration: 40
      },
      {
        name: 'Debate: Language Policy',
        topic: 'Speaking',
        level: 'B2',
        activityCount: 5,
        duration: 60
      },
      {
        name: 'Formal Letter to University',
        topic: 'Writing',
        level: 'B1',
        activityCount: 4,
        duration: 45
      },
      {
        name: 'Presentation: Ukrainian History',
        topic: 'Speaking',
        level: 'B2',
        activityCount: 5,
        duration: 60
      },
      {
        name: 'Literature: Taras Shevchenko',
        topic: 'Reading',
        level: 'C1',
        activityCount: 6,
        duration: 90
      },
      {
        name: 'Job Interview Role-play',
        topic: 'Speaking',
        level: 'B2',
        activityCount: 5,
        duration: 50
      }
    ]
  },

  english: {
    PPP: [
      {
        name: 'Present Simple Tense',
        topic: 'Grammar',
        level: 'A1',
        activityCount: 4,
        duration: 40
      },
      {
        name: 'Present Perfect',
        topic: 'Grammar',
        level: 'B1',
        activityCount: 4,
        duration: 45
      },
      {
        name: 'Past Continuous',
        topic: 'Grammar',
        level: 'A2',
        activityCount: 4,
        duration: 45
      },
      {
        name: 'Modal Verbs: can/could/be able to',
        topic: 'Grammar',
        level: 'A2',
        activityCount: 5,
        duration: 45
      },
      {
        name: 'Conditionals Type 1',
        topic: 'Grammar',
        level: 'B1',
        activityCount: 5,
        duration: 50
      },
      {
        name: 'Passive Voice',
        topic: 'Grammar',
        level: 'B2',
        activityCount: 5,
        duration: 50
      }
    ],
    TTT: [
      {
        name: 'Authentic News Article',
        topic: 'Reading',
        level: 'B1',
        activityCount: 3,
        duration: 45
      },
      {
        name: 'Phrasal Verbs Discovery',
        topic: 'Vocabulary',
        level: 'B2',
        activityCount: 3,
        duration: 40
      },
      {
        name: 'Colloquial Expressions',
        topic: 'Vocabulary',
        level: 'B1',
        activityCount: 3,
        duration: 45
      },
      {
        name: 'Song Analysis: Idioms',
        topic: 'Listening',
        level: 'B2',
        activityCount: 4,
        duration: 50
      },
      {
        name: 'Word Formation Patterns',
        topic: 'Vocabulary',
        level: 'B2',
        activityCount: 3,
        duration: 45
      },
      {
        name: 'Authentic Podcast',
        topic: 'Listening',
        level: 'B1',
        activityCount: 3,
        duration: 40
      }
    ]
  }
};
```

**Total Templates:** 24 (6 GPPC + 6 CEFR + 6 PPP + 6 TTT)

---

## 🔄 Migration Strategy

### Step 1: No Migration of Samples
**Decision:** DELETE all existing samples, rebuild from scratch

```bash
# Delete English samples
> rm src/data/sampleLessons.ts

# Delete Ukrainian samples (already done)
> rm src/data/sampleLessonsUkrainian.ts
```

**Rationale:**
- Samples are just examples (not user data)
- Easier to rebuild than convert
- Ensures quality from start

### Step 2: Migration for User Lessons (localStorage)

```typescript
// src/utils/migrateLessons.ts

interface OldLesson {
  structure: 'PPP' | 'TTT' | 'GPPC' | 'CEFR';
  leadIn: { ... };
  presentation: { ... };
  controlledPractice: { exercises: Exercise[] };
  freePractice: { exercises: Exercise[] };
}

function migrateOldLesson(old: OldLesson): Lesson {
  const activities: Activity[] = [];

  // Convert Lead-In to Warm-Up
  if (old.leadIn) {
    activities.push({
      id: crypto.randomUUID(),
      type: 'warm-up',
      title: old.leadIn.title || 'Warm-Up',
      duration: old.leadIn.duration,
      content: {
        type: 'warm-up',
        description: old.leadIn.description || '',
        instructions: old.leadIn.content || '',
        mediaLinks: old.leadIn.mediaLinks
      },
      teacherNotes: old.leadIn.teacherNotes
    });
  }

  // Convert Presentation
  if (old.presentation) {
    activities.push({
      id: crypto.randomUUID(),
      type: 'presentation',
      title: old.presentation.title || 'Presentation',
      duration: old.presentation.duration,
      content: {
        type: 'presentation',
        targetLanguage: old.presentation.targetLanguage || '',
        explanation: old.presentation.explanation || '',
        examples: old.presentation.examples || [],
        mediaLinks: old.presentation.mediaLinks
      },
      teacherNotes: old.presentation.teacherNotes
    });
  }

  // Convert Controlled Practice exercises
  old.controlledPractice.exercises.forEach((exercise, idx) => {
    activities.push({
      id: crypto.randomUUID(),
      type: 'exercise',
      title: `Exercise ${idx + 1}: ${exercise.type}`,
      content: {
        type: 'exercise',
        exercise
      }
    });
  });

  // Convert Free Practice exercises
  old.freePractice.exercises.forEach((exercise, idx) => {
    activities.push({
      id: crypto.randomUUID(),
      type: exercise.type === 'role-play' || exercise.type === 'information-gap'
        ? 'discussion'
        : 'exercise',
      title: `Activity ${idx + 1}: ${exercise.type}`,
      content: {
        type: 'exercise',
        exercise
      }
    });
  });

  return {
    ...old,
    activities,
    language: old.targetLanguage?.includes('Ukrainian') ? 'uk' : 'en',
    methodologyTag: old.structure,
    updatedAt: new Date().toISOString()
  };
}

// Auto-run on app load
export function migrateAllLessons() {
  const lessons = JSON.parse(localStorage.getItem('lessons') || '[]');
  const migrated = lessons.map(migrateOldLesson);
  localStorage.setItem('lessons', JSON.stringify(migrated));
  localStorage.setItem('migration_v2_complete', 'true');
}
```

### Step 3: Backward Compatibility Flag

```typescript
// Check if migration needed
useEffect(() => {
  const migrationComplete = localStorage.getItem('migration_v2_complete');
  if (!migrationComplete) {
    migrateAllLessons();
  }
}, []);
```

---

## 🎨 UI/UX Changes

### 1. Template Gallery (New Entry Point)

```tsx
// New: Template-first approach
<TemplateGallery>
  <Header>
    <h1>Start Your Lesson</h1>
    <p>Choose a template or start from scratch</p>
  </Header>

  <FilterBar>
    <Select label="Language" options={['English', 'Ukrainian']} />
    <Select label="Methodology" options={['PPP', 'TTT', 'GPPC', 'CEFR', 'All']} />
    <Select label="Level" options={['A1', 'A2', 'B1', 'B2', 'C1']} />
    <Select label="Topic" options={['Grammar', 'Vocabulary', 'Skills']} />
  </FilterBar>

  <TemplateGrid>
    {templates.map(t => (
      <TemplateCard
        name={t.name}
        methodology={t.methodology}
        duration={t.estimatedDuration}
        activityCount={t.activityCount}
        description={t.description}
        onClick={() => createFromTemplate(t)}
      />
    ))}

    <BlankLessonCard onClick={createBlankLesson} />
  </TemplateGrid>
</TemplateGallery>
```

### 2. Activity Timeline (Replaces Phase Forms)

```tsx
// New: Activity-based builder
<LessonBuilder lesson={lesson}>
  <LessonHeader>
    <input value={lesson.title} onChange={updateTitle} />
    <MetadataBar>
      <LevelSelect />
      <DurationDisplay total={calculateTotalDuration()} />
      <MethodologyTag value={lesson.methodologyTag} />
    </MetadataBar>
  </LessonHeader>

  <ActivityTimeline>
    <DragDropContext onDragEnd={handleReorder}>
      <Droppable droppableId="activities">
        {lesson.activities.map((activity, index) => (
          <Draggable key={activity.id} draggableId={activity.id} index={index}>
            <ActivityCard
              activity={activity}
              index={index}
              onEdit={() => editActivity(index)}
              onDuplicate={() => duplicateActivity(index)}
              onDelete={() => deleteActivity(index)}
            />
          </Draggable>
        ))}
      </Droppable>
    </DragDropContext>

    <AddActivityButton onClick={showActivityPicker}>
      + Add Activity
    </AddActivityButton>
  </ActivityTimeline>

  <Footer>
    <button onClick={saveLesson}>Save Lesson</button>
    <button onClick={previewLesson}>Preview</button>
  </Footer>
</LessonBuilder>
```

### 3. Activity Editor (Modal)

```tsx
<ActivityEditorModal activity={currentActivity}>
  <ActivityTypeSelector
    value={activity.type}
    onChange={changeActivityType}
    options={[
      { value: 'warm-up', icon: '🔥', label: 'Warm-Up' },
      { value: 'presentation', icon: '📚', label: 'Presentation' },
      { value: 'exercise', icon: '✏️', label: 'Exercise' },
      { value: 'discussion', icon: '💬', label: 'Discussion' },
      { value: 'task', icon: '🎯', label: 'Task' },
      { value: 'reflection', icon: '🤔', label: 'Reflection' }
    ]}
  />

  <ActivityForm type={activity.type}>
    {/* Dynamic form based on activity type */}
    {activity.type === 'presentation' && <PresentationForm />}
    {activity.type === 'exercise' && <ExerciseForm />}
    {activity.type === 'discussion' && <DiscussionForm />}
    {/* etc */}
  </ActivityForm>

  <Footer>
    <button onClick={saveActivity}>Save Activity</button>
    <button onClick={cancel}>Cancel</button>
  </Footer>
</ActivityEditorModal>
```

### 4. Activity Picker (Quick Add)

```tsx
<ActivityPickerMenu>
  <QuickAddGrid>
    <ActivityButton
      type="warm-up"
      onClick={() => addActivity('warm-up')}
    >
      🔥 Warm-Up
    </ActivityButton>

    <ActivityButton
      type="presentation"
      onClick={() => addActivity('presentation')}
    >
      📚 Presentation
    </ActivityButton>

    <ActivityButton
      type="exercise"
      onClick={() => showExercisePicker()}
    >
      ✏️ Exercise
      <ExerciseTypeMenu>
        <item>Gap Fill</item>
        <item>Multiple Choice</item>
        <item>Matching</item>
        {/* ... */}
      </ExerciseTypeMenu>
    </ActivityButton>

    <ActivityButton
      type="discussion"
      onClick={() => addActivity('discussion')}
    >
      💬 Discussion
    </ActivityButton>

    <ActivityButton
      type="task"
      onClick={() => addActivity('task')}
    >
      🎯 Task
    </ActivityButton>

    <ActivityButton
      type="reflection"
      onClick={() => addActivity('reflection')}
    >
      🤔 Reflection
    </ActivityButton>
  </QuickAddGrid>

  <TemplateSection>
    <h3>Or use activity template:</h3>
    <ActivityTemplateList>
      {savedActivityTemplates.map(t => (
        <TemplateItem onClick={() => addFromTemplate(t)}>
          {t.name}
        </TemplateItem>
      ))}
    </ActivityTemplateList>
  </TemplateSection>
</ActivityPickerMenu>
```

---

## 📅 Implementation Timeline

### Week 1: Core Architecture (5 days)
**Goal:** New type system and data migration

- ✅ Day 1: Delete all samples, create architecture doc (DONE)
- 📝 Day 2: Implement Activity-based types in types.ts
- 📝 Day 3: Create migration utility for localStorage lessons
- 📝 Day 4: Update App.tsx to handle activity-based lessons
- 📝 Day 5: Test migration with existing saved lessons

### Week 2: UI Components (5 days)
**Goal:** Activity-based builder UI

- 📝 Day 1: Template Gallery component
- 📝 Day 2: Activity Timeline with drag-drop
- 📝 Day 3: Activity Editor modal (all 6 types)
- 📝 Day 4: Activity Picker menu
- 📝 Day 5: Update Student View for activities

### Week 3: Templates & Polish (5 days)
**Goal:** 24 sample templates and testing

- 📝 Day 1-2: Create 12 Ukrainian templates (6 GPPC + 6 CEFR)
- 📝 Day 3-4: Create 12 English templates (6 PPP + 6 TTT)
- 📝 Day 5: Full testing, bug fixes, documentation

**Total: 15 days (3 weeks)**

---

## ✅ Success Criteria

### Technical:
- [ ] All 6 activity types implemented
- [ ] Drag-drop reordering works
- [ ] Migration utility handles old lessons
- [ ] Build passes with 0 TypeScript errors
- [ ] Bundle size <500KB
- [ ] All translations (en/uk) complete

### UX:
- [ ] Can create lesson from template in <2 min
- [ ] Can create blank lesson in <5 min
- [ ] Activities can be reordered, duplicated, deleted
- [ ] Student view works with activity-based lessons
- [ ] Both languages fully supported

### Content:
- [ ] 24 high-quality templates created
- [ ] 6 GPPC templates (Ukrainian cases, verbs)
- [ ] 6 CEFR templates (Ukrainian tasks)
- [ ] 6 PPP templates (English grammar)
- [ ] 6 TTT templates (English authentic texts)
- [ ] All reviewed by language teaching skills

---

## 🔮 Future Enhancements (Post-v1.3.0)

### v1.4.0: Advanced Templates
- Template marketplace
- User-created templates
- Template sharing/export
- Template ratings

### v1.5.0: Activity Library
- Save activities as reusable templates
- Personal activity library
- Activity search and filtering
- Activity import/export

### v2.0.0: Backend Integration
- Cloud-saved lessons
- Collaborative editing
- Template sharing across users
- Analytics on template usage

---

## 📊 Comparison: Old vs New

| Feature | Phase-Based (Old) | Activity-Based (New) |
|---------|-------------------|----------------------|
| **Flexibility** | ❌ Fixed 4 phases | ✅ Unlimited activities |
| **Reordering** | ❌ Can't reorder phases | ✅ Drag-drop anywhere |
| **Methodology** | ❌ Fake (cosmetic labels) | ✅ Real (different activity sequences) |
| **Templates** | ❌ N/A | ✅ 24 pre-built templates |
| **Wordwall-style** | ❌ Incompatible | ✅ Perfect fit |
| **Learning Curve** | ⚠️ Must understand phases | ✅ Intuitive activity list |
| **Future-proof** | ❌ Hard to extend | ✅ Easy to add activity types |

---

## 🎓 Pedagogical Validity

### GPPC (Ukrainian Grammar Foundation)
**Activity Sequence:**
1. Warm-Up (Topic Introduction) - Activate prior knowledge
2. Presentation (Grammar Rules) - Explicit tables, paradigms
3. Exercise × 2-3 (Controlled Drills) - Pattern practice
4. Task (Communicative Practice) - Real usage

**Why it works:** Matches Ukrainian grammar teaching tradition (explicit → practice → communicate)

### CEFR (Task-Based Learning)
**Activity Sequence:**
1. Task (Introduction) - Present real-world task
2. Warm-Up (Preparation) - Brainstorm, plan
3. Exercise (Task Execution) - DO the task
4. Reflection (Language Focus) - Analyze language AFTER

**Why it works:** Task-first approach aligns with CEFR principles

### PPP (Grammar Teaching)
**Activity Sequence:**
1. Presentation - Teach the structure
2. Exercise × 2-3 (Controlled Practice) - Accuracy
3. Discussion/Task (Free Production) - Fluency

**Why it works:** Classic grammar teaching methodology

### TTT (Discovery Learning)
**Activity Sequence:**
1. Exercise (Diagnostic Test) - Try authentic text
2. Presentation (Teaching) - Fill gaps found
3. Exercise (Assessment) - Try again, measure progress

**Why it works:** Students discover needs before teaching

---

## 🔑 Key Decisions Summary

1. ✅ **Activity-based architecture** (not phase-based)
2. ✅ **Delete all samples** (rebuild, don't migrate)
3. ✅ **6 activity types** (warm-up, presentation, exercise, discussion, task, reflection)
4. ✅ **24 templates** (6 per methodology)
5. ✅ **Migration utility** for user lessons in localStorage
6. ✅ **Methodology as metadata** (not enforced structure)
7. ✅ **Template-first UX** (Wordwall style)
8. ✅ **Drag-drop timeline** (reorderable activities)
9. ✅ **3-week implementation** (replaces v1.3.0)
10. ✅ **Future-proof for rebuild** (clean architecture)

---

## 📝 Next Steps

1. **Review this document** with user (get final approval)
2. **Delete English samples** (Ukrainian already done)
3. **Implement types.ts** (Activity-based architecture)
4. **Build migration utility** (handle old lessons)
5. **Create UI components** (timeline, editor, picker)
6. **Build 24 templates** (6 × 4 methodologies)
7. **Test thoroughly** (both languages, all activity types)
8. **Deploy v1.3.0** (activity-based system live!)

---

**Document Version:** 1.0
**Last Updated:** 2025-11-14
**Status:** Ready for Implementation
**Estimated Completion:** 3 weeks from approval
