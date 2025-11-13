# Testing Plan for v1.0 Release

**Date:** 2025-11-13
**Version:** 1.0.0
**Status:** Ready for Manual Testing

## Testing Overview

This document outlines the comprehensive testing plan for the English Lesson Builder v1.0 release. All automated checks have passed. Manual testing is required for the interactive features.

## ✅ Automated Tests Completed

### Build & TypeScript
- ✅ Production build successful (no errors)
- ✅ All TypeScript type checks passed
- ✅ No build warnings
- ✅ Bundle size: 413.12 kB (117.96 kB gzipped)

### Security
- ✅ Comprehensive security audit completed
- ✅ Zero dependency vulnerabilities (`npm audit`)
- ✅ XSS prevention verified
- ✅ CSP headers configured
- ✅ Input validation implemented

### Code Quality
- ✅ All 11 exercise types implemented
- ✅ Bilingual support (English/Ukrainian)
- ✅ 14 sample lessons (7 English + 7 Ukrainian)
- ✅ All components properly typed

## 📋 Manual Testing Required

### 1. Exercise Types Testing (Student Mode)

**Objective:** Verify all 11 exercise types render and function correctly in student mode.

#### Test Setup
1. Run development server: `npm run dev`
2. Select language (test both English and Ukrainian)
3. Click "Sample Lessons"
4. Load lesson and switch to Student Mode

#### Exercise Type Coverage in Sample Lessons

**English Sample Lessons contain:**
- ✅ Gap-Fill
- ✅ Sorting
- ✅ Matching
- ✅ Free-Text
- ✅ Multiple-Choice
- ✅ Sentence-Scramble
- ✅ Information-Gap
- ✅ Role-Play
- ✅ Collocation
- ✅ Lexical-Set
- ⚠️ True-False (not in English samples - test with Ukrainian)

**Ukrainian Sample Lessons contain:**
- ✅ Gap-Fill
- ✅ Sorting
- ✅ Matching
- ✅ Free-Text
- ✅ Multiple-Choice
- ✅ Sentence-Scramble
- ✅ True-False

**All 11 types are covered** across both language sample sets.

#### Testing Checklist for Each Exercise Type

For each exercise type, verify:

**1. Gap-Fill Exercise**
- [ ] Instructions display correctly
- [ ] Input fields appear for each gap (____) in text
- [ ] Can type answers in input fields
- [ ] Submit button enables when fields are filled
- [ ] Correct answers show green highlighting
- [ ] Incorrect answers show red highlighting
- [ ] Score calculates correctly
- [ ] "Correct answers" section shows after submission
- [ ] "Try Again" button resets the exercise
- [ ] Works in both English and Ukrainian

**2. Multiple-Choice Exercise**
- [ ] Question displays correctly
- [ ] All options are visible and selectable
- [ ] Can select only one option (radio behavior)
- [ ] Submit button enables when option selected
- [ ] Correct answer shows green after submission
- [ ] Incorrect selection shows red
- [ ] Check mark (✓) appears on correct answer
- [ ] Score shows 100% or 0%
- [ ] Try Again resets selection
- [ ] Works in both languages

**3. True/False Exercise**
- [ ] Statement displays clearly
- [ ] Two buttons: "True" and "False" (or "Правда"/"Неправда")
- [ ] Can select one option
- [ ] Selected option highlights
- [ ] Submit button enables after selection
- [ ] Correct answer highlighted green
- [ ] Incorrect answer highlighted red
- [ ] Check mark shows on correct answer
- [ ] Try Again resets
- [ ] Works in both languages

**4. Matching Exercise**
- [ ] Instructions display
- [ ] All pairs displayed in rows
- [ ] Left item → Right item format clear
- [ ] Arrow (→) visible between items
- [ ] Marks as completed when submitted
- [ ] Self-check format (no auto-grading)
- [ ] Works in both languages

**5. Sorting Exercise**
- [ ] Instructions display
- [ ] All items listed with numbers
- [ ] Items display in order
- [ ] Marks as completed when submitted
- [ ] Self-check format
- [ ] Works in both languages

**6. Sentence-Scramble Exercise**
- [ ] Scrambled words display as buttons
- [ ] Clicking word moves it to end (reordering)
- [ ] "Your sentence" updates in real-time
- [ ] Submit button works
- [ ] Correct sentence displays after submission
- [ ] Comparison works correctly
- [ ] Try Again resets word order
- [ ] Works in both languages

**7. Free-Text Exercise**
- [ ] Prompt displays clearly
- [ ] Textarea is large enough (8 rows)
- [ ] Can type freely in textarea
- [ ] Word count displays if minWords set
- [ ] Submit enables when text entered
- [ ] Marks as completed (100%) when submitted
- [ ] No auto-grading (self-check)
- [ ] Works in both languages

