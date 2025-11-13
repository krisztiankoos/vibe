# English Lesson Builder 🎓

A comprehensive bilingual web application for creating, sharing, and delivering interactive language lessons. Supports both English (ESL) and Ukrainian language teaching methodologies with student-facing interactive exercises.

**Live Demo**: [https://krisztiankoos.github.io/vibe/](https://krisztiankoos.github.io/vibe/)

## ✨ Features

### For Teachers

#### Lesson Building
- **Dual Methodology Support**: Choose between PPP (Presentation, Practice, Production) or TTT (Test, Teach, Test)
- **Bilingual Interface**: Full support for English and Ukrainian UI languages
- **Step-by-Step Wizard**: Intuitive lesson creation workflow
- **Sample Lessons**: 8 pre-built templates (4 English + 4 Ukrainian) demonstrating best practices

#### Lesson Components
- **Lead-In Activities**: Engaging warm-up activities with media links and teacher notes
- **Presentation Section**: Target language, explanations, examples, and visual aids
- **Controlled Practice**: 11 different exercise types with answer keys
- **Free Practice**: Production activities and communicative tasks
- **Teacher Notes**: Private instructor notes for each section
- **Duration Planning**: Time estimates for each lesson section

#### Lesson Management
- **Export to JSON**: Save and share lessons as portable files
- **Import from JSON**: Load lessons from other teachers
- **Print-Friendly**: Professional printable lesson plans
- **Local Storage**: Automatic saving to browser
- **Lesson Sharing**: Generate shareable URLs for students

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

## 🌍 Bilingual Support

### English (ESL Methodology)
- Communicative approach
- Focus on fluency and real-world usage
- PPP and TTT structures
- Sample lessons: Present Simple, Phrasal Verbs, Travel, Weather

### Ukrainian (Traditional Grammar)
- Grammar-translation approach
- Focus on правопис (correct spelling) and morphology
- Traditional Ukrainian pedagogy
- Sample lessons: Відмінки, Дієслова, Прикметники, Правопис

The application automatically shows culturally and pedagogically appropriate sample lessons based on your selected interface language.

## 🔒 Security Features

- **XSS Protection**: Content Security Policy headers and input sanitization
- **JSON Import Security**: File size limits, type validation, timeout protection
- **URL Validation**: Only allows safe http/https protocols
- **Input Sanitization**: Maximum length limits and dangerous character removal
- **Prototype Pollution Prevention**: Safe JSON parsing
- **File Safety**: Sanitized filenames and path traversal protection

## 🛠 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with responsive design
- **Storage**: Browser localStorage
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

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
│   │   ├── StudentLessonView.tsx
│   │   └── StudentExercise.tsx
│   ├── data/                # Sample lessons
│   │   ├── sampleLessons.ts
│   │   └── sampleLessonsUkrainian.ts
│   ├── utils/               # Utility functions
│   │   ├── lessonUtils.ts
│   │   └── security.ts
│   ├── types.ts             # TypeScript type definitions
│   ├── translations.ts      # Bilingual translations
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── dist/                    # Production build
├── CHANGELOG.md             # Version history
├── README.md                # This file
└── package.json             # Dependencies and scripts
```

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history and release notes.

**Latest Version**: 2.0.0
- Student interactive learning platform
- Ukrainian language samples
- 8 pre-built lesson templates
- Lesson sharing via URL
- Progress tracking
- Security enhancements
- 11 interactive exercise types

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
