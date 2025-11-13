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
  },
  {
    id: 'sample-ppp-restaurant',
    title: 'Ordering Food in a Restaurant',
    level: 'A2+ Pre-Intermediate',
    targetLanguage: 'English',
    structure: 'PPP',
    duration: 60,
    objectives: [
      'Students will be able to order food and drinks politely in a restaurant',
      'Students will understand and use key restaurant vocabulary',
      'Students will practice making requests and asking questions in a restaurant context'
    ],
    materials: [
      'Restaurant menus (printed or projected)',
      'Role-play cards',
      'Audio of restaurant conversations',
      'Whiteboard for language chunks'
    ],
    leadIn: {
      title: 'Favorite Restaurants',
      description: 'Activate students\' knowledge and interest in dining out',
      content: 'Show pictures of different restaurants (fast food, cafe, fine dining). Ask: "Where do you like to eat?" "What\'s your favorite restaurant?" "What do you usually order?" Students discuss in pairs their favorite places to eat and what they like to order. Whole class shares interesting answers.',
      duration: 10,
      mediaLinks: [],
      teacherNotes: 'This activates prior knowledge and gets students thinking about the context. Note any vocabulary they already use.'
    },
    presentation: {
      title: 'Restaurant Language - Ordering and Requesting',
      targetLanguage: 'Could I have...? I\'d like... Can I get...? What would you recommend? Is there...? That sounds good. Can we have the bill, please?',
      explanation: 'When ordering in a restaurant, we use polite language:\n\nOrdering:\n- "I\'d like the chicken, please." (formal)\n- "Can I have a salad?" (neutral)\n- "I\'ll have the soup." (informal)\n\nAsking questions:\n- "What would you recommend?"\n- "Is there any vegetarian option?"\n- "Does this come with fries?"\n\nRequesting:\n- "Could I have some water?"\n- "Can we have the menu, please?"\n- "May I have the bill?"',
      examples: [
        'Waiter: Are you ready to order?',
        'Customer: Yes, I\'d like the grilled salmon, please.',
        'Waiter: Would you like anything to drink?',
        'Customer: Could I have a glass of water?',
        'Customer: What would you recommend for dessert?',
        'Waiter: The chocolate cake is very popular.',
        'Customer: That sounds good. I\'ll have that.',
        'Customer: Can we have the bill, please?'
      ],
      duration: 15,
      mediaLinks: [],
      teacherNotes: 'Drill the key phrases. Model the intonation for polite requests. Use gestures to show waiter/customer roles.'
    },
    controlledPractice: {
      type: 'controlled',
      exercises: [
        {
          type: 'gap-fill',
          id: 'ex-rest-1',
          instruction: 'Complete the restaurant conversation with the correct phrases.',
          text: 'Waiter: Good evening. Are you ready to order?\nCustomer: Yes, ____ the steak, please.\nWaiter: How would you like it cooked?\nCustomer: Medium, please. And ____ have a side salad?\nWaiter: Of course. Anything to drink?\nCustomer: ____ recommend?\nWaiter: The house wine is excellent.\nCustomer: ____ . I\'ll have a glass of that.\nWaiter: Certainly. Enjoy your meal!',
          answers: ['I\'d like', 'could I', 'What would you', 'That sounds good']
        },
        {
          type: 'matching',
          id: 'ex-rest-2',
          instruction: 'Match the customer questions with appropriate waiter responses.',
          pairs: [
            { left: 'What would you recommend?', right: 'The fish is very fresh today.' },
            { left: 'Is there a vegetarian option?', right: 'Yes, we have a lovely vegetable curry.' },
            { left: 'Can we have the bill?', right: 'Of course, I\'ll bring it right away.' },
            { left: 'Does this come with fries?', right: 'Yes, or you can have a salad instead.' }
          ]
        }
      ]
    },
    freePractice: {
      type: 'free',
      exercises: [
        {
          type: 'role-play',
          id: 'ex-rest-3',
          instruction: 'Work in pairs. Take turns being the waiter and customer. Order a complete meal.',
          scenario: 'You are in a restaurant. The waiter takes your order for starter, main course, drinks, and dessert.',
          roles: [
            {
              name: 'Waiter',
              description: 'Greet customers, take their order, make recommendations, answer questions about the menu. Be polite and helpful.'
            },
            {
              name: 'Customer',
              description: 'Look at the menu, ask questions, order food and drinks using polite language. Ask for recommendations and the bill at the end.'
            }
          ],
          targetLanguage: 'Use: I\'d like..., Could I have..., What would you recommend?, Can we have the bill?',
          duration: 10
        },
        {
          type: 'information-gap',
          id: 'ex-rest-4',
          instruction: 'Student A is the customer, Student B is the waiter. You have different information.',
          scenario: 'The customer wants to order but has questions. The waiter has information about the menu.',
          studentAInfo: 'Customer: You are vegetarian and allergic to nuts. Ask about vegetarian dishes and check ingredients. Order a meal.',
          studentBInfo: 'Waiter: Today\'s specials are: 1) Grilled salmon with rice, 2) Vegetable lasagna (contains nuts), 3) Mushroom risotto (vegetarian, no nuts). Answer questions and take the order.',
          prompts: [
            'Do you have any vegetarian dishes?',
            'Does it contain nuts?',
            'What are the specials today?',
            'I\'d like to order...'
          ]
        }
      ]
    },
    teacherNotes: 'Monitor pronunciation of "I\'d like" (contraction). Common errors: using "I want" (too direct). Encourage students to switch roles in role-play. Extension: students create their own menus.',
    createdAt: new Date('2024-03-10').toISOString()
  },
  {
    id: 'sample-ppp-first-conditional',
    title: 'First Conditional - Future Possibilities',
    level: 'B1 Intermediate',
    targetLanguage: 'English',
    structure: 'PPP',
    duration: 60,
    objectives: [
      'Students will be able to talk about future possibilities using first conditional',
      'Students will understand the difference between certain and possible future',
      'Students will practice making predictions and discussing consequences'
    ],
    materials: [
      'Situation cards for discussion',
      'Timeline visual aid',
      'Consequence chain activity cards'
    ],
    leadIn: {
      title: 'What Will Happen?',
      description: 'Introduce the idea of future possibilities and consequences',
      content: 'Show a situation: "It\'s raining heavily outside." Ask: "What will happen if you go outside without an umbrella?" Elicit: "I\'ll get wet." Write on board. Show more situations and elicit predictions. Students discuss in pairs: "What will happen if you don\'t study for the test?"',
      duration: 8,
      mediaLinks: [],
      teacherNotes: 'Accept any answers at this stage, including those using will/won\'t and possible. This is diagnostic.'
    },
    presentation: {
      title: 'First Conditional - Form and Use',
      targetLanguage: 'If it rains, I\'ll stay home. If you study hard, you\'ll pass the exam. I\'ll call you if I need help.',
      explanation: 'First Conditional is used for:\n- Real future possibilities (things that might happen)\n- Consequences of actions\n- Predictions with conditions\n\nForm:\nIf + present simple, will + base verb\nOR\nwill + base verb + if + present simple\n\nExamples:\nIf it rains, we\'ll stay inside. (condition first)\nWe\'ll stay inside if it rains. (result first)\n\nNOTE: We can use other modals: might, may, can, should\n"If you finish early, you can leave."',
      examples: [
        'If I have time, I\'ll help you.',
        'She\'ll be happy if you call her.',
        'If they don\'t hurry, they\'ll miss the bus.',
        'We won\'t go to the beach if it\'s cold.',
        'If you heat water to 100°C, it will boil.',
        'I\'ll email you if I find the information.',
        'If he asks me, I might say yes.'
      ],
      duration: 15,
      mediaLinks: [],
      teacherNotes: 'Use timeline to show this is about future, not hypothetical. Emphasize comma placement. Drill pronunciation of "I\'ll" and contractions.'
    },
    controlledPractice: {
      type: 'controlled',
      exercises: [
        {
          type: 'gap-fill',
          id: 'ex-cond-1',
          instruction: 'Complete the sentences with the correct form of the verb in brackets.',
          text: 'If it ____ (rain) tomorrow, we ____ (not/go) to the park. I ____ (call) you if I ____ (need) help. She ____ (be) disappointed if you ____ (not/come) to the party. If they ____ (arrive) late, they ____ (miss) the beginning of the film. We ____ (have) a picnic if the weather ____ (be) nice.',
          answers: ['rains', 'won\'t go', '\'ll call', 'need', '\'ll be', 'don\'t come', 'arrive', '\'ll miss', '\'ll have', 'is']
        },
        {
          type: 'sentence-scramble',
          id: 'ex-cond-2',
          instruction: 'Put the words in the correct order to make first conditional sentences.',
          words: ['if', 'study', 'you', 'hard', 'will', 'you', 'pass'],
          correctSentence: 'If you study hard, you will pass.'
        },
        {
          type: 'multiple-choice',
          id: 'ex-cond-3',
          instruction: 'Choose the correct form.',
          question: 'If he ____ on time, we\'ll catch the train.',
          options: ['arrive', 'arrives', 'will arrive', 'arriving'],
          correctAnswer: 1
        }
      ]
    },
    freePractice: {
      type: 'free',
      exercises: [
        {
          type: 'free-text',
          id: 'ex-cond-4',
          instruction: 'Write about your plans for the weekend. Use first conditional to talk about possibilities.',
          prompt: 'What will you do if the weather is nice? What will you do if it rains? What will happen if you have free time? Write 6-8 sentences.',
          minWords: 80
        },
        {
          type: 'information-gap',
          id: 'ex-cond-5',
          instruction: 'Student A and B have different "consequence chains". Ask and answer to complete your chain.',
          scenario: 'Cause and effect chain of events. Find out what happens next.',
          studentAInfo: 'If I wake up late, I\'ll miss the bus. If I miss the bus, ______? If ______, I\'ll be stressed. If I\'m stressed, ______?',
          studentBInfo: 'If ______, you\'ll miss the bus. If you miss the bus, you\'ll be late for work. If you\'re late for work, ______? If ______, you\'ll need to relax in the evening.',
          prompts: [
            'What will happen if...?',
            'If that happens, what will...?',
            'What\'s the next consequence?'
          ]
        }
      ]
    },
    teacherNotes: 'Common errors: "if it will rain" (wrong - use present simple in if-clause), missing comma. Monitor for overgeneralization. Encourage students to think of real personal examples.',
    createdAt: new Date('2024-03-15').toISOString()
  },
  {
    id: 'sample-ttt-past-storytelling',
    title: 'Past Simple - Telling Stories',
    level: 'A2 Pre-Intermediate',
    targetLanguage: 'English',
    structure: 'TTT',
    duration: 60,
    objectives: [
      'Students will be able to narrate past events in chronological order',
      'Students will use past simple regular and irregular verbs accurately',
      'Students will develop storytelling skills using sequencing words'
    ],
    materials: [
      'Story picture cards',
      'Sequencing word flashcards (first, then, next, after that, finally)',
      'Famous fairy tale summaries for reference'
    ],
    leadIn: {
      title: 'Famous Stories',
      description: 'Test what students already know about telling stories in the past',
      content: 'Show pictures from well-known fairy tales (Cinderella, Little Red Riding Hood). In pairs, students try to tell the story in English. Monitor and note which past tense forms they use correctly and what errors occur. Whole class: one pair tells their story briefly.',
      duration: 12,
      mediaLinks: [],
      teacherNotes: 'This is diagnostic - don\'t correct yet. Note common errors with irregular verbs and sequencing. Listen for use of time markers.'
    },
    presentation: {
      title: 'Past Simple for Storytelling',
      targetLanguage: 'Regular verbs: walked, arrived, opened. Irregular verbs: went, saw, came, took, said. Sequencing: First... Then... Next... After that... Finally...',
      explanation: 'When telling stories, we use Past Simple because the events are finished.\n\nRegular verbs: add -ed\nwalk → walked, arrive → arrived, open → opened\n\nIrregular verbs: learn the special forms\ngo → went, see → saw, come → came, take → took, say → said\n\nSequencing words help organize the story:\nFirst, she woke up.\nThen, she had breakfast.\nNext, she went to school.\nAfter that, she met her friend.\nFinally, she came home.',
      examples: [
        'First, Little Red Riding Hood walked through the forest.',
        'Then, she saw the wolf.',
        'Next, she went to her grandmother\'s house.',
        'After that, the wolf ate the grandmother.',
        'Finally, the hunter saved them.',
        'Yesterday, I woke up at 7am, had breakfast, and went to work.',
        'Last week, we visited Paris. We saw the Eiffel Tower and ate French food.'
      ],
      duration: 15,
      mediaLinks: [],
      teacherNotes: 'Focus on the most common irregular verbs for storytelling. Drill pronunciation of -ed endings (/t/, /d/, /id/). Use timeline to show past.'
    },
    controlledPractice: {
      type: 'controlled',
      exercises: [
        {
          type: 'gap-fill',
          id: 'ex-past-1',
          instruction: 'Complete the story with the past simple form of the verbs in brackets.',
          text: 'Last Saturday, I ____ (wake) up early. First, I ____ (have) breakfast. Then, I ____ (go) to the park. I ____ (see) my friend there. We ____ (play) football for two hours. Next, we ____ (eat) lunch at a cafe. After that, we ____ (watch) a movie. Finally, I ____ (come) home at 6pm. It ____ (be) a great day!',
          answers: ['woke', 'had', 'went', 'saw', 'played', 'ate', 'watched', 'came', 'was']
        },
        {
          type: 'sentence-scramble',
          id: 'ex-past-2',
          instruction: 'Put the words in order to make a correct sentence.',
          words: ['yesterday', 'to', 'went', 'the', 'she', 'cinema'],
          correctSentence: 'Yesterday she went to the cinema.'
        },
        {
          type: 'sorting',
          id: 'ex-past-3',
          instruction: 'Sort these verbs into regular and irregular past forms.',
          items: ['walked', 'played', 'watched', 'opened', 'arrived', 'went', 'saw', 'came', 'took', 'ate', 'said', 'had']
        }
      ]
    },
    freePractice: {
      type: 'free',
      exercises: [
        {
          type: 'free-text',
          id: 'ex-past-4',
          instruction: 'Write a story about an interesting or funny day you remember. Use past simple and sequencing words.',
          prompt: 'Tell the story from beginning to end. Use: First, Then, Next, After that, Finally. Include at least 5 irregular verbs.',
          minWords: 100
        },
        {
          type: 'role-play',
          id: 'ex-past-5',
          instruction: 'Student A tells Student B about their last vacation. Student B asks questions.',
          scenario: 'You recently came back from a trip. Tell your friend all about it.',
          roles: [
            {
              name: 'Traveler',
              description: 'Tell your friend about your vacation. Where did you go? What did you do? What did you see? Use sequencing words to organize your story.'
            },
            {
              name: 'Friend',
              description: 'Listen to your friend\'s story and ask questions: Where did you stay? What did you eat? Did you buy anything? Was it expensive?'
            }
          ],
          targetLanguage: 'Past simple verbs, sequencing words, questions: Where did...? What did...? Did you...?',
          duration: 8
        }
      ]
    },
    teacherNotes: 'This TTT structure allows you to see what they know, teach what they need, then test again. Common errors: "I go yesterday" (wrong tense), "I goed" (irregular verb). Encourage storytelling fluency over perfect accuracy in free practice.',
    createdAt: new Date('2024-03-20').toISOString()
  },
  {
    id: 'sample-ttt-directions',
    title: 'Giving Directions - Finding Your Way',
    level: 'A2 Elementary',
    targetLanguage: 'English',
    structure: 'TTT',
    duration: 45,
    objectives: [
      'Students will be able to give and follow simple directions',
      'Students will use prepositions of movement and location',
      'Students will practice asking for directions politely'
    ],
    materials: [
      'City map (printed or projected)',
      'Direction cards',
      'Compass rose visual',
      'Preposition flashcards'
    ],
    leadIn: {
      title: 'How Do I Get There?',
      description: 'Test students\' existing knowledge of giving directions',
      content: 'Show a simple map of the local area or school. Point to two locations. Ask students: "How do I get from here to here?" In pairs, students try to give directions using any language they know. Monitor what they can already say. Note vocabulary and structures they use.',
      duration: 8,
      mediaLinks: [],
      teacherNotes: 'Diagnostic stage - see what direction language they know. Accept any attempts. Note if they know: go straight, turn left/right, next to, etc.'
    },
    presentation: {
      title: 'Giving Clear Directions',
      targetLanguage: 'Go straight. Turn left/right. It\'s on the left/right. Next to, opposite, between, at the corner, at the traffic lights.',
      explanation: 'To give directions, we use:\n\nCommands:\n- Go straight (ahead)\n- Turn left / Turn right\n- Walk down this street\n- Cross the road\n- Take the first/second left/right\n\nPrepositions of location:\n- It\'s on your left/right\n- It\'s next to the bank\n- It\'s opposite the post office\n- It\'s between the cafe and the shop\n- It\'s at the corner\n\nAsking for directions:\n- Excuse me, where is...?\n- How do I get to...?\n- Is there a ... near here?',
      examples: [
        'Go straight for two blocks.',
        'Turn left at the traffic lights.',
        'The bank is on your right.',
        'It\'s next to the supermarket.',
        'Walk down this street and turn right at the corner.',
        'Take the second left. The post office is opposite the park.',
        'Excuse me, how do I get to the train station?'
      ],
      duration: 12,
      mediaLinks: [],
      teacherNotes: 'Use gestures for left/right. Practice on actual classroom map first. Drill "excuse me" for politeness.'
    },
    controlledPractice: {
      type: 'controlled',
      exercises: [
        {
          type: 'matching',
          id: 'ex-dir-1',
          instruction: 'Match the direction instruction with the correct meaning.',
          pairs: [
            { left: 'Go straight ahead', right: 'Continue forward, don\'t turn' },
            { left: 'Turn left', right: 'Change direction to the left' },
            { left: 'It\'s on your right', right: 'The location is on the right side' },
            { left: 'Next to', right: 'Beside, very close to' },
            { left: 'Opposite', right: 'Across from, on the other side' }
          ]
        },
        {
          type: 'gap-fill',
          id: 'ex-dir-2',
          instruction: 'Complete the directions with the correct words.',
          text: 'Excuse me, how do I get to the library?\nYes, ____ straight down this street. ____ left at the traffic lights. The library is ____ your right, ____ to the cafe. You can\'t miss it!',
          answers: ['go', 'Turn', 'on', 'next']
        }
      ]
    },
    freePractice: {
      type: 'free',
      exercises: [
        {
          type: 'information-gap',
          id: 'ex-dir-3',
          instruction: 'Student A and B have different maps with different locations marked. Ask for and give directions.',
          scenario: 'You are at the train station. You need to find various places. Ask your partner for directions.',
          studentAInfo: 'Your map shows: bank, post office, YOUR LOCATION (station). Ask where: 1) supermarket, 2) hospital, 3) cinema.',
          studentBInfo: 'Your map shows: supermarket, hospital, cinema, YOUR LOCATION (station). Ask where: 1) bank, 2) post office, 3) restaurant.',
          prompts: [
            'Excuse me, where is the...?',
            'How do I get to the...?',
            'Is there a ... near here?'
          ]
        },
        {
          type: 'role-play',
          id: 'ex-dir-4',
          instruction: 'Student A is a tourist, Student B is a local. Practice asking for and giving directions to famous places.',
          scenario: 'You are in the city center. Ask for directions to tourist attractions.',
          roles: [
            {
              name: 'Tourist',
              description: 'You are lost and looking for: the museum, a good restaurant, the nearest bus stop. Ask politely for directions.'
            },
            {
              name: 'Local person',
              description: 'Help the tourist find these places. Give clear directions using: go straight, turn left/right, it\'s next to..., opposite...'
            }
          ],
          targetLanguage: 'Direction vocabulary, polite questions, prepositions of location',
          duration: 7
        }
      ]
    },
    teacherNotes: 'TTT structure works well here - test their knowledge with the map task, teach missing vocabulary, then test again with role-play. Common errors: confusing left/right, forgetting "excuse me". Consider using real maps of your city for extra engagement.',
    createdAt: new Date('2024-03-25').toISOString()
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
