# Prompt Engineering Integration Guide

## Overview
This guide explains how to integrate AI prompt engineering into the Vibe Lesson Builder to help teachers create better lessons faster.

---

## Why Prompt Engineering for Teachers?

### The Problem
Most teachers aren't prompt engineers. They need:
1. **Guidance** - Don't know how to phrase requests
2. **Templates** - Pre-built prompts for common tasks
3. **Iteration** - Easy refinement without starting over
4. **Control** - Adjust tone, difficulty, length
5. **Trust** - Understand what the AI is doing

### The Solution
**Scaffolded AI interaction** - from beginner-friendly wizards to advanced custom prompts.

---

## Three-Tier Approach

### Tier 1: One-Click Magic ✨ (For Beginners)
**No prompt writing required.**

**Example UI:**
```
┌─────────────────────────────────────────┐
│ What do you want to create?             │
│                                         │
│ [ Generate Complete Lesson ]           │
│ [ Generate Exercise Only ]             │
│ [ Get Content Suggestions ]            │
└─────────────────────────────────────────┘

After clicking "Generate Complete Lesson":

┌─────────────────────────────────────────┐
│ Quick Setup                             │
│                                         │
│ Topic: [Ordering Food in Restaurant  ]  │
│ Level: [B1 - Intermediate          ▼]  │
│                                         │
│ [ ✨ Generate Lesson ]                  │
└─────────────────────────────────────────┘
```

**Behind the scenes:**
```typescript
// System generates optimized prompt automatically
const prompt = `Create a ${level} ESL lesson about ${topic} following PPP methodology.
Include:
- Engaging lead-in activity
- Clear presentation of target language
- 3 controlled practice exercises
- 2 free practice exercises
Use real-world contexts and authentic language.`;
```

### Tier 2: Guided Builder 🧙‍♂️ (For Intermediate)
**Template-based with customization.**

**Example UI:**
```
┌─────────────────────────────────────────────────────┐
│ 📝 Lesson Prompt Builder                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Select Prompt Template:                            │
│ ○ Communicative Lesson (focus: speaking)           │
│ ● Grammar Lesson (focus: accuracy)                 │
│ ○ Vocabulary Lesson (focus: lexis)                 │
│ ○ Skills Integration (reading + discussion)        │
│                                                     │
│ ─────────────────────────────────────────────────  │
│                                                     │
│ Customize Template:                                │
│ Topic: [Present Perfect for Experiences        ]   │
│ Level: [B1                                     ▼]  │
│ Duration: [45 mins                             ▼]  │
│                                                     │
│ Advanced Options (▼)                                │
│   ☑ Include cultural context                       │
│   ☑ Use authentic materials                        │
│   ☐ Add pronunciation focus                        │
│   ☐ Include exam practice (IELTS/TOEFL)           │
│                                                     │
│ ─────────────────────────────────────────────────  │
│                                                     │
│ 👁️ Preview Prompt:                                  │
│ "You are an experienced ESL teacher. Create a      │
│  B1 grammar lesson about Present Perfect for       │
│  Experiences. Duration: 45 minutes. Follow PPP     │
│  methodology. Include cultural context and use     │
│  authentic materials from travel experiences..."   │
│                                                     │
│ [ Edit Prompt Manually ] [ 🚀 Generate ]           │
└─────────────────────────────────────────────────────┘
```

### Tier 3: Advanced Playground 🎨 (For Experts)
**Full control over prompts.**

**Example UI:**
```
┌─────────────────────────────────────────────────────┐
│ 🎨 Custom Prompt Editor                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│ System Prompt:                                      │
│ ┌─────────────────────────────────────────────────┐ │
│ │ You are a TESOL expert with 20 years experience│ │
│ │ teaching {{level}} learners. You specialize in │ │
│ │ {{methodology}} and creating engaging, student-│ │
│ │ centered lessons.                               │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ User Prompt:                                        │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Create a {{lesson_type}} lesson about {{topic}}│ │
│ │                                                 │ │
│ │ Requirements:                                   │ │
│ │ 1. Target students: {{age_group}} at {{level}} │ │
│ │ 2. Focus skills: {{skills}}                    │ │
│ │ 3. Include {{exercise_count}} varied exercises │ │
│ │ 4. Duration: {{duration}} minutes              │ │
│ │ 5. Use {{context}} for authentic examples      │ │
│ │                                                 │ │
│ │ Format the output as JSON matching this schema: │ │
│ │ {schema_placeholder}                            │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ Variables:                                          │
│ {{level}}: [B2] {{topic}}: [Climate Change]        │
│ {{methodology}}: [TBLT] {{duration}}: [60]          │
│                                                     │
│ Model Settings:                                     │
│ Temperature: [0.7     ═════════○───] Creative      │
│ Max Tokens:  [2000                              ]   │
│                                                     │
│ [ 💾 Save Template ] [ 🔄 Test ] [ 🚀 Generate ]   │
└─────────────────────────────────────────────────────┘
```

---

## Prompt Template Library

### Category 1: Complete Lessons

#### Template 1.1: Communicative Lesson
```
Create a communicative {{level}} ESL lesson about {{topic}}.

Context: {{context}} (e.g., "restaurant situations", "job interviews")

Structure:
1. Warm-up (5 mins): Get students talking about {{topic}}
2. Lead-in (10 mins): Present real-world scenario
3. Language Focus (10 mins): Teach functional language for {{topic}}
4. Controlled Practice (15 mins): Guided practice with support
5. Free Practice (15 mins): Role-play/discussion using target language
6. Wrap-up (5 mins): Reflection and homework

Requirements:
- Use authentic materials (real menus, job ads, etc.)
- Focus on fluency over accuracy
- Include pair/group work
- Provide scaffolding for weaker students
- Add extension for stronger students

Output as JSON matching Lesson schema.
```

**Variables:**
- `{{level}}`: A1, A2, B1, B2, C1, C2
- `{{topic}}`: Any lesson topic
- `{{context}}`: Real-world situation

#### Template 1.2: Grammar Lesson (PPP)
```
Create a {{level}} grammar lesson teaching {{grammar_point}}.

Methodology: PPP (Presentation, Practice, Production)

Presentation (15 mins):
- Contextualized introduction (short text/dialogue showing grammar in use)
- Concept checking questions
- Form explanation (structure/pattern)
- Use explanation (meaning/when we use it)
- Timeline/diagram if applicable

Controlled Practice (20 mins):
Create 3 exercises with increasing difficulty:
1. Gap-fill (form focus)
2. Sentence transformation
3. Error correction

Free Practice (20 mins):
Create 2 communicative activities:
1. Information gap or role-play
2. Personalization task (students use grammar to talk about themselves)

Common Mistakes:
Include a section on typical errors and how to correct them.

Output as JSON matching Lesson schema.
```

#### Template 1.3: Vocabulary Lesson (Lexical Approach)
```
Create a {{level}} vocabulary lesson on the lexical set: {{topic}}

Approach: Lexical (focus on chunks, collocations, fixed expressions)

Lead-in (5 mins):
- Brainstorm words related to {{topic}}
- Visual prompts (images/realia)

Presentation (15 mins):
Present 10-15 lexical chunks related to {{topic}}:
- Include collocations (strong/weak coffee, not powerful coffee)
- Fixed expressions ("It's on me", "split the bill")
- Phrasal verbs if relevant

Practice Activities (25 mins):
1. Matching exercise (collocations)
2. Gap-fill in context
3. Sorting/categorizing
4. Find the odd one out

Production (15 mins):
Communicative task using the vocabulary:
- Role-play scenario
- Discussion with prompts
- Story creation

Include:
- Example sentences in authentic contexts
- Common vs. formal variants
- Register awareness (formal/informal)

Output as JSON.
```

### Category 2: Exercise Generation

#### Template 2.1: Gap-Fill Generator
```
Create {{count}} gap-fill exercises for {{level}} students practicing {{target}}.

Requirements:
1. Each sentence should have ONE gap
2. Context should make the answer clear
3. Use realistic, natural English (not contrived)
4. Vary sentence length and complexity
5. Include context clues for self-correction
6. Provide answer key

Difficulty: {{difficulty}} (easy/medium/challenging)

Format:
- Sentences with gaps marked as [gap]
- Answers array in order
- Optional: Distractors for multiple-choice version

Example:
{
  "text": "I [gap] to Paris three times. It's a beautiful city!",
  "answer": "have been"
}

Output as JSON array of GapFillExercise objects.
```

#### Template 2.2: Discussion Questions Generator
```
Generate {{count}} discussion questions for {{level}} students on the topic: {{topic}}

Requirements:
1. Range of question types:
   - Personal experience (What about you?)
   - Opinion (Do you think...?)
   - Hypothetical (What would you do if...?)
   - Comparison (Which is better...?)
   - Prediction (Will ... in the future?)

2. Difficulty:
   - Level-appropriate vocabulary
   - Suitable grammar structures for {{level}}
   - Cultural sensitivity

3. Depth:
   - Surface-level questions for warm-up
   - Deeper questions for main discussion
   - Provocative questions for advanced students

4. Follow-up potential:
   Each question should lead to extended discussion

Format: List of questions with suggested follow-ups.
```

