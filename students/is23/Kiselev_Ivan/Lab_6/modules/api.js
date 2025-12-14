const API_BASE = 'http://localhost:8000';

export const api = {
  async get(path, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE}${path}${query ? '?' + query : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Ошибка ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  async post(path, data) {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`Ошибка ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  async remove(path) {
    const res = await fetch(`${API_BASE}${path}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Ошибка ${res.status}: ${await res.text()}`);
    return await res.json();
  }
};