const API_URL = 'http://localhost:5000/api';

const api = {
  // Helpers
  getToken: () => localStorage.getItem('token'),
  setToken: (token) => localStorage.setItem('token', token),
  removeToken: () => localStorage.removeItem('token'),
  getUser: () => JSON.parse(localStorage.getItem('user') || 'null'),
  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  },

  // Auth api calls
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  register: async (name, email, password, role) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    return res.json();
  },

  // Articles & Tips
  getArticles: async () => {
    const res = await fetch(`${API_URL}/content/articles`);
    return res.json();
  },
  
  getTips: async () => {
    const res = await fetch(`${API_URL}/content/tips`);
    return res.json();
  },

  // Protected Requests wrapper
  request: async (endpoint, method = 'GET', body = null) => {
    const headers = {
      'Authorization': `Bearer ${api.getToken()}`
    };
    if (body) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });
    
    if (res.status === 401) {
      api.logout();
    }
    
    return res.json();
  }
};
