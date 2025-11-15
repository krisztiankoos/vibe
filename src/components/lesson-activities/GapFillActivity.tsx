import { useState } from 'react';
import type { GapFillItem } from '../../data/wordwallLessonData';

interface GapFillActivityProps {
  items: GapFillItem[];
  title: string;
  onComplete: () => void;
}

export default function GapFillActivity({ items, title, onComplete }: GapFillActivityProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentItem = items[currentIndex];
  const progress = ((currentIndex + 1) / items.length) * 100;

  // Generate multiple choice options
  const generateOptions = (): string[] => {
    const correctAnswer = currentItem.answer;
    const allAnswers = items.map(item => item.answer);

    // Get wrong answers (different from correct)
    const wrongAnswers = allAnswers.filter(ans => ans !== correctAnswer);

    // Shuffle and take 3-5 wrong answers
    const shuffledWrong = wrongAnswers.sort(() => Math.random() - 0.5);
    const numWrong = Math.min(Math.floor(Math.random() * 3) + 3, shuffledWrong.length); // 3-5 options
    const selectedWrong = shuffledWrong.slice(0, numWrong);

    // Combine correct + wrong and shuffle
    const options = [correctAnswer, ...selectedWrong].sort(() => Math.random() - 0.5);

    return options;
  };

  const [options] = useState<string[]>(generateOptions());

  const handleSelectAnswer = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleCheck = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === currentItem.answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else if (!completed) {
      setCompleted(true);
      onComplete();
    }
  };

  if (completed) {
    const percentage = Math.round((score / items.length) * 100);
    return (
      <div style={{
        padding: '3rem',
        textAlign: 'center',
        background: percentage >= 70
          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
          : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        borderRadius: '12px',
        color: 'white'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          {percentage >= 70 ? '🎉' : '📝'}
        </div>
        <h2 style={{ margin: '0 0 1rem 0' }}>{title} Complete!</h2>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '1rem 0' }}>
          {score}/{items.length}
        </div>
        <p style={{ margin: '0 0 2rem 0', opacity: 0.9, fontSize: '1.2rem' }}>
          {percentage}% Correct
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setScore(0);
            setCompleted(false);
          }}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'white',
            color: percentage >= 70 ? '#10b981' : '#f59e0b',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      {/* Header */}
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#667eea' }}>{title}</h3>

      {/* Progress */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 'bold', color: '#667eea' }}>
            Question {currentIndex + 1} of {items.length}
          </span>
          <span style={{ color: '#666' }}>Score: {score}/{currentIndex + (showFeedback ? 1 : 0)}</span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          background: '#e5e7eb',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Question */}
      <div style={{
        padding: '2rem',
        background: '#f9fafb',
        borderRadius: '12px',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#374151', fontWeight: 'bold' }}>
          {currentItem.sentence}
        </div>

        {/* Multiple Choice Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrectAnswer = option === currentItem.answer;

            let backgroundColor = 'white';
            let borderColor = '#d1d5db';
            let textColor = '#374151';

            if (showFeedback) {
              if (isCorrectAnswer) {
                backgroundColor = '#d1fae5';
                borderColor = '#10b981';
                textColor = '#065f46';
              } else if (isSelected && !isCorrectAnswer) {
                backgroundColor = '#fee2e2';
                borderColor = '#ef4444';
                textColor = '#991b1b';
              }
            } else if (isSelected) {
              backgroundColor = '#e0e7ff';
              borderColor = '#667eea';
              textColor = '#4338ca';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(option)}
                disabled={showFeedback}
                style={{
                  padding: '1rem 1.5rem',
                  background: backgroundColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: textColor,
                  cursor: showFeedback ? 'default' : 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${borderColor}`,
                  background: isSelected ? borderColor : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {showFeedback && isCorrectAnswer && <span style={{ color: 'white' }}>✓</span>}
                  {showFeedback && isSelected && !isCorrectAnswer && <span style={{ color: 'white' }}>✗</span>}
                </div>
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && !isCorrect && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#fee2e2',
            borderRadius: '8px',
            color: '#991b1b'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
              ✗ Incorrect
            </div>
            <div>
              The correct answer is: <strong>{currentItem.answer}</strong>
            </div>
          </div>
        )}
        {showFeedback && isCorrect && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#d1fae5',
            borderRadius: '8px',
            color: '#065f46',
            fontWeight: 'bold'
          }}>
            ✓ Correct!
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {!showFeedback ? (
          <button
            onClick={handleCheck}
            disabled={!selectedAnswer}
            style={{
              padding: '0.75rem 1.5rem',
              background: selectedAnswer
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : '#e5e7eb',
              color: selectedAnswer ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: selectedAnswer ? 'pointer' : 'not-allowed',
              flex: 1
            }}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              flex: 1
            }}
          >
            {currentIndex < items.length - 1 ? 'Next Question →' : 'Complete ✓'}
          </button>
        )}
      </div>

      {/* Hint */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#f0f9ff',
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        💡 <strong>Tip:</strong> Select the correct word to fill in the blank, then click "Check Answer".
      </div>
    </div>
  );
}
