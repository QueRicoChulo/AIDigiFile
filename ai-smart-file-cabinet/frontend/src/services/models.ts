export const SUPPORTED_MODELS = [
  { id: 'openai', name: 'OpenAI (GPT)' },
  { id: 'local', name: 'Local/Llama' },
  { id: 'azure', name: 'Azure OpenAI' },
];

export const validateModelApiUrl = (url: string) => {
  if (!url) return false;
  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
