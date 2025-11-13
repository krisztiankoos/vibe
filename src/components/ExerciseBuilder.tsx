import { useState } from 'react';
import type { Exercise, ExerciseType } from '../types';
import type { Language } from '../translations';
import { getTranslation } from '../translations';

interface ExerciseBuilderProps {
  onAddExercise: (exercise: Exercise) => void;
  language: Language;
}

export default function ExerciseBuilder({ onAddExercise, language }: ExerciseBuilderProps) {
  const t = getTranslation(language);
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

  return (
    <div className="exercise-builder">
      <h3>{t.addExercise}</h3>

      <div className="form-group">
        <label>{t.exerciseType}</label>
        <select value={exerciseType} onChange={(e) => setExerciseType(e.target.value as ExerciseType)}>
          <option value="gap-fill">{t.gapFill}</option>
          <option value="multiple-choice">{t.multipleChoice}</option>
          <option value="true-false">{t.trueFalse}</option>
          <option value="matching">{t.matching}</option>
          <option value="sorting">{t.sorting}</option>
          <option value="sentence-scramble">{t.sentenceScramble}</option>
          <option value="free-text">{t.freeText}</option>
        </select>
      </div>

      <div className="form-group">
        <label>{t.instructionsForStudents}</label>
        <input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder={t.instructionsPlaceholder}
        />
      </div>

      {exerciseType === 'gap-fill' && (
        <>
          <div className="form-group">
            <label>{t.textWithGaps}</label>
            <textarea
              value={gapFillText}
              onChange={(e) => setGapFillText(e.target.value)}
              placeholder={t.textWithGapsPlaceholder}
              rows={4}
            />
            <small>{t.gapsHint}</small>
          </div>
          <div className="form-group">
            <label>{t.answersOptional}</label>
            <input
              type="text"
              value={gapAnswers}
              onChange={(e) => setGapAnswers(e.target.value)}
              placeholder={t.answersPlaceholder}
            />
          </div>
        </>
      )}

      {exerciseType === 'sorting' && (
        <div className="form-group">
          <label>{t.itemsToSort}</label>
          <textarea
            value={sortingItems}
            onChange={(e) => setSortingItems(e.target.value)}
            placeholder={t.sortingPlaceholder}
            rows={6}
          />
          <small>{t.sortingHint}</small>
        </div>
      )}

      {exerciseType === 'matching' && (
        <div className="form-group">
          <label>{t.matchingPairs}</label>
          {matchingPairs.map((pair, index) => (
            <div key={index} className="matching-pair">
              <input
                type="text"
                value={pair.left}
                onChange={(e) => updateMatchingPair(index, 'left', e.target.value)}
                placeholder={t.leftItem}
              />
              <span>↔</span>
              <input
                type="text"
                value={pair.right}
                onChange={(e) => updateMatchingPair(index, 'right', e.target.value)}
                placeholder={t.rightItem}
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
            <label>{t.question}</label>
            <input
              type="text"
              value={mcQuestion}
              onChange={(e) => setMcQuestion(e.target.value)}
              placeholder={t.questionPlaceholder}
            />
          </div>
          <div className="form-group">
            <label>{t.options}</label>
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
            <small>{t.markCorrectHint}</small>
          </div>
        </>
      )}

      {exerciseType === 'true-false' && (
        <>
          <div className="form-group">
            <label>{t.statement}</label>
            <textarea
              value={tfStatement}
              onChange={(e) => setTfStatement(e.target.value)}
              placeholder={t.statementPlaceholder}
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>{t.correctAnswer}</label>
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

      <button className="add-exercise-btn" onClick={handleAddExercise}>
        {t.addExercise}
      </button>
    </div>
  );
}
