const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('dating_jwt');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) throw new Error(data?.message || 'Request failed');
  return data;
}

export const api = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  createRequest: (body) => request('/requests', { method: 'POST', body: JSON.stringify(body) }),
  publicRequest: (token) => request(`/requests/public/${encodeURIComponent(token)}`),
  respond: (token, answer) => request(`/requests/public/${encodeURIComponent(token)}/response`, { method: 'POST', body: JSON.stringify({ answer }) }),
  mine: () => request('/requests/mine')
};
