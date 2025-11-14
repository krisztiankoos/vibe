import React, { useState } from 'react';
import type { Language } from '../translations';

interface DemoPageProps {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  onExit: () => void;
}

export default function DemoPage({ language, onChangeLanguage, onExit }: DemoPageProps) {
  // View mode state - teacher or student view for each activity
  const [viewMode, setViewMode] = useState<Record<string, 'teacher' | 'student'>>({});

  // Random Wheel state
  const [wheelItems, setWheelItems] = useState<string[]>(['present simple', 'past simple', 'present perfect', 'past continuous', 'future simple']);
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState('');
  const [newWheelItem, setNewWheelItem] = useState('');

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
  const [unjumbledWords, setUnjumbledWords] = useState<string[]>(['went', 'I', 'yesterday', 'school', 'to']);

  // Gameshow Quiz state
  const [gameshowAnswer, setGameshowAnswer] = useState<number | null>(null);
  const [gameshowTimer, setGameshowTimer] = useState(30);
  const [gameshowActive, setGameshowActive] = useState(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [removedOptions, setRemovedOptions] = useState<number[]>([]);

  // Group Sort state
  const [unsortedItems, setUnsortedItems] = useState<string[]>(['run', 'book', 'swim', 'table', 'eat', 'chair']);
  const [sortedNouns, setSortedNouns] = useState<string[]>([]);
  const [sortedVerbs, setSortedVerbs] = useState<string[]>([]);

  // Find Match state
  const [findMatchItems] = useState(['🍎', '🍎', '🍌', '🍌', '🍊', '🍊']);
  const [findMatchSelected, setFindMatchSelected] = useState<number[]>([]);
  const [findMatchMatched, setFindMatchMatched] = useState<number[]>([]);

  const t = {
    en: {
      title: 'Interactive Activity Demos',
      subtitle: 'See how teachers CREATE and students USE each activity type',
      exit: 'Exit Demo',
      switchLanguage: 'Switch to Ukrainian',

      // View toggle
      teacherView: 'Teacher View',
      studentView: 'Student View',
      viewTeacher: 'View as Teacher',
      viewStudent: 'View as Student',

      // Teacher instructions
      teacherInstructions: 'This is what YOU see when creating the activity',
      studentInstructions: 'This is what STUDENTS see when doing the activity',
      addItem: 'Add Item',
      removeItem: 'Remove',
      editContent: 'Edit Content',

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
      wheelTitle: 'Grammar Tense Selector',
      wheelDescription: 'Random tense for practice sentences',
      spinWheel: 'Spin the Wheel',
      wheelItemsLabel: 'Wheel Items (one per line):',
      wheelItemPlaceholder: 'Enter item...',

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
      sortInstructions: 'Click words to sort into categories:',
      sortItems: ['run', 'book', 'swim', 'table', 'eat', 'chair'],
      nouns: 'Nouns',
      verbs: 'Verbs',
      unsorted: 'Unsorted Items',

      // Gameshow Quiz
      gameshowQuestion: 'What is the capital of France?',
      gameshowOptions: ['London', 'Paris', 'Berlin', 'Madrid'],
      fiftyFifty: '50/50',
      timeLeft: 'Time:',
      startQuiz: 'Start Quiz',

      // Find Match
      findMatchInstructions: 'Click two matching items to make them disappear'
    },
    uk: {
      title: 'Демонстрація Інтерактивних Активностей',
      subtitle: 'Дивіться, як вчителі СТВОРЮЮТЬ і студенти ВИКОРИСТОВУЮТЬ кожен тип активності',
      exit: 'Вийти з Демо',
      switchLanguage: 'Перемкнути на English',

      // View toggle
      teacherView: 'Вигляд Вчителя',
      studentView: 'Вигляд Студента',
      viewTeacher: 'Переглянути як Вчитель',
      viewStudent: 'Переглянути як Студент',

      // Teacher instructions
      teacherInstructions: 'Це те, що ВИ бачите при створенні активності',
      studentInstructions: 'Це те, що СТУДЕНТИ бачать при виконанні активності',
      addItem: 'Додати Елемент',
      removeItem: 'Видалити',
      editContent: 'Редагувати Вміст',

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
      wheelTitle: 'Вибір Граматичного Часу',
      wheelDescription: 'Випадковий час для практичних речень',
      spinWheel: 'Крутити Колесо',
      wheelItemsLabel: 'Елементи Колеса (по одному на рядок):',
      wheelItemPlaceholder: 'Введіть елемент...',

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
      sortInstructions: 'Натисніть слова, щоб сортувати за категоріями:',
      sortItems: ['бігти', 'книга', 'плавати', 'стіл', 'їсти', 'стілець'],
      nouns: 'Іменники',
      verbs: 'Дієслова',
      unsorted: 'Несортовані Елементи',

      // Gameshow Quiz
      gameshowQuestion: 'Яка столиця Франції?',
      gameshowOptions: ['Лондон', 'Париж', 'Берлін', 'Мадрид'],
      fiftyFifty: '50/50',
      timeLeft: 'Час:',
      startQuiz: 'Почати Квіз',

      // Find Match
      findMatchInstructions: 'Натисніть два однакові елементи, щоб вони зникли'
    }
  };

  const text = t[language];

  // View toggle helper
  const toggleView = (activityId: string) => {
    setViewMode(prev => ({
      ...prev,
      [activityId]: prev[activityId] === 'teacher' ? 'student' : 'teacher'
    }));
  };

  const getView = (activityId: string): 'teacher' | 'student' => {
    return viewMode[activityId] || 'teacher'; // Default to teacher view
  };

  // Random Wheel handlers
  const handleAddWheelItem = () => {
    if (newWheelItem.trim()) {
      setWheelItems([...wheelItems, newWheelItem.trim()]);
      setNewWheelItem('');
    }
  };

  const handleRemoveWheelItem = (index: number) => {
    setWheelItems(wheelItems.filter((_, i) => i !== index));
  };

  const handleSpin = () => {
    setWheelSpinning(true);
    setWheelResult('');
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * wheelItems.length);
      setWheelResult(wheelItems[randomIndex]);
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

  // Gameshow Quiz handlers
  const handleStartGameshow = () => {
    setGameshowActive(true);
    setGameshowTimer(30);
    setGameshowAnswer(null);
    setFiftyFiftyUsed(false);
    setRemovedOptions([]);
  };

  const handleFiftyFifty = () => {
    if (!fiftyFiftyUsed) {
      setFiftyFiftyUsed(true);
      // Remove 2 wrong answers (keep index 1 which is correct, and one random wrong)
      const wrongOptions = [0, 2, 3]; // indices of wrong answers
      const keepWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      const toRemove = wrongOptions.filter(idx => idx !== keepWrong);
      setRemovedOptions(toRemove);
    }
  };

  const handleGameshowAnswer = (index: number) => {
    setGameshowAnswer(index);
    setGameshowActive(false);
  };

  // Group Sort handlers
  const handleSortItem = (item: string, category: 'noun' | 'verb') => {
    setUnsortedItems(unsortedItems.filter(i => i !== item));
    if (category === 'noun') {
      setSortedNouns([...sortedNouns, item]);
    } else {
      setSortedVerbs([...sortedVerbs, item]);
    }
  };

  // Unjumble handler
  const handleWordClick = (index: number) => {
    // Move clicked word to the end
    const newWords = [...unjumbledWords];
    const [word] = newWords.splice(index, 1);
    newWords.push(word);
    setUnjumbledWords(newWords);
  };

  // Find Match handler
  const handleFindMatchClick = (index: number) => {
    if (findMatchMatched.includes(index) || findMatchSelected.includes(index)) {
      return;
    }

    const newSelected = [...findMatchSelected, index];
    setFindMatchSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (findMatchItems[first] === findMatchItems[second]) {
        setFindMatchMatched([...findMatchMatched, first, second]);
      }
      setTimeout(() => setFindMatchSelected([]), 500);
    }
  };

  // Gameshow timer effect
  React.useEffect(() => {
    if (gameshowActive && gameshowTimer > 0) {
      const timer = setTimeout(() => setGameshowTimer(gameshowTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameshowActive && gameshowTimer === 0) {
      setGameshowActive(false);
    }
  }, [gameshowActive, gameshowTimer]);

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>🎡 {text.randomWheel}</h3>
              <button
                onClick={() => toggleView('wheel')}
                style={{
                  padding: '0.5rem 1rem',
                  background: getView('wheel') === 'teacher' ? '#667eea' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}
              >
                {getView('wheel') === 'teacher' ? `👨‍🏫 ${text.teacherView}` : `👨‍🎓 ${text.studentView}`}
              </button>
            </div>

            {getView('wheel') === 'teacher' ? (
              /* TEACHER VIEW - Creating the wheel */
              <div className="demo-interactive" style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '2px dashed #667eea' }}>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic' }}>
                  👨‍🏫 {text.teacherInstructions}
                </p>
                <h4 style={{ marginTop: 0 }}>{text.wheelTitle}</h4>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>{text.wheelDescription}</p>

                <div style={{ marginTop: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {text.wheelItemsLabel}
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input
                      type="text"
                      value={newWheelItem}
                      onChange={(e) => setNewWheelItem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddWheelItem()}
                      placeholder={text.wheelItemPlaceholder}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        border: '2px solid #667eea',
                        borderRadius: '6px',
                        fontSize: '1rem'
                      }}
                    />
                    <button onClick={handleAddWheelItem} className="demo-btn" style={{ margin: 0 }}>
                      + {text.addItem}
                    </button>
                  </div>

                  <div style={{ background: 'white', padding: '1rem', borderRadius: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                    {wheelItems.map((item, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem',
                        background: '#f9f9f9',
                        borderRadius: '4px',
                        marginBottom: '0.5rem'
                      }}>
                        <span>{item}</span>
                        <button
                          onClick={() => handleRemoveWheelItem(idx)}
                          style={{
                            padding: '0.25rem 0.75rem',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          ✕ {text.removeItem}
                        </button>
                      </div>
                    ))}
                    {wheelItems.length === 0 && (
                      <p style={{ textAlign: 'center', color: '#999', margin: 0 }}>No items yet. Add some above!</p>
                    )}
                  </div>

                  <button
                    onClick={() => toggleView('wheel')}
                    style={{
                      marginTop: '1rem',
                      width: '100%',
                      padding: '0.75rem',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    👁️ {text.viewStudent}
                  </button>
                </div>
              </div>
            ) : (
              /* STUDENT VIEW - Using the wheel */
              <div className="demo-interactive" style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', border: '2px dashed #10b981' }}>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic' }}>
                  👨‍🎓 {text.studentInstructions}
                </p>
                <h4 style={{ textAlign: 'center', marginTop: 0 }}>{text.wheelTitle}</h4>
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
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  padding: '1rem',
                  animation: wheelSpinning ? 'spin 0.3s linear infinite' : 'none'
                }}>
                  {wheelResult || '?'}
                </div>
                <button onClick={handleSpin} disabled={wheelSpinning || wheelItems.length === 0} className="demo-btn">
                  {text.spinWheel}
                </button>
                {wheelItems.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#ef4444', fontSize: '0.9rem', marginTop: '1rem' }}>
                    (Teacher needs to add items first)
                  </p>
                )}
                <button
                  onClick={() => toggleView('wheel')}
                  style={{
                    marginTop: '1rem',
                    width: '100%',
                    padding: '0.5rem',
                    background: 'white',
                    color: '#667eea',
                    border: '2px solid #667eea',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.85rem'
                  }}
                >
                  ← {text.viewTeacher}
                </button>
              </div>
            )}
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

          {/* 9. Gameshow Quiz */}
          <div className="activity-demo-card">
            <h3>🎯 {text.gameshowQuiz}</h3>
            <div className="demo-interactive">
              {!gameshowActive && gameshowAnswer === null && (
                <button onClick={handleStartGameshow} className="demo-btn" style={{ marginBottom: '1rem' }}>
                  {text.startQuiz}
                </button>
              )}

              {gameshowActive && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: gameshowTimer <= 10 ? '#ef4444' : '#667eea',
                      animation: gameshowTimer <= 10 ? 'pulse 1s infinite' : 'none'
                    }}>
                      {text.timeLeft} {gameshowTimer}s
                    </div>
                    <button
                      onClick={handleFiftyFifty}
                      disabled={fiftyFiftyUsed}
                      style={{
                        padding: '0.5rem 1rem',
                        background: fiftyFiftyUsed ? '#ccc' : '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: fiftyFiftyUsed ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      💎 {text.fiftyFifty}
                    </button>
                  </div>
                  <p><strong>{text.gameshowQuestion}</strong></p>
                  <div className="quiz-options">
                    {text.gameshowOptions.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleGameshowAnswer(idx)}
                        disabled={removedOptions.includes(idx)}
                        style={{
                          display: removedOptions.includes(idx) ? 'none' : 'block',
                          width: '100%',
                          margin: '0.5rem 0',
                          padding: '0.75rem',
                          border: '2px solid #ddd',
                          borderRadius: '8px',
                          background: 'white',
                          color: '#333',
                          cursor: 'pointer'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {!gameshowActive && gameshowAnswer !== null && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: gameshowAnswer === 1 ? '#10b981' : '#ef4444',
                    marginBottom: '1rem'
                  }}>
                    {gameshowAnswer === 1 ? text.correct : text.incorrect}
                  </p>
                  <button onClick={handleStartGameshow} className="demo-btn">
                    {text.startQuiz}
                  </button>
                </div>
              )}

              {!gameshowActive && gameshowTimer === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{ fontSize: '1.2rem', color: '#ef4444', marginBottom: '1rem' }}>
                    ⏰ Time's up!
                  </p>
                  <button onClick={handleStartGameshow} className="demo-btn">
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 10. Group Sort */}
          <div className="activity-demo-card">
            <h3>🗂️ {text.groupSort}</h3>
            <div className="demo-interactive">
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{text.sortInstructions}</p>

              {unsortedItems.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{text.unsorted}:</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {unsortedItems.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.25rem' }}>
                        <button
                          onClick={() => handleSortItem(item, 'noun')}
                          style={{
                            padding: '0.5rem 0.75rem',
                            background: 'white',
                            border: '2px solid #667eea',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                          title={`Sort as ${text.nouns}`}
                        >
                          {item} → N
                        </button>
                        <button
                          onClick={() => handleSortItem(item, 'verb')}
                          style={{
                            padding: '0.5rem 0.75rem',
                            background: 'white',
                            border: '2px solid #10b981',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                          title={`Sort as ${text.verbs}`}
                        >
                          {item} → V
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#667eea' }}>{text.nouns}:</strong>{' '}
                  {sortedNouns.length > 0 ? sortedNouns.join(', ') : '—'}
                </p>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: '#10b981' }}>{text.verbs}:</strong>{' '}
                  {sortedVerbs.length > 0 ? sortedVerbs.join(', ') : '—'}
                </p>
              </div>

              {unsortedItems.length === 0 && (
                <p style={{ textAlign: 'center', marginTop: '1rem', color: '#10b981', fontWeight: 'bold' }}>
                  ✅ All sorted!
                </p>
              )}
            </div>
          </div>

          {/* 11. Unjumble */}
          <div className="activity-demo-card">
            <h3>🔀 {text.unjumble}</h3>
            <div className="demo-interactive">
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Click words to move them to the end:</p>
              <div className="unjumble-words" style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                {unjumbledWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWordClick(idx)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#667eea',
                      color: 'white',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: 'none',
                      fontSize: '1rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {word}
                  </button>
                ))}
              </div>
              <div style={{
                padding: '1rem',
                background: '#f0f0f0',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '1.1rem'
              }}>
                <strong>Current:</strong> {unjumbledWords.join(' ')}
              </div>
              {unjumbledWords.join(' ') === 'I went to school yesterday' && (
                <p style={{ textAlign: 'center', marginTop: '1rem', color: '#10b981', fontWeight: 'bold' }}>
                  ✅ {text.correct}
                </p>
              )}
            </div>
          </div>

          {/* 12. Find the Match */}
          <div className="activity-demo-card">
            <h3>🔍 {text.findMatch}</h3>
            <div className="demo-interactive">
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{text.findMatchInstructions}</p>
              <div className="find-match-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem'
              }}>
                {findMatchItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleFindMatchClick(idx)}
                    disabled={findMatchMatched.includes(idx)}
                    style={{
                      padding: '1rem',
                      fontSize: '2rem',
                      border: '2px solid',
                      borderColor: findMatchSelected.includes(idx) ? '#f59e0b' : (findMatchMatched.includes(idx) ? '#10b981' : '#667eea'),
                      borderRadius: '8px',
                      background: findMatchMatched.includes(idx) ? '#d1fae5' : (findMatchSelected.includes(idx) ? '#fef3c7' : 'white'),
                      cursor: findMatchMatched.includes(idx) ? 'not-allowed' : 'pointer',
                      opacity: findMatchMatched.includes(idx) ? 0.3 : 1,
                      transition: 'all 0.3s ease',
                      transform: findMatchSelected.includes(idx) ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    {findMatchMatched.includes(idx) ? '✓' : item}
                  </button>
                ))}
              </div>
              {findMatchMatched.length === 6 && (
                <p style={{ textAlign: 'center', marginTop: '1rem', color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  🎉 All matched!
                </p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
