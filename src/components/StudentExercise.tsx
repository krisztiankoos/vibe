import { useState } from 'react';
import type { Exercise } from '../types';
import type { Language } from '../translations';

interface StudentExerciseProps {
  exercise: Exercise;
  exerciseNumber: number;
  language: Language;
  progress?: { completed: boolean; score?: number; attempts: number };
  onComplete: (score: number) => void;
}

export default function StudentExercise({ exercise, exerciseNumber, language, progress, onComplete }: StudentExerciseProps) {
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<any>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setSubmitted(true);
    onComplete(calculatedScore);
  };

  const handleReset = () => {
    setSubmitted(false);
    setAnswers(null);
    setScore(null);
  };

  const calculateScore = (): number => {
    switch (exercise.type) {
      case 'gap-fill':
        if (!answers) return 0;
        const gapFillAnswers = answers as string[];
        const correctAnswers = exercise.answers || [];
        const correct = gapFillAnswers.filter((ans, idx) =>
          ans.trim().toLowerCase() === correctAnswers[idx]?.toLowerCase()
        ).length;
        return Math.round((correct / correctAnswers.length) * 100);

      case 'multiple-choice':
        if (answers === null || answers === undefined) return 0;
        return answers === exercise.correctAnswer ? 100 : 0;

      case 'true-false':
        if (answers === null || answers === undefined) return 0;
        return answers === exercise.correctAnswer ? 100 : 0;

      case 'matching':
        // For matching, we'll just mark as completed
        return 100;

      case 'sentence-scramble':
        if (!answers) return 0;
        const studentSentence = (answers as string[]).join(' ');
        const correctSentence = exercise.correctSentence || '';
        return studentSentence.toLowerCase().trim() === correctSentence.toLowerCase().trim() ? 100 : 0;

      case 'free-text':
      case 'information-gap':
      case 'role-play':
        // These don't have automatic grading
        return answers && answers.length > 0 ? 100 : 0;

      default:
        return 100;
    }
  };

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case 'gap-fill':
        return <GapFillExercise exercise={exercise} answers={answers} setAnswers={setAnswers} submitted={submitted} language={language} />;
      case 'multiple-choice':
        return <MultipleChoiceExercise exercise={exercise} answer={answers} setAnswer={setAnswers} submitted={submitted} language={language} />;
      case 'true-false':
        return <TrueFalseExercise exercise={exercise} answer={answers} setAnswer={setAnswers} submitted={submitted} language={language} />;
      case 'matching':
        return <MatchingExercise exercise={exercise} submitted={submitted} language={language} />;
      case 'sorting':
        return <SortingExercise exercise={exercise} submitted={submitted} language={language} />;
      case 'sentence-scramble':
        return <SentenceScrambleExercise exercise={exercise} answers={answers} setAnswers={setAnswers} submitted={submitted} language={language} />;
      case 'free-text':
        return <FreeTextExercise exercise={exercise} answer={answers} setAnswer={setAnswers} language={language} />;
      case 'information-gap':
        return <InformationGapExercise exercise={exercise} language={language} />;
      case 'role-play':
        return <RolePlayExercise exercise={exercise} language={language} />;
      case 'collocation':
        return <CollocationExercise exercise={exercise} language={language} />;
      case 'lexical-set':
        return <LexicalSetExercise exercise={exercise} language={language} />;
      default:
        return <p>Exercise type not yet supported</p>;
    }
  };

  const canSubmit = () => {
    if (submitted) return false;

    switch (exercise.type) {
      case 'gap-fill':
        return answers && answers.length > 0;
      case 'multiple-choice':
      case 'true-false':
        return answers !== null && answers !== undefined;
      case 'sentence-scramble':
        return answers && answers.length > 0;
      case 'free-text':
        return answers && answers.trim().length > 0;
      case 'information-gap':
      case 'role-play':
      case 'matching':
      case 'sorting':
      case 'collocation':
      case 'lexical-set':
        return true; // These are self-check exercises
      default:
        return false;
    }
  };

  return (
    <div className={`student-exercise ${progress?.completed ? 'completed' : ''}`}>
      <div className="exercise-header">
        <h3>
          {language === 'en' ? 'Exercise' : 'Вправа'} {exerciseNumber}
          {progress?.completed && <span className="completed-badge">✓</span>}
        </h3>
        {progress && progress.attempts > 0 && (
          <span className="attempts-badge">
            {language === 'en' ? 'Attempts' : 'Спроби'}: {progress.attempts}
          </span>
        )}
      </div>

      <p className="exercise-instruction">{exercise.instruction}</p>

      <div className="exercise-content">
        {renderExerciseContent()}
      </div>

      {score !== null && (
        <div className={`score-display ${score >= 70 ? 'pass' : 'fail'}`}>
          {language === 'en' ? 'Score' : 'Оцінка'}: {score}%
          {score >= 70 ? ' ✓' : ' ✗'}
        </div>
      )}

      <div className="exercise-actions">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit()}
            className="btn-submit"
          >
            {language === 'en' ? 'Submit' : 'Надіслати'}
          </button>
        ) : (
          <button onClick={handleReset} className="btn-retry">
            {language === 'en' ? 'Try Again' : 'Спробувати Знову'}
          </button>
        )}
      </div>
    </div>
  );
}

