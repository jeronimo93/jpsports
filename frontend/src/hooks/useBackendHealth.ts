import { useEffect, useState } from 'react';

export type HealthStatus = 'loading' | 'ok' | 'error';

const POLL_INTERVAL_MS = 5000;

export function useBackendHealth(): HealthStatus {
  const [status, setStatus] = useState<HealthStatus>('loading');

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        // /healthz is handled by nginx in production; always fails in local dev
        const res = await fetch('/healthz');
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
