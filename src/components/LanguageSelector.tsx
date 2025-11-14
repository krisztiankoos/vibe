import type { Language } from '../translations';
import { translations } from '../translations';

interface LanguageSelectorProps {
  onSelectLanguage: (lang: Language) => void;
}

export default function LanguageSelector({ onSelectLanguage }: LanguageSelectorProps) {
  const t = translations.en; // Always show home in English for now

  return (
    <div className="language-selector">
      <div className="selector-content">
        <h1>{t.homeTitle}</h1>
        <p className="subtitle">{t.homeSubtitle}</p>

        <h2>{t.selectLanguage}</h2>

        <div className="language-cards">
          <div className="language-card" onClick={() => onSelectLanguage('en')}>
            <div className="language-flag">🇬🇧</div>
            <h3>{t.englishLessonBuilder}</h3>
            <p>{t.englishDescription}</p>
            <button className="select-btn">Select English</button>
          </div>

          <div className="language-card" onClick={() => onSelectLanguage('uk')}>
            <div className="language-flag">🇺🇦</div>
            <h3>{t.ukrainianLessonBuilder}</h3>
            <p>{t.ukrainianDescription}</p>
            <button className="select-btn">Обрати Українську</button>
          </div>
        </div>

        <div className="info-banner">
          <p>
            <strong>Teaching Methodologies:</strong> Choose from four proven frameworks - <strong>PPP</strong> (Presentation-Practice-Production), <strong>TTT</strong> (Test-Teach-Test), <strong>GPPC/ГППК</strong> (Grammar-Presentation-Practice-Communication), and <strong>CEFR</strong> (Common European Framework Task-Based Learning).
          </p>
        </div>
      </div>
    </div>
  );
}
