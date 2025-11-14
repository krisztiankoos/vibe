/**
 * Lesson Templates for Wordwall-Style Builder
 *
 * Pre-configured activity sequences that teachers can use as starting points
 * Templates demonstrate different methodologies and provide quick lesson creation
 */

import type { LessonTemplate } from '../types';

/**
 * English ESL Templates (6 templates)
 * 3 PPP (Presentation-Practice-Production)
 * 3 TTT (Test-Teach-Test)
 */

export const englishTemplates: LessonTemplate[] = [
  // ==========================================
  // PPP TEMPLATES (3)
  // ==========================================
  {
    id: 'template-ppp-present-simple-a2',
    name: 'Present Simple - Daily Routines',
    description: 'Grammar-focused lesson teaching present simple for daily activities (A2 level)',
    methodologyTag: 'PPP',
    language: 'English',
    level: 'A2 Elementary',
    activityStructure: [
      {
        type: 'warm-up',
        title: 'My Morning Routine',
        suggestedDuration: 10,
        description: 'Students discuss their morning routines in pairs'
      },
      {
        type: 'presentation',
        title: 'Present Simple Form and Use',
        suggestedDuration: 15,
        description: 'Teach present simple form (I/you/we/they + verb, he/she/it + verb+s) and use (habits, routines)'
      },
      {
        type: 'exercise',
        title: 'Controlled Practice: Gap Fill',
        suggestedDuration: 10,
        description: 'Complete sentences with correct verb forms'
      },
      {
        type: 'exercise',
        title: 'Controlled Practice: Multiple Choice',
        suggestedDuration: 10,
        description: 'Choose correct verb forms'
      },
      {
        type: 'discussion',
        title: 'Free Practice: Interview',
        suggestedDuration: 10,
        description: 'Students interview each other about daily routines'
      },
      {
        type: 'task',
        title: 'Production: Write About Your Day',
        suggestedDuration: 15,
        description: 'Students write 5-6 sentences describing their typical day'
      }
    ],
    tags: ['grammar', 'present-simple', 'routines', 'A2', 'PPP']
  },
  {
    id: 'template-ppp-past-simple-a2',
    name: 'Past Simple - Weekend Stories',
    description: 'Grammar lesson teaching past simple regular and irregular verbs (A2 level)',
    methodologyTag: 'PPP',
    language: 'English',
    level: 'A2 Elementary',
    activityStructure: [
      {
        type: 'warm-up',
        title: 'Last Weekend',
        suggestedDuration: 8,
        description: 'Share one thing you did last weekend'
      },
      {
        type: 'presentation',
        title: 'Past Simple - Regular and Irregular Verbs',
        suggestedDuration: 15,
        description: 'Teach past simple formation: regular (-ed) and common irregular verbs'
      },
      {
        type: 'exercise',
        title: 'Controlled Practice: Verb Forms',
        suggestedDuration: 10,
        description: 'Write past simple forms of verbs'
      },
      {
        type: 'exercise',
        title: 'Controlled Practice: Sentence Completion',
        suggestedDuration: 10,
        description: 'Complete story with past simple verbs'
      },
      {
        type: 'discussion',
        title: 'Free Practice: Story Chain',
        suggestedDuration: 12,
        description: 'Groups create a story using past simple verbs'
      },
      {
        type: 'reflection',
        title: 'Review and Self-Check',
        suggestedDuration: 5,
        description: 'Students identify which irregular verbs they still need to practice'
      }
    ],
    tags: ['grammar', 'past-simple', 'storytelling', 'A2', 'PPP']
  },
  {
    id: 'template-ppp-comparatives-b1',
    name: 'Comparatives and Superlatives',
    description: 'Grammar lesson teaching comparative and superlative adjectives (B1 level)',
    methodologyTag: 'PPP',
    language: 'English',
    level: 'B1 Intermediate',
    activityStructure: [
      {
        type: 'warm-up',
        title: 'City vs Country',
        suggestedDuration: 10,
        description: 'Compare living in a city vs countryside - which is better?'
      },
      {
        type: 'presentation',
        title: 'Forming Comparatives and Superlatives',
        suggestedDuration: 15,
        description: 'Teach formation rules: -er/-est, more/most, irregular forms (good-better-best)'
      },
      {
        type: 'exercise',
        title: 'Controlled Practice: Form the Adjective',
        suggestedDuration: 8,
        description: 'Write comparative and superlative forms'
      },
      {
        type: 'exercise',
        title: 'Controlled Practice: Complete Sentences',
        suggestedDuration: 10,
        description: 'Use correct comparative/superlative forms in context'
      },
      {
        type: 'task',
        title: 'Production: Compare Three Cities',
        suggestedDuration: 12,
        description: 'Students write comparisons of three cities they know'
      },
      {
        type: 'discussion',
        title: 'Free Practice: Debate',
        suggestedDuration: 15,
        description: 'Debate: Which is better - city life or country life? Use comparatives.'
      }
    ],
    tags: ['grammar', 'comparatives', 'adjectives', 'B1', 'PPP']
  },

  // ==========================================
  // TTT TEMPLATES (3)
  // ==========================================
  {
    id: 'template-ttt-phrasal-verbs-b1',
    name: 'Phrasal Verbs - Relationships',
    description: 'Discovery-based lesson for learning phrasal verbs through context (B1 level)',
    methodologyTag: 'TTT',
    language: 'English',
    level: 'B1 Intermediate',
    activityStructure: [
      {
        type: 'exercise',
        title: 'Test 1: Match Phrasal Verbs (Diagnostic)',
        suggestedDuration: 10,
        description: 'Students try to match phrasal verbs with meanings (see what they know)'
      },
      {
        type: 'warm-up',
        title: 'Relationship Story',
        suggestedDuration: 8,
        description: 'Read short story about a relationship - elicit phrasal verbs from context'
      },
      {
        type: 'presentation',
        title: 'Phrasal Verbs - Meaning and Use',
        suggestedDuration: 15,
        description: 'Teach: get along with, fall out, make up, break up, ask out, go out with'
      },
      {
        type: 'exercise',
        title: 'Controlled Practice: Gap Fill',
        suggestedDuration: 10,
        description: 'Complete sentences with correct phrasal verbs'
      },
      {
        type: 'discussion',
        title: 'Free Practice: Personal Stories',
        suggestedDuration: 12,
        description: 'Students share stories about friendships using phrasal verbs'
      },
      {
        type: 'exercise',
        title: 'Test 2: Use Phrasal Verbs (Final Check)',
        suggestedDuration: 10,
        description: 'Write sentences using phrasal verbs - compare to Test 1 performance'
      }
    ],
    tags: ['vocabulary', 'phrasal-verbs', 'relationships', 'B1', 'TTT']
  },
  {
    id: 'template-ttt-writing-email-b2',
    name: 'Formal Email Writing',
    description: 'Discovery-based writing lesson for formal emails (B2 level)',
    methodologyTag: 'TTT',
    language: 'English',
    level: 'B2 Upper-Intermediate',
    activityStructure: [
      {
        type: 'task',
        title: 'Test 1: Write a Formal Email (Diagnostic)',
        suggestedDuration: 15,
        description: 'Students write a formal complaint email - see what they know'
      },
      {
        type: 'warm-up',
        title: 'Analyze Email Examples',
        suggestedDuration: 10,
        description: 'Read good and bad formal emails - identify differences'
      },
      {
        type: 'presentation',
        title: 'Formal Email Structure and Language',
        suggestedDuration: 15,
        description: 'Teach: subject line, greeting, opening, body, closing, sign-off, formal phrases'
      },
      {
        type: 'exercise',
        title: 'Practice: Rewrite Informal → Formal',
        suggestedDuration: 10,
        description: 'Rewrite informal phrases as formal email language'
      },
      {
        type: 'task',
        title: 'Test 2: Write a Formal Email (Improved)',
        suggestedDuration: 15,
        description: 'Write another formal email - apply what they learned'
      },
      {
        type: 'reflection',
        title: 'Compare and Reflect',
        suggestedDuration: 5,
        description: 'Students compare Test 1 and Test 2 - what improved?'
      }
    ],
    tags: ['writing', 'email', 'formal-language', 'B2', 'TTT']
  },
  {
    id: 'template-ttt-listening-accents-b2',
    name: 'Understanding Different Accents',
    description: 'Discovery-based listening lesson for accent recognition (B2 level)',
    methodologyTag: 'TTT',
    language: 'English',
    level: 'B2 Upper-Intermediate',
    activityStructure: [
      {
        type: 'exercise',
        title: 'Test 1: Listen and Identify Accents',
        suggestedDuration: 10,
        description: 'Listen to 4 speakers - try to identify British, American, Australian, Indian accents'
      },
      {
        type: 'warm-up',
        title: 'Accent Awareness',
        suggestedDuration: 8,
        description: 'Discuss: What accents do you know? Which are easiest/hardest to understand?'
      },
      {
        type: 'presentation',
        title: 'Key Accent Differences',
        suggestedDuration: 15,
        description: 'Teach key pronunciation differences: /r/ sounds, vowels, intonation patterns'
      },
      {
        type: 'exercise',
        title: 'Practice: Identify Features',
        suggestedDuration: 10,
        description: 'Listen to short clips - identify specific pronunciation features'
      },
      {
        type: 'discussion',
        title: 'Free Practice: Accent Preferences',
        suggestedDuration: 10,
        description: 'Discuss: Does accent matter? Should everyone learn "standard" English?'
      },
      {
        type: 'exercise',
        title: 'Test 2: Listen and Comprehend',
        suggestedDuration: 12,
        description: 'Listen to same speakers again - answer comprehension questions (check improvement)'
      }
    ],
    tags: ['listening', 'accents', 'pronunciation', 'B2', 'TTT']
  }
];

