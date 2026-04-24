export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'ApiError';
  }
}

const API_VERSION = '1.0';

export async function apiFetch<T>(
  path: string,
  parse?: (raw: unknown) => T,
): Promise<T> {
  let response: Response;
  try {
    const base = process.env.EXPO_PUBLIC_API_BASE_URL ?? '/api';
    response = await fetch(`${base}${path}`, {
      headers: { 'api-version': API_VERSION },
    });
  } catch (cause) {
    throw new ApiError(0, 'Network error', { cause });
  }
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP ${response.status}`);
  }
  let raw: unknown;
  try {
    raw = await response.json();
  } catch {
    throw new ApiError(response.status, 'Invalid JSON response');
  }
  return parse ? parse(raw) : (raw as T);
}
