import { useState } from 'react';
import type { LeadIn } from '../types';
import type { Language } from '../translations';
import { getTranslation } from '../translations';

interface LeadInFormProps {
  leadIn: LeadIn;
  onChange: (leadIn: LeadIn) => void;
  language: Language;
}

export default function LeadInForm({ leadIn, onChange, language }: LeadInFormProps) {
  const t = getTranslation(language);
  const [newMediaLink, setNewMediaLink] = useState('');

  const updateField = (field: keyof LeadIn, value: string | number | string[]) => {
    onChange({ ...leadIn, [field]: value });
  };

  const addMediaLink = () => {
    if (newMediaLink.trim()) {
      onChange({
        ...leadIn,
        mediaLinks: [...(leadIn.mediaLinks || []), newMediaLink.trim()],
      });
      setNewMediaLink('');
    }
  };

  const removeMediaLink = (index: number) => {
    onChange({
      ...leadIn,
      mediaLinks: (leadIn.mediaLinks || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="step-content">
      <h2>{t.leadInTitle}</h2>
      <p>{t.leadInSubtitle}</p>

      <div className="form-group">
        <label>{t.activityTitle}</label>
        <input
          type="text"
          value={leadIn.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder={t.activityTitlePlaceholder}
        />
      </div>

      <div className="form-group">
        <label>{t.description}</label>
        <input
          type="text"
          value={leadIn.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder={t.descriptionPlaceholder}
        />
      </div>

      <div className="form-group">
        <label>{t.contentInstructions}</label>
        <textarea
          value={leadIn.content}
          onChange={(e) => updateField('content', e.target.value)}
          placeholder={t.contentPlaceholder}
          rows={6}
        />
      </div>

      <div className="form-group">
        <label>{t.durationMinutes}</label>
        <input
          type="number"
          min="1"
          value={leadIn.duration || ''}
          onChange={(e) => updateField('duration', e.target.value ? parseInt(e.target.value) : '')}
          placeholder={t.durationPlaceholder}
        />
      </div>

      <div className="form-group">
        <label>{t.mediaLinks}</label>
        <div className="examples-input">
          <input
            type="text"
            value={newMediaLink}
            onChange={(e) => setNewMediaLink(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addMediaLink()}
            placeholder={t.mediaLinksPlaceholder}
          />
          <button type="button" onClick={addMediaLink}>{t.addButton}</button>
        </div>
        {leadIn.mediaLinks && leadIn.mediaLinks.length > 0 && (
          <ul className="examples-list">
            {leadIn.mediaLinks.map((link, index) => (
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
          value={leadIn.teacherNotes || ''}
          onChange={(e) => updateField('teacherNotes', e.target.value)}
          placeholder={t.teacherNotesPlaceholder}
          rows={3}
        />
        <small>{t.teacherNotesHint}</small>
      </div>

      <div className="info-box">
        <strong>{t.tipLabel}</strong> A good lead-in should:
        <ul>
          <li>{t.leadInTip1}</li>
          <li>{t.leadInTip2}</li>
          <li>{t.leadInTip3}</li>
        </ul>
      </div>
    </div>
  );
}
