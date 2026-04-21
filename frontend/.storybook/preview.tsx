import type { Preview } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { colors, spacing } from '../src/design-system/tokens';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'ink',
      values: [
        { name: 'ink', value: colors.ink },
        { name: 'court', value: colors.court },
        { name: 'chalk', value: colors.chalk },
      ],
    },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: spacing.s5, backgroundColor: colors.ink, minHeight: '100vh' as any }}>
        <Story />
      </View>
    ),
  ],
};

export default preview;
