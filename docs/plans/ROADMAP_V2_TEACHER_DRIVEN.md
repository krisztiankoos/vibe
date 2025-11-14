# Vibe Lesson Builder - Teacher-Driven Roadmap (2025)

**Last Updated:** 2025-11-14
**Status:** 🎯 Based on Direct Teacher Feedback

---

## 🎯 Core Mission

**"Create interactive lessons in minutes, not hours"**

Inspired by Wordwall's simplicity + TalkEn.Cloud's completeness, without the complexity.

---

## ❌ What Teachers Said is WRONG

1. **"Too many steps"** - Current: 6-step workflow is too linear
2. **"Too many fields to fill in"** - Overwhelming number of inputs
3. **"Can't go back and fix things"** - Navigation is confusing
4. **"Want to see how it works"** - Need test/preview mode
5. **"Need pictures everywhere"** - Text-only is boring
6. **"Takes too long"** - Creating one lesson = 30+ minutes

---

## ✅ What Teachers Want (Priority Order)

### **TOP PRIORITY: Make it work like Wordwall**
- Select template → Enter content → Done in 1 minute
- Drag-and-drop everything
- Images everywhere
- One-click switch between activity types
- Spinning wheel for random selection
- Sentence tokenizer (type sentence → auto-create gaps)

### **ESSENTIAL:**
1. Interactive Student View (test what they built)
2. Lesson Templates Library (80% time savings)
3. All 4 structures for Ukrainian (PPP, TTT, GPPC, CEFR)
4. Example lessons for ALL 4 structures

---

## 📋 Release Plan

---

## **v1.1.1 - HOTFIX** (This Week - 2-3 days)
**Fix navigation pain points IMMEDIATELY**

### Issues to Fix:
1. ✅ Add "Edit" buttons to every section in preview
2. ✅ Allow jumping to any step from anywhere
3. ✅ Add "Back" and "Skip" buttons to all steps
4. ✅ Reduce required fields (make 80% optional)
5. ✅ Auto-save progress every 30 seconds
6. ✅ Add progress indicator that's clickable (jump to any step)

### Technical Changes:
```typescript
// Allow non-linear navigation
const [currentStep, setCurrentStep] = useState('structure');
const [visitedSteps, setVisitedSteps] = useState<Set<string>>(new Set());
const [isValid, setIsValid] = useState<Record<string, boolean>>({});

// Jump to any step if it's been visited OR if previous steps are valid
function canNavigateTo(step: string): boolean {
  return visitedSteps.has(step) || allPreviousStepsValid(step);
}
```

### UI Changes:
- **Progress bar** → Clickable tabs (like browser tabs)
- **Required fields** → Only title, structure, and 1 exercise minimum
- **All forms** → Add "Save & Exit" button (resume later)
- **Preview** → Add "✏️ Edit" button next to each section

**Estimated Time:** 2-3 days
**Testing:** Teachers test before v1.2.0 starts

---

## **v1.2.0 - Wordwall-Style Builder** (Week 2-3 - 2 weeks)
**"Create exercises in 1 minute like Wordwall"**

### Core Features:

#### 1. Exercise Template Selector
**Before:** Fill out forms
**After:** Visual template gallery (like Wordwall)

```
┌─────────────────────────────────────────────┐
│  Choose Exercise Type:                      │
│                                             │
│  [📝 Gap Fill]  [🔤 Match]  [✓ Quiz]       │
│  [🎡 Spinner]   [🎲 Random] [🧩 Puzzle]     │
│  [🗣️ Role-Play] [📊 Sort]  [✍️ Free Text]  │
└─────────────────────────────────────────────┘
```

Click template → Quick content entry → Done!

#### 2. Smart Content Entry
**Gap Fill Example:**
```
Type complete sentence:
"I am going to the supermarket tomorrow"

Click "Auto-create gaps" →

Automatically becomes:
"I ___ going to the ___ tomorrow"

OR manually select words to blank out:
"I am going to the [supermarket] tomorrow"
```

#### 3. Image Upload Everywhere
- Add image to any exercise
- Drag-and-drop upload
- Image library (search free images - Unsplash API)
- Resize/crop tool

```
┌──────────────────────────┐
│  📷 Add Image            │
│  [Upload] [Search]       │
│                          │
│  Recent images: [...]    │
└──────────────────────────┘
```

#### 4. Spinning Wheel Activity
New exercise type inspired by Wordwall:

