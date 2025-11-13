import type { Lesson } from '../types';

// English language teaching samples
export const sampleLessonsEnglish: Lesson[] = [
  {
    id: 'sample-ppp-present-simple',
    title: 'Present Simple Tense - Daily Routines',
    level: 'A2 Elementary',
    targetLanguage: 'English',
    structure: 'PPP',
    duration: 60,
    objectives: [
      'Students will be able to use present simple for daily routines',
      'Students will understand third person -s/-es endings',
      'Students will practice asking and answering about daily activities'
    ],
    materials: [
      'Whiteboard and markers',
      'Daily routine flashcards',
      'Student handouts'
    ],
    leadIn: {
      title: 'My Morning Routine',
      description: 'Students discuss their morning routines to activate prior knowledge',
      content: 'Ask students: "What do you do every morning?" Write key activities on the board. Show pictures of daily activities and elicit vocabulary. Pair students to discuss their typical day.',
      duration: 10,
      mediaLinks: [],
      teacherNotes: 'Pre-teach any difficult vocabulary. Focus on eliciting rather than presenting.'
    },
    presentation: {
      title: 'Present Simple Form and Use',
      targetLanguage: 'I wake up at 7am. He wakes up at 6am. She goes to work by bus.',
      explanation: 'Present Simple is used for:\n- Habits and routines\n- General truths\n- Regular actions\n\nForm:\nI/You/We/They + verb\nHe/She/It + verb + s/es',
      examples: [
        'I drink coffee every morning.',
        'She drinks tea.',
        'We go to school by bus.',
        'He goes to work by car.',
        'They play football on weekends.',
        'My sister plays tennis.'
      ],
      duration: 15,
      mediaLinks: [],
      teacherNotes: 'Use timeline if needed. Emphasize the -s/-es ending for third person.'
    },
    controlledPractice: {
      type: 'controlled',
      exercises: [
        {
          type: 'gap-fill',
          id: 'ex-1',
          instruction: 'Complete the sentences with the correct form of the verb in brackets.',
          text: 'John ____ (wake) up at 7am every day. He ____ (have) breakfast and ____ (go) to work. His wife ____ (work) from home. She ____ (start) work at 9am. They ____ (eat) dinner together at 7pm. In the evening, they ____ (watch) TV or ____ (read) books.',
          answers: ['wakes', 'has', 'goes', 'works', 'starts', 'eat', 'watch', 'read']
        },
        {
          type: 'multiple-choice',
          id: 'ex-2',
          instruction: 'Choose the correct verb form.',
          question: 'My sister ___ to school every day.',
          options: ['go', 'goes', 'going', 'gos'],
          correctAnswer: 1
        }
      ]
    },
    freePractice: {
      type: 'free',
      exercises: [
        {
          type: 'information-gap',
          id: 'ex-3',
          instruction: 'Student A and B have different information about two people. Ask and answer questions to complete the table.',
          scenario: 'You have information about Sarah and Tom. Find out about their daily routines.',
          studentAInfo: 'Sarah: wakes up 6am, has cereal, works in office, finishes 5pm\nTom: ?, ?, ?, ?',
          studentBInfo: 'Sarah: ?, ?, ?, ?\nTom: wakes up 7:30am, has toast, works from home, finishes 6pm',
          prompts: [
            'What time does ... wake up?',
            'What does ... have for breakfast?',
            'Where does ... work?',
            'What time does ... finish work?'
          ]
        },
        {
          type: 'free-text',
          id: 'ex-4',
          instruction: 'Write 5-6 sentences about your daily routine. Use present simple tense.',
          prompt: 'Describe your typical weekday from morning to evening.',
          minWords: 50
        }
      ]
    },
    teacherNotes: 'Monitor during controlled practice for common errors with third person -s. In free practice, encourage students to ask follow-up questions. Common errors: forgetting -s, using -s with I/you/we/they.',
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: 'sample-ttt-phrasal-verbs',
    title: 'Phrasal Verbs - Relationships',
    level: 'B1 Intermediate',
    targetLanguage: 'English',
    structure: 'TTT',
    duration: 60,
    objectives: [
      'Students will be able to use common phrasal verbs about relationships',
      'Students will understand the difference between separable and inseparable phrasal verbs',
      'Students will practice using phrasal verbs in context'
    ],
    materials: [
      'Phrasal verb cards',
      'Example sentences handout',
      'Relationship scenario cards'
    ],
    leadIn: {
      title: 'Relationship Stories',
      description: 'Activate students knowledge about relationships and introduce topic',
      content: 'Tell a brief story about two friends who "get along well" and "fall out" sometimes. Ask students if they can guess the meaning. Discuss: "Do you have friends you get along with? Have you ever fallen out with a friend?"',
      duration: 8,
      mediaLinks: [],
      teacherNotes: 'Elicit any phrasal verbs students already know about relationships.'
    },
    presentation: {
      title: 'Common Phrasal Verbs for Relationships',
      targetLanguage: 'get along with, fall out, make up, break up, ask out, go out with, split up, get back together',
      explanation: 'Phrasal verbs are verbs + prepositions/particles that create new meanings.\n\nSeparable: You can put the object between the verb and particle\n- ask someone out / ask out someone\n- make it up / make up the argument\n\nInseparable: The verb and particle stay together\n- get along with someone (not: get someone along with)',
      examples: [
        'They get along really well - they never argue.',
        'We fell out over money, but we made up quickly.',
        'He asked her out for dinner.',
        'They have been going out for two years.',
        'Unfortunately, they broke up last month.',
        'After they split up, she moved to another city.',
        'I hope they get back together soon.'
      ],
      duration: 12,
      mediaLinks: [],
      teacherNotes: 'Use gestures and context to make meanings clear. Check understanding before moving on.'
    },
    controlledPractice: {
      type: 'controlled',
      exercises: [
        {
          type: 'matching',
          id: 'ex-5',
          instruction: 'Match the phrasal verbs with their definitions.',
          pairs: [
            { left: 'get along with', right: 'have a good relationship' },
            { left: 'fall out', right: 'have an argument and stop being friends' },
            { left: 'make up', right: 'become friends again after an argument' },
            { left: 'break up', right: 'end a romantic relationship' },
            { left: 'ask out', right: 'invite someone on a date' },
            { left: 'go out with', right: 'have a romantic relationship' }
          ]
        },
        {
          type: 'gap-fill',
          id: 'ex-6',
          instruction: 'Complete the sentences with the correct phrasal verb.',
          text: 'Sarah and Tom have been ____ for six months. They ____ really well and never argue. Last week, Tom ____ Sarah to a fancy restaurant. However, his best friend Mark ____ with his girlfriend and was very sad. Tom wanted to help Mark ____ with her, but she didn\'t want to talk. Mark hopes they will ____ soon.',
          answers: ['going out', 'get along', 'asked out', 'fell out', 'make up', 'get back together']
        }
      ]
    },
    freePractice: {
      type: 'free',
      exercises: [
        {
          type: 'role-play',
          id: 'ex-7',
          instruction: 'Role-play one of the following scenarios using phrasal verbs about relationships.',
          scenario: 'Create a conversation about relationship situations.',
          roles: [
            {
              name: 'Two friends discussing relationship',
              description: 'Friend A tells Friend B about a relationship problem. Friend B gives advice. Use phrasal verbs: fall out, make up, break up, get along with.'
            },
            {
              name: 'Matchmakers',
              description: 'Person A wants to help Person B meet someone new. Discuss using: ask out, go out with, get along with.'
            }
          ],
          duration: 10
        },
        {
          type: 'free-text',
          id: 'ex-8',
          instruction: 'Write about a relationship story (yours or fictional). Use at least 5 different phrasal verbs.',
          prompt: 'Tell a story about two people meeting, becoming friends or partners, and what happened in their relationship.',
          minWords: 100
        }
      ]
    },
    teacherNotes: 'In TTT approach, the initial test helps identify what students already know. Adjust presentation based on their performance. In final test, look for natural usage of phrasal verbs in context, not just memorization.',
    createdAt: new Date('2024-01-20').toISOString()
  },
  {
    id: 'sample-communicative-travel',
    title: 'Travel Plans and Experiences',
    level: 'B1 Intermediate',
    targetLanguage: 'English',
    structure: 'PPP',
    duration: 60,
    objectives: [
      'Students will be able to discuss travel plans and experiences',
      'Students will practice information gap activities',
      'Students will use present perfect and past simple appropriately'
    ],
    materials: [
      'Travel destination cards',
      'Information gap handouts',
      'Picture prompts of travel destinations'
    ],
    leadIn: {
      title: 'Dream Destinations',
      description: 'Students share travel experiences and dreams',
      content: 'Show pictures of famous travel destinations. Ask: "Where have you been?" and "Where would you like to go?" Students share in small groups their travel experiences and dream destinations.',
      duration: 10,
      mediaLinks: [],
      teacherNotes: 'Create a positive, enthusiastic atmosphere about travel.'
    },
    presentation: {
      title: 'Talking About Travel',
      targetLanguage: 'Have you ever been to...? I\'ve visited... I went there in... The best place I\'ve ever seen is... I\'d love to go to...',
      explanation: 'Use Present Perfect for experiences without specific time:\n- Have you ever been to Paris?\n- I\'ve visited Italy three times.\n\nUse Past Simple for specific past times:\n- I went to Rome in 2019.\n- We stayed there for two weeks.\n\nUse "would like/love to" for future desires:\n- I\'d love to visit Japan.\n- I\'d like to see the Northern Lights.',
      examples: [
        'I\'ve been to Spain twice.',
        'Have you ever tried Thai food?',
        'We went to Barcelona last summer.',
        'I stayed in a beautiful hotel near the beach.',
        'I\'ve never been to Asia.',
        'I\'d love to visit New Zealand one day.'
      ],
      duration: 12,
      mediaLinks: [],
      teacherNotes: 'Elicit examples from students own experiences. Drill pronunciation of contractions.'
    },
    controlledPractice: {
      type: 'controlled',
      exercises: [
        {
          type: 'sentence-scramble',
          id: 'ex-9',
          instruction: 'Put the words in the correct order to make questions and answers about travel.',
          words: ['ever', 'you', 'have', 'been', 'to', 'London', '?'],
          correctSentence: 'Have you ever been to London?'
        },
        {
          type: 'information-gap',
          id: 'ex-10',
          instruction: 'Student A and B have different information about travel destinations. Ask and answer to complete your table.',
          scenario: 'You are travel agents sharing information about destinations. Find out all the missing information.',
          studentAInfo: 'Paris: Best time - Spring, Language - French, Currency - ?, Famous for - ?\nTokyo: Best time - ?, Language - ?, Currency - Yen, Famous for - Technology and culture',
          studentBInfo: 'Paris: Best time - ?, Language - ?, Currency - Euro, Famous for - Eiffel Tower and museums\nTokyo: Best time - Autumn, Language - Japanese, Currency - ?, Famous for - ?',
          prompts: [
            'What\'s the best time to visit...?',
            'What language do they speak in...?',
            'What currency do they use?',
            'What is ... famous for?'
          ]
        }
      ]
    },
    freePractice: {
      type: 'free',
      exercises: [
        {
          type: 'role-play',
          id: 'ex-11',
          instruction: 'Work in pairs. Role-play these travel situations.',
          scenario: 'Travel conversation scenarios',
          roles: [
            {
              name: 'Travel buddies planning trip',
              description: 'You are planning a trip together. Discuss where you want to go, what you want to see, where to stay. Student A prefers beaches, Student B prefers cities.'
            },
            {
              name: 'Sharing travel stories',
              description: 'You just came back from different trips. Tell each other about your experiences - where you went, what you did, what you liked/didn\'t like.'
            }
          ],
          duration: 10
        },
        {
          type: 'free-text',
          id: 'ex-12',
          instruction: 'Write about your most memorable travel experience OR your dream destination.',
          prompt: 'Describe the place, what you did/would do there, and why it is/would be special.',
          minWords: 80
        }
      ]
    },
    teacherNotes: 'Focus on fluency over accuracy in free practice. Monitor for communication breakdowns and help with vocabulary. Make note of errors for delayed correction after activities.',
    createdAt: new Date('2024-01-25').toISOString()
  },
  {
    id: 'sample-lexical-weather',
    title: 'Weather Vocabulary - Lexical Sets',
    level: 'A2 Elementary',
    targetLanguage: 'English',
    structure: 'PPP',
    duration: 45,
    objectives: [
      'Students will learn weather vocabulary in lexical sets',
      'Students will understand collocations with weather words',
      'Students will be able to describe weather conditions'
    ],
    materials: [
      'Weather pictures and flashcards',
      'Collocation cards',
      'Weather forecast video clips'
    ],
    leadIn: {
      title: 'Today\'s Weather',
      description: 'Discuss current weather and favorite weather',
      content: 'Look outside or show current weather. Ask: "What\'s the weather like today?" and "What\'s your favorite type of weather?" Students share in pairs.',
      duration: 5,
      mediaLinks: [],
      teacherNotes: 'Use gestures and facial expressions to convey feelings about weather.'
    },
    presentation: {
      title: 'Weather Vocabulary and Collocations',
      targetLanguage: 'sunny, cloudy, rainy, snowy, windy, foggy, stormy, hot, cold, warm, cool, mild, freezing, boiling',
      explanation: 'Weather vocabulary comes in lexical sets:\n\nConditions: sunny, cloudy, rainy, snowy, windy, foggy, stormy\nTemperature: hot, warm, mild, cool, cold, freezing, boiling\n\nCommon collocations:\n- heavy rain (not strong rain)\n- strong wind (not heavy wind)\n- thick fog (not strong fog)\n- bright sunshine (not strong sunshine)',
      examples: [
        'It\'s sunny today.',
        'It\'s raining heavily.',
        'There\'s a strong wind.',
        'It\'s freezing cold.',
        'It\'s boiling hot.',
        'There\'s thick fog.',
        'It was a stormy night.'
      ],
      duration: 10,
      mediaLinks: [],
      teacherNotes: 'Use visual aids to present weather words. Highlight collocations on board.'
    },
    controlledPractice: {
      type: 'controlled',
      exercises: [
        {
          type: 'lexical-set',
          id: 'ex-13',
          instruction: 'Group the weather words into the correct categories. Drag each word to its matching category.',
          topic: 'Weather Vocabulary',
          chunks: [
            'sunny (condition)',
            'freezing (temperature)',
            'cloudy (condition)',
            'boiling (temperature)',
            'snowy (condition)',
            'warm (temperature)',
            'rainy (condition)',
            'cool (temperature)',
            'windy (condition)',
            'hot (temperature)',
            'foggy (condition)',
            'cold (temperature)',
            'stormy (condition)',
            'mild (temperature)'
          ],
          context: 'Weather can be described by conditions (sunny, rainy) and temperature (hot, cold).'
        },
        {
          type: 'collocation',
          id: 'ex-14',
          instruction: 'Match the adjectives with the weather nouns to make common collocations.',
          collocations: [
            { word: 'heavy', partners: ['rain', 'snow'] },
            { word: 'strong', partners: ['wind', 'storm'] },
            { word: 'thick', partners: ['fog', 'cloud'] },
            { word: 'bright', partners: ['sunshine', 'sun'] }
          ],
          exerciseFormat: 'match'
        }
      ]
    },
    freePractice: {
      type: 'free',
      exercises: [
        {
          type: 'role-play',
          id: 'ex-15',
          instruction: 'Work in pairs. Role-play weather conversations.',
          scenario: 'Weather-related situations',
          roles: [
            {
              name: 'Planning outdoor activity',
              description: 'You want to plan a picnic/hike/beach day. Check the weather forecast together and decide if it\'s good or bad for your plans.'
            },
            {
              name: 'Weather in different seasons',
              description: 'Discuss what the weather is like in your country in different seasons. What do you like and dislike about each season?'
            }
          ],
          duration: 8
        },
        {
          type: 'free-text',
          id: 'ex-16',
          instruction: 'Describe the weather in your favorite season. Use at least 6 weather words and collocations.',
          prompt: 'Write about what the weather is like and what you like to do in that season.',
          minWords: 60
        }
      ]
    },
    teacherNotes: 'The lexical approach focuses on learning words in chunks and collocations rather than isolated words. Encourage students to learn weather expressions as phrases.',
    createdAt: new Date('2024-02-01').toISOString()
  }
];

// Import Ukrainian samples
import { sampleLessonsUkrainian } from './sampleLessonsUkrainian';

// Combined export - all samples
export const sampleLessons = [...sampleLessonsEnglish, ...sampleLessonsUkrainian];

// Helper to get samples by target language
export const getSamplesByLanguage = (targetLang: 'English' | 'Ukrainian' | 'Українська мова') => {
  if (targetLang === 'English') {
    return sampleLessonsEnglish;
  } else {
    return sampleLessonsUkrainian;
  }
};
