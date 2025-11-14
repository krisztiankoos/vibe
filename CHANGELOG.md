# Changelog

All notable changes to the English Lesson Builder project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - Unreleased

### 🎯 Foundation Fixes - Ukrainian Methodology Upgrade

This release addresses a critical pedagogical issue: Ukrainian lessons were forced into ESL-specific structures (PPP/TTT), which don't match Ukrainian as Foreign Language (UFL) teaching methodology.

### ✨ New Features

#### Ukrainian-Specific Lesson Structures
- **GPPC Structure** (Grammar-Presentation-Practice-Communication) for A1-B1 grammar lessons
  - Phase 1: Введення теми (Topic Introduction)
  - Phase 2: Презентація граматики (Grammar Presentation) with explicit rules
  - Phase 3: Контрольована практика (Controlled Practice) with accuracy drills
  - Phase 4: Комунікативна практика (Communicative Practice)
  - Best for: Cases, verb aspects, declensions, morphology

- **CEFR Structure** (Task-Based Learning) for B1+ functional lessons
  - Phase 1: Завдання (Task Introduction)
  - Phase 2: Підготовка (Preparation)
  - Phase 3: Виконання (Task Execution)
  - Phase 4: Рефлексія (Reflection & Language Focus)
  - Best for: Formal letters, debates, presentations, literature analysis

#### Bilingual Explanation Support
- **Language Toggle** in student view for Ukrainian lessons
  - Toggle between Ukrainian and English grammar explanations
  - UI: 🇺🇦 Українська / 🇬🇧 English explanations
  - Ukrainian examples always stay in Ukrainian (no translation)
  - Helps non-native speakers understand complex Ukrainian grammar

#### CEFR Level Tagging
- **Level Selector** during lesson creation
  - Options: A1 (Beginner), A2 (Elementary), B1 (Intermediate), B2 (Upper-Intermediate), C1 (Advanced)
  - Displayed in student view
  - Helps learners find appropriate content

#### Context-Aware Phase Labels
- **Dynamic Progress Bar Labels** based on lesson structure
  - PPP: Lead-In → Presentation → Controlled Practice → Free Practice
  - TTT: Lead-In → Test 1 → Teach → Test 2
  - GPPC: Введення теми → Презентація граматики → Контрольована практика → Комунікативна практика
  - CEFR: Завдання → Підготовка → Виконання → Рефлексія

### 📚 New Sample Lessons

**7 Ukrainian Sample Lessons** (UFL Methodology):

**GPPC Grammar Lessons (3)**:
1. Орудний відмінок іменників (Instrumental Case) - A2
   - All 3 declensions with bilingual explanations
   - 15+ practice exercises
   - Communicative tasks (restaurant role-play, personal writing)

2. Дієслівний вид: доконаний та недоконаний (Verb Aspects) - B1
   - Perfective vs. Imperfective distinction
   - Formation patterns (prefixation, suffixation)
   - Common learner errors addressed

3. Дієслова руху: йти/ходити, їхати/їздити (Motion Verbs) - B1
   - Unidirectional vs. Multidirectional verbs
   - Time markers and usage contexts
   - Sorting and gap-fill exercises

**CEFR Task-Based Lessons (4)**:
4. Написання офіційного листа (Writing Formal Letter) - B1
   - 5-part formal letter structure
   - Formal vocabulary and phrases
   - Peer review tasks

5. Участь у дебатах (Participating in Debate) - B2
   - Argumentation and counter-argumentation
   - Debate language tools
   - Mini-debates with structured rounds

6. Аналіз літературного тексту: Тарас Шевченко (Analyzing Literature) - C1
   - 3-level analysis (content, form, style)
   - Literary terminology in Ukrainian
   - Comparative analysis and essay writing

7. Підготовка та проведення презентації (Giving Presentation) - B2
   - Complete presentation structure
   - Q&A handling techniques
   - Academic presentation practice

### 🔧 Technical Improvements

