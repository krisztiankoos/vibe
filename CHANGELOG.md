# Changelog

All notable changes to the English Lesson Builder project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2025-11-13

### Added - Student Experience & Ukrainian Samples

#### Student Learning Platform
- **Interactive Student View**: Complete student interface for working through lessons
  - URL-based lesson sharing with query parameters (`?lesson=id&mode=student`)
  - Clean, distraction-free interface optimized for learning
  - Section navigation: Lead-In, Presentation, Practice, Production
  - Real-time progress tracking with completion percentage
  - Exercise progress saved to localStorage (survives page refresh)
  - Celebration animation (🎉) when lesson is completed
  - Exit button to return to teacher mode
  - 800+ lines of responsive CSS for student UI

#### Interactive Exercises (11 Types)
- **Gap-Fill**: Type missing words with instant correct/incorrect validation
- **Multiple Choice**: Click to select with visual feedback
- **True/False**: Toggle buttons with answer checking
- **Matching**: Display paired items for reference
- **Sorting**: Display items in order
- **Sentence Scramble**: Click words to rearrange into correct order
- **Free Text**: Text area with word count for writing exercises
- **Information Gap**: Display Student A/B info cards with useful prompts
- **Role-Play**: Show scenario and role descriptions with duration
- **Collocation**: Display word partnerships and combinations
- **Lexical Set**: Display vocabulary chunks organized by topic

#### Progress Tracking
- Tracks completion status per exercise
- Stores scores (0-100%) with 70% pass threshold
- Counts attempts for each exercise
- Persists to localStorage by lesson ID
- Visual progress bar and percentage display
- Completed exercises marked with ✓ badge

#### Teacher Sharing Features
- "Share with Students" button in preview mode
- Generates shareable URL with lesson ID
- Auto-saves lesson before sharing
- Copies URL to clipboard with fallback prompt
- Bilingual support for all sharing UI

#### Ukrainian Language Teaching Samples
- **4 Authentic Ukrainian Lessons** reflecting Ukrainian educational methodology:
  1. **Відмінки іменників - Орудний відмінок** (Noun Cases - Instrumental)
     - Traditional Ukrainian grammar approach
     - Focus on case endings and morphology (-ою, -ем, -ю)
     - Examples from Ukrainian culture and literature
     - Practice with відміни (declensions)

  2. **Дієслова доконаного та недоконаного виду** (Verbal Aspect)
     - Uniquely Slavic grammar concept
     - Perfective vs. Imperfective distinction
     - Видові пари: писати/написати, читати/прочитати
     - Examples from Taras Shevchenko and Lesya Ukrainka

  3. **Прикметник - Ступені порівняння** (Adjective Comparison)
     - Morphological transformations
     - Ступені: гарний → гарніший → найгарніший
     - Patriotic content about Ukraine (Карпати, Дніпро, Говерла)
     - National pride integrated into examples

  4. **Правопис слів іншомовного походження** (Foreign Words & Surzhyk)
     - Fight against суржик (Ukrainian-Russian mix)
     - Language purification movement
     - Ukrainian vs. Russian vocabulary (розповідати vs рассказувати)
     - National identity through language

- **Language-Appropriate Sample Display**:
  - English UI → Shows English teaching samples (ESL methodology)
  - Ukrainian UI → Shows Ukrainian teaching samples (grammar-translation)
  - Helper function `getSamplesByLanguage()` for filtering

### Added - Sample Lessons Feature

#### Pre-built Lesson Templates
- **4 English Teaching Sample Lessons**:
  1. **Present Simple Tense - Daily Routines** (PPP, A2 Elementary)
     - Gap-fill and multiple-choice exercises
     - Information gap and free-text practice
     - Complete with objectives, materials, teacher notes

  2. **Phrasal Verbs - Relationships** (TTT, B1 Intermediate)
     - Matching and gap-fill exercises
     - Role-play and creative writing activities
     - Demonstrates Test-Teach-Test methodology

  3. **Travel Plans and Experiences** (PPP, B1 Intermediate)
     - Sentence scramble and information gap exercises
     - Communicative approach with role-plays
     - Present perfect vs past simple practice

  4. **Weather Vocabulary - Lexical Sets** (PPP, A2 Elementary)
     - Lexical set grouping and collocation exercises
     - Demonstrates lexical approach to teaching
     - Weather-themed communicative activities

#### Sample Lessons UI
- **Sample Lessons Modal** with professional design:
  - Grid view of all available sample lessons
  - Preview functionality for detailed lesson inspection
  - "Load Sample" button to import into editor
  - Level, duration, and objectives preview
  - Responsive design with hover effects
  - Full bilingual support (English/Ukrainian)

#### Enhanced Lesson Type
- Extended `Lesson` interface with optional fields:
  - `level` (e.g., "A2 Elementary", "Середній рівень")
  - `targetLanguage` (e.g., "English", "Українська мова")
  - `duration` (total lesson time in minutes)
  - `objectives` (array of learning goals)
  - `materials` (required resources for lesson)
  - `teacherNotes` (overall lesson notes for instructor)

#### Enhanced Exercise Types
- Added `minWords` field to `FreeTextExercise` for word count requirements
- Added `prompts` field to `InformationGapExercise` for suggested questions

### Added - Security Enhancements

#### XSS Protection
- Content Security Policy (CSP) headers in index.html
- Input sanitization for all text fields
- Removal of dangerous characters (`<`, `>`, `<script>`)
- Security headers: X-XSS-Protection, X-Content-Type-Options, X-Frame-Options
- Frame-ancestors 'none' to prevent clickjacking

#### JSON Import Security
- File size validation (max 5MB) to prevent DoS attacks
- File type validation (only .json files accepted)
- Timeout protection (10 second limit) to prevent hanging
- Structure validation to ensure valid lesson format
- Prototype pollution prevention via `sanitizeJSON()`
- Deep sanitization of all imported content

#### URL Validation
- Validate all user-provided URLs (media links)
- Only allow `http://` and `https://` protocols
- Block `javascript:`, `data:`, and `<script>` patterns
- Maximum URL length enforcement (2048 characters)
- Real-time validation with user-friendly error messages
- Limit of 10 media links per section

#### Input Validation
- Maximum length limits on all text inputs (10k chars default)
- Array length limits (max 100 items) to prevent DoS
- Sanitize filenames to prevent path traversal attacks
- Validate exercise data structures
- Proper URL revocation after blob creation

#### New Security Module
- Created `src/utils/security.ts` with comprehensive utility functions:
  - `validateURL()`: URL validation and sanitization
  - `sanitizeText()`: Remove dangerous characters
  - `validateFileSize()`: File size checking
  - `validateLessonStructure()`: Deep lesson validation
  - `sanitizeJSON()`: Prevent prototype pollution
  - `sanitizeLesson()`: Comprehensive content sanitization

### Added - Core Features

#### Communicative & Lexical Approach Exercises
- **Information Gap** activities with Student A/B information cards
- **Role Play** scenarios with multiple role descriptions and suggested duration
- **Collocation Practice** with base words and word partners
- **Lexical Set/Chunks** exercises with topic-based vocabulary grouping
- 40+ translation keys for both English and Ukrainian
- Color-coded information displays in preview
- Support for optional fields: target language, context, exercise format

#### Bilingual Support (English/Ukrainian)
- Language selection home page with flag-based selection
- Comprehensive translation system with 170+ translation keys
- `LanguageSelector` component for initial language choice
- Language switcher button to change language anytime
- All components fully translated:
  - App interface (header, progress bar, structure page, footer)
  - All forms (LeadIn, Presentation, Exercise Builder)
  - All exercise types and form elements
  - Lesson preview and section headings
- Maintains full functionality in both languages

#### Enhanced Exercise Types
- **Multiple Choice**: Questions with options and optional answer key
- **True/False**: Statement-based questions with T/F answer
- **Sentence Scramble**: Words to arrange in correct order
- All exercise types support optional answer keys for teacher reference
- Correct answer highlighting in preview (green background)

#### Enhanced Lesson Sections
- **Duration field**: Estimated time for Lead-In and Presentation (in minutes)
- **Media Links**: Embed YouTube videos and external resources (up to 10 per section)
- **Teacher Notes**: Private notes for instructors (not shown to students)
- Teacher notes displayed with distinctive orange highlight
- Media links shown as clickable URLs in preview

#### Lesson Management
- **Export to JSON**: Save lessons as JSON files for sharing and backup
- **Import from JSON**: Load lessons from JSON files
- **Print-friendly view**: Clean layout optimized for classroom printing
- **New Lesson button**: Start fresh with clean slate
- Export and Print buttons in lesson preview
- Responsive design for mobile devices
- Clean print stylesheet that hides UI elements

#### Initial Features (v1.0.0)
- PPP (Presentation, Practice, Production) lesson structure
- TTT (Test, Teach, Test) lesson structure
- Lead-in activity creation with title, description, and content
- Presentation section with target language, examples, and explanations
- Exercise builder supporting 4 initial exercise types:
  - Gap fill exercises with bracket notation
  - Sorting activities
  - Matching exercises
  - Free text/production prompts
- Controlled practice and free practice sections
- Lesson preview with full lesson display
- Local storage for lesson persistence
- Step-by-step wizard interface with progress bar
- Comprehensive modern styling
- README with usage instructions

### Changed

#### Sample Lessons Organization
- Reorganized sample lessons into separate files by language
- Created `sampleLessonsEnglish` export for English samples
- Created `sampleLessonsUkrainian` export for Ukrainian samples
- Combined export `sampleLessons` includes all samples
- Dynamic sample filtering based on UI language selection

#### Component Updates
- Updated `App.tsx` with student mode routing and URL parameter handling
- Enhanced `LessonPreview` to accept export/print props
- Refactored `ExerciseBuilder` with helper functions and state management
- Added `renderExercise` helper function in `LessonPreview`
- Updated all forms with new field support

### Fixed

- TypeScript type imports for production build compatibility
- Build errors related to type definitions
- Mobile responsiveness issues in header and preview

### Infrastructure

#### Deployment
- Configured Vite base path for GitHub Pages
- Added GitHub Actions workflow for automatic deployment
- Deploy on push to main and current branch
- Live deployment at: `https://krisztiankoos.github.io/vibe/`

#### Tech Stack
- React 18
- TypeScript
- Vite
- GitHub Pages hosting
- GitHub Actions CI/CD

## [1.0.0] - 2025-11-13

### Added
- Initial implementation of English Lesson Builder
- PPP and TTT lesson structures
- Basic exercise types (gap-fill, sorting, matching, free-text)
- Lesson preview and local storage
- Step-by-step wizard interface
- Responsive UI with modern CSS

---

## Version Comparison

### v2.0.0 Features Summary
- 🎓 **Student learning platform** with interactive exercises
- 🇺🇦 **Ukrainian language samples** with authentic pedagogy
- 📚 **8 pre-built lesson templates** (4 English + 4 Ukrainian)
- 🔗 **Lesson sharing** via URL
- 📊 **Progress tracking** with localStorage persistence
- 🔒 **Security hardening** (XSS, validation, sanitization)
- 🌍 **Full bilingual support** (English/Ukrainian)
- 🎯 **11 interactive exercise types**

### v1.0.0 Features Summary
- ✏️ Lesson builder with PPP/TTT structures
- 📝 4 basic exercise types
- 💾 Local storage and export/import
- 🖨️ Print functionality
- 🎨 Responsive design

---

## Changelog Maintenance

This changelog is automatically maintained from git commit messages. When committing:
- Use clear, descriptive commit messages
- Include detailed descriptions in commit bodies
- Reference issue numbers when applicable
- Follow conventional commit format when possible

To update this changelog, run:
```bash
git log --pretty=format:"%s%n%n%b" --reverse
```