```
Spinning Wheel Settings:
- Items: [Student names / Vocabulary / Random topics]
- Use for: Random selection, turn-taking, topic selection
- Customizable colors and sounds
```

#### 5. Drag-and-Drop Exercise Builder
For matching, sorting, ordering:

```
Create Matching Exercise:
┌─────────────┬─────────────┐
│ LEFT SIDE   │ RIGHT SIDE  │
├─────────────┼─────────────┤
│ [+ Add]     │ [+ Add]     │
│ ≡ Apple     │ ≡ 🍎 [img]  │
│ ≡ Banana    │ ≡ 🍌 [img]  │
│ ≡ Orange    │ ≡ 🍊 [img]  │
└─────────────┴─────────────┘

Drag to reorder • Click to edit • X to delete
```

#### 6. One-Click Activity Conversion
**Like Wordwall's best feature:**

```
Current: Gap Fill Exercise
Convert to: [Multiple Choice ▼]
           [Matching ▼]
           [Quiz ▼]
           [Flashcards ▼]

→ Automatically adapts content to new format!
```

### Technical Implementation:

```typescript
// Exercise templates
interface ExerciseTemplate {
  id: string;
  name: string;
  icon: string;
  category: 'controlled' | 'free';
  quickSetup: boolean; // Can be created in < 1 minute
  fields: QuickField[];
}

const templates: ExerciseTemplate[] = [
  {
    id: 'gap-fill-smart',
    name: 'Gap Fill (Smart)',
    icon: '📝',
    category: 'controlled',
    quickSetup: true,
    fields: [
      { type: 'sentence-tokenizer', label: 'Enter sentence' },
      { type: 'auto-gap-selector', label: 'Select words to blank' },
      { type: 'image-upload', label: 'Add image (optional)' }
    ]
  },
  {
    id: 'spinner-wheel',
    name: 'Spinning Wheel',
    icon: '🎡',
    category: 'free',
    quickSetup: true,
    fields: [
      { type: 'list', label: 'Enter items (one per line)' },
      { type: 'color-picker', label: 'Wheel colors' }
    ]
  }
];

// Sentence tokenizer
function tokenizeSentence(sentence: string): Token[] {
  return sentence.split(' ').map((word, index) => ({
    id: index,
    text: word,
    isBlank: false,
    isClickable: true
  }));
}

// Auto-gap creator
function createGaps(tokens: Token[], difficulty: 'easy' | 'medium' | 'hard'): Token[] {
  // Easy: Blank out 20% of words (content words only)
  // Medium: 40%
  // Hard: 60%
  const contentWords = tokens.filter(t => !isCommonWord(t.text));
  const blankCount = Math.ceil(contentWords.length * (difficulty === 'easy' ? 0.2 : difficulty === 'medium' ? 0.4 : 0.6));

  // Randomly select words to blank
  const toBlank = shuffle(contentWords).slice(0, blankCount);

  return tokens.map(t => ({
    ...t,
    isBlank: toBlank.some(b => b.id === t.id)
  }));
}
```

**Estimated Time:** 2 weeks
**Deliverables:**
- 5 new Wordwall-style exercise templates
- Sentence tokenizer with click-to-blank
- Image upload + library integration
- Spinning wheel activity
- Drag-and-drop builders

---

## **v1.2.1 - Interactive Student View** (Week 4-5 - 1.5 weeks)
**"Students can DO the exercises, teachers can TEST their lessons"**

### Core Features:

#### 1. Test Mode for Teachers
**New button in lesson builder:**
```
[👁️ Preview Lesson] → [🎮 Test as Student]
```

Opens lesson in interactive mode:
- Teachers can try all exercises
- See exactly what students see
- Test before assigning to class

#### 2. Interactive Exercise Types

##### Gap Fill (Interactive):
```
Instructions: Fill in the blanks

I ___ going to the supermarket tomorrow.
  [type here]

Students type → Press Enter → Instant feedback ✓ or ✗
```

##### Multiple Choice (Interactive):
```
Question: What is the capital of France?

( ) London
( ) Berlin
(•) Paris     ← Student clicks
( ) Madrid

[Check Answer] → ✓ Correct!
```

##### Matching (Interactive - Drag & Drop):
```
Match the words:

LEFT SIDE          RIGHT SIDE
┌─────────┐       ┌─────────┐
│ Apple   │──────→│   🍎    │ ← Drag lines to match
│ Banana  │       │   🍌    │
│ Orange  │       │   🍊    │
└─────────┘       └─────────┘

[Check Answers]
```

