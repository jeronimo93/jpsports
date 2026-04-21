import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type HealthStatus = 'loading' | 'ok' | 'error';

const POLL_INTERVAL_MS = 5000;

function useBackendHealth(): HealthStatus {
  const [status, setStatus] = useState<HealthStatus>('loading');

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await fetch('/api/health');
        if (!cancelled) setStatus(res.ok ? 'ok' : 'error');
      } catch {
        if (!cancelled) setStatus('error');
      }
    };
    check();
    const id = setInterval(check, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return status;
}

const INDICATOR: Record<HealthStatus, { color: string; label: string }> = {
  loading: { color: '#9ca3af', label: 'checking backend…' },
  ok: { color: '#22c55e', label: 'backend healthy' },
  error: { color: '#ef4444', label: 'backend unreachable' },
};

function HealthIndicator() {
  const status = useBackendHealth();
  const { color, label } = INDICATOR[status];
  return (
    <View style={styles.indicator}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.indicatorLabel}>{label}</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello jpsports</Text>
      <Text style={styles.subtitle}>The ultimate sports app.</Text>
      <HealthIndicator />
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
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#262626',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  indicatorLabel: {
    color: '#e5e5e5',
    fontSize: 13,
  },
});
