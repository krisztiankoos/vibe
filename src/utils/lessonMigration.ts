/**
 * Lesson Migration Utility
 *
 * Converts old phase-based lessons (v1) to new activity-based lessons (v2)
 * Handles automatic migration of localStorage lessons
 *
 * See: docs/plans/ACTIVITY_BASED_ARCHITECTURE.md
 */

import type {
  Lesson,
  ActivityLesson,
  Activity,
  AnyLesson,
  Exercise
} from '../types';
import { isActivityLesson } from '../types';

/**
 * Convert a v1 phase-based lesson to v2 activity-based lesson
 *
 * Conversion strategy:
 * - leadIn → warm-up activity
 * - presentation → presentation activity
 * - controlledPractice.exercises → exercise activities (controlled)
 * - freePractice.exercises → exercise activities (free)
 *
 * All metadata (objectives, materials, level, etc.) is preserved
 */
export function migrateLesson(oldLesson: Lesson): ActivityLesson {
  const activities: Activity[] = [];

  // 1. Convert Lead-In to Warm-Up Activity
  activities.push({
    id: `${oldLesson.id}-activity-warm-up`,
    type: 'warm-up',
    title: oldLesson.leadIn.title,
    duration: oldLesson.leadIn.duration,
    content: {
      type: 'warm-up',
      data: {
        description: oldLesson.leadIn.content,
        questions: oldLesson.leadIn.description ? [oldLesson.leadIn.description] : undefined,
        mediaLinks: oldLesson.leadIn.mediaLinks,
        duration: oldLesson.leadIn.duration
      }
    },
    teacherNotes: oldLesson.leadIn.teacherNotes,
    tags: ['migrated', 'lead-in']
  });

  // 2. Convert Presentation to Presentation Activity
  activities.push({
    id: `${oldLesson.id}-activity-presentation`,
    type: 'presentation',
    title: oldLesson.presentation.title,
    duration: oldLesson.presentation.duration,
    content: {
      type: 'presentation',
      data: {
        targetLanguage: oldLesson.presentation.targetLanguage,
        explanation: oldLesson.presentation.explanation,
        examples: oldLesson.presentation.examples,
        mediaLinks: oldLesson.presentation.mediaLinks,
        duration: oldLesson.presentation.duration
      }
    },
    teacherNotes: oldLesson.presentation.teacherNotes,
    tags: ['migrated', 'presentation']
  });

  // 3. Convert Controlled Practice Exercises to Exercise Activities
  oldLesson.controlledPractice.exercises.forEach((exercise, index) => {
    activities.push({
      id: `${oldLesson.id}-activity-controlled-${index}`,
      type: 'exercise',
      title: getExerciseTitle(exercise, index + 1, 'Controlled Practice'),
      content: {
        type: 'exercise',
        data: {
          exercise: exercise,
          practiceType: 'controlled'
        }
      },
      tags: ['migrated', 'controlled', exercise.type]
    });
  });

  // 4. Convert Free Practice Exercises to Exercise Activities
  oldLesson.freePractice.exercises.forEach((exercise, index) => {
    activities.push({
      id: `${oldLesson.id}-activity-free-${index}`,
      type: 'exercise',
      title: getExerciseTitle(exercise, index + 1, 'Free Practice'),
      content: {
        type: 'exercise',
        data: {
          exercise: exercise,
          practiceType: 'free'
        }
      },
      tags: ['migrated', 'free', exercise.type]
    });
  });

  // Calculate total duration
  const totalDuration = activities.reduce((sum, activity) => {
    return sum + (activity.duration || 0);
  }, 0);

  // Create new v2 lesson
  const newLesson: ActivityLesson = {
    id: oldLesson.id,
    title: oldLesson.title,
    version: 'v2',
    language: oldLesson.targetLanguage || 'English',
    level: oldLesson.level,
    cefrLevel: oldLesson.cefrLevel,
    methodologyTag: oldLesson.structure, // PPP, TTT, GPPC, or CEFR becomes a tag
    objectives: oldLesson.objectives,
    materials: oldLesson.materials,
    activities: activities,
    totalDuration: totalDuration > 0 ? totalDuration : oldLesson.duration,
    teacherNotes: oldLesson.teacherNotes,
    createdAt: oldLesson.createdAt
  };

  return newLesson;
}

/**
 * Generate a meaningful title for exercise activities
 */
function getExerciseTitle(exercise: Exercise, number: number, practiceType: string): string {
  const typeLabels: Record<Exercise['type'], string> = {
    'gap-fill': 'Gap Fill Exercise',
    'multiple-choice': 'Multiple Choice',
    'matching': 'Matching Exercise',
    'sorting': 'Sorting Exercise',
    'true-false': 'True/False',
    'sentence-scramble': 'Sentence Scramble',
    'free-text': 'Writing Task',
    'information-gap': 'Information Gap',
    'role-play': 'Role Play',
    'collocation': 'Collocation Practice',
    'lexical-set': 'Lexical Set',
    'ordering': 'Ordering Exercise'
  };

  return `${practiceType} ${number}: ${typeLabels[exercise.type]}`;
}

