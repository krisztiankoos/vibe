import { LeadIn } from '../types';

interface LeadInFormProps {
  leadIn: LeadIn;
  onChange: (leadIn: LeadIn) => void;
}

export default function LeadInForm({ leadIn, onChange }: LeadInFormProps) {
  const updateField = (field: keyof LeadIn, value: string) => {
    onChange({ ...leadIn, [field]: value });
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
