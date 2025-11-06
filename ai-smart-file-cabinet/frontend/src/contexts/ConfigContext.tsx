import React, { createContext, useContext, useEffect, useState } from 'react';

export type CustomOptions = Record<string, string>;

export interface AppConfig {
  modelApiUrl: string;
  modelType: string;
  apiKey?: string;
  customOptions: CustomOptions;
}

const DEFAULT_CONFIG: AppConfig = {
  modelApiUrl: '',
  modelType: 'openai',
  apiKey: '',
  customOptions: {},
};

const StorageKey = 'ai_file_cabinet_config';

const ConfigContext = createContext<{
  config: AppConfig;
  setConfig: (c: Partial<AppConfig>) => void;
  resetConfig: () => void;
}>({
  config: DEFAULT_CONFIG,
  setConfig: () => {},
  resetConfig: () => {},
});

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfigState] = useState<AppConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(StorageKey);
      if (raw) setConfigState(JSON.parse(raw));
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(StorageKey, JSON.stringify(config));
    } catch (e) {
      // ignore quota errors
    }
  }, [config]);

  const setConfig = (partial: Partial<AppConfig>) => {
    setConfigState(prev => ({ ...prev, ...partial }));
  };

  const resetConfig = () => setConfigState(DEFAULT_CONFIG);

  return (
    <ConfigContext.Provider value={{ config, setConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);

export default ConfigContext;
