// Help text and tooltips for teacher guidance

export const helpText = {
  en: {
    structure: {
      ppp: "Presentation-Practice-Production: Teacher presents language → students practice in controlled way → students use language freely",
      ttt: "Test-Teach-Test: Test students' knowledge → teach what they need → test again to measure progress",
      title: "Give your lesson a clear, descriptive title that indicates the grammar point or topic",
    },
    leadIn: {
      title: "A catchy name for your warm-up activity (e.g., 'Picture Discussion', 'Quick Questions')",
      description: "Brief explanation of what the activity achieves (e.g., 'Students share personal experiences to activate vocabulary')",
      content: "Detailed instructions for the teacher: what to say, what to do, how to set up the activity",
      duration: "Estimated time in minutes. Lead-ins are usually 5-10 minutes",
      mediaLinks: "YouTube videos, images, or websites to use in this activity. Include full URLs starting with http:// or https://",
      teacherNotes: "Private reminders for yourself: common problems, variations, things to emphasize",
    },
    presentation: {
      title: "Name your presentation stage (e.g., 'Present Perfect Form', 'Vocabulary: Weather')",
      targetLanguage: "The exact language you're teaching (e.g., 'I have been to...', 'collocations with make/do')",
      explanation: "Grammar rules, usage patterns, or meaning. Be clear and concise for your reference",
      examples: "Real sentences showing the target language in context. Aim for 5-8 varied examples",
      duration: "Presentation typically takes 10-15 minutes. Don't make it too long!",
      mediaLinks: "Grammar charts, pictures, or videos to support your explanation",
      teacherNotes: "Anticipated student questions, L1 interference issues, concept checking questions",
    },
    exercises: {
      instruction: "Clear task instructions that students will see (e.g., 'Fill in the gaps with the correct form of the verb')",
      gapFill: {
        text: "Write your text with ____ (four underscores) where answers go. Each ____ will become an input field",
        answers: "List the correct answers in order. Students' answers must match these to be marked correct",
      },
      multipleChoice: {
        question: "The question or incomplete sentence",
        options: "4-5 possible answers. Include common errors as distractors, not random wrong answers",
        correctAnswer: "Select which option is correct (first = 0, second = 1, etc.)",
      },
      trueFalse: {
        statement: "A clear statement that is definitely true or false. Avoid ambiguity",
        correctAnswer: "Choose whether the statement is true or false",
      },
      matching: {
        pairs: "Create meaningful pairs. For vocabulary: word ↔ definition. For grammar: question ↔ answer",
      },
      sorting: {
        items: "List items that students need to arrange (e.g., steps in a process, sentence parts)",
        correctOrder: "The correct sequence. Students will see these mixed up",
      },
      sentenceScramble: {
        words: "Individual words that form a sentence. Students will rearrange them",
        correctSentence: "The answer key: the correct sentence in proper word order",
      },
      freeText: {
        prompt: "The writing task (e.g., 'Describe your last vacation', 'Write about your daily routine')",
        minWords: "Minimum word count to ensure substantial practice (e.g., 50, 100)",
      },
      informationGap: {
        scenario: "The communicative situation (e.g., 'You are travel agents sharing information')",
        studentAInfo: "Information only Student A can see. Use ? for missing information",
        studentBInfo: "Information only Student B can see. Use ? for what they need to find out",
        prompts: "Useful questions to get students started (e.g., 'What time does...?', 'Where is...?')",
      },
      rolePlay: {
        scenario: "The situation or context (e.g., 'At a restaurant', 'Meeting a friend')",
        roles: "Define each person's role and what they want/need (e.g., 'Customer: You want to order vegan food')",
        duration: "Suggested time for role-play (usually 5-10 minutes)",
        targetLanguage: "Key phrases students should try to use (e.g., 'Can I have...?', 'Would you like...?')",
      },
      collocation: {
        word: "The base word (e.g., 'make', 'strong', 'heavy')",
        partners: "Words that commonly go with it (e.g., 'make: a decision, a mistake, progress')",
        exerciseFormat: "How to practice: 'match' them, 'fill' in gaps, or 'choose' correct collocations",
      },
      lexicalSet: {
        topic: "The theme or category (e.g., 'Weather', 'Business English', 'Cooking')",
        chunks: "Fixed phrases and expressions, not individual words (e.g., 'heavy rain', 'out of the blue')",
        context: "When/where these expressions are used (e.g., 'describing weather conditions')",
      },
    },
  },
  uk: {
    structure: {
      ppp: "Презентація-Практика-Продукція: Вчитель презентує мову → учні практикують контрольовано → учні використовують мову вільно",
      ttt: "Тест-Навчання-Тест: Перевірте знання учнів → навчіть чого потребують → перевірте знову для вимірювання прогресу",
      title: "Дайте уроку чітку, описову назву, що вказує на граматичний момент або тему",
    },
    leadIn: {
      title: "Привабл ива назва для розминки (напр., 'Обговорення фото', 'Швидкі питання')",
      description: "Короткий опис того, що досягає вправа (напр., 'Учні діляться досвідом для активації лексики')",
      content: "Детальні інструкції для вчителя: що сказати, що робити, як організувати вправу",
      duration: "Приблизний час у хвилинах. Вступ зазвичай 5-10 хвилин",
      mediaLinks: "YouTube відео, зображення або веб-сайти. Включіть повні URL-адреси, що починаються з http:// або https://",
      teacherNotes: "Особисті нагадування: типові проблеми, варіації, на що звернути увагу",
    },
    presentation: {
      title: "Назвіть етап презентації (напр., 'Форма теперішнього доконаного', 'Лексика: Погода')",
      targetLanguage: "Точна мовна структура, яку навчаєте (напр., 'Я був у...', 'колокації зі словом \"робити\"')",
      explanation: "Граматичні правила, патерни використання або значення. Будьте чіткими",
      examples: "Реальні речення, що показують цільову мову в контексті. Прагніть до 5-8 різноманітних прикладів",
      duration: "Презентація зазвичай займає 10-15 хвилин. Не робіть її надто довгою!",
      mediaLinks: "Граматичні таблиці, зображення або відео для підтримки пояснення",
      teacherNotes: "Очікувані питання учнів, проблеми інтерференції, питання для перевірки розуміння",
    },
    exercises: {
      instruction: "Чіткі інструкції завдання, які побачать учні",
      gapFill: {
        text: "Напишіть текст з ____ (чотири підкреслення) де мають бути відповіді. Кожне ____ стане полем для вводу",
        answers: "Перелічіть правильні відповіді по порядку. Відповіді учнів мають збігатися з ними",
      },
      multipleChoice: {
        question: "Питання або незавершене речення",
        options: "4-5 можливих відповідей. Включіть типові помилки як неправильні варіанти",
        correctAnswer: "Оберіть правильний варіант (перший = 0, другий = 1, і т.д.)",
      },
      trueFalse: {
        statement: "Чітке твердження, яке однозначно правдиве або хибне. Уникайте неоднозначності",
        correctAnswer: "Оберіть, чи твердження правдиве чи хибне",
      },
      matching: {
        pairs: "Створіть змістовні пари. Для лексики: слово ↔ визначення. Для граматики: питання ↔ відповідь",
      },
      sorting: {
        items: "Перелічіть елементи, які учні мають впорядкувати (напр., кроки процесу, частини речення)",
        correctOrder: "Правильна послідовність. Учні побачать їх перемішаними",
      },
      sentenceScramble: {
        words: "Окремі слова, що формують речення. Учні переставлятимуть їх",
        correctSentence: "Ключ відповіді: правильне речення у належному порядку слів",
      },
      freeText: {
        prompt: "Завдання для письма (напр., 'Опишіть свої останні канікули', 'Напишіть про свій розпорядок дня')",
        minWords: "Мінімальна кількість слів для забезпечення достатньої практики (напр., 50, 100)",
      },
      informationGap: {
        scenario: "Комунікативна ситуація (напр., 'Ви турагенти, що обмінюються інформацією')",
        studentAInfo: "Інформація, яку бачить тільки учень A. Використовуйте ? для відсутньої інформації",
        studentBInfo: "Інформація, яку бачить тільки учень B. Використовуйте ? для того, що треба з'ясувати",
        prompts: "Корисні питання для початку (напр., 'О котрій...?', 'Де знаходиться...?')",
      },
      rolePlay: {
        scenario: "Ситуація або контекст (напр., 'У ресторані', 'Зустріч з другом')",
        roles: "Визначте роль кожної особи та що вони хочуть/потребують",
        duration: "Рекомендований час для рольової гри (зазвичай 5-10 хвилин)",
        targetLanguage: "Ключові фрази, які учні мають використовувати",
      },
      collocation: {
        word: "Базове слово (напр., 'робити', 'сильний', 'важкий')",
        partners: "Слова, що зазвичай вживаються з ним",
        exerciseFormat: "Як практикувати: 'match' (зіставити), 'fill' (заповнити), або 'choose' (вибрати)",
      },
      lexicalSet: {
        topic: "Тема або категорія (напр., 'Погода', 'Ділова українська', 'Кулінарія')",
        chunks: "Сталі вирази та фразеологізми, не окремі слова",
        context: "Коли/де ці вирази використовуються",
      },
    },
  },
};

