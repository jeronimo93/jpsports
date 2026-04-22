import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Scoreboard } from './Scoreboard';

const meta: Meta<typeof Scoreboard> = {
  title: 'Components/Scoreboard',
  component: Scoreboard,
};
export default meta;

type Story = StoryObj<typeof Scoreboard>;

export const Final: Story = {
  args: {
    home: 'BOS', away: 'LAL',
    homeScore: 112, awayScore: 108,
    state: 'final',
    metaLeft: 'FINAL · OT',
    metaRight: 'Tatum 41',
  },
};

export const LiveQ3: Story = {
  args: {
    home: 'PHI', away: 'MIL',
    homeScore: 88, awayScore: 84,
    state: 'live',
    metaLeft: 'LIVE · Q3 4:22',
    metaRight: 'Embiid 27',
  },
};

export const Upcoming: Story = {
  args: {
    home: 'GSW', away: 'DEN',
    state: 'upcoming',
    metaLeft: 'TIP-OFF 7:30 PM',
    metaRight: '',
  },
};

export const SideBySide: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
      <Scoreboard
        home="BOS" away="LAL"
        homeScore={112} awayScore={108}
        state="final"
        metaLeft="FINAL · OT" metaRight="Tatum 41"
      />
      <Scoreboard
        home="PHI" away="MIL"
        homeScore={88} awayScore={84}
        state="live"
        metaLeft="LIVE · Q3 4:22" metaRight="Embiid 27"
      />
    </View>
  ),
};
