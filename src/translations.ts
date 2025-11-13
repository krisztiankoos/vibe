export type Language = 'en' | 'uk';

interface Translations {
  // Home page
  homeTitle: string;
  homeSubtitle: string;
  selectLanguage: string;
  englishLessonBuilder: string;
  ukrainianLessonBuilder: string;
  englishDescription: string;
  ukrainianDescription: string;

  // Header
  appTitle: string;
  appSubtitle: string;
  newLesson: string;
  importJSON: string;
  changeLanguage: string;

  // Progress steps
  structure: string;
  leadIn: string;
  presentation: string;
  controlled: string;
  free: string;
  preview: string;

  // Structure page
  chooseStructure: string;
  pppTitle: string;
  pppDescription: string;
  pppStep1: string;
  pppStep2: string;
  pppStep3: string;
  tttTitle: string;
  tttDescription: string;
  tttStep1: string;
  tttStep2: string;
  tttStep3: string;
  lessonTitle: string;
  lessonTitlePlaceholder: string;

  // Lead-in form
  leadInTitle: string;
  leadInSubtitle: string;
  activityTitle: string;
  activityTitlePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  contentInstructions: string;
  contentPlaceholder: string;
  durationMinutes: string;
  durationPlaceholder: string;
  mediaLinks: string;
  mediaLinksPlaceholder: string;
  teacherNotes: string;
  teacherNotesPlaceholder: string;
  teacherNotesHint: string;
  addButton: string;
  tipLabel: string;
  leadInTip1: string;
  leadInTip2: string;
  leadInTip3: string;

  // Presentation form
  presentationTitle: string;
  presentationSubtitle: string;
  sectionTitle: string;
  sectionTitlePlaceholder: string;
  targetLanguage: string;
  targetLanguagePlaceholder: string;
  explanation: string;
  explanationPlaceholder: string;
  exampleSentences: string;
  examplePlaceholder: string;
  presentationTip1: string;
  presentationTip2: string;
  presentationTip3: string;
  mediaLinksHint: string;

  // Exercise builder
  addExercise: string;
  exerciseType: string;
  instructionsForStudents: string;
  instructionsPlaceholder: string;

  // Exercise types
  gapFill: string;
  multipleChoice: string;
  trueFalse: string;
  matching: string;
  sorting: string;
  sentenceScramble: string;
  freeText: string;

  // Gap fill
  textWithGaps: string;
  textWithGapsPlaceholder: string;
  gapsHint: string;
  answersOptional: string;
  answersPlaceholder: string;

  // Multiple choice
  question: string;
  questionPlaceholder: string;
  options: string;
  optionPlaceholder: string;
  markCorrectHint: string;
  addOption: string;

  // True/False
  statement: string;
  statementPlaceholder: string;
  correctAnswer: string;
  trueLabel: string;
  falseLabel: string;
  noAnswerKey: string;

  // Sentence scramble
  wordsToArrange: string;
  wordsPlaceholder: string;
  scrambleHint: string;
  correctSentence: string;
  correctSentencePlaceholder: string;
  correctSentenceHint: string;

  // Sorting
  itemsToSort: string;
  sortingPlaceholder: string;
  sortingHint: string;

  // Matching
  matchingPairs: string;
  leftItem: string;
  rightItem: string;
  addPair: string;

  // Free text
  promptQuestion: string;
  promptPlaceholder: string;

  // Practice sections
  controlledPracticeTitle: string;
  controlledPracticeSubtitle: string;
  freePracticeTitle: string;
  freePracticeSubtitle: string;
  noExercises: string;
  remove: string;

  // Preview
  lessonPreview: string;
  exportJSON: string;
  printLesson: string;
  lessonInformation: string;
  duration: string;
  mediaResources: string;
  examples: string;
  answers: string;

  // Footer
  previous: string;
  next: string;
  saveLesson: string;

