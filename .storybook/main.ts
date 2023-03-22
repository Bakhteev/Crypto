// @ts-ignore
const {resolve} = require('path')

module.exports = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  framework: '@storybook/react',
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

// @ts-ignore
  async viteFinal(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve(__dirname, "..", "src")
    }
    return config
  },
}
