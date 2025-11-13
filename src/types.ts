export type LessonStructure = 'PPP' | 'TTT';

export type ExerciseType = 'gap-fill' | 'sorting' | 'matching' | 'free-text' | 'multiple-choice' | 'true-false' | 'sentence-scramble' | 'information-gap' | 'role-play' | 'collocation' | 'lexical-set';

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

export interface InformationGapExercise {
  type: 'information-gap';
  id: string;
  instruction: string;
  scenario: string; // Description of the communicative task
  studentAInfo: string; // Information for Student A
  studentBInfo: string; // Information for Student B
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
  | LexicalSetExercise;

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
