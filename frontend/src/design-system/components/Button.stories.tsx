import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Drop a take' },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Follow' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Skip' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Go live' } };

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm">Lock in</Button>
      <Button size="md">Drop a take</Button>
      <Button size="lg">Join the squad</Button>
    </View>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <View style={{ width: 320 }}>
      <Button fullWidth>Post my take</Button>
    </View>
  ),
};

export const Disabled: Story = { args: { disabled: true, children: 'Locked' } };
