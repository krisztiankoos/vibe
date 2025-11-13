import { useState } from 'react';
import { Lesson, LessonStructure, Exercise, ExerciseType } from './types';
import LeadInForm from './components/LeadInForm';
import PresentationForm from './components/PresentationForm';
import ExerciseBuilder from './components/ExerciseBuilder';
import LessonPreview from './components/LessonPreview';
import './App.css';

function App() {
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
    alert('Lesson saved successfully!');
  };

  const steps = ['structure', 'lead-in', 'presentation', 'controlled', 'free', 'preview'];
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className="app">
      <header className="app-header">
        <h1>English Lesson Builder</h1>
        <p>Create engaging lessons following PPP & TTT methodologies</p>
      </header>

      <div className="progress-bar">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`progress-step ${index <= currentStepIndex ? 'active' : ''} ${index === currentStepIndex ? 'current' : ''}`}
          >
            {step.replace('-', ' ').toUpperCase()}
          </div>
        ))}
      </div>

      <main className="app-main">
        {currentStep === 'structure' && (
          <div className="step-content">
            <h2>Choose Lesson Structure</h2>
            <div className="structure-selection">
              <div
                className={`structure-card ${lesson.structure === 'PPP' ? 'selected' : ''}`}
                onClick={() => updateLesson({ structure: 'PPP' })}
              >
                <h3>PPP</h3>
                <p>Presentation → Practice → Production</p>
                <ul>
                  <li>Present new language</li>
                  <li>Practice with controlled activities</li>
                  <li>Produce with free practice</li>
                </ul>
              </div>
              <div
                className={`structure-card ${lesson.structure === 'TTT' ? 'selected' : ''}`}
                onClick={() => updateLesson({ structure: 'TTT' })}
              >
                <h3>TTT</h3>
                <p>Test → Teach → Test</p>
                <ul>
                  <li>Test students' existing knowledge</li>
                  <li>Teach the target language</li>
                  <li>Test again to measure progress</li>
                </ul>
              </div>
            </div>
            <div className="form-group">
              <label>Lesson Title</label>
              <input
                type="text"
                value={lesson.title}
                onChange={(e) => updateLesson({ title: e.target.value })}
                placeholder="e.g., Present Perfect Tense"
              />
            </div>
          </div>
        )}

        {currentStep === 'lead-in' && (
          <LeadInForm
            leadIn={lesson.leadIn}
            onChange={(leadIn) => updateLesson({ leadIn })}
          />
        )}

        {currentStep === 'presentation' && (
          <PresentationForm
            presentation={lesson.presentation}
            onChange={(presentation) => updateLesson({ presentation })}
          />
        )}

        {currentStep === 'controlled' && (
          <div className="step-content">
            <h2>Controlled Practice</h2>
            <p>Add exercises where students practice the target language with guidance</p>
            <ExerciseBuilder
              onAddExercise={(exercise) => addExercise('controlled', exercise)}
            />
            <div className="exercises-list">
              {lesson.controlledPractice.exercises.map((exercise) => (
                <div key={exercise.id} className="exercise-item">
                  <h4>{exercise.type.toUpperCase()}</h4>
                  <p>{exercise.instruction}</p>
                  <button onClick={() => removeExercise('controlled', exercise.id)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'free' && (
          <div className="step-content">
            <h2>Free Practice / Production</h2>
            <p>Add exercises where students use the language more freely</p>
            <ExerciseBuilder
              onAddExercise={(exercise) => addExercise('free', exercise)}
            />
            <div className="exercises-list">
              {lesson.freePractice.exercises.map((exercise) => (
                <div key={exercise.id} className="exercise-item">
                  <h4>{exercise.type.toUpperCase()}</h4>
                  <p>{exercise.instruction}</p>
                  <button onClick={() => removeExercise('free', exercise.id)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'preview' && (
          <LessonPreview lesson={lesson} />
        )}
      </main>

      <footer className="app-footer">
        <button
          onClick={() => setCurrentStep(steps[Math.max(0, currentStepIndex - 1)] as any)}
          disabled={currentStepIndex === 0}
        >
          Previous
        </button>
        {currentStep !== 'preview' && (
          <button
            onClick={() => setCurrentStep(steps[currentStepIndex + 1] as any)}
          >
            Next
          </button>
        )}
        {currentStep === 'preview' && (
          <button onClick={saveLesson} className="save-button">
            Save Lesson
          </button>
        )}
      </footer>
    </div>
  );
}

export default App;
