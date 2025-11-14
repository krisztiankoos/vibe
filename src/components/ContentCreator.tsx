import { useState } from 'react';
import type { ContentType, ContentItem, ActivityType } from '../types';
import type { Language } from '../translations';

interface ContentCreatorProps {
  language: Language;
  onContentChange: (items: ContentItem[], contentType: ContentType) => void;
  onActivitiesChange: (selectedActivities: ActivityType[]) => void;
}

export default function ContentCreator({
  language,
  onContentChange,
  onActivitiesChange
}: ContentCreatorProps) {
  const [contentType, setContentType] = useState<ContentType>('words');
  const [bulkInput, setBulkInput] = useState('apple\nbanana\norange\ngrape\nmango\nstrawberry\nwatermelon\npineapple');
  const [selectedActivities, setSelectedActivities] = useState<ActivityType[]>([
    'random-wheel',
    'quiz',
    'flash-cards',
    'missing-word',
    'anagram',
    'unjumble'
  ]);

  const t = {
    en: {
      title: 'Content Creator',
      subtitle: 'Create your content once, use it in multiple activities',
      contentType: 'Content Type:',
      words: 'Simple Words',
      qaPairs: 'Question & Answer Pairs',
      definitions: 'Words with Definitions',
      bulkAdd: 'Add Your Content (one per line):',
      bulkPlaceholder: {
        'words': 'apple\nbanana\norange\n...',
        'qa-pairs': 'What is 2+2? | 4\nCapital of France? | Paris\n...',
        'definitions': 'apple | A red or green fruit\nbanana | A yellow tropical fruit\n...'
      },
      itemCount: 'items',
      selectActivities: 'Select Activities to Generate:',
      generate: 'Generate Activities',
      examples: {
        'words': 'Example: apple (one word per line)',
        'qa-pairs': 'Example: What is 2+2? | 4 (question | answer)',
        'definitions': 'Example: apple | A red fruit (word | definition)'
      }
    },
    uk: {
      title: 'Створення Контенту',
      subtitle: 'Створіть контент один раз, використовуйте в різних активностях',
      contentType: 'Тип контенту:',
      words: 'Прості слова',
      qaPairs: 'Запитання та відповіді',
      definitions: 'Слова з визначеннями',
      bulkAdd: 'Додайте ваш контент (по одному в рядку):',
      bulkPlaceholder: {
        'words': 'яблуко\nбанан\nапельсин\n...',
        'qa-pairs': 'Скільки буде 2+2? | 4\nСтолиця України? | Київ\n...',
        'definitions': 'яблуко | Червоний або зелений фрукт\nбанан | Жовтий тропічний фрукт\n...'
      },
      itemCount: 'елементів',
      selectActivities: 'Оберіть активності для генерації:',
      generate: 'Згенерувати активності',
      examples: {
        'words': 'Приклад: яблуко (одне слово на рядок)',
        'qa-pairs': 'Приклад: Скільки буде 2+2? | 4 (питання | відповідь)',
        'definitions': 'Приклад: яблуко | Червоний фрукт (слово | визначення)'
      }
    }
  };

  const text = t[language];

  const activityOptions: { type: ActivityType; label: { en: string; uk: string } }[] = [
    { type: 'random-wheel', label: { en: 'Random Wheel', uk: 'Випадкове Колесо' } },
    { type: 'quiz', label: { en: 'Quiz', uk: 'Вікторина' } },
    { type: 'match-up', label: { en: 'Match Up', uk: 'Поєднай' } },
    { type: 'flash-cards', label: { en: 'Flash Cards', uk: 'Флеш-картки' } },
    { type: 'true-false', label: { en: 'True/False', uk: 'Правда/Хибність' } },
    { type: 'whack-a-mole', label: { en: 'Whack-a-Mole', uk: 'Вдар Крота' } },
    { type: 'gap-fill', label: { en: 'Gap Fill', uk: 'Заповни Пропуски' } },
    { type: 'missing-word', label: { en: 'Missing Word', uk: 'Пропущене Слово' } },
    { type: 'gameshow-quiz', label: { en: 'Gameshow Quiz', uk: 'Вікторина-Шоу' } },
    { type: 'group-sort', label: { en: 'Group Sort', uk: 'Сортування' } },
    { type: 'unjumble', label: { en: 'Unjumble', uk: 'Розплутай' } },
    { type: 'anagram', label: { en: 'Anagram', uk: 'Анаграма' } },
    { type: 'rank-order', label: { en: 'Rank Order', uk: 'Ранжування' } }
  ];

  const parseContent = (input: string, type: ContentType): ContentItem[] => {
    const lines = input.split('\n').filter(line => line.trim());

    switch (type) {
      case 'words':
        return lines.map(line => ({
          type: 'word' as const,
          text: line.trim()
        }));

      case 'qa-pairs':
        return lines
          .filter(line => line.includes('|'))
          .map(line => {
            const [question, answer] = line.split('|').map(s => s.trim());
            return {
              type: 'qa-pair' as const,
              question,
              answer
            };
          });

      case 'definitions':
        return lines
          .filter(line => line.includes('|'))
          .map(line => {
            const [word, definition] = line.split('|').map(s => s.trim());
            return {
              type: 'definition' as const,
              word,
              definition
            };
          });

      default:
        return [];
    }
  };

  const handleGenerate = () => {
    const items = parseContent(bulkInput, contentType);
    onContentChange(items, contentType);
    onActivitiesChange(selectedActivities);
  };

  const toggleActivity = (activityType: ActivityType) => {
    setSelectedActivities(prev =>
      prev.includes(activityType)
        ? prev.filter(a => a !== activityType)
        : [...prev, activityType]
    );
  };

  const currentItems = parseContent(bulkInput, contentType);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      borderRadius: '12px',
      marginBottom: '2rem',
      color: 'white'
    }}>
      <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem' }}>{text.title}</h2>
      <p style={{ margin: '0 0 2rem 0', opacity: 0.9 }}>{text.subtitle}</p>

      {/* Content Type Selector */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          {text.contentType}
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setContentType('words')}
            style={{
              padding: '0.5rem 1rem',
              background: contentType === 'words' ? 'white' : 'rgba(255,255,255,0.2)',
              color: contentType === 'words' ? '#667eea' : 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {text.words}
          </button>
          <button
            onClick={() => setContentType('qa-pairs')}
            style={{
              padding: '0.5rem 1rem',
              background: contentType === 'qa-pairs' ? 'white' : 'rgba(255,255,255,0.2)',
              color: contentType === 'qa-pairs' ? '#667eea' : 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {text.qaPairs}
          </button>
          <button
            onClick={() => setContentType('definitions')}
            style={{
              padding: '0.5rem 1rem',
              background: contentType === 'definitions' ? 'white' : 'rgba(255,255,255,0.2)',
              color: contentType === 'definitions' ? '#667eea' : 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {text.definitions}
          </button>
        </div>
      </div>

      {/* Bulk Input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          {text.bulkAdd}
        </label>
        <textarea
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
          placeholder={text.bulkPlaceholder[contentType]}
          rows={10}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.95rem',
            fontFamily: 'monospace',
            resize: 'vertical'
          }}
        />
        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.9 }}>
          {text.examples[contentType]} • {currentItems.length} {text.itemCount}
        </p>
      </div>

      {/* Activity Selector */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.75rem' }}>
          {text.selectActivities}
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '0.5rem'
        }}>
          {activityOptions.map(option => (
            <label
              key={option.type}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: selectedActivities.includes(option.type)
                  ? 'rgba(255,255,255,0.2)'
                  : 'rgba(255,255,255,0.1)',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <input
                type="checkbox"
                checked={selectedActivities.includes(option.type)}
                onChange={() => toggleActivity(option.type)}
                style={{ cursor: 'pointer' }}
              />
              <span>{option.label[language]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        style={{
          padding: '1rem 2rem',
          background: 'white',
          color: '#667eea',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          width: '100%',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        🎯 {text.generate} ({selectedActivities.length} {language === 'en' ? 'activities' : 'активностей'})
      </button>
    </div>
  );
}
