import { useState } from 'react';
import type { Presentation, CEFRLevel, BilingualText } from '../types';
import type { Language } from '../translations';
import { getTranslation } from '../translations';
import { validateURL } from '../utils/security';
import { HelpIcon } from './Tooltip';
import { helpText, quickTips } from '../utils/helpText';
import CEFRLevelSelector from './CEFRLevelSelector';

interface PresentationFormProps {
  presentation: Presentation;
  onChange: (presentation: Presentation) => void;
  language: Language;
  cefrLevel?: CEFRLevel;
  onCefrLevelChange?: (level: CEFRLevel | undefined) => void;
  onBack?: () => void;
  onSkip?: () => void;
}

export default function PresentationForm({ presentation, onChange, language, cefrLevel, onCefrLevelChange, onBack, onSkip }: PresentationFormProps) {
  const t = getTranslation(language);
  const [newExample, setNewExample] = useState('');
  const [newMediaLink, setNewMediaLink] = useState('');
  const [urlError, setUrlError] = useState('');

  // For bilingual explanations (Ukrainian lessons)
  const isBilingual = typeof presentation.explanation === 'object';
  const [ukExplanation, setUkExplanation] = useState(
    isBilingual && typeof presentation.explanation === 'object' ? presentation.explanation.uk : ''
  );
  const [enExplanation, setEnExplanation] = useState(
    isBilingual && typeof presentation.explanation === 'object' ? presentation.explanation.en : ''
  );

  const help = helpText[language].presentation;
  const tips = quickTips[language].presentation;

  const updateField = (field: keyof Presentation, value: string | number | string[] | BilingualText) => {
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
      setUrlError(language === 'en'
        ? 'Invalid URL. Please enter a valid http:// or https:// link.'
        : 'Недійсне посилання. Будь ласка, введіть дійсне посилання http:// або https://');
      return;
    }

    // Limit number of links
    if ((presentation.mediaLinks || []).length >= 10) {
      setUrlError(language === 'en'
        ? 'Maximum 10 media links allowed.'
        : 'Дозволено максимум 10 медіа-посилань.');
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
      <div className="help-banner">
        <div className="help-banner-icon">📚</div>
        <div className="help-banner-content">
          <h3>{language === 'en' ? 'Presentation / Teaching Phase' : 'Презентація / Фаза навчання'}</h3>
          <p>
            {language === 'en'
              ? 'This is where you introduce the target language (grammar, vocabulary, functions). Use clear explanations, examples, and visual aids. Focus on meaning, form, and pronunciation.'
              : 'Це місце, де ви представляєте цільову мову (граматику, лексику, функції). Використовуйте чіткі пояснення, приклади та візуальні матеріали. Зосередьтеся на значенні, формі та вимові.'}
          </p>
        </div>
      </div>

      <div className="quick-tips">
        <h4>
          💡 {language === 'en' ? 'Quick Tips for Presentation' : 'Швидкі поради для презентації'}
        </h4>
        <ul>
          {tips.map((tip, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: tip }} />
          ))}
        </ul>
      </div>

      {/* CEFR Level Selector (for all lessons, but especially useful for Ukrainian) */}
      {onCefrLevelChange && (
        <CEFRLevelSelector
          value={cefrLevel}
          onChange={onCefrLevelChange}
          language={language}
        />
      )}

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="presentationTitle">
            {t.sectionTitle}
          </label>
          <HelpIcon text={help.title} />
        </div>
        <input
          id="presentationTitle"
          type="text"
          value={presentation.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder={language === 'en' ? 'e.g., "Present Simple - Form and Use"' : 'напр., "Теперішній час - Форма та використання"'}
        />
        {!presentation.title && (
          <div className="field-hint">
            {language === 'en' ? '✏️ Give this section a clear, descriptive title' : '✏️ Дайте цьому розділу чітку, описову назву'}
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="targetLanguage">
            {t.targetLanguage}
          </label>
          <HelpIcon text={help.targetLanguage} />
        </div>
        <input
          id="targetLanguage"
          type="text"
          value={presentation.targetLanguage}
          onChange={(e) => updateField('targetLanguage', e.target.value)}
          placeholder={language === 'en'
            ? 'e.g., "Present Simple tense", "Phrasal verbs with get"'
            : 'напр., "Теперішній простий час", "Фразові дієслова з get"'}
        />
        <div className="field-hint">
          {language === 'en'
            ? '🎯 What specific grammar point, vocabulary set, or language function are you teaching?'
            : '🎯 Яку конкретну граматичну тему, набір лексики або мовну функцію ви викладаєте?'}
        </div>
        {presentation.targetLanguage && presentation.targetLanguage.length > 10 && (
          <div className="field-validation success">
            ✓ {language === 'en' ? 'Clear target language!' : 'Чітка цільова мова!'}
          </div>
        )}
      </div>

      {/* Explanation: Bilingual for Ukrainian, single language for English */}
      {language === 'uk' ? (
        <div className="form-group">
          <div className="field-label-with-help">
            <label>{t.bilingualExplanation}</label>
            <HelpIcon text={t.bilingualExplanationHint} />
          </div>

          {/* Ukrainian explanation */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="explanationUk" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              {t.ukrainianExplanation}
            </label>
            <textarea
              id="explanationUk"
              value={ukExplanation}
              onChange={(e) => {
                setUkExplanation(e.target.value);
                const bilingual: BilingualText = { uk: e.target.value, en: enExplanation };
                updateField('explanation', bilingual);
              }}
              placeholder={t.ukrainianPlaceholder}
              rows={4}
            />
          </div>

          {/* English translation */}
          <div>
            <label htmlFor="explanationEn" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              {t.englishTranslation}
            </label>
            <textarea
              id="explanationEn"
              value={enExplanation}
              onChange={(e) => {
                setEnExplanation(e.target.value);
                const bilingual: BilingualText = { uk: ukExplanation, en: e.target.value };
                updateField('explanation', bilingual);
              }}
              placeholder={t.englishPlaceholder}
              rows={4}
            />
          </div>

          <div className="field-hint">
            {t.bilingualExplanationHint}
          </div>

          {ukExplanation.length > 50 && enExplanation.length > 50 && (
            <div className="field-validation success">
              ✓ Двомовне пояснення готове!
            </div>
          )}
        </div>
      ) : (
        <div className="form-group">
          <div className="field-label-with-help">
            <label htmlFor="explanation">
              {t.explanation}
            </label>
            <HelpIcon text={help.explanation} />
          </div>
          <textarea
            id="explanation"
            value={typeof presentation.explanation === 'string' ? presentation.explanation : ''}
            onChange={(e) => updateField('explanation', e.target.value)}
            placeholder={language === 'en'
              ? 'How will you explain this language point? Include meaning, form, and use...'
              : 'Як ви поясните цю мовну тему? Включіть значення, форму та використання...'}
            rows={6}
          />
          <div className="field-hint example">
            <strong>{language === 'en' ? '💡 Example:' : '💡 Приклад:'}</strong><br />
            {language === 'en'
              ? '"We use Present Simple for habits and routines. Form: Subject + base verb (+ s/es for he/she/it). Example: "I work" but "She works". Use timeline on board to show regular, repeated actions."'
              : '"Ми використовуємо теперішній простий час для звичок і рутини. Форма: Підмет + базова форма дієслова (+ s/es для he/she/it). Приклад: "I work" але "She works". Використайте часову лінію на дошці, щоб показати регулярні, повторювані дії."'}
          </div>
          {typeof presentation.explanation === 'string' && presentation.explanation.length > 100 && (
            <div className="field-validation success">
              ✓ {language === 'en' ? 'Thorough explanation!' : 'Ретельне пояснення!'} ({presentation.explanation.length} {language === 'en' ? 'characters' : 'символів'})
            </div>
          )}
        </div>
      )}

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="examples">
            {t.exampleSentences}
          </label>
          <HelpIcon text={help.examples} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            id="examples"
            type="text"
            value={newExample}
            onChange={(e) => setNewExample(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExample())}
            placeholder={language === 'en'
              ? 'e.g., "I work in an office", "She plays tennis every day"'
              : 'напр., "Я працюю в офісі", "Вона грає в теніс щодня"'}
            style={{ flex: 1 }}
          />
          <button type="button" onClick={addExample}>{t.addButton}</button>
        </div>
        <div className="field-hint">
          {language === 'en'
            ? '📝 Add at least 3-5 clear examples that demonstrate the target language'
            : '📝 Додайте принаймні 3-5 чітких прикладів, які демонструють цільову мову'}
        </div>
        {presentation.examples.length > 0 && (
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            {presentation.examples.map((example, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                {example}
                <button
                  type="button"
                  onClick={() => removeExample(index)}
                  style={{ marginLeft: '0.5rem', fontSize: '0.875rem', padding: '0.25rem 0.5rem' }}
                >
                  {t.remove || '×'}
                </button>
              </li>
            ))}
          </ul>
        )}
        {presentation.examples.length >= 3 && (
          <div className="field-validation success">
            ✓ {language === 'en' ? 'Good number of examples!' : 'Гарна кількість прикладів!'} ({presentation.examples.length} {language === 'en' ? 'examples' : 'прикладів'})
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="duration">
            {t.durationMinutes}
          </label>
          <HelpIcon text={help.duration} />
        </div>
        <input
          id="duration"
          type="number"
          min="1"
          max="60"
          value={presentation.duration || ''}
          onChange={(e) => updateField('duration', e.target.value ? parseInt(e.target.value) : '')}
          placeholder={language === 'en' ? 'e.g., 15' : 'напр., 15'}
        />
        <div className="field-hint">
          {language === 'en'
            ? '⏱️ Presentation typically takes 10-20 minutes'
            : '⏱️ Презентація зазвичай займає 10-20 хвилин'}
        </div>
        {presentation.duration && presentation.duration > 30 && (
          <div className="field-validation warning">
            ⚠️ {language === 'en'
              ? 'This seems long for a presentation. Consider keeping it under 25 minutes.'
              : 'Це здається довгим для презентації. Розгляньте можливість зберегти це під 25 хвилин.'}
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
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMediaLink())}
            placeholder={language === 'en'
              ? 'https://youtube.com/watch?v=...'
              : 'https://youtube.com/watch?v=...'}
            style={{ flex: 1 }}
          />
          <button type="button" onClick={addMediaLink}>{t.addButton}</button>
        </div>
        {urlError && (
          <div className="field-validation error">
            ⚠️ {urlError}
          </div>
        )}
        <div className="field-hint">
          {language === 'en'
            ? '🔗 PowerPoint slides, grammar charts, YouTube videos, images. Must start with http:// or https://'
            : '🔗 PowerPoint слайди, граматичні таблиці, YouTube відео, зображення. Має починатися з http:// або https://'}
        </div>
        {(presentation.mediaLinks || []).length > 0 && (
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            {(presentation.mediaLinks || []).map((link, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ marginRight: '0.5rem' }}>
                  {link.length > 50 ? link.substring(0, 50) + '...' : link}
                </a>
                <button
                  type="button"
                  onClick={() => removeMediaLink(index)}
                  style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem' }}
                >
                  {t.remove || '×'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="teacherNotes">
            {t.teacherNotes}
          </label>
          <HelpIcon text={help.teacherNotes} />
        </div>
        <textarea
          id="teacherNotes"
          value={presentation.teacherNotes || ''}
          onChange={(e) => updateField('teacherNotes', e.target.value)}
          placeholder={language === 'en'
            ? 'Private notes: timing tips, common student errors, board layout, alternatives...'
            : 'Особисті нотатки: поради щодо часу, типові помилки учнів, розкладка дошки, альтернативи...'}
          rows={3}
        />
        <div className="field-hint">
          {language === 'en'
            ? '📝 These notes are only for you - students won\'t see them'
            : '📝 Ці нотатки тільки для вас - учні їх не побачать'}
        </div>
      </div>

      {(onBack || onSkip) && (
        <div className="form-navigation" style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
          {onBack && (
            <button type="button" onClick={onBack} className="btn-secondary">
              ← {language === 'en' ? 'Back' : 'Назад'}
            </button>
          )}
          {onSkip && (
            <button type="button" onClick={onSkip} className="btn-secondary">
              {language === 'en' ? 'Skip' : 'Пропустити'} →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
