import type { Lesson } from '../types';
import {
  validateFileSize,
  validateLessonStructure,
  sanitizeJSON,
  sanitizeLesson,
  sanitizeText
} from './security';

export const exportLessonToJSON = (lesson: Lesson) => {
  const jsonString = JSON.stringify(lesson, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  // Sanitize filename to prevent path traversal
  const safeTitle = sanitizeText(lesson.title || 'lesson', 50).replace(/[^a-z0-9-]/gi, '_');
  link.download = `${safeTitle}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importLessonFromJSON = (file: File): Promise<Lesson> => {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.name.endsWith('.json')) {
      reject(new Error('Only JSON files are allowed'));
      return;
    }

    // Validate file size (max 5MB)
    if (!validateFileSize(file)) {
      reject(new Error('File is too large. Maximum size is 5MB'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;

        // Validate result length
        if (result.length > 5 * 1024 * 1024) {
          reject(new Error('File content is too large'));
          return;
        }

        // Parse JSON
        let parsed = JSON.parse(result);

        // Sanitize to prevent prototype pollution
        parsed = sanitizeJSON(parsed);

        // Validate structure
        if (!validateLessonStructure(parsed)) {
          reject(new Error('Invalid lesson structure. Please check the file format.'));
          return;
        }

        // Sanitize all content
        const sanitized = sanitizeLesson(parsed);

        resolve(sanitized as Lesson);
      } catch (error) {
        if (error instanceof SyntaxError) {
          reject(new Error('Invalid JSON format'));
        } else {
          reject(error);
        }
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));

    // Set timeout to prevent hanging
    const timeout = setTimeout(() => {
      reader.abort();
      reject(new Error('File reading timeout'));
    }, 10000); // 10 second timeout

    reader.onloadend = () => clearTimeout(timeout);

    reader.readAsText(file);
  });
};

export const printLesson = () => {
  window.print();
};
