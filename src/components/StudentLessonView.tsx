import { useState, useEffect } from 'react';
import type { Lesson } from '../types';
import type { Language } from '../translations';
import StudentExercise from './StudentExercise';

interface StudentLessonViewProps {
  lesson: Lesson;
  language: Language;
  onExit: () => void;
}

interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  score?: number;
  attempts: number;
}

export default function StudentLessonView({ lesson, language, onExit }: StudentLessonViewProps) {
  const [currentSection, setCurrentSection] = useState<'lead-in' | 'presentation' | 'controlled' | 'free'>('lead-in');
  const [progress, setProgress] = useState<ExerciseProgress[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`lesson-progress-${lesson.id}`);
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, [lesson.id]);

  // Save progress to localStorage
  useEffect(() => {
    if (progress.length > 0) {
      localStorage.setItem(`lesson-progress-${lesson.id}`, JSON.stringify(progress));
    }
  }, [progress, lesson.id]);

  const updateExerciseProgress = (exerciseId: string, completed: boolean, score?: number) => {
    setProgress(prev => {
      const existing = prev.find(p => p.exerciseId === exerciseId);
      if (existing) {
        return prev.map(p =>
          p.exerciseId === exerciseId
            ? { ...p, completed, score, attempts: p.attempts + 1 }
            : p
        );
      } else {
        return [...prev, { exerciseId, completed, score, attempts: 1 }];
      }
    });
  };

  const getExerciseProgress = (exerciseId: string) => {
    return progress.find(p => p.exerciseId === exerciseId);
  };

  const allExercises = [
    ...lesson.controlledPractice.exercises,
    ...lesson.freePractice.exercises
  ];

  const completedCount = progress.filter(p => p.completed).length;
  const totalExercises = allExercises.length;
  const progressPercentage = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  return (
    <div className="student-lesson-view">
      <header className="student-header">
        <div className="student-header-content">
          <h1>{lesson.title}</h1>
          <div className="lesson-meta">
            {lesson.level && <span className="meta-badge">{lesson.level}</span>}
            {lesson.duration && <span className="meta-badge">{lesson.duration} {language === 'en' ? 'min' : 'хв'}</span>}
          </div>
        </div>
        <button onClick={onExit} className="exit-button">
          ✕ {language === 'en' ? 'Exit' : 'Вихід'}
        </button>
      </header>

      <div className="student-progress-bar">
        <div className="progress-info">
          <span>{language === 'en' ? 'Progress' : 'Прогрес'}: {completedCount}/{totalExercises}</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>

      <nav className="student-nav">
        <button
          className={currentSection === 'lead-in' ? 'active' : ''}
          onClick={() => setCurrentSection('lead-in')}
        >
          {language === 'en' ? 'Lead-In' : 'Вступ'}
        </button>
        <button
          className={currentSection === 'presentation' ? 'active' : ''}
          onClick={() => setCurrentSection('presentation')}
        >
          {language === 'en' ? 'Presentation' : 'Презентація'}
        </button>
        <button
          className={currentSection === 'controlled' ? 'active' : ''}
          onClick={() => setCurrentSection('controlled')}
        >
          {language === 'en' ? 'Practice' : 'Практика'}
          {lesson.controlledPractice.exercises.length > 0 && (
            <span className="exercise-count">({lesson.controlledPractice.exercises.length})</span>
          )}
        </button>
        <button
          className={currentSection === 'free' ? 'active' : ''}
          onClick={() => setCurrentSection('free')}
        >
          {language === 'en' ? 'Production' : 'Продукція'}
          {lesson.freePractice.exercises.length > 0 && (
            <span className="exercise-count">({lesson.freePractice.exercises.length})</span>
          )}
        </button>
      </nav>

      <main className="student-main">
        {currentSection === 'lead-in' && (
          <section className="student-section">
            <h2>{lesson.leadIn.title}</h2>
            <p className="section-description">{lesson.leadIn.description}</p>
            <div className="section-content">
              <p>{lesson.leadIn.content}</p>
              {lesson.leadIn.mediaLinks && lesson.leadIn.mediaLinks.length > 0 && (
                <div className="media-links">
                  <h3>{language === 'en' ? 'Resources' : 'Ресурси'}:</h3>
                  <ul>
                    {lesson.leadIn.mediaLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          🔗 {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {currentSection === 'presentation' && (
          <section className="student-section">
            <h2>{lesson.presentation.title}</h2>

            <div className="presentation-box">
              <h3>{language === 'en' ? 'Target Language' : 'Цільова Мова'}:</h3>
              <p className="target-language">{lesson.presentation.targetLanguage}</p>
            </div>

            <div className="presentation-box">
              <h3>{language === 'en' ? 'Explanation' : 'Пояснення'}:</h3>
              <p className="explanation">{lesson.presentation.explanation}</p>
            </div>

            {lesson.presentation.examples.length > 0 && (
              <div className="presentation-box">
                <h3>{language === 'en' ? 'Examples' : 'Приклади'}:</h3>
                <ul className="examples-list">
                  {lesson.presentation.examples.map((example, index) => (
                    <li key={index}>✓ {example}</li>
                  ))}
                </ul>
              </div>
            )}

            {lesson.presentation.mediaLinks && lesson.presentation.mediaLinks.length > 0 && (
              <div className="media-links">
                <h3>{language === 'en' ? 'Resources' : 'Ресурси'}:</h3>
                <ul>
                  {lesson.presentation.mediaLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        🔗 {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {currentSection === 'controlled' && (
          <section className="student-section">
            <h2>{language === 'en' ? 'Controlled Practice' : 'Контрольована Практика'}</h2>
            {lesson.controlledPractice.exercises.length === 0 ? (
              <p className="empty-message">
                {language === 'en' ? 'No exercises in this section.' : 'Немає вправ у цьому розділі.'}
              </p>
            ) : (
              <div className="exercises-list">
                {lesson.controlledPractice.exercises.map((exercise, index) => (
                  <StudentExercise
                    key={exercise.id}
                    exercise={exercise}
                    exerciseNumber={index + 1}
                    language={language}
                    progress={getExerciseProgress(exercise.id)}
                    onComplete={(score) => updateExerciseProgress(exercise.id, true, score)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {currentSection === 'free' && (
          <section className="student-section">
            <h2>{language === 'en' ? 'Free Practice' : 'Вільна Практика'}</h2>
            {lesson.freePractice.exercises.length === 0 ? (
              <p className="empty-message">
                {language === 'en' ? 'No exercises in this section.' : 'Немає вправ у цьому розділі.'}
              </p>
            ) : (
              <div className="exercises-list">
                {lesson.freePractice.exercises.map((exercise, index) => (
                  <StudentExercise
                    key={exercise.id}
                    exercise={exercise}
                    exerciseNumber={index + 1}
                    language={language}
                    progress={getExerciseProgress(exercise.id)}
                    onComplete={(score) => updateExerciseProgress(exercise.id, true, score)}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="student-footer">
        <div className="footer-stats">
          <div className="stat">
            <span className="stat-label">{language === 'en' ? 'Completed' : 'Виконано'}:</span>
            <span className="stat-value">{completedCount}/{totalExercises}</span>
          </div>
          {progressPercentage === 100 && (
            <div className="completion-message">
              🎉 {language === 'en' ? 'Lesson Complete!' : 'Урок Завершено!'}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
