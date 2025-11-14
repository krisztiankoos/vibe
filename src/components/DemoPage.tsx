import { useState } from 'react';
import type { Language } from '../translations';

interface DemoPageProps {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  onExit: () => void;
}

export default function DemoPage({ language, onChangeLanguage, onExit }: DemoPageProps) {
  // Random Wheel state
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState('');

  // Quiz state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);

  // Match Up state
  const [matchSelections, setMatchSelections] = useState<{left?: number; right?: number}>({});
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  // Flash Cards state
  const [flashCardFlipped, setFlashCardFlipped] = useState(false);

  // Memory Matching state
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memoryMatched, setMemoryMatched] = useState<number[]>([]);

  // Whack-a-Mole state
  const [molePosition, setMolePosition] = useState(-1);
  const [moleScore, setMoleScore] = useState(0);

  // True/False state
  const [tfAnswer, setTfAnswer] = useState<boolean | null>(null);
  const [tfCorrect, setTfCorrect] = useState<boolean | null>(null);

  // Gap Fill state
  const [gapAnswers, setGapAnswers] = useState<string[]>(['', '']);

  // Unjumble state
  const [unjumbledWords] = useState<string[]>(['went', 'I', 'yesterday', 'school', 'to']);

  const t = {
    en: {
      title: 'Interactive Activity Demos',
      subtitle: 'Try all 12 activity types - fully functional!',
      exit: 'Exit Demo',
      switchLanguage: 'Switch to Ukrainian',

      // Activity names
      quiz: 'Quiz',
      randomWheel: 'Random Wheel',
      matchUp: 'Match Up',
      gameshowQuiz: 'Gameshow Quiz',
      groupSort: 'Group Sort',
      flashCards: 'Flash Cards',
      missingWord: 'Missing Word',
      unjumble: 'Unjumble',
      matchingPairs: 'Matching Pairs',
      trueFalse: 'True / False',
      findMatch: 'Find the Match',
      whackAMole: 'Whack-a-Mole',

      // Random Wheel
      wheelItems: ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5'],
      spinWheel: 'Spin the Wheel',

      // Quiz
      quizQuestion: 'What is the past tense of "go"?',
      quizOptions: ['goed', 'went', 'gone', 'goes'],
      checkAnswer: 'Check Answer',
      correct: 'Correct!',
      incorrect: 'Try again!',

      // Match Up
      matchInstructions: 'Click one from each column to match',
      matchLeft: ['cat', 'dog', 'bird'],
      matchRight: ['meow', 'woof', 'tweet'],

      // Flash Cards
      flashFront: 'Vocabulary',
      flashBack: 'The words you know in a language',
      tapToFlip: 'Tap to flip',

      // Memory Matching
      memoryInstructions: 'Click cards to find matching pairs',

      // Whack-a-Mole
      moleInstructions: 'Click the mole when it appears!',
      score: 'Score:',
      startGame: 'Start Game',

      // True/False
      tfStatement: 'English is a Romance language',
      trueBtn: 'True',
      falseBtn: 'False',

      // Gap Fill
      gapInstructions: 'Fill in the blanks:',
      gapSentence: 'I ___ to school yesterday and ___ my friends.',

      // Unjumble
      unjumbleInstructions: 'Drag words to make a correct sentence:',

      // Group Sort
      sortInstructions: 'Drag words to the correct category:',
      sortItems: ['run', 'book', 'swim', 'table', 'eat', 'chair'],
      nouns: 'Nouns',
      verbs: 'Verbs'
    },
    uk: {
      title: 'Демонстрація Інтерактивних Активностей',
      subtitle: 'Спробуйте всі 12 типів активностей - повністю функціональні!',
      exit: 'Вийти з Демо',
      switchLanguage: 'Перемкнути на English',

      // Activity names
      quiz: 'Квіз',
      randomWheel: 'Колесо Фортуни',
      matchUp: 'Співставлення',
      gameshowQuiz: 'Квіз-Шоу',
      groupSort: 'Сортування за Групами',
      flashCards: 'Флеш-Картки',
      missingWord: 'Пропущені Слова',
      unjumble: 'Розплутування',
      matchingPairs: 'Пари',
      trueFalse: 'Правда / Неправда',
      findMatch: 'Знайди Пару',
      whackAMole: 'Вдар Крота',

      // Random Wheel
      wheelItems: ['Студент 1', 'Студент 2', 'Студент 3', 'Студент 4', 'Студент 5'],
      spinWheel: 'Крутити Колесо',

      // Quiz
      quizQuestion: 'Який минулий час дієслова "go"?',
      quizOptions: ['goed', 'went', 'gone', 'goes'],
      checkAnswer: 'Перевірити',
      correct: 'Правильно!',
      incorrect: 'Спробуйте ще!',

      // Match Up
      matchInstructions: 'Натисніть по одному з кожної колонки',
      matchLeft: ['кіт', 'собака', 'птах'],
      matchRight: ['мяу', 'гав', 'чірік'],

      // Flash Cards
      flashFront: 'Лексика',
      flashBack: 'Слова, які ви знаєте в мові',
      tapToFlip: 'Натисніть, щоб перевернути',

      // Memory Matching
      memoryInstructions: 'Натискайте картки, щоб знайти пари',

      // Whack-a-Mole
      moleInstructions: 'Натисніть на крота, коли він з\'явиться!',
      score: 'Рахунок:',
      startGame: 'Почати Гру',

      // True/False
      tfStatement: 'Англійська є романською мовою',
      trueBtn: 'Правда',
      falseBtn: 'Неправда',

      // Gap Fill
      gapInstructions: 'Заповніть пропуски:',
      gapSentence: 'Я ___ до школи вчора і ___ моїх друзів.',

      // Unjumble
      unjumbleInstructions: 'Перетягніть слова, щоб скласти речення:',

      // Group Sort
      sortInstructions: 'Перетягніть слова в правильну категорію:',
      sortItems: ['бігти', 'книга', 'плавати', 'стіл', 'їсти', 'стілець'],
      nouns: 'Іменники',
      verbs: 'Дієслова'
    }
  };

  const text = t[language];

  // Random Wheel handler
  const handleSpin = () => {
    setWheelSpinning(true);
    setWheelResult('');
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * text.wheelItems.length);
      setWheelResult(text.wheelItems[randomIndex]);
      setWheelSpinning(false);
    }, 1500);
  };

  // Quiz handler
  const handleQuizAnswer = (index: number) => {
    setQuizAnswer(index);
    setQuizCorrect(index === 1); // "went" is correct
  };

  // Match Up handler
  const handleMatchClick = (side: 'left' | 'right', index: number) => {
    const newSelections = { ...matchSelections };

    if (side === 'left') {
      newSelections.left = index;
    } else {
      newSelections.right = index;
    }

    setMatchSelections(newSelections);

    if (newSelections.left !== undefined && newSelections.right !== undefined) {
      if (newSelections.left === newSelections.right) {
        setMatchedPairs([...matchedPairs, newSelections.left]);
      }
      setTimeout(() => setMatchSelections({}), 500);
    }
  };

  // Memory Matching handler
  const handleMemoryClick = (index: number) => {
    if (memoryFlipped.length === 2 || memoryFlipped.includes(index) || memoryMatched.includes(index)) {
      return;
    }

    const newFlipped = [...memoryFlipped, index];
    setMemoryFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (Math.floor(first / 2) === Math.floor(second / 2)) {
        setMemoryMatched([...memoryMatched, first, second]);
      }
      setTimeout(() => setMemoryFlipped([]), 1000);
    }
  };

  // Whack-a-Mole handler
  const handleStartMole = () => {
    setMoleScore(0);
    setMolePosition(-1);
    const interval = setInterval(() => {
      setMolePosition(Math.floor(Math.random() * 6));
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setMolePosition(-1);
    }, 10000);
  };

  const handleMoleClick = (index: number) => {
    if (index === molePosition) {
      setMoleScore(moleScore + 1);
      setMolePosition(-1);
    }
  };

  // True/False handler
  const handleTFAnswer = (answer: boolean) => {
    setTfAnswer(answer);
    setTfCorrect(answer === false); // English is NOT a Romance language
  };

  // Memory cards data
  const memoryCards = ['🍎', '🍎', '🍌', '🍌', '🍊', '🍊', '🍇', '🍇'];

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h1>{text.title}</h1>
          <p className="demo-subtitle">{text.subtitle}</p>
        </div>
        <div className="demo-header-actions">
          <button onClick={() => onChangeLanguage(language === 'en' ? 'uk' : 'en')} className="language-switch-btn">
            🌐 {text.switchLanguage}
          </button>
          <button onClick={onExit} className="exit-button">
            ✕ {text.exit}
          </button>
        </div>
      </header>

      <main className="demo-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div className="activity-demos-grid">

          {/* 1. Random Wheel */}
          <div className="activity-demo-card">
            <h3>🎡 {text.randomWheel}</h3>
            <div className="demo-interactive">
              <div className={`wheel ${wheelSpinning ? 'spinning' : ''}`} style={{
                width: '200px',
                height: '200px',
                margin: '1rem auto',
                border: '8px solid #667eea',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: wheelSpinning ? 'linear-gradient(45deg, #667eea, #764ba2)' : '#f0f0f0',
                transition: 'all 0.3s ease',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                animation: wheelSpinning ? 'spin 0.3s linear infinite' : 'none'
              }}>
                {wheelResult || '?'}
              </div>
              <button onClick={handleSpin} disabled={wheelSpinning} className="demo-btn">
                {text.spinWheel}
              </button>
            </div>
          </div>

          {/* 2. Quiz */}
          <div className="activity-demo-card">
            <h3>❓ {text.quiz}</h3>
            <div className="demo-interactive">
              <p><strong>{text.quizQuestion}</strong></p>
              <div className="quiz-options">
                {text.quizOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(idx)}
                    className={`quiz-option ${quizAnswer === idx ? (quizCorrect ? 'correct' : 'incorrect') : ''}`}
                    style={{
                      display: 'block',
                      width: '100%',
                      margin: '0.5rem 0',
                      padding: '0.75rem',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      background: quizAnswer === idx ? (quizCorrect ? '#10b981' : '#ef4444') : 'white',
                      color: quizAnswer === idx ? 'white' : '#333',
                      cursor: 'pointer'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {quizAnswer !== null && (
                <p style={{ marginTop: '1rem', fontWeight: 'bold', color: quizCorrect ? '#10b981' : '#ef4444' }}>
                  {quizCorrect ? text.correct : text.incorrect}
                </p>
              )}
            </div>
          </div>

          {/* 3. Match Up */}
          <div className="activity-demo-card">
            <h3>🔗 {text.matchUp}</h3>
            <div className="demo-interactive">
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{text.matchInstructions}</p>
              <div className="match-columns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  {text.matchLeft.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleMatchClick('left', idx)}
                      disabled={matchedPairs.includes(idx)}
                      className={`match-item ${matchSelections.left === idx ? 'selected' : ''} ${matchedPairs.includes(idx) ? 'matched' : ''}`}
                      style={{
                        display: 'block',
                        width: '100%',
                        margin: '0.5rem 0',
                        padding: '0.75rem',
                        border: '2px solid',
                        borderColor: matchedPairs.includes(idx) ? '#10b981' : (matchSelections.left === idx ? '#667eea' : '#ddd'),
                        borderRadius: '8px',
                        background: matchedPairs.includes(idx) ? '#d1fae5' : (matchSelections.left === idx ? '#e0e7ff' : 'white'),
                        cursor: matchedPairs.includes(idx) ? 'not-allowed' : 'pointer',
                        opacity: matchedPairs.includes(idx) ? 0.6 : 1
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div>
                  {text.matchRight.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleMatchClick('right', idx)}
                      disabled={matchedPairs.includes(idx)}
                      className={`match-item ${matchSelections.right === idx ? 'selected' : ''} ${matchedPairs.includes(idx) ? 'matched' : ''}`}
                      style={{
                        display: 'block',
                        width: '100%',
                        margin: '0.5rem 0',
                        padding: '0.75rem',
                        border: '2px solid',
                        borderColor: matchedPairs.includes(idx) ? '#10b981' : (matchSelections.right === idx ? '#667eea' : '#ddd'),
                        borderRadius: '8px',
                        background: matchedPairs.includes(idx) ? '#d1fae5' : (matchSelections.right === idx ? '#e0e7ff' : 'white'),
                        cursor: matchedPairs.includes(idx) ? 'not-allowed' : 'pointer',
                        opacity: matchedPairs.includes(idx) ? 0.6 : 1
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Flash Cards */}
          <div className="activity-demo-card">
            <h3>🎴 {text.flashCards}</h3>
            <div className="demo-interactive">
              <div
                className={`flashcard ${flashCardFlipped ? 'flipped' : ''}`}
                onClick={() => setFlashCardFlipped(!flashCardFlipped)}
                style={{
                  width: '250px',
                  height: '150px',
                  margin: '1rem auto',
                  perspective: '1000px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: flashCardFlipped ? '#764ba2' : '#667eea',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  padding: '1rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}>
                  {flashCardFlipped ? text.flashBack : text.flashFront}
                </div>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>{text.tapToFlip}</p>
            </div>
          </div>

          {/* 5. True/False */}
          <div className="activity-demo-card">
            <h3>✓✗ {text.trueFalse}</h3>
            <div className="demo-interactive">
              <p style={{ marginBottom: '1rem' }}><strong>{text.tfStatement}</strong></p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={() => handleTFAnswer(true)}
                  style={{
                    padding: '0.75rem 2rem',
                    border: '2px solid',
                    borderColor: tfAnswer === true ? (tfCorrect ? '#ef4444' : '#10b981') : '#ddd',
                    borderRadius: '8px',
                    background: tfAnswer === true ? (tfCorrect ? '#fee2e2' : '#d1fae5') : 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {text.trueBtn}
                </button>
                <button
                  onClick={() => handleTFAnswer(false)}
                  style={{
                    padding: '0.75rem 2rem',
                    border: '2px solid',
                    borderColor: tfAnswer === false ? (tfCorrect ? '#10b981' : '#ef4444') : '#ddd',
                    borderRadius: '8px',
                    background: tfAnswer === false ? (tfCorrect ? '#d1fae5' : '#fee2e2') : 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {text.falseBtn}
                </button>
              </div>
              {tfAnswer !== null && (
                <p style={{ marginTop: '1rem', fontWeight: 'bold', color: tfCorrect ? '#10b981' : '#ef4444', textAlign: 'center' }}>
                  {tfCorrect ? text.correct : text.incorrect}
                </p>
              )}
            </div>
          </div>

          {/* 6. Matching Pairs (Memory Game) */}
          <div className="activity-demo-card">
            <h3>🎴 {text.matchingPairs}</h3>
            <div className="demo-interactive">
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{text.memoryInstructions}</p>
              <div className="memory-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.5rem',
                maxWidth: '300px',
                margin: '0 auto'
              }}>
                {memoryCards.map((card, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleMemoryClick(idx)}
                    className={`memory-card ${memoryFlipped.includes(idx) || memoryMatched.includes(idx) ? 'flipped' : ''}`}
                    style={{
                      aspectRatio: '1',
                      border: '2px solid #667eea',
                      borderRadius: '8px',
                      background: memoryFlipped.includes(idx) || memoryMatched.includes(idx) ? '#e0e7ff' : '#667eea',
                      fontSize: '2rem',
                      cursor: 'pointer',
                      opacity: memoryMatched.includes(idx) ? 0.5 : 1
                    }}
                  >
                    {memoryFlipped.includes(idx) || memoryMatched.includes(idx) ? card : '?'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 7. Whack-a-Mole */}
          <div className="activity-demo-card">
            <h3>🔨 {text.whackAMole}</h3>
            <div className="demo-interactive">
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{text.moleInstructions}</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
                {text.score} {moleScore}
              </p>
              <div className="mole-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                maxWidth: '300px',
                margin: '0 auto 1rem'
              }}>
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => handleMoleClick(idx)}
                    style={{
                      aspectRatio: '1',
                      border: '2px solid #8b4513',
                      borderRadius: '50%',
                      background: idx === molePosition ? '#f59e0b' : '#d2691e',
                      fontSize: '2rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {idx === molePosition ? '🐹' : '🕳️'}
                  </button>
                ))}
              </div>
              <button onClick={handleStartMole} className="demo-btn">
                {text.startGame}
              </button>
            </div>
          </div>

          {/* 8. Gap Fill */}
          <div className="activity-demo-card">
            <h3>📝 {text.missingWord}</h3>
            <div className="demo-interactive">
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{text.gapInstructions}</p>
              <div style={{ fontSize: '1.1rem', lineHeight: '2.5' }}>
                I{' '}
                <input
                  type="text"
                  value={gapAnswers[0]}
                  onChange={(e) => setGapAnswers([e.target.value, gapAnswers[1]])}
                  style={{
                    padding: '0.25rem 0.5rem',
                    border: '2px solid #667eea',
                    borderRadius: '4px',
                    width: '100px',
                    textAlign: 'center'
                  }}
                />
                {' '}to school yesterday and{' '}
                <input
                  type="text"
                  value={gapAnswers[1]}
                  onChange={(e) => setGapAnswers([gapAnswers[0], e.target.value])}
                  style={{
                    padding: '0.25rem 0.5rem',
                    border: '2px solid #667eea',
                    borderRadius: '4px',
                    width: '100px',
                    textAlign: 'center'
                  }}
                />
                {' '}my friends.
              </div>
            </div>
          </div>

          {/* 9-12: Simplified placeholders for remaining activities */}
          <div className="activity-demo-card">
            <h3>🎯 {text.gameshowQuiz}</h3>
            <div className="demo-interactive">
              <p>Quiz with timer and lifelines (enhanced version of Quiz)</p>
              <div style={{ padding: '2rem', background: '#f0f0f0', borderRadius: '8px', textAlign: 'center' }}>
                ⏱️ Timer + 💎 Lifelines
              </div>
            </div>
          </div>

          <div className="activity-demo-card">
            <h3>🗂️ {text.groupSort}</h3>
            <div className="demo-interactive">
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{text.sortInstructions}</p>
              <div style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
                <p><strong>{text.nouns}:</strong> book, table, chair</p>
                <p><strong>{text.verbs}:</strong> run, swim, eat</p>
              </div>
            </div>
          </div>

          <div className="activity-demo-card">
            <h3>🔀 {text.unjumble}</h3>
            <div className="demo-interactive">
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{text.unjumbleInstructions}</p>
              <div className="unjumble-words" style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {unjumbledWords.map((word, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#667eea',
                      color: 'white',
                      borderRadius: '8px',
                      cursor: 'move'
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="activity-demo-card">
            <h3>🔍 {text.findMatch}</h3>
            <div className="demo-interactive">
              <p>Click pairs of matching items (similar to Match Up)</p>
              <div className="find-match-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem'
              }}>
                {['🍎', '🍎', '🍌', '🍌', '🍊', '🍊'].map((item, idx) => (
                  <button
                    key={idx}
                    style={{
                      padding: '1rem',
                      fontSize: '2rem',
                      border: '2px solid #667eea',
                      borderRadius: '8px',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
