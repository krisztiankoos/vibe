import { useState } from 'react';
import type { Presentation } from '../types';

interface PresentationFormProps {
  presentation: Presentation;
  onChange: (presentation: Presentation) => void;
}

export default function PresentationForm({ presentation, onChange }: PresentationFormProps) {
  const [newExample, setNewExample] = useState('');

  const updateField = (field: keyof Presentation, value: string) => {
    onChange({ ...presentation, [field]: value });
  };

  const addExample = () => {
    if (newExample.trim()) {
      onChange({
        ...presentation,
        examples: [...presentation.examples, newExample.trim()],
      });
      setNewExample('');
    }
  };

  const removeExample = (index: number) => {
    onChange({
      ...presentation,
      examples: presentation.examples.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="step-content">
      <h2>Presentation / Teaching</h2>
      <p>Present the target language to your students</p>

      <div className="form-group">
        <label>Section Title</label>
        <input
          type="text"
          value={presentation.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="e.g., Present Perfect Tense"
        />
      </div>

      <div className="form-group">
        <label>Target Language / Grammar Point</label>
        <input
          type="text"
          value={presentation.targetLanguage}
          onChange={(e) => updateField('targetLanguage', e.target.value)}
          placeholder="e.g., Present Perfect: have/has + past participle"
        />
      </div>

      <div className="form-group">
        <label>Explanation</label>
        <textarea
          value={presentation.explanation}
          onChange={(e) => updateField('explanation', e.target.value)}
          placeholder="Explain the grammar point, usage, form, meaning..."
          rows={6}
        />
      </div>

      <div className="form-group">
        <label>Example Sentences</label>
        <div className="examples-input">
          <input
            type="text"
            value={newExample}
            onChange={(e) => setNewExample(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addExample()}
            placeholder="Add an example sentence..."
          />
          <button type="button" onClick={addExample}>Add</button>
        </div>
        <ul className="examples-list">
          {presentation.examples.map((example, index) => (
            <li key={index}>
              {example}
              <button onClick={() => removeExample(index)}>×</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="info-box">
        <strong>Tip:</strong> Good presentation includes:
        <ul>
          <li>Clear explanation of form, meaning, and use</li>
          <li>Multiple examples in context</li>
          <li>Visual aids or timelines (can be added later)</li>
        </ul>
      </div>
    </div>
  );
}
