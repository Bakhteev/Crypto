export const getEnv = (envName: string) => {
  return import.meta.env[envName];
};