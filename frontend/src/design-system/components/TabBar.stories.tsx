import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
