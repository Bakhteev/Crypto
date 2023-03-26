export const getEnv = (envName: string) => {
  //@ts-ignore ?? for docker
  return import.meta.env[envName];
};