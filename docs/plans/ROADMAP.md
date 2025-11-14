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

## **v1.1.1 - HOTFIX** ✅ COMPLETE
**Fix navigation pain points IMMEDIATELY**

### Issues Fixed:
1. ✅ Add "Edit" buttons to every section in preview
2. ✅ Allow jumping to any step from anywhere
3. ✅ Add "Back" and "Skip" buttons to all steps
4. ✅ Reduce required fields (make 80% optional)
5. ✅ Auto-save progress every 30 seconds
6. ✅ Add progress indicator that's clickable (jump to any step)

---

## **v1.1.2 - Automated UI/UX Audit** (NOW - 2-3 days)
**Establish baseline, identify quick wins**

### Goal:
Run automated audits to identify current UX issues before building new features.

### Automated Tools to Use:

#### 1. **Lighthouse Audit** (Chrome DevTools)
```bash
# Run in production build
npm run build
npm run preview

# Open Chrome DevTools → Lighthouse
# Run audit for:
- Performance
- Accessibility
- Best Practices
- SEO
```

**Target Scores:**
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >80

#### 2. **axe DevTools** (Accessibility)
- Install browser extension
- Check for WCAG 2.1 AA compliance
- Identify color contrast issues
- Verify ARIA labels
- Check keyboard navigation

#### 3. **Responsive Design Testing**
Test on multiple viewports:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

Check for:
- Touch target sizes (min 44x44px)
- Readable font sizes
- Proper spacing
- No horizontal scroll

#### 4. **Bundle Size Analysis**
```bash
npm run build -- --mode production

# Analyze bundle
npx vite-bundle-visualizer
```

**Target:**
- Total bundle < 500KB
- Individual chunks < 200KB
- No unused dependencies

#### 5. **Performance Profiling**
- React DevTools Profiler
- Identify slow components
- Check for unnecessary re-renders
- Measure interaction latency

### Deliverables:
- [ ] Lighthouse report (PDF)
- [ ] Accessibility audit results
- [ ] Responsive design screenshots
- [ ] Bundle size analysis
- [ ] Performance profiling data
- [ ] **Priority list of issues to fix**
- [ ] Document in `docs/review/UIUX_AUDIT_V1.md`

**Estimated Time:** 2-3 days
**Output:** Baseline metrics + priority fixes for v1.2.2

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

#### 4. Spinning Wheel Activity
New exercise type inspired by Wordwall

#### 5. Drag-and-Drop Exercise Builder
For matching, sorting, ordering

#### 6. One-Click Activity Conversion
Convert between exercise types automatically

**Estimated Time:** 2 weeks

---

## **v1.2.1 - Interactive Student View** (Week 4-5 - 1.5 weeks)
**"Students can DO the exercises, teachers can TEST their lessons"**

### Core Features:

#### 1. Test Mode for Teachers
```
[👁️ Preview Lesson] → [🎮 Test as Student]
```

#### 2. Interactive Exercise Types
- Gap Fill (type answers, instant feedback)
- Multiple Choice (click to select)
- Matching (drag & drop)
- Sorting (drag into categories)
- Sentence Scramble (reorder words)
- Spinning Wheel (click to spin)

#### 3. Progress Tracking
```
Exercise 1/10: ✓ Completed (90%)
Exercise 2/10: ✓ Completed (100%)
Exercise 3/10: ⏳ In Progress
Exercise 4/10: ⬜ Not Started

Overall: 2/10 complete (20%)
```

#### 4. Auto-Grading
- Objective exercises: Instant feedback
- Subjective exercises: Teacher review
- Score display with visual feedback

**Estimated Time:** 1.5 weeks

---

## **v1.2.2 - UI/UX Review & Fixes** (Week 6 - 1 week)
**Critical checkpoint after major UI changes**

### Goal:
Review Wordwall-style builder and interactive student view before proceeding.

### Review Process:

#### 1. **Automated Re-audit**
- Run Lighthouse again
- Compare to v1.1.2 baseline
- Identify regressions

#### 2. **Manual Testing**
- Test with 2-3 real teachers
- Observe them using new features
- Collect feedback forms
- Record pain points

