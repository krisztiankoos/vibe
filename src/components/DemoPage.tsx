import { useState } from 'react';
import type { Language } from '../translations';
import TemplateGallery from './TemplateGallery';
import type { LessonTemplate } from '../types';

interface DemoPageProps {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  onExit: () => void;
}

export default function DemoPage({ language, onChangeLanguage, onExit }: DemoPageProps) {
  const [currentDemo, setCurrentDemo] = useState<'overview' | 'template-gallery'>('overview');
  const [selectedTemplate, setSelectedTemplate] = useState<LessonTemplate | null>(null);

  const t = {
    en: {
      title: 'v1.2.0 Demo & Testing Page',
      subtitle: 'Test all new Wordwall-style features and decide what else to add',
      switchLanguage: 'Switch to Ukrainian',
      exit: 'Exit Demo',
      overview: 'Overview',
      testGallery: 'Test Template Gallery',
      whatBuilt: 'What Has Been Built:',
      feature1Title: '12 Lesson Templates',
      feature1Desc: '6 English (PPP/TTT) + 6 Ukrainian (GPPC/CEFR/PPP/TTT)',
      feature2Title: 'Template Gallery UI',
      feature2Desc: 'Wordwall-style visual gallery with filters and search',
      feature3Title: 'Activity-Based Architecture',
      feature3Desc: 'Flexible activities that can be composed into any lesson structure',
      feature4Title: 'Bilingual Support',
      feature4Desc: 'Full English and Ukrainian interface',
      howToTest: 'How to Test:',
      step1: 'Click "Test Template Gallery" to see all 12 templates',
      step2: 'Use language and methodology filters',
      step3: 'Expand templates to see activity structures',
      step4: 'Click "Use This Template" to see what happens',
      step5: 'Switch languages to test Ukrainian interface',
      wordwallFeatures: 'Wordwall Features - What to Add Next?',
      wordwallIntro: 'Based on what you see, should we add these Wordwall features?',
      featureSpinner: 'Spinning Wheel - Random selection game',
      featureAutoGap: 'Auto-Gap Creator - Type sentence → auto-create gaps',
      featureImageUpload: 'Image Upload - Add images to exercises',
      featureConversion: 'Activity Conversion - Convert between exercise types',
      featureDragDrop: 'Drag-and-Drop Builder - Reorder activities visually',
      yourFeedback: 'Your Feedback:',
      feedbackPrompt: 'After testing, tell me which Wordwall features you want most!',
      backToOverview: 'Back to Overview',
      templateSelected: 'Template Selected!',
      templateSelectedDesc: 'In the real app, this would open the lesson builder with this template pre-loaded.',
      selectedTemplate: 'Selected Template:',
      activityCount: 'activities',
      totalDuration: 'min total',
      backToGallery: 'Back to Gallery'
    },
    uk: {
      title: 'Демо-сторінка v1.2.0 і Тестування',
      subtitle: 'Протестуйте всі нові функції в стилі Wordwall і вирішіть, що ще додати',
      switchLanguage: 'Перемкнути на English',
      exit: 'Вийти з Демо',
      overview: 'Огляд',
      testGallery: 'Тест Галереї Шаблонів',
      whatBuilt: 'Що Було Створено:',
      feature1Title: '12 Шаблонів Уроків',
      feature1Desc: '6 англійських (PPP/TTT) + 6 українських (GPPC/CEFR/PPP/TTT)',
      feature2Title: 'Галерея Шаблонів UI',
      feature2Desc: 'Візуальна галерея в стилі Wordwall з фільтрами',
      feature3Title: 'Архітектура на Основі Активностей',
      feature3Desc: 'Гнучкі активності, які можна скомпонувати в будь-яку структуру уроку',
      feature4Title: 'Двомовна Підтримка',
      feature4Desc: 'Повний інтерфейс англійською та українською',
      howToTest: 'Як Тестувати:',
      step1: 'Натисніть "Тест Галереї Шаблонів" щоб побачити всі 12 шаблонів',
      step2: 'Використовуйте фільтри за мовою та методологією',
      step3: 'Розгорніть шаблони, щоб побачити структури активностей',
      step4: 'Натисніть "Використати Шаблон" щоб побачити, що станеться',
      step5: 'Перемкніть мови для тестування українського інтерфейсу',
      wordwallFeatures: 'Функції Wordwall - Що Додати Далі?',
      wordwallIntro: 'На основі того, що ви бачите, чи варто додати ці функції Wordwall?',
      featureSpinner: 'Колесо Фортуни - Гра з випадковим вибором',
      featureAutoGap: 'Авто-Пропуски - Введіть речення → автоматично створюються пропуски',
      featureImageUpload: 'Завантаження Зображень - Додавайте зображення до вправ',
      featureConversion: 'Конвертація Активностей - Конвертуйте між типами вправ',
      featureDragDrop: 'Drag-and-Drop Конструктор - Візуально переставляйте активності',
      yourFeedback: 'Ваш Відгук:',
      feedbackPrompt: 'Після тестування скажіть мені, які функції Wordwall ви хочете найбільше!',
      backToOverview: 'Назад до Огляду',
      templateSelected: 'Шаблон Вибрано!',
      templateSelectedDesc: 'У реальному застосунку це відкриє конструктор уроків з попередньо завантаженим шаблоном.',
      selectedTemplate: 'Вибраний Шаблон:',
      activityCount: 'активностей',
      totalDuration: 'хв загалом',
      backToGallery: 'Назад до Галереї'
    }
  };

  const text = t[language];

  const handleSelectTemplate = (template: LessonTemplate) => {
    setSelectedTemplate(template);
    setCurrentDemo('overview');
  };

  const totalDuration = selectedTemplate?.activityStructure.reduce(
    (sum, activity) => sum + (activity.suggestedDuration || 0),
    0
  ) || 0;

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h1>{text.title}</h1>
          <p className="demo-subtitle">{text.subtitle}</p>
        </div>
        <div className="demo-header-actions">
          <button onClick={() => onChangeLanguage(language === 'en' ? 'uk' : 'en')} className="language-switch-btn">
            🌐 {text.switchLanguage}
          </button>
          <button onClick={onExit} className="exit-button">
            ✕ {text.exit}
          </button>
        </div>
      </header>

      {currentDemo === 'template-gallery' && (
        <TemplateGallery
          language={language}
          onSelectTemplate={handleSelectTemplate}
          onClose={() => setCurrentDemo('overview')}
        />
      )}

      {currentDemo === 'overview' && (
        <main className="demo-content">
          <nav className="demo-nav">
            <button
              className="demo-nav-btn active"
              onClick={() => setCurrentDemo('overview')}
            >
              📋 {text.overview}
            </button>
            <button
              className="demo-nav-btn"
              onClick={() => setCurrentDemo('template-gallery')}
            >
              🎯 {text.testGallery}
            </button>
          </nav>

          {selectedTemplate && (
            <section className="demo-section template-result-section">
              <div className="success-banner">
                <h2>✅ {text.templateSelected}</h2>
                <p>{text.templateSelectedDesc}</p>
              </div>
              <div className="selected-template-card">
                <h3>{text.selectedTemplate}</h3>
                <div className="template-info">
                  <h4>{selectedTemplate.name}</h4>
                  <p>{selectedTemplate.description}</p>
                  <div className="template-stats">
                    <span className="stat-badge">{selectedTemplate.methodologyTag}</span>
                    <span className="stat-badge">{selectedTemplate.language}</span>
                    <span className="stat-badge">{selectedTemplate.level}</span>
                    <span className="stat-badge">
                      {selectedTemplate.activityStructure.length} {text.activityCount}
                    </span>
                    <span className="stat-badge">
                      {totalDuration} {text.totalDuration}
                    </span>
                  </div>
                  <div className="activity-preview">
                    <h5>{language === 'en' ? 'Activity Structure:' : 'Структура Активностей:'}</h5>
                    <ol>
                      {selectedTemplate.activityStructure.map((activity, idx) => (
                        <li key={idx}>
                          <strong>{activity.title}</strong> ({activity.type})
                          {activity.suggestedDuration && ` - ${activity.suggestedDuration} ${language === 'en' ? 'min' : 'хв'}`}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <button onClick={() => setSelectedTemplate(null)} className="secondary-button">
                  ← {text.backToGallery}
                </button>
              </div>
            </section>
          )}

          <section className="demo-section">
            <h2>{text.whatBuilt}</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>{text.feature1Title}</h3>
                <p>{text.feature1Desc}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>{text.feature2Title}</h3>
                <p>{text.feature2Desc}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏗️</div>
                <h3>{text.feature3Title}</h3>
                <p>{text.feature3Desc}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>{text.feature4Title}</h3>
                <p>{text.feature4Desc}</p>
              </div>
            </div>
          </section>

          <section className="demo-section">
            <h2>{text.howToTest}</h2>
            <ol className="testing-steps">
              <li>{text.step1}</li>
              <li>{text.step2}</li>
              <li>{text.step3}</li>
              <li>{text.step4}</li>
              <li>{text.step5}</li>
            </ol>
          </section>

          <section className="demo-section wordwall-features">
            <h2>{text.wordwallFeatures}</h2>
            <p className="section-intro">{text.wordwallIntro}</p>
            <div className="wordwall-feature-list">
              <div className="wordwall-feature">
                <div className="feature-checkbox">🎡</div>
                <div>
                  <h4>{text.featureSpinner}</h4>
                </div>
              </div>
              <div className="wordwall-feature">
                <div className="feature-checkbox">✨</div>
                <div>
                  <h4>{text.featureAutoGap}</h4>
                </div>
              </div>
              <div className="wordwall-feature">
                <div className="feature-checkbox">🖼️</div>
                <div>
                  <h4>{text.featureImageUpload}</h4>
                </div>
              </div>
              <div className="wordwall-feature">
                <div className="feature-checkbox">🔄</div>
                <div>
                  <h4>{text.featureConversion}</h4>
                </div>
              </div>
              <div className="wordwall-feature">
                <div className="feature-checkbox">🎯</div>
                <div>
                  <h4>{text.featureDragDrop}</h4>
                </div>
              </div>
            </div>
          </section>

          <section className="demo-section feedback-section">
            <h2>{text.yourFeedback}</h2>
            <p className="feedback-prompt">{text.feedbackPrompt}</p>
          </section>
        </main>
      )}
    </div>
  );
}
