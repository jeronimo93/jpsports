import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors, fonts, radii, tracking } from '../tokens';

export type ChipVariant = 'default' | 'live' | 'hot' | 'ice' | 'win' | 'loss' | 'ghost';

export type ChipProps = {
  children: React.ReactNode;
  variant?: ChipVariant;
  style?: ViewStyle;
};

const variantStyles: Record<ChipVariant, { bg: string; fg: string; borderColor?: string; dotColor?: string }> = {
  default: { bg: colors.court, fg: colors.chalk, borderColor: colors.line },
  live:    { bg: colors.volt, fg: colors.voltInk, dotColor: colors.voltInk },
  hot:     { bg: colors.flame, fg: colors.chalk },
  ice:     { bg: colors.ice, fg: colors.ink },
  win:     { bg: 'rgba(0,217,126,0.15)', fg: colors.win, borderColor: 'rgba(0,217,126,0.3)' },
  loss:    { bg: 'rgba(255,77,106,0.15)', fg: colors.loss, borderColor: 'rgba(255,77,106,0.3)' },
  ghost:   { bg: 'transparent', fg: colors.fog, borderColor: colors.line },
};

function PulsingDot({ color }: { color: string }) {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.35, duration: 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);
  return (
    <Animated.View
      style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color, opacity }}
    />
  );
}

export function Chip({ children, variant = 'default', style }: ChipProps) {
  const v = variantStyles[variant];
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: v.bg,
          borderColor: v.borderColor ?? 'transparent',
          borderWidth: v.borderColor ? 1 : 0,
        },
        style,
      ]}
    >
      {variant === 'live' && v.dotColor ? <PulsingDot color={v.dotColor} /> : null}
      <Text
        style={{
          color: v.fg,
          fontFamily: fonts.body,
          fontWeight: '700',
          fontSize: 12,
          letterSpacing: 12 * tracking.caps,
          textTransform: 'uppercase',
        }}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.rPill,
    alignSelf: 'flex-start',
  },
});
