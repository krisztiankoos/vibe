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
import KeyboardShortcutsHelp from './components/KeyboardShortcutsHelp';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import type { KeyboardShortcut } from './hooks/useKeyboardShortcuts';
import { importLessonFromJSON, exportLessonToJSON, printLesson } from './utils/lessonUtils';
import './App.css';

function App() {
  const [language, setLanguage] = useState<Language | null>(null);
  const [lesson, setLesson] = useState<Lesson>({
    id: crypto.randomUUID(),
    title: '',
    structure: 'PPP',
    leadIn: {
      title: '',
      description: '',
      content: '',
    },
    presentation: {
      title: '',
      targetLanguage: '',
      examples: [],
      explanation: '',
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
  const [showSampleLessons, setShowSampleLessons] = useState(false);
  const [showSavedLessons, setShowSavedLessons] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [studentMode, setStudentMode] = useState(false);
  const [studentLesson, setStudentLesson] = useState<Lesson | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        if (!language) {
          setLanguage('en');
        }
      }
    }
  }, [language]);

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
        structure: 'PPP',
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

  // Define keyboard shortcuts
  const shortcuts: KeyboardShortcut[] = language ? [
    {
      key: 's',
      ctrlKey: true,
      action: saveLesson,
      description: language === 'en' ? 'Save lesson' : 'Зберегти урок',
    },
    {
      key: 'n',
      ctrlKey: true,
      action: handleNewLesson,
      description: language === 'en' ? 'New lesson' : 'Новий урок',
    },
    {
      key: 'l',
      ctrlKey: true,
      action: () => setShowSavedLessons(true),
      description: language === 'en' ? 'Open My Lessons' : 'Відкрити Мої Уроки',
    },
    {
      key: 'k',
      ctrlKey: true,
      action: () => setShowSampleLessons(true),
      description: language === 'en' ? 'Open Sample Lessons' : 'Відкрити Зразки Уроків',
    },
    {
      key: 'e',
      ctrlKey: true,
      action: () => {
        if (currentStep === 'preview') {
          exportLessonToJSON(lesson);
        }
      },
      description: language === 'en' ? 'Export lesson (in preview)' : 'Експортувати урок (у перегляді)',
    },
    {
      key: 'p',
      ctrlKey: true,
      action: () => {
        if (currentStep === 'preview') {
          printLesson();
        }
      },
      description: language === 'en' ? 'Print lesson (in preview)' : 'Друкувати урок (у перегляді)',
    },
    {
      key: '/',
      ctrlKey: true,
      action: () => setShowShortcutsHelp(true),
      description: language === 'en' ? 'Show keyboard shortcuts' : 'Показати клавіатурні скорочення',
    },
    {
      key: 'Escape',
      action: () => {
        if (showSampleLessons) setShowSampleLessons(false);
        else if (showSavedLessons) setShowSavedLessons(false);
        else if (showShortcutsHelp) setShowShortcutsHelp(false);
      },
      description: language === 'en' ? 'Close modal' : 'Закрити модальне вікно',
      preventDefault: false,
    },
  ] : [];

  // Use keyboard shortcuts
  useKeyboardShortcuts(shortcuts, !!language && !studentMode);

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
        {[t.structure, t.leadIn, t.presentation, t.controlled, t.free, t.preview].map((stepLabel, index) => (
          <div
            key={steps[index]}
            className={`progress-step ${index <= currentStepIndex ? 'active' : ''} ${index === currentStepIndex ? 'current' : ''}`}
          >
            {stepLabel}
          </div>
        ))}
      </div>

      <main className="app-main">
        {currentStep === 'structure' && (
          <div className="step-content">
            <h2>{t.chooseStructure}</h2>
            <div className="structure-selection">
              <div
                className={`structure-card ${lesson.structure === 'PPP' ? 'selected' : ''}`}
                onClick={() => updateLesson({ structure: 'PPP' })}
              >
                <h3>{t.pppTitle}</h3>
                <p>{t.pppDescription}</p>
                <ul>
                  <li>{t.pppStep1}</li>
                  <li>{t.pppStep2}</li>
                  <li>{t.pppStep3}</li>
                </ul>
              </div>
              <div
                className={`structure-card ${lesson.structure === 'TTT' ? 'selected' : ''}`}
                onClick={() => updateLesson({ structure: 'TTT' })}
              >
                <h3>{t.tttTitle}</h3>
                <p>{t.tttDescription}</p>
                <ul>
                  <li>{t.tttStep1}</li>
                  <li>{t.tttStep2}</li>
                  <li>{t.tttStep3}</li>
                </ul>
              </div>
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
          />
        )}

        {currentStep === 'presentation' && (
          <PresentationForm
            presentation={lesson.presentation}
            onChange={(presentation) => updateLesson({ presentation })}
            language={language}
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
          </div>
        )}

        {currentStep === 'preview' && (
          <LessonPreview
            lesson={lesson}
            onExport={() => exportLessonToJSON(lesson)}
            onPrint={printLesson}
            language={language}
          />
        )}
      </main>

      <footer className="app-footer">
        <button
          onClick={() => setCurrentStep(steps[Math.max(0, currentStepIndex - 1)] as any)}
          disabled={currentStepIndex === 0}
        >
          {t.previous}
        </button>
        {currentStep !== 'preview' && (
          <button
            onClick={() => setCurrentStep(steps[currentStepIndex + 1] as any)}
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
        <div className="keyboard-shortcuts-indicator">
          <button
            onClick={() => setShowShortcutsHelp(true)}
            className="shortcuts-btn"
            title={language === 'en' ? 'Keyboard shortcuts' : 'Клавіатурні скорочення'}
          >
            ⌨️ {language === 'en' ? 'Shortcuts' : 'Скорочення'} <kbd>Ctrl+/</kbd>
          </button>
        </div>
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

      {showShortcutsHelp && (
        <KeyboardShortcutsHelp
          language={language}
          shortcuts={shortcuts}
          onClose={() => setShowShortcutsHelp(false)}
        />
      )}
    </div>
  );
}

export default App;
