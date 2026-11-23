export class ApiError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.test';

interface RequestOptions {
  signal?: AbortSignal;
  token?: string;
}

export async function fetchJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    signal: options.signal,
    headers: {
      Accept: 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
  });
  if (!res.ok) {
    throw new ApiError(res.status, `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}