##### Sorting (Interactive):
```
Drag items into the correct category:

FRUITS          VEGETABLES
┌─────────┐    ┌─────────┐
│         │    │         │
└─────────┘    └─────────┘

Available items: [🍎 Apple] [🥕 Carrot] [🍌 Banana] [🥦 Broccoli]
                 ↑ Drag these into categories
```

##### Sentence Scramble (Interactive):
```
Put the words in order:

[I] [going] [am] [to] [supermarket] [the]
 ↑ Drag to reorder

Your answer: [Drag words here to build sentence]

[Check Answer]
```

##### Spinning Wheel (Interactive):
```
┌────────────────┐
│   🎡 SPIN!     │  ← Click to spin
│                │
│   [Result]     │
│   appears      │
│   here         │
└────────────────┘
```

#### 3. Progress Tracking
```
Exercise 1/10: ✓ Completed (90%)
Exercise 2/10: ✓ Completed (100%)
Exercise 3/10: ⏳ In Progress
Exercise 4/10: ⬜ Not Started

Overall: 2/10 complete (20%)
```

#### 4. Auto-Grading
- **Objective exercises** (gap-fill, multiple-choice, matching): Instant auto-grading
- **Subjective exercises** (free-text, role-play): Teacher review
- **Score display**: Percentage + visual feedback

### Technical Implementation:

```typescript
// Interactive exercise component
interface InteractiveExercise {
  exercise: Exercise;
  onComplete: (score: number, answers: StudentAnswer[]) => void;
  mode: 'practice' | 'test'; // practice = unlimited tries, test = one shot
}

// Answer checking
function checkAnswer(exercise: Exercise, studentAnswer: StudentAnswer): boolean {
  switch (exercise.type) {
    case 'gap-fill':
      return checkGapFillAnswers(exercise.answers, studentAnswer.responses);
    case 'multiple-choice':
      return studentAnswer.selectedIndex === exercise.correctAnswer;
    case 'matching':
      return checkMatchingPairs(exercise.pairs, studentAnswer.matches);
    case 'true-false':
      return studentAnswer.value === exercise.correctAnswer;
    // ... etc
  }
}

// Progress state
interface StudentProgress {
  lessonId: string;
  exercisesCompleted: string[];
  scores: Record<string, number>;
  timeSpent: number;
  lastAccessed: string;
}

// Save to localStorage (for now)
function saveProgress(progress: StudentProgress) {
  localStorage.setItem(
    `student-progress-${progress.lessonId}`,
    JSON.stringify(progress)
  );
}
```

**Estimated Time:** 1.5 weeks
**Deliverables:**
- Interactive versions of all 11 exercise types
- Test mode for teachers
- Auto-grading logic
- Progress tracking (localStorage)
- Score display and feedback

---

## **v1.3.0 - Lesson Templates Library** (Week 6-7 - 2 weeks)
**"80% time savings - start from templates, not scratch"**

### Core Features:

#### 1. Template Browser
```
┌─────────────────────────────────────────────┐
│  📚 Lesson Template Library                 │
│                                             │
│  Filter by:                                 │
│  Language: [English ▼] [Ukrainian ▼]       │
│  Structure: [PPP] [TTT] [GPPC] [CEFR]      │
│  Level: [A1] [A2] [B1] [B2] [C1] [C2]      │
│  Topic: [Grammar] [Vocabulary] [Skills]    │
│                                             │
│  ┌──────────────┐ ┌──────────────┐        │
│  │ PPP: Present │ │ TTT: Phrasal │        │
│  │ Simple       │ │ Verbs        │        │
│  │ Level: A2    │ │ Level: B1    │        │
│  │ [Use This]   │ │ [Use This]   │        │
│  └──────────────┘ └──────────────┘        │
└─────────────────────────────────────────────┘
```

#### 2. Template Types

**English ESL Templates:**
- **PPP Templates** (20 lessons)
  - Present Simple - Daily Routines (A2)
  - Past Simple - Storytelling (A2)
  - Present Perfect - Experiences (B1)
  - First Conditional - Possibilities (B1)
  - Comparative/Superlative (A2)
  - Modal Verbs - Advice (B1)
  - Passive Voice (B2)
  - Reported Speech (B2)
  - Relative Clauses (B2)
  - Phrasal Verbs - Relationships (B1)
  - *...10 more*

