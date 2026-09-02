function getRequiredEnv(key) {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = Object.freeze({
  apiBaseUrl: getRequiredEnv("VITE_API_BASE_URL"),
});
