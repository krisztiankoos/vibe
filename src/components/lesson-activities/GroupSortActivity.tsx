import { useState } from 'react';
import type { GroupSortItem } from '../../data/wordwallLessonData';

interface GroupSortActivityProps {
  groups: string[];
  items: GroupSortItem[];
  onComplete: () => void;
}

// Color palette for items
const ITEM_COLORS = [
  '#ef4444', // red
  '#f59e0b', // orange
  '#10b981', // green
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // dark orange
];

export default function GroupSortActivity({ groups, items, onComplete }: GroupSortActivityProps) {
  const [userSorts, setUserSorts] = useState<{ [key: string]: number | null }>(
    items.reduce((acc, item) => ({ ...acc, [item.text]: null }), {})
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Assign colors to items
  const [itemColors] = useState<{ [key: string]: string }>(
    items.reduce((acc, item, idx) => ({
      ...acc,
      [item.text]: ITEM_COLORS[idx % ITEM_COLORS.length]
    }), {})
  );

  const unsortedItems = items.filter(item => userSorts[item.text] === null);

  const handleDragStart = (e: React.DragEvent, itemText: string) => {
    setDraggedItem(itemText);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', itemText);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, groupIndex: number | null) => {
    e.preventDefault();
    const itemText = e.dataTransfer.getData('text/plain');
    if (itemText) {
      setUserSorts(prev => ({ ...prev, [itemText]: groupIndex }));
      setShowFeedback(false);
    }
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleCheck = () => {
    setShowFeedback(true);
  };

  const handleComplete = () => {
    setCompleted(true);
    onComplete();
  };

  const getItemsInGroup = (groupIndex: number) => {
    return items.filter(item => userSorts[item.text] === groupIndex);
  };

  const getScore = () => {
    let correct = 0;
    items.forEach(item => {
      if (userSorts[item.text] === item.group) {
        correct++;
      }
    });
    return correct;
  };

  const allSorted = unsortedItems.length === 0;
  const score = getScore();
  const percentage = Math.round((score / items.length) * 100);

  if (completed) {
    return (
      <div style={{
        padding: '3rem',
        textAlign: 'center',
        background: percentage >= 70
          ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
          : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        borderRadius: '12px',
        color: 'white'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          {percentage >= 70 ? '🎯' : '📊'}
        </div>
        <h2 style={{ margin: '0 0 1rem 0' }}>Group Sort Complete!</h2>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '1rem 0' }}>
          {score}/{items.length}
        </div>
        <p style={{ margin: '0 0 2rem 0', opacity: 0.9, fontSize: '1.2rem' }}>
          {percentage}% Correct
        </p>
        <button
          onClick={() => {
            setUserSorts(items.reduce((acc, item) => ({ ...acc, [item.text]: null }), {}));
            setShowFeedback(false);
            setCompleted(false);
          }}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'white',
            color: '#f59e0b',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  const renderItem = (item: GroupSortItem, groupIndex?: number) => {
    const isCorrect = groupIndex !== undefined && item.group === groupIndex;
    const isDragging = draggedItem === item.text;
    const color = itemColors[item.text];

    return (
      <div
        key={item.text}
        draggable
        onDragStart={(e) => handleDragStart(e, item.text)}
        onDragEnd={handleDragEnd}
        style={{
          padding: '0.75rem 1.25rem',
          background: isDragging ? 'transparent' : showFeedback
            ? isCorrect
              ? '#d1fae5'
              : '#fee2e2'
            : 'white',
          border: `3px solid ${color}`,
          borderRadius: '8px',
          cursor: 'grab',
          fontSize: '0.95rem',
          fontWeight: 'bold',
          color: isDragging ? 'transparent' : '#374151',
          transition: 'all 0.2s',
          opacity: isDragging ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: isDragging ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {showFeedback && groupIndex !== undefined && (
          <span style={{ fontSize: '1rem' }}>{isCorrect ? '✓' : '✗'}</span>
        )}
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: color,
          flexShrink: 0
        }} />
        {item.text}
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
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#f59e0b' }}>Group Sort: Adverbs of Time</h3>
      <p style={{ margin: '0 0 2rem 0', color: '#666' }}>
        Drag the colored adverbs into the correct groups based on which motion verbs they're used with
      </p>

      {/* Unsorted items */}
      {unsortedItems.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            fontWeight: 'bold',
            marginBottom: '0.75rem',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            Drag these items to sort ({unsortedItems.length} remaining)
          </div>
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, null)}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              padding: '1.5rem',
              background: '#f9fafb',
              borderRadius: '12px',
              minHeight: '80px',
              border: draggedItem && unsortedItems.some(i => i.text === draggedItem)
                ? '3px dashed #f59e0b'
                : '2px dashed #e5e7eb',
              transition: 'border 0.2s'
            }}
          >
            {unsortedItems.map((item) => renderItem(item))}
          </div>
        </div>
      )}

      {/* Groups */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {groups.map((groupName, groupIndex) => {
          const groupItems = getItemsInGroup(groupIndex);
          const isDropTarget = draggedItem && !unsortedItems.some(i => i.text === draggedItem);

          return (
            <div key={groupIndex}>
              <div style={{
                fontWeight: 'bold',
                marginBottom: '0.75rem',
                color: '#f59e0b',
                fontSize: '1rem',
                padding: '0.5rem',
                background: '#fff7ed',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                {groupName}
              </div>
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, groupIndex)}
                style={{
                  padding: '1.5rem',
                  background: isDropTarget ? '#fff7ed' : '#f9fafb',
                  borderRadius: '12px',
                  border: isDropTarget
                    ? '3px dashed #f59e0b'
                    : '2px dashed #d1d5db',
                  minHeight: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  transition: 'all 0.2s'
                }}
              >
                {groupItems.length === 0 ? (
                  <div style={{
                    color: '#9ca3af',
                    textAlign: 'center',
                    padding: '2rem 0',
                    fontSize: '0.9rem'
                  }}>
                    Drop items here
                  </div>
                ) : (
                  groupItems.map((item) => renderItem(item, groupIndex))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint */}
      <div style={{
        padding: '1rem',
        background: '#f0f9ff',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        💡 <strong>Tip:</strong> Drag and drop the colored items into the correct groups. Each color represents a different adverb.
      </div>

      {/* Actions */}
      {allSorted && (
        <div style={{ display: 'flex', gap: '1rem' }}>
          {!showFeedback ? (
            <button
              onClick={handleCheck}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Check Answers
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setUserSorts(items.reduce((acc, item) => ({ ...acc, [item.text]: null }), {}));
                  setShowFeedback(false);
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Reset
              </button>
              <button
                onClick={handleComplete}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Complete ✓
              </button>
            </>
          )}
        </div>
      )}

      {/* Score display */}
      {showFeedback && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: percentage >= 70 ? '#d1fae5' : '#fee2e2',
          borderRadius: '8px',
          textAlign: 'center',
          fontWeight: 'bold',
          color: percentage >= 70 ? '#065f46' : '#991b1b'
        }}>
          Score: {score}/{items.length} ({percentage}% correct)
        </div>
      )}
    </div>
  );
}