- **TTT Templates** (10 lessons)
  - Travel Vocabulary Discovery (B1)
  - Business Email Writing (B2)
  - Debate Skills (C1)
  - Academic Writing (C1)
  - *...6 more*

**Ukrainian UFL Templates:**
- **PPP Templates** (10 lessons)
  - Відмінки іменників - Орудний (6 клас)
  - Дієслова доконаного/недоконаного виду (7 клас)
  - Прикметник - Ступені порівняння (6 клас)
  - *...7 more*

- **TTT Templates** (5 lessons)
  - Написання есе (9 клас)
  - Аналіз поезії (10 клас)
  - *...3 more*

- **GPPC Templates** (10 lessons)
  - Числівники - Узгодження (7 клас)
  - М'який знак - Правопис (5 клас)
  - Дієприкметники (9 клас)
  - *...7 more*

- **CEFR Templates** (10 lessons)
  - Комунікативна компетенція - Знайомство (A1)
  - Розповідь про себе (A2)
  - Обговорення новин (B1)
  - *...7 more*

**Total: 65 pre-built templates** (we create these together)

#### 3. One-Click Template Use
```
Template: "Present Simple - Daily Routines"

[🎯 Use This Template]
  ↓
Opens in lesson builder with:
✓ All sections pre-filled
✓ Example exercises included
✓ Instructions and teacher notes
✓ Ready to customize or use as-is!

Customization: Change topic, add/remove exercises, adjust level
Save as: New lesson or save changes to template
```

#### 4. Template Creation Tool
**Teachers can save their own lessons as templates:**
```
Create Lesson → Fill in content → [💾 Save as Template]

Template Name: _________________________
Category: [Grammar ▼]
Level: [B1 ▼]
Tags: vocabulary, food, restaurant
Visibility: [Private] [Share with school] [Public]

[Save Template]
```

### Creating the Templates

**How we'll create 65 templates:**
1. **You** provide the curriculum topics (what teachers teach)
2. **I (Claude)** generate complete lesson content
3. **You** review and approve each one
4. **We iterate** until templates are perfect
5. **I implement** them in the app

**Estimated time per template:** 15-20 minutes (with my help)
**Total creation time:** ~20 hours spread over 2 weeks

### Technical Implementation:

```typescript
interface LessonTemplate {
  id: string;
  name: string;
  description: string;
  structure: LessonStructure;
  level: string;
  cefrLevel?: CEFRLevel;
  targetLanguage: string;
  language: 'en' | 'uk';
  category: 'grammar' | 'vocabulary' | 'skills' | 'mixed';
  tags: string[];
  lesson: Lesson; // Complete pre-filled lesson
  author: 'system' | 'user';
  isPublic: boolean;
}

// Template data file
export const templateLibrary: LessonTemplate[] = [
  {
    id: 'template-ppp-present-simple-a2',
    name: 'Present Simple - Daily Routines',
    description: 'PPP lesson for A2 learners covering present simple for habits and routines',
    structure: 'PPP',
    level: 'A2 Elementary',
    cefrLevel: 'A2',
    targetLanguage: 'English',
    language: 'en',
    category: 'grammar',
    tags: ['present simple', 'daily routines', 'habits', 'grammar'],
    lesson: {
      // Complete pre-filled lesson object
      title: 'Present Simple - Daily Routines',
      structure: 'PPP',
      // ... all fields filled in
    },
    author: 'system',
    isPublic: true
  },
  // ... 64 more templates
];
```

**Estimated Time:** 2 weeks (1 week creating content with you, 1 week implementing)
**Deliverables:**
- 65 complete lesson templates (20 PPP English, 10 TTT English, 35 Ukrainian all structures)
- Template browser with search/filter
- One-click template loading
- Custom template creation tool

---

## **v1.4.0 - Ukrainian All Structures** (Week 8-9 - 1 week)
**"Full support for all 4 Ukrainian teaching methodologies"**

### What's Needed:

Currently Ukrainian only has GPPC and CEFR.
Teachers want PPP and TTT as well (all 4 options).

#### Changes Required:

1. **Structure Selection** - Show all 4 for Ukrainian:
```
Ukrainian Language:
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│    PPP     │ │    TTT     │ │   GPPC     │ │   CEFR     │
│ (Grammar)  │ │ (Discovery)│ │ (Grammar+) │ │  (Tasks)   │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```

