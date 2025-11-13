import { useState } from 'react';
import type { Presentation } from '../types';
import type { Language } from '../translations';
import { getTranslation } from '../translations';
import { validateURL } from '../utils/security';

interface PresentationFormProps {
  presentation: Presentation;
  onChange: (presentation: Presentation) => void;
  language: Language;
}

export default function PresentationForm({ presentation, onChange, language }: PresentationFormProps) {
  const t = getTranslation(language);
  const [newExample, setNewExample] = useState('');
  const [newMediaLink, setNewMediaLink] = useState('');
  const [urlError, setUrlError] = useState('');

  const updateField = (field: keyof Presentation, value: string | number | string[]) => {
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

  const addMediaLink = () => {
    const trimmed = newMediaLink.trim();
    if (!trimmed) return;

    // Validate URL
    if (!validateURL(trimmed)) {
      setUrlError('Invalid URL. Please enter a valid http:// or https:// link.');
      return;
    }

    // Limit number of links
    if ((presentation.mediaLinks || []).length >= 10) {
      setUrlError('Maximum 10 media links allowed.');
      return;
    }

    onChange({
      ...presentation,
      mediaLinks: [...(presentation.mediaLinks || []), trimmed],
    });
    setNewMediaLink('');
    setUrlError('');
  };

  const removeMediaLink = (index: number) => {
    onChange({
      ...presentation,
      mediaLinks: (presentation.mediaLinks || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="step-content">
      <h2>{t.presentationTitle}</h2>
      <p>{t.presentationSubtitle}</p>

      <div className="form-group">
        <label>{t.sectionTitle}</label>
        <input
          type="text"
          value={presentation.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder={t.sectionTitlePlaceholder}
        />
      </div>

      <div className="form-group">
        <label>{t.targetLanguage}</label>
        <input
          type="text"
          value={presentation.targetLanguage}
          onChange={(e) => updateField('targetLanguage', e.target.value)}
          placeholder={t.targetLanguagePlaceholder}
        />
      </div>

      <div className="form-group">
        <label>{t.explanation}</label>
        <textarea
          value={presentation.explanation}
          onChange={(e) => updateField('explanation', e.target.value)}
          placeholder={t.explanationPlaceholder}
          rows={6}
        />
      </div>

      <div className="form-group">
        <label>{t.exampleSentences}</label>
        <div className="examples-input">
          <input
            type="text"
            value={newExample}
            onChange={(e) => setNewExample(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addExample()}
            placeholder={t.examplePlaceholder}
          />
          <button type="button" onClick={addExample}>{t.addButton}</button>
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

      <div className="form-group">
        <label>{t.durationMinutes}</label>
        <input
          type="number"
          min="1"
          value={presentation.duration || ''}
          onChange={(e) => updateField('duration', e.target.value ? parseInt(e.target.value) : '')}
          placeholder={t.durationPlaceholder}
        />
      </div>

      <div className="form-group">
        <label>{t.mediaLinks}</label>
        <div className="examples-input">
          <input
            type="url"
            value={newMediaLink}
            onChange={(e) => {
              setNewMediaLink(e.target.value);
              setUrlError('');
            }}
            onKeyPress={(e) => e.key === 'Enter' && addMediaLink()}
            placeholder={t.mediaLinksPlaceholder}
          />
          <button type="button" onClick={addMediaLink}>{t.addButton}</button>
        </div>
        {urlError && <small style={{ color: 'red' }}>{urlError}</small>}
        {presentation.mediaLinks && presentation.mediaLinks.length > 0 && (
          <ul className="examples-list">
            {presentation.mediaLinks.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                <button onClick={() => removeMediaLink(index)}>×</button>
              </li>
            ))}
          </ul>
        )}
        <small>{t.mediaLinksHint}</small>
      </div>

      <div className="form-group">
        <label>{t.teacherNotes}</label>
        <textarea
          value={presentation.teacherNotes || ''}
          onChange={(e) => updateField('teacherNotes', e.target.value)}
          placeholder={t.teacherNotesPlaceholder}
          rows={3}
        />
        <small>{t.teacherNotesHint}</small>
      </div>

      <div className="info-box">
        <strong>{t.tipLabel}</strong> Good presentation includes:
        <ul>
          <li>{t.presentationTip1}</li>
          <li>{t.presentationTip2}</li>
          <li>{t.presentationTip3}</li>
        </ul>
      </div>
    </div>
  );
}
