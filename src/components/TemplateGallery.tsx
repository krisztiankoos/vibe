import { useState } from 'react';
import type { LessonTemplate } from '../types';
import type { Language } from '../translations';
import { allTemplates } from '../data/lessonTemplates';

interface TemplateGalleryProps {
  language: Language;
  onSelectTemplate: (template: LessonTemplate) => void;
  onClose: () => void;
}

export default function TemplateGallery({ language, onSelectTemplate, onClose }: TemplateGalleryProps) {
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<'all' | 'English' | 'Ukrainian'>('all');
  const [selectedMethodologyFilter, setSelectedMethodologyFilter] = useState<'all' | 'PPP' | 'TTT' | 'GPPC' | 'CEFR'>('all');
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  // Filter templates
  const filteredTemplates = allTemplates.filter(template => {
    const languageMatch = selectedLanguageFilter === 'all' || template.language === selectedLanguageFilter;
    const methodologyMatch = selectedMethodologyFilter === 'all' || template.methodologyTag === selectedMethodologyFilter;
    return languageMatch && methodologyMatch;
  });

  const handleUseTemplate = (template: LessonTemplate) => {
    onSelectTemplate(template);
  };

  const toggleExpand = (templateId: string) => {
    setExpandedTemplate(expandedTemplate === templateId ? null : templateId);
  };

  const t = {
    en: {
      title: 'Lesson Template Library',
      subtitle: 'Start from a template - save 80% of your time!',
      filterByLanguage: 'Filter by Language:',
      filterByMethodology: 'Filter by Methodology:',
      all: 'All',
      activities: 'activities',
      duration: 'min total',
      showDetails: 'Show Details',
      hideDetails: 'Hide Details',
      useTemplate: 'Use This Template',
      activityStructure: 'Activity Structure:',
      close: 'Close',
      noTemplates: 'No templates match your filters. Try selecting "All".',
      templatesFound: 'templates found'
    },
    uk: {
      title: 'Бібліотека шаблонів уроків',
      subtitle: 'Почніть з шаблону - заощадьте 80% часу!',
      filterByLanguage: 'Фільтр за мовою:',
      filterByMethodology: 'Фільтр за методологією:',
      all: 'Всі',
      activities: 'активностей',
      duration: 'хв загалом',
      showDetails: 'Показати деталі',
      hideDetails: 'Приховати деталі',
      useTemplate: 'Використати шаблон',
      activityStructure: 'Структура активностей:',
      close: 'Закрити',
      noTemplates: 'Немає шаблонів за вашими фільтрами. Спробуйте вибрати "Всі".',
      templatesFound: 'знайдено шаблонів'
    }
  };

  const text = t[language];

  const getMethodologyColor = (methodology: string) => {
    const colors: Record<string, string> = {
      'PPP': '#667eea',
      'TTT': '#f59e0b',
      'GPPC': '#10b981',
      'CEFR': '#06b6d4'
    };
    return colors[methodology] || '#6b7280';
  };

  const getActivityTypeLabel = (type: string) => {
    const labels: Record<string, { en: string; uk: string }> = {
      'warm-up': { en: 'Warm-Up', uk: 'Розминка' },
      'presentation': { en: 'Presentation', uk: 'Презентація' },
      'exercise': { en: 'Exercise', uk: 'Вправа' },
      'discussion': { en: 'Discussion', uk: 'Обговорення' },
      'task': { en: 'Task', uk: 'Завдання' },
      'reflection': { en: 'Reflection', uk: 'Рефлексія' }
    };
    return labels[type]?.[language] || type;
  };

  return (
    <div className="template-gallery-overlay">
      <div className="template-gallery">
        <header className="template-gallery-header">
          <div>
            <h1>{text.title}</h1>
            <p className="template-gallery-subtitle">{text.subtitle}</p>
          </div>
          <button onClick={onClose} className="close-button">
            ✕ {text.close}
          </button>
        </header>

        <div className="template-filters">
          <div className="filter-group">
            <label>{text.filterByLanguage}</label>
            <div className="filter-buttons">
              <button
                className={selectedLanguageFilter === 'all' ? 'active' : ''}
                onClick={() => setSelectedLanguageFilter('all')}
              >
                {text.all}
              </button>
              <button
                className={selectedLanguageFilter === 'English' ? 'active' : ''}
                onClick={() => setSelectedLanguageFilter('English')}
              >
                English
              </button>
              <button
                className={selectedLanguageFilter === 'Ukrainian' ? 'active' : ''}
                onClick={() => setSelectedLanguageFilter('Ukrainian')}
              >
                Українська
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>{text.filterByMethodology}</label>
            <div className="filter-buttons">
              <button
                className={selectedMethodologyFilter === 'all' ? 'active' : ''}
                onClick={() => setSelectedMethodologyFilter('all')}
              >
                {text.all}
              </button>
              <button
                className={selectedMethodologyFilter === 'PPP' ? 'active' : ''}
                onClick={() => setSelectedMethodologyFilter('PPP')}
              >
                PPP
              </button>
              <button
                className={selectedMethodologyFilter === 'TTT' ? 'active' : ''}
                onClick={() => setSelectedMethodologyFilter('TTT')}
              >
                TTT
              </button>
              <button
                className={selectedMethodologyFilter === 'GPPC' ? 'active' : ''}
                onClick={() => setSelectedMethodologyFilter('GPPC')}
              >
                GPPC
              </button>
              <button
                className={selectedMethodologyFilter === 'CEFR' ? 'active' : ''}
                onClick={() => setSelectedMethodologyFilter('CEFR')}
              >
                CEFR
              </button>
            </div>
          </div>
        </div>

        <div className="template-count">
          {filteredTemplates.length} {text.templatesFound}
        </div>

        <div className="template-grid">
          {filteredTemplates.length === 0 ? (
            <div className="no-templates">
              <p>{text.noTemplates}</p>
            </div>
          ) : (
            filteredTemplates.map(template => {
              const isExpanded = expandedTemplate === template.id;
              const totalDuration = template.activityStructure.reduce(
                (sum, activity) => sum + (activity.suggestedDuration || 0),
                0
              );

              return (
                <div key={template.id} className="template-card">
                  <div className="template-card-header">
                    <div>
                      <h3>{template.name}</h3>
                      <p className="template-description">{template.description}</p>
                    </div>
                    <span
                      className="methodology-badge"
                      style={{ backgroundColor: getMethodologyColor(template.methodologyTag) }}
                    >
                      {template.methodologyTag}
                    </span>
                  </div>

                  <div className="template-meta">
                    <span className="meta-badge">{template.language}</span>
                    {template.level && <span className="meta-badge">{template.level}</span>}
                    <span className="meta-badge">
                      {template.activityStructure.length} {text.activities}
                    </span>
                    {totalDuration > 0 && (
                      <span className="meta-badge">{totalDuration} {text.duration}</span>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="template-details">
                      <h4>{text.activityStructure}</h4>
                      <ol className="activity-list">
                        {template.activityStructure.map((activity, index) => (
                          <li key={index}>
                            <div className="activity-item">
                              <span className="activity-type">
                                {getActivityTypeLabel(activity.type)}
                              </span>
                              <span className="activity-title">{activity.title}</span>
                              {activity.suggestedDuration && (
                                <span className="activity-duration">
                                  {activity.suggestedDuration} {language === 'en' ? 'min' : 'хв'}
                                </span>
                              )}
                            </div>
                            {activity.description && (
                              <p className="activity-description">{activity.description}</p>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <div className="template-actions">
                    <button
                      onClick={() => toggleExpand(template.id)}
                      className="details-button"
                    >
                      {isExpanded ? text.hideDetails : text.showDetails}
                    </button>
                    <button
                      onClick={() => handleUseTemplate(template)}
                      className="use-template-button"
                    >
                      🎯 {text.useTemplate}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
