import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { View } from 'react-native';
import { TabBar, type TabId } from './TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'Components/TabBar',
  component: TabBar,
};
export default meta;

type Story = StoryObj<typeof TabBar>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState<TabId>('feed');
    return (
      <View style={{ width: 390 }}>
        <TabBar active={active} onChange={setActive} />
      </View>
    );
  },
};

export const ClickSwitchesTab: Story = {
  args: { active: 'feed', onChange: fn() },
  render: (args) => (
    <View style={{ width: 390 }}>
      <TabBar {...args} />
    </View>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Scores'));
    await expect(args.onChange).toHaveBeenCalledWith('scores');
  },
};

export const ScoresActive: Story = {
  render: () => {
    const [active, setActive] = useState<TabId>('scores');
    return (
      <View style={{ width: 390 }}>
        <TabBar active={active} onChange={setActive} />
      </View>
    );
  },
};
