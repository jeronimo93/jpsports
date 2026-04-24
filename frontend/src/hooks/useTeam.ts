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
    const controller = new AbortController();
    setState({ status: 'loading' });
    getTeamById(id, controller.signal)
      .then((team) => {
        setState({ status: 'success', team });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const error = err instanceof Error ? err.message : 'Unknown error';
        setState({ status: 'error', error });
      });
    return () => {
      controller.abort();
    };
  }, [id]);

  return state;
}
