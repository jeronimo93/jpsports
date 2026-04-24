import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, fontSizes } from './src/design-system/tokens';
import { HealthIndicator } from './src/components/HealthIndicator';
import { TeamCard } from './src/components/TeamCard';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello jpsports</Text>
      <Text style={styles.subtitle}>The ultimate sports app.</Text>
      <HealthIndicator />
      <TeamCard id={1} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.flame,
    fontSize: fontSizes.fs44,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.chalk,
    fontSize: fontSizes.fs18,
    marginTop: spacing.s3,
  },
});
