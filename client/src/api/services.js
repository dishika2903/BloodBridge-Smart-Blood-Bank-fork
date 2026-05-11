const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  const token = localStorage.getItem("token");

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

// ================= APIs =================

export const donorApi = {
  create: (body) => request('/donors', { method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  getAll: () => request('/donors'),
  getById: (id) => request(`/donors/${id}`),
  update: (id, body) => request(`/donors/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/donors/${id}`, { method: 'DELETE' }),
};

export const inventoryApi = {
  getAll: () => request('/inventory'),
  update: (bloodGroup, unitsAvailable) =>
    request(`/inventory/update/${bloodGroup}`, {
      method: 'PUT',
      body: JSON.stringify({ unitsAvailable }),
    }),
};

export const requestApi = {
  create: (body) => request('/requests', { method: 'POST', body: JSON.stringify(body) }),
  getAll: () => request('/requests'),
  updateStatus: (id, requestStatus) =>
    request(`/requests/status/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ requestStatus }),
    }),
  getMatching: (id) => request(`/requests/match/${id}`),
};

export const authApi = {
  signup: (body) => request('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
};