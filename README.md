# English Lesson Builder 🎓

A comprehensive bilingual web application for creating, sharing, and delivering interactive language lessons. Supports both English (ESL) and Ukrainian language teaching methodologies with student-facing interactive exercises.

**Live Demo**: [https://krisztiankoos.github.io/vibe/](https://krisztiankoos.github.io/vibe/)

**Version**: 1.0.0

## ✨ Features

### For Teachers

#### Lesson Building
- **Dual Methodology Support**: Choose between PPP (Presentation, Practice, Production) or TTT (Test, Teach, Test)
- **Bilingual Interface**: Full support for English and Ukrainian UI languages
- **Step-by-Step Wizard**: Intuitive lesson creation workflow
- **Sample Lessons**: 14 pre-built templates (7 English + 7 Ukrainian) demonstrating authentic teaching methodologies
- **Comprehensive Help System**: Context-sensitive help for all 11 exercise types with examples and best practices

#### Lesson Components
- **Lead-In Activities**: Engaging warm-up activities with media links and teacher notes
- **Presentation Section**: Target language, explanations, examples, and visual aids
- **Controlled Practice**: 11 different exercise types with answer keys
- **Free Practice**: Production activities and communicative tasks
- **Teacher Notes**: Private instructor notes for each section
- **Duration Planning**: Time estimates for each lesson section

#### Lesson Management
- **My Lessons Library**: Browse, search, and manage all saved lessons with visual cards
- **Export to JSON**: Save and share lessons as portable files
- **Import from JSON**: Load lessons from other teachers with security validation
- **Duplicate Lessons**: Create copies of existing lessons for quick modifications
- **Print-Friendly**: Professional printable lesson plans
- **Local Storage**: Automatic saving to browser with progress persistence
- **Lesson Sharing**: Generate shareable URLs for students
- **Keyboard Shortcuts**: 8 productivity shortcuts for common actions (Ctrl+S, Ctrl+N, Ctrl+L, etc.)

### For Students

#### Interactive Learning Experience
- **URL-Based Access**: Students receive a link to access lessons
- **Clean Interface**: Distraction-free learning environment
- **Section Navigation**: Move through Lead-In, Presentation, Practice, and Production
- **Progress Tracking**: Real-time completion percentage and exercise tracking
- **Instant Feedback**: Immediate answer validation with visual feedback
- **Persistent Progress**: Progress saved automatically to localStorage
- **Mobile-Friendly**: Responsive design for all devices

#### Interactive Exercises (11 Types)
1. **Gap-Fill**: Type missing words with instant validation
2. **Multiple Choice**: Select correct answers with feedback
3. **True/False**: Toggle questions with answer checking
4. **Matching**: View paired items for reference
5. **Sorting**: Display items in correct order
6. **Sentence Scramble**: Rearrange words by clicking
7. **Free Text**: Writing exercises with word count
8. **Information Gap**: Communicative pair work with A/B cards
9. **Role-Play**: Scenario-based speaking activities
10. **Collocation**: Learn word partnerships
11. **Lexical Set**: Vocabulary chunks by topic

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/krisztiankoos/vibe.git
cd vibe

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

### Deploy to GitHub Pages

The project includes GitHub Actions for automatic deployment. Every push to the main branch triggers a deployment to GitHub Pages.

## 📖 Usage Guide

### Creating a Lesson (Teacher Mode)

1. **Select Language**: Choose English or Ukrainian interface
2. **Choose Structure**: Select PPP or TTT methodology
3. **Enter Lesson Details**: Title, level, duration, objectives, materials
4. **Lead-In**: Create warm-up activities with optional media links
5. **Presentation**: Add target language, explanations, and examples
6. **Controlled Practice**: Build exercises with answer keys
7. **Free Practice**: Add production activities
8. **Preview**: Review complete lesson
9. **Save & Share**: Save locally and generate student link

### Sharing with Students

1. Complete your lesson and go to **Preview** mode
2. Click **"Share with Students"** button
3. URL is automatically copied to clipboard
4. Share the URL via email, LMS, or messaging app
5. Students click the link and work through the lesson interactively

### Student Experience

1. Click teacher-provided URL
2. Lesson loads automatically in student mode
3. Navigate through sections: Lead-In → Presentation → Practice → Production
4. Complete exercises with instant feedback
5. Track progress to completion
6. Exit when finished

## 🎯 Exercise Types

### Gap Fill
Create sentences with `____` placeholders. Students type missing words and receive instant validation.

**Example**: "John ____ (wake) up at 7am every day."

### Multiple Choice
Questions with multiple options and automatic correct/incorrect feedback.

### True/False
Statement-based questions with toggle buttons and visual feedback.

### Matching
Display paired items that students need to match conceptually.

### Sorting
Items displayed in order for students to analyze or practice with.

### Sentence Scramble
Words that students click to rearrange into correct sentence order.

### Free Text
Writing prompts with word count tracking and minimum word requirements.

### Information Gap
Communicative activities with Student A and Student B information cards plus useful prompts.

### Role-Play
Scenario-based speaking activities with multiple role descriptions and suggested duration.

### Collocation
Word partnerships showing which words naturally go together.

### Lexical Set
Vocabulary organized by topic with chunks and fixed expressions.

## ⌨️ Keyboard Shortcuts

Boost your productivity with these keyboard shortcuts (available in teacher mode):

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl+S` (⌘+S on Mac) | Save Lesson | Saves current lesson to My Lessons library |
| `Ctrl+N` (⌘+N) | New Lesson | Creates a new lesson (confirms if unsaved changes) |
| `Ctrl+L` (⌘+L) | My Lessons | Opens the saved lessons library |
| `Ctrl+K` (⌘+K) | Sample Lessons | Opens sample lessons browser |
| `Ctrl+E` (⌘+E) | Export | Exports lesson to JSON (in preview mode) |
| `Ctrl+P` (⌘+P) | Print | Prints lesson plan (in preview mode) |
| `Ctrl+/` (⌘+/) | Shortcuts Help | Shows keyboard shortcuts reference |
| `Escape` | Close Modal | Closes any open modal dialog |

**Platform Detection**: The app automatically detects your operating system and displays ⌘ symbols on Mac or Ctrl on Windows/Linux.

## 🌍 Bilingual Support

### English (ESL Methodology)
- Communicative approach
- Focus on fluency and real-world usage
- PPP and TTT structures
- **7 Sample Lessons**:
  - Present Perfect - Life Experiences
  - Used To - Past Habits and States
  - Phrasal Verbs - Business Communication
  - Conditionals - Real and Hypothetical Situations
  - Relative Clauses - Describing People and Things
  - Passive Voice - Formal Writing
  - Reported Speech - Communication Strategies

### Ukrainian (Traditional Grammar)
- Grammar-translation approach
- Focus on правопис (correct spelling) and morphology
- Traditional Ukrainian pedagogical practices
- **7 Sample Lessons**:
  - Минулий доконаний час (Past Perfect)
  - Наказовий спосіб (Imperative)
  - Орудний відмінок іменників (Instrumental Case)
  - Числівники та вимова чисел (Numerals)
  - Дієприкметники та дієприслівники (Participles)
  - Складнопідрядні речення з часовими сполучниками (Complex Sentences)
  - Давальний відмінок іменників (Dative Case)

The application automatically shows culturally and pedagogically appropriate sample lessons based on your selected interface language. Ukrainian samples include subtle references to Ukrainian culture and national pride.

## 🔒 Security Features

- **XSS Protection**: Content Security Policy headers and input sanitization
- **JSON Import Security**: File size limits, type validation, timeout protection
- **URL Validation**: Only allows safe http/https protocols
- **Input Sanitization**: Maximum length limits and dangerous character removal
- **Prototype Pollution Prevention**: Safe JSON parsing
- **File Safety**: Sanitized filenames and path traversal protection

## 🛠 Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: CSS3 with responsive design
- **Storage**: Browser localStorage
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Security**: CSP headers, input sanitization, file validation

## 📋 Project Structure

```
vibe/
├── src/
│   ├── components/          # React components
│   │   ├── LanguageSelector.tsx
│   │   ├── LeadInForm.tsx
│   │   ├── PresentationForm.tsx
│   │   ├── ExerciseBuilder.tsx
│   │   ├── LessonPreview.tsx
│   │   ├── SampleLessons.tsx
│   │   ├── SavedLessons.tsx          # NEW: Saved lessons library
│   │   ├── KeyboardShortcutsHelp.tsx # NEW: Shortcuts help modal
│   │   ├── StudentLessonView.tsx
│   │   ├── StudentExercise.tsx
│   │   └── Tooltip.tsx
│   ├── data/                # Sample lessons
│   │   ├── sampleLessons.ts          # 7 English samples
│   │   └── sampleLessonsUkrainian.ts # 7 Ukrainian samples
│   ├── hooks/               # Custom React hooks
│   │   └── useKeyboardShortcuts.ts   # NEW: Keyboard shortcuts hook
│   ├── utils/               # Utility functions
│   │   ├── lessonUtils.ts
│   │   ├── security.ts
│   │   └── helpText.ts               # NEW: Help content for exercises
│   ├── types.ts             # TypeScript type definitions
│   ├── translations.ts      # Bilingual translations
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── dist/                    # Production build
├── LICENSE                  # MIT License
├── CHANGELOG.md             # Version history
├── SECURITY_AUDIT.md        # Security audit report
├── TESTING_PLAN_V1.md       # Comprehensive testing plan
├── README.md                # This file
└── package.json             # Dependencies and scripts
```

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history and release notes.

**Latest Version**: 1.0.0 (2025-11-13)
- 14 authentic sample lessons (7 English + 7 Ukrainian)
- Saved Lessons Library with search and management
- Keyboard shortcuts for productivity
- Comprehensive help system for all exercise types
- Duplicate lesson functionality
- Enhanced security (zero vulnerabilities)
- Student interactive learning platform
- 11 interactive exercise types with instant feedback
- Lesson sharing via URL with progress tracking

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Message Guidelines

- Use clear, descriptive commit messages
- Include detailed descriptions in commit bodies
- Reference issue numbers when applicable
- Follow conventional commit format when possible

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Ukrainian language teaching methodology based on traditional Ukrainian pedagogical practices
- English language teaching methodology follows modern communicative approaches
- Sample lessons inspired by real classroom materials
- Icons and design influenced by modern educational platforms

## 📬 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/krisztiankoos/vibe/issues)
- **Discussions**: [GitHub Discussions](https://github.com/krisztiankoos/vibe/discussions)

---

**Built with ❤️ for language teachers worldwide**
