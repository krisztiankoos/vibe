import type { Lesson } from '../types';
import type { Language } from '../translations';
import { getTranslation } from '../translations';

interface LessonPreviewProps {
  lesson: Lesson;
  onExport?: () => void;
  onPrint?: () => void;
  language: Language;
}

export default function LessonPreview({ lesson, onExport, onPrint, language }: LessonPreviewProps) {
  const t = getTranslation(language);
  const renderExercise = (exercise: Lesson['controlledPractice']['exercises'][0]) => {
    switch (exercise.type) {
      case 'gap-fill':
        return (
          <>
            <p>{exercise.text}</p>
            {exercise.answers.length > 0 && (
              <p><strong>{t.answers}:</strong> {exercise.answers.join(', ')}</p>
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
            <p><strong>{t.question}:</strong> {exercise.question}</p>
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
              <p><strong>{t.answers}:</strong> {exercise.correctAnswer ? t.trueLabel : t.falseLabel}</p>
            )}
          </>
        );

      case 'sentence-scramble':
        return (
          <>
            <p><strong>{t.wordsToArrange}:</strong> {exercise.words.join(' • ')}</p>
            {exercise.correctSentence && (
              <p><strong>{t.correctSentence}:</strong> {exercise.correctSentence}</p>
            )}
          </>
        );

      case 'information-gap':
        return (
          <>
            <p><strong>{t.scenario}:</strong> {exercise.scenario}</p>
            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
              <p><strong>{t.studentAInfo}:</strong></p>
              <p>{exercise.studentAInfo}</p>
            </div>
            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#fff3e0', borderRadius: '5px' }}>
              <p><strong>{t.studentBInfo}:</strong></p>
              <p>{exercise.studentBInfo}</p>
            </div>
            {exercise.targetLanguage && (
              <p style={{ marginTop: '10px' }}><strong>{t.targetLanguageOptional}:</strong> {exercise.targetLanguage}</p>
            )}
          </>
        );

      case 'role-play':
        return (
          <>
            <p><strong>{t.scenario}:</strong> {exercise.scenario}</p>
            <div style={{ marginTop: '10px' }}>
              <p><strong>{t.roles}:</strong></p>
              {exercise.roles.map((role, i) => (
                <div key={i} style={{ padding: '10px', marginBottom: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                  <p><strong>{role.name}:</strong> {role.description}</p>
                </div>
              ))}
            </div>
            {exercise.targetLanguage && (
              <p style={{ marginTop: '10px' }}><strong>{t.targetLanguageOptional}:</strong> {exercise.targetLanguage}</p>
            )}
            {exercise.duration && (
              <p><strong>{t.duration}:</strong> {exercise.duration} minutes</p>
            )}
          </>
        );

      case 'collocation':
        return (
          <>
            {exercise.exerciseFormat && (
              <p><strong>{t.exerciseFormat}:</strong> {t[`format${exercise.exerciseFormat.charAt(0).toUpperCase() + exercise.exerciseFormat.slice(1)}` as keyof typeof t]}</p>
            )}
            <div style={{ marginTop: '10px' }}>
              {exercise.collocations.map((col, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <strong>{col.word}:</strong> {col.partners.join(', ')}
                </div>
              ))}
            </div>
          </>
        );

      case 'lexical-set':
        return (
          <>
            <p><strong>{t.topic}:</strong> {exercise.topic}</p>
            {exercise.context && (
              <p style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                <strong>{t.contextOptional}:</strong> {exercise.context}
              </p>
            )}
            <div style={{ marginTop: '10px' }}>
              <p><strong>{t.lexicalChunks}:</strong></p>
              <ul>
                {exercise.chunks.map((chunk, i) => (
                  <li key={i}>{chunk}</li>
                ))}
              </ul>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="lesson-preview">
      <div className="preview-header">
        <h2>{t.lessonPreview}</h2>
        <div className="preview-actions">
          {onExport && (
            <button onClick={onExport} className="export-btn">
              {t.exportJSON}
            </button>
          )}
          {onPrint && (
            <button onClick={onPrint} className="print-btn">
              {t.printLesson}
            </button>
          )}
        </div>
      </div>

      <div className="preview-section">
        <h3>{t.lessonInformation}</h3>
        <p><strong>{t.lessonTitle}:</strong> {lesson.title || 'Untitled Lesson'}</p>
        <p><strong>{t.structure}:</strong> {lesson.structure}</p>
      </div>

      <div className="preview-section">
        <h3>{t.leadIn}</h3>
        <p><strong>{lesson.leadIn.title}</strong></p>
        {lesson.leadIn.duration && (
          <p><strong>{t.duration}:</strong> {lesson.leadIn.duration} minutes</p>
        )}
        <p>{lesson.leadIn.description}</p>
        <div className="content-box">{lesson.leadIn.content}</div>
        {lesson.leadIn.mediaLinks && lesson.leadIn.mediaLinks.length > 0 && (
          <>
            <p><strong>{t.mediaResources}:</strong></p>
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
            <p><strong>{t.teacherNotes}:</strong></p>
            <p>{lesson.leadIn.teacherNotes}</p>
          </div>
        )}
      </div>

      <div className="preview-section">
        <h3>{t.presentation}</h3>
        <p><strong>{lesson.presentation.title}</strong></p>
        {lesson.presentation.duration && (
          <p><strong>{t.duration}:</strong> {lesson.presentation.duration} minutes</p>
        )}
        <p><strong>{t.targetLanguage}:</strong> {lesson.presentation.targetLanguage}</p>
        <div className="content-box">
          {typeof lesson.presentation.explanation === 'string'
            ? lesson.presentation.explanation
            : `${lesson.presentation.explanation.uk}\n\n---\n\n${lesson.presentation.explanation.en}`}
        </div>
        {lesson.presentation.examples.length > 0 && (
          <>
            <p><strong>{t.examples}:</strong></p>
            <ul>
              {lesson.presentation.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </>
        )}
        {lesson.presentation.mediaLinks && lesson.presentation.mediaLinks.length > 0 && (
          <>
            <p><strong>{t.mediaResources}:</strong></p>
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
            <p><strong>{t.teacherNotes}:</strong></p>
            <p>{lesson.presentation.teacherNotes}</p>
          </div>
        )}
      </div>

      <div className="preview-section">
        <h3>{t.controlled}</h3>
        {lesson.controlledPractice.exercises.length === 0 ? (
          <p className="empty-message">{t.noExercises}</p>
        ) : (
          lesson.controlledPractice.exercises.map((exercise, index) => (
            <div key={exercise.id} className="exercise-preview">
              <h4>Exercise {index + 1}: {exercise.type.toUpperCase().replace(/-/g, ' ')}</h4>
              <p><strong>{t.instructionsForStudents}:</strong> {exercise.instruction}</p>
              {renderExercise(exercise)}
            </div>
          ))
        )}
      </div>

      <div className="preview-section">
        <h3>{t.free}</h3>
        {lesson.freePractice.exercises.length === 0 ? (
          <p className="empty-message">{t.noExercises}</p>
        ) : (
          lesson.freePractice.exercises.map((exercise, index) => (
            <div key={exercise.id} className="exercise-preview">
              <h4>Exercise {index + 1}: {exercise.type.toUpperCase().replace(/-/g, ' ')}</h4>
              <p><strong>{t.instructionsForStudents}:</strong> {exercise.instruction}</p>
              {renderExercise(exercise)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