**8. Information-Gap Exercise**
- [ ] Scenario description displays
- [ ] Student A information card visible
- [ ] Student B information card visible
- [ ] Both cards clearly separated
- [ ] "Useful questions" section shows if available
- [ ] Target language displays if provided
- [ ] Prompts list correctly
- [ ] Submit marks as completed
- [ ] Works in both languages

**9. Role-Play Exercise**
- [ ] Scenario description displays
- [ ] All roles display as cards
- [ ] Role name and description clear
- [ ] Duration displays if set (⏱️ icon)
- [ ] Target language shows if provided
- [ ] Submit marks as completed
- [ ] Works in both languages

**10. Collocation Exercise**
- [ ] Instructions display
- [ ] Each collocation shows main word + partners
- [ ] Format: "word: partner1, partner2, ..."
- [ ] All collocations visible
- [ ] Exercise format note displays if set
- [ ] Submit marks as completed
- [ ] Works in both languages

**11. Lexical-Set Exercise**
- [ ] Topic/theme displays prominently
- [ ] Context shows if provided (in italics)
- [ ] All chunks/phrases listed with bullets
- [ ] Clear, readable layout
- [ ] Submit marks as completed
- [ ] Works in both languages

#### Progress Tracking
- [ ] Exercise completion badge (✓) shows
- [ ] Attempts counter increments
- [ ] Progress saves to localStorage
- [ ] Progress persists on page reload
- [ ] Multiple attempts tracked correctly

### 2. Import/Export Testing

**Objective:** Verify import/export works with all 14 sample lessons.

#### Test Each Sample Lesson (7 English + 7 Ukrainian)

**English Samples:**
1. [ ] "Present Perfect - Life Experiences" - Export → Re-import → Verify
2. [ ] "Used To - Past Habits and States" - Export → Re-import → Verify
3. [ ] "Phrasal Verbs - Business Communication" - Export → Re-import → Verify
4. [ ] "Conditionals - Real and Hypothetical Situations" - Export → Re-import → Verify
5. [ ] "Relative Clauses - Describing People and Things" - Export → Re-import → Verify
6. [ ] "Passive Voice - Formal Writing" - Export → Re-import → Verify
7. [ ] "Reported Speech - Communication Strategies" - Export → Re-import → Verify

**Ukrainian Samples:**
1. [ ] "Минулий доконаний час (Past Perfect)" - Export → Re-import → Verify
2. [ ] "Наказовий спосіб (Imperative)" - Export → Re-import → Verify
3. [ ] "Орудний відмінок іменників" - Export → Re-import → Verify
4. [ ] "Числівники та вимова чисел" - Export → Re-import → Verify
5. [ ] "Дієприкметники та дієприслівники" - Export → Re-import → Verify
6. [ ] "Складнопідрядні речення з часовими сполучниками" - Export → Re-import → Verify
7. [ ] "Давальний відмінок іменників" - Export → Re-import → Verify

#### For Each Import/Export Test:
- [ ] Load lesson from samples
- [ ] Click "Export to JSON" button
- [ ] File downloads with correct name format
- [ ] Open JSON file - verify structure is valid
- [ ] Create new lesson
- [ ] Import the exported JSON file
- [ ] Verify all fields match original:
  - [ ] Title
  - [ ] Level
  - [ ] Target Language
  - [ ] Duration
  - [ ] Objectives
  - [ ] Materials
  - [ ] Lead-In content
  - [ ] Presentation content
  - [ ] All exercises (count and content)
  - [ ] Teacher notes
- [ ] Switch to Student Mode - verify it works

### 3. Console Error Checking

**Objective:** Ensure no errors or warnings in browser console.

#### Development Mode (`npm run dev`)
- [ ] Start dev server
- [ ] Open browser DevTools (F12)
- [ ] Check Console tab - no errors
- [ ] Select English language - no errors
- [ ] Select Ukrainian language - no errors
- [ ] Load sample lesson - no errors
- [ ] Switch to Student Mode - no errors
- [ ] Complete an exercise - no errors
- [ ] Export lesson - no errors
- [ ] Import lesson - no errors
- [ ] Use keyboard shortcuts - no errors
- [ ] Open "My Lessons" modal - no errors
- [ ] Search saved lessons - no errors
- [ ] Duplicate a lesson - no errors
- [ ] Delete a lesson - no errors

#### Production Build (`npm run build && npm run preview`)
- [ ] Build for production
- [ ] Run preview server
- [ ] Repeat all console checks above
- [ ] Verify no warnings about missing source maps
- [ ] Check Network tab - all assets load correctly
- [ ] Verify bundle size is reasonable

### 4. Keyboard Shortcuts Testing