#### Template 2.3: Role-Play Scenario Generator
```
Create a role-play scenario for {{level}} students practicing {{function}}.

Function: {{function}} (e.g., "making complaints", "giving advice", "negotiating")

Scenario Requirements:
1. Realistic situation students might encounter
2. Clear roles (2-3 participants)
3. Information gap (each role has unique info)
4. Natural reason for communication
5. Cultural appropriateness

Provide:
1. Situation description (background)
2. Role cards (what each person knows/wants)
3. Useful language (functional phrases)
4. Success criteria (what should happen)
5. Variations (easier/harder versions)

Authenticity:
- Based on real-world contexts
- Include realistic constraints (time pressure, budget limits, etc.)
- Add emotions/motivations for more engaging role-play

Output as RolePlayExercise JSON object.
```

### Category 3: Content Enhancement

#### Template 3.1: Example Sentence Generator
```
Generate {{count}} example sentences using {{target}} in authentic contexts.

Target: {{target}} (vocabulary word, grammar structure, collocation)
Level: {{level}}
Context: {{context}} (optional: specific setting like "workplace", "travel")

Requirements:
1. Show word/structure in natural use
2. Provide context clues for meaning
3. Vary sentence types (statement, question, negative)
4. Include different tenses/forms if applicable
5. Use realistic scenarios
6. Avoid overly simple sentences (not "The cat is big")

Bonus:
- Include register variations (formal/informal)
- Show common collocations
- Highlight any false friends or common mistakes

Format: Array of example sentences with optional annotations.
```

#### Template 3.2: Authentic Material Adapter
```
I have this authentic text [paste text].

Adapt it for {{level}} students.

Tasks:
1. Simplify vocabulary (replace difficult words)
2. Shorten sentences if needed
3. Remove cultural references that need explanation
4. Maintain the essence and authenticity
5. Add glossary for 5-7 key words

Also create:
1. Pre-reading questions (3-4 to activate schema)
2. While-reading questions (comprehension)
3. Post-reading discussion questions
4. Vocabulary exercises using words from text

Keep the adapted text as authentic-feeling as possible.
```

---

## Smart Prompting Techniques

### Technique 1: Persona Setting
```
You are a [specific expert] with [credentials].
Your specialty is [domain].
You teach [audience] and focus on [approach].
```

**Example:**
```
You are a Cambridge-certified CELTA trainer with 15 years teaching multilingual adults.
Your specialty is business English and exam preparation.
You teach B2-C1 professionals and focus on task-based, learner-centered approaches.
```

### Technique 2: Constraint Specification
```
Must include: [requirements]
Must avoid: [restrictions]
Length: [specific]
Format: [structured output]
```

**Example:**
```
Must include: clear instructions, student examples, timing estimates
Must avoid: cultural stereotypes, overly complex vocab, grammar jargon
Length: 45-minute lesson
Format: JSON matching schema
```

### Technique 3: Few-Shot Examples
```
Here are 2 examples of good lessons:

Example 1: [paste example]
Example 2: [paste example]

Now create a similar lesson for {{new_topic}}.
```

### Technique 4: Chain-of-Thought
```
Before generating the lesson, first:
1. Analyze the target students (who are they? what do they need?)
2. Identify learning objectives (what should they be able to do?)
3. Choose appropriate activities (what tasks will help them learn?)
4. Consider sequencing (what order makes sense?)

Then generate the lesson.
```

### Technique 5: Iterative Refinement
```
1st prompt: "Create a B1 lesson about shopping"
Review output → needs more speaking

2nd prompt: "Add 2 more speaking activities focusing on negotiation"
Review output → too difficult vocab

3rd prompt: "Simplify vocabulary to B1 level, replace: [list words]"
Review output → perfect!
```

---

## Implementation Architecture

### Frontend Components

```typescript
// components/AIPromptBuilder.tsx
interface PromptBuilderProps {
  tier: 'beginner' | 'intermediate' | 'advanced';
  onGenerate: (prompt: string, settings: AISettings) => void;
}

interface AISettings {
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3';
  temperature: number; // 0-1
  maxTokens: number;
  outputFormat: 'json' | 'markdown' | 'text';
}
```

### Backend API

```typescript
// api/ai/generate.ts
export async function POST(request: Request) {
  const { prompt, settings, userTier } = await request.json();

  // Rate limiting based on tier
  if (userTier === 'free' && exceededFreeLimit(userId)) {
    return new Response('Upgrade to Pro for unlimited generation', { status: 429 });
  }

  // Call OpenAI/Anthropic
  const completion = await openai.chat.completions.create({
    model: settings.model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ],
    temperature: settings.temperature,
    max_tokens: settings.maxTokens,
    response_format: { type: 'json_object' }
  });

  // Parse and validate against schema
  const lesson = JSON.parse(completion.choices[0].message.content);
  const validated = LessonSchema.parse(lesson);

  return Response.json({ lesson: validated });
}
```

### Prompt Template Storage

