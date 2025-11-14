import { useState } from 'react';
import type { Language } from '../translations';

interface MissingWordActivityProps {
  language: Language;
}

interface Sentence {
  full: string;
  wordIndex: number;
}

export default function MissingWordActivity({ language }: MissingWordActivityProps) {
  const [view, setView] = useState<'teacher' | 'student'>('teacher');
  const [sentences, setSentences] = useState<Sentence[]>([
    { full: 'The cat sat on the mat', wordIndex: 1 },
    { full: 'I went to school yesterday', wordIndex: 2 }
  ]);
  const [newSentence, setNewSentence] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [showHint, setShowHint] = useState(false);

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

  const getHint = () => {
    const word = getMissingWord();
    if (!word) return '';
    const firstLetter = word[0];
    const length = word.length;
    return `Starts with "${firstLetter}" (${length} letters)`;
  };

  const handleAddSentence = () => {
    if (newSentence.trim().split(' ').length >= 2) {
      const words = newSentence.trim().split(' ');
      // Auto-select first word with 3+ characters
      const wordIndex = words.findIndex(w => w.length >= 3);
      setSentences([...sentences, {
        full: newSentence.trim(),
        wordIndex: wordIndex >= 0 ? wordIndex : 0
      }]);
      setNewSentence('');
    }
  };

  const handleRemoveSentence = (index: number) => {
    const newSentences = sentences.filter((_, idx) => idx !== index);
    setSentences(newSentences);
    if (currentIndex >= newSentences.length && newSentences.length > 0) {
      setCurrentIndex(newSentences.length - 1);
    }
  };

  const handleWordClick = (sentenceIndex: number, wordIndex: number) => {
    const newSentences = [...sentences];
    newSentences[sentenceIndex] = { ...newSentences[sentenceIndex], wordIndex };
    setSentences(newSentences);
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
      setShowHint(false);
    } else {
      // Restart
      setCurrentIndex(0);
      setStudentAnswer('');
      setIsChecked(false);
      setScore(0);
      setAttempted(0);
      setShowHint(false);
    }
  };

  const t = {
    en: {
      title: 'Missing Word',
      teacherView: 'Teacher View',
      studentView: 'Student View',
      teacherInstructions: 'Teacher: Type a sentence, then click a word to mark it as the missing word',
      studentInstructions: 'Student: Fill in the missing word to complete the sentence',
      sentenceList: 'Your Sentences:',
      addSentence: 'Add New Sentence:',
      addButton: 'Add Sentence',
      placeholder: 'Type a sentence here (e.g., "The cat sat on the mat")',
      clickWord: 'Click a word to select it as the missing word',
      yourAnswer: 'Your Answer:',
      check: 'Check Answer',
      next: 'Next Sentence',
      showHint: 'Show Hint',
      hint: 'Hint:',
      correct: 'Correct!',
      incorrect: 'Incorrect. The answer is:',
      score: 'Score:',
      viewStudent: 'View as Student',
      viewTeacher: 'Back to Teacher View',
      restart: 'Restart',
      remove: 'Remove',
      noSentences: 'No sentences yet. Add your first sentence above!',
      needMoreWords: 'Sentence must have at least 2 words'
    },
    uk: {
      title: 'Пропущене слово',
      teacherView: 'Вчитель',
      studentView: 'Учень',
      teacherInstructions: 'Вчитель: Введіть речення, потім натисніть на слово, щоб позначити його як пропущене',
      studentInstructions: 'Учень: Заповніть пропущене слово, щоб завершити речення',
      sentenceList: 'Ваші речення:',
      addSentence: 'Додати нове речення:',
      addButton: 'Додати речення',
      placeholder: 'Введіть речення (напр., "Кіт сидів на килимі")',
      clickWord: 'Натисніть на слово, щоб вибрати його як пропущене',
      yourAnswer: 'Ваша відповідь:',
      check: 'Перевірити',
      next: 'Наступне речення',
      showHint: 'Показати підказку',
      hint: 'Підказка:',
      correct: 'Правильно!',
      incorrect: 'Неправильно. Відповідь:',
      score: 'Бали:',
      viewStudent: 'Переглянути як учень',
      viewTeacher: 'Повернутись до вчителя',
      restart: 'Почати заново',
      remove: 'Видалити',
      noSentences: 'Ще немає речень. Додайте перше речення вище!',
      needMoreWords: 'Речення повинно мати принаймні 2 слова'
    }
  };

  const text = t[language];

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
            fontWeight: 'bold',
            minHeight: '44px',
            minWidth: '120px'
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

          {/* Add new sentence */}
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'white', borderRadius: '8px', border: '2px solid #667eea' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {text.addSentence}
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={newSentence}
                onChange={(e) => setNewSentence(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddSentence();
                }}
                placeholder={text.placeholder}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontSize: '1rem',
                  borderRadius: '6px',
                  border: '2px solid #e5e7eb',
                  minHeight: '44px'
                }}
              />
              <button
                onClick={handleAddSentence}
                disabled={newSentence.trim().split(' ').length < 2}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: newSentence.trim().split(' ').length >= 2 ? '#667eea' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: newSentence.trim().split(' ').length >= 2 ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  minHeight: '44px',
                  minWidth: '120px'
                }}
              >
                ➕ {text.addButton}
              </button>
            </div>
            {newSentence.trim() && newSentence.trim().split(' ').length < 2 && (
              <p style={{ fontSize: '0.85rem', color: '#ef4444', marginTop: '0.5rem', marginBottom: 0 }}>
                ⚠️ {text.needMoreWords}
              </p>
            )}
          </div>

          {/* Sentence list */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {text.sentenceList}
            </label>
            {sentences.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999', padding: '2rem', background: 'white', borderRadius: '8px' }}>
                {text.noSentences}
              </p>
            ) : (
              sentences.map((sentence, idx) => {
                const words = sentence.full.split(' ');
                const isActive = idx === currentIndex;

                return (
                  <div
                    key={idx}
                    style={{
                      padding: '1rem',
                      background: isActive ? 'white' : '#f9fafb',
                      borderRadius: '8px',
                      border: isActive ? '2px solid #667eea' : '2px solid #ddd',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold', color: '#667eea' }}>#{idx + 1}</span>
                      <button
                        onClick={() => handleRemoveSentence(idx)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          minHeight: '28px'
                        }}
                      >
                        ❌ {text.remove}
                      </button>
                    </div>

                    {isActive && (
                      <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                        💡 {text.clickWord}
                      </p>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {words.map((word, wordIdx) => (
                        <button
                          key={wordIdx}
                          onClick={() => handleWordClick(idx, wordIdx)}
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
                            transition: 'all 0.2s',
                            opacity: isActive ? 1 : 0.6,
                            minHeight: '44px',
                            minWidth: '44px'
                          }}
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <button
            onClick={() => setView('student')}
            disabled={sentences.length === 0}
            style={{
              padding: '0.75rem 1.5rem',
              background: sentences.length > 0 ? '#10b981' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: sentences.length > 0 ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              width: '100%',
              minHeight: '44px'
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

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                {text.score} {score}/{attempted}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#666' }}>
                {language === 'en' ? 'Sentence' : 'Речення'} {currentIndex + 1}/{sentences.length}
              </p>
            </div>

            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '8px',
              background: '#e5e7eb',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${((currentIndex + 1) / sentences.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                transition: 'width 0.3s ease',
                borderRadius: '4px'
              }} />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#666', textAlign: 'center', marginTop: '0.25rem' }}>
              {Math.round(((currentIndex + 1) / sentences.length) * 100)}% {language === 'en' ? 'Complete' : 'Завершено'}
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
                background: !isChecked ? 'white' : (studentAnswer.toLowerCase().trim() === getMissingWord().toLowerCase().trim() ? '#d1fae5' : '#fee2e2'),
                minHeight: '44px'
              }}
            />
          </div>

          {showHint && !isChecked && (
            <div style={{
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '6px',
              background: '#fef3c7',
              border: '2px solid #f59e0b'
            }}>
              <p style={{ margin: 0, color: '#92400e', fontSize: '0.95rem' }}>
                💡 <strong>{text.hint}</strong> {getHint()}
              </p>
            </div>
          )}

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
            {!isChecked && !showHint && (
              <button
                onClick={() => setShowHint(true)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  minHeight: '44px'
                }}
              >
                💡 {text.showHint}
              </button>
            )}
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
                  fontWeight: 'bold',
                  minHeight: '44px'
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
                  fontWeight: 'bold',
                  minHeight: '44px'
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
              width: '100%',
              minHeight: '44px'
            }}
          >
            ← {text.viewTeacher}
          </button>
        </div>
      )}
    </div>
  );
}
