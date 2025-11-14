export type LessonStructure = 'PPP' | 'TTT' | 'GPPC' | 'CEFR';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface BilingualText {
  uk: string;
  en: string;
}

export type ExerciseType = 'gap-fill' | 'sorting' | 'matching' | 'free-text' | 'multiple-choice' | 'true-false' | 'sentence-scramble' | 'information-gap' | 'role-play' | 'collocation' | 'lexical-set' | 'ordering';

export interface GapFillExercise {
  type: 'gap-fill';
  id: string;
  instruction: string;
  text: string; // Text with [gaps] marked by brackets
  answers: string[];
}

export interface SortingExercise {
  type: 'sorting';
  id: string;
  instruction: string;
  items: string[];
  correctOrder?: number[]; // Optional: indices in correct order
}

export interface MatchingExercise {
  type: 'matching';
  id: string;
  instruction: string;
  pairs: Array<{ left: string; right: string }>;
}

export interface FreeTextExercise {
  type: 'free-text';
  id: string;
  instruction: string;
  prompt: string;
  minWords?: number; // Optional: minimum word count
}

export interface MultipleChoiceExercise {
  type: 'multiple-choice';
  id: string;
  instruction: string;
  question: string;
  options: string[];
  correctAnswer?: number; // Optional: index of correct answer
}

export interface TrueFalseExercise {
  type: 'true-false';
  id: string;
  instruction: string;
  statement: string;
  correctAnswer?: boolean; // Optional: true or false
}

export interface SentenceScrambleExercise {
  type: 'sentence-scramble';
  id: string;
  instruction: string;
  words: string[]; // Words in scrambled order
  correctSentence?: string; // Optional: correct sentence for reference
}

export interface InformationGapExercise {
  type: 'information-gap';
  id: string;
  instruction: string;
  scenario: string; // Description of the communicative task
  studentAInfo: string; // Information for Student A
  studentBInfo: string; // Information for Student B
  prompts?: string[]; // Optional: suggested questions/prompts for students
  targetLanguage?: string; // Optional: target phrases/structures to use
}

export interface RolePlayExercise {
  type: 'role-play';
  id: string;
  instruction: string;
  scenario: string; // Situation description
  roles: Array<{ name: string; description: string }>; // Role descriptions
  targetLanguage?: string; // Optional: target phrases/structures
  duration?: number; // Suggested duration in minutes
}

export interface CollocationExercise {
  type: 'collocation';
  id: string;
  instruction: string;
  collocations: Array<{ word: string; partners: string[] }>; // e.g., "make" -> ["a decision", "a mistake", "progress"]
  exerciseFormat?: 'match' | 'fill' | 'choose'; // How to present the exercise
}

export interface LexicalSetExercise {
  type: 'lexical-set';
  id: string;
  instruction: string;
  topic: string; // Topic or theme (e.g., "Travel", "Business")
  chunks: string[]; // Fixed expressions, collocations, phrases
  context?: string; // Optional: context or example situation
}

export interface OrderingExercise {
  type: 'ordering';
  id: string;
  instruction: string;
  items: string[]; // Items to be ordered (displayed in scrambled order)
  correctOrder?: number[]; // Optional: indices representing correct order
  context?: string; // Optional: context or scenario
}

export type Exercise =
  | GapFillExercise
  | SortingExercise
  | MatchingExercise
  | FreeTextExercise
  | MultipleChoiceExercise
  | TrueFalseExercise
  | SentenceScrambleExercise
  | InformationGapExercise
  | RolePlayExercise
  | CollocationExercise
  | LexicalSetExercise
  | OrderingExercise;

export interface LeadIn {
  title: string;
  description: string;
  content: string;
  duration?: number; // Duration in minutes
  mediaLinks?: string[]; // YouTube or external links
  teacherNotes?: string; // Private notes for teacher
}

export interface Presentation {
  title: string;
  targetLanguage: string;
  examples: string[];
  explanation: string | BilingualText; // Can be string (English) or BilingualText (Ukrainian)
  duration?: number; // Duration in minutes
  mediaLinks?: string[]; // YouTube or external links
  teacherNotes?: string; // Private notes for teacher
}

export interface PracticeSection {
  type: 'controlled' | 'free';
  exercises: Exercise[];
}

