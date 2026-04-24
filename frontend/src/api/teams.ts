import { apiFetch } from './client';
import type { Team } from '../types/team';

export function getTeamById(id: number, signal?: AbortSignal): Promise<Team> {
  return apiFetch<Team>(`/teams/${id}`, undefined, signal);
}