/**
 * Migrate all lessons stored in localStorage
 * Returns migrated lessons that need to be saved back
 */
export function migrateLocalStorageLessons(): { migrated: ActivityLesson[]; errors: string[] } {
  const migrated: ActivityLesson[] = [];
  const errors: string[] = [];

  try {
    // Get all lessons from localStorage
    const lessonsJson = localStorage.getItem('lessons');
    if (!lessonsJson) {
      return { migrated: [], errors: [] };
    }

    const lessons: AnyLesson[] = JSON.parse(lessonsJson);

    // Migrate each v1 lesson
    lessons.forEach((lesson, index) => {
      try {
        // Check if already v2
        if (isActivityLesson(lesson)) {
          // Already migrated, skip
          return;
        }

        // Migrate v1 → v2
        const migratedLesson = migrateLesson(lesson as Lesson);
        migrated.push(migratedLesson);
      } catch (error) {
        errors.push(`Failed to migrate lesson at index ${index}: ${error instanceof Error ? error.message : String(error)}`);
      }
    });

    return { migrated, errors };
  } catch (error) {
    errors.push(`Failed to read lessons from localStorage: ${error instanceof Error ? error.message : String(error)}`);
    return { migrated: [], errors };
  }
}

/**
 * Save migrated lessons back to localStorage
 * Replaces old v1 lessons with v2 equivalents
 */
export function saveMigratedLessons(migratedLessons: ActivityLesson[]): { success: boolean; error?: string } {
  try {
    const lessonsJson = localStorage.getItem('lessons');
    if (!lessonsJson) {
      // No existing lessons, just save the migrated ones
      localStorage.setItem('lessons', JSON.stringify(migratedLessons));
      return { success: true };
    }

    const existingLessons: AnyLesson[] = JSON.parse(lessonsJson);

    // Create a map of migrated lessons by ID
    const migratedMap = new Map<string, ActivityLesson>();
    migratedLessons.forEach(lesson => {
      migratedMap.set(lesson.id, lesson);
    });

    // Replace v1 lessons with v2 equivalents, keep existing v2 lessons
    const updatedLessons: AnyLesson[] = existingLessons.map(lesson => {
      if (migratedMap.has(lesson.id)) {
        return migratedMap.get(lesson.id)!;
      }
      return lesson;
    });

    // Save back to localStorage
    localStorage.setItem('lessons', JSON.stringify(updatedLessons));

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: `Failed to save migrated lessons: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

/**
 * Run complete migration process
 * Detects v1 lessons, migrates them, and saves back to localStorage
 *
 * Usage:
 *   const result = runMigration();
 *   if (result.success) {
 *     console.log(`Migrated ${result.migratedCount} lessons`);
 *   } else {
 *     console.error('Migration failed:', result.errors);
 *   }
 */
export function runMigration(): {
  success: boolean;
  migratedCount: number;
  errors: string[];
} {
  const { migrated, errors } = migrateLocalStorageLessons();

  if (migrated.length === 0) {
    // No lessons to migrate
    return {
      success: true,
      migratedCount: 0,
      errors: []
    };
  }

  const saveResult = saveMigratedLessons(migrated);

  if (!saveResult.success) {
    errors.push(saveResult.error || 'Unknown error saving lessons');
  }

  return {
    success: saveResult.success && errors.length === 0,
    migratedCount: migrated.length,
    errors
  };
}

/**
 * Check if migration is needed
 * Returns true if there are any v1 lessons in localStorage
 */
export function isMigrationNeeded(): boolean {
  try {
    const lessonsJson = localStorage.getItem('lessons');
    if (!lessonsJson) {
      return false;
    }

    const lessons: AnyLesson[] = JSON.parse(lessonsJson);

    // Check if any lesson is v1 (no version field or version !== 'v2')
    return lessons.some(lesson => !isActivityLesson(lesson));
  } catch {
    return false;
  }
}

/**
 * Get migration statistics
 */
export function getMigrationStats(): {
  totalLessons: number;
  v1Lessons: number;
  v2Lessons: number;
  needsMigration: boolean;
} {
  try {
    const lessonsJson = localStorage.getItem('lessons');
    if (!lessonsJson) {
      return {
        totalLessons: 0,
        v1Lessons: 0,
        v2Lessons: 0,
        needsMigration: false
      };
    }

    const lessons: AnyLesson[] = JSON.parse(lessonsJson);

    const v2Count = lessons.filter(isActivityLesson).length;
    const v1Count = lessons.length - v2Count;

    return {
      totalLessons: lessons.length,
      v1Lessons: v1Count,
      v2Lessons: v2Count,
      needsMigration: v1Count > 0
    };
  } catch {
    return {
      totalLessons: 0,
      v1Lessons: 0,
      v2Lessons: 0,
      needsMigration: false
    };
  }
}