  // Messages
  lessonSaved: string;
  lessonImported: string;
  importFailed: string;
  createNewLesson: string;
  fillRequiredFields: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Home page
    homeTitle: 'Language Lesson Builder',
    homeSubtitle: 'Create engaging language lessons with PPP & TTT methodologies',
    selectLanguage: 'Select Language for Your Lessons',
    englishLessonBuilder: 'English Lesson Builder',
    ukrainianLessonBuilder: 'Ukrainian Lesson Builder',
    englishDescription: 'Build lessons for teaching English',
    ukrainianDescription: 'Build lessons for teaching Ukrainian',

    // Header
    appTitle: 'English Lesson Builder',
    appSubtitle: 'Create engaging lessons following PPP & TTT methodologies',
    newLesson: 'New Lesson',
    importJSON: 'Import JSON',
    changeLanguage: 'Change Language',

    // Progress steps
    structure: 'STRUCTURE',
    leadIn: 'LEAD-IN',
    presentation: 'PRESENTATION',
    controlled: 'CONTROLLED',
    free: 'FREE',
    preview: 'PREVIEW',

    // Structure page
    chooseStructure: 'Choose Lesson Structure',
    pppTitle: 'PPP',
    pppDescription: 'Presentation → Practice → Production',
    pppStep1: 'Present new language',
    pppStep2: 'Practice with controlled activities',
    pppStep3: 'Produce with free practice',
    tttTitle: 'TTT',
    tttDescription: 'Test → Teach → Test',
    tttStep1: "Test students' existing knowledge",
    tttStep2: 'Teach the target language',
    tttStep3: 'Test again to measure progress',
    lessonTitle: 'Lesson Title',
    lessonTitlePlaceholder: 'e.g., Present Perfect Tense',

    // Lead-in form
    leadInTitle: 'Lead-In Activity',
    leadInSubtitle: 'Engage students and activate their prior knowledge about the topic',
    activityTitle: 'Activity Title',
    activityTitlePlaceholder: 'e.g., Discussion about past experiences',
    description: 'Description',
    descriptionPlaceholder: 'Brief description of the activity',
    contentInstructions: 'Content / Instructions',
    contentPlaceholder: 'Detailed instructions for the lead-in activity...',
    durationMinutes: 'Duration (minutes, optional)',
    durationPlaceholder: 'e.g., 10',
    mediaLinks: 'Media Links (YouTube, websites, optional)',
    mediaLinksPlaceholder: 'Paste YouTube link or website URL...',
    teacherNotes: 'Teacher Notes (optional, private)',
    teacherNotesPlaceholder: 'Private notes for yourself (e.g., common student mistakes, timing tips)...',
    teacherNotesHint: 'These notes are for you only and won\'t be shown to students',
    addButton: 'Add',
    tipLabel: 'Tip:',
    leadInTip1: 'Connect to students\' experiences',
    leadInTip2: 'Generate interest in the topic',
    leadInTip3: 'Activate relevant vocabulary and concepts',

    // Presentation form
    presentationTitle: 'Presentation / Teaching',
    presentationSubtitle: 'Present the target language to your students',
    sectionTitle: 'Section Title',
    sectionTitlePlaceholder: 'e.g., Present Perfect Tense',
    targetLanguage: 'Target Language / Grammar Point',
    targetLanguagePlaceholder: 'e.g., Present Perfect: have/has + past participle',
    explanation: 'Explanation',
    explanationPlaceholder: 'Explain the grammar point, usage, form, meaning...',
    exampleSentences: 'Example Sentences',
    examplePlaceholder: 'Add an example sentence...',
    presentationTip1: 'Clear explanation of form, meaning, and use',
    presentationTip2: 'Multiple examples in context',
    presentationTip3: 'Visual aids or timelines (can be added later)',
    mediaLinksHint: 'Add YouTube videos or external resources (grammar tutorials, etc.)',

    // Exercise builder
    addExercise: 'Add Exercise',
    exerciseType: 'Exercise Type',
    instructionsForStudents: 'Instructions for Students',
    instructionsPlaceholder: 'e.g., Complete the sentences with the correct form of the verb',