2. **Update Types**:
```typescript
// Already done - just need to use it!
type LessonStructure = 'PPP' | 'TTT' | 'GPPC' | 'CEFR';
```

3. **Update App.tsx** - Allow all 4 structures for Ukrainian

4. **Context-aware labels** - Already implemented in v1.1.0!

5. **Sample Lessons** - Need examples for PPP and TTT in Ukrainian:
   - 5 PPP Ukrainian sample lessons
   - 5 TTT Ukrainian sample lessons
   - Already have: 7 GPPC + 7 CEFR = 14 Ukrainian samples
   - Total: 24 Ukrainian sample lessons across all 4 structures

**Estimated Time:** 1 week
**Deliverables:**
- All 4 structures available for Ukrainian
- 10 new sample lessons (5 PPP + 5 TTT Ukrainian)
- Updated structure selection UI

---

## **v1.5.0 - Images Everywhere** (Week 10-12 - 2-3 weeks)
**"Visual learning - pictures in every exercise"**

### Core Features:

#### 1. Image Upload System
```
Upload Options:
1. [📁 Upload from computer]
2. [🔍 Search free images (Unsplash)]
3. [🎨 Generate with AI] ← Future (when affordable)
4. [📚 My Image Library]
```

#### 2. Image Integration Points

**Lead-In:**
```
┌──────────────────────────┐
│  Lead-In Content         │
│  ┌────────────────────┐  │
│  │  📷 Add Image      │  │
│  │  [Upload] [Search] │  │
│  └────────────────────┘  │
│                          │
│  Description: ...        │
└──────────────────────────┘
```

**Presentation:**
```
Target Language: Present Simple

Examples:
• I work every day        [🖼️ Add image]
• She plays tennis       [🖼️ Add image]

Explanation: ...         [🖼️ Add diagram/visual]
```

**Exercises:**
- **Gap Fill**: Add context image
- **Matching**: Match words to images
- **Multiple Choice**: Image-based questions
- **Flashcards**: Front = image, Back = word/definition
- **Role-play**: Scenario images
- **Information Gap**: Different images for Student A/B

#### 3. Image Library Integration

**Unsplash API** (Free tier: 50 requests/hour):
```typescript
async function searchImages(query: string): Promise<Image[]> {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=20`,
    {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    }
  );

  const data = await response.json();

  return data.results.map(img => ({
    id: img.id,
    url: img.urls.regular,
    thumbnail: img.urls.small,
    description: img.description,
    photographer: img.user.name
  }));
}
```

#### 4. Image Storage
- **Small images** (<200KB): Base64 encode and store in lesson JSON
- **Large images** (>200KB): Upload to free CDN (Cloudinary free tier: 25GB storage, 25GB bandwidth/month)

#### 5. Image Editor (Simple)
```
┌────────────────────────┐
│   🖼️ Image Editor      │
│                        │
│  [Crop] [Resize]       │
│  [Rotate] [Brightness] │
│                        │
│  [Save] [Cancel]       │
└────────────────────────┘
```

### Technical Implementation:

```typescript
interface ExerciseWithImage extends Exercise {
  images?: {
    main?: string; // Main exercise image
    items?: Record<string, string>; // Per-item images (for matching)
  };
}

