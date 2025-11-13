import type { Lesson } from '../types';

interface LessonPreviewProps {
  lesson: Lesson;
  onExport?: () => void;
  onPrint?: () => void;
}

export default function LessonPreview({ lesson, onExport, onPrint }: LessonPreviewProps) {
  const renderExercise = (exercise: Lesson['controlledPractice']['exercises'][0]) => {
    switch (exercise.type) {
      case 'gap-fill':
        return (
          <>
            <p>{exercise.text}</p>
            {exercise.answers.length > 0 && (
              <p><strong>Answers:</strong> {exercise.answers.join(', ')}</p>
            )}
          </>
        );

      case 'sorting':
        return (
          <ul>
            {exercise.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );

      case 'matching':
        return (
          <div className="matching-preview">
            {exercise.pairs.map((pair, i) => (
              <div key={i} className="pair">
                {pair.left} ↔ {pair.right}
              </div>
            ))}
          </div>
        );

      case 'free-text':
        return <p className="prompt">{exercise.prompt}</p>;

      case 'multiple-choice':
        return (
          <>
            <p><strong>Q:</strong> {exercise.question}</p>
            <ol type="A">
              {exercise.options.map((option, i) => (
                <li key={i} className={exercise.correctAnswer === i ? 'correct-answer' : ''}>
                  {option}
                  {exercise.correctAnswer === i && ' ✓'}
                </li>
              ))}
            </ol>
          </>
        );

      case 'true-false':
        return (
          <>
            <p>{exercise.statement}</p>
            {exercise.correctAnswer !== undefined && (
              <p><strong>Answer:</strong> {exercise.correctAnswer ? 'True' : 'False'}</p>
            )}
          </>
        );

      case 'sentence-scramble':
        return (
          <>
            <p><strong>Words to arrange:</strong> {exercise.words.join(' • ')}</p>
            {exercise.correctSentence && (
              <p><strong>Correct sentence:</strong> {exercise.correctSentence}</p>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="lesson-preview">
      <div className="preview-header">
        <h2>Lesson Preview</h2>
        <div className="preview-actions">
          {onExport && (
            <button onClick={onExport} className="export-btn">
              Export JSON
            </button>
          )}
          {onPrint && (
            <button onClick={onPrint} className="print-btn">
              Print Lesson
            </button>
          )}
        </div>
      </div>

      <div className="preview-section">
        <h3>Lesson Information</h3>
        <p><strong>Title:</strong> {lesson.title || 'Untitled Lesson'}</p>
        <p><strong>Structure:</strong> {lesson.structure}</p>
      </div>

      <div className="preview-section">
        <h3>Lead-In</h3>
        <p><strong>{lesson.leadIn.title}</strong></p>
        {lesson.leadIn.duration && (
          <p><strong>Duration:</strong> {lesson.leadIn.duration} minutes</p>
        )}
        <p>{lesson.leadIn.description}</p>
        <div className="content-box">{lesson.leadIn.content}</div>
        {lesson.leadIn.mediaLinks && lesson.leadIn.mediaLinks.length > 0 && (
          <>
            <p><strong>Media Resources:</strong></p>
            <ul>
              {lesson.leadIn.mediaLinks.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </li>
              ))}
            </ul>
          </>
        )}
        {lesson.leadIn.teacherNotes && (
          <div className="teacher-notes">
            <p><strong>Teacher Notes:</strong></p>
            <p>{lesson.leadIn.teacherNotes}</p>
          </div>
        )}
      </div>

      <div className="preview-section">
        <h3>Presentation</h3>
        <p><strong>{lesson.presentation.title}</strong></p>
        {lesson.presentation.duration && (
          <p><strong>Duration:</strong> {lesson.presentation.duration} minutes</p>
        )}
        <p><strong>Target Language:</strong> {lesson.presentation.targetLanguage}</p>
        <div className="content-box">{lesson.presentation.explanation}</div>
        {lesson.presentation.examples.length > 0 && (
          <>
            <p><strong>Examples:</strong></p>
            <ul>
              {lesson.presentation.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </>
        )}
        {lesson.presentation.mediaLinks && lesson.presentation.mediaLinks.length > 0 && (
          <>
            <p><strong>Media Resources:</strong></p>
            <ul>
              {lesson.presentation.mediaLinks.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </li>
              ))}
            </ul>
          </>
        )}
        {lesson.presentation.teacherNotes && (
          <div className="teacher-notes">
            <p><strong>Teacher Notes:</strong></p>
            <p>{lesson.presentation.teacherNotes}</p>
          </div>
        )}
      </div>

      <div className="preview-section">
        <h3>Controlled Practice</h3>
        {lesson.controlledPractice.exercises.length === 0 ? (
          <p className="empty-message">No exercises added yet</p>
        ) : (
          lesson.controlledPractice.exercises.map((exercise, index) => (
            <div key={exercise.id} className="exercise-preview">
              <h4>Exercise {index + 1}: {exercise.type.toUpperCase().replace(/-/g, ' ')}</h4>
              <p><strong>Instructions:</strong> {exercise.instruction}</p>
              {renderExercise(exercise)}
            </div>
          ))
        )}
      </div>

      <div className="preview-section">
        <h3>Free Practice / Production</h3>
        {lesson.freePractice.exercises.length === 0 ? (
          <p className="empty-message">No exercises added yet</p>
        ) : (
          lesson.freePractice.exercises.map((exercise, index) => (
            <div key={exercise.id} className="exercise-preview">
              <h4>Exercise {index + 1}: {exercise.type.toUpperCase().replace(/-/g, ' ')}</h4>
              <p><strong>Instructions:</strong> {exercise.instruction}</p>
              {renderExercise(exercise)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
