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
              ? 'Create exercises where students practice the target language in a controlled way. Choose from 11 exercise types including gap-fills, multiple choice, matching, and communicative activities.'
              : 'Створюйте вправи, де учні практикують цільову мову контрольованим чином. Виберіть з 11 типів вправ, включаючи заповнення пропусків, множинний вибір, співставлення та комунікативні активності.'}
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
          <option value="sentence-scramble">{t.sentenceScramble}</option>
          <option value="free-text">{t.freeText}</option>
          <option value="information-gap">{t.informationGap}</option>
          <option value="role-play">{t.rolePlay}</option>
          <option value="collocation">{t.collocation}</option>
          <option value="lexical-set">{t.lexicalSet}</option>
        </select>
        <div className="field-hint">
          {language === 'en'
            ? '📋 Select from 11 different exercise types based on your teaching goals'
            : '📋 Виберіть з 11 різних типів вправ на основі ваших навчальних цілей'}
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
          <label>{t.promptQuestion}</label>
          <textarea
            value={freeTextPrompt}
            onChange={(e) => setFreeTextPrompt(e.target.value)}
            placeholder={t.promptPlaceholder}
            rows={4}
          />
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
            <label>{t.wordsToArrange}</label>
            <input
              type="text"
              value={scrambleWords}
              onChange={(e) => setScrambleWords(e.target.value)}
              placeholder={t.wordsPlaceholder}
            />
            <small>{t.scrambleHint}</small>
          </div>
          <div className="form-group">
            <label>{t.correctSentence}</label>
            <input
              type="text"
              value={scrambleCorrect}
              onChange={(e) => setScrambleCorrect(e.target.value)}
              placeholder={t.correctSentencePlaceholder}
            />
            <small>{t.correctSentenceHint}</small>
          </div>
        </>
      )}

      {exerciseType === 'information-gap' && (
        <>
          <div className="form-group">
            <label>{t.scenario}</label>
            <textarea
              value={infoGapScenario}
              onChange={(e) => setInfoGapScenario(e.target.value)}
              placeholder={t.scenarioPlaceholder}
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>{t.studentAInfo}</label>
            <textarea
              value={studentAInfo}
              onChange={(e) => setStudentAInfo(e.target.value)}
              placeholder={t.studentAInfoPlaceholder}
              rows={4}
            />
          </div>
          <div className="form-group">
            <label>{t.studentBInfo}</label>
            <textarea
              value={studentBInfo}
              onChange={(e) => setStudentBInfo(e.target.value)}
              placeholder={t.studentBInfoPlaceholder}
              rows={4}
            />
          </div>
          <div className="form-group">
            <label>{t.targetLanguageOptional}</label>
            <textarea
              value={infoGapTarget}
              onChange={(e) => setInfoGapTarget(e.target.value)}
              placeholder={t.infoGapTargetPlaceholder}
              rows={2}
            />
          </div>
        </>
      )}

      {exerciseType === 'role-play' && (
        <>
          <div className="form-group">
            <label>{t.rolePlayScenario}</label>
            <textarea
              value={rolePlayScenario}
              onChange={(e) => setRolePlayScenario(e.target.value)}
              placeholder={t.rolePlayScenarioPlaceholder}
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>{t.roles}</label>
            {roles.map((role, index) => (
              <div key={index} className="role-input">
                <input
                  type="text"
                  value={role.name}
                  onChange={(e) => updateRole(index, 'name', e.target.value)}
                  placeholder={t.roleName}
                  style={{ marginBottom: '5px' }}
                />
                <textarea
                  value={role.description}
                  onChange={(e) => updateRole(index, 'description', e.target.value)}
                  placeholder={t.roleDescription}
                  rows={2}
                />
                {roles.length > 1 && (
                  <button onClick={() => removeRole(index)}>×</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addRole}>{t.addRole}</button>
          </div>
          <div className="form-group">
            <label>{t.targetLanguageOptional}</label>
            <textarea
              value={rolePlayTarget}
              onChange={(e) => setRolePlayTarget(e.target.value)}
              placeholder={t.infoGapTargetPlaceholder}
              rows={2}
            />
          </div>
          <div className="form-group">
            <label>{t.suggestedDuration}</label>
            <input
              type="number"
              min="1"
              value={rolePlayDuration}
              onChange={(e) => setRolePlayDuration(e.target.value ? parseInt(e.target.value) : '')}
              placeholder={t.durationPlaceholder}
            />
          </div>
        </>
      )}

      {exerciseType === 'collocation' && (
        <>
          <div className="form-group">
            <label>{t.collocationWord}</label>
            {collocations.map((collocation, index) => (
              <div key={index} className="collocation-input" style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  value={collocation.word}
                  onChange={(e) => updateCollocation(index, 'word', e.target.value)}
                  placeholder={t.collocationWord}
                  style={{ marginBottom: '5px' }}
                />
                <input
                  type="text"
                  value={collocation.partners}
                  onChange={(e) => updateCollocation(index, 'partners', e.target.value)}
                  placeholder={t.collocationPartnersPlaceholder}
                />
                {collocations.length > 1 && (
                  <button onClick={() => removeCollocation(index)}>×</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addCollocationWord}>{t.addCollocation}</button>
          </div>
          <div className="form-group">
            <label>{t.exerciseFormat}</label>
            <select value={collocationFormat} onChange={(e) => setCollocationFormat(e.target.value as 'match' | 'fill' | 'choose')}>
              <option value="match">{t.formatMatch}</option>
              <option value="fill">{t.formatFill}</option>
              <option value="choose">{t.formatChoose}</option>
            </select>
          </div>
        </>
      )}

      {exerciseType === 'lexical-set' && (
        <>
          <div className="form-group">
            <label>{t.topic}</label>
            <input
              type="text"
              value={lexicalTopic}
              onChange={(e) => setLexicalTopic(e.target.value)}
              placeholder={t.topicPlaceholder}
            />
          </div>
          <div className="form-group">
            <label>{t.lexicalChunks}</label>
            <textarea
              value={lexicalChunks}
              onChange={(e) => setLexicalChunks(e.target.value)}
              placeholder={t.chunksPlaceholder}
              rows={8}
            />
            <small>{t.chunksHint}</small>
          </div>
          <div className="form-group">
            <label>{t.contextOptional}</label>
            <textarea
              value={lexicalContext}
              onChange={(e) => setLexicalContext(e.target.value)}
              placeholder={t.contextPlaceholder}
              rows={3}
            />
          </div>
        </>
      )}

      <button className="add-exercise-btn" onClick={handleAddExercise}>
        {t.addExercise}
      </button>
    </div>
  );
}