    // Exercise types
    gapFill: 'Gap Fill',
    multipleChoice: 'Multiple Choice',
    trueFalse: 'True/False',
    matching: 'Matching',
    sorting: 'Sorting',
    sentenceScramble: 'Sentence Scramble',
    freeText: 'Free Text / Production',

    // Gap fill
    textWithGaps: 'Text with Gaps',
    textWithGapsPlaceholder: 'Write text and use [brackets] for gaps, e.g., I [have been] to Paris.',
    gapsHint: 'Use [brackets] to mark where gaps should appear',
    answersOptional: 'Answers (comma-separated, optional)',
    answersPlaceholder: 'have been, has gone, etc.',

    // Multiple choice
    question: 'Question',
    questionPlaceholder: 'e.g., Which sentence is correct?',
    options: 'Options',
    optionPlaceholder: 'Option',
    markCorrectHint: 'Click the radio button to mark the correct answer (optional)',
    addOption: 'Add Option',

    // True/False
    statement: 'Statement',
    statementPlaceholder: 'e.g., The present perfect tense is used to describe completed actions.',
    correctAnswer: 'Correct Answer (optional)',
    trueLabel: 'True',
    falseLabel: 'False',
    noAnswerKey: 'No answer key',

    // Sentence scramble
    wordsToArrange: 'Words (space-separated)',
    wordsPlaceholder: 'e.g., been have I Paris to',
    scrambleHint: 'Enter words separated by spaces. They will be presented in random order to students.',
    correctSentence: 'Correct Sentence (optional)',
    correctSentencePlaceholder: 'e.g., I have been to Paris',
    correctSentenceHint: 'Enter the correct sentence for your reference',

    // Sorting
    itemsToSort: 'Items to Sort (one per line)',
    sortingPlaceholder: 'Enter items, one per line',
    sortingHint: 'Students will need to arrange these in the correct order',

    // Matching
    matchingPairs: 'Matching Pairs',
    leftItem: 'Left item',
    rightItem: 'Right item',
    addPair: 'Add Pair',

    // Free text
    promptQuestion: 'Prompt / Question',
    promptPlaceholder: 'e.g., Write about a memorable experience from your past...',

    // Practice sections
    controlledPracticeTitle: 'Controlled Practice',
    controlledPracticeSubtitle: 'Add exercises where students practice the target language with guidance',
    freePracticeTitle: 'Free Practice / Production',
    freePracticeSubtitle: 'Add exercises where students use the language more freely',
    noExercises: 'No exercises added yet',
    remove: 'Remove',

    // Preview
    lessonPreview: 'Lesson Preview',
    exportJSON: 'Export JSON',
    printLesson: 'Print Lesson',
    lessonInformation: 'Lesson Information',
    duration: 'Duration',
    mediaResources: 'Media Resources',
    examples: 'Examples',
    answers: 'Answers',

    // Footer
    previous: 'Previous',
    next: 'Next',
    saveLesson: 'Save Lesson',

