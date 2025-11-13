// Security utilities for input validation and sanitization

const MAX_INPUT_LENGTH = 10000; // 10k characters
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_ARRAY_LENGTH = 100;
const MAX_URL_LENGTH = 2048;

// Validate URL to prevent malicious links
export function validateURL(url: string): boolean {
  if (!url || url.length > MAX_URL_LENGTH) {
    return false;
  }

  try {
    const parsed = new URL(url);
    // Only allow http, https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }
    // Block common malicious patterns
    if (url.includes('<script') || url.includes('javascript:') || url.includes('data:')) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Sanitize text input to prevent XSS
export function sanitizeText(text: string, maxLength: number = MAX_INPUT_LENGTH): string {
  if (!text) return '';

  // Limit length
  let sanitized = text.substring(0, maxLength);

  // Remove potentially dangerous characters
  sanitized = sanitized.replace(/[<>]/g, '');

  return sanitized.trim();
}

// Validate file size
export function validateFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

// Validate array length to prevent DoS
export function validateArrayLength(arr: unknown[]): boolean {
  return arr.length <= MAX_ARRAY_LENGTH;
}

// Deep validation of imported lesson data
export function validateLessonStructure(data: any): boolean {
  // Check required fields exist
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Validate basic structure
  if (!data.id || !data.title || !data.structure) {
    return false;
  }

  // Validate structure type
  if (!['PPP', 'TTT'].includes(data.structure)) {
    return false;
  }

  // Validate leadIn
  if (!data.leadIn || typeof data.leadIn !== 'object') {
    return false;
  }

  // Validate presentation
  if (!data.presentation || typeof data.presentation !== 'object') {
    return false;
  }

  // Validate practice sections
  if (!data.controlledPractice || !data.freePractice) {
    return false;
  }

  // Validate exercises arrays
  if (!Array.isArray(data.controlledPractice.exercises) ||
      !Array.isArray(data.freePractice.exercises)) {
    return false;
  }

  // Check array lengths
  if (!validateArrayLength(data.controlledPractice.exercises) ||
      !validateArrayLength(data.freePractice.exercises)) {
    return false;
  }

  // Validate mediaLinks if present
  if (data.leadIn.mediaLinks && !Array.isArray(data.leadIn.mediaLinks)) {
    return false;
  }

  if (data.presentation.mediaLinks && !Array.isArray(data.presentation.mediaLinks)) {
    return false;
  }

  return true;
}

// Prevent prototype pollution
export function sanitizeJSON(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Remove __proto__, constructor, prototype
  const sanitized: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Block dangerous keys
      if (['__proto__', 'constructor', 'prototype'].includes(key)) {
        continue;
      }
      sanitized[key] = sanitizeJSON(obj[key]);
    }
  }

  return sanitized;
}

// Sanitize and validate URLs in lesson
export function sanitizeLesson(lesson: any): any {
  const sanitized = { ...lesson };

  // Sanitize text fields
  if (sanitized.title) {
    sanitized.title = sanitizeText(sanitized.title, 200);
  }

  // Sanitize leadIn
  if (sanitized.leadIn) {
    if (sanitized.leadIn.title) {
      sanitized.leadIn.title = sanitizeText(sanitized.leadIn.title, 200);
    }
    if (sanitized.leadIn.description) {
      sanitized.leadIn.description = sanitizeText(sanitized.leadIn.description, 500);
    }
    if (sanitized.leadIn.content) {
      sanitized.leadIn.content = sanitizeText(sanitized.leadIn.content);
    }
    if (sanitized.leadIn.teacherNotes) {
      sanitized.leadIn.teacherNotes = sanitizeText(sanitized.leadIn.teacherNotes);
    }
    if (sanitized.leadIn.mediaLinks) {
      sanitized.leadIn.mediaLinks = sanitized.leadIn.mediaLinks
        .filter((url: string) => validateURL(url))
        .slice(0, 10); // Max 10 links
    }
  }

  // Sanitize presentation
  if (sanitized.presentation) {
    if (sanitized.presentation.title) {
      sanitized.presentation.title = sanitizeText(sanitized.presentation.title, 200);
    }
    if (sanitized.presentation.targetLanguage) {
      sanitized.presentation.targetLanguage = sanitizeText(sanitized.presentation.targetLanguage, 500);
    }
    if (sanitized.presentation.explanation) {
      sanitized.presentation.explanation = sanitizeText(sanitized.presentation.explanation);
    }
    if (sanitized.presentation.teacherNotes) {
      sanitized.presentation.teacherNotes = sanitizeText(sanitized.presentation.teacherNotes);
    }
    if (sanitized.presentation.examples) {
      sanitized.presentation.examples = sanitized.presentation.examples
        .map((ex: string) => sanitizeText(ex, 500))
        .slice(0, 20); // Max 20 examples
    }
    if (sanitized.presentation.mediaLinks) {
      sanitized.presentation.mediaLinks = sanitized.presentation.mediaLinks
        .filter((url: string) => validateURL(url))
        .slice(0, 10);
    }
  }

  // Sanitize exercises
  ['controlledPractice', 'freePractice'].forEach((section) => {
    if (sanitized[section]?.exercises) {
      sanitized[section].exercises = sanitized[section].exercises
        .slice(0, MAX_ARRAY_LENGTH)
        .map((exercise: any) => sanitizeExercise(exercise));
    }
  });

  return sanitized;
}

function sanitizeExercise(exercise: any): any {
  const sanitized = { ...exercise };

  if (sanitized.instruction) {
    sanitized.instruction = sanitizeText(sanitized.instruction, 500);
  }

  // Type-specific sanitization
  switch (sanitized.type) {
    case 'gap-fill':
      if (sanitized.text) {
        sanitized.text = sanitizeText(sanitized.text);
      }
      break;

    case 'information-gap':
      if (sanitized.scenario) {
        sanitized.scenario = sanitizeText(sanitized.scenario);
      }
      if (sanitized.studentAInfo) {
        sanitized.studentAInfo = sanitizeText(sanitized.studentAInfo);
      }
      if (sanitized.studentBInfo) {
        sanitized.studentBInfo = sanitizeText(sanitized.studentBInfo);
      }
      break;

    case 'role-play':
      if (sanitized.scenario) {
        sanitized.scenario = sanitizeText(sanitized.scenario);
      }
      if (sanitized.roles) {
        sanitized.roles = sanitized.roles.slice(0, 10).map((role: any) => ({
          name: sanitizeText(role.name, 100),
          description: sanitizeText(role.description, 500),
        }));
      }
      break;
  }

  return sanitized;
}