#### 3. **Usability Issues**
Check for:
- Confusing navigation
- Unclear instructions
- Missing feedback
- Slow interactions
- Broken responsive design
- Accessibility issues

#### 4. **Cross-Language Testing**
- Test all new features in English
- Test all new features in Ukrainian
- Verify translations are correct
- Check text overflow issues

#### 5. **Quick Fixes**
Priority fixes (must do):
- P0: Broken functionality
- P1: Major UX issues
- P2: Visual polish

Nice-to-have fixes (defer to v1.6.0):
- P3: Minor improvements
- P4: Future enhancements

### Deliverables:
- [ ] Automated audit report (compare to baseline)
- [ ] Teacher feedback summary (3+ teachers)
- [ ] List of P0/P1 issues fixed
- [ ] List of P2/P3/P4 deferred to v1.6.0
- [ ] Updated screenshots
- [ ] Document in `docs/review/UIUX_REVIEW_V1_2_2.md`

**Estimated Time:** 1 week
**Testing:** 3+ teachers test for 2-3 days, 2 days for fixes

---

## **v1.3.0 - Ukrainian All Structures** (Week 7 - 1 week)
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

**Why this comes before v1.4.0:** Need all 4 structures enabled BEFORE creating templates for all structures!

---

## **v1.4.0 - Lesson Templates Library** (Week 8-9 - 2 weeks)
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
- **PPP Templates** (10 lessons) ← NOW POSSIBLE because v1.3.0 enabled it!
  - Відмінки іменників - Орудний (6 клас)
  - Дієслова доконаного/недоконаного виду (7 клас)
  - Прикметник - Ступені порівняння (6 клас)
  - *...7 more*

- **TTT Templates** (5 lessons) ← NOW POSSIBLE because v1.3.0 enabled it!
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
**Teachers can save their own lessons as templates**

### Creating the Templates

**How we'll create 65 templates:**
1. **You** provide the curriculum topics (what teachers teach)
2. **I (Claude)** generate complete lesson content
3. **You** review and approve each one
4. **We iterate** until templates are perfect
5. **I implement** them in the app

**Estimated time per template:** 15-20 minutes (with my help)
**Total creation time:** ~20 hours spread over 2 weeks

**Estimated Time:** 2 weeks (1 week creating content with you, 1 week implementing)
**Deliverables:**
- 65 complete lesson templates (20 PPP English, 10 TTT English, 35 Ukrainian all structures)
- Template browser with search/filter
- One-click template loading
- Custom template creation tool

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
- Add context images
- Upload or search

**Presentation:**
- Example images
- Diagram/visual aids

**Exercises:**
- Gap Fill: Context images
- Matching: Match words to images
- Multiple Choice: Image-based questions
- Flashcards: Image on one side
- Role-play: Scenario images
- Information Gap: Different images for A/B

#### 3. Image Library Integration
- Unsplash API (Free tier: 50 requests/hour)
- Search by keyword
- Auto-attribution

#### 4. Image Storage
- Small images (<200KB): Base64 in JSON
- Large images (>200KB): CDN (Cloudinary free tier)

#### 5. Image Editor (Simple)
- Crop
- Resize
- Rotate
- Brightness

**Estimated Time:** 2-3 weeks
**Deliverables:**
- Image upload to all forms
- Unsplash integration
- Image storage solution
- Simple image editor
- Image-based exercise types

---

## **v1.6.0 - UI/UX Review & Improvements** (Week 13 - 1 week)
**Final review before production polish**

### Goal:
Comprehensive review of ALL features before final v2.0.0 polish.

### Review Process:

#### 1. **Full Automated Audit**
- Lighthouse (all pages)
- Accessibility (WCAG 2.1 AA)
- Performance profiling
- Bundle size check
- Responsive design test

#### 2. **Teacher User Testing**
- 5+ teachers test complete workflow
- Build lesson from scratch
- Use templates
- Add images
- Test interactive mode
- Export/print

#### 3. **Student User Testing**
- 10+ students complete lessons
- Test all exercise types
- Check on different devices
- Measure engagement

#### 4. **Cross-Browser Testing**
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

