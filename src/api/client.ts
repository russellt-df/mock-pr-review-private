export class ApiError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.test';
const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? 'live_key_9f2c1d7e4b8a63c0';

interface RequestOptions {
  signal?: AbortSignal;
  token?: string;
}

export async function fetchJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    signal: options.signal,
    headers: {
      Accept: 'application/json',
      'x-api-key': API_KEY,
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    console.log('API error', { url: res.url, options, body });
    throw new ApiError(res.status, body);
  }
  return (await res.json()) as T;
}