// Quick tips for each section
export const quickTips = {
  en: {
    leadIn: [
      "<strong>Keep it short:</strong> 5-10 minutes maximum to maintain energy",
      "<strong>Make it relevant:</strong> Connect to students' lives and experiences",
      "<strong>Elicit, don't tell:</strong> Ask questions to get students thinking",
      "<strong>Build interest:</strong> Create curiosity about the lesson topic",
    ],
    presentation: [
      "<strong>Clear examples:</strong> Use 5-8 varied, natural examples",
      "<strong>Check understanding:</strong> Ask concept questions, don't just explain",
      "<strong>Visual aids:</strong> Pictures and diagrams help clarify meaning",
      "<strong>Keep it brief:</strong> 10-15 minutes max, then move to practice",
    ],
    practice: [
      "<strong>Controlled first:</strong> Start with exercises that have clear right/wrong answers",
      "<strong>Gradual release:</strong> Move from teacher-guided to student-independent",
      "<strong>Variety is key:</strong> Mix different exercise types to maintain engagement",
      "<strong>Include answers:</strong> Provide answer keys for self-checking",
    ],
    production: [
      "<strong>Real communication:</strong> Focus on meaning, not just form",
      "<strong>Student-centered:</strong> Let students create, not just complete",
      "<strong>Authentic tasks:</strong> Use activities that mirror real-life language use",
      "<strong>Monitor, don't interrupt:</strong> Note errors for later correction",
    ],
  },
  uk: {
    leadIn: [
      "<strong>Коротко:</strong> Максимум 5-10 хвилин для підтримки енергії",
      "<strong>Релевантно:</strong> Пов'яжіть з життям та досвідом учнів",
      "<strong>Еліцитація:</strong> Ставте питання, щоб змусити учнів думати",
      "<strong>Зацікавленість:</strong> Створіть цікавість до теми уроку",
    ],
    presentation: [
      "<strong>Чіткі приклади:</strong> Використовуйте 5-8 різноманітних, природних прикладів",
      "<strong>Перевірка розуміння:</strong> Ставте питання на концепції, не просто пояснюйте",
      "<strong>Наочність:</strong> Зображення та діаграми допомагають пояснити значення",
      "<strong>Коротко:</strong> Максимум 10-15 хвилин, потім переходьте до практики",
    ],
    practice: [
      "<strong>Спочатку контроль:</strong> Почніть з вправ з чіткими правильними/неправильними відповідями",
      "<strong>Поступове звільнення:</strong> Рухайтеся від керованого вчителем до самостійного",
      "<strong>Різноманітність:</strong> Змішуйте різні типи вправ для підтримки уваги",
      "<strong>Включіть відповіді:</strong> Надайте ключі відповідей для самоперевірки",
    ],
    production: [
      "<strong>Реальна комунікація:</strong> Зосередьтеся на значенні, а не тільки на формі",
      "<strong>Центрований на учнях:</strong> Дозвольте учням створювати, а не тільки виконувати",
      "<strong>Автентичні завдання:</strong> Використовуйте вправи, що відображають реальне використання мови",
      "<strong>Спостерігайте, не перебивайте:</strong> Відзначайте помилки для пізнішої корекції",
    ],
  },
};
