export const getEnv = (envName: string) => {
  // @ts-expect-error ?? for docker
  return import.meta.env[envName]
}
