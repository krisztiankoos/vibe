import { useState, useEffect } from 'react';
import type { ContentItem } from '../types';
import type { Language } from '../translations';

interface UnjumbleActivityProps {
  language: Language;
  content: ContentItem[];
}

export default function UnjumbleActivity({ language, content }: UnjumbleActivityProps) {
  const [view, setView] = useState<'teacher' | 'student'>('teacher');
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  // Extract sentences from content
  useEffect(() => {
    const extractedSentences = content.map(item => {
      if (item.type === 'word') return item.text;
      if (item.type === 'definition') return item.definition;
      if (item.type === 'qa-pair') return item.question;
      return '';
    }).filter(s => s.trim().length > 0 && s.includes(' ')); // Only sentences with multiple words

    setSentences(extractedSentences);
    if (extractedSentences.length > 0) {
      scrambleSentence(extractedSentences[0]);
    }
    setCurrentIndex(0);
    setScore(0);
    setAttempted(0);
    setIsChecked(false);
  }, [content]);

  const scrambleSentence = (sentence: string) => {
    const words = sentence.split(' ').filter(w => w.trim());
    const scrambled = [...words].sort(() => Math.random() - 0.5);
    setScrambledWords(scrambled);
    setIsChecked(false);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null) return;

    const newWords = [...scrambledWords];
    const [draggedWord] = newWords.splice(draggedIndex, 1);
    newWords.splice(dropIndex, 0, draggedWord);

    setScrambledWords(newWords);
    setDraggedIndex(null);
    setIsChecked(false);
  };

  const handleCheck = () => {
    const correct = scrambledWords.join(' ') === sentences[currentIndex];
    setIsChecked(true);
    setAttempted(prev => prev + 1);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrambleSentence(sentences[nextIndex]);
      setIsChecked(false);
    } else {
      // Restart
      setCurrentIndex(0);
      scrambleSentence(sentences[0]);
      setScore(0);
      setAttempted(0);
      setIsChecked(false);
    }
  };

  const handleReset = () => {
    scrambleSentence(sentences[currentIndex]);
  };

  const t = {
    en: {
      title: 'Unjumble',
      teacherView: 'Teacher View',
      studentView: 'Student View',
      teacherInstructions: 'Teacher: Review sentences that will be scrambled for students',
      studentInstructions: 'Student: Drag words to arrange them in the correct order',
      sentenceList: 'Sentences:',
      correctSentence: 'Correct Sentence:',
      scrambledPreview: 'Scrambled Preview:',
      dragInstruction: 'Drag and drop words to reorder them',
      check: 'Check Answer',
      next: 'Next Sentence',
      reset: 'Reset',
      correct: 'Perfect! Sentence is correct!',
      incorrect: 'Not quite. Keep trying!',
      score: 'Score:',
      viewStudent: 'View as Student',
      viewTeacher: 'Back to Teacher View',
      restart: 'Restart'
    },
    uk: {
      title: 'Розплутай',
      teacherView: 'Вчитель',
      studentView: 'Учень',
      teacherInstructions: 'Вчитель: Перегляньте речення, які будуть перемішані для учнів',
      studentInstructions: 'Учень: Перетягніть слова, щоб розставити їх у правильному порядку',
      sentenceList: 'Речення:',
      correctSentence: 'Правильне речення:',
      scrambledPreview: 'Попередній перегляд:',
      dragInstruction: 'Перетягніть слова, щоб змінити порядок',
      check: 'Перевірити',
      next: 'Наступне речення',
      reset: 'Скинути',
      correct: 'Ідеально! Речення правильне!',
      incorrect: 'Не зовсім. Продовжуйте спробувати!',
      score: 'Бали:',
      viewStudent: 'Переглянути як учень',
      viewTeacher: 'Повернутись до вчителя',
      restart: 'Почати заново'
    }
  };

  const text = t[language];

  if (sentences.length === 0) {
    return (
      <div className="activity-demo-card">
        <h3>🔀 {text.title}</h3>
        <p style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
          {language === 'en' ? 'No content available. Please add multi-word items in the Content Creator above.' : 'Немає контенту. Будь ласка, додайте елементи з кількома словами у Створювач Контенту вище.'}
        </p>
      </div>
    );
  }

  return (
    <div className="activity-demo-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>🔀 {text.title}</h3>
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
              const words = sentence.split(' ');
              const scrambled = [...words].sort(() => Math.random() - 0.5);

              return (
                <div
                  key={idx}
                  style={{
                    padding: '0.75rem',
                    background: 'white',
                    borderRadius: '6px',
                    border: '2px solid #ddd',
                    marginBottom: '0.5rem'
                  }}
                >
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', color: '#667eea' }}>{idx + 1}. {text.correctSentence}</span>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '1rem' }}>{sentence}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>{text.scrambledPreview}</span>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                      {scrambled.map((word, wordIdx) => (
                        <span
                          key={wordIdx}
                          style={{
                            padding: '0.25rem 0.5rem',
                            background: '#f3f4f6',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            fontFamily: 'monospace'
                          }}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
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
            padding: '1rem',
            background: '#fff',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '2px solid #667eea'
          }}>
            <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 0.5rem 0', textAlign: 'center' }}>
              📋 {text.dragInstruction}
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginBottom: '1rem',
            padding: '1rem',
            background: 'white',
            borderRadius: '8px',
            border: '2px solid #e5e7eb',
            minHeight: '100px'
          }}>
            {scrambledWords.map((word, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(idx)}
                style={{
                  padding: '0.75rem 1rem',
                  background: draggedIndex === idx ? '#e0e7ff' : '#f9fafb',
                  border: draggedIndex === idx ? '2px dashed #667eea' : '2px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'grab',
                  userSelect: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s',
                  boxShadow: draggedIndex === idx ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                }}
              >
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
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  flex: 1
                }}>
                  {word}
                </span>
                <span style={{ color: '#9ca3af', fontSize: '1.2rem' }}>
                  ⋮⋮
                </span>
              </div>
            ))}
          </div>

          <div style={{
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '6px',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 0.25rem 0' }}>
              {language === 'en' ? 'Current order:' : 'Поточний порядок:'}
            </p>
            <p style={{ fontSize: '1rem', fontWeight: '500', margin: 0 }}>
              {scrambledWords.join(' ')}
            </p>
          </div>

          {isChecked && (
            <div style={{
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '6px',
              background: scrambledWords.join(' ') === sentences[currentIndex] ? '#d1fae5' : '#fef3c7',
              textAlign: 'center'
            }}>
              <p style={{
                color: scrambledWords.join(' ') === sentences[currentIndex] ? '#10b981' : '#f59e0b',
                fontWeight: 'bold',
                margin: 0
              }}>
                {scrambledWords.join(' ') === sentences[currentIndex] ? `🎉 ${text.correct}` : `💡 ${text.incorrect}`}
              </p>
              {scrambledWords.join(' ') !== sentences[currentIndex] && (
                <p style={{ fontSize: '0.85rem', color: '#92400e', margin: '0.5rem 0 0 0' }}>
                  {language === 'en' ? 'Correct:' : 'Правильно:'} <strong>{sentences[currentIndex]}</strong>
                </p>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <button
              onClick={handleCheck}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ✓ {text.check}
            </button>
            <button
              onClick={handleReset}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ↻ {text.reset}
            </button>
            {isChecked && scrambledWords.join(' ') === sentences[currentIndex] && (
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
