// Real Wordwall activity data from matsiuk's Ukrainian lessons
// Source: https://wordwall.net/en/teacher/12392216/matsiuk

export interface FlashCardItem {
  front: string;
  back: string;
}

export interface GapFillItem {
  sentence: string;
  answer: string;
}

export interface GroupSortItem {
  text: string;
  group: number;
}

export interface PossessivePronounsItem {
  sentence: string;
}

// Activity 1: Flash Cards - Feelings (10 pairs)
// Source: https://wordwall.net/resource/79196130/feelings
export const feelingsFlashCards: FlashCardItem[] = [
  { front: 'Йому сумно та погано', back: 'He is sad.' },
  { front: 'Їй на все байдуже', back: "She doesn't care." },
  { front: 'Йому цікаво, чому українська така складна', back: 'He is curious why Ukrainian is so complex.' },
  { front: 'Їй весело', back: 'She is having fun.' },
  { front: 'Йому страшно', back: 'He is scared.' },
  { front: 'Йому класно, він слухає музику', back: "He's having a great time, he's listening to music." },
  { front: 'Йому нудно', back: 'He is bored.' },
  { front: 'Йому соромно', back: 'He is ashamed.' },
  { front: 'Йому важко', back: "It's hard for him." },
  { front: 'їй сумно', back: 'She is sad.' }
];

// Activity 2: Gap Fill - Verb Prefixes (12 sentences)
// Source: https://wordwall.net/resource/55586802/ukrainian-verbs-conjugation-groups
export const verbPrefixesGapFill: GapFillItem[] = [
  { sentence: 'Кожного дня я ___ з дому о пів на восьму.', answer: 'виходжу' },
  { sentence: 'Сьогодні я ___ з дому на пів години раніше ніж зазвичай.', answer: 'вийшла' },
  { sentence: '___ мене, бо я терпіти не можу запах сигарет.', answer: 'Відвідай' },
  { sentence: '___ мене у гості, коли у тебе буде час.', answer: 'Приходь' },
  { sentence: 'Багато українців ___ українську, після початку війни.', answer: 'говорять' },
  { sentence: 'Я не можу ___ парковки, бо мене заблокував сусід.', answer: 'припаркувати' },
  { sentence: 'Я думаю над тим, що ___ в інше місто.', answer: 'переїду' },
  { sentence: 'Кожного року я ___ на море.', answer: 'їжджу' },
  { sentence: 'Цього року я не зможу ___.', answer: 'поїхати' },
  { sentence: 'Кожного я ___ в супермаркет.', answer: 'ходжу' },
  { sentence: 'Цього тижня я не ___.', answer: 'пішла' },
  { sentence: 'Я втомилася ___, хочу жити тут завжди.', answer: 'мандрувати' }
];

// Activity 3: Gap Fill - Possessive Pronouns (10 sentences)
// Source: https://wordwall.net/resource/84025102/possessive-pronouns
export const possessivePronounsGapFill: PossessivePronounsItem[] = [
  { sentence: 'Це мій брат та ___ кіт' },
  { sentence: 'Це моя подруга та ___ сестра' },
  { sentence: 'Це наша подруга та ___ брат' },
  { sentence: 'Це мої батьки та ___ пес' },
  { sentence: '___ це кішка?' },
  { sentence: '___ це ключі?' },
  { sentence: 'Це ___ парасольки' },
  { sentence: 'Це ___ улюблений фільм' },
  { sentence: 'Який ___ улюблений фільм?' },
  { sentence: 'Яка ___ улюблена їжа?' }
];

// Activity 4: Group Sort - Adverbs of Time (15 items, 2 groups)
// Source: https://wordwall.net/resource/58070231/ukrainian/adverbs-of-time-used-with-the-verbs-of-motion
export const adverbsGroupSort: { groups: string[]; items: GroupSortItem[] } = {
  groups: ['йті-їхати (directional)', 'ходити-їздити (habitual)'],
  items: [
    // Group 0: йті-їхати (directional/perfective)
    { text: 'зараз', group: 0 },
    { text: 'тепер', group: 0 },
    { text: 'сьогодні', group: 0 },
    { text: 'скоро', group: 0 },
    { text: 'незабаром', group: 0 },
    { text: 'в цей момент', group: 0 },
    { text: 'в цей час', group: 0 },
    // Group 1: ходити-їздити (habitual/imperfective)
    { text: 'завжди', group: 1 },
    { text: 'зазвичай', group: 1 },
    { text: 'часто', group: 1 },
    { text: 'інколи / іноді', group: 1 },
    { text: 'кожен день / щодня', group: 1 },
    { text: 'ніколи', group: 1 },
    { text: 'рідко', group: 1 },
    { text: 'щотижня', group: 1 }
  ]
};

// Activity 5: Random Wheel - Discussion Questions (7 items)
// Source: https://wordwall.net/resource/59356262/prefixes-motion-verbs-figurative-meaning
export const discussionWheel: string[] = [
  'Коли ти приходиш до когось в гості то попереджаєш про це чи надходиш зненацька?',
  'Ти пам\'ятаєш якісь тренди минулих років, що вже відійшли в минуле!',
  'Коли ви востаннє заходили до друзів на каву?',
  'Щоб ви порадили людині, яка хоче перейти з російської на українську?',
  'Переїжджати, для дітей це добре чи погано?',
  'Якщо б ти хотів переїхати в іншу країну, які фактори ти б брав до уваги?',
  'Коли ви почали вчити українську, якого висновку ви дійшли?'
];

// Lesson metadata
export const lessonMetadata = {
  title: 'Ukrainian Verbs of Motion',
  methodology: 'Grammar-Translation Method',
  level: 'Intermediate',
  duration: 60, // minutes
  source: 'Wordwall - matsiuk',
  phases: [
    {
      id: 'warmup',
      name: 'Warm-up & Vocabulary',
      duration: 10,
      activities: ['feelings-flash']
    },
    {
      id: 'presentation',
      name: 'Grammar Presentation',
      duration: 20,
      activities: ['gap-fill-prefixes', 'possessive-pronouns']
    },
    {
      id: 'practice',
      name: 'Guided Practice',
      duration: 15,
      activities: ['group-sort-adverbs']
    },
    {
      id: 'production',
      name: 'Free Practice / Discussion',
      duration: 15,
      activities: ['discussion-wheel']
    }
  ]
};
