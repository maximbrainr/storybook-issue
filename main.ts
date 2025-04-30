import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

export default {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/test-runner',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/preset-create-react-app',
    '@storybook/theming',
    'storybook-addon-react-router-v6',
    'storybook-addon-pseudo-states',
    '@etchteam/storybook-addon-status',
    '@chromatic-com/storybook',
  ],

  framework: '@storybook/react-webpack5',

  docs: {
    autodocs: true,
  },

  core: {
    disableTelemetry: true,
  },

  staticDirs: [
    '../public',
    { from: '../src/sass/base/fonts', to: 'fonts' },
  ],

  babel: async config => {
    config.presets?.push(['@babel/preset-react', { runtime: 'automatic' }]);
    return config;
  },

  webpackFinal: async config => {
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });

    config.module?.rules?.push({
      test: /\.scss$/i,
      use: [
        {
          loader: 'sass-resources-loader',
          options: {
            resources: path.resolve(__dirname, '../src/sass/main.scss'),
          },
        },
      ],
    });

    config.resolve?.extensions?.push('.js', '.ts', '.jsx', '.tsx');

    return config;
  },

  typescript: {
    reactDocgen: 'react-docgen',
  },
} satisfies StorybookConfig;
