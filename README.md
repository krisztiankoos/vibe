# English Lesson Builder

A web application for constructing English lessons following PPP (Presentation, Practice, Production) and TTT (Test, Teach, Test) methodologies.

## Features

- **Choose Lesson Structure**: Select between PPP or TTT teaching methodologies
- **Lead-In Activities**: Create engaging warm-up activities to introduce topics
- **Presentation Section**: Present target language with explanations and examples
- **Controlled Practice**: Add guided exercises including:
  - Gap Fill exercises
  - Sorting activities
  - Matching exercises
  - Free text prompts
- **Free Practice/Production**: Add exercises for students to use language freely
- **Lesson Preview**: Review complete lesson before saving
- **Local Storage**: Lessons are saved to browser's local storage

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173/

### Build

Create a production build:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Choose Structure**: Select PPP or TTT and enter a lesson title
2. **Lead-In**: Add an engaging warm-up activity
3. **Presentation**: Present the target language with examples and explanations
4. **Controlled Practice**: Add structured exercises for students to practice
5. **Free Practice**: Add production exercises for freer language use
6. **Preview & Save**: Review your lesson and save it to local storage

## Exercise Types

### Gap Fill
Create sentences with missing words marked by [brackets]. Students fill in the gaps.

### Sorting
Provide items that students need to arrange in the correct order.

### Matching
Create pairs of items that students need to match correctly.

### Free Text
Give students a prompt for creative writing or speaking activities.

## Technology Stack

- React 18
- TypeScript
- Vite
- CSS3

## Future Enhancements

- Export lessons to PDF or JSON
- Import existing lessons
- Add more exercise types
- Collaborative lesson building
- Lesson templates
- Student-facing lesson player
- Backend integration for cloud storage

## License

MIT
