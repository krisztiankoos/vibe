import { useState } from 'react';
import type { Exercise, ExerciseType } from '../types';
import type { Language } from '../translations';
import { getTranslation } from '../translations';
import { HelpIcon } from './Tooltip';
import { helpText } from '../utils/helpText';

interface ExerciseBuilderProps {
  onAddExercise: (exercise: Exercise) => void;
  language: Language;
}

export default function ExerciseBuilder({ onAddExercise, language }: ExerciseBuilderProps) {
  const t = getTranslation(language);
  const help = helpText[language].exercises;

  const [exerciseType, setExerciseType] = useState<ExerciseType>('gap-fill');
  const [instruction, setInstruction] = useState('');

  // Gap fill states
  const [gapFillText, setGapFillText] = useState('');
  const [gapAnswers, setGapAnswers] = useState('');

  // Sorting states
  const [sortingItems, setSortingItems] = useState('');

  // Matching states
  const [matchingPairs, setMatchingPairs] = useState<Array<{ left: string; right: string }>>([
    { left: '', right: '' },
  ]);

  // Free text states
  const [freeTextPrompt, setFreeTextPrompt] = useState('');

  // Multiple choice states
  const [mcQuestion, setMcQuestion] = useState('');
  const [mcOptions, setMcOptions] = useState<string[]>(['', '', '', '']);
  const [mcCorrectAnswer, setMcCorrectAnswer] = useState<number>(-1);

  // True/False states
  const [tfStatement, setTfStatement] = useState('');
  const [tfCorrectAnswer, setTfCorrectAnswer] = useState<boolean | undefined>(undefined);

  // Sentence scramble states
  const [scrambleWords, setScrambleWords] = useState('');
  const [scrambleCorrect, setScrambleCorrect] = useState('');

  // Information gap states
  const [infoGapScenario, setInfoGapScenario] = useState('');
  const [studentAInfo, setStudentAInfo] = useState('');
  const [studentBInfo, setStudentBInfo] = useState('');
  const [infoGapTarget, setInfoGapTarget] = useState('');

  // Role play states
  const [rolePlayScenario, setRolePlayScenario] = useState('');
  const [roles, setRoles] = useState<Array<{ name: string; description: string }>>([{ name: '', description: '' }]);
  const [rolePlayTarget, setRolePlayTarget] = useState('');
  const [rolePlayDuration, setRolePlayDuration] = useState<number | ''>('');

  // Collocation states
  const [collocations, setCollocations] = useState<Array<{ word: string; partners: string }>>([{ word: '', partners: '' }]);
  const [collocationFormat, setCollocationFormat] = useState<'match' | 'fill' | 'choose'>('match');

  // Lexical set states
  const [lexicalTopic, setLexicalTopic] = useState('');
  const [lexicalChunks, setLexicalChunks] = useState('');
  const [lexicalContext, setLexicalContext] = useState('');

  // Ordering states
  const [orderingItems, setOrderingItems] = useState('');
  const [orderingContext, setOrderingContext] = useState('');

  const resetForm = () => {
    setInstruction('');
    setGapFillText('');
    setGapAnswers('');
    setSortingItems('');
    setMatchingPairs([{ left: '', right: '' }]);
    setFreeTextPrompt('');
    setMcQuestion('');
    setMcOptions(['', '', '', '']);
    setMcCorrectAnswer(-1);
    setTfStatement('');
    setTfCorrectAnswer(undefined);
    setScrambleWords('');
    setScrambleCorrect('');
    setInfoGapScenario('');
    setStudentAInfo('');
    setStudentBInfo('');
    setInfoGapTarget('');
    setRolePlayScenario('');
    setRoles([{ name: '', description: '' }]);
    setRolePlayTarget('');
    setRolePlayDuration('');
    setCollocations([{ word: '', partners: '' }]);
    setCollocationFormat('match');
    setLexicalTopic('');
    setLexicalChunks('');
    setLexicalContext('');
    setOrderingItems('');
    setOrderingContext('');
  };

  const handleAddExercise = () => {
    let exercise: Exercise | null = null;

    switch (exerciseType) {
      case 'gap-fill':
        if (instruction && gapFillText) {
          exercise = {
            type: 'gap-fill',
            id: crypto.randomUUID(),
            instruction,
            text: gapFillText,
            answers: gapAnswers.split(',').map((a) => a.trim()).filter(Boolean),
          };
        }
        break;

      case 'sorting':
        if (instruction && sortingItems) {
          exercise = {
            type: 'sorting',
            id: crypto.randomUUID(),
            instruction,
            items: sortingItems.split('\n').map((i) => i.trim()).filter(Boolean),
          };
        }
        break;

      case 'matching':
        if (instruction && matchingPairs.some((p) => p.left && p.right)) {
          exercise = {
            type: 'matching',
            id: crypto.randomUUID(),
            instruction,
            pairs: matchingPairs.filter((p) => p.left && p.right),
          };
        }
        break;

      case 'free-text':
        if (instruction && freeTextPrompt) {
          exercise = {
            type: 'free-text',
            id: crypto.randomUUID(),
            instruction,
            prompt: freeTextPrompt,
          };
        }
        break;

      case 'multiple-choice':
        if (instruction && mcQuestion && mcOptions.some((opt) => opt.trim())) {
          exercise = {
            type: 'multiple-choice',
            id: crypto.randomUUID(),
            instruction,
            question: mcQuestion,
            options: mcOptions.filter((opt) => opt.trim()),
            correctAnswer: mcCorrectAnswer >= 0 ? mcCorrectAnswer : undefined,
          };
        }
        break;

      case 'true-false':
        if (instruction && tfStatement) {
          exercise = {
            type: 'true-false',
            id: crypto.randomUUID(),
            instruction,
            statement: tfStatement,
            correctAnswer: tfCorrectAnswer,
          };
        }
        break;

      case 'sentence-scramble':
        if (instruction && scrambleWords) {
          exercise = {
            type: 'sentence-scramble',
            id: crypto.randomUUID(),
            instruction,
            words: scrambleWords.split(' ').map((w) => w.trim()).filter(Boolean),
            correctSentence: scrambleCorrect || undefined,
          };
        }
        break;

      case 'information-gap':
        if (instruction && infoGapScenario && studentAInfo && studentBInfo) {
          exercise = {
            type: 'information-gap',
            id: crypto.randomUUID(),
            instruction,
            scenario: infoGapScenario,
            studentAInfo,
            studentBInfo,
            targetLanguage: infoGapTarget || undefined,
          };
        }
        break;

      case 'role-play':
        if (instruction && rolePlayScenario && roles.some((r) => r.name && r.description)) {
          exercise = {
            type: 'role-play',
            id: crypto.randomUUID(),
            instruction,
            scenario: rolePlayScenario,
            roles: roles.filter((r) => r.name && r.description),
            targetLanguage: rolePlayTarget || undefined,
            duration: rolePlayDuration ? Number(rolePlayDuration) : undefined,
          };
        }
        break;

      case 'collocation':
        if (instruction && collocations.some((c) => c.word && c.partners)) {
          exercise = {
            type: 'collocation',
            id: crypto.randomUUID(),
            instruction,
            collocations: collocations
              .filter((c) => c.word && c.partners)
              .map((c) => ({
                word: c.word,
                partners: c.partners.split(',').map((p) => p.trim()).filter(Boolean),
              })),
            exerciseFormat: collocationFormat,
          };
        }
        break;

      case 'lexical-set':
        if (instruction && lexicalTopic && lexicalChunks) {
          exercise = {
            type: 'lexical-set',
            id: crypto.randomUUID(),
            instruction,
            topic: lexicalTopic,
            chunks: lexicalChunks.split('\n').map((c) => c.trim()).filter(Boolean),
            context: lexicalContext || undefined,
          };
        }
        break;

      case 'ordering':
        if (instruction && orderingItems) {
          exercise = {
            type: 'ordering',
            id: crypto.randomUUID(),
            instruction,
            items: orderingItems.split('\n').map((i) => i.trim()).filter(Boolean),
            context: orderingContext || undefined,
          };
        }
        break;
    }

    if (exercise) {
      onAddExercise(exercise);
      resetForm();
    } else {
      alert(t.fillRequiredFields);
    }
  };

  const addMatchingPair = () => {
    setMatchingPairs([...matchingPairs, { left: '', right: '' }]);
  };

  const updateMatchingPair = (index: number, side: 'left' | 'right', value: string) => {
    const updated = [...matchingPairs];
    updated[index][side] = value;
    setMatchingPairs(updated);
  };

  const removeMatchingPair = (index: number) => {
    setMatchingPairs(matchingPairs.filter((_, i) => i !== index));
  };

  const updateMcOption = (index: number, value: string) => {
    const updated = [...mcOptions];
    updated[index] = value;
    setMcOptions(updated);
  };

  const addMcOption = () => {
    setMcOptions([...mcOptions, '']);
  };

  const removeMcOption = (index: number) => {
    if (mcOptions.length > 2) {
      setMcOptions(mcOptions.filter((_, i) => i !== index));
      if (mcCorrectAnswer === index) {
        setMcCorrectAnswer(-1);
      }
    }
  };

  const addRole = () => {
    setRoles([...roles, { name: '', description: '' }]);
  };

  const updateRole = (index: number, field: 'name' | 'description', value: string) => {
    const updated = [...roles];
    updated[index][field] = value;
    setRoles(updated);
  };

  const removeRole = (index: number) => {
    if (roles.length > 1) {
      setRoles(roles.filter((_, i) => i !== index));
    }
  };

  const addCollocationWord = () => {
    setCollocations([...collocations, { word: '', partners: '' }]);
  };

  const updateCollocation = (index: number, field: 'word' | 'partners', value: string) => {
    const updated = [...collocations];
    updated[index][field] = value;
    setCollocations(updated);
  };

  const removeCollocation = (index: number) => {
    if (collocations.length > 1) {
      setCollocations(collocations.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="exercise-builder">
      <div className="help-banner">
        <div className="help-banner-icon">✏️</div>
        <div className="help-banner-content">
          <h3>{language === 'en' ? 'Controlled Practice Exercises' : 'Вправи для контрольованої практики'}</h3>
          <p>
            {language === 'en'
              ? 'Create exercises where students practice the target language in a controlled way. Choose from 12 exercise types including gap-fills, multiple choice, matching, ordering, and communicative activities.'
              : 'Створюйте вправи, де учні практикують цільову мову контрольованим чином. Виберіть з 12 типів вправ, включаючи заповнення пропусків, множинний вибір, співставлення, впорядкування та комунікативні активності.'}
          </p>
        </div>
      </div>

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="exerciseType" className="required">
            {t.exerciseType}
          </label>
          <HelpIcon text={language === 'en' ? 'Choose the type of exercise that best fits your learning objectives' : 'Виберіть тип вправи, що найкраще відповідає вашим навчальним цілям'} />
        </div>
        <select id="exerciseType" value={exerciseType} onChange={(e) => setExerciseType(e.target.value as ExerciseType)}>
          <option value="gap-fill">{t.gapFill}</option>
          <option value="multiple-choice">{t.multipleChoice}</option>
          <option value="true-false">{t.trueFalse}</option>
          <option value="matching">{t.matching}</option>
          <option value="sorting">{t.sorting}</option>
          <option value="ordering">{t.ordering}</option>
          <option value="sentence-scramble">{t.sentenceScramble}</option>
          <option value="free-text">{t.freeText}</option>
          <option value="information-gap">{t.informationGap}</option>
          <option value="role-play">{t.rolePlay}</option>
          <option value="collocation">{t.collocation}</option>
          <option value="lexical-set">{t.lexicalSet}</option>
        </select>
        <div className="field-hint">
          {language === 'en'
            ? '📋 Select from 12 different exercise types based on your teaching goals'
            : '📋 Виберіть з 12 різних типів вправ на основі ваших навчальних цілей'}
        </div>
      </div>

      <div className="form-group">
        <div className="field-label-with-help">
          <label htmlFor="instruction" className="required">
            {t.instructionsForStudents}
          </label>
          <HelpIcon text={help.instruction} />
        </div>
        <input
          id="instruction"
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder={language === 'en' ? 'e.g., "Fill in the gaps with the correct form of the verb"' : 'напр., "Заповніть пропуски правильною формою дієслова"'}
        />
        <div className="field-hint">
          {language === 'en'
            ? '📝 Clear instructions help students understand what to do'
            : '📝 Чіткі інструкції допомагають учням зрозуміти, що робити'}
        </div>
      </div>

      {exerciseType === 'gap-fill' && (
        <>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="gapFillText" className="required">
                {t.textWithGaps}
              </label>
              <HelpIcon text={help.gapFill.text} />
            </div>
            <textarea
              id="gapFillText"
              value={gapFillText}
              onChange={(e) => setGapFillText(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "She ____ (work) in an office. He ____ (go) to school every day."'
                : 'напр., "Вона ____ (працювати) в офісі. Він ____ (йти) до школи щодня."'}
              rows={4}
            />
            <div className="field-hint example">
              <strong>{language === 'en' ? '💡 Tip:' : '💡 Порада:'}</strong> {t.gapsHint}
            </div>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="gapAnswers">
                {t.answersOptional}
              </label>
              <HelpIcon text={help.gapFill.answers} />
            </div>
            <input
              id="gapAnswers"
              type="text"
              value={gapAnswers}
              onChange={(e) => setGapAnswers(e.target.value)}
              placeholder={language === 'en' ? 'e.g., works, goes' : 'напр., працює, йде'}
            />
            <div className="field-hint">
              {language === 'en'
                ? '✓ Comma-separated list for answer key (optional)'
                : '✓ Список через кому для ключа відповідей (необов\'язково)'}
            </div>
          </div>
        </>
      )}

      {exerciseType === 'sorting' && (
        <div className="form-group">
          <div className="field-label-with-help">
            <label htmlFor="sortingItems" className="required">
              {t.itemsToSort}
            </label>
            <HelpIcon text={help.sorting.items} />
          </div>
          <textarea
            id="sortingItems"
            value={sortingItems}
            onChange={(e) => setSortingItems(e.target.value)}
            placeholder={language === 'en'
              ? 'e.g., "Category 1: apple, banana, orange | Category 2: carrot, broccoli, lettuce"'
              : 'напр., "Категорія 1: яблуко, банан, апельсин | Категорія 2: морква, брокколі, салат"'}
            rows={6}
          />
          <div className="field-hint example">
            <strong>{language === 'en' ? '💡 Tip:' : '💡 Порада:'}</strong> {t.sortingHint}
          </div>
        </div>
      )}

      {exerciseType === 'matching' && (
        <div className="form-group">
          <div className="field-label-with-help">
            <label className="required">{t.matchingPairs}</label>
            <HelpIcon text={help.matching.pairs} />
          </div>
          <div className="field-hint">
            {language === 'en'
              ? '🔗 Create pairs to match (e.g., words with definitions, questions with answers)'
              : '🔗 Створіть пари для співставлення (напр., слова з визначеннями, питання з відповідями)'}
          </div>
          {matchingPairs.map((pair, index) => (
            <div key={index} className="matching-pair" style={{ marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={pair.left}
                onChange={(e) => updateMatchingPair(index, 'left', e.target.value)}
                placeholder={language === 'en' ? 'Left item (e.g., word)' : 'Лівий елемент (напр., слово)'}
                style={{ marginRight: '0.5rem' }}
              />
              <span>↔</span>
              <input
                type="text"
                value={pair.right}
                onChange={(e) => updateMatchingPair(index, 'right', e.target.value)}
                placeholder={language === 'en' ? 'Right item (e.g., definition)' : 'Правий елемент (напр., визначення)'}
                style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
              />
              {matchingPairs.length > 1 && (
                <button onClick={() => removeMatchingPair(index)}>×</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addMatchingPair}>{t.addPair}</button>
        </div>
      )}

      {exerciseType === 'free-text' && (
        <div className="form-group">
          <div className="field-label-with-help">
            <label htmlFor="freeTextPrompt" className="required">
              {t.promptQuestion}
            </label>
            <HelpIcon text={help.freeText.prompt} />
          </div>
          <textarea
            id="freeTextPrompt"
            value={freeTextPrompt}
            onChange={(e) => setFreeTextPrompt(e.target.value)}
            placeholder={language === 'en'
              ? 'e.g., "Write about your last vacation. Where did you go? What did you do?"'
              : 'напр., "Напишіть про свої останні канікули. Куди ви поїхали? Що ви робили?"'}
            rows={4}
          />
          <div className="field-hint">
            {language === 'en'
              ? '✍️ Give students a clear topic or question to write about'
              : '✍️ Дайте учням чітку тему або питання для написання'}
          </div>
        </div>
      )}

      {exerciseType === 'multiple-choice' && (
        <>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="mcQuestion" className="required">
                {t.question}
              </label>
              <HelpIcon text={help.multipleChoice.question} />
            </div>
            <input
              id="mcQuestion"
              type="text"
              value={mcQuestion}
              onChange={(e) => setMcQuestion(e.target.value)}
              placeholder={language === 'en' ? 'e.g., "What is the correct past tense of go?"' : 'напр., "Який правильний минулий час слова йти?"'}
            />
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label className="required">{t.options}</label>
              <HelpIcon text={help.multipleChoice.options} />
            </div>
            {mcOptions.map((option, index) => (
              <div key={index} className="mc-option">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={mcCorrectAnswer === index}
                  onChange={() => setMcCorrectAnswer(index)}
                  title={t.markCorrectHint}
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateMcOption(index, e.target.value)}
                  placeholder={`${t.optionPlaceholder} ${index + 1}`}
                />
                {mcOptions.length > 2 && (
                  <button onClick={() => removeMcOption(index)}>×</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addMcOption}>{t.addOption}</button>
            <div className="field-hint">
              {language === 'en'
                ? '⭕ Click the radio button to mark the correct answer'
                : '⭕ Натисніть на кружок, щоб позначити правильну відповідь'}
            </div>
          </div>
        </>
      )}

      {exerciseType === 'true-false' && (
        <>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="tfStatement" className="required">
                {t.statement}
              </label>
              <HelpIcon text={help.trueFalse.statement} />
            </div>
            <textarea
              id="tfStatement"
              value={tfStatement}
              onChange={(e) => setTfStatement(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "English is spoken in more than 50 countries around the world."'
                : 'напр., "Англійська мова використовується в більш ніж 50 країнах світу."'}
              rows={3}
            />
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label className="required">{t.correctAnswer}</label>
              <HelpIcon text={help.trueFalse.correctAnswer} />
            </div>
            <div className="tf-options">
              <label>
                <input
                  type="radio"
                  name="tfAnswer"
                  checked={tfCorrectAnswer === true}
                  onChange={() => setTfCorrectAnswer(true)}
                />
                {t.trueLabel}
              </label>
              <label>
                <input
                  type="radio"
                  name="tfAnswer"
                  checked={tfCorrectAnswer === false}
                  onChange={() => setTfCorrectAnswer(false)}
                />
                {t.falseLabel}
              </label>
              <label>
                <input
                  type="radio"
                  name="tfAnswer"
                  checked={tfCorrectAnswer === undefined}
                  onChange={() => setTfCorrectAnswer(undefined)}
                />
                {t.noAnswerKey}
              </label>
            </div>
            <div className="field-hint">
              {language === 'en'
                ? '✓ Select whether the statement is True or False, or leave without answer key'
                : '✓ Виберіть, чи є твердження Правдою чи Неправдою, або залиште без ключа відповідей'}
            </div>
          </div>
        </>
      )}

      {exerciseType === 'sentence-scramble' && (
        <>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="scrambleWords" className="required">
                {t.wordsToArrange}
              </label>
              <HelpIcon text={help.sentenceScramble.words} />
            </div>
            <input
              id="scrambleWords"
              type="text"
              value={scrambleWords}
              onChange={(e) => setScrambleWords(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "always / I / coffee / drink / morning / the / in"'
                : 'напр., "завжди / я / каву / п\'ю / ранку / вранці"'}
            />
            <div className="field-hint example">
              <strong>{language === 'en' ? '💡 Tip:' : '💡 Порада:'}</strong> {t.scrambleHint}
            </div>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="scrambleCorrect">
                {t.correctSentence}
              </label>
              <HelpIcon text={help.sentenceScramble.correctSentence} />
            </div>
            <input
              id="scrambleCorrect"
              type="text"
              value={scrambleCorrect}
              onChange={(e) => setScrambleCorrect(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "I always drink coffee in the morning"'
                : 'напр., "Я завжди п\'ю каву вранці"'}
            />
            <div className="field-hint">
              {language === 'en'
                ? '✓ Optional: provide the answer key for teachers'
                : '✓ Необов\'язково: надайте ключ відповідей для вчителів'}
            </div>
          </div>
        </>
      )}

      {exerciseType === 'information-gap' && (
        <>
          <div className="section-help">
            <p>
              {language === 'en'
                ? '💬 Information gap activities require students to communicate to complete a task. Each student has different information that they need to share.'
                : '💬 Вправи на інформаційний розрив вимагають від учнів спілкування для виконання завдання. Кожен учень має різну інформацію, якою потрібно поділитися.'}
            </p>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="infoGapScenario" className="required">
                {t.scenario}
              </label>
              <HelpIcon text={help.informationGap.scenario} />
            </div>
            <textarea
              id="infoGapScenario"
              value={infoGapScenario}
              onChange={(e) => setInfoGapScenario(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "You are planning a weekend trip together. Find a time that works for both of you."'
                : 'напр., "Ви плануєте спільну поїздку на вихідні. Знайдіть час, який підходить обом."'}
              rows={3}
            />
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="studentAInfo" className="required">
                {t.studentAInfo}
              </label>
              <HelpIcon text={help.informationGap.studentAInfo} />
            </div>
            <textarea
              id="studentAInfo"
              value={studentAInfo}
              onChange={(e) => setStudentAInfo(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "You are free: Saturday morning, Sunday afternoon. You are busy: Friday evening, Saturday afternoon."'
                : 'напр., "Ви вільні: субота ранок, неділя після обіду. Ви зайняті: п\'ятниця вечір, субота після обіду."'}
              rows={4}
            />
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="studentBInfo" className="required">
                {t.studentBInfo}
              </label>
              <HelpIcon text={help.informationGap.studentBInfo} />
            </div>
            <textarea
              id="studentBInfo"
              value={studentBInfo}
              onChange={(e) => setStudentBInfo(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "You are free: Friday evening, Sunday afternoon. You are busy: Saturday all day."'
                : 'напр., "Ви вільні: п\'ятниця вечір, неділя після обіду. Ви зайняті: субота весь день."'}
              rows={4}
            />
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="infoGapTarget">
                {t.targetLanguageOptional}
              </label>
              <HelpIcon text={help.informationGap.prompts} />
            </div>
            <textarea
              id="infoGapTarget"
              value={infoGapTarget}
              onChange={(e) => setInfoGapTarget(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "Practice making suggestions: How about...? What about...? I\'m afraid I can\'t..."'
                : 'напр., "Практика пропозицій: Як щодо...? А що насправді...? Боюся, що не можу..."'}
              rows={2}
            />
            <div className="field-hint">
              {language === 'en'
                ? '🎯 Optional: specify which language functions students should practice'
                : '🎯 Необов\'язково: вкажіть, які мовні функції учні повинні практикувати'}
            </div>
          </div>
        </>
      )}

      {exerciseType === 'role-play' && (
        <>
          <div className="section-help">
            <p>
              {language === 'en'
                ? '🎭 Role-play allows students to practice real-life situations. Students act out a scenario using the target language in a creative, communicative way.'
                : '🎭 Рольова гра дозволяє учням практикувати реальні ситуації. Учні розігрують сценарій, використовуючи цільову мову творчим, комунікативним способом.'}
            </p>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="rolePlayScenario" className="required">
                {t.rolePlayScenario}
              </label>
              <HelpIcon text={help.rolePlay.scenario} />
            </div>
            <textarea
              id="rolePlayScenario"
              value={rolePlayScenario}
              onChange={(e) => setRolePlayScenario(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "You are at a doctor\'s office. One student is the doctor, the other is the patient."'
                : 'напр., "Ви в кабінеті лікаря. Один учень - лікар, інший - пацієнт."'}
              rows={3}
            />
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label className="required">{t.roles}</label>
              <HelpIcon text={help.rolePlay.roles} />
            </div>
            <div className="field-hint">
              {language === 'en'
                ? '👥 Define at least 2 roles with clear descriptions of what each person should do'
                : '👥 Визначте принаймні 2 ролі з чіткими описами того, що має робити кожна людина'}
            </div>
            {roles.map((role, index) => (
              <div key={index} className="role-input" style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
                <input
                  type="text"
                  value={role.name}
                  onChange={(e) => updateRole(index, 'name', e.target.value)}
                  placeholder={language === 'en' ? 'Role name (e.g., Doctor, Patient)' : 'Назва ролі (напр., Лікар, Пацієнт)'}
                  style={{ marginBottom: '5px', width: '100%' }}
                />
                <textarea
                  value={role.description}
                  onChange={(e) => updateRole(index, 'description', e.target.value)}
                  placeholder={language === 'en'
                    ? 'What should this person do? (e.g., "Ask about the patient\'s symptoms and give advice")'
                    : 'Що має робити ця людина? (напр., "Запитайте про симптоми пацієнта та дайте пораду")'}
                  rows={2}
                  style={{ width: '100%' }}
                />
                {roles.length > 1 && (
                  <button onClick={() => removeRole(index)} style={{ marginTop: '5px' }}>× {t.remove || 'Remove'}</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addRole}>{t.addRole}</button>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="rolePlayTarget">
                {t.targetLanguageOptional}
              </label>
              <HelpIcon text={help.rolePlay.targetLanguage} />
            </div>
            <textarea
              id="rolePlayTarget"
              value={rolePlayTarget}
              onChange={(e) => setRolePlayTarget(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "Practice giving advice: You should... Why don\'t you...?"'
                : 'напр., "Практика надання порад: Вам слід... Чому б вам не...?"'}
              rows={2}
            />
            <div className="field-hint">
              {language === 'en'
                ? '🎯 Optional: specify the language focus (e.g., making complaints, giving directions)'
                : '🎯 Необов\'язково: вкажіть мовний фокус (напр., скарги, надання вказівок)'}
            </div>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="rolePlayDuration">
                {t.suggestedDuration}
              </label>
              <HelpIcon text={help.rolePlay.duration} />
            </div>
            <input
              id="rolePlayDuration"
              type="number"
              min="1"
              value={rolePlayDuration}
              onChange={(e) => setRolePlayDuration(e.target.value ? parseInt(e.target.value) : '')}
              placeholder={language === 'en' ? 'e.g., 5-10 minutes' : 'напр., 5-10 хвилин'}
            />
            <div className="field-hint">
              {language === 'en'
                ? '⏱️ How long should students perform the role-play?'
                : '⏱️ Скільки часу учні повинні виконувати рольову гру?'}
            </div>
          </div>
        </>
      )}

      {exerciseType === 'collocation' && (
        <>
          <div className="section-help">
            <p>
              {language === 'en'
                ? '🔗 Collocations are words that naturally go together in a language. Teaching collocations helps students sound more natural and fluent (e.g., "make a mistake" not "do a mistake").'
                : '🔗 Колокації - це слова, які природно поєднуються в мові. Навчання колокаціям допомагає учням звучати більш природно та вільно (напр., "зробити помилку", "сильний дощ").'}
            </p>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label className="required">{t.collocationWord}</label>
              <HelpIcon text={help.collocation.word} />
            </div>
            <div className="field-hint">
              {language === 'en'
                ? '📝 Add base words and their common partners (e.g., "make" goes with "a decision", "a mistake", "progress")'
                : '📝 Додайте базові слова та їх звичайних партнерів (напр., "робити" поєднується з "помилку", "зусилля", "прогрес")'}
            </div>
            {collocations.map((collocation, index) => (
              <div key={index} className="collocation-input" style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
                <input
                  type="text"
                  value={collocation.word}
                  onChange={(e) => updateCollocation(index, 'word', e.target.value)}
                  placeholder={language === 'en' ? 'Base word (e.g., "make", "strong", "heavy")' : 'Базове слово (напр., "робити", "сильний", "важкий")'}
                  style={{ marginBottom: '5px', width: '100%' }}
                />
                <input
                  type="text"
                  value={collocation.partners}
                  onChange={(e) => updateCollocation(index, 'partners', e.target.value)}
                  placeholder={language === 'en'
                    ? 'Partners separated by commas (e.g., "a decision, a mistake, progress")'
                    : 'Партнери через кому (напр., "рішення, помилку, прогрес")'}
                  style={{ width: '100%' }}
                />
                {collocations.length > 1 && (
                  <button type="button" onClick={() => removeCollocation(index)} style={{ marginTop: '5px' }}>×</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addCollocationWord}>{t.addCollocation}</button>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label>{t.exerciseFormat}</label>
              <HelpIcon text={help.collocation.exerciseFormat} />
            </div>
            <select value={collocationFormat} onChange={(e) => setCollocationFormat(e.target.value as 'match' | 'fill' | 'choose')}>
              <option value="match">{t.formatMatch}</option>
              <option value="fill">{t.formatFill}</option>
              <option value="choose">{t.formatChoose}</option>
            </select>
            <div className="field-hint">
              {language === 'en'
                ? '🎯 Match = pair words together | Fill = complete sentences | Choose = select correct partner'
                : '🎯 Match = з\'єднати слова | Fill = заповнити речення | Choose = вибрати правильного партнера'}
            </div>
          </div>
        </>
      )}

      {exerciseType === 'lexical-set' && (
        <>
          <div className="section-help">
            <p>
              {language === 'en'
                ? '📦 Lexical sets are groups of words and phrases related to a specific topic or theme. The Lexical Approach emphasizes learning chunks and phrases, not just individual words.'
                : '📦 Лексичні набори - це групи слів і фраз, пов\'язаних з певною темою. Лексичний підхід наголошує на вивченні сталих виразів і фраз, а не лише окремих слів.'}
            </p>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="lexicalTopic" className="required">{t.topic}</label>
              <HelpIcon text={help.lexicalSet.topic} />
            </div>
            <input
              id="lexicalTopic"
              type="text"
              value={lexicalTopic}
              onChange={(e) => setLexicalTopic(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "Weather", "Business meetings", "Restaurant language"'
                : 'напр., "Погода", "Ділові зустрічі", "Ресторанна лексика"'}
            />
            <div className="field-hint">
              {language === 'en'
                ? '🎯 Choose a clear topic that students can relate to and use in real situations'
                : '🎯 Оберіть чітку тему, до якої учні можуть мати відношення та використовувати в реальних ситуаціях'}
            </div>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="lexicalChunks" className="required">{t.lexicalChunks}</label>
              <HelpIcon text={help.lexicalSet.chunks} />
            </div>
            <textarea
              id="lexicalChunks"
              value={lexicalChunks}
              onChange={(e) => setLexicalChunks(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "It\'s pouring down\nout of the blue\nheavy rain\npartly cloudy\nbreeze picks up"'
                : 'напр., "ллє як з відра\nяк грім серед ясного неба\nсильний дощ\nхмарно з проясненнями"'}
              rows={8}
            />
            <div className="field-hint example">
              <strong>{language === 'en' ? '💡 Important:' : '💡 Важливо:'}</strong> {t.chunksHint || (language === 'en'
                ? 'Enter multi-word chunks and phrases, one per line. Focus on expressions that go together naturally.'
                : 'Вводьте багатослівні вирази та фрази, по одному на рядок. Зосередьтеся на виразах, що природно поєднуються.')}
            </div>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="lexicalContext">{t.contextOptional}</label>
              <HelpIcon text={help.lexicalSet.context} />
            </div>
            <textarea
              id="lexicalContext"
              value={lexicalContext}
              onChange={(e) => setLexicalContext(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "Use these expressions when describing weather conditions or talking about unexpected events"'
                : 'напр., "Використовуйте ці вирази, описуючи погодні умови або розповідаючи про несподівані події"'}
              rows={3}
            />
            <div className="field-hint">
              {language === 'en'
                ? '📝 Help students understand when and where to use these expressions'
                : '📝 Допоможіть учням зрозуміти, коли і де використовувати ці вирази'}
            </div>
          </div>
        </>
      )}

      {exerciseType === 'ordering' && (
        <>
          <div className="section-help">
            <p>
              {language === 'en'
                ? '🔢 Ordering exercises help students practice sequencing and logical thinking. Students arrange items in the correct order - perfect for processes, timelines, instructions, or story sequences.'
                : '🔢 Вправи на впорядкування допомагають учням практикувати послідовність і логічне мислення. Учні розставляють елементи в правильному порядку - ідеально для процесів, часових шкал, інструкцій або послідовностей подій.'}
            </p>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="orderingItems" className="required">
                {language === 'en' ? 'Items to Order' : 'Елементи для впорядкування'}
              </label>
              <HelpIcon text={language === 'en'
                ? 'Enter items that students need to arrange in the correct sequence. One item per line.'
                : 'Введіть елементи, які учні мають розташувати в правильній послідовності. Один елемент на рядок.'} />
            </div>
            <textarea
              id="orderingItems"
              value={orderingItems}
              onChange={(e) => setOrderingItems(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "First, heat the water\nThen, add the tea bag\nWait for 3 minutes\nFinally, remove the tea bag and enjoy"'
                : 'напр., "Спочатку нагрійте воду\nПотім додайте чайний пакетик\nПочекайте 3 хвилини\nНарешті, вийміть пакетик і насолоджуйтесь"'}
              rows={8}
            />
            <div className="field-hint example">
              <strong>{language === 'en' ? '💡 Tip:' : '💡 Порада:'}</strong> {language === 'en'
                ? 'Enter items in the CORRECT order, one per line. The app will scramble them for students.'
                : 'Введіть елементи в ПРАВИЛЬНОМУ порядку, по одному на рядок. Додаток переплутає їх для учнів.'}
            </div>
          </div>
          <div className="form-group">
            <div className="field-label-with-help">
              <label htmlFor="orderingContext">
                {language === 'en' ? 'Context (Optional)' : 'Контекст (Необов\'язково)'}
              </label>
              <HelpIcon text={language === 'en'
                ? 'Provide additional context or scenario to help students understand the task'
                : 'Надайте додатковий контекст або сценарій, щоб допомогти учням зрозуміти завдання'} />
            </div>
            <input
              id="orderingContext"
              type="text"
              value={orderingContext}
              onChange={(e) => setOrderingContext(e.target.value)}
              placeholder={language === 'en'
                ? 'e.g., "How to make tea", "Steps in a job interview", "Daily routine"'
                : 'напр., "Як заварити чай", "Етапи співбесіди", "Щоденна рутина"'}
            />
            <div className="field-hint">
              {language === 'en'
                ? '📝 Help students understand the scenario or topic being sequenced'
                : '📝 Допоможіть учням зрозуміти сценарій або тему, яку впорядковують'}
            </div>
          </div>
        </>
      )}

      <button className="add-exercise-btn" onClick={handleAddExercise}>
        {t.addExercise}
      </button>
    </div>
  );
}
