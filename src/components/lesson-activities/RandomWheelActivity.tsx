import { useState, useRef } from 'react';

interface RandomWheelActivityProps {
  questions: string[];
  onComplete: () => void;
}

// Vibrant colors for wheel segments
const SEGMENT_COLORS = [
  '#ef4444', // red
  '#f59e0b', // orange
  '#10b981', // green
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
];

export default function RandomWheelActivity({ questions, onComplete }: RandomWheelActivityProps) {
  const [spinning, setSpinning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const remainingQuestions = questions.filter((_, idx) => !usedQuestions.has(idx));
  const progress = (usedQuestions.size / questions.length) * 100;

  const handleSpin = () => {
    if (spinning || remainingQuestions.length === 0) return;

    setSpinning(true);
    setCurrentQuestion(null);

    // Calculate random spin (5-10 full rotations + random position)
    const availableIndices = questions
      .map((_, idx) => idx)
      .filter(idx => !usedQuestions.has(idx));
    const selectedIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];

    // Calculate rotation to land on selected segment
    const degreesPerSegment = 360 / questions.length;
    const targetDegree = selectedIdx * degreesPerSegment + (degreesPerSegment / 2);
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const totalRotation = rotation + (360 * spins) + (360 - targetDegree);

    setRotation(totalRotation);

    // After animation completes (4 seconds), show result
    setTimeout(() => {
      setCurrentQuestion(questions[selectedIdx]);
      setUsedQuestions(prev => new Set([...prev, selectedIdx]));
      setSpinning(false);
    }, 4000);
  };

  const handleComplete = () => {
    setCompleted(true);
    onComplete();
  };

  if (completed) {
    return (
      <div style={{
        padding: '3rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        borderRadius: '12px',
        color: 'white'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💬</div>
        <h2 style={{ margin: '0 0 1rem 0' }}>Discussion Complete!</h2>
        <p style={{ margin: '0 0 2rem 0', opacity: 0.9, fontSize: '1.1rem' }}>
          You discussed all {questions.length} topics
        </p>
        <button
          onClick={() => {
            setUsedQuestions(new Set());
            setCurrentQuestion(null);
            setCompleted(false);
            setRotation(0);
          }}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'white',
            color: '#8b5cf6',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Start Over
        </button>
      </div>
    );
  }

  // Create wheel segments
  const renderWheel = () => {
    const segments = questions.length;
    const degreesPerSegment = 360 / segments;

    return (
      <div style={{ position: 'relative', width: '400px', height: '400px', margin: '0 auto' }}>
        {/* Pointer/Arrow at top */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderTop: '40px solid #ef4444',
          zIndex: 10,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
        }} />

        {/* Wheel container */}
        <div
          ref={wheelRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            position: 'relative',
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            border: '8px solid white'
          }}
        >
          {/* SVG Wheel */}
          <svg width="100%" height="100%" viewBox="0 0 200 200" style={{ borderRadius: '50%' }}>
            {questions.map((_, idx) => {
              const startAngle = (idx * degreesPerSegment - 90) * (Math.PI / 180);
              const endAngle = ((idx + 1) * degreesPerSegment - 90) * (Math.PI / 180);
              const isUsed = usedQuestions.has(idx);

              const x1 = 100 + 100 * Math.cos(startAngle);
              const y1 = 100 + 100 * Math.sin(startAngle);
              const x2 = 100 + 100 * Math.cos(endAngle);
              const y2 = 100 + 100 * Math.sin(endAngle);

              const largeArcFlag = degreesPerSegment > 180 ? 1 : 0;

              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');

              const color = isUsed ? '#d1d5db' : SEGMENT_COLORS[idx % SEGMENT_COLORS.length];

              return (
                <g key={idx}>
                  <path
                    d={pathData}
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                    opacity={isUsed ? 0.3 : 1}
                  />
                  {/* Number label */}
                  <text
                    x={100 + 60 * Math.cos((startAngle + endAngle) / 2)}
                    y={100 + 60 * Math.sin((startAngle + endAngle) / 2)}
                    fill="white"
                    fontSize="20"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ pointerEvents: 'none' }}
                  >
                    {idx + 1}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle cx="100" cy="100" r="25" fill="white" stroke="#8b5cf6" strokeWidth="4" />
            <text
              x="100"
              y="100"
              fill="#8b5cf6"
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              SPIN
            </text>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      padding: '2rem',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#8b5cf6' }}>Discussion Wheel</h3>
      <p style={{ margin: '0 0 2rem 0', color: '#666' }}>
        Spin the wheel to get a random discussion question about Ukrainian language and culture
      </p>

      {/* Progress */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 'bold', color: '#8b5cf6' }}>
            Questions Discussed: {usedQuestions.size}/{questions.length}
          </span>
          <span style={{ color: '#666' }}>{Math.round(progress)}%</span>
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
            background: 'linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Wheel */}
      <div style={{ marginBottom: '2rem', padding: '2rem 0' }}>
        {renderWheel()}
      </div>

      {/* Current Question Display */}
      {currentQuestion && !spinning && (
        <div style={{
          marginBottom: '2rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          borderRadius: '12px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', lineHeight: 1.6 }}>
            {currentQuestion}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {remainingQuestions.length > 0 ? (
          <button
            onClick={handleSpin}
            disabled={spinning}
            style={{
              padding: '0.75rem 1.5rem',
              background: spinning
                ? '#e5e7eb'
                : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: spinning ? '#9ca3af' : 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: spinning ? 'not-allowed' : 'pointer',
              flex: 1
            }}
          >
            {spinning ? 'Spinning... 🎡' : 'Spin the Wheel 🎡'}
          </button>
        ) : (
          <button
            onClick={handleComplete}
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
            Complete Activity ✓
          </button>
        )}
      </div>

      {/* Discussion Tips */}
      {currentQuestion && !spinning && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f0f9ff',
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>💡 Discussion Tips:</div>
          <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
            <li>Share your thoughts and experiences</li>
            <li>Practice using Ukrainian vocabulary from the lesson</li>
            <li>Listen to others and ask follow-up questions</li>
          </ul>
        </div>
      )}

      {/* Status */}
      {spinning && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#fef3c7',
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#78350f',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          🎡 Spinning the wheel...
        </div>
      )}

      {remainingQuestions.length > 0 && !spinning && !currentQuestion && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#f0f9ff',
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#666',
          textAlign: 'center'
        }}>
          <strong>{remainingQuestions.length}</strong> question{remainingQuestions.length !== 1 ? 's' : ''} remaining
        </div>
      )}
    </div>
  );
}
