import { useState } from 'react';
import type { FlashCardItem } from '../../data/wordwallLessonData';

interface FlashCardsActivityProps {
  cards: FlashCardItem[];
  onComplete: () => void;
}

export default function FlashCardsActivity({ cards, onComplete }: FlashCardsActivityProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowBack(false);
    } else if (!completed) {
      setCompleted(true);
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowBack(false);
    }
  };

  const handleFlip = () => {
    setShowBack(!showBack);
  };

  if (completed) {
    return (
      <div style={{
        padding: '3rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        borderRadius: '12px',
        color: 'white'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ margin: '0 0 1rem 0' }}>Activity Complete!</h2>
        <p style={{ margin: '0 0 2rem 0', opacity: 0.9 }}>
          You reviewed all {cards.length} flash cards
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setShowBack(false);
            setCompleted(false);
          }}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'white',
            color: '#10b981',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Review Again
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
      {/* Progress bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 'bold', color: '#10b981' }}>
            Card {currentIndex + 1} of {cards.length}
          </span>
          <span style={{ color: '#666' }}>{Math.round(progress)}% Complete</span>
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
            background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Flash card */}
      <div
        onClick={handleFlip}
        style={{
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem',
          background: showBack
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '16px',
          cursor: 'pointer',
          color: 'white',
          fontSize: '1.5rem',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          userSelect: 'none'
        }}
      >
        <div>
          <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem' }}>
            {showBack ? 'English' : 'Українська'} • Click to flip
          </div>
          <div style={{ fontWeight: 'bold' }}>
            {showBack ? currentCard.back : currentCard.front}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '2rem',
        gap: '1rem'
      }}>
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          style={{
            padding: '0.75rem 1.5rem',
            background: currentIndex === 0 ? '#e5e7eb' : '#f3f4f6',
            color: currentIndex === 0 ? '#9ca3af' : '#374151',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            flex: 1
          }}
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: 1
          }}
        >
          {currentIndex < cards.length - 1 ? 'Next →' : 'Complete ✓'}
        </button>
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
        💡 <strong>Tip:</strong> Click the card to see the translation. Try to recall the meaning before flipping!
      </div>
    </div>
  );
}
