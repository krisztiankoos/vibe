import type { CEFRLevel } from '../types';
import type { Language } from '../translations';
import { getTranslation } from '../translations';

interface CEFRLevelSelectorProps {
  value?: CEFRLevel;
  onChange: (level: CEFRLevel | undefined) => void;
  language: Language;
}

export default function CEFRLevelSelector({ value, onChange, language }: CEFRLevelSelectorProps) {
  const t = getTranslation(language);

  const levels: (CEFRLevel | 'none')[] = ['none', 'A1', 'A2', 'B1', 'B2', 'C1'];

  const getLevelLabel = (level: CEFRLevel | 'none'): string => {
    if (level === 'none') return t.cefrLevelOptional;
    switch (level) {
      case 'A1': return t.cefrA1;
      case 'A2': return t.cefrA2;
      case 'B1': return t.cefrB1;
      case 'B2': return t.cefrB2;
      case 'C1': return t.cefrC1;
    }
  };

  return (
    <div className="form-group">
      <label>{t.cefrLevel}</label>
      <select
        value={value || 'none'}
        onChange={(e) => {
          const selectedValue = e.target.value;
          onChange(selectedValue === 'none' ? undefined : selectedValue as CEFRLevel);
        }}
      >
        {levels.map((level) => (
          <option key={level} value={level}>
            {getLevelLabel(level)}
          </option>
        ))}
      </select>
    </div>
  );
}
