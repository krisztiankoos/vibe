# Claude AI-Assisted Development Guide for Vibe

**Project**: English Lesson Builder (Vibe)
**Version**: 1.0.0
**Purpose**: Professional AI-assisted educational platform development
**Last Updated**: 2025-11-14

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [AI-Assisted Development Philosophy](#ai-assisted-development-philosophy)
4. [Anthropic Best Practices](#anthropic-best-practices)
5. [Prompt Engineering Guidelines](#prompt-engineering-guidelines)
6. [Skills Development Plan](#skills-development-plan)
7. [Agent Architecture](#agent-architecture)
8. [Development Workflow](#development-workflow)
9. [Code Standards](#code-standards)
10. [Testing Strategy](#testing-strategy)
11. [Deployment Strategy](#deployment-strategy)

---

## Project Overview

### What is Vibe?

Vibe is a bilingual web application for language teachers to create, share, and deliver interactive language lessons. It bridges English ESL teaching (communicative approach) with Ukrainian traditional grammar instruction.

**Live Production**: https://krisztiankoos.github.io/vibe/
**Development Environment**: TBD (for teacher testing)

### Core Value Proposition

- **For Teachers**: Intuitive lesson creation wizard with 14 sample lessons, 11 exercise types, and complete bilingual support
- **For Students**: Interactive learning platform with instant feedback, progress tracking, and mobile-friendly interface
- **Dual Methodology**: Supports both PPP (Presentation, Practice, Production) and TTT (Test, Teach, Test)

### Project Goals

1. **Educational Excellence**: Provide authentic, pedagogically-sound lesson templates
2. **Accessibility**: Support both English and Ukrainian teaching contexts
3. **Professional Development**: Build with AI assistance following Anthropic best practices
4. **Scalability**: Prepare for future features (backend, authentication, collaboration)
5. **Security**: Zero vulnerabilities, input sanitization, secure data handling

---

## Architecture & Tech Stack

### Current Stack (v1.0.0)

```
Frontend:
- React 19.2.0 (latest stable) with TypeScript 5.9.3
- Vite 7.2.2 (build tool)
- CSS3 (responsive design)

State Management:
- React Hooks (useState, useEffect, useRef)
- localStorage for persistence

Deployment:
- GitHub Pages (production)
- GitHub Actions (CI/CD)

Security:
- Input sanitization (utils/security.ts)
- XSS prevention
- JSON import validation
```

### File Structure

```
vibe/
├── src/
│   ├── components/        # 13 React components
│   │   ├── App.tsx
│   │   ├── StudentLessonView.tsx
│   │   └── ...
│   ├── data/             # Sample lessons (14 total)
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Helper functions (security, import/export)
│   ├── types.ts          # TypeScript definitions
│   ├── translations.ts   # 170+ bilingual strings
│   └── App.css
├── .claude/              # Claude Code configuration
├── public/
├── .github/workflows/    # CI/CD
└── [documentation files]
```

### Architecture Principles

1. **Component-Based**: Modular React components with clear responsibilities
2. **Type-Safe**: Strict TypeScript throughout
3. **Security-First**: All inputs validated and sanitized
4. **Bilingual-Native**: Translation keys integrated at every level
5. **Progressive Enhancement**: Core functionality works offline (localStorage)

---

## AI-Assisted Development Philosophy

### Transition: From "Vibe Coding" to Professional Development

**Previous Approach**: Rapid prototyping, experimentation
**New Approach**: Systematic, AI-assisted, best-practice driven

### Core Principles

1. **Prompt Engineering First**: The most important skill to develop
2. **Iterative Refinement**: Build → Review → Improve cycles
3. **Documentation-Driven**: Every feature starts with clear specification
4. **Test Before Deploy**: Manual testing checklist compliance
5. **Security Always**: Zero-trust approach to all inputs
6. **Claude as Pair Programmer**: Not just code generation, but architectural guidance

### Why Claude Code?

- **Context-Aware**: Understands full codebase (5,503 lines)
- **Multi-Step Tasks**: Can execute complex workflows autonomously
- **Best Practices**: Built-in knowledge of TypeScript, React, security patterns
- **Documentation**: Can generate and maintain docs alongside code
- **Bilingual Support**: Handles English/Ukrainian content naturally

---

## Anthropic Best Practices

### 1. Prompt Engineering Fundamentals

#### Clear, Contextual Prompts

**Bad Prompt:**
```
Add a new exercise type
```

**Good Prompt:**
```
Add a new exercise type called "Pronunciation Practice" to the lesson builder:

Context:
- We have 11 existing exercise types (see src/types.ts)
- Exercise types are rendered in StudentExercise.tsx
- Each type needs a builder form in ExerciseBuilder.tsx
- Must support bilingual UI (English/Ukrainian)

Requirements:
1. Add TypeScript type definition
2. Create builder form with fields for:
   - Word/phrase
   - Phonetic transcription
   - Audio URL (optional)
3. Implement student-facing component with:
   - Play audio button
   - Show/hide transcription toggle
4. Add translations for new strings
5. Update help text in utils/helpText.ts

Constraints:
- Must validate URLs with security.validateURL()
- Follow existing exercise type patterns
- Include example in help text

Expected outcome:
- Teachers can create pronunciation exercises
- Students can practice with audio and transcriptions
- Zero security vulnerabilities
```

#### Structured Task Breakdown

Always request Claude to:
1. Analyze the task
2. Break down into steps
3. Identify dependencies
4. Propose approach
5. Implement incrementally
6. Test each step
7. Document changes

### 2. Context Management

#### Provide Rich Context

Before asking Claude to modify code:
- Share relevant file paths
- Explain the current behavior
- Describe the desired outcome
- Mention related components
- Reference existing patterns to follow

#### Use File References

Instead of: "Update the student view"
Use: "Update StudentLessonView.tsx:45-67 to show progress percentage"

### 3. Iterative Development

#### Example Workflow

```
1. User: "I want to add lesson collaboration features"

2. Claude: [Asks clarifying questions]
   - Real-time or asynchronous?
   - Who can edit (owner only, invited teachers, public)?
   - How should conflicts be resolved?
   - Should we track version history?

3. User: [Provides answers]

4. Claude: [Proposes architecture]
   - Backend service needed (Firebase/Supabase)
   - Authentication layer
   - Permissions system
   - Conflict resolution strategy

5. User: "Let's start with Firebase"

6. Claude: [Breaks down into phases]
   Phase 1: Firebase setup and authentication
   Phase 2: Firestore data model
   Phase 3: Real-time sync
   Phase 4: Permissions and sharing
   Phase 5: Conflict resolution
   Phase 6: Testing

7. [Implement Phase 1, test, document, then proceed]
```

### 4. Security-First Development

Always ask Claude to:
- Validate all inputs
- Sanitize output
- Check for XSS, injection attacks
- Review dependencies for vulnerabilities
- Follow OWASP guidelines

### 5. Testing Mindset

Before considering a feature "done", ensure:
- Manual testing checklist created
- Happy path tested
- Error cases tested
- Edge cases identified
- Bilingual content tested
- Mobile responsiveness verified

---

## Prompt Engineering Guidelines

### Essential Skills to Develop

#### 1. Specificity and Clarity

**Principle**: More context = Better output

**Template:**
```
Task: [One-sentence goal]

Context:
- [Current state]
- [Related files/components]
- [Existing patterns to follow]

Requirements:
- [Functional requirement 1]
- [Functional requirement 2]
- [Non-functional requirements]

Constraints:
- [Technical limitations]
- [Must follow X pattern]
- [Must maintain Y compatibility]

Success Criteria:
- [How to verify it works]
- [What tests to run]
```

#### 2. Iterative Prompting

**Don't try to do everything at once.**

Break large tasks into:
1. **Discovery**: "Analyze the current implementation of [feature]"
2. **Planning**: "Propose 3 approaches to add [feature], with pros/cons"
3. **Decision**: "Let's go with approach 2. Break it down into steps"
4. **Implementation**: "Implement step 1: [specific task]"
5. **Review**: "Review the implementation for security and best practices"
6. **Testing**: "Create a testing checklist for this feature"
7. **Documentation**: "Update README.md and add inline comments"

#### 3. Chain-of-Thought Prompting

Ask Claude to "think through" complex problems:

```
"Before implementing the lesson sharing feature, please:
1. Analyze how the current lesson data structure works
2. Identify what data needs to be shared vs. kept private
3. Propose a URL encoding scheme that's both secure and user-friendly
4. Consider what happens if the lesson is updated after sharing
5. Then implement the solution"
```

#### 4. Few-Shot Examples

Show Claude what you want by providing examples:

```
"Add translations for the new feature following this pattern:

Existing:
```typescript
saveLesson: {
  en: 'Save Lesson',
  uk: 'Зберегти Урок'
}
```

Add similar translations for:
- "Share Lesson"
- "Copy Link"
- "Link Copied!"
```

#### 5. Constraint-Based Prompting

Be explicit about what NOT to do:

```
"Refactor the exercise rendering logic, but:
- DO NOT change the Lesson type definition
- DO NOT break backward compatibility with saved lessons
- DO NOT remove any existing exercise types
- DO maintain the current URL parameter structure
```

#### 6. Role-Based Prompting

Frame Claude as different roles for different tasks:

```
"Act as a senior TypeScript developer reviewing this code:
[paste code]

Check for:
- Type safety issues
- Potential runtime errors
- Performance concerns
- Better React patterns we could use"
```

```
"Act as a security auditor examining this input handling:
[paste code]

Identify:
- XSS vulnerabilities
- Injection risks
- Data validation gaps
- Unsafe operations"
```

```
"Act as a UX designer reviewing this component:
[paste code]

Evaluate:
- User flow clarity
- Error handling feedback
- Loading states
- Accessibility"
```

---

## Skills Development Plan

### Priority 1: Prompt Engineering (Weeks 1-2)

**Goal**: Master the art of communicating with Claude effectively

**Activities**:
1. **Daily Practice**:
   - Write 5 prompts (simple → complex)
   - Analyze Claude's responses
   - Refine prompts based on output quality

2. **Study Resources**:
   - Anthropic Prompt Engineering Guide
   - Claude documentation
   - Prompt engineering case studies

3. **Exercises**:
   - Take existing Vibe features and write "perfect prompts" to recreate them
   - Practice breaking down complex features into prompt chains
   - Experiment with different prompt structures

**Success Criteria**:
- Can consistently get desired output in 1-2 iterations
- Understand when to use chain-of-thought vs. direct prompting
- Can provide just enough context (not too little, not too much)

### Priority 2: Language & Localization (Weeks 2-3)

**Goal**: Deepen bilingual development expertise

**Activities**:
1. **Translation Workflow**:
   - Audit existing 170+ translation keys
   - Identify missing or awkward translations
   - Create translation contribution guidelines

2. **Prompt for Localization**:
   - Practice prompting Claude for natural translations
   - Learn to request cultural appropriateness checks
   - Develop templates for bilingual feature requests

3. **Internationalization (i18n)**:
   - Research i18n best practices
   - Consider migration to i18n library (react-i18next)
   - Plan for potential third language (Polish? Russian?)

**Success Criteria**:
- All new features include translations from start
- Can prompt Claude to generate culturally appropriate content
- Translation keys are organized and documented

### Priority 3: Software Methodology (Weeks 3-4)

**Goal**: Establish professional development processes

**Activities**:
1. **Git Workflow**:
   - Establish branching strategy (feature branches, PR reviews)
   - Write meaningful commit messages
   - Use conventional commits format

2. **Documentation**:
   - Maintain CHANGELOG.md
   - Update README.md with new features
   - Write inline code comments for complex logic

3. **Testing Methodology**:
   - Expand TESTING_PLAN_V1.md
   - Create automated test suite (Vitest)
   - Implement E2E testing (Playwright)

4. **Issue Tracking**:
   - Use GitHub Issues for feature requests
   - Create issue templates
   - Label issues by type/priority

**Success Criteria**:
- Every feature follows: Plan → Branch → Implement → Test → Document → PR → Review → Merge
- Can prompt Claude to help at each stage
- Project has clear development guidelines

### Priority 4: Advanced React & TypeScript (Weeks 4-6)

**Goal**: Level up technical implementation quality

**Activities**:
1. **React Patterns**:
   - Study advanced hooks (useCallback, useMemo, useReducer)
   - Learn React performance optimization
   - Explore React 19 features (use, useFormStatus)

2. **TypeScript Mastery**:
   - Advanced types (conditional, mapped, template literal types)
   - Generic components and hooks
   - Type-safe API design

3. **Prompt for Quality**:
   - Learn to request code reviews from Claude
   - Ask for performance optimization suggestions
   - Request refactoring recommendations

**Success Criteria**:
- Zero TypeScript errors
- Components follow React best practices
- Can articulate tradeoffs between different implementation approaches

### Priority 5: Architecture & Scalability (Weeks 6-8)

**Goal**: Prepare for future growth (backend, auth, real-time features)

**Activities**:
1. **Backend Planning**:
   - Research Firebase, Supabase, or custom Node.js
   - Design data models for lessons, users, progress
   - Plan authentication and authorization

2. **State Management**:
   - Evaluate Context API vs. Zustand vs. Redux Toolkit
   - Design state architecture for complex features
   - Plan for real-time synchronization

3. **Prompt for Architecture**:
   - Practice requesting architectural reviews from Claude
   - Ask for scalability assessments
   - Request migration strategies

**Success Criteria**:
- Clear roadmap for backend integration
- Architecture supports future features
- Can prompt Claude to evaluate architectural decisions

---

## Agent Architecture

### What Are Agents?

Agents are specialized AI assistants that autonomously handle specific domains of work. Instead of manually prompting Claude for every step, agents can:
- Break down complex tasks automatically
- Make decisions within their domain
- Execute multi-step workflows
- Report back with results

### Planned Agents for Vibe

#### 1. Translation Agent (Priority: High)

**Purpose**: Handle all bilingual content management

**Capabilities**:
- Generate English ↔ Ukrainian translations
- Validate translation consistency
- Check for cultural appropriateness
- Update translation.ts file
- Audit missing translation keys

**Example Usage**:
```
User: "Add a new feature for lesson templates"
Translation Agent: [Automatically generates EN/UK strings, adds to translations.ts]
```

**Implementation**:
- Claude Code Task tool with specialized prompt
- Access to translations.ts and sample lessons
- Knowledge of educational terminology

#### 2. Testing Agent (Priority: High)

**Purpose**: Ensure quality before deployment

**Capabilities**:
- Run manual testing checklist
- Generate test cases
- Identify edge cases
- Create E2E test scripts
- Report bugs found

**Example Usage**:
```
User: "Test the new exercise type"
Testing Agent:
  ✅ Teacher can create exercise
  ✅ Exercise saves correctly
  ✅ Student view renders properly
  ❌ Bug: Exercise doesn't validate empty inputs
  📋 Report: [detailed findings]
```

**Implementation**:
- Task tool with testing-focused prompt
- Access to TESTING_PLAN_V1.md
- Can run npm commands
- Can capture screenshots

#### 3. Documentation Agent (Priority: Medium)

**Purpose**: Keep docs in sync with code

**Capabilities**:
- Update README.md with new features
- Maintain CHANGELOG.md
- Generate inline code comments
- Create user guides
- Write API documentation (when backend added)

**Example Usage**:
```
User: "Just finished implementing lesson collaboration"
Documentation Agent:
  - Updated README.md with collaboration section
  - Added to CHANGELOG.md under [Unreleased]
  - Generated inline comments in CollaborationService.ts
  - Created COLLABORATION_GUIDE.md for users
```

**Implementation**:
- Task tool with documentation focus
- Access to all .md files
- Style guide for consistency

#### 4. Security Agent (Priority: High)

**Purpose**: Proactive security review

**Capabilities**:
- Audit new code for vulnerabilities
- Check dependencies (npm audit)
- Validate input sanitization
- Review data handling
- Update SECURITY_AUDIT.md

**Example Usage**:
```
User: "Review security of the new API integration"
Security Agent:
  ⚠️ Found: API key exposed in client code
  ⚠️ Found: User input not sanitized before display
  ✅ Passed: Dependencies have no known vulnerabilities
  📋 Recommendations: [detailed fixes]
```

**Implementation**:
- Task tool with security expertise
- Access to utils/security.ts
- Runs npm audit
- Follows OWASP guidelines

#### 5. Refactoring Agent (Priority: Medium)

**Purpose**: Improve code quality continuously

**Capabilities**:
- Identify code duplication
- Suggest better patterns
- Improve TypeScript types
- Optimize performance
- Maintain consistency

**Example Usage**:
```
User: "Refactor the exercise rendering logic"
Refactoring Agent:
  - Extracted common validation logic to useExerciseValidation hook
  - Reduced component file size by 40%
  - Improved type safety with generic Exercise<T> type
  - All tests still passing
```

**Implementation**:
- Task tool with refactoring focus
- Deep knowledge of React patterns
- TypeScript expertise

#### 6. Deployment Agent (Priority: Low)

**Purpose**: Handle release process

**Capabilities**:
- Run build checks
- Update version numbers
- Generate release notes
- Deploy to staging/production
- Verify deployment success

**Example Usage**:
```
User: "Deploy v1.1.0 to production"
Deployment Agent:
  ✅ All tests passing
  ✅ Build successful (bundle: 418 kB)
  ✅ Version bumped to 1.1.0
  ✅ CHANGELOG.md updated
  ✅ Git tag created
  ✅ Deployed to GitHub Pages
  ✅ Verified: https://krisztiankoos.github.io/vibe/
```

**Implementation**:
- Task tool with deployment workflow
- Access to package.json, GitHub Actions
- Can run git commands

### Agent Development Roadmap

**Phase 1 (Now)**: Build foundational agents
- Translation Agent
- Testing Agent
- Security Agent

**Phase 2 (After backend)**: Add integration agents
- API Integration Agent
- Database Migration Agent
- Authentication Agent

**Phase 3 (Maturity)**: Advanced agents
- Performance Optimization Agent
- User Analytics Agent
- Content Moderation Agent

---

## Development Workflow

### Daily Workflow with Claude

#### 1. Start of Session

```
User: "Let's work on Vibe. What's the status?"

Claude:
- Reviews recent commits
- Checks git status
- Reads open issues (if any)
- Reviews todo list or DEVELOPMENT.md
- Proposes what to work on
```

#### 2. Feature Planning

```
User: "I want to add [feature]"

Claude:
1. Asks clarifying questions
2. Analyzes current codebase
3. Proposes implementation approach
4. Breaks down into tasks
5. Estimates complexity

User: "Looks good, let's do it"

Claude:
- Creates feature branch
- Updates todo list / creates GitHub issue
- Begins implementation
```

#### 3. Implementation

```
Claude:
- Implements one task at a time
- Writes code following project patterns
- Adds translations
- Updates types
- Writes tests
- Documents changes
- Commits with meaningful message
```

#### 4. Testing

```
Claude:
- Runs manual testing checklist
- Reports any issues found
- Fixes bugs
- Re-tests
- Asks user to verify critical paths
```

#### 5. Documentation

```
Claude:
- Updates README.md (if user-facing)
- Adds to CHANGELOG.md
- Updates claude.md (if workflow changed)
- Writes inline comments
```

#### 6. Pull Request

```
Claude:
- Reviews own code
- Checks for security issues
- Verifies tests pass
- Creates PR with description
- Waits for user review
```

#### 7. Deployment

```
User: "Ship it!"

Claude:
- Merges PR
- Watches GitHub Actions
- Verifies deployment
- Creates git tag
- Announces completion
```

### Git Workflow

**Branch Naming**:
- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code improvements
- `docs/description` - Documentation only
- `test/description` - Test additions

**Commit Messages** (Conventional Commits):
```
feat: add pronunciation practice exercise type
fix: correct infinite loop in useKeyboardShortcuts
docs: update README with collaboration guide
refactor: extract exercise validation to custom hook
test: add E2E tests for student lesson flow
chore: update dependencies
```

**PR Template**:
```markdown
## Description
[What does this PR do?]

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation
- [ ] Testing

## Testing
- [ ] Manual testing completed
- [ ] All existing tests pass
- [ ] New tests added (if applicable)

## Checklist
- [ ] Code follows project style
- [ ] TypeScript compiles with no errors
- [ ] Translations added for new strings
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] No security vulnerabilities introduced

## Screenshots (if UI changes)
[Add screenshots]
```

---

## Code Standards

### TypeScript

1. **Strict Mode**: Always enabled
2. **Explicit Types**: Avoid `any`, use specific types
3. **Type Definitions**: All functions have return types
4. **Interfaces**: Use for complex objects
5. **Enums**: For fixed sets of values

**Example**:
```typescript
// ✅ Good
interface ExerciseProps {
  exercise: Exercise;
  language: Language;
  onComplete: (exerciseId: string) => void;
}

function StudentExercise({ exercise, language, onComplete }: ExerciseProps): JSX.Element {
  // ...
}

// ❌ Bad
function StudentExercise(props: any) {
  // ...
}
```

### React

1. **Functional Components**: No class components
2. **Hooks**: Follow Rules of Hooks
3. **Props Destructuring**: Always destructure props
4. **Key Prop**: Always provide stable keys in lists
5. **Conditional Rendering**: Use ternary or && operator

**Example**:
```typescript
// ✅ Good
function ExerciseList({ exercises }: { exercises: Exercise[] }): JSX.Element {
  return (
    <div>
      {exercises.map(exercise => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}

// ❌ Bad
function ExerciseList(props) {
  return (
    <div>
      {props.exercises.map((exercise, index) => (
        <ExerciseCard key={index} exercise={exercise} />
      ))}
    </div>
  );
}
```

### CSS

1. **Component-Scoped**: Each component has its own CSS section in App.css
2. **BEM-like Naming**: Use descriptive class names
3. **Mobile-First**: Start with mobile styles, add desktop with media queries
4. **Accessibility**: Sufficient color contrast, focus states

**Example**:
```css
/* ✅ Good */
.exercise-card {
  padding: 1rem;
  border-radius: 8px;
}

.exercise-card__title {
  font-size: 1.2rem;
  font-weight: bold;
}

.exercise-card--completed {
  background: #e8f5e9;
}

@media (min-width: 768px) {
  .exercise-card {
    padding: 1.5rem;
  }
}

/* ❌ Bad */
.ec {
  padding: 1rem;
}

div.title {
  font-size: 1.2rem;
}
```

### File Organization

1. **One Component Per File**: Except for tightly coupled sub-components
2. **Group by Feature**: Not by file type
3. **Barrel Exports**: Use index.ts for clean imports
4. **Utils Separation**: Keep utilities separate from components

### Security

1. **Input Validation**: Use `security.validateInput()` for all user input
2. **URL Validation**: Use `security.validateURL()` for all URLs
3. **Sanitization**: Use `security.sanitizeInput()` before rendering user content
4. **No Inline Scripts**: Never use `dangerouslySetInnerHTML` without sanitization
5. **Dependency Audits**: Run `npm audit` before every release

### Translations

1. **All User-Facing Text**: Must be in translations.ts
2. **Key Naming**: Use dot notation: `section.action`
3. **No Hardcoded Strings**: No English or Ukrainian in components
4. **Fallbacks**: Always provide both `en` and `uk`

**Example**:
```typescript
// translations.ts
export const translations = {
  lessonBuilder: {
    saveButton: {
      en: 'Save Lesson',
      uk: 'Зберегти Урок'
    }
  }
};

// Component
const t = translations;
<button>{t.lessonBuilder.saveButton[language]}</button>
```

---

## Testing Strategy

### Current State (v1.0.0)

- **Manual Testing**: TESTING_PLAN_V1.md checklist
- **No Automated Tests**: Needs to be added

### Testing Roadmap

#### Phase 1: Unit Tests (Next Priority)

**Tool**: Vitest (Vite-native test runner)

**What to Test**:
- `utils/lessonUtils.ts`: Import/export functions
- `utils/security.ts`: Validation and sanitization
- `hooks/useKeyboardShortcuts.ts`: Keyboard logic (if re-added)
- Custom validation functions

**Example**:
```typescript
// lessonUtils.test.ts
import { describe, it, expect } from 'vitest';
import { exportLessonToJSON, importLessonFromJSON } from './lessonUtils';

describe('exportLessonToJSON', () => {
  it('should export lesson with correct structure', () => {
    const lesson = createMockLesson();
    const json = exportLessonToJSON(lesson);
    expect(json).toContain('"title":');
    expect(json).toContain('"exercises":');
  });
});
```

#### Phase 2: Component Tests

**Tool**: React Testing Library

**What to Test**:
- Form validation in LeadInForm, PresentationForm, ExerciseBuilder
- Exercise rendering in StudentExercise
- Navigation flow in StudentLessonView
- Sample lesson loading

**Example**:
```typescript
// ExerciseBuilder.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExerciseBuilder from './ExerciseBuilder';

describe('ExerciseBuilder', () => {
  it('should add a new exercise when button clicked', () => {
    render(<ExerciseBuilder exercises={[]} onChange={() => {}} language="en" />);

    fireEvent.click(screen.getByText('Add Exercise'));

    expect(screen.getByText('Exercise 1')).toBeInTheDocument();
  });
});
```

#### Phase 3: E2E Tests

**Tool**: Playwright

**What to Test**:
- Full lesson creation flow (teacher)
- Full lesson completion flow (student)
- Import/export lesson
- Save and load from My Lessons
- URL sharing

**Example**:
```typescript
// e2e/lesson-creation.spec.ts
import { test, expect } from '@playwright/test';

test('teacher can create and save a lesson', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Select language
  await page.click('text=English');

  // Fill lesson structure
  await page.fill('input[name="title"]', 'Test Lesson');
  await page.selectOption('select[name="level"]', 'B1');

  // ... continue through wizard

  // Save lesson
  await page.click('text=Save Lesson');

  // Verify success
  await expect(page.locator('text=Lesson saved successfully')).toBeVisible();
});
```

#### Phase 4: Visual Regression Tests

**Tool**: Playwright + Percy or Chromatic

**What to Test**:
- Component visual consistency
- Responsive design breakpoints
- Cross-browser rendering

### Test Coverage Goals

- **Unit Tests**: 80% coverage for utils
- **Component Tests**: 70% coverage for components
- **E2E Tests**: All critical user paths
- **Manual Testing**: Still required for UX and pedagogical quality

### Testing with Claude

**Prompt Template**:
```
Write comprehensive tests for [component/function]:

Context:
- [Description of what it does]
- [Dependencies]
- [Edge cases to consider]

Test cases needed:
1. Happy path: [description]
2. Error case: [description]
3. Edge case: [description]

Test framework: Vitest + React Testing Library
Follow existing test patterns in [example-test-file.test.ts]
```

---

## Deployment Strategy

### Current Setup

**Production**: GitHub Pages
- URL: https://krisztiankoos.github.io/vibe/
- Auto-deploys on push to `main`
- Static hosting (no backend)

**CI/CD**: GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies
      - Build (npm run build)
      - Deploy to gh-pages branch
```

### Future: Development Environment

**Goal**: Separate environment for teacher testing

**Options**:
1. **Vercel**: Free tier, automatic preview deploys
2. **Netlify**: Free tier, form handling, serverless functions
3. **Cloudflare Pages**: Free tier, fast CDN

**Recommendation**: Vercel
- Easy GitHub integration
- Preview URLs for every PR
- Can add serverless API routes later

**Setup**:
```yaml
# vercel.json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

**Environments**:
- `main` branch → Production (GitHub Pages)
- `develop` branch → Development (Vercel)
- Feature branches → Preview URLs (Vercel)

### Release Process

**Version Numbering**: Semantic Versioning (semver)
- MAJOR: Breaking changes (e.g., 2.0.0)
- MINOR: New features (e.g., 1.1.0)
- PATCH: Bug fixes (e.g., 1.0.1)

**Release Checklist**:
1. ✅ All tests pass
2. ✅ Manual testing completed
3. ✅ CHANGELOG.md updated
4. ✅ Version bumped in package.json
5. ✅ Git tag created (e.g., `v1.1.0`)
6. ✅ Deployed to production
7. ✅ Deployment verified
8. ✅ GitHub release created with notes

**Claude-Assisted Release**:
```
User: "Prepare release v1.1.0"

Claude:
1. Reviews changes since last release
2. Categorizes changes (features, fixes, chores)
3. Updates CHANGELOG.md
4. Bumps version in package.json
5. Creates commit: "chore: release v1.1.0"
6. Creates git tag
7. Pushes to main
8. Monitors deployment
9. Creates GitHub release with notes
```

---

## Next Steps

### Immediate (This Week)

1. ✅ Create claude.md (this file)
2. ⬜ Set up Vercel development environment
3. ⬜ Create development branch workflow
4. ⬜ Build first agent (Translation Agent)
5. ⬜ Start prompt engineering practice (5 prompts/day)

### Short-Term (Next 2 Weeks)

1. ⬜ Complete Skills Development Plan - Priority 1 (Prompt Engineering)
2. ⬜ Build Testing Agent
3. ⬜ Build Security Agent
4. ⬜ Set up unit testing with Vitest
5. ⬜ Write tests for utils/security.ts and utils/lessonUtils.ts
6. ⬜ Audit and improve all translations

### Medium-Term (Next Month)

1. ⬜ Complete Skills Development Plan - Priorities 2-3
2. ⬜ Add component tests
3. ⬜ Implement E2E testing with Playwright
4. ⬜ Build Documentation Agent
5. ⬜ Plan backend architecture (Firebase vs. Supabase)
6. ⬜ Design data models for user authentication and lesson storage

### Long-Term (Next Quarter)

1. ⬜ Backend implementation
2. ⬜ User authentication
3. ⬜ Lesson collaboration features
4. ⬜ Real-time progress tracking for teachers
5. ⬜ Mobile app (React Native?)

---

## Resources

### Anthropic Documentation

- [Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Claude Code Documentation](https://docs.claude.com/claude-code)
- [Best Practices](https://docs.anthropic.com/claude/docs/guide-to-anthropics-prompt-engineering-resources)

### Technical References

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vite.dev/)
- [Vitest Testing Guide](https://vitest.dev/)
- [Playwright E2E Testing](https://playwright.dev/)

### Language Teaching

- [ESL Methodology (PPP, TTT)](https://www.teachingenglish.org.uk/)
- [Ukrainian Language Resources](https://ukrainian-lessons.com/)

### Security

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Cheat Sheet](https://cheatsheetseries.owasp.org/)

---

## Changelog for claude.md

**2025-11-14**: Initial creation
- Comprehensive project overview
- AI-assisted development philosophy
- Anthropic best practices
- Prompt engineering guidelines
- Skills development plan (5 priorities)
- Agent architecture (6 planned agents)
- Development workflow
- Code standards
- Testing strategy
- Deployment strategy

---

**End of claude.md**

This document is a living guide. Update it as the project evolves, new patterns emerge, and skills develop. When in doubt, ask Claude to help update this file.
