import { useState } from 'react';
import type { LeadIn } from '../types';
import type { Language } from '../translations';
import { getTranslation } from '../translations';
import { validateURL } from '../utils/security';
import { HelpIcon } from './Tooltip';
import { helpText, quickTips } from '../utils/helpText';

interface LeadInFormProps {
  leadIn: LeadIn;
  onChange: (leadIn: LeadIn) => void;
  language: Language;
}

export default function LeadInForm({ leadIn, onChange, language }: LeadInFormProps) {
  const t = getTranslation(language);
  const [newMediaLink, setNewMediaLink] = useState('');
  const [urlError, setUrlError] = useState('');

  const help = helpText[language].leadIn;
  const tips = quickTips[language].leadIn;

  const updateField = (field: keyof LeadIn, value: string | number | string[]) => {
    onChange({ ...leadIn, [field]: value });
  };

  const addMediaLink = () => {
    const trimmed = newMediaLink.trim();
    if (!trimmed) return;

    // Validate URL
    if (!validateURL(trimmed)) {
      setUrlError(language === 'en'
        ? 'Invalid URL. Please enter a valid http:// or https:// link.'
        : 'Недійсне посилання. Будь ласка, введіть дійсне посилання http:// або https://');
      return;
    }

    // Limit number of links
    if ((leadIn.mediaLinks || []).length >= 10) {
      setUrlError(language === 'en'
        ? 'Maximum 10 media links allowed.'
        : 'Дозволено максимум 10 медіа-посилань.');
      return;
    }

    onChange({
      ...leadIn,
      mediaLinks: [...(leadIn.mediaLinks || []), trimmed],
    });
    setNewMediaLink('');
    setUrlError('');
  };

  const removeMediaLink = (index: number) => {
    onChange({
      ...leadIn,
      mediaLinks: (leadIn.mediaLinks || []).filter((_, i) => i !== index),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addMediaLink();
    }
  };

  return (
    <div className="step-content">
      <div className="help-banner">
        <div className="help-banner-icon">💡</div>
        <div className="help-banner-content">
          <h3>{language === 'en' ? 'Lead-In / Warm-Up Activity' : 'Вступна частина / Розминка'}</h3>
          <p>
            {language === 'en'
              ? 'Start your lesson with an engaging activity that introduces the topic and activates students\' prior knowledge. Keep it short (5-10 minutes) and relevant to the main lesson.'
              : 'Почніть урок з цікавої вправи, що представляє тему та активує попередні знання учнів. Зробіть її короткою (5-10 хвилин) та релевантною до основного уроку.'}
          </p>
        </div>
      </div>

      <div className="quick-tips">
        <h4>
          💡 {language === 'en' ? 'Quick Tips for Lead-Ins' : 'Швидкі поради для вступу'}
        </h4>
        <ul>
          {tips.map((tip, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: tip }} />
          ))}
        </ul>
      </div>

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="leadInTitle" className="required">
            {t.leadInTitle}
          </label>
          <HelpIcon text={help.title} />
        </div>
        <input
          id="leadInTitle"
          type="text"
          value={leadIn.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder={language === 'en' ? 'e.g., "Picture Discussion", "Quick Questions"' : 'напр., "Обговорення фото", "Швидкі питання"'}
        />
        {!leadIn.title && (
          <div className="field-hint">
            {language === 'en' ? '✏️ Give this activity a catchy name' : '✏️ Дайте цій вправі привабливу назву'}
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="leadInDescription">
            {t.description}
          </label>
          <HelpIcon text={help.description} />
        </div>
        <input
          id="leadInDescription"
          type="text"
          value={leadIn.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder={language === 'en'
            ? 'e.g., "Students share personal experiences to activate vocabulary"'
            : 'напр., "Учні діляться досвідом для активації лексики"'}
        />
        {leadIn.description && (
          <div className="field-validation success">
            ✓ {language === 'en' ? 'Good description!' : 'Добрий опис!'}
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="leadInContent" className="required">
            {t.contentInstructions}
          </label>
          <HelpIcon text={help.content} />
        </div>
        <textarea
          id="leadInContent"
          value={leadIn.content}
          onChange={(e) => updateField('content', e.target.value)}
          rows={6}
          placeholder={language === 'en'
            ? 'Detailed teacher instructions: what to say, what to do, how to set up...'
            : 'Детальні інструкції для вчителя: що сказати, що робити, як організувати...'}
        />
        <div className="field-hint example">
          <strong>{language === 'en' ? '💡 Example:' : '💡 Приклад:'}</strong><br />
          {language === 'en'
            ? '"Show pictures of different daily routines. Ask: \'What do you do every morning?\' Write key activities on the board. Pair students to discuss their typical day."'
            : '"Покажіть фотографії різних щоденних рутин. Запитайте: \'Що ви робите щоранку?\' Запишіть ключові дії на дошці. Об\'єднайте учнів у пари для обговорення їхнього типового дня."'}
        </div>
        {leadIn.content && leadIn.content.length > 100 && (
          <div className="field-validation success">
            ✓ {language === 'en' ? 'Great detail!' : 'Чудова деталізація!'} ({leadIn.content.length} {language === 'en' ? 'characters' : 'символів'})
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="leadInDuration">
            {t.durationMinutes}
          </label>
          <HelpIcon text={help.duration} />
        </div>
        <input
          id="leadInDuration"
          type="number"
          min="1"
          max="30"
          value={leadIn.duration || ''}
          onChange={(e) => updateField('duration', parseInt(e.target.value) || 0)}
          placeholder={language === 'en' ? 'e.g., 10' : 'напр., 10'}
        />
        <div className="field-hint">
          {language === 'en'
            ? '⏱️ Lead-ins are typically 5-10 minutes'
            : '⏱️ Вступ зазвичай займає 5-10 хвилин'}
        </div>
        {leadIn.duration && leadIn.duration > 15 && (
          <div className="field-validation warning">
            ⚠️ {language === 'en'
              ? 'This seems long for a lead-in. Consider keeping it under 15 minutes.'
              : 'Це здається довгим для вступу. Розгляньте можливість зберегти це під 15 хвилин.'}
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="mediaLink">
            {t.mediaLinks}
          </label>
          <HelpIcon text={help.mediaLinks} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            id="mediaLink"
            type="url"
            value={newMediaLink}
            onChange={(e) => {
              setNewMediaLink(e.target.value);
              setUrlError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder={language === 'en'
              ? 'https://youtube.com/watch?v=...'
              : 'https://youtube.com/watch?v=...'}
            style={{ flex: 1 }}
          />
          <button type="button" onClick={addMediaLink}>
            {t.addButton}
          </button>
        </div>
        {urlError && (
          <div className="field-validation error">
            ⚠️ {urlError}
          </div>
        )}
        <div className="field-hint">
          {language === 'en'
            ? '🔗 YouTube videos, images, or websites. Must start with http:// or https://'
            : '🔗 YouTube відео, зображення або веб-сайти. Має починатися з http:// або https://'}
        </div>
        {(leadIn.mediaLinks || []).length > 0 && (
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            {(leadIn.mediaLinks || []).map((link, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ marginRight: '0.5rem' }}>
                  {link.length > 50 ? link.substring(0, 50) + '...' : link}
                </a>
                <button
                  type="button"
                  onClick={() => removeMediaLink(index)}
                  style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem' }}
                >
                  {t.remove}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="leadInTeacherNotes">
            {t.teacherNotes}
          </label>
          <HelpIcon text={help.teacherNotes} />
        </div>
        <textarea
          id="leadInTeacherNotes"
          value={leadIn.teacherNotes || ''}
          onChange={(e) => updateField('teacherNotes', e.target.value)}
          rows={3}
          placeholder={language === 'en'
            ? 'Private notes: common problems, variations, things to emphasize...'
            : 'Особисті нотатки: типові проблеми, варіації, на що звернути увагу...'}
        />
        <div className="field-hint">
          {language === 'en'
            ? '📝 These notes are only for you - students won\'t see them'
            : '📝 Ці нотатки тільки для вас - учні їх не побачать'}
        </div>
      </div>
    </div>
  );
}
