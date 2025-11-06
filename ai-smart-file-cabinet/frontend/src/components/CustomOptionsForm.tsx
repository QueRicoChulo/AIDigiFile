import React from 'react';
import { useConfig } from '../contexts/ConfigContext';

const CustomOptionsForm: React.FC<{ onNext?: () => void; onBack?: () => void }> = ({ onNext, onBack }) => {
  const { config, setConfig } = useConfig();
  const [entries, setEntries] = React.useState<Array<{ k: string; v: string }>>(
    Object.entries(config.customOptions || {}).map(([k, v]) => ({ k, v })) || []
  );

  const addEntry = () => setEntries(prev => [...prev, { k: '', v: '' }]);
  const updateEntry = (idx: number, field: 'k' | 'v', val: string) =>
    setEntries(prev => prev.map((e, i) => (i === idx ? { ...e, [field]: val } : e)));
  const removeEntry = (idx: number) => setEntries(prev => prev.filter((_, i) => i !== idx));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const obj: Record<string, string> = {};
    entries.forEach(({ k, v }) => {
      if (k) obj[k] = v;
    });
    setConfig({ customOptions: obj });
    onNext && onNext();
  };

  return (
    <form onSubmit={submit}>
      <h3>Custom Options</h3>
      {entries.map((entry, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
          <input
            placeholder="key"
            value={entry.k}
            onChange={e => updateEntry(i, 'k', e.target.value)}
          />
          <input
            placeholder="value"
            value={entry.v}
            onChange={e => updateEntry(i, 'v', e.target.value)}
          />
          <button type="button" onClick={() => removeEntry(i)}>
            Remove
          </button>
        </div>
      ))}

      <div>
        <button type="button" onClick={addEntry}>
          Add Option
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default CustomOptionsForm;
