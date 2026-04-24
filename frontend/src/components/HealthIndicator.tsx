import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, fontSizes } from '../design-system/tokens';
import { useBackendHealth, type HealthStatus } from '../hooks/useBackendHealth';

const INDICATOR: Record<HealthStatus, { color: string; label: string }> = {
  loading: { color: colors.fog, label: 'checking backend…' },
  ok: { color: colors.win, label: 'backend healthy' },
  error: { color: colors.loss, label: 'backend unavailable' },
};

export function HealthIndicator() {
  const status = useBackendHealth();
  const { color, label } = INDICATOR[status];
  return (
    <View style={styles.indicator}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.indicatorLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.s6,
    paddingVertical: spacing.s2,
    paddingHorizontal: spacing.s3,
    borderRadius: radii.rPill,
    backgroundColor: colors.court2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.s2,
  },
  indicatorLabel: {
    color: colors.fog,
    fontSize: fontSizes.fs13,
  },
});
