import { useEffect, useState } from 'react';
import { getTeamById } from '../api/teams';
import type { Team } from '../types/team';

export type TeamState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; team: Team };

export function useTeam(id: number): TeamState {
  const [state, setState] = useState<TeamState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    getTeamById(id)
      .then((team) => {
        if (!cancelled) setState({ status: 'success', team });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const error = err instanceof Error ? err.message : 'Unknown error';
          setState({ status: 'error', error });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}
