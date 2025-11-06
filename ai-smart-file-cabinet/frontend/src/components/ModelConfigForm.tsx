import React from 'react';
import { useConfig } from '../contexts/ConfigContext';
import { SUPPORTED_MODELS, validateModelApiUrl } from '../services/models';

const ModelConfigForm: React.FC<{ onNext?: () => void }> = ({ onNext }) => {
  const { config, setConfig } = useConfig();
  const [error, setError] = React.useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateModelApiUrl(config.modelApiUrl)) {
      setError('Please provide a valid model API URL.');
      return;
    }
    setError(null);
    onNext && onNext();
  };

  return (
    <form onSubmit={submit}>
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block' }}>Model API URL</label>
        <input
          style={{ width: '100%' }}
          value={config.modelApiUrl}
          onChange={e => setConfig({ modelApiUrl: e.target.value })}
          placeholder="https://api.example.com/v1"
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block' }}>Model Type</label>
        <select
          value={config.modelType}
          onChange={e => setConfig({ modelType: e.target.value })}
        >
          {SUPPORTED_MODELS.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block' }}>API Key (optional)</label>
        <input
          style={{ width: '100%' }}
          value={config.apiKey}
          onChange={e => setConfig({ apiKey: e.target.value })}
          placeholder="sk-..."
        />
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default ModelConfigForm;
