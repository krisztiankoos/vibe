import { useState, useEffect } from 'react';
import type { ContentItem } from '../types';
import type { Language } from '../translations';

interface RankOrderActivityProps {
  language: Language;
  content: ContentItem[];
}

export default function RankOrderActivity({ language, content }: RankOrderActivityProps) {
  const [view, setView] = useState<'teacher' | 'student'>('teacher');
  const [studentOrder, setStudentOrder] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  // Extract items from content
  const correctOrder = content.map(item => {
    if (item.type === 'word') return item.text;
    if (item.type === 'definition') return item.word;
    if (item.type === 'qa-pair') return item.question;
    return '';
  }).filter(w => w.length > 0);

  // Shuffle items for student
  const shuffleArray = (array: string[]): string[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    setStudentOrder(shuffleArray(correctOrder));
    setIsChecked(false);
  }, [content]);

  const moveItem = (fromIndex: number, direction: 'up' | 'down') => {
    const newOrder = [...studentOrder];
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;

    if (toIndex < 0 || toIndex >= newOrder.length) return;

    [newOrder[fromIndex], newOrder[toIndex]] = [newOrder[toIndex], newOrder[fromIndex]];
    setStudentOrder(newOrder);
    setIsChecked(false);
  };

  const checkOrder = () => {
    setIsChecked(true);
  };

  const isCorrectOrder = () => {
    return JSON.stringify(studentOrder) === JSON.stringify(correctOrder);
  };

  const getItemStatus = (index: number): 'correct' | 'incorrect' | 'neutral' => {
    if (!isChecked) return 'neutral';
    return studentOrder[index] === correctOrder[index] ? 'correct' : 'incorrect';
  };

  const reset = () => {
    setStudentOrder(shuffleArray(correctOrder));
    setIsChecked(false);
  };

  const t = {
    en: {
      title: 'Rank Order',
      teacherView: 'Teacher View',
      studentView: 'Student View',
      teacherInstructions: 'Teacher: This is the correct order. Students will see these shuffled.',
      studentInstructions: 'Student: Put these items in the correct order',
      correctOrder: 'Correct Order:',
      instructions: 'Use ↑↓ buttons to reorder items',
      check: 'Check Order',
      reset: 'Reset',
      correct: 'Perfect! All items in correct order!',
      incorrect: 'Not quite. Items in green are in the correct position.',
      viewStudent: 'View as Student',
      viewTeacher: 'Back to Teacher View',
      orderingCriteria: 'Ordering Criteria:',
      criteriaPlaceholder: 'e.g., "From smallest to largest", "Chronological order", "Alphabetical"',
      defaultCriteria: 'Order these items correctly'
    },
    uk: {
      title: 'Ранжування',
      teacherView: 'Вчитель',
      studentView: 'Учень',
      teacherInstructions: 'Вчитель: Це правильний порядок. Учні побачать їх перемішаними.',
      studentInstructions: 'Учень: Розставте елементи в правильному порядку',
      correctOrder: 'Правильний порядок:',
      instructions: 'Використовуйте кнопки ↑↓ для зміни порядку',
      check: 'Перевірити',
      reset: 'Скинути',
      correct: 'Ідеально! Всі елементи в правильному порядку!',
      incorrect: 'Не зовсім. Зелені елементи на правильних позиціях.',
      viewStudent: 'Переглянути як учень',
      viewTeacher: 'Повернутись до вчителя',
      orderingCriteria: 'Критерій сортування:',
      criteriaPlaceholder: 'напр., "Від найменшого до найбільшого", "Хронологічний порядок", "За алфавітом"',
      defaultCriteria: 'Розставте елементи правильно'
    }
  };

  const text = t[language];

  const [criteria, setCriteria] = useState(text.defaultCriteria);

  if (correctOrder.length === 0) {
    return (
      <div className="activity-demo-card">
        <h3>📊 {text.title}</h3>
        <p style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
          {language === 'en' ? 'No content available. Please add items in the Content Creator above.' : 'Немає контенту. Будь ласка, додайте елементи у Створювач Контенту вище.'}
        </p>
      </div>
    );
  }

  return (
    <div className="activity-demo-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>📊 {text.title}</h3>
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
              {text.orderingCriteria}
            </label>
            <input
              type="text"
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
              placeholder={text.criteriaPlaceholder}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #667eea',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {text.correctOrder}
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {correctOrder.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'white',
                    borderRadius: '6px',
                    border: '2px solid #ddd'
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
                    fontWeight: 'bold'
                  }}>
                    {idx + 1}
                  </span>
                  <span style={{ flex: 1 }}>{item}</span>
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

          <div style={{
            padding: '1rem',
            background: '#fff',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '2px solid #667eea'
          }}>
            <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
              📋 {criteria}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>
              {text.instructions}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {studentOrder.map((item, idx) => {
              const status = getItemStatus(idx);
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    background: status === 'correct' ? '#d1fae5' : (status === 'incorrect' ? '#fee2e2' : 'white'),
                    borderRadius: '6px',
                    border: '2px solid',
                    borderColor: status === 'correct' ? '#10b981' : (status === 'incorrect' ? '#ef4444' : '#ddd')
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <button
                      onClick={() => moveItem(idx, 'up')}
                      disabled={idx === 0}
                      style={{
                        width: '24px',
                        height: '24px',
                        padding: 0,
                        background: idx === 0 ? '#ccc' : '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: idx === 0 ? 'not-allowed' : 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveItem(idx, 'down')}
                      disabled={idx === studentOrder.length - 1}
                      style={{
                        width: '24px',
                        height: '24px',
                        padding: 0,
                        background: idx === studentOrder.length - 1 ? '#ccc' : '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: idx === studentOrder.length - 1 ? 'not-allowed' : 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      ↓
                    </button>
                  </div>
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
                  <span style={{ flex: 1 }}>{item}</span>
                  {isChecked && (
                    <span style={{ fontSize: '1.2rem' }}>
                      {status === 'correct' ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {isChecked && (
            <p style={{
              textAlign: 'center',
              color: isCorrectOrder() ? '#10b981' : '#f59e0b',
              fontWeight: 'bold',
              marginBottom: '1rem',
              padding: '1rem',
              background: isCorrectOrder() ? '#d1fae5' : '#fef3c7',
              borderRadius: '6px'
            }}>
              {isCorrectOrder() ? `🎉 ${text.correct}` : `💡 ${text.incorrect}`}
            </p>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <button
              onClick={checkOrder}
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
              onClick={reset}
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