/**
 * Ukrainian Language Templates (6 templates)
 * 2 GPPC (Grammar-Presentation-Practice-Communication)
 * 2 CEFR (Task-Based)
 * 1 PPP (Grammar-focused)
 * 1 TTT (Discovery-based)
 */

export const ukrainianTemplates: LessonTemplate[] = [
  // ==========================================
  // GPPC TEMPLATES (2) - Ukrainian-specific methodology
  // ==========================================
  {
    id: 'template-gppc-vidminky-6',
    name: 'Відмінки іменників - Орудний відмінок',
    description: 'Граматично-комунікативний урок вивчення орудного відмінку (6 клас)',
    methodologyTag: 'GPPC',
    language: 'Ukrainian',
    level: '6 клас',
    activityStructure: [
      {
        type: 'warm-up',
        title: 'Чим ми користуємось?',
        suggestedDuration: 8,
        description: 'Учні називають предмети, якими користуються щодня (олівець, ручка, ложка)'
      },
      {
        type: 'presentation',
        title: 'Орудний відмінок - форма та вживання',
        suggestedDuration: 15,
        description: 'Навчання: питання (ким? чим?), закінчення (-ом/-ем, -ою/-єю), вживання'
      },
      {
        type: 'exercise',
        title: 'Контрольована практика: Постав закінчення',
        suggestedDuration: 10,
        description: 'Доповніть речення правильними закінченнями орудного відмінку'
      },
      {
        type: 'exercise',
        title: 'Контрольована практика: Виправ помилки',
        suggestedDuration: 10,
        description: 'Знайдіть та виправте помилки у вживанні орудного відмінку'
      },
      {
        type: 'discussion',
        title: 'Комунікативна практика: Інтерв\'ю про професії',
        suggestedDuration: 12,
        description: 'Запитайте одне одного: "Ким ти хочеш стати? Чим ти будеш займатися?"'
      },
      {
        type: 'task',
        title: 'Комунікація: Опиши свій день',
        suggestedDuration: 10,
        description: 'Напишіть 5-6 речень про те, чим ви користуєтесь кожного дня'
      }
    ],
    tags: ['граматика', 'відмінки', 'орудний', '6-клас', 'GPPC']
  },
  {
    id: 'template-gppc-aspekty-7',
    name: 'Дієслівні види - доконаний та недоконаний',
    description: 'Граматично-комунікативний урок вивчення дієслівних видів (7 клас)',
    methodologyTag: 'GPPC',
    language: 'Ukrainian',
    level: '7 клас',
    activityStructure: [
      {
        type: 'warm-up',
        title: 'Що ти зробив? Що ти робив?',
        suggestedDuration: 10,
        description: 'Учні розповідають про вчорашній день - помічають різні форми дієслів'
      },
      {
        type: 'presentation',
        title: 'Види дієслів - доконаний та недоконаний',
        suggestedDuration: 15,
        description: 'Навчання: доконаний вид (що зробити?), недоконаний вид (що робити?), утворення'
      },
      {
        type: 'exercise',
        title: 'Практика: Визнач вид дієслова',
        suggestedDuration: 10,
        description: 'Розподіліть дієслова за видами'
      },
      {
        type: 'exercise',
        title: 'Практика: Утвори пари',
        suggestedDuration: 10,
        description: 'Утворіть видові пари дієслів (читати-прочитати)'
      },
      {
        type: 'discussion',
        title: 'Комунікація: Розкажи історію',
        suggestedDuration: 15,
        description: 'Учні розповідають історію, використовуючи обидва види дієслів'
      }
    ],
    tags: ['граматика', 'дієслова', 'види', '7-клас', 'GPPC']
  },

  // ==========================================
  // CEFR TEMPLATES (2) - Task-Based Learning
  // ==========================================
  {
    id: 'template-cefr-znakomstvo-a1',
    name: 'Комунікативна компетенція - Знайомство',
    description: 'Комунікативне завдання: представити себе новим людям (рівень A1)',
    methodologyTag: 'CEFR',
    language: 'Ukrainian',
    level: 'A1 Початковий',
    activityStructure: [
      {
        type: 'task',
        title: 'Вступ до завдання: Як ти знайомишся?',
        suggestedDuration: 8,
        description: 'Учні обговорюють: як вони знайомляться з новими людьми?'
      },
      {
        type: 'warm-up',
        title: 'Підготовка: Корисні фрази',
        suggestedDuration: 10,
        description: 'Вивчення фраз: Мене звати..., Мені ... років, Я живу в..., Я люблю...'
      },
      {
        type: 'exercise',
        title: 'Практика: Заповни пропуски',
        suggestedDuration: 10,
        description: 'Доповніть діалоги знайомства правильними фразами'
      },
      {
        type: 'task',
        title: 'Виконання завдання: Знайомство',
        suggestedDuration: 15,
        description: 'Рольова гра: познайомтеся з 3 новими людьми в класі'
      },
      {
        type: 'reflection',
        title: 'Рефлексія: Що було важко?',
        suggestedDuration: 7,
        description: 'Обговорення: які фрази були найважчими? Що треба ще попрактикувати?'
      }
    ],
    tags: ['комунікація', 'знайомство', 'A1', 'початковий', 'CEFR']
  },
  {
    id: 'template-cefr-presentation-b1',
    name: 'Усна презентація - Моє місто',
    description: 'Комунікативне завдання: підготувати презентацію про своє місто (рівень B1)',
    methodologyTag: 'CEFR',
    language: 'Ukrainian',
    level: 'B1 Середній',
    activityStructure: [
      {
        type: 'task',
        title: 'Вступ: Презентація міста туристам',
        suggestedDuration: 8,
        description: 'Завдання: уявіть, що ви гід - розкажіть туристам про своє місто'
      },
      {
        type: 'warm-up',
        title: 'Підготовка: Структура презентації',
        suggestedDuration: 12,
        description: 'Вивчення структури: вступ, історія, визначні місця, культура, висновок'
      },
      {
        type: 'exercise',
        title: 'Практика: Корисна лексика',
        suggestedDuration: 10,
        description: 'Вивчення та практика ключових слів для опису міста'
      },
      {
        type: 'task',
        title: 'Виконання: Підготуйте презентацію',
        suggestedDuration: 20,
        description: 'Учні готують 3-хвилинну презентацію про своє місто'
      },
      {
        type: 'task',
        title: 'Виконання: Представте своє місто',
        suggestedDuration: 20,
        description: 'Кожен учень презентує своє місто класу (3 хв + 2 хв запитання)'
      },
      {
        type: 'reflection',
        title: 'Рефлексія: Аналіз презентацій',
        suggestedDuration: 10,
        description: 'Учні аналізують сильні сторони та області для покращення'
      }
    ],
    tags: ['презентація', 'усне-мовлення', 'місто', 'B1', 'CEFR']
  },

  // ==========================================
  // PPP TEMPLATE (1) - Now available for Ukrainian!
  // ==========================================
  {
    id: 'template-ppp-prykmetnyk-6',
    name: 'Прикметник - Ступені порівняння',
    description: 'Граматичний урок вивчення ступенів порівняння прикметників (6 клас)',
    methodologyTag: 'PPP',
    language: 'Ukrainian',
    level: '6 клас',
    activityStructure: [
      {
        type: 'warm-up',
        title: 'Порівняємо предмети',
        suggestedDuration: 8,
        description: 'Учні порівнюють предмети в класі: який більший? який найбільший?'
      },
      {
        type: 'presentation',
        title: 'Ступені порівняння прикметників',
        suggestedDuration: 15,
        description: 'Навчання: вищий ступінь (-іший/-ший), найвищий ступінь (най-), аналітична форма (більш/найбільш)'
      },
      {
        type: 'exercise',
        title: 'Контрольована практика: Утвори форми',
        suggestedDuration: 10,
        description: 'Утворіть вищий та найвищий ступені прикметників'
      },
      {
        type: 'exercise',
        title: 'Контрольована практика: Доповни речення',
        suggestedDuration: 10,
        description: 'Доповніть речення правильними формами прикметників'
      },
      {
        type: 'discussion',
        title: 'Вільна практика: Обговорення',
        suggestedDuration: 12,
        description: 'Обговоріть: яке найкраще місто в Україні? Чому? Використовуйте ступені порівняння'
      },
      {
        type: 'task',
        title: 'Продукція: Опис міста',
        suggestedDuration: 10,
        description: 'Напишіть опис свого міста, використовуючи ступені порівняння прикметників'
      }
    ],
    tags: ['граматика', 'прикметник', 'порівняння', '6-клас', 'PPP']
  },

  // ==========================================
  // TTT TEMPLATE (1) - Now available for Ukrainian!
  // ==========================================
  {
    id: 'template-ttt-poetry-10',
    name: 'Аналіз поезії - Тарас Шевченко',
    description: 'Урок аналізу поезії через відкриття (10 клас)',
    methodologyTag: 'TTT',
    language: 'Ukrainian',
    level: '10 клас',
    activityStructure: [
      {
        type: 'exercise',
        title: 'Тест 1: Прочитай та проаналізуй',
        suggestedDuration: 15,
        description: 'Учні читають вірш та намагаються проаналізувати самостійно (що вони знають?)'
      },
      {
        type: 'warm-up',
        title: 'Обговорення вражень',
        suggestedDuration: 10,
        description: 'Учні діляться першими враженнями від вірша - що зрозуміли? Що відчули?'
      },
      {
        type: 'presentation',
        title: 'Інструменти поетичного аналізу',
        suggestedDuration: 15,
        description: 'Навчання: образи, метафори, ритм, рима, композиція, ідея'
      },
      {
        type: 'exercise',
        title: 'Практика: Знайди засоби',
        suggestedDuration: 12,
        description: 'Знайдіть у вірші метафори, епітети, порівняння'
      },
      {
        type: 'discussion',
        title: 'Вільна практика: Інтерпретація',
        suggestedDuration: 15,
        description: 'Групи обговорюють: яка головна ідея вірша? Як поет її передає?'
      },
      {
        type: 'exercise',
        title: 'Тест 2: Напиши аналіз',
        suggestedDuration: 18,
        description: 'Напишіть повний аналіз вірша, використовуючи вивчені інструменти (порівняйте з Тестом 1)'
      },
      {
        type: 'reflection',
        title: 'Рефлексія: Що змінилось?',
        suggestedDuration: 5,
        description: 'Порівняйте свій перший аналіз (Тест 1) з фінальним (Тест 2) - що покращилось?'
      }
    ],
    tags: ['література', 'поезія', 'аналіз', '10-клас', 'TTT', 'Шевченко']
  }
];

/**
 * Combined export - all templates
 */
export const allTemplates: LessonTemplate[] = [
  ...englishTemplates,
  ...ukrainianTemplates
];

/**
 * Get templates by language
 */
export function getTemplatesByLanguage(language: 'English' | 'Ukrainian'): LessonTemplate[] {
  return language === 'English' ? englishTemplates : ukrainianTemplates;
}

/**
 * Get templates by methodology
 */
export function getTemplatesByMethodology(methodology: 'PPP' | 'TTT' | 'GPPC' | 'CEFR'): LessonTemplate[] {
  return allTemplates.filter(t => t.methodologyTag === methodology);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): LessonTemplate | undefined {
  return allTemplates.find(t => t.id === id);
}
