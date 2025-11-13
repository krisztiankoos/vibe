import { Lesson } from '../types';

interface LessonPreviewProps {
  lesson: Lesson;
}

export default function LessonPreview({ lesson }: LessonPreviewProps) {
  return (
    <div className="lesson-preview">
      <h2>Lesson Preview</h2>

      <div className="preview-section">
        <h3>Lesson Information</h3>
        <p><strong>Title:</strong> {lesson.title || 'Untitled Lesson'}</p>
        <p><strong>Structure:</strong> {lesson.structure}</p>
      </div>

      <div className="preview-section">
        <h3>Lead-In</h3>
        <p><strong>{lesson.leadIn.title}</strong></p>
        <p>{lesson.leadIn.description}</p>
        <div className="content-box">{lesson.leadIn.content}</div>
      </div>

      <div className="preview-section">
        <h3>Presentation</h3>
        <p><strong>{lesson.presentation.title}</strong></p>
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
      </div>

      <div className="preview-section">
        <h3>Controlled Practice</h3>
        {lesson.controlledPractice.exercises.length === 0 ? (
          <p className="empty-message">No exercises added yet</p>
        ) : (
          lesson.controlledPractice.exercises.map((exercise, index) => (
            <div key={exercise.id} className="exercise-preview">
              <h4>Exercise {index + 1}: {exercise.type.toUpperCase()}</h4>
              <p><strong>Instructions:</strong> {exercise.instruction}</p>

              {exercise.type === 'gap-fill' && (
                <>
                  <p>{exercise.text}</p>
                  {exercise.answers.length > 0 && (
                    <p><strong>Answers:</strong> {exercise.answers.join(', ')}</p>
                  )}
                </>
              )}

              {exercise.type === 'sorting' && (
                <ul>
                  {exercise.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {exercise.type === 'matching' && (
                <div className="matching-preview">
                  {exercise.pairs.map((pair, i) => (
                    <div key={i} className="pair">
                      {pair.left} ↔ {pair.right}
                    </div>
                  ))}
                </div>
              )}

              {exercise.type === 'free-text' && (
                <p className="prompt">{exercise.prompt}</p>
              )}
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
              <h4>Exercise {index + 1}: {exercise.type.toUpperCase()}</h4>
              <p><strong>Instructions:</strong> {exercise.instruction}</p>

              {exercise.type === 'gap-fill' && (
                <>
                  <p>{exercise.text}</p>
                  {exercise.answers.length > 0 && (
                    <p><strong>Answers:</strong> {exercise.answers.join(', ')}</p>
                  )}
                </>
              )}

              {exercise.type === 'sorting' && (
                <ul>
                  {exercise.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {exercise.type === 'matching' && (
                <div className="matching-preview">
                  {exercise.pairs.map((pair, i) => (
                    <div key={i} className="pair">
                      {pair.left} ↔ {pair.right}
                    </div>
                  ))}
                </div>
              )}

              {exercise.type === 'free-text' && (
                <p className="prompt">{exercise.prompt}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
