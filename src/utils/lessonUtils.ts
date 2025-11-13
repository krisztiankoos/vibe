import type { Lesson } from '../types';

export const exportLessonToJSON = (lesson: Lesson) => {
  const jsonString = JSON.stringify(lesson, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${lesson.title || 'lesson'}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importLessonFromJSON = (file: File): Promise<Lesson> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const lesson = JSON.parse(e.target?.result as string) as Lesson;
        resolve(lesson);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const printLesson = () => {
  window.print();
};
