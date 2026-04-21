import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import { Card } from './Card';
import { Chip } from './Chip';
import { colors, fonts, tracking } from '../tokens';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Text style={{ color: colors.chalk, fontFamily: fonts.body, fontSize: 16 }}>
        A card with default styling.
      </Text>
    </Card>
  ),
};

export const Feature: Story = {
  render: () => (
    <Card variant="feature" style={{ width: 260 }}>
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: 14,
          letterSpacing: 14 * tracking.caps,
          color: colors.voltInk,
          textTransform: 'uppercase',
        }}
      >
        POLL · 3 MIN LEFT
      </Text>
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: 24,
          marginTop: 6,
          color: colors.voltInk,
          textTransform: 'uppercase',
          lineHeight: 26,
        }}
      >
        Who wins tonight?
      </Text>
      <Text
        style={{
          marginTop: 12,
          fontFamily: fonts.mono,
          fontSize: 12,
          color: colors.voltInk,
        }}
      >
        64% BOS · 36% LAL · 14.2k votes
      </Text>
    </Card>
  ),
};

export const Hot: Story = {
  render: () => (
    <Card variant="hot" style={{ width: 260 }}>
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: 14,
          letterSpacing: 14 * tracking.caps,
          color: colors.chalk,
          textTransform: 'uppercase',
        }}
      >
        🔥 BREAKING
      </Text>
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: 24,
          marginTop: 6,
          color: colors.chalk,
          textTransform: 'uppercase',
          lineHeight: 26,
        }}
      >
        Tatum drops 41 in OT win
      </Text>
    </Card>
  ),
};

export const ScoreCardComposition: Story = {
  render: () => (
    <Card style={{ width: 260 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Chip variant="live">LIVE · Q3</Chip>
        <Text style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.fog }}>4:22</Text>
      </View>
      <Row team="BOS" score="88" />
      <Row team="LAL" score="82" muted />
    </Card>
  ),
};

function Row({ team, score, muted }: { team: string; score: string; muted?: boolean }) {
  const color = muted ? colors.fog : colors.chalk;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text
        style={{
          color,
          fontFamily: fonts.body,
          fontWeight: '600',
          fontSize: 14,
          textTransform: 'uppercase',
          letterSpacing: 14 * tracking.caps,
        }}
      >
        {team}
      </Text>
      <Text style={{ color, fontFamily: fonts.mono, fontWeight: '700', fontSize: 36, letterSpacing: -0.72 }}>
        {score}
      </Text>
    </View>
  );
}