#### Type System Updates
- `LessonStructure` type: Added `'GPPC' | 'CEFR'`
- New `BilingualText` interface for dual-language content
- `Presentation.explanationBilingual?: BilingualText` (optional, backwards compatible)
- `Lesson.level?: string` (optional CEFR level: A1-C1)

#### Component Updates
- `ProgressBar`: Context-aware labels based on lesson structure
- `App`: Structure selector now shows all 4 options (PPP, TTT, GPPC, CEFR)
- `App`: CEFR level dropdown in lesson metadata
- `PresentationForm`: Bilingual explanation toggle and dual textarea
- `StudentLessonView`: Language toggle for bilingual content

#### Translation Updates
- Added 50+ new translation keys for GPPC and CEFR structures
- Phase labels for all 4 lesson structures
- CEFR level names (A1-C1) in both languages
- Bilingual toggle UI strings

### 📖 Documentation Updates

**New Specification Documents** (docs/review/):
- `FOUNDATION_FIXES.md` - Complete v1.1.0 implementation spec
- `UKRAINIAN_METHODOLOGY_SPEC.md` - Detailed GPPC + CEFR pedagogy
- `DATA_MODEL_CHANGES.md` - Technical specification for TypeScript changes
- `UKRAINIAN_SAMPLE_LESSONS.md` - Full TypeScript templates for 7 lessons
- `METHODOLOGY_REVIEW.md` - Analysis of current implementation issues

**Updated Skills** (claude_extensions/skills/):
- Ukrainian Teaching Skill: v1.0.0 → v2.0.0 (GPPC + CEFR hybrid)
- ESL Teaching Skill: v1.0.0 → v2.0.0 (Enhanced PPP + TTT descriptions)

### ✅ Backwards Compatibility

**100% Backwards Compatible**:
- All v1.0.0 lessons continue to work without modification
- New fields are optional (`level`, `explanationBilingual`)
- Existing `explanation` field still supported
- No migration required for existing lessons
- localStorage format compatible

### 🎯 Pedagogical Impact

**Problem Solved**:
Ukrainian lessons were forced into ESL communicative methodology (PPP/TTT), but Ukrainian grammar requires explicit instruction with paradigm tables (deductive approach).

**Solution**:
Added Ukrainian-specific structures (GPPC, CEFR) that match modern Ukrainian as Foreign Language teaching standards while maintaining ESL structures for English lessons.

**Target Users**:
Ukrainian teachers teaching Ukrainian to foreigners (not native speaker education)

### 🔗 Related Issues
- Resolves methodology mismatch between English (communicative) and Ukrainian (grammar-focused)
- Adds bilingual support for international learners
- Aligns with CEFR standards for both languages
- Provides 14 total sample lessons (7 EN + 7 UK)

---

## [1.0.0] - 2025-11-13

### 🎉 First Official Release

The English Lesson Builder v1.0.0 is a production-ready bilingual web application for creating, sharing, and delivering interactive language lessons.

### ✨ Major Features

#### Teacher Productivity Tools
- **Saved Lessons Library**: Browse, search, and manage all saved lessons
  - Visual card layout with lesson metadata
  - Search by title, level, or target language
  - Load, duplicate, export, and delete actions
  - Empty state messaging
  - Responsive grid design

- **Keyboard Shortcuts** (8 productivity shortcuts):
  - `Ctrl+S` (⌘+S): Save current lesson
  - `Ctrl+N` (⌘+N): Create new lesson
  - `Ctrl+L` (⌘+L): Open My Lessons library
  - `Ctrl+K` (⌘+K): Open Sample Lessons browser
  - `Ctrl+E` (⌘+E): Export lesson to JSON (in preview)
  - `Ctrl+P` (⌘+P): Print lesson (in preview)
  - `Ctrl+/` (⌘+/): Show keyboard shortcuts help
  - `Escape`: Close any modal
  - Platform detection (⌘ symbols on Mac, Ctrl on Windows/Linux)
  - Shortcuts help modal with visual reference