// Individual exercise type components

function GapFillExercise({ exercise, answers, setAnswers, submitted, language }: any) {
  const gaps = exercise.text.match(/____/g)?.length || 0;
  const [gapAnswers, setGapAnswers] = useState<string[]>(answers || Array(gaps).fill(''));

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...gapAnswers];
    newAnswers[index] = value;
    setGapAnswers(newAnswers);
    setAnswers(newAnswers);
  };

  const parts = exercise.text.split('____');
  const correctAnswers = exercise.answers || [];

  return (
    <div className="gap-fill-exercise">
      <div className="gap-fill-text">
        {parts.map((part: string, index: number) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && (
              <input
                type="text"
                className={`gap-input ${submitted ? (gapAnswers[index]?.trim().toLowerCase() === correctAnswers[index]?.toLowerCase() ? 'correct' : 'incorrect') : ''}`}
                value={gapAnswers[index] || ''}
                onChange={(e) => handleChange(index, e.target.value)}
                disabled={submitted}
                placeholder="___"
              />
            )}
          </span>
        ))}
      </div>
      {submitted && (
        <div className="correct-answers">
          <p><strong>{language === 'en' ? 'Correct answers' : 'Правильні відповіді'}:</strong></p>
          <p>{correctAnswers.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

function MultipleChoiceExercise({ exercise, answer, setAnswer, submitted }: any) {
  return (
    <div className="multiple-choice-exercise">
      <p className="question">{exercise.question}</p>
      <div className="options">
        {exercise.options.map((option: string, index: number) => (
          <label
            key={index}
            className={`option ${submitted ? (index === exercise.correctAnswer ? 'correct' : (index === answer ? 'incorrect' : '')) : (answer === index ? 'selected' : '')}`}
          >
            <input
              type="radio"
              name={exercise.id}
              checked={answer === index}
              onChange={() => setAnswer(index)}
              disabled={submitted}
            />
            <span>{option}</span>
            {submitted && index === exercise.correctAnswer && <span className="check-mark">✓</span>}
          </label>
        ))}
      </div>
    </div>
  );
}

function TrueFalseExercise({ exercise, answer, setAnswer, submitted, language }: any) {
  return (
    <div className="true-false-exercise">
      <p className="statement">{exercise.statement}</p>
      <div className="tf-options">
        <button
          className={`tf-button ${answer === true ? 'selected' : ''} ${submitted && exercise.correctAnswer === true ? 'correct' : ''} ${submitted && answer === true && exercise.correctAnswer === false ? 'incorrect' : ''}`}
          onClick={() => !submitted && setAnswer(true)}
          disabled={submitted}
        >
          {language === 'en' ? 'True' : 'Правда'}
          {submitted && exercise.correctAnswer === true && <span className="check-mark">✓</span>}
        </button>
        <button
          className={`tf-button ${answer === false ? 'selected' : ''} ${submitted && exercise.correctAnswer === false ? 'correct' : ''} ${submitted && answer === false && exercise.correctAnswer === true ? 'incorrect' : ''}`}
          onClick={() => !submitted && setAnswer(false)}
          disabled={submitted}
        >
          {language === 'en' ? 'False' : 'Неправда'}
          {submitted && exercise.correctAnswer === false && <span className="check-mark">✓</span>}
        </button>
      </div>
    </div>
  );
}

function MatchingExercise({ exercise, language }: any) {
  return (
    <div className="matching-exercise">
      <p className="info-text">{language === 'en' ? 'Match the items:' : 'Зіставте елементи:'}</p>
      <div className="matching-pairs">
        {exercise.pairs.map((pair: any, index: number) => (
          <div key={index} className="pair-row">
            <div className="pair-left">{pair.left}</div>
            <div className="pair-arrow">→</div>
            <div className="pair-right">{pair.right}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SortingExercise({ exercise, language }: any) {
  return (
    <div className="sorting-exercise">
      <p className="info-text">{language === 'en' ? 'Put these items in the correct order:' : 'Розташуйте ці елементи в правильному порядку:'}</p>
      <div className="sorting-items">
        {exercise.items.map((item: string, index: number) => (
          <div key={index} className="sorting-item">
            {index + 1}. {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function SentenceScrambleExercise({ exercise, answers, setAnswers, submitted, language }: any) {
  const [words, setWords] = useState<string[]>(answers || exercise.words);

  const handleWordClick = (index: number) => {
    if (submitted) return;
    // Simple implementation: clicking moves word to end
    const newWords = [...words];
    const word = newWords.splice(index, 1)[0];
    newWords.push(word);
    setWords(newWords);
    setAnswers(newWords);
  };

  return (
    <div className="sentence-scramble-exercise">
      <div className="scrambled-words">
        {words.map((word, index) => (
          <button
            key={index}
            className="word-button"
            onClick={() => handleWordClick(index)}
            disabled={submitted}
          >
            {word}
          </button>
        ))}
      </div>
      <div className="current-sentence">
        <strong>{language === 'en' ? 'Your sentence' : 'Ваше речення'}:</strong> {words.join(' ')}
      </div>
      {submitted && exercise.correctSentence && (
        <div className="correct-answer">
          <strong>{language === 'en' ? 'Correct sentence' : 'Правильне речення'}:</strong> {exercise.correctSentence}
        </div>
      )}
    </div>
  );
}

function FreeTextExercise({ exercise, answer, setAnswer, language }: any) {
  const minWords = exercise.minWords || 0;
  const wordCount = answer ? answer.trim().split(/\s+/).filter((w: string) => w.length > 0).length : 0;

  return (
    <div className="free-text-exercise">
      <p className="prompt">{exercise.prompt}</p>
      {minWords > 0 && (
        <p className="word-count">
          {language === 'en' ? 'Minimum words' : 'Мінімум слів'}: {minWords} | {language === 'en' ? 'Your words' : 'Ваші слова'}: {wordCount}
        </p>
      )}
      <textarea
        className="free-text-area"
        value={answer || ''}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={language === 'en' ? 'Write your answer here...' : 'Напишіть вашу відповідь тут...'}
        rows={8}
      />
    </div>
  );
}

function InformationGapExercise({ exercise, language }: any) {
  return (
    <div className="information-gap-exercise">
      <p className="scenario"><strong>{language === 'en' ? 'Scenario' : 'Сценарій'}:</strong> {exercise.scenario}</p>
      <div className="info-cards">
        <div className="info-card">
          <h4>{language === 'en' ? 'Student A Information' : 'Інформація Студента A'}:</h4>
          <p>{exercise.studentAInfo}</p>
        </div>
        <div className="info-card">
          <h4>{language === 'en' ? 'Student B Information' : 'Інформація Студента B'}:</h4>
          <p>{exercise.studentBInfo}</p>
        </div>
      </div>
      {exercise.prompts && exercise.prompts.length > 0 && (
        <div className="prompts">
          <h4>{language === 'en' ? 'Useful questions' : 'Корисні питання'}:</h4>
          <ul>
            {exercise.prompts.map((prompt: string, index: number) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function RolePlayExercise({ exercise, language }: any) {
  return (
    <div className="role-play-exercise">
      <p className="scenario"><strong>{language === 'en' ? 'Scenario' : 'Сценарій'}:</strong> {exercise.scenario}</p>
      <div className="roles">
        <h4>{language === 'en' ? 'Roles' : 'Ролі'}:</h4>
        {exercise.roles.map((role: any, index: number) => (
          <div key={index} className="role-card">
            <h5>{role.name}</h5>
            <p>{role.description}</p>
          </div>
        ))}
      </div>
      {exercise.duration && (
        <p className="duration">⏱️ {language === 'en' ? 'Suggested duration' : 'Рекомендована тривалість'}: {exercise.duration} {language === 'en' ? 'minutes' : 'хвилин'}</p>
      )}
    </div>
  );
}

function CollocationExercise({ exercise, language }: any) {
  return (
    <div className="collocation-exercise">
      <div className="collocations-list">
        {exercise.collocations.map((coll: any, index: number) => (
          <div key={index} className="collocation-item">
            <strong>{coll.word}:</strong> {coll.partners.join(', ')}
          </div>
        ))}
      </div>
      {exercise.exerciseFormat && (
        <p className="format-note">{language === 'en' ? 'Format' : 'Формат'}: {exercise.exerciseFormat}</p>
      )}
    </div>
  );
}

function LexicalSetExercise({ exercise, language }: any) {
  return (
    <div className="lexical-set-exercise">
      <h4>{language === 'en' ? 'Topic' : 'Тема'}: {exercise.topic}</h4>
      {exercise.context && (
        <p className="context"><em>{exercise.context}</em></p>
      )}
      <div className="chunks-list">
        {exercise.chunks.map((chunk: string, index: number) => (
          <div key={index} className="chunk-item">
            • {chunk}
          </div>
        ))}
      </div>
    </div>
  );
}
