import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  args: { children: 'NBA' },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {};
export const Live: Story = { args: { variant: 'live', children: 'LIVE · Q3 4:22' } };
export const Hot: Story = { args: { variant: 'hot', children: '🔥 On fire' } };
export const Ice: Story = { args: { variant: 'ice', children: 'Stats' } };
export const Win: Story = { args: { variant: 'win', children: 'W' } };
export const Loss: Story = { args: { variant: 'loss', children: 'L' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Trending' } };

export const AllVariants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      <Chip variant="live">LIVE · Q3 4:22</Chip>
      <Chip variant="hot">🔥 On fire</Chip>
      <Chip variant="win">W</Chip>
      <Chip variant="loss">L</Chip>
      <Chip>NBA</Chip>
      <Chip>Fantasy</Chip>
      <Chip>Trending</Chip>
      <Chip variant="ice">Stats</Chip>
    </View>
  ),
};