    // Messages
    lessonSaved: 'Lesson saved successfully!',
    lessonImported: 'Lesson imported successfully!',
    importFailed: 'Failed to import lesson. Please check the file format.',
    createNewLesson: 'Create a new lesson? Any unsaved changes will be lost.',
    fillRequiredFields: 'Please fill in all required fields',
  },

  uk: {
    // Home page
    homeTitle: 'Конструктор Мовних Уроків',
    homeSubtitle: 'Створюйте цікаві мовні уроки за методиками PPP та TTT',
    selectLanguage: 'Оберіть Мову для Ваших Уроків',
    englishLessonBuilder: 'Конструктор Англійських Уроків',
    ukrainianLessonBuilder: 'Конструктор Українських Уроків',
    englishDescription: 'Створюйте уроки для викладання англійської мови',
    ukrainianDescription: 'Створюйте уроки для викладання української мови',

    // Header
    appTitle: 'Конструктор Українських Уроків',
    appSubtitle: 'Створюйте цікаві уроки за методиками PPP та TTT',
    newLesson: 'Новий Урок',
    importJSON: 'Імпорт JSON',
    changeLanguage: 'Змінити Мову',

    // Progress steps
    structure: 'СТРУКТУРА',
    leadIn: 'ВСТУП',
    presentation: 'ПРЕЗЕНТАЦІЯ',
    controlled: 'КЕРОВАНА',
    free: 'ВІЛЬНА',
    preview: 'ПЕРЕГЛЯД',

    // Structure page
    chooseStructure: 'Оберіть Структуру Уроку',
    pppTitle: 'PPP',
    pppDescription: 'Презентація → Практика → Продукування',
    pppStep1: 'Представте нову мову',
    pppStep2: 'Практикуйте з керованими вправами',
    pppStep3: 'Продукуйте з вільною практикою',
    tttTitle: 'TTT',
    tttDescription: 'Тест → Навчання → Тест',
    tttStep1: 'Перевірте наявні знання студентів',
    tttStep2: 'Навчіть цільової мови',
    tttStep3: 'Перевірте знову, щоб виміряти прогрес',
    lessonTitle: 'Назва Уроку',
    lessonTitlePlaceholder: 'напр., Минулий доконаний час',

    // Lead-in form
    leadInTitle: 'Вступна Активність',
    leadInSubtitle: 'Залучіть студентів та активуйте їхні попередні знання про тему',
    activityTitle: 'Назва Активності',
    activityTitlePlaceholder: 'напр., Обговорення минулого досвіду',
    description: 'Опис',
    descriptionPlaceholder: 'Короткий опис активності',
    contentInstructions: 'Зміст / Інструкції',
    contentPlaceholder: 'Детальні інструкції для вступної активності...',
    durationMinutes: 'Тривалість (хвилини, необов\'язково)',
    durationPlaceholder: 'напр., 10',
    mediaLinks: 'Медіа Посилання (YouTube, веб-сайти, необов\'язково)',
    mediaLinksPlaceholder: 'Вставте посилання на YouTube або веб-сайт...',
    teacherNotes: 'Нотатки Вчителя (необов\'язково, приватні)',
    teacherNotesPlaceholder: 'Приватні нотатки для себе (напр., типові помилки студентів, поради щодо часу)...',
    teacherNotesHint: 'Ці нотатки тільки для вас і не будуть показані студентам',
    addButton: 'Додати',
    tipLabel: 'Порада:',
    leadInTip1: 'Пов\'яжіть з досвідом студентів',
    leadInTip2: 'Викличте інтерес до теми',
    leadInTip3: 'Активуйте відповідну лексику та концепції',

    // Presentation form
    presentationTitle: 'Презентація / Навчання',
    presentationSubtitle: 'Представте цільову мову вашим студентам',
    sectionTitle: 'Назва Розділу',
    sectionTitlePlaceholder: 'напр., Минулий доконаний час',
    targetLanguage: 'Цільова Мова / Граматичний Пункт',
    targetLanguagePlaceholder: 'напр., Минулий доконаний час: був/була + дієприкметник',
    explanation: 'Пояснення',
    explanationPlaceholder: 'Поясніть граматичний пункт, використання, форму, значення...',
    exampleSentences: 'Приклади Речень',
    examplePlaceholder: 'Додайте приклад речення...',
    presentationTip1: 'Чітке пояснення форми, значення та використання',
    presentationTip2: 'Множинні приклади в контексті',
    presentationTip3: 'Візуальні допоміжні засоби або часові лінії (можна додати пізніше)',
    mediaLinksHint: 'Додайте відео з YouTube або зовнішні ресурси (граматичні підручники тощо)',

    // Exercise builder
    addExercise: 'Додати Вправу',
    exerciseType: 'Тип Вправи',
    instructionsForStudents: 'Інструкції для Студентів',
    instructionsPlaceholder: 'напр., Доповніть речення правильною формою дієслова',

    // Exercise types
    gapFill: 'Заповнення Пропусків',
    multipleChoice: 'Множинний Вибір',
    trueFalse: 'Правда/Неправда',
    matching: 'Підбір',
    sorting: 'Сортування',
    sentenceScramble: 'Збирання Речення',
    freeText: 'Вільний Текст / Продукування',

    // Gap fill
    textWithGaps: 'Текст з Пропусками',
    textWithGapsPlaceholder: 'Напишіть текст і використовуйте [дужки] для пропусків, напр., Я [був] у Парижі.',
    gapsHint: 'Використовуйте [дужки], щоб позначити, де мають з\'явитися пропуски',
    answersOptional: 'Відповіді (через кому, необов\'язково)',
    answersPlaceholder: 'був, пішов і т.д.',

    // Multiple choice
    question: 'Питання',
    questionPlaceholder: 'напр., Яке речення правильне?',
    options: 'Варіанти',
    optionPlaceholder: 'Варіант',
    markCorrectHint: 'Натисніть радіокнопку, щоб позначити правильну відповідь (необов\'язково)',
    addOption: 'Додати Варіант',

    // True/False
    statement: 'Твердження',
    statementPlaceholder: 'напр., Минулий доконаний час використовується для опису завершених дій.',
    correctAnswer: 'Правильна Відповідь (необов\'язково)',
    trueLabel: 'Правда',
    falseLabel: 'Неправда',
    noAnswerKey: 'Без ключа відповідей',

    // Sentence scramble
    wordsToArrange: 'Слова (через пробіл)',
    wordsPlaceholder: 'напр., був я Парижі у',
    scrambleHint: 'Введіть слова через пробіли. Вони будуть представлені студентам у випадковому порядку.',
    correctSentence: 'Правильне Речення (необов\'язково)',
    correctSentencePlaceholder: 'напр., Я був у Парижі',
    correctSentenceHint: 'Введіть правильне речення для вашої довідки',

    // Sorting
    itemsToSort: 'Елементи для Сортування (по одному на рядок)',
    sortingPlaceholder: 'Введіть елементи, по одному на рядок',
    sortingHint: 'Студентам потрібно буде розташувати їх у правильному порядку',

    // Matching
    matchingPairs: 'Пари для Підбору',
    leftItem: 'Лівий елемент',
    rightItem: 'Правий елемент',
    addPair: 'Додати Пару',

    // Free text
    promptQuestion: 'Підказка / Питання',
    promptPlaceholder: 'напр., Напишіть про незабутній досвід з вашого минулого...',

    // Practice sections
    controlledPracticeTitle: 'Керована Практика',
    controlledPracticeSubtitle: 'Додайте вправи, де студенти практикують цільову мову з керівництвом',
    freePracticeTitle: 'Вільна Практика / Продукування',
    freePracticeSubtitle: 'Додайте вправи, де студенти використовують мову більш вільно',
    noExercises: 'Вправ ще не додано',
    remove: 'Видалити',

    // Preview
    lessonPreview: 'Перегляд Уроку',
    exportJSON: 'Експорт JSON',
    printLesson: 'Друк Уроку',
    lessonInformation: 'Інформація про Урок',
    duration: 'Тривалість',
    mediaResources: 'Медіа Ресурси',
    examples: 'Приклади',
    answers: 'Відповіді',

    // Footer
    previous: 'Назад',
    next: 'Далі',
    saveLesson: 'Зберегти Урок',

    // Messages
    lessonSaved: 'Урок успішно збережено!',
    lessonImported: 'Урок успішно імпортовано!',
    importFailed: 'Не вдалося імпортувати урок. Перевірте формат файлу.',
    createNewLesson: 'Створити новий урок? Всі незбережені зміни будуть втрачені.',
    fillRequiredFields: 'Будь ласка, заповніть всі обов\'язкові поля',
  },
};

export function getTranslation(lang: Language): Translations {
  return translations[lang];
}
