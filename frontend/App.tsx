import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello jpsports</Text>
      <Text style={styles.subtitle}>The ultimate sports app.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ff4500',
    fontSize: 48,
    fontWeight: '700',
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 12,
  },
});
