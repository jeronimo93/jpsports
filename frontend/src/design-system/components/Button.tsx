import React from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors, fonts, radii, spacing, tracking } from '../tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

const variantStyles: Record<ButtonVariant, { bg: string; fg: string; borderColor?: string }> = {
  primary:   { bg: colors.volt,    fg: colors.voltInk },
  secondary: { bg: colors.court,   fg: colors.chalk, borderColor: colors.line },
  ghost:     { bg: 'transparent',  fg: colors.chalk },
  danger:    { bg: colors.flame,   fg: colors.chalk },
};

const sizeStyles: Record<ButtonSize, { padY: number; padX: number; fontSize: number }> = {
  sm: { padY: 8,  padX: 14, fontSize: 12 },
  md: { padY: 12, padX: 20, fontSize: 14 },
  lg: { padY: 16, padX: 28, fontSize: 16 },
};

export function Button({
  children, variant = 'primary', size = 'md', fullWidth, disabled, onPress, style,
}: ButtonProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: v.bg,
          borderColor: v.borderColor ?? 'transparent',
          borderWidth: v.borderColor ? 1 : 0,
          paddingVertical: s.padY,
          paddingHorizontal: s.padX,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          opacity: disabled ? 0.4 : 1,
          transform: [{ scale: pressed && !disabled ? 0.97 : 1 }],
        },
        style,
      ]}
    >
      <View style={styles.inner}>
        {typeof children === 'string' ? (
          <Text
            style={{
              color: v.fg,
              fontFamily: fonts.body,
              fontWeight: '700',
              fontSize: s.fontSize,
              letterSpacing: s.fontSize * tracking.caps,
              textTransform: 'uppercase',
            }}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.rPill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
  },
});
