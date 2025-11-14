import type { Lesson } from '../types';

// TODO: Create 12 new English examples (6 PPP + 6 TTT)
// All examples will be activity-based and reviewed for pedagogical accuracy
// Deleted old examples - they used phase-based structure

// English language teaching samples
export const sampleLessonsEnglish: Lesson[] = [
  // Coming soon: Proper English examples for PPP and TTT structures
  // PPP: Grammar-focused lessons (6 examples)
  // TTT: Discovery-based authentic texts (6 examples)
];

// Import Ukrainian samples
import { sampleLessonsUkrainian } from './sampleLessonsUkrainian';

// Combined export - all samples
export const sampleLessons = [...sampleLessonsEnglish, ...sampleLessonsUkrainian];

// Helper to get samples by target language
export const getSamplesByLanguage = (targetLang: 'English' | 'Ukrainian' | 'Українська мова') => {
  if (targetLang === 'English') {
    return sampleLessonsEnglish;
  } else {
    return sampleLessonsUkrainian;
  }
};