- **Duplicate Lesson Feature**: Create copies of existing lessons for quick modifications
  - Adds "(Copy)" or "(Копія)" suffix to title
  - Generates new unique ID and timestamp
  - Preserves all content and structure

- **Comprehensive Help System**: Context-sensitive help for all 11 exercise types
  - Detailed descriptions and best practices
  - Example content for each exercise type
  - Quick tips displayed in form sections
  - Full bilingual support
  - Help icons with tooltips

#### Sample Lessons (14 Authentic Templates)

**7 English Teaching Samples** (ESL Methodology):
1. **Present Perfect - Life Experiences** (PPP, B1 Intermediate, 60 min)
   - Grammar-focused with communicative practice
   - Gap-fill, multiple-choice, information-gap, free-text exercises

2. **Used To - Past Habits and States** (PPP, B1 Intermediate, 50 min)
   - Past vs present contrasts
   - Multiple-choice, gap-fill, sentence-scramble, free-text

3. **Phrasal Verbs - Business Communication** (TTT, B2 Upper-Intermediate, 60 min)
   - Business English lexical approach
   - Matching, gap-fill, role-play, lexical-set exercises

4. **Conditionals - Real and Hypothetical Situations** (PPP, B2 Upper-Intermediate, 60 min)
   - All conditional types with function focus
   - Gap-fill, multiple-choice, sentence-scramble, free-text

5. **Relative Clauses - Describing People and Things** (PPP, B1 Intermediate, 55 min)
   - Defining vs non-defining clauses
   - Gap-fill, sorting, sentence-scramble, free-text

6. **Passive Voice - Formal Writing** (PPP, B2 Upper-Intermediate, 60 min)
   - Academic and formal register
   - Gap-fill, true-false, sentence-scramble, free-text

7. **Reported Speech - Communication Strategies** (PPP, B2 Upper-Intermediate, 60 min)
   - Direct to indirect speech transformations
   - Gap-fill, multiple-choice, information-gap, free-text

**7 Ukrainian Teaching Samples** (Traditional Grammar-Translation):
1. **Минулий доконаний час** (Past Perfect) (ППП, Середній рівень, 60 хв)
   - Perfective/imperfective aspect focus
   - Ukrainian literary examples

2. **Наказовий спосіб** (Imperative Mood) (ППП, Початковий рівень, 45 хв)
   - Command forms and politeness
   - Morphological approach

3. **Орудний відмінок іменників** (Instrumental Case) (ППП, Середній рівень, 60 хв)
   - Case endings and usage
   - Cultural examples with national pride

4. **Числівники та вимова чисел** (Numerals) (ППП, Початковий рівень, 50 хв)
   - Number pronunciation and declension
   - References to Ukrainian history (1991 independence)

