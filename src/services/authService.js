import api, { hasApiBase } from './api.js';

const TOKEN_KEY = 'rails_art_token';
const USER_KEY = 'rails_art_user';
const USERS_KEY = 'rails_art_users';

const seedUsers = () => {
  const existing = localStorage.getItem(USERS_KEY);
  if (existing) return JSON.parse(existing);
  const users = [
    {
      id: 'admin-1',
      name: 'Rails Art Admin',
      email: 'admin@railsart.pk',
      password: 'Admin@123',
      role: 'admin',
      phone: '03001234567',
    },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return users;
};

export const register = async (payload) => {
  if (hasApiBase) {
    const { data } = await api.post('/api/auth/register', payload);
    persist(data);
    return data.user || data;
  }
  const users = seedUsers();
  if (users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }
  const user = {
    id: `u${Date.now()}`,
    name: payload.name,
    email: payload.email,
    password: payload.password,
    phone: payload.phone || '',
    role: 'customer',
  };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const safe = { ...user };
  delete safe.password;
  persist({ token: `local-${user.id}`, user: safe });
  return safe;
};

export const login = async ({ email, password }) => {
  if (hasApiBase) {
    const { data } = await api.post('/api/auth/login', { email, password });
    persist(data);
    return data.user || data;
  }
  const users = seedUsers();
  const found = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!found) throw new Error('Invalid email or password.');
  const safe = { ...found };
  delete safe.password;
  persist({ token: `local-${found.id}`, user: safe });
  return safe;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = async () => {
  if (hasApiBase) {
    try {
      const { data } = await api.get('/api/auth/me');
      return data.user || data;
    } catch {
      logout();
      return null;
    }
  }
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

const persist = (data) => {
  if (data.token) localStorage.setItem(TOKEN_KEY, data.token);
  if (data.user) localStorage.setItem(USER_KEY, JSON.stringify(data.user));
};
