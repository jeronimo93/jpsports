import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { colors, radii, spacing } from '../tokens';

export type CardVariant = 'default' | 'feature' | 'hot';

export type CardProps = {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
};

export function Card({ children, variant = 'default', style }: CardProps) {
  return <View style={[styles.base, styles[variant], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.rMd,
    padding: spacing.s4,
  },
  default: {
    backgroundColor: colors.court,
    borderWidth: 1,
    borderColor: colors.line,
  },
  feature: {
    backgroundColor: colors.volt,
    borderRadius: radii.rLg,
    padding: spacing.s5,
  },
  hot: {
    backgroundColor: colors.flame,
    borderRadius: radii.rLg,
    padding: spacing.s5,
  },
});
