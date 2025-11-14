import { useState, useEffect } from 'react';
import type { ContentItem } from '../types';
import type { Language } from '../translations';

interface MissingWordActivityProps {
  language: Language;
  content: ContentItem[];
}

export default function MissingWordActivity({ language, content }: MissingWordActivityProps) {
  const [view, setView] = useState<'teacher' | 'student'>('teacher');
  const [sentences, setSentences] = useState<Array<{ full: string; wordIndex: number }>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);

  // Extract sentences from content
  useEffect(() => {
    const extractedSentences = content.map(item => {
      let text = '';
      if (item.type === 'word') text = item.text;
      if (item.type === 'definition') text = item.definition;
      if (item.type === 'qa-pair') text = item.question;

      const words = text.split(' ').filter(w => w.length > 0);
      // Pick a random word to remove (excluding very short words)
      const validIndices = words
        .map((w, i) => ({ word: w, index: i }))
        .filter(({ word }) => word.length >= 3)
        .map(({ index }) => index);

      const wordIndex = validIndices.length > 0
        ? validIndices[Math.floor(Math.random() * validIndices.length)]
        : 0;

      return { full: text, wordIndex };
    }).filter(s => s.full.length > 0);

    setSentences(extractedSentences);
    setCurrentIndex(0);
    setStudentAnswer('');
    setIsChecked(false);
    setScore(0);
    setAttempted(0);
  }, [content]);

  const getCurrentSentence = () => {
    if (sentences.length === 0) return { full: '', wordIndex: 0 };
    return sentences[currentIndex] || { full: '', wordIndex: 0 };
  };

  const getSentenceWithGap = () => {
    const { full, wordIndex } = getCurrentSentence();
    const words = full.split(' ');
    return words.map((word, idx) => idx === wordIndex ? '___' : word).join(' ');
  };

  const getMissingWord = () => {
    const { full, wordIndex } = getCurrentSentence();
    const words = full.split(' ');
    return words[wordIndex] || '';
  };

  const handleCheck = () => {
    const correct = studentAnswer.toLowerCase().trim() === getMissingWord().toLowerCase().trim();
    setIsChecked(true);
    setAttempted(prev => prev + 1);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setStudentAnswer('');
      setIsChecked(false);
    } else {
      // Restart
      setCurrentIndex(0);
      setStudentAnswer('');
      setIsChecked(false);
      setScore(0);
      setAttempted(0);
    }
  };

  const handleWordClick = (wordIndex: number) => {
    const newSentences = [...sentences];
    newSentences[currentIndex] = { ...newSentences[currentIndex], wordIndex };
    setSentences(newSentences);
  };

  const t = {
    en: {
      title: 'Missing Word',
      teacherView: 'Teacher View',
      studentView: 'Student View',
      teacherInstructions: 'Teacher: Enter complete sentences. Click a word to mark it as the missing word.',
      studentInstructions: 'Student: Fill in the missing word to complete the sentence',
      sentenceList: 'Sentences:',
      completeSentence: 'Complete Sentence:',
      missingWord: 'Missing Word:',
      yourAnswer: 'Your Answer:',
      check: 'Check Answer',
      next: 'Next Sentence',
      correct: 'Correct!',
      incorrect: 'Incorrect. The answer is:',
      score: 'Score:',
      viewStudent: 'View as Student',
      viewTeacher: 'Back to Teacher View',
      restart: 'Restart',
      addSentence: 'Add Sentence:',
      sentenceExample: 'e.g., "The cat sat on the mat"',
      clickWord: 'Click a word below to select it as the missing word'
    },
    uk: {
      title: 'Пропущене слово',
      teacherView: 'Вчитель',
      studentView: 'Учень',
      teacherInstructions: 'Вчитель: Введіть повні речення. Натисніть на слово, щоб позначити його як пропущене.',
      studentInstructions: 'Учень: Заповніть пропущене слово, щоб завершити речення',
      sentenceList: 'Речення:',
      completeSentence: 'Повне речення:',
      missingWord: 'Пропущене слово:',
      yourAnswer: 'Ваша відповідь:',
      check: 'Перевірити',
      next: 'Наступне речення',
      correct: 'Правильно!',
      incorrect: 'Неправильно. Відповідь:',
      score: 'Бали:',
      viewStudent: 'Переглянути як учень',
      viewTeacher: 'Повернутись до вчителя',
      restart: 'Почати заново',
      addSentence: 'Додати речення:',
      sentenceExample: 'напр., "Кіт сидів на килимі"',
      clickWord: 'Натисніть на слово нижче, щоб вибрати його як пропущене'
    }
  };

  const text = t[language];

  if (sentences.length === 0) {
    return (
      <div className="activity-demo-card">
        <h3>📝 {text.title}</h3>
        <p style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
          {language === 'en' ? 'No content available. Please add items in the Content Creator above.' : 'Немає контенту. Будь ласка, додайте елементи у Створювач Контенту вище.'}
        </p>
      </div>
    );
  }

  return (
    <div className="activity-demo-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>📝 {text.title}</h3>
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
              {text.sentenceList}
            </label>
            {sentences.map((sentence, idx) => {
              const words = sentence.full.split(' ');
              const isActive = idx === currentIndex;

              return (
                <div
                  key={idx}
                  style={{
                    padding: '1rem',
                    background: isActive ? 'white' : '#f9fafb',
                    borderRadius: '6px',
                    border: isActive ? '2px solid #667eea' : '2px solid #ddd',
                    marginBottom: '0.5rem'
                  }}
                  onClick={() => setCurrentIndex(idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      minWidth: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#667eea',
                      color: 'white',
                      borderRadius: '50%',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontWeight: 'bold', color: '#667eea' }}>{text.completeSentence}</span>
                  </div>

                  {isActive && (
                    <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                      {text.clickWord}
                    </p>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {words.map((word, wordIdx) => (
                      <button
                        key={wordIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isActive) handleWordClick(wordIdx);
                        }}
                        disabled={!isActive}
                        style={{
                          padding: '0.5rem 0.75rem',
                          background: wordIdx === sentence.wordIndex ? '#ef4444' : '#e5e7eb',
                          color: wordIdx === sentence.wordIndex ? 'white' : '#374151',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: isActive ? 'pointer' : 'default',
                          fontWeight: wordIdx === sentence.wordIndex ? 'bold' : 'normal',
                          fontSize: '1rem',
                          transition: 'all 0.2s'
                        }}
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
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
              {language === 'en' ? 'Sentence' : 'Речення'} {currentIndex + 1}/{sentences.length}
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'white',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '2px solid #667eea'
          }}>
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.8',
              textAlign: 'center',
              margin: 0
            }}>
              {getSentenceWithGap()}
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
                setIsChecked(false);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && studentAnswer.trim()) {
                  if (isChecked && studentAnswer.toLowerCase().trim() === getMissingWord().toLowerCase().trim()) {
                    handleNext();
                  } else if (!isChecked) {
                    handleCheck();
                  }
                }
              }}
              placeholder={language === 'en' ? 'Type the missing word...' : 'Введіть пропущене слово...'}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1.1rem',
                borderRadius: '6px',
                border: '2px solid',
                borderColor: !isChecked ? '#667eea' : (studentAnswer.toLowerCase().trim() === getMissingWord().toLowerCase().trim() ? '#10b981' : '#ef4444'),
                textAlign: 'center',
                background: !isChecked ? 'white' : (studentAnswer.toLowerCase().trim() === getMissingWord().toLowerCase().trim() ? '#d1fae5' : '#fee2e2')
              }}
            />
          </div>

          {isChecked && (
            <div style={{
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '6px',
              background: studentAnswer.toLowerCase().trim() === getMissingWord().toLowerCase().trim() ? '#d1fae5' : '#fee2e2',
              textAlign: 'center'
            }}>
              {studentAnswer.toLowerCase().trim() === getMissingWord().toLowerCase().trim() ? (
                <p style={{ color: '#10b981', fontWeight: 'bold', margin: 0 }}>
                  ✅ {text.correct}
                </p>
              ) : (
                <p style={{ color: '#ef4444', fontWeight: 'bold', margin: 0 }}>
                  ❌ {text.incorrect} <strong>{getMissingWord()}</strong>
                </p>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {!isChecked && (
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
            {isChecked && (
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
                → {currentIndex < sentences.length - 1 ? text.next : text.restart}
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
              width: '100%'
            }}
          >
            ← {text.viewTeacher}
          </button>
        </div>
      )}
    </div>
  );
}