**Objective:** Verify all 8 keyboard shortcuts work correctly.

- [ ] **Ctrl+S** (⌘+S on Mac): Saves current lesson
- [ ] **Ctrl+N** (⌘+N): Creates new lesson (with confirmation if unsaved)
- [ ] **Ctrl+L** (⌘+L): Opens "My Lessons" modal
- [ ] **Ctrl+K** (⌘+K): Opens "Sample Lessons" modal
- [ ] **Ctrl+E** (⌘+E): Exports lesson (only in preview mode)
- [ ] **Ctrl+P** (⌘+P): Prints lesson (only in preview mode)
- [ ] **Ctrl+/** (⌘+/): Shows keyboard shortcuts help modal
- [ ] **Escape**: Closes any open modal

**Additional Checks:**
- [ ] Shortcuts help modal displays correctly
- [ ] Platform detection works (⌘ on Mac, Ctrl elsewhere)
- [ ] Shortcuts disabled in Student Mode
- [ ] Shortcuts indicator visible in footer
- [ ] Help modal accessible via footer button

### 5. Saved Lessons Library Testing

**Objective:** Verify lesson management features work correctly.

- [ ] Create and save a new lesson
- [ ] Open "My Lessons" (Ctrl+L or header button)
- [ ] Lesson appears in library
- [ ] Lesson card shows:
  - [ ] Title
  - [ ] Level badge
  - [ ] Target language (🌍)
  - [ ] Duration (⏱️)
  - [ ] Exercise count (📝)
  - [ ] Created date (📅)
- [ ] **Search functionality:**
  - [ ] Search by title
  - [ ] Search by level
  - [ ] Search by target language
  - [ ] Search clears with empty input
  - [ ] "No results" message shows correctly
- [ ] **Load button:** Loads lesson into editor
- [ ] **Duplicate button:** Creates copy with "(Copy)" suffix
- [ ] **Export button:** Downloads JSON file
- [ ] **Delete button:**
  - [ ] Shows confirmation dialog
  - [ ] Deletes lesson on confirm
  - [ ] Cancels on dismiss
- [ ] Empty state shows when no lessons saved
- [ ] Modal closes on "Close" button
- [ ] Modal closes on outside click
- [ ] Modal closes on Escape key

### 6. Cross-Browser Testing

**Objective:** Ensure compatibility across major browsers.

Test in the following browsers:
- [ ] **Chrome/Chromium** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest - Mac only)
- [ ] **Edge** (latest)

For each browser, verify:
- [ ] Application loads without errors
- [ ] All UI elements render correctly
- [ ] All interactive features work
- [ ] Keyboard shortcuts work (platform-appropriate)
- [ ] Import/Export works
- [ ] localStorage persists
- [ ] No console errors

### 7. Responsive Design Testing

**Objective:** Verify UI works on different screen sizes.

Test at these viewport sizes:
- [ ] **Desktop** (1920×1080)
- [ ] **Laptop** (1366×768)
- [ ] **Tablet** (768×1024)
- [ ] **Mobile** (375×667)

Check that:
- [ ] All content is visible
- [ ] No horizontal scrolling (except tables if necessary)
- [ ] Buttons are clickable
- [ ] Modals fit on screen
- [ ] Text is readable
- [ ] Forms are usable

## 🐛 Bug Reporting Template

If issues are found during testing, report using this template:

```markdown
### Bug Report

**Exercise Type / Feature:** [e.g., Gap-Fill Exercise]
**Severity:** [Critical / High / Medium / Low]
**Browser:** [Chrome 120 / Firefox 121 / etc.]
**Language:** [English / Ukrainian]

**Steps to Reproduce:**
1.
2.
3.

**Expected Behavior:**


**Actual Behavior:**


**Screenshots:** (if applicable)

**Console Errors:** (if any)
```

## ✅ Sign-Off Checklist

Before approving v1.0 for release:

- [ ] All 11 exercise types tested in student mode
- [ ] All 14 sample lessons can be imported/exported
- [ ] No console errors in development mode
- [ ] No console errors in production build
- [ ] All 8 keyboard shortcuts work
- [ ] Saved lessons library fully functional
- [ ] Tested in at least 2 browsers
- [ ] Tested on at least 2 screen sizes
- [ ] Security audit reviewed and approved
- [ ] Documentation updated (README, CHANGELOG)
- [ ] package.json version updated to 1.0.0

## 📝 Notes

- Testing should be performed by at least 2 people
- Teachers should test with real lesson content
- Students should test in Student Mode
- Report all bugs, even minor ones
- Take screenshots of any visual issues
- Document any suggestions for v2.0

---

**Testing Started:** __________
**Testing Completed:** __________
**Tested By:** __________
**Approved By:** __________
