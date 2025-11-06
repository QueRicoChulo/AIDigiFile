import React from 'react';
import { useConfig } from '../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';

const ReviewSettings: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const { config } = useConfig();
  const history = useHistory();

  const finish = () => {
    // saved via context/localStorage already
    history.push('/');
  };

  return (
    <div>
      <h3>Review Settings</h3>
      <div>
        <strong>Model API URL:</strong> {config.modelApiUrl || '(not set)'}
      </div>
      <div>
        <strong>Model Type:</strong> {config.modelType}
      </div>
      <div>
        <strong>API Key:</strong> {config.apiKey ? '*****' : '(not set)'}
      </div>
      <div>
        <strong>Custom Options:</strong>
        <pre>{JSON.stringify(config.customOptions || {}, null, 2)}</pre>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={onBack}>Back</button>
        <button onClick={finish}>Finish</button>
      </div>
    </div>
  );
};

export default ReviewSettings;