5. **Дієприкметники та дієприслівники** (Participles) (ППП, Просунутий рівень, 70 хв)
   - Active and passive participles
   - Literary references (Lesya Ukrainka's "Contra spem spero")

6. **Складнопідрядні речення з часовими сполучниками** (Complex Sentences) (ППП, Середній рівень, 60 хв)
   - Temporal conjunctions
   - Ukrainian syntax patterns

7. **Давальний відмінок іменників** (Dative Case) (ППП, Середній рівень, 55 хв)
   - Dative case usage and endings
   - Patriotic examples: "Слава Україні!", references to defenders

**Sample Lessons Features**:
- Language-appropriate methodology (ESL vs Ukrainian traditional)
- Complete with objectives, materials, teacher notes
- All 11 exercise types demonstrated across samples
- Culturally authentic content
- Ukrainian samples include subtle patriotic elements

#### Student Learning Platform
- **Interactive Student View**: Complete interface for working through lessons
  - URL-based access with query parameters (`?lesson=id&mode=student`)
  - Clean, distraction-free learning environment
  - Section navigation: Lead-In → Presentation → Practice → Production
  - Real-time progress tracking with completion percentage
  - Celebration animation (🎉) when lesson completed
  - Exit button to return to teacher mode

- **11 Interactive Exercise Types**:
  1. **Gap-Fill**: Type missing words with instant validation
  2. **Multiple Choice**: Select answers with visual feedback
  3. **True/False**: Toggle questions with answer checking
  4. **Matching**: View paired items for reference
  5. **Sorting**: Display items in correct order
  6. **Sentence Scramble**: Click words to rearrange
  7. **Free Text**: Writing with word count tracking
  8. **Information Gap**: Communicative pair work with A/B cards
  9. **Role-Play**: Scenario-based speaking activities
  10. **Collocation**: Learn word partnerships
  11. **Lexical Set**: Vocabulary chunks by topic

- **Progress Tracking**:
  - Completion status per exercise
  - Score tracking (0-100%) with 70% pass threshold
  - Attempt counting for each exercise
  - Persists to localStorage by lesson ID
  - Visual progress bar and percentage
  - Completed exercises marked with ✓ badge

#### Security Features (Zero Vulnerabilities)
- **Comprehensive Security Audit** completed and documented
- **XSS Protection**:
  - Content Security Policy (CSP) headers
  - Input sanitization for all text fields
  - No `eval()` or `new Function()` usage
  - React automatic escaping
  - Security headers: X-XSS-Protection, X-Content-Type-Options, X-Frame-Options

- **JSON Import Security**:
  - File size validation (max 5MB)
  - File type validation (.json only)
  - Timeout protection (10 seconds)
  - Structure validation
  - Prototype pollution prevention via `sanitizeJSON()`
  - Deep sanitization of all content

- **URL Validation**:
  - Only http:// and https:// protocols allowed
  - Block javascript:, data:, and script patterns
  - Maximum URL length enforcement (2048 chars)
  - Limit of 10 media links per section

- **Dependency Security**:
  - `npm audit`: Zero vulnerabilities
  - React 19.2.0 (latest stable)
  - All dependencies up-to-date

- **Documentation**:
  - `SECURITY_AUDIT.md`: Full security audit report
  - `TESTING_PLAN_V1.md`: Comprehensive manual testing plan
  - Security utilities in `src/utils/security.ts`

#### Bilingual Support (English/Ukrainian)
- **Language Selection**: Flag-based interface language choice
- **170+ Translation Keys**: Full UI translation
- **Culturally Appropriate Content**:
  - English samples: Communicative approach, fluency focus
  - Ukrainian samples: Grammar-translation, morphology focus
- **Dynamic Sample Filtering**: Shows relevant samples based on UI language
- **All Components Translated**:
  - Application interface
  - All forms and input fields
  - Exercise types and instructions
  - Lesson preview and metadata
  - Error messages and help text

#### Lesson Management
- **Export to JSON**: Save lessons as portable files with security
- **Import from JSON**: Load lessons with validation and sanitization
- **Share with Students**: Generate URL with automatic save and clipboard copy
- **Print-Friendly**: Professional printable lesson plans
- **Local Storage**: Automatic saving with progress persistence
- **New Lesson**: Start fresh with confirmation if unsaved changes

#### Lesson Building Workflow
- **Dual Methodology**: PPP (Presentation, Practice, Production) or TTT (Test, Teach, Test)
- **Step-by-Step Wizard**: Intuitive lesson creation flow with progress bar
- **Lead-In Activities**: Warm-up with media links and teacher notes
- **Presentation Section**: Target language, examples, explanations, visual aids
- **Controlled Practice**: Exercise builder with answer keys
- **Free Practice**: Production activities and communicative tasks
- **Lesson Metadata**: Title, level, duration, objectives, materials, teacher notes

### 🛠 Technical Stack
- **Frontend**: React 19.2.0 with TypeScript 5.9.3
- **Build Tool**: Vite 7.2.2
- **Styling**: CSS3 with responsive design (800+ lines of student UI CSS)
- **Storage**: Browser localStorage
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions (auto-deploy on push to main)
- **License**: MIT

### 📦 Project Structure
```
vibe/
├── src/
│   ├── components/          # React components (11 files)
│   │   ├── SavedLessons.tsx          # Lesson library with search
│   │   ├── KeyboardShortcutsHelp.tsx # Shortcuts reference modal
│   │   ├── StudentLessonView.tsx     # Student learning interface
│   │   ├── StudentExercise.tsx       # Interactive exercises
│   │   └── ...
│   ├── data/                # Sample lessons
│   │   ├── sampleLessons.ts          # 7 English samples
│   │   └── sampleLessonsUkrainian.ts # 7 Ukrainian samples
│   ├── hooks/               # Custom React hooks
│   │   └── useKeyboardShortcuts.ts   # Keyboard shortcuts system
│   ├── utils/               # Utility functions
│   │   ├── lessonUtils.ts            # Export, import, print
│   │   ├── security.ts               # Validation & sanitization
│   │   └── helpText.ts               # Exercise help content
│   ├── types.ts             # TypeScript definitions (11 exercise types)
│   ├── translations.ts      # Bilingual translations (170+ keys)
│   └── ...
├── LICENSE                  # MIT License
├── SECURITY_AUDIT.md        # Security audit report
├── TESTING_PLAN_V1.md       # Manual testing plan
├── CHANGELOG.md             # This file
└── README.md                # Documentation
```

### 📊 Statistics
- **14 Sample Lessons** (7 English + 7 Ukrainian)
- **11 Exercise Types** fully implemented
- **8 Keyboard Shortcuts** for productivity
- **170+ Translation Keys** for bilingual support
- **48 Modules** in production build
- **413.12 kB** bundle size (117.96 kB gzipped)
- **Zero** security vulnerabilities
- **Zero** build errors or warnings

### 🔧 Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for vulnerabilities
npm audit
```

### 🌐 Deployment
- **Live URL**: https://krisztiankoos.github.io/vibe/
- **Auto-deploy**: Every push to main branch via GitHub Actions
- **GitHub Pages**: Configured with Vite base path

### 📝 Documentation
- **README.md**: Comprehensive user guide
- **SECURITY_AUDIT.md**: Full security review
- **TESTING_PLAN_V1.md**: Manual testing checklist
- **CHANGELOG.md**: This file

### 🎯 v1.0.0 Goals Achieved
✅ Production-ready bilingual lesson builder
✅ 14 authentic sample lessons
✅ Saved lessons library with management
✅ Keyboard shortcuts for productivity
✅ Comprehensive help system
✅ Student interactive learning platform
✅ 11 exercise types with instant feedback
✅ Zero security vulnerabilities
✅ Full bilingual support (English/Ukrainian)
✅ Lesson sharing with progress tracking
✅ Professional documentation
✅ MIT License

### 🚀 Future Plans (v2.0+)
- Backend integration for multi-user support
- Teacher dashboards for managing students
- Student accounts and authentication
- Cloud storage for lessons
- Analytics and reporting
- Drag-and-drop exercise reordering
- Undo/redo functionality
- User onboarding tutorial
- Multi-language support expansion

---

## Version Summary

**v1.0.0** (2025-11-13)
First official release. Production-ready bilingual lesson builder with student learning platform, 14 sample lessons, productivity tools, comprehensive security, and zero vulnerabilities.

---

## Changelog Maintenance

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format and [Semantic Versioning](https://semver.org/).

**Commit Message Guidelines**:
- Use clear, descriptive commit messages
- Include detailed descriptions in commit bodies
- Reference issue numbers when applicable
- Follow conventional commit format

**To generate changelog from git**:
```bash
git log --pretty=format:"%s%n%n%b" --reverse
```

---

**Built with ❤️ for language teachers worldwide**
