import { useState } from 'react';
import type { Lesson } from '../types';
import type { Language } from '../translations';
import { sampleLessonsEnglish } from '../data/sampleLessons';
import { sampleLessonsUkrainian } from '../data/sampleLessonsUkrainian';

interface SampleLessonsProps {
  onLoadSample: (lesson: Lesson) => void;
  language: Language;
  onClose: () => void;
}

export default function SampleLessons({ onLoadSample, language, onClose }: SampleLessonsProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Get appropriate samples based on UI language
  const sampleLessons = language === 'en' ? sampleLessonsEnglish : sampleLessonsUkrainian;

  const handleLoadSample = (lesson: Lesson) => {
    // Create a new lesson with a new ID and timestamp
    const newLesson: Lesson = {
      ...lesson,
      id: `lesson-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    onLoadSample(newLesson);
    onClose();
  };

  const handlePreview = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setShowPreview(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content sample-lessons-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📚 {language === 'en' ? 'Sample Lessons' : 'Зразки Уроків'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {!showPreview ? (
          <div className="sample-lessons-list">
            <p className="sample-lessons-intro">
              {language === 'en'
                ? 'Load a sample lesson to see how to structure your lessons. You can modify it as needed.'
                : 'Завантажте зразок уроку, щоб побачити, як структурувати ваші уроки. Ви можете змінити його за потребою.'}
            </p>

            <div className="samples-grid">
              {sampleLessons.map((lesson) => (
                <div key={lesson.id} className="sample-card">
                  <div className="sample-header">
                    <h3>{lesson.title}</h3>
                    <span className={`structure-badge ${lesson.structure.toLowerCase()}`}>
                      {lesson.structure}
                    </span>
                  </div>

                  <div className="sample-details">
                    <p><strong>{language === 'en' ? 'Level' : 'Рівень'}:</strong> {lesson.level}</p>
                    <p><strong>{language === 'en' ? 'Duration' : 'Тривалість'}:</strong> {lesson.duration} {language === 'en' ? 'minutes' : 'хвилин'}</p>
                    {lesson.objectives && lesson.objectives.length > 0 && (
                      <>
                        <p className="sample-objectives">
                          <strong>{language === 'en' ? 'Objectives' : 'Цілі'}:</strong>
                        </p>
                        <ul className="objectives-list">
                          {lesson.objectives.slice(0, 2).map((obj, index) => (
                            <li key={index}>{obj}</li>
                          ))}
                          {lesson.objectives.length > 2 && (
                            <li><em>+{lesson.objectives.length - 2} {language === 'en' ? 'more' : 'ще'}</em></li>
                          )}
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="sample-actions">
                    <button
                      className="btn-secondary"
                      onClick={() => handlePreview(lesson)}
                    >
                      👁️ {language === 'en' ? 'Preview' : 'Переглянути'}
                    </button>
                    <button
                      className="btn-primary"
                      onClick={() => handleLoadSample(lesson)}
                    >
                      📥 {language === 'en' ? 'Load Sample' : 'Завантажити'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="sample-preview">
            <button
              className="back-button"
              onClick={() => setShowPreview(false)}
            >
              ← {language === 'en' ? 'Back to list' : 'Назад до списку'}
            </button>

            {selectedLesson && (
              <div className="preview-content">
                <div className="preview-header">
                  <h2>{selectedLesson.title}</h2>
                  <div className="preview-meta">
                    <span className={`structure-badge ${selectedLesson.structure.toLowerCase()}`}>
                      {selectedLesson.structure}
                    </span>
                    <span>{selectedLesson.level}</span>
                    <span>{selectedLesson.duration} {language === 'en' ? 'min' : 'хв'}</span>
                  </div>
                </div>

                {selectedLesson.objectives && selectedLesson.objectives.length > 0 && (
                  <section className="preview-section">
                    <h3>{language === 'en' ? 'Objectives' : 'Цілі'}</h3>
                    <ul>
                      {selectedLesson.objectives.map((obj, index) => (
                        <li key={index}>{obj}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {selectedLesson.materials && selectedLesson.materials.length > 0 && (
                  <section className="preview-section">
                    <h3>{language === 'en' ? 'Materials' : 'Матеріали'}</h3>
                    <ul>
                      {selectedLesson.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </section>
                )}

                <section className="preview-section">
                  <h3>Lead-In: {selectedLesson.leadIn.title}</h3>
                  <p><strong>{language === 'en' ? 'Duration' : 'Тривалість'}:</strong> {selectedLesson.leadIn.duration} {language === 'en' ? 'min' : 'хв'}</p>
                  <p>{selectedLesson.leadIn.content}</p>
                </section>

                <section className="preview-section">
                  <h3>Presentation: {selectedLesson.presentation.title}</h3>
                  <p><strong>{language === 'en' ? 'Duration' : 'Тривалість'}:</strong> {selectedLesson.presentation.duration} {language === 'en' ? 'min' : 'хв'}</p>
                  <p><strong>{language === 'en' ? 'Target Language' : 'Цільова Мова'}:</strong> {selectedLesson.presentation.targetLanguage}</p>
                  <p>
                    {typeof selectedLesson.presentation.explanation === 'string'
                      ? selectedLesson.presentation.explanation.substring(0, 200)
                      : selectedLesson.presentation.explanation.uk.substring(0, 200)}...
                  </p>
                </section>

                <section className="preview-section">
                  <h3>{language === 'en' ? 'Controlled Practice' : 'Контрольована Практика'}</h3>
                  <p>{selectedLesson.controlledPractice.exercises.length} {language === 'en' ? 'exercises' : 'вправ'}</p>
                  <p><strong>{language === 'en' ? 'Types' : 'Типи'}:</strong> {selectedLesson.controlledPractice.exercises.map(ex => ex.type).join(', ')}</p>
                </section>

                <section className="preview-section">
                  <h3>{language === 'en' ? 'Free Practice' : 'Вільна Практика'}</h3>
                  <p>{selectedLesson.freePractice.exercises.length} {language === 'en' ? 'exercises' : 'вправ'}</p>
                  <p><strong>{language === 'en' ? 'Types' : 'Типи'}:</strong> {selectedLesson.freePractice.exercises.map(ex => ex.type).join(', ')}</p>
                </section>

                <div className="preview-actions">
                  <button
                    className="btn-primary"
                    onClick={() => handleLoadSample(selectedLesson)}
                  >
                    📥 {language === 'en' ? 'Load This Sample' : 'Завантажити Цей Зразок'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