export interface Lesson {
  id: string;
  title: string;
  structure: LessonStructure;
  version?: 'v1'; // Version flag for backward compatibility
  level?: string; // e.g., "A1 Beginner", "B2 Upper-Intermediate"
  cefrLevel?: CEFRLevel; // CEFR level tag (A1-C1)
  targetLanguage?: string; // Target language being taught (e.g., "English", "Spanish")
  duration?: number; // Total lesson duration in minutes
  objectives?: string[]; // Learning objectives
  materials?: string[]; // Required materials
  leadIn: LeadIn;
  presentation: Presentation;
  controlledPractice: PracticeSection;
  freePractice: PracticeSection;
  teacherNotes?: string; // Overall lesson notes for teacher
  createdAt: string;
}

// ============================================================================
// ACTIVITY-BASED ARCHITECTURE (v2)
// New flexible activity-based system for building lessons
// See: docs/plans/ACTIVITY_BASED_ARCHITECTURE.md
// ============================================================================

/**
 * Activity Types - Core building blocks for lessons
 * Activities can be composed in any order to create flexible lesson structures
 */
export type ActivityType =
  | 'warm-up'        // Engage students, activate prior knowledge
  | 'presentation'   // Teach new content, explain concepts
  | 'exercise'       // Practice activity (controlled or free)
  | 'discussion'     // Communicative discussion activity
  | 'task'           // Real-world task or project
  | 'reflection';    // Review, self-assessment, analyze learning

/**
 * Content Types for Different Activities
 */

export interface WarmUpContent {
  description: string;
  questions?: string[];
  mediaLinks?: string[];
  duration?: number;
}

export interface PresentationActivityContent {
  targetLanguage: string;
  explanation: string | BilingualText;
  examples: string[];
  mediaLinks?: string[];
  duration?: number;
}

export interface ExerciseContent {
  exercise: Exercise;  // Reuses existing exercise types
  practiceType?: 'controlled' | 'free';
}

export interface DiscussionContent {
  topic: string;
  questions: string[];
  format?: 'pairs' | 'groups' | 'whole-class';
  roles?: Array<{ name: string; description: string }>;
  duration?: number;
}

export interface TaskContent {
  taskDescription: string;
  scenario: string;
  roles?: Array<{ name: string; description: string }>;
  expectedOutcome?: string;
  rubric?: string;
  duration?: number;
}

export interface ReflectionContent {
  prompts: string[];
  format?: 'written' | 'discussion' | 'self-assessment';
  duration?: number;
}

/**
 * ActivityContent - Union type for all activity content types
 */
export type ActivityContent =
  | { type: 'warm-up'; data: WarmUpContent }
  | { type: 'presentation'; data: PresentationActivityContent }
  | { type: 'exercise'; data: ExerciseContent }
  | { type: 'discussion'; data: DiscussionContent }
  | { type: 'task'; data: TaskContent }
  | { type: 'reflection'; data: ReflectionContent };

/**
 * Activity - Core building block
 * Activities are atomic units that can be composed into lessons
 */
export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  duration?: number;
  content: ActivityContent;
  tags?: string[];
  teacherNotes?: string;
}

/**
 * ActivityLesson - New v2 lesson structure
 * Lessons are ordered collections of activities
 * Methodology (PPP/TTT/GPPC/CEFR) is metadata, not enforced structure
 */
export interface ActivityLesson {
  id: string;
  title: string;
  version: 'v2';  // Version flag to distinguish from old phase-based lessons
  language: string;  // Language being taught (e.g., "English", "Ukrainian")
  level?: string;
  cefrLevel?: CEFRLevel;
  methodologyTag?: 'PPP' | 'TTT' | 'GPPC' | 'CEFR' | 'custom';
  objectives?: string[];
  materials?: string[];
  activities: Activity[];  // Ordered list - flexible composition
  totalDuration?: number;
  teacherNotes?: string;
  createdAt: string;
}

/**
 * LessonTemplate - Pre-configured activity sequences
 * Templates provide starting points for common lesson structures
 */
export interface LessonTemplate {
  id: string;
  name: string;
  description: string;
  methodologyTag: 'PPP' | 'TTT' | 'GPPC' | 'CEFR';
  language: string;
  level?: string;
  activityStructure: Array<{
    type: ActivityType;
    title: string;
    suggestedDuration?: number;
    description?: string;
  }>;
  previewImage?: string;
  tags?: string[];
}

/**
 * Union type for all lesson types
 * Allows the app to handle both old (v1) and new (v2) lessons
 */
export type AnyLesson = Lesson | ActivityLesson;

/**
 * Type guard to check if lesson is activity-based (v2)
 */
export function isActivityLesson(lesson: AnyLesson): lesson is ActivityLesson {
  return 'version' in lesson && lesson.version === 'v2';
}
