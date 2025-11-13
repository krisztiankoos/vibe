export type LessonStructure = 'PPP' | 'TTT';

export type ExerciseType = 'gap-fill' | 'sorting' | 'matching' | 'free-text' | 'multiple-choice' | 'true-false' | 'sentence-scramble';

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

export type Exercise =
  | GapFillExercise
  | SortingExercise
  | MatchingExercise
  | FreeTextExercise
  | MultipleChoiceExercise
  | TrueFalseExercise
  | SentenceScrambleExercise;

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
  explanation: string;
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
  leadIn: LeadIn;
  presentation: Presentation;
  controlledPractice: PracticeSection;
  freePractice: PracticeSection;
  createdAt: string;
}
