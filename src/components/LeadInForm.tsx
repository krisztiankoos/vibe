import { useState } from 'react';
import type { LeadIn } from '../types';

interface LeadInFormProps {
  leadIn: LeadIn;
  onChange: (leadIn: LeadIn) => void;
}

export default function LeadInForm({ leadIn, onChange }: LeadInFormProps) {
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
      <h2>Lead-In Activity</h2>
      <p>Engage students and activate their prior knowledge about the topic</p>

      <div className="form-group">
        <label>Activity Title</label>
        <input
          type="text"
          value={leadIn.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="e.g., Discussion about past experiences"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          value={leadIn.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Brief description of the activity"
        />
      </div>

      <div className="form-group">
        <label>Content / Instructions</label>
        <textarea
          value={leadIn.content}
          onChange={(e) => updateField('content', e.target.value)}
          placeholder="Detailed instructions for the lead-in activity..."
          rows={6}
        />
      </div>

      <div className="form-group">
        <label>Duration (minutes, optional)</label>
        <input
          type="number"
          min="1"
          value={leadIn.duration || ''}
          onChange={(e) => updateField('duration', e.target.value ? parseInt(e.target.value) : '')}
          placeholder="e.g., 10"
        />
      </div>

      <div className="form-group">
        <label>Media Links (YouTube, websites, optional)</label>
        <div className="examples-input">
          <input
            type="text"
            value={newMediaLink}
            onChange={(e) => setNewMediaLink(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addMediaLink()}
            placeholder="Paste YouTube link or website URL..."
          />
          <button type="button" onClick={addMediaLink}>Add</button>
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
        <small>Add YouTube videos or external resources for this activity</small>
      </div>

      <div className="form-group">
        <label>Teacher Notes (optional, private)</label>
        <textarea
          value={leadIn.teacherNotes || ''}
          onChange={(e) => updateField('teacherNotes', e.target.value)}
          placeholder="Private notes for yourself (e.g., common student mistakes, timing tips)..."
          rows={3}
        />
        <small>These notes are for you only and won't be shown to students</small>
      </div>

      <div className="info-box">
        <strong>Tip:</strong> A good lead-in should:
        <ul>
          <li>Connect to students' experiences</li>
          <li>Generate interest in the topic</li>
          <li>Activate relevant vocabulary and concepts</li>
        </ul>
      </div>
    </div>
  );
}