```typescript
// data/promptTemplates.ts
export const PROMPT_TEMPLATES = {
  lessonGeneration: {
    communicative: {
      name: "Communicative Lesson",
      description: "Focus on speaking and real-world communication",
      systemPrompt: "You are an expert in communicative language teaching...",
      userPromptTemplate: "Create a {{level}} lesson about {{topic}}...",
      variables: ['level', 'topic', 'context', 'duration'],
      category: 'lesson',
      difficulty: 'beginner'
    },
    // ... more templates
  },
  exerciseGeneration: {
    // ... exercise templates
  },
  contentEnhancement: {
    // ... content templates
  }
};
```

---

## User Experience Flow

### Flow 1: Beginner (One-Click)
```
1. User clicks "✨ Generate Lesson"
2. Simple form appears (topic + level only)
3. Click "Generate"
4. Loading animation (15-30 seconds)
5. Lesson preview appears
6. User can:
   - Accept → Save to library
   - Regenerate → Try again with same params
   - Edit → Manual adjustments
   - Cancel → Discard
```

### Flow 2: Intermediate (Template Builder)
```
1. User clicks "🧙‍♂️ Build Custom Prompt"
2. Choose template category
3. Select specific template
4. Fill in variables (topic, level, etc.)
5. Toggle advanced options
6. Preview generated prompt
7. [Optional] Edit prompt manually
8. Generate
9. Review + refine
```

### Flow 3: Advanced (Playground)
```
1. User opens "🎨 Prompt Playground"
2. Write/paste custom system prompt
3. Write user prompt with {{variables}}
4. Define variables
5. Adjust model settings (temp, tokens)
6. Test prompt with preview
7. Save as template for reuse
8. Generate
9. Compare multiple outputs (A/B test)
```

---

## Best Practices for Teachers

### Do's ✅
1. **Be specific:** "Create a B1 lesson about ordering food in a restaurant" > "Make a food lesson"
2. **Provide context:** Include student age, L1, cultural background
3. **Set constraints:** "Use only vocabulary from unit 1-5"
4. **Iterate:** Start simple, refine based on output
5. **Combine AI + human:** AI generates draft, teacher refines
6. **Save good prompts:** Build your library over time

### Don'ts ❌
1. **Don't blindly accept:** Always review AI output
2. **Don't overload:** One prompt = one task, not "create 10 lessons"
3. **Don't ignore context:** "Create exercises" → What kind? For whom?
4. **Don't forget objectives:** AI doesn't know your learning goals
5. **Don't rely 100% on AI:** Teacher expertise is irreplaceable
6. **Don't share student data:** Never include student names/personal info in prompts

---

## Measuring Success

### Metrics to Track

**Engagement:**
- % of users who try AI features
- Average prompts per user per week
- Refinement iterations (how many times users regenerate)

**Quality:**
- Teacher satisfaction (1-5 stars)
- Acceptance rate (% of AI outputs used without editing)
- Time saved (before/after comparison)

**Usage Patterns:**
- Most popular templates
- Common prompt patterns
- Failure cases (when AI output is rejected)

**Learning Curve:**
- Time from first use to creating custom prompts
- % of users graduating from Tier 1 → 2 → 3

---

## Future Enhancements

### Phase 2: Conversational AI
Instead of one-shot generation, have a conversation:

```
AI: "I'll help you create a lesson about travel. What level are your students?"
Teacher: "B1"
AI: "Great! What specific travel topic? Airport procedures, booking hotels, or something else?"
Teacher: "Booking hotels"
AI: "Perfect. How long is your lesson? 45 or 60 minutes?"
Teacher: "45"
AI: "Would you like me to focus more on phone conversations or face-to-face interactions?"
Teacher: "Phone"
AI: "Understood. Generating a 45-minute B1 lesson on booking hotels by phone..."
```

### Phase 3: Learning from Feedback
```typescript
// After each generation:
interface Feedback {
  accepted: boolean;
  rating: 1-5;
  whatWorked: string[];
  whatDidntWork: string[];
  edits: Edit[]; // Track what teacher changed
}

// Use feedback to improve future prompts
// Example: If 80% of teachers remove vocab glossary, stop including it
```

### Phase 4: Collaborative Prompts
```
Teacher A creates great prompt → Shares with community
Other teachers rate/review → Popular prompts rise
Categories: Most used, Highest rated, Trending
```

---

## Conclusion

Prompt engineering integration isn't just about adding AI - it's about empowering teachers with different levels of AI literacy to create better lessons faster.

**The key: Scaffolding.**

Beginners get magic buttons.
Intermediates get templates.
Experts get full control.

Everyone benefits.

---

**Questions? Ideas?**
Add them to the GitHub Issues or contact the development team.

**Last Updated:** 2025-11-14
