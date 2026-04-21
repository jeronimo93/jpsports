import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(cfg) {
    return mergeConfig(cfg, {
      resolve: {
        alias: {
          'react-native': 'react-native-web',
        },
        extensions: [
          '.web.tsx', '.web.ts', '.web.jsx', '.web.js',
          '.tsx', '.ts', '.jsx', '.js',
        ],
      },
      define: {
        __DEV__: JSON.stringify(true),
        'process.env.EXPO_OS': JSON.stringify('web'),
      },
      optimizeDeps: {
        esbuildOptions: {
          loader: { '.js': 'jsx' },
          mainFields: ['browser', 'module', 'main'],
          resolveExtensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx'],
        },
        include: ['react-native-web', 'react-native-svg'],
      },
    });
  },
};

export default config;
