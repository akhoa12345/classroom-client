const mode = import.meta.env.MODE;

export const APP_CONFIGS = {
  API_URL: mode === 'production' ? import.meta.env.VITE_API_URL : import.meta.env.VITE_LOCAL_API_URL,
};
