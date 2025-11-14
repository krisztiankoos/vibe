# Claude Extensions Index

Quick reference for all available Claude Code extensions in the Vibe project.

## Skills (2)

### 🇬🇧 ESL Teaching
**Path**: `skills/esl_teaching/`
**Purpose**: English as Second Language teaching methodology
- PPP/TTT frameworks (Presentation, Practice, Production)
- Communicative, student-centered approach
- CEFR levels A1-C2
- Focus: Fluency, real-world usage, authentic materials

**When to use**: Creating English lessons, designing communicative activities, ESL methodology

**Invoke**: Naturally reference when working on English lesson content
```
"Create a B1 PPP lesson on present perfect for life experiences"
```

---

### 🇺🇦 Ukrainian Teaching
**Path**: `skills/ukrainian_teaching/`
**Purpose**: Ukrainian language teaching methodology
- Traditional grammar-translation approach
- Accuracy-focused, rule-based
- 7 cases, verb aspects, morphological analysis
- Focus: Grammatical structures, written competence

**When to use**: Creating Ukrainian grammar lessons, case practice, morphological/syntactic analysis

**Invoke**: Naturally reference when working on Ukrainian lesson content
```
"Створи урок на тему: Орудний відмінок іменників"
```

---

## Commands (6)

All commands available by typing `/` in Claude Code.

### `/test`
**Purpose**: Run comprehensive testing checklist
**Usage**: Before every PR, after implementing features
```
/test
```
Runs build check, security audit, manual verification of all features

---

### `/translate [text]`
**Purpose**: Add translations to src/translations.ts
**Usage**: When adding new UI strings or features
```
/translate "Save Lesson" button
```
Generates both English and Ukrainian translations following project patterns

---

### `/security-check [files]`
**Purpose**: Perform security audit on code
**Usage**: After handling user input, before commits
```
/security-check src/components/NewComponent.tsx
```
Checks for XSS vulnerabilities, input validation, URL handling

---

### `/add-exercise [type]`
**Purpose**: Scaffold a new exercise type
**Usage**: When adding new exercise functionality
```
/add-exercise "Pronunciation Practice"
```
Updates types, creates forms, implements student view, adds translations

---

### `/release [version]`
**Purpose**: Prepare and execute a release
**Usage**: When ready to deploy new version
```
/release 1.1.0
```
Updates version, CHANGELOG, creates tag, deploys, verifies

---

### `/review [files]`
**Purpose**: Code review with best practices
**Usage**: Before creating PR
```
/review src/components/ExerciseBuilder.tsx
```
Reviews TypeScript quality, React patterns, security, performance

---

## Teaching Methodologies

### Important: Languages Are Independent

**English (ESL)**:
- Taught IN English, using English
- Communicative approach (PPP/TTT)
- Focus on fluency and real-world use
- Student-centered activities

**Ukrainian**:
- Taught IN Ukrainian, using Ukrainian
- Grammar-translation approach
- Focus on accuracy and structural mastery
- Teacher-centered instruction

**These are NOT translation/bilingual skills** - each language has its own complete teaching methodology.

---

## Quick Reference

**Edit extensions**: Modify files in `claude_extensions/`
**Deploy**: `./start-claude.sh` (auto-deploys) or `./claude_extensions/deploy.sh`
**Check skills**: `ls .claude/skills/`
**Check commands**: `ls .claude/commands/` or type `/` in Claude Code

---

**Last Updated**: 2025-11-14
**Skills**: 2 (ESL Teaching, Ukrainian Teaching)
**Commands**: 6 (test, translate, security-check, add-exercise, release, review)