// Image upload component
function ImageUploader({ onImageSelect }: { onImageSelect: (url: string) => void }) {
  const [mode, setMode] = useState<'upload' | 'search'>('upload');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Image[]>([]);

  async function handleSearch() {
    const images = await searchImages(searchQuery);
    setSearchResults(images);
  }

  // ... upload and selection logic
}
```

**Estimated Time:** 2-3 weeks
**Deliverables:**
- Image upload to all forms
- Unsplash integration for free image search
- Image storage (Base64 for small, CDN for large)
- Simple image editor
- Image-based exercise types (flashcards, matching with images)

---

## **v2.0.0 - Polish & Professional Features** (Week 13-16 - 4 weeks)

### Final touches before launch:

1. **Improved UI/UX**
   - Animations and transitions
   - Responsive design (mobile-friendly)
   - Dark mode
   - Accessibility (keyboard navigation, screen readers)

2. **Export Improvements**
   - PDF export with images
   - Print-friendly format with pictures
   - Share via link (read-only interactive view)

3. **Teacher Dashboard**
   - All saved lessons in one place
   - Quick actions: Edit, Duplicate, Delete, Share
   - Folders/categories for organization
   - Search and filter

4. **Performance Optimizations**
   - Lazy loading
   - Code splitting
   - Image optimization
   - PWA (install as app, works offline)

5. **Help & Onboarding**
   - Quick start tutorial
   - Tooltips and help text everywhere
   - Video tutorials
   - Sample workflows

**Estimated Time:** 4 weeks
**Deliverables:** Production-ready app

---

## 📊 Timeline Summary

| Version | Focus | Duration | Total Weeks |
|---------|-------|----------|-------------|
| **v1.1.1** | Navigation fixes | 2-3 days | Week 1 |
| **v1.2.0** | Wordwall-style builder | 2 weeks | Week 2-3 |
| **v1.2.1** | Interactive student view | 1.5 weeks | Week 4-5 |
| **v1.3.0** | Lesson templates (65) | 2 weeks | Week 6-7 |
| **v1.4.0** | Ukrainian all structures | 1 week | Week 8 |
| **v1.5.0** | Images everywhere | 2-3 weeks | Week 9-12 |
| **v2.0.0** | Polish & production | 4 weeks | Week 13-16 |

**Total: ~16 weeks (4 months) to production**

---

## 🎯 Success Metrics

### Teacher Satisfaction:
- ⏱️ **Time to create lesson:** From 30+ min → 5 min (with templates)
- 📝 **Steps to create exercise:** From 10+ fields → 3 clicks
- 😊 **Ease of use rating:** Target 4.5/5 stars
- 🔄 **Template usage:** 80%+ of lessons start from templates

### Student Engagement:
- 🎮 **Interactive completion rate:** >70% students complete exercises
- 📊 **Average score:** Track performance over time
- ⏰ **Time on task:** Engaged 15-30 min per lesson

### Platform Health:
- 🐛 **Bug reports:** <5 per 100 users
- 🚀 **Load time:** <2 seconds
- 📱 **Mobile usage:** 40%+ of sessions

---

## 💰 Cost Analysis (Free/Low-Cost)

| Service | Free Tier | Our Usage | Cost |
|---------|-----------|-----------|------|
| **Unsplash API** | 50 req/hour | Image search | $0 |
| **Cloudinary** | 25GB storage, 25GB bandwidth | Image CDN | $0 |
| **GitHub Pages** | Unlimited | Hosting | $0 |
| **Firebase** | 10k users, 1GB storage | Future backend | $0 |
| **Your time** | Building with Claude | - | Priceless! |

**Total Monthly Cost: $0** 🎉

---

## 🚫 What We're NOT Doing (And Why)

1. ❌ **AI API Features** - Too expensive for teachers
2. ❌ **Video Recording** - Complex, large file sizes
3. ❌ **Live Classes** - Out of scope (use Zoom/Meet)
4. ❌ **Automated Grading for Essays** - Needs AI (expensive)
5. ❌ **Mobile Apps (Native)** - PWA is enough for now

---

## 🤝 Next Steps

### Immediate (This Week):
1. ✅ Review this roadmap together
2. ✅ Decide: Start with v1.1.1 hotfix?
3. ✅ Plan v1.2.0 Wordwall-style features
4. ✅ Create GitHub issues for v1.1.1

### This Month:
- Complete v1.1.1 + v1.2.0 + v1.2.1
- Teachers have: Better navigation, Wordwall-style builder, Interactive exercises
- Test with real teachers
- Gather feedback

### Next 2 Months:
- v1.3.0: Create 65 lesson templates together
- v1.4.0: Add PPP/TTT for Ukrainian
- v1.5.0: Images everywhere

### Month 4:
- v2.0.0: Polish and launch! 🚀

---

## ❓ Questions for You

1. **v1.1.1 Hotfix** - Should we start this today? (2-3 days work)
2. **Template Topics** - What are the most common lessons Ukrainian teachers teach? (For template library)
3. **Image Priority** - Should images come before or after templates?
4. **Testing** - Do you have teachers who can test each version?
5. **Wordwall Features** - Which specific Wordwall features are most important?
   - Spinning wheel? ✅
   - Sentence tokenizer? ✅
   - Drag-and-drop? ✅
   - One-click conversion? ✅
   - Others?

---

**Ready to start v1.1.1 hotfix?** 🚀

This will fix the navigation issues immediately and make teachers happier while we build the bigger features.
