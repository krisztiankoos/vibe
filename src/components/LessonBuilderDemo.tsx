import { useState } from 'react';
import type { Language } from '../translations';
import FlashCardsActivity from './lesson-activities/FlashCardsActivity';
import GapFillActivity from './lesson-activities/GapFillActivity';
import GroupSortActivity from './lesson-activities/GroupSortActivity';
import RandomWheelActivity from './lesson-activities/RandomWheelActivity';
import {
  feelingsFlashCards,
  verbPrefixesGapFill,
  possessivePronounsGapFill,
  adverbsGroupSort,
  discussionWheel
} from '../data/wordwallLessonData';

interface LessonBuilderDemoProps {
  language: Language;
  onBack: () => void;
}

type ActivityId = 'feelings-flash' | 'gap-fill-prefixes' | 'possessive-pronouns' | 'group-sort-adverbs' | 'discussion-wheel';

export default function LessonBuilderDemo({ language, onBack }: LessonBuilderDemoProps) {
  const [viewMode, setViewMode] = useState<'builder' | 'student'>('builder');
  const [currentActivityId, setCurrentActivityId] = useState<ActivityId>('feelings-flash');
  const [completedActivities, setCompletedActivities] = useState<Set<ActivityId>>(new Set());

  const text = {
    en: {
      title: 'Lesson Builder Demo',
      subtitle: 'Build methodology-driven lessons with activities',
      lessonTitle: 'Ukrainian Verbs of Motion',
      methodology: 'Grammar-Translation Method',
      teacherView: 'Teacher View (Builder)',
      studentView: 'Student View',
      phases: {
        warmup: 'Warm-up & Vocabulary',
        presentation: 'Grammar Presentation',
        practice: 'Guided Practice',
        production: 'Free Practice / Discussion'
      },
      duration: 'Duration',
      minutes: 'min',
      activities: 'Activities',
      addActivity: '+ Add Activity',
      startLesson: 'Start Lesson',
      back: 'Back to Home',
      nextActivity: 'Next Activity',
      previousActivity: 'Previous Activity',
      backToOverview: 'Back to Overview',
      lessonComplete: 'Lesson Complete!',
      congratulations: 'Congratulations! You completed all activities.',
      activitiesCompleted: 'activities completed'
    },
    uk: {
      title: 'Демо Конструктора Уроків',
      subtitle: 'Створюйте уроки за методологією з активностями',
      lessonTitle: 'Дієслова Руху в Українській',
      methodology: 'Граматико-перекладний метод',
      teacherView: 'Вигляд Вчителя (Конструктор)',
      studentView: 'Вигляд Студента',
      phases: {
        warmup: 'Розминка та Vocabulary',
        presentation: 'Презентація Граматики',
        practice: 'Керована Практика',
        production: 'Вільна Практика / Дискусія'
      },
      duration: 'Тривалість',
      minutes: 'хв',
      activities: 'Активності',
      addActivity: '+ Додати Активність',
      startLesson: 'Почати Урок',
      back: 'Назад на Головну',
      nextActivity: 'Наступна Активність',
      previousActivity: 'Попередня Активність',
      backToOverview: 'Назад до Огляду',
      lessonComplete: 'Урок Завершено!',
      congratulations: 'Вітаємо! Ви завершили всі активності.',
      activitiesCompleted: 'активностей завершено'
    }
  };

  const t = text[language];

  // Lesson structure with real Wordwall activities
  const lessonPhases = [
    {
      id: 'warmup',
      title: t.phases.warmup,
      duration: 10,
      color: '#10b981',
      activities: [
        {
          id: 'feelings-flash' as ActivityId,
          type: 'Flash Cards',
          title: 'Feelings (Почуття)',
          content: '10 Ukrainian-English pairs',
          icon: '🎴'
        }
      ]
    },
    {
      id: 'presentation',
      title: t.phases.presentation,
      duration: 20,
      color: '#667eea',
      activities: [
        {
          id: 'gap-fill-prefixes' as ActivityId,
          type: 'Gap Fill',
          title: 'Діє слова руху. Префікси',
          content: '12 sentences with verb prefixes',
          icon: '✏️'
        },
        {
          id: 'possessive-pronouns' as ActivityId,
          type: 'Gap Fill',
          title: 'Possessive Pronouns',
          content: '10 sentences with possessive pronouns',
          icon: '✏️'
        }
      ]
    },
    {
      id: 'practice',
      title: t.phases.practice,
      duration: 15,
      color: '#f59e0b',
      activities: [
        {
          id: 'group-sort-adverbs' as ActivityId,
          type: 'Group Sort',
          title: 'Adverbs of Time',
          content: '2 groups: йті-їхати vs ходити-їздити',
          icon: '🗂️'
        }
      ]
    },
    {
      id: 'production',
      title: t.phases.production,
      duration: 15,
      color: '#8b5cf6',
      activities: [
        {
          id: 'discussion-wheel' as ActivityId,
          type: 'Random Wheel',
          title: 'Prefixes Motion Verbs Discussion',
          content: '7 discussion questions',
          icon: '🎡'
        }
      ]
    }
  ];

  const allActivities = lessonPhases.flatMap(phase => phase.activities);
  const totalDuration = lessonPhases.reduce((sum, phase) => sum + phase.duration, 0);
  const currentActivityIndex = allActivities.findIndex(a => a.id === currentActivityId);
  const currentActivity = allActivities[currentActivityIndex];

  const handleActivityComplete = () => {
    setCompletedActivities(prev => new Set([...prev, currentActivityId]));
  };

  const handleNextActivity = () => {
    if (currentActivityIndex < allActivities.length - 1) {
      setCurrentActivityId(allActivities[currentActivityIndex + 1].id);
    }
  };

  const handlePreviousActivity = () => {
    if (currentActivityIndex > 0) {
      setCurrentActivityId(allActivities[currentActivityIndex - 1].id);
    }
  };

  const renderActivity = () => {
    switch (currentActivityId) {
      case 'feelings-flash':
        return (
          <FlashCardsActivity
            cards={feelingsFlashCards}
            onComplete={handleActivityComplete}
          />
        );
      case 'gap-fill-prefixes':
        return (
          <GapFillActivity
            items={verbPrefixesGapFill}
            title="Діє слова руху. Префікси"
            onComplete={handleActivityComplete}
          />
        );
      case 'possessive-pronouns':
        return (
          <GapFillActivity
            items={possessivePronounsGapFill.map(item => ({
              sentence: item.sentence,
              answer: '' // No answers provided in original data
            }))}
            title="Possessive Pronouns"
            onComplete={handleActivityComplete}
          />
        );
      case 'group-sort-adverbs':
        return (
          <GroupSortActivity
            groups={adverbsGroupSort.groups}
            items={adverbsGroupSort.items}
            onComplete={handleActivityComplete}
          />
        );
      case 'discussion-wheel':
        return (
          <RandomWheelActivity
            questions={discussionWheel}
            onComplete={handleActivityComplete}
          />
        );
      default:
        return <div>Activity not found</div>;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.5rem 1rem',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid white',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}
        >
          ← {t.back}
        </button>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>{t.title}</h1>
              <p style={{ margin: 0, color: '#666' }}>{t.subtitle}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setViewMode('builder')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: viewMode === 'builder' ? '#667eea' : '#e5e7eb',
                  color: viewMode === 'builder' ? 'white' : '#666',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                👨‍🏫 {t.teacherView}
              </button>
              <button
                onClick={() => setViewMode('student')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: viewMode === 'student' ? '#10b981' : '#e5e7eb',
                  color: viewMode === 'student' ? 'white' : '#666',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                👨‍🎓 {t.studentView}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {viewMode === 'builder' ? (
          /* TEACHER VIEW - Lesson Builder */
          <div>
            {/* Preview Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👁️</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>
                {language === 'en' ? 'Preview Mode' : 'Режим Перегляду'}
              </h3>
              <p style={{ margin: 0, opacity: 0.9 }}>
                {language === 'en'
                  ? 'This is a preview of the lesson structure. Switch to Student View to interact with the activities.'
                  : 'Це попередній перегляд структури уроку. Перейдіть до Вигляду Студента, щоб взаємодіяти з активностями.'}
              </p>
            </div>

            {/* Lesson Info */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              <h2 style={{ margin: '0 0 1rem 0', color: '#667eea' }}>{t.lessonTitle}</h2>
              <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem', color: '#666' }}>
                <div>
                  <strong>📚 {t.methodology}</strong>
                </div>
                <div>
                  <strong>⏱️ {t.duration}:</strong> {totalDuration} {t.minutes}
                </div>
                <div>
                  <strong>🎯 {t.activities}:</strong> {allActivities.length}
                </div>
              </div>
            </div>

            {/* Lesson Phases */}
            {lessonPhases.map((phase, idx) => (
              <div
                key={phase.id}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '2rem',
                  marginBottom: '1.5rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  borderLeft: `6px solid ${phase.color}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: phase.color }}>
                      {idx + 1}. {phase.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                      ⏱️ {phase.duration} {t.minutes}
                    </p>
                  </div>
                </div>

                {/* Activities in this phase */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {phase.activities.map(activity => (
                    <div
                      key={activity.id}
                      style={{
                        padding: '1.5rem',
                        background: '#f9fafb',
                        borderRadius: '8px',
                        border: '2px dashed #e5e7eb'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '2rem' }}>{activity.icon}</span>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 0.25rem 0' }}>{activity.title}</h4>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>
                            {activity.type} • {activity.content}
                          </p>
                        </div>
                        <div style={{
                          padding: '0.5rem 1rem',
                          background: phase.color,
                          color: 'white',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold'
                        }}>
                          From Wordwall
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    style={{
                      padding: '1rem',
                      background: 'white',
                      color: phase.color,
                      border: `2px dashed ${phase.color}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '0.95rem'
                    }}
                  >
                    {t.addActivity}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* STUDENT VIEW - Interactive Lesson */
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            {/* Lesson Header */}
            <h2 style={{ margin: '0 0 1rem 0', textAlign: 'center', color: '#667eea' }}>
              {t.lessonTitle}
            </h2>

            {/* Progress */}
            <div style={{
              marginBottom: '2rem',
              padding: '1rem',
              background: '#f0f9ff',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>
                  Activity {currentActivityIndex + 1} of {allActivities.length}
                </span>
                <span>{completedActivities.size} {t.activitiesCompleted}</span>
              </div>
              <div style={{
                width: '100%',
                height: '12px',
                background: '#e5e7eb',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${((currentActivityIndex + 1) / allActivities.length) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                }} />
              </div>
            </div>

            {/* Current Activity */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                background: '#f9fafb',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{currentActivity.icon}</span>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#374151' }}>
                    {currentActivity.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    {currentActivity.type} • {currentActivity.content}
                  </div>
                </div>
              </div>

              {renderActivity()}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                onClick={handlePreviousActivity}
                disabled={currentActivityIndex === 0}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: currentActivityIndex === 0 ? '#e5e7eb' : '#f3f4f6',
                  color: currentActivityIndex === 0 ? '#9ca3af' : '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: currentActivityIndex === 0 ? 'not-allowed' : 'pointer',
                  flex: 1
                }}
              >
                ← {t.previousActivity}
              </button>
              <button
                onClick={handleNextActivity}
                disabled={currentActivityIndex === allActivities.length - 1}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: currentActivityIndex === allActivities.length - 1
                    ? '#e5e7eb'
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: currentActivityIndex === allActivities.length - 1 ? '#9ca3af' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: currentActivityIndex === allActivities.length - 1 ? 'not-allowed' : 'pointer',
                  flex: 1
                }}
              >
                {t.nextActivity} →
              </button>
            </div>

            {/* Lesson complete message */}
            {completedActivities.size === allActivities.length && (
              <div style={{
                marginTop: '2rem',
                padding: '2rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{t.lessonComplete}</h3>
                <p style={{ margin: 0, opacity: 0.9 }}>{t.congratulations}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
