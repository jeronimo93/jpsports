import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors, fonts, tracking } from '../tokens';

export type ScoreboardState = 'live' | 'final' | 'upcoming';

export type ScoreboardProps = {
  home: string;
  away: string;
  homeScore?: number | string;
  awayScore?: number | string;
  state: ScoreboardState;
  metaLeft?: string;
  metaRight?: string;
  style?: ViewStyle;
};

export function Scoreboard({
  home, away, homeScore, awayScore, state, metaLeft, metaRight, style,
}: ScoreboardProps) {
  const homeLeading =
    typeof homeScore === 'number' && typeof awayScore === 'number' ? homeScore >= awayScore : true;
  const awayMuted = state !== 'upcoming' && !homeLeading === false && homeLeading;
  const homeMuted = state !== 'upcoming' && !homeLeading;

  const isLive = state === 'live';

  return (
    <View
      style={[
        styles.board,
        isLive && { borderColor: colors.volt, borderWidth: 2 },
        style,
      ]}
    >
      <Row team={home} score={homeScore} muted={homeMuted} />
      <Row team={away} score={awayScore} muted={awayMuted} />
      {(metaLeft || metaRight) && (
        <View style={[styles.meta, isLive && { }]}>
          <Text style={[styles.metaText, isLive && { color: colors.volt }]}>
            {isLive && metaLeft ? `● ${metaLeft}` : metaLeft}
          </Text>
          <Text style={[styles.metaText, isLive && { color: colors.volt }]}>{metaRight}</Text>
        </View>
      )}
    </View>
  );
}

function Row({ team, score, muted }: { team: string; score?: number | string; muted?: boolean }) {
  const color = muted ? colors.fog : colors.chalk;
  return (
    <View style={styles.row}>
      <Text
        style={{
          color,
          fontFamily: fonts.display,
          fontSize: 22,
          textTransform: 'uppercase',
          letterSpacing: 22 * tracking.display,
        }}
      >
        {team}
      </Text>
      <Text
        style={{
          color,
          fontFamily: fonts.mono,
          fontWeight: '700',
          fontSize: 40,
          letterSpacing: -0.8,
        }}
      >
        {score ?? '-'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: colors.court,
    borderWidth: 1,
    borderColor: colors.line,
    paddingVertical: 16,
    paddingHorizontal: 20,
    minWidth: 220,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  metaText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.fog,
    letterSpacing: 11 * tracking.caps,
    textTransform: 'uppercase',
  },
});
