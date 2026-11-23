import { ApiError, fetchJson } from './client';

const mockFetch = jest.fn();
beforeEach(() => {
  mockFetch.mockReset();
  global.fetch = mockFetch as unknown as typeof fetch;
});

describe('fetchJson', () => {
  it('returns parsed json on 200', async () => {
    mockFetch.mockResolvedValue({ ok: true, status: 200, json: async () => ({ a: 1 }) });
    await expect(fetchJson<{ a: number }>('/x')).resolves.toEqual({ a: 1 });
  });

  it('throws ApiError with status on non-2xx', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 404, text: async () => '', json: async () => ({}) });
    await expect(fetchJson('/x')).rejects.toMatchObject({ name: 'ApiError', status: 404 });
    await expect(fetchJson('/x')).rejects.toBeInstanceOf(ApiError);
  });

  it('sends bearer token when provided', async () => {
    mockFetch.mockResolvedValue({ ok: true, status: 200, json: async () => ({}) });
    await fetchJson('/x', { token: 't' });
    expect(mockFetch.mock.calls[0][1].headers.Authorization).toBe('Bearer t');
  });
});
