import { useState, useEffect } from 'react';
import type { ContentItem } from '../types';
import type { Language } from '../translations';

interface AnagramActivityProps {
  language: Language;
  content: ContentItem[];
}

export default function AnagramActivity({ language, content }: AnagramActivityProps) {
  const [view, setView] = useState<'teacher' | 'student'>('teacher');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);

  // Extract words from content
  const words = content.map(item => {
    if (item.type === 'word') return item.text;
    if (item.type === 'definition') return item.word;
    if (item.type === 'qa-pair') return item.answer;
    return '';
  }).filter(w => w.length > 0);

  const scrambleWord = (word: string): string => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Make sure it's actually scrambled (not same as original)
    const scrambled = arr.join('');
    return scrambled === word && word.length > 1 ? scrambleWord(word) : scrambled;
  };

  const [scrambledWords, setScrambledWords] = useState<string[]>([]);

  useEffect(() => {
    setScrambledWords(words.map(w => scrambleWord(w)));
  }, [content]);

  const handleCheck = () => {
    const correct = studentAnswer.toLowerCase().trim() === words[currentIndex].toLowerCase();
    setIsCorrect(correct);
    setAttempted(prev => prev + 1);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setStudentAnswer('');
      setIsCorrect(null);
    } else {
      // Reset to start
      setCurrentIndex(0);
      setStudentAnswer('');
      setIsCorrect(null);
      setScore(0);
      setAttempted(0);
      setScrambledWords(words.map(w => scrambleWord(w)));
    }
  };

  const t = {
    en: {
      title: 'Anagram',
      teacherView: 'Teacher View',
      studentView: 'Student View',
      teacherInstructions: 'Teacher: Review the words that will be scrambled for students',
      studentInstructions: 'Student: Unscramble the letters to spell the correct word',
      wordList: 'Word List:',
      scrambled: 'Scrambled:',
      scrambledPreview: 'Scrambled Preview:',
      yourAnswer: 'Your Answer:',
      check: 'Check Answer',
      next: 'Next Word',
      correct: 'Correct!',
      incorrect: 'Incorrect. Try again!',
      score: 'Score:',
      viewStudent: 'View as Student',
      viewTeacher: 'Back to Teacher View',
      restart: 'Restart',
      wordsCompleted: 'All words completed!'
    },
    uk: {
      title: 'Анаграма',
      teacherView: 'Вчитель',
      studentView: 'Учень',
      teacherInstructions: 'Вчитель: Перегляньте слова, які будуть перемішані для учнів',
      studentInstructions: 'Учень: Розплутайте літери, щоб отримати правильне слово',
      wordList: 'Список слів:',
      scrambled: 'Перемішано:',
      scrambledPreview: 'Попередній перегляд:',
      yourAnswer: 'Ваша відповідь:',
      check: 'Перевірити',
      next: 'Наступне слово',
      correct: 'Правильно!',
      incorrect: 'Неправильно. Спробуйте ще раз!',
      score: 'Бали:',
      viewStudent: 'Переглянути як учень',
      viewTeacher: 'Повернутись до вчителя',
      restart: 'Почати заново',
      wordsCompleted: 'Всі слова завершено!'
    }
  };

  const text = t[language];

  if (words.length === 0) {
    return (
      <div className="activity-demo-card">
        <h3>🔤 {text.title}</h3>
        <p style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
          {language === 'en' ? 'No content available. Please add words in the Content Creator above.' : 'Немає контенту. Будь ласка, додайте слова у Створювач Контенту вище.'}
        </p>
      </div>
    );
  }

  return (
    <div className="activity-demo-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>🔤 {text.title}</h3>
        <button
          onClick={() => setView(view === 'teacher' ? 'student' : 'teacher')}
          style={{
            padding: '0.5rem 1rem',
            background: view === 'teacher' ? '#667eea' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 'bold'
          }}
        >
          {view === 'teacher' ? `👨‍🏫 ${text.teacherView}` : `👨‍🎓 ${text.studentView}`}
        </button>
      </div>

      {view === 'teacher' ? (
        <div className="demo-interactive" style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '2px dashed #667eea' }}>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic' }}>
            👨‍🏫 {text.teacherInstructions}
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {text.wordList}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {words.map((word, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    background: 'white',
                    borderRadius: '6px',
                    border: '2px solid #ddd'
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>{idx + 1}. {word}</span>
                  <span style={{ color: '#667eea', fontFamily: 'monospace' }}>
                    → {scrambledWords[idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setView('student')}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '100%'
            }}
          >
            👁️ {text.viewStudent}
          </button>
        </div>
      ) : (
        <div className="demo-interactive" style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', border: '2px dashed #10b981' }}>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic' }}>
            👨‍🎓 {text.studentInstructions}
          </p>

          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {text.score} {score}/{attempted}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>
              {language === 'en' ? 'Word' : 'Слово'} {currentIndex + 1}/{words.length}
            </p>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '2rem',
            background: '#f59e0b',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <p style={{ fontSize: '0.9rem', color: 'white', marginBottom: '0.5rem' }}>
              {text.scrambled}
            </p>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '0.3rem',
              fontFamily: 'monospace',
              margin: 0
            }}>
              {scrambledWords[currentIndex]}
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {text.yourAnswer}
            </label>
            <input
              type="text"
              value={studentAnswer}
              onChange={(e) => {
                setStudentAnswer(e.target.value);
                setIsCorrect(null);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && studentAnswer.trim()) {
                  if (isCorrect) {
                    handleNext();
                  } else {
                    handleCheck();
                  }
                }
              }}
              placeholder={language === 'en' ? 'Type the correct word...' : 'Введіть правильне слово...'}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1.2rem',
                borderRadius: '6px',
                border: '2px solid',
                borderColor: isCorrect === null ? '#667eea' : (isCorrect ? '#10b981' : '#ef4444'),
                textAlign: 'center',
                background: isCorrect ? '#d1fae5' : (isCorrect === false ? '#fee2e2' : 'white')
              }}
            />
          </div>

          {isCorrect !== null && (
            <p style={{
              textAlign: 'center',
              color: isCorrect ? '#10b981' : '#ef4444',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              {isCorrect ? `✅ ${text.correct}` : `❌ ${text.incorrect}`}
            </p>
          )}

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!isCorrect && (
              <button
                onClick={handleCheck}
                disabled={!studentAnswer.trim()}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: studentAnswer.trim() ? '#667eea' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: studentAnswer.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold'
                }}
              >
                ✓ {text.check}
              </button>
            )}
            {isCorrect && (
              <button
                onClick={handleNext}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                → {currentIndex < words.length - 1 ? text.next : text.restart}
              </button>
            )}
          </div>

          <button
            onClick={() => setView('teacher')}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '100%',
              marginTop: '1rem'
            }}
          >
            ← {text.viewTeacher}
          </button>
        </div>
      )}
    </div>
  );
}
