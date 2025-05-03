import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/app/**/*.mdx',
    '../src/app/**/stories.@(js|jsx|ts|tsx)'
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-addon-pseudo-states',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  docs: {},

  staticDirs: ['../public'],

  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
      config.resolve.alias = {
        ...config.resolve?.alias,
        '@': [path.resolve(__dirname, '../src')],
      };
    }

    const imageRule = config.module?.rules?.find(rule => {
      const test = (rule as { test: RegExp }).test;

      if (!test) {
        return false;
      }

      return test.test('.svg')
    }) as { [key: string]: any; };

    imageRule.exclude = /\.svg$/;

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },

  env: config => ({
    ...config,
  }),

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};
export default config;
