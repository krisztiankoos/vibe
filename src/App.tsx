import { useState, useRef, useEffect } from 'react';
import type { Lesson, Exercise } from './types';
import type { Language } from './translations';
import { getTranslation } from './translations';
import LanguageSelector from './components/LanguageSelector';
import LeadInForm from './components/LeadInForm';
import PresentationForm from './components/PresentationForm';
import ExerciseBuilder from './components/ExerciseBuilder';
import LessonPreview from './components/LessonPreview';
import SampleLessons from './components/SampleLessons';
import SavedLessons from './components/SavedLessons';
import StudentLessonView from './components/StudentLessonView';
import { importLessonFromJSON, exportLessonToJSON, printLesson } from './utils/lessonUtils';
import './App.css';

function App() {
  const [language, setLanguage] = useState<Language | null>(null);
  const [lesson, setLesson] = useState<Lesson>({
    id: crypto.randomUUID(),
    title: '',
    structure: language === 'en' ? 'PPP' : 'GPPC',
    leadIn: {
      title: '',
      description: '',
      content: '',
      mediaLinks: [],
    },
    presentation: {
      title: '',
      targetLanguage: '',
      examples: [],
      explanation: '',
      mediaLinks: [],
    },
    controlledPractice: {
      type: 'controlled',
      exercises: [],
    },
    freePractice: {
      type: 'free',
      exercises: [],
    },
    createdAt: new Date().toISOString(),
  });

  const [currentStep, setCurrentStep] = useState<'structure' | 'lead-in' | 'presentation' | 'controlled' | 'free' | 'preview'>('structure');
  const [visitedSteps, setVisitedSteps] = useState<Set<string>>(new Set(['structure']));
  const [showSampleLessons, setShowSampleLessons] = useState(false);
  const [showSavedLessons, setShowSavedLessons] = useState(false);
  const [studentMode, setStudentMode] = useState(false);
  const [studentLesson, setStudentLesson] = useState<Lesson | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save lesson to localStorage every 30 seconds
  useEffect(() => {
    if (!lesson.title) return; // Don't auto-save empty lessons

    const autoSaveInterval = setInterval(() => {
      const autoSaveKey = `autosave-${lesson.id}`;
      localStorage.setItem(autoSaveKey, JSON.stringify(lesson));
    }, 30000); // 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [lesson]);

  // Check URL parameters for shared lesson
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedLessonId = params.get('lesson');
    const mode = params.get('mode');

    if (sharedLessonId && mode === 'student') {
      // Load lesson from localStorage
      const lessons = JSON.parse(localStorage.getItem('lessons') || '[]');
      const shared = lessons.find((l: Lesson) => l.id === sharedLessonId);

      if (shared) {
        setStudentLesson(shared);
        setStudentMode(true);
        // Auto-select language based on lesson or default to English
        setLanguage(prev => prev || 'en');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show student view if in student mode
  if (studentMode && studentLesson && language) {
    return (
      <StudentLessonView
        lesson={studentLesson}
        language={language}
        onExit={() => {
          setStudentMode(false);
          setStudentLesson(null);
          // Clear URL params
          window.history.replaceState({}, '', window.location.pathname);
        }}
      />
    );
  }

  // Show language selector if no language selected
  if (!language) {
    return <LanguageSelector onSelectLanguage={setLanguage} />;
  }

  const t = getTranslation(language);

  // Navigation functions
  const navigateToStep = (step: typeof currentStep) => {
    setCurrentStep(step);
    setVisitedSteps(prev => new Set([...prev, step]));
  };

  const goToNextStep = () => {
    const steps = ['structure', 'lead-in', 'presentation', 'controlled', 'free', 'preview'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1] as typeof currentStep;
      navigateToStep(nextStep);
    }
  };

  const goToPreviousStep = () => {
    const steps = ['structure', 'lead-in', 'presentation', 'controlled', 'free', 'preview'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1] as typeof currentStep;
      setCurrentStep(prevStep);
    }
  };

  const skipStep = () => {
    goToNextStep();
  };

  const updateLesson = (updates: Partial<Lesson>) => {
    setLesson((prev) => ({ ...prev, ...updates }));
  };

  const addExercise = (practiceType: 'controlled' | 'free', exercise: Exercise) => {
    setLesson((prev) => ({
      ...prev,
      [`${practiceType}Practice`]: {
        ...prev[`${practiceType}Practice`],
        exercises: [...prev[`${practiceType}Practice`].exercises, exercise],
      },
    }));
  };

  const removeExercise = (practiceType: 'controlled' | 'free', exerciseId: string) => {
    setLesson((prev) => ({
      ...prev,
      [`${practiceType}Practice`]: {
        ...prev[`${practiceType}Practice`],
        exercises: prev[`${practiceType}Practice`].exercises.filter((ex) => ex.id !== exerciseId),
      },
    }));
  };

  const saveLesson = () => {
    const lessons = JSON.parse(localStorage.getItem('lessons') || '[]');
    const existingIndex = lessons.findIndex((l: Lesson) => l.id === lesson.id);

    if (existingIndex >= 0) {
      lessons[existingIndex] = lesson;
    } else {
      lessons.push(lesson);
    }

    localStorage.setItem('lessons', JSON.stringify(lessons));
    alert(t.lessonSaved);
  };

  const handleImportLesson = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedLesson = await importLessonFromJSON(file);
      setLesson(importedLesson);
      setCurrentStep('preview');
      alert(t.lessonImported);
    } catch (error) {
      alert(t.importFailed);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNewLesson = () => {
    if (confirm(t.createNewLesson)) {
      setLesson({
        id: crypto.randomUUID(),
        title: '',
        structure: language === 'en' ? 'PPP' : 'GPPC',
        leadIn: { title: '', description: '', content: '' },
        presentation: { title: '', targetLanguage: '', examples: [], explanation: '' },
        controlledPractice: { type: 'controlled', exercises: [] },
        freePractice: { type: 'free', exercises: [] },
        createdAt: new Date().toISOString(),
      });
      setCurrentStep('structure');
    }
  };

  const handleLoadSample = (sampleLesson: Lesson) => {
    setLesson(sampleLesson);
    setCurrentStep('preview');
  };

  const handleDuplicateLesson = (lessonToDuplicate: Lesson) => {
    const duplicated: Lesson = {
      ...lessonToDuplicate,
      id: crypto.randomUUID(),
      title: `${lessonToDuplicate.title} (${language === 'en' ? 'Copy' : 'Копія'})`,
      createdAt: new Date().toISOString(),
    };
    setLesson(duplicated);
    setCurrentStep('preview');
  };

  const handleShareLesson = () => {
    // First save the lesson
    const lessons = JSON.parse(localStorage.getItem('lessons') || '[]');
    const existingIndex = lessons.findIndex((l: Lesson) => l.id === lesson.id);

    if (existingIndex >= 0) {
      lessons[existingIndex] = lesson;
    } else {
      lessons.push(lesson);
    }

    localStorage.setItem('lessons', JSON.stringify(lessons));

    // Generate shareable URL
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?lesson=${lesson.id}&mode=student`;

    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert(
        language === 'en'
          ? `Share link copied to clipboard!\n\nStudents can use this link to access the lesson:\n${shareUrl}`
          : `Посилання для обміну скопійовано в буфер обміну!\n\nСтуденти можуть використовувати це посилання для доступу до уроку:\n${shareUrl}`
      );
    }).catch(() => {
      // Fallback: show the URL in a prompt
      prompt(
        language === 'en' ? 'Copy this link to share with students:' : 'Скопіюйте це посилання, щоб поділитися зі студентами:',
        shareUrl
      );
    });
  };

  const steps = ['structure', 'lead-in', 'presentation', 'controlled', 'free', 'preview'];
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>{t.appTitle}</h1>
            <p>{t.appSubtitle}</p>
          </div>
          <div className="header-actions">
            <button onClick={() => setLanguage(null)} className="header-btn">{t.changeLanguage}</button>
            <button onClick={handleNewLesson} className="header-btn">{t.newLesson}</button>
            <button onClick={() => setShowSavedLessons(true)} className="header-btn">💾 {language === 'en' ? 'My Lessons' : 'Мої Уроки'}</button>
            <button onClick={() => setShowSampleLessons(true)} className="header-btn">📚 {language === 'en' ? 'Sample Lessons' : 'Зразки Уроків'}</button>
            <button onClick={() => fileInputRef.current?.click()} className="header-btn">{t.importJSON}</button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportLesson}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </header>

      <div className="progress-bar">
        {(() => {
          // Context-aware phase labels based on structure
          let phaseLabels: string[];

          if (lesson.structure === 'GPPC') {
            phaseLabels = [t.structure, t.topicIntroduction, t.grammarPresentation, t.controlledPracticePhase, t.communicativePractice, t.preview];
          } else if (lesson.structure === 'CEFR') {
            phaseLabels = [t.structure, t.taskIntroduction, t.preparation, t.taskExecution, t.reflectionAndLanguageFocus, t.preview];
          } else {
            // PPP and TTT use default labels
            phaseLabels = [t.structure, t.leadIn, t.presentation, t.controlled, t.free, t.preview];
          }

          return phaseLabels.map((stepLabel, index) => {
            const step = steps[index] as typeof currentStep;
            const isVisited = visitedSteps.has(step);
            const isClickable = isVisited || index <= currentStepIndex + 1; // Can click visited or next step

            return (
              <div
                key={step}
                className={`progress-step ${index <= currentStepIndex ? 'active' : ''} ${index === currentStepIndex ? 'current' : ''} ${isClickable ? 'clickable' : ''}`}
                onClick={() => isClickable && navigateToStep(step)}
                style={{ cursor: isClickable ? 'pointer' : 'not-allowed' }}
              >
                {stepLabel}
              </div>
            );
          });
        })()}
      </div>

      <main className="app-main">
        {currentStep === 'structure' && (
          <div className="step-content">
            <h2>{t.chooseStructure}</h2>

            {/* Methodology explanation banner */}
            <div className="methodology-info">
              <p className="methodology-note">
                {language === 'en' ? t.eslMethodologyNote : t.uflMethodologyNote}
              </p>
            </div>

            <div className="structure-selection">
              {/* English structures: PPP and TTT */}
              {language === 'en' && (
                <>
                  <div
                    className={`structure-card PPP ${lesson.structure === 'PPP' ? 'selected' : ''}`}
                    onClick={() => updateLesson({ structure: 'PPP' })}
                  >
                    <div className="structure-header">
                      <h3>{t.pppTitle}</h3>
                      <span className="structure-badge">ESL Method</span>
                    </div>
                    <p className="structure-description">{t.pppFullDescription}</p>
                    <div className="structure-phases">
                      <strong>{t.phases}:</strong>
                      <ol>
                        <li>{t.pppStep1}</li>
                        <li>{t.pppStep2}</li>
                        <li>{t.pppStep3}</li>
                      </ol>
                    </div>
                    <p className="structure-best-for">
                      <strong>{t.bestFor}:</strong> {t.pppBestFor}
                    </p>
                  </div>

                  <div
                    className={`structure-card TTT ${lesson.structure === 'TTT' ? 'selected' : ''}`}
                    onClick={() => updateLesson({ structure: 'TTT' })}
                  >
                    <div className="structure-header">
                      <h3>{t.tttTitle}</h3>
                      <span className="structure-badge">ESL Method</span>
                    </div>
                    <p className="structure-description">{t.tttFullDescription}</p>
                    <div className="structure-phases">
                      <strong>{t.phases}:</strong>
                      <ol>
                        <li>{t.tttStep1}</li>
                        <li>{t.tttStep2}</li>
                        <li>{t.tttStep3}</li>
                      </ol>
                    </div>
                    <p className="structure-best-for">
                      <strong>{t.bestFor}:</strong> {t.tttBestFor}
                    </p>
                  </div>
                </>
              )}

              {/* Ukrainian structures: GPPC and CEFR */}
              {language === 'uk' && (
                <>
                  <div
                    className={`structure-card GPPC ${lesson.structure === 'GPPC' ? 'selected' : ''}`}
                    onClick={() => updateLesson({ structure: 'GPPC' })}
                  >
                    <div className="structure-header">
                      <h3>{t.gppcTitle}</h3>
                      <span className="structure-badge">УІМ Метод</span>
                    </div>
                    <p className="structure-description">{t.gppcFullDescription}</p>
                    <div className="structure-phases">
                      <strong>{t.phases}:</strong>
                      <ol>
                        <li>{t.gppcStep1}</li>
                        <li>{t.gppcStep2}</li>
                        <li>{t.gppcStep3}</li>
                        <li>{t.gppcStep4}</li>
                      </ol>
                    </div>
                    <p className="structure-best-for">
                      <strong>{t.bestFor}:</strong> {t.gppcBestFor}
                    </p>
                  </div>

                  <div
                    className={`structure-card CEFR ${lesson.structure === 'CEFR' ? 'selected' : ''}`}
                    onClick={() => updateLesson({ structure: 'CEFR' })}
                  >
                    <div className="structure-header">
                      <h3>{t.cefrTitle}</h3>
                      <span className="structure-badge">УІМ Метод</span>
                    </div>
                    <p className="structure-description">{t.cefrFullDescription}</p>
                    <div className="structure-phases">
                      <strong>{t.phases}:</strong>
                      <ol>
                        <li>{t.cefrStep1}</li>
                        <li>{t.cefrStep2}</li>
                        <li>{t.cefrStep3}</li>
                        <li>{t.cefrStep4}</li>
                      </ol>
                    </div>
                    <p className="structure-best-for">
                      <strong>{t.bestFor}:</strong> {t.cefrBestFor}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="form-group">
              <label>{t.lessonTitle}</label>
              <input
                type="text"
                value={lesson.title}
                onChange={(e) => updateLesson({ title: e.target.value })}
                placeholder={t.lessonTitlePlaceholder}
              />
            </div>
          </div>
        )}

        {currentStep === 'lead-in' && (
          <LeadInForm
            leadIn={lesson.leadIn}
            onChange={(leadIn) => updateLesson({ leadIn })}
            language={language}
            onBack={goToPreviousStep}
            onSkip={skipStep}
          />
        )}

        {currentStep === 'presentation' && (
          <PresentationForm
            presentation={lesson.presentation}
            onChange={(presentation) => updateLesson({ presentation })}
            language={language}
            cefrLevel={lesson.cefrLevel}
            onCefrLevelChange={(cefrLevel) => updateLesson({ cefrLevel })}
            onBack={goToPreviousStep}
            onSkip={skipStep}
          />
        )}

        {currentStep === 'controlled' && (
          <div className="step-content">
            <h2>{t.controlledPracticeTitle}</h2>
            <p>{t.controlledPracticeSubtitle}</p>
            <ExerciseBuilder
              onAddExercise={(exercise) => addExercise('controlled', exercise)}
              language={language}
            />
            <div className="exercises-list">
              {lesson.controlledPractice.exercises.map((exercise) => (
                <div key={exercise.id} className="exercise-item">
                  <h4>{exercise.type.toUpperCase()}</h4>
                  <p>{exercise.instruction}</p>
                  <button onClick={() => removeExercise('controlled', exercise.id)}>{t.remove}</button>
                </div>
              ))}
            </div>

            <div className="form-navigation" style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
              <button type="button" onClick={goToPreviousStep} className="btn-secondary">
                ← {language === 'en' ? 'Back' : 'Назад'}
              </button>
              <button type="button" onClick={skipStep} className="btn-secondary">
                {language === 'en' ? 'Skip' : 'Пропустити'} →
              </button>
            </div>
          </div>
        )}

        {currentStep === 'free' && (
          <div className="step-content">
            <h2>{t.freePracticeTitle}</h2>
            <p>{t.freePracticeSubtitle}</p>
            <ExerciseBuilder
              onAddExercise={(exercise) => addExercise('free', exercise)}
              language={language}
            />
            <div className="exercises-list">
              {lesson.freePractice.exercises.map((exercise) => (
                <div key={exercise.id} className="exercise-item">
                  <h4>{exercise.type.toUpperCase()}</h4>
                  <p>{exercise.instruction}</p>
                  <button onClick={() => removeExercise('free', exercise.id)}>{t.remove}</button>
                </div>
              ))}
            </div>

            <div className="form-navigation" style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
              <button type="button" onClick={goToPreviousStep} className="btn-secondary">
                ← {language === 'en' ? 'Back' : 'Назад'}
              </button>
              <button type="button" onClick={skipStep} className="btn-secondary">
                {language === 'en' ? 'Skip' : 'Пропустити'} →
              </button>
            </div>
          </div>
        )}

        {currentStep === 'preview' && (
          <LessonPreview
            lesson={lesson}
            onExport={() => exportLessonToJSON(lesson)}
            onPrint={printLesson}
            language={language}
            onEdit={navigateToStep}
          />
        )}
      </main>

      <footer className="app-footer">
        <button
          onClick={goToPreviousStep}
          disabled={currentStepIndex === 0}
        >
          {t.previous}
        </button>
        {currentStep !== 'preview' && (
          <button
            onClick={goToNextStep}
          >
            {t.next}
          </button>
        )}
        {currentStep === 'preview' && (
          <>
            <button onClick={handleShareLesson} className="share-button" style={{ background: '#ff9800' }}>
              🔗 {language === 'en' ? 'Share with Students' : 'Поділитися зі Студентами'}
            </button>
            <button onClick={saveLesson} className="save-button">
              {t.saveLesson}
            </button>
          </>
        )}
      </footer>

      {showSampleLessons && (
        <SampleLessons
          onLoadSample={handleLoadSample}
          language={language}
          onClose={() => setShowSampleLessons(false)}
        />
      )}

      {showSavedLessons && (
        <SavedLessons
          language={language}
          onClose={() => setShowSavedLessons(false)}
          onLoadLesson={handleLoadSample}
          onDuplicateLesson={handleDuplicateLesson}
        />
      )}
    </div>
  );
}

export default App;
