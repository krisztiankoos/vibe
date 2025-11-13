import { useState } from 'react';
import type { Lesson } from '../types';
import type { Language } from '../translations';
import { exportLessonToJSON } from '../utils/lessonUtils';

interface SavedLessonsProps {
  language: Language;
  onClose: () => void;
  onLoadLesson: (lesson: Lesson) => void;
  onDuplicateLesson: (lesson: Lesson) => void;
}

export default function SavedLessons({ language, onClose, onLoadLesson, onDuplicateLesson }: SavedLessonsProps) {
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem('lessons');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');

  const t = {
    en: {
      title: 'My Saved Lessons',
      search: 'Search lessons...',
      noLessons: 'No saved lessons yet',
      noResults: 'No lessons found matching your search',
      load: 'Load',
      duplicate: 'Duplicate',
      export: 'Export',
      delete: 'Delete',
      exercises: 'exercises',
      createdOn: 'Created',
      confirmDelete: 'Are you sure you want to delete this lesson? This cannot be undone.',
      close: 'Close',
    },
    uk: {
      title: 'Мої збережені уроки',
      search: 'Пошук уроків...',
      noLessons: 'Ще немає збережених уроків',
      noResults: 'Не знайдено уроків, що відповідають вашому пошуку',
      load: 'Завантажити',
      duplicate: 'Дублювати',
      export: 'Експортувати',
      delete: 'Видалити',
      exercises: 'вправ',
      createdOn: 'Створено',
      confirmDelete: 'Ви впевнені, що хочете видалити цей урок? Це неможливо скасувати.',
      close: 'Закрити',
    },
  }[language];

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.level?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.targetLanguage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (lessonId: string) => {
    if (confirm(t.confirmDelete)) {
      const updated = lessons.filter((l) => l.id !== lessonId);
      localStorage.setItem('lessons', JSON.stringify(updated));
      setLessons(updated);
    }
  };

  const handleExport = (lesson: Lesson) => {
    exportLessonToJSON(lesson);
  };

  const getExerciseCount = (lesson: Lesson) => {
    const controlled = lesson.controlledPractice?.exercises?.length || 0;
    const free = lesson.freePractice?.exercises?.length || 0;
    return controlled + free;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(language === 'en' ? 'en-US' : 'uk-UA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content saved-lessons-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t.title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="search-box">
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {lessons.length === 0 ? (
            <div className="empty-state">
              <p>📚 {t.noLessons}</p>
            </div>
          ) : filteredLessons.length === 0 ? (
            <div className="empty-state">
              <p>🔍 {t.noResults}</p>
            </div>
          ) : (
            <div className="lessons-grid">
              {filteredLessons.map((lesson) => (
                <div key={lesson.id} className="lesson-card">
                  <div className="lesson-card-header">
                    <h3 className="lesson-title">{lesson.title || language === 'en' ? 'Untitled Lesson' : 'Урок без назви'}</h3>
                    {lesson.level && <span className="lesson-level">{lesson.level}</span>}
                  </div>

                  <div className="lesson-card-body">
                    {lesson.targetLanguage && (
                      <div className="lesson-meta">
                        <span className="meta-icon">🌍</span>
                        <span>{lesson.targetLanguage}</span>
                      </div>
                    )}
                    {lesson.duration && (
                      <div className="lesson-meta">
                        <span className="meta-icon">⏱️</span>
                        <span>{lesson.duration} min</span>
                      </div>
                    )}
                    <div className="lesson-meta">
                      <span className="meta-icon">📝</span>
                      <span>{getExerciseCount(lesson)} {t.exercises}</span>
                    </div>
                    <div className="lesson-meta">
                      <span className="meta-icon">📅</span>
                      <span>{t.createdOn}: {formatDate(lesson.createdAt)}</span>
                    </div>
                  </div>

                  <div className="lesson-card-actions">
                    <button
                      className="btn-secondary btn-small"
                      onClick={() => {
                        onLoadLesson(lesson);
                        onClose();
                      }}
                      title={t.load}
                    >
                      {t.load}
                    </button>
                    <button
                      className="btn-secondary btn-small"
                      onClick={() => {
                        onDuplicateLesson(lesson);
                        onClose();
                      }}
                      title={t.duplicate}
                    >
                      {t.duplicate}
                    </button>
                    <button
                      className="btn-secondary btn-small"
                      onClick={() => handleExport(lesson)}
                      title={t.export}
                    >
                      {t.export}
                    </button>
                    <button
                      className="btn-danger btn-small"
                      onClick={() => handleDelete(lesson.id)}
                      title={t.delete}
                    >
                      {t.delete}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
