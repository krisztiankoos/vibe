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

  // v1.1.0: Context-aware phase labels for GPPC
  topicIntroduction: string;
  grammarPresentation: string;
  controlledPracticePhase: string;
  communicativePractice: string;

  // v1.1.0: Context-aware phase labels for CEFR
  taskIntroduction: string;
  preparation: string;
  taskExecution: string;
  reflectionAndLanguageFocus: string;

  // Structure page
  chooseStructure: string;
  phases: string;
  bestFor: string;

  // PPP Structure (English ESL)
  pppTitle: string;
  pppDescription: string;
  pppFullDescription: string;
  pppStep1: string;
  pppStep2: string;
  pppStep3: string;
  pppBestFor: string;

  // TTT Structure (English ESL)
  tttTitle: string;
  tttDescription: string;
  tttFullDescription: string;
  tttStep1: string;
  tttStep2: string;
  tttStep3: string;
  tttBestFor: string;

  // GPPC Structure (Ukrainian UFL) - NEW
  gppcTitle: string;
  gppcDescription: string;
  gppcFullDescription: string;
  gppcStep1: string;
  gppcStep2: string;
  gppcStep3: string;
  gppcStep4: string;
  gppcBestFor: string;

  // CEFR Structure (Ukrainian UFL) - NEW
  cefrTitle: string;
  cefrDescription: string;
  cefrFullDescription: string;
  cefrStep1: string;
  cefrStep2: string;
  cefrStep3: string;
  cefrStep4: string;
  cefrBestFor: string;

  // Methodology explanations
  eslMethodologyNote: string;
  uflMethodologyNote: string;

  // CEFR Level Selector - NEW
  cefrLevel: string;
  cefrLevelOptional: string;
  selectCefrLevel: string;
  cefrA1: string;
  cefrA2: string;
  cefrB1: string;
  cefrB2: string;
  cefrC1: string;

  // Bilingual explanations - NEW
  bilingualExplanation: string;
  bilingualExplanationHint: string;
  ukrainianExplanation: string;
  englishTranslation: string;
  ukrainianPlaceholder: string;
  englishPlaceholder: string;
  languageToggle: string;
  showInUkrainian: string;
  showInEnglish: string;

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
  informationGap: string;
  rolePlay: string;
  collocation: string;
  lexicalSet: string;

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

  // Information Gap
  scenario: string;
  scenarioPlaceholder: string;
  studentAInfo: string;
  studentAInfoPlaceholder: string;
  studentBInfo: string;
  studentBInfoPlaceholder: string;
  targetLanguageOptional: string;
  infoGapTargetPlaceholder: string;

  // Role Play
  rolePlayScenario: string;
  rolePlayScenarioPlaceholder: string;
  roles: string;
  roleName: string;
  roleDescription: string;
  addRole: string;
  suggestedDuration: string;

  // Collocation
  collocationWord: string;
  collocationPartners: string;
  collocationPartnersPlaceholder: string;
  addCollocation: string;
  exerciseFormat: string;
  formatMatch: string;
  formatFill: string;
  formatChoose: string;

  // Lexical Set
  topic: string;
  topicPlaceholder: string;
  lexicalChunks: string;
  chunksPlaceholder: string;
  chunksHint: string;
  contextOptional: string;
  contextPlaceholder: string;

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

    // v1.1.0: Context-aware phase labels for GPPC
    topicIntroduction: 'TOPIC',
    grammarPresentation: 'GRAMMAR',
    controlledPracticePhase: 'PRACTICE',
    communicativePractice: 'COMMUNICATION',

    // v1.1.0: Context-aware phase labels for CEFR
    taskIntroduction: 'TASK INTRO',
    preparation: 'PREPARATION',
    taskExecution: 'TASK',
    reflectionAndLanguageFocus: 'REFLECTION',

    // Structure page
    chooseStructure: 'Choose Lesson Structure',
    phases: 'Phases',
    bestFor: 'Best for',

    // PPP Structure (English ESL)
    pppTitle: 'PPP',
    pppDescription: 'Presentation → Practice → Production',
    pppFullDescription: 'Communicative grammar instruction with fluency focus',
    pppStep1: 'Presentation',
    pppStep2: 'Controlled Practice',
    pppStep3: 'Free Production',
    pppBestFor: 'Grammar lessons (verb tenses, modals, conditionals), A1-B2 levels',

    // TTT Structure (English ESL)
    tttTitle: 'TTT',
    tttDescription: 'Test → Teach → Test',
    tttFullDescription: 'Discovery-based learning through authentic tasks',
    tttStep1: 'Test 1 (Diagnostic)',
    tttStep2: 'Teach (Gap Filling)',
    tttStep3: 'Test 2 (Assessment)',
    tttBestFor: 'Revision, authentic texts, student-led discovery, B1+ levels',

    // GPPC Structure (Ukrainian UFL) - NEW
    gppcTitle: 'GPPC',
    gppcDescription: 'Grammar → Presentation → Practice → Communication',
    gppcFullDescription: 'Grammar foundation with explicit rules and communicative practice',
    gppcStep1: 'Topic Introduction',
    gppcStep2: 'Grammar Presentation',
    gppcStep3: 'Controlled Practice',
    gppcStep4: 'Communicative Practice',
    gppcBestFor: 'Cases (all 6), verb aspects, declensions, motion verbs, A1-B1 levels',

    // CEFR Structure (Ukrainian UFL) - NEW
    cefrTitle: 'CEFR Task-Based',
    cefrDescription: 'Task Introduction → Preparation → Task → Reflection',
    cefrFullDescription: 'Real-world tasks with language focus after completion',
    cefrStep1: 'Task Introduction',
    cefrStep2: 'Preparation',
    cefrStep3: 'Task Execution',
    cefrStep4: 'Reflection & Language Focus',
    cefrBestFor: 'Formal writing, debates, presentations, literature analysis, B1-C1 levels',

    // Methodology explanations
    eslMethodologyNote: 'English (ESL) uses communicative teaching methods: PPP (grammar-focused) and TTT (discovery-based).',
    uflMethodologyNote: 'Ukrainian (UFL) uses hybrid methodology: GPPC (grammar foundation) and CEFR (task-based learning).',

    // CEFR Level Selector - NEW
    cefrLevel: 'CEFR Level',
    cefrLevelOptional: 'CEFR Level (optional)',
    selectCefrLevel: 'Select CEFR Level',
    cefrA1: 'A1 - Beginner',
    cefrA2: 'A2 - Elementary',
    cefrB1: 'B1 - Intermediate',
    cefrB2: 'B2 - Upper-Intermediate',
    cefrC1: 'C1 - Advanced',

    // Bilingual explanations - NEW
    bilingualExplanation: 'Bilingual Explanation (Ukrainian + English)',
    bilingualExplanationHint: 'Provide explanations in both Ukrainian and English for student clarity',
    ukrainianExplanation: 'Ukrainian Explanation',
    englishTranslation: 'English Translation',
    ukrainianPlaceholder: 'Explain in Ukrainian...',
    englishPlaceholder: 'English translation...',
    languageToggle: 'Language',
    showInUkrainian: '🇺🇦 Українська',
    showInEnglish: '🇬🇧 English',

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
    informationGap: 'Information Gap (Communicative)',
    rolePlay: 'Role Play (Communicative)',
    collocation: 'Collocation Practice (Lexical)',
    lexicalSet: 'Lexical Set / Chunks (Lexical)',

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

    // Information Gap
    scenario: 'Scenario',
    scenarioPlaceholder: 'e.g., Student A has a train schedule, Student B needs to plan a trip...',
    studentAInfo: 'Information for Student A',
    studentAInfoPlaceholder: 'What Student A knows (e.g., departure times, prices)...',
    studentBInfo: 'Information for Student B',
    studentBInfoPlaceholder: 'What Student B knows (e.g., arrival times, platforms)...',
    targetLanguageOptional: 'Target Language / Phrases (optional)',
    infoGapTargetPlaceholder: 'e.g., "What time does...", "How much is...", "Can you tell me..."',

    // Role Play
    rolePlayScenario: 'Scenario',
    rolePlayScenarioPlaceholder: 'e.g., At a restaurant, ordering food...',
    roles: 'Roles',
    roleName: 'Role Name',
    roleDescription: 'Role Description',
    addRole: 'Add Role',
    suggestedDuration: 'Suggested Duration (minutes, optional)',

    // Collocation
    collocationWord: 'Base Word',
    collocationPartners: 'Collocations (comma-separated)',
    collocationPartnersPlaceholder: 'e.g., a decision, a mistake, progress, an effort',
    addCollocation: 'Add Word',
    exerciseFormat: 'Exercise Format (optional)',
    formatMatch: 'Matching',
    formatFill: 'Fill in the blank',
    formatChoose: 'Choose correct collocation',

    // Lexical Set
    topic: 'Topic / Theme',
    topicPlaceholder: 'e.g., Business Meeting, Travel, Food & Dining',
    lexicalChunks: 'Lexical Chunks / Fixed Expressions (one per line)',
    chunksPlaceholder: 'e.g., make a reservation, take a seat, order the bill',
    chunksHint: 'Enter fixed expressions, collocations, and useful phrases related to the topic',
    contextOptional: 'Context / Example Situation (optional)',
    contextPlaceholder: 'e.g., You are at a restaurant with a business client...',

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
    homeSubtitle: 'Створюйте цікаві мовні уроки за методиками ГППК та CEFR',
    selectLanguage: 'Оберіть Мову для Ваших Уроків',
    englishLessonBuilder: 'Конструктор Англійських Уроків',
    ukrainianLessonBuilder: 'Конструктор Українських Уроків',
    englishDescription: 'Створюйте уроки для викладання англійської мови',
    ukrainianDescription: 'Створюйте уроки для викладання української мови',

    // Header
    appTitle: 'Конструктор Українських Уроків',
    appSubtitle: 'Створюйте цікаві уроки за методиками ГППК та CEFR',
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

    // v1.1.0: Context-aware phase labels for GPPC
    topicIntroduction: 'ТЕМА',
    grammarPresentation: 'ГРАМАТИКА',
    controlledPracticePhase: 'ПРАКТИКА',
    communicativePractice: 'КОМУНІКАЦІЯ',

    // v1.1.0: Context-aware phase labels for CEFR
    taskIntroduction: 'ВСТУП',
    preparation: 'ПІДГОТОВКА',
    taskExecution: 'ЗАВДАННЯ',
    reflectionAndLanguageFocus: 'РЕФЛЕКСІЯ',

    // Structure page
    chooseStructure: 'Оберіть Структуру Уроку',
    phases: 'Фази',
    bestFor: 'Найкраще для',

    // PPP Structure (English ESL)
    pppTitle: 'PPP',
    pppDescription: 'Презентація → Практика → Продукування',
    pppFullDescription: 'Комунікативне навчання граматики з акцентом на плинність',
    pppStep1: 'Презентація',
    pppStep2: 'Керована Практика',
    pppStep3: 'Вільне Продукування',
    pppBestFor: 'Граматичні уроки (часи дієслів, модальні, умовні), рівні A1-B2',

    // TTT Structure (English ESL)
    tttTitle: 'TTT',
    tttDescription: 'Тест → Навчання → Тест',
    tttFullDescription: 'Навчання через відкриття за допомогою автентичних завдань',
    tttStep1: 'Тест 1 (Діагностика)',
    tttStep2: 'Навчання (Заповнення Прогалин)',
    tttStep3: 'Тест 2 (Оцінка)',
    tttBestFor: 'Повторення, автентичні тексти, навчання через відкриття, рівні B1+',

    // GPPC Structure (Ukrainian UFL) - NEW
    gppcTitle: 'ГППК',
    gppcDescription: 'Граматика → Презентація → Практика → Комунікація',
    gppcFullDescription: 'Граматична основа з явними правилами та комунікативною практикою',
    gppcStep1: 'Введення Теми',
    gppcStep2: 'Презентація Граматики',
    gppcStep3: 'Керована Практика',
    gppcStep4: 'Комунікативна Практика',
    gppcBestFor: 'Відмінки (всі 6), види дієслів, відміни, дієслова руху, рівні A1-B1',

    // CEFR Structure (Ukrainian UFL) - NEW
    cefrTitle: 'CEFR Завдання',
    cefrDescription: 'Вступ → Підготовка → Завдання → Рефлексія',
    cefrFullDescription: 'Реальні завдання з мовним фокусом після виконання',
    cefrStep1: 'Введення Завдання',
    cefrStep2: 'Підготовка',
    cefrStep3: 'Виконання Завдання',
    cefrStep4: 'Рефлексія та Мовний Фокус',
    cefrBestFor: 'Офіційне листування, дебати, презентації, літературний аналіз, рівні B1-C1',

    // Methodology explanations
    eslMethodologyNote: 'Англійська (ESL) використовує комунікативні методи: PPP (граматичний фокус) та TTT (навчання через відкриття).',
    uflMethodologyNote: 'Українська (УІМ) використовує гібридний підхід: ГППК (граматична основа) та CEFR (навчання через завдання).',

    // CEFR Level Selector - NEW
    cefrLevel: 'Рівень CEFR',
    cefrLevelOptional: 'Рівень CEFR (необов\'язково)',
    selectCefrLevel: 'Оберіть Рівень CEFR',
    cefrA1: 'A1 - Початківець',
    cefrA2: 'A2 - Елементарний',
    cefrB1: 'B1 - Середній',
    cefrB2: 'B2 - Вище-Середній',
    cefrC1: 'C1 - Просунутий',

    // Bilingual explanations - NEW
    bilingualExplanation: 'Двомовне Пояснення (Українська + Англійська)',
    bilingualExplanationHint: 'Надайте пояснення українською та англійською для ясності студентів',
    ukrainianExplanation: 'Пояснення Українською',
    englishTranslation: 'Переклад Англійською',
    ukrainianPlaceholder: 'Поясніть українською...',
    englishPlaceholder: 'Переклад англійською...',
    languageToggle: 'Мова',
    showInUkrainian: '🇺🇦 Українська',
    showInEnglish: '🇬🇧 English',

    lessonTitle: 'Назва Уроку',
    lessonTitlePlaceholder: 'напр., Орудний відмінок',

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
    informationGap: 'Інформаційний Розрив (Комунікативна)',
    rolePlay: 'Рольова Гра (Комунікативна)',
    collocation: 'Практика Колокацій (Лексична)',
    lexicalSet: 'Лексичний Набір / Вирази (Лексична)',

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

    // Information Gap
    scenario: 'Сценарій',
    scenarioPlaceholder: 'напр., Студент А має розклад поїздів, Студент Б планує подорож...',
    studentAInfo: 'Інформація для Студента А',
    studentAInfoPlaceholder: 'Що знає Студент А (напр., час відправлення, ціни)...',
    studentBInfo: 'Інформація для Студента Б',
    studentBInfoPlaceholder: 'Що знає Студент Б (напр., час прибуття, платформи)...',
    targetLanguageOptional: 'Цільова Мова / Фрази (необов\'язково)',
    infoGapTargetPlaceholder: 'напр., "О котрій годині...", "Скільки коштує...", "Чи можете ви сказати мені..."',

    // Role Play
    rolePlayScenario: 'Сценарій',
    rolePlayScenarioPlaceholder: 'напр., У ресторані, замовлення їжі...',
    roles: 'Ролі',
    roleName: 'Назва Ролі',
    roleDescription: 'Опис Ролі',
    addRole: 'Додати Роль',
    suggestedDuration: 'Рекомендована Тривалість (хвилини, необов\'язково)',

    // Collocation
    collocationWord: 'Базове Слово',
    collocationPartners: 'Колокації (через кому)',
    collocationPartnersPlaceholder: 'напр., рішення, помилка, прогрес, зусилля',
    addCollocation: 'Додати Слово',
    exerciseFormat: 'Формат Вправи (необов\'язково)',
    formatMatch: 'Підбір',
    formatFill: 'Заповнення пропусків',
    formatChoose: 'Вибір правильної колокації',

    // Lexical Set
    topic: 'Тема',
    topicPlaceholder: 'напр., Ділова Зустріч, Подорож, Їжа та Харчування',
    lexicalChunks: 'Лексичні Вирази / Сталі Вирази (по одному на рядок)',
    chunksPlaceholder: 'напр., зробити бронювання, сісти, замовити рахунок',
    chunksHint: 'Введіть сталі вирази, колокації та корисні фрази, пов\'язані з темою',
    contextOptional: 'Контекст / Приклад Ситуації (необов\'язково)',
    contextPlaceholder: 'напр., Ви в ресторані з діловим клієнтом...',

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
