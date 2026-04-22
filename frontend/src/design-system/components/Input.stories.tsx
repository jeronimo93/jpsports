import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { View } from 'react-native';
import { Input } from './Input';
import { Button } from './Button';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: 'Search players, teams, clips…', onChangeText: fn() },
  render: (args) => (
    <View style={{ width: 320 }}>
      <Input {...args} />
    </View>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Search players, teams, clips…');
    await userEvent.type(input, 'Tatum');
    await expect(args.onChangeText).toHaveBeenCalled();
  },
};

export const Focused: Story = {
  render: () => (
    <View style={{ width: 320 }}>
      <Input defaultValue="Tatum" focused />
    </View>
  ),
};

export const WithPostButton: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <View style={{ width: 380, flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Input placeholder="Your take…" value={value} onChangeText={setValue} />
        </View>
        <Button onPress={() => setValue('')}>Post</Button>
      </View>
    );
  },
};
