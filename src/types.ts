export type LessonStructure = 'PPP' | 'TTT';

export type ExerciseType = 'gap-fill' | 'sorting' | 'matching' | 'free-text';

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

export type Exercise = GapFillExercise | SortingExercise | MatchingExercise | FreeTextExercise;

export interface LeadIn {
  title: string;
  description: string;
  content: string;
}

export interface Presentation {
  title: string;
  targetLanguage: string;
  examples: string[];
  explanation: string;
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