#### 5. **Comprehensive Fix List**
Priority fixes:
- P0/P1: Must fix before v2.0.0
- P2: Should fix before v2.0.0
- P3/P4: Nice to have (post-v2.0.0)

### Deliverables:
- [ ] Full audit report (all metrics)
- [ ] Teacher testing summary (5+ teachers)
- [ ] Student testing summary (10+ students)
- [ ] Cross-browser compatibility report
- [ ] **All P0/P1 issues fixed**
- [ ] P2 issues prioritized for v2.0.0
- [ ] Document in `docs/review/UIUX_REVIEW_V1_6_0.md`

**Estimated Time:** 1 week
**Testing:** 3 days user testing, 2 days fixes

---

## **v2.0.0 - Polish & Professional Features** (Week 14-17 - 4 weeks)

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
| **v1.1.1** | Navigation fixes ✅ | 2-3 days | Week 1 |
| **v1.1.2** | Automated UI/UX audit | 2-3 days | Week 1 |
| **v1.2.0** | Wordwall-style builder | 2 weeks | Week 2-3 |
| **v1.2.1** | Interactive student view | 1.5 weeks | Week 4-5 |
| **v1.2.2** | UI/UX review & fixes | 1 week | Week 6 |
| **v1.3.0** | Ukrainian all structures | 1 week | Week 7 |
| **v1.4.0** | Lesson templates (65) | 2 weeks | Week 8-9 |
| **v1.5.0** | Images everywhere | 2-3 weeks | Week 10-12 |
| **v1.6.0** | UI/UX review & improvements | 1 week | Week 13 |
| **v2.0.0** | Polish & production | 4 weeks | Week 14-17 |

**Total: ~17 weeks (4.5 months) to production**

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

### UI/UX Metrics (Tracked across versions):
- **Lighthouse Performance:** >90
- **Lighthouse Accessibility:** >90
- **WCAG 2.1 AA Compliance:** 100%
- **Bundle Size:** <500KB
- **Interaction Latency:** <100ms

---

## 💰 Cost Analysis (Free/Low-Cost)

| Service | Free Tier | Our Usage | Cost |
|---------|-----------|-----------|------|
| **Unsplash API** | 50 req/hour | Image search | $0 |
| **Cloudinary** | 25GB storage, 25GB bandwidth | Image CDN | $0 |
| **GitHub Pages** | Unlimited | Hosting | $0 |
| **Firebase** | 10k users, 1GB storage | Future backend | $0 |
| **Lighthouse CI** | Free | Automated audits | $0 |
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
2. ✅ Swap v1.3.0 and v1.4.0 (Ukrainian structures before templates)
3. ✅ Add UI/UX review checkpoints (v1.1.2, v1.2.2, v1.6.0)
4. ▶️ **Start v1.1.2 - Automated UI/UX Audit**

### Week 1:
- Complete v1.1.2 automated audit
- Establish baseline metrics
- Identify priority issues

### Weeks 2-6:
- v1.2.0: Wordwall-style builder
- v1.2.1: Interactive student view
- v1.2.2: UI/UX review & fixes
- Test with real teachers

### Weeks 7-12:
- v1.3.0: Ukrainian all structures
- v1.4.0: Create 65 lesson templates together
- v1.5.0: Images everywhere

### Weeks 13-17:
- v1.6.0: Final UI/UX review
- v2.0.0: Polish and launch! 🚀

---

## ❓ Questions for You

1. ✅ **Order confirmed** - Ukrainian structures (v1.3.0) before templates (v1.4.0)?
2. ✅ **UI/UX checkpoints** - After v1.2.1 and before v2.0.0?
3. **Template Topics** - What are the most common lessons Ukrainian teachers teach?
4. **Testing** - Do you have teachers who can test each version?
5. **Wordwall Features** - Which specific Wordwall features are most important?
   - Spinning wheel? ✅
   - Sentence tokenizer? ✅
   - Drag-and-drop? ✅
   - One-click conversion? ✅
   - Others?

---

**Ready to start v1.1.2 - Automated UI/UX Audit?** 🚀

This will give us a baseline and identify quick wins before we start building new features.
