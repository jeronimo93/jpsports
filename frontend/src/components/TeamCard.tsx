import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../design-system';
import { colors, spacing, fontSizes } from '../design-system/tokens';
import { useTeam } from '../hooks/useTeam';

type TeamCardProps = { id: number };

export function TeamCard({ id }: TeamCardProps) {
  const teamState = useTeam(id);
  if (teamState.status === 'loading') return <Text style={styles.statusText}>Loading team…</Text>;
  if (teamState.status === 'error') {
    console.error('[TeamCard] failed to load team', id, teamState.error);
    return <Text style={styles.statusText}>Could not load team.</Text>;
  }
  const { team } = teamState;
  return (
    <View
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`${team.name}, ${team.city}`}
    >
      <Card style={styles.teamCard}>
        <Text style={styles.teamName} importantForAccessibility="no-hide-descendants">{team.name}</Text>
        <Text style={styles.teamCity} importantForAccessibility="no-hide-descendants">{team.city}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  statusText: {
    color: colors.fog,
    marginTop: spacing.s5,
    fontSize: fontSizes.fs14,
  },
  teamCard: {
    marginTop: spacing.s5,
    width: 280,
  },
  teamName: {
    color: colors.chalk,
    fontSize: fontSizes.fs16,
    fontWeight: '700',
  },
  teamCity: {
    color: colors.fog,
    fontSize: fontSizes.fs13,
    marginTop: spacing.s1,
  },
});
