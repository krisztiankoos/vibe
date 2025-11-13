import { useState } from 'react';
import type { Exercise, ExerciseType } from '../types';

interface ExerciseBuilderProps {
  onAddExercise: (exercise: Exercise) => void;
}

export default function ExerciseBuilder({ onAddExercise }: ExerciseBuilderProps) {
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
      alert('Please fill in all required fields');
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
      <h3>Add Exercise</h3>

      <div className="form-group">
        <label>Exercise Type</label>
        <select value={exerciseType} onChange={(e) => setExerciseType(e.target.value as ExerciseType)}>
          <option value="gap-fill">Gap Fill</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="true-false">True/False</option>
          <option value="matching">Matching</option>
          <option value="sorting">Sorting</option>
          <option value="sentence-scramble">Sentence Scramble</option>
          <option value="free-text">Free Text / Production</option>
        </select>
      </div>

      <div className="form-group">
        <label>Instructions for Students</label>
        <input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="e.g., Complete the sentences with the correct form of the verb"
        />
      </div>

      {exerciseType === 'gap-fill' && (
        <>
          <div className="form-group">
            <label>Text with Gaps</label>
            <textarea
              value={gapFillText}
              onChange={(e) => setGapFillText(e.target.value)}
              placeholder="Write text and use [brackets] for gaps, e.g., I [have been] to Paris."
              rows={4}
            />
            <small>Use [brackets] to mark where gaps should appear</small>
          </div>
          <div className="form-group">
            <label>Answers (comma-separated, optional)</label>
            <input
              type="text"
              value={gapAnswers}
              onChange={(e) => setGapAnswers(e.target.value)}
              placeholder="have been, has gone, etc."
            />
          </div>
        </>
      )}

      {exerciseType === 'sorting' && (
        <div className="form-group">
          <label>Items to Sort (one per line)</label>
          <textarea
            value={sortingItems}
            onChange={(e) => setSortingItems(e.target.value)}
            placeholder="Enter items, one per line"
            rows={6}
          />
          <small>Students will need to arrange these in the correct order</small>
        </div>
      )}

      {exerciseType === 'matching' && (
        <div className="form-group">
          <label>Matching Pairs</label>
          {matchingPairs.map((pair, index) => (
            <div key={index} className="matching-pair">
              <input
                type="text"
                value={pair.left}
                onChange={(e) => updateMatchingPair(index, 'left', e.target.value)}
                placeholder="Left item"
              />
              <span>↔</span>
              <input
                type="text"
                value={pair.right}
                onChange={(e) => updateMatchingPair(index, 'right', e.target.value)}
                placeholder="Right item"
              />
              {matchingPairs.length > 1 && (
                <button onClick={() => removeMatchingPair(index)}>×</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addMatchingPair}>Add Pair</button>
        </div>
      )}

      {exerciseType === 'free-text' && (
        <div className="form-group">
          <label>Prompt / Question</label>
          <textarea
            value={freeTextPrompt}
            onChange={(e) => setFreeTextPrompt(e.target.value)}
            placeholder="e.g., Write about a memorable experience from your past..."
            rows={4}
          />
        </div>
      )}

      {exerciseType === 'multiple-choice' && (
        <>
          <div className="form-group">
            <label>Question</label>
            <input
              type="text"
              value={mcQuestion}
              onChange={(e) => setMcQuestion(e.target.value)}
              placeholder="e.g., Which sentence is correct?"
            />
          </div>
          <div className="form-group">
            <label>Options</label>
            {mcOptions.map((option, index) => (
              <div key={index} className="mc-option">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={mcCorrectAnswer === index}
                  onChange={() => setMcCorrectAnswer(index)}
                  title="Mark as correct answer"
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateMcOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                {mcOptions.length > 2 && (
                  <button onClick={() => removeMcOption(index)}>×</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addMcOption}>Add Option</button>
            <small>Click the radio button to mark the correct answer (optional)</small>
          </div>
        </>
      )}

      {exerciseType === 'true-false' && (
        <>
          <div className="form-group">
            <label>Statement</label>
            <textarea
              value={tfStatement}
              onChange={(e) => setTfStatement(e.target.value)}
              placeholder="e.g., The present perfect tense is used to describe completed actions."
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Correct Answer (optional)</label>
            <div className="tf-options">
              <label>
                <input
                  type="radio"
                  name="tfAnswer"
                  checked={tfCorrectAnswer === true}
                  onChange={() => setTfCorrectAnswer(true)}
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name="tfAnswer"
                  checked={tfCorrectAnswer === false}
                  onChange={() => setTfCorrectAnswer(false)}
                />
                False
              </label>
              <label>
                <input
                  type="radio"
                  name="tfAnswer"
                  checked={tfCorrectAnswer === undefined}
                  onChange={() => setTfCorrectAnswer(undefined)}
                />
                No answer key
              </label>
            </div>
          </div>
        </>
      )}

      {exerciseType === 'sentence-scramble' && (
        <>
          <div className="form-group">
            <label>Words (space-separated)</label>
            <input
              type="text"
              value={scrambleWords}
              onChange={(e) => setScrambleWords(e.target.value)}
              placeholder="e.g., been have I Paris to"
            />
            <small>Enter words separated by spaces. They will be presented in random order to students.</small>
          </div>
          <div className="form-group">
            <label>Correct Sentence (optional)</label>
            <input
              type="text"
              value={scrambleCorrect}
              onChange={(e) => setScrambleCorrect(e.target.value)}
              placeholder="e.g., I have been to Paris"
            />
            <small>Enter the correct sentence for your reference</small>
          </div>
        </>
      )}

      <button className="add-exercise-btn" onClick={handleAddExercise}>
        Add Exercise
      </button>
    </div>
  );
}
