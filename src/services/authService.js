// src/services/authService.js
import api from './api';

export const authService = {
  // Login
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      // Guardar token y usuario en localStorage
      localStorage.setItem('auth-token', response.data.data.token);
      localStorage.setItem('auth-user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Register
  async register(name, email, password) {
    const response = await api.post('/auth/register', { name, email, password });
    if (response.data.success) {
      localStorage.setItem('auth-token', response.data.data.token);
      localStorage.setItem('auth-user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Get current user
  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout
  logout() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('auth-token');
  },

  // Get current user from localStorage
  getCurrentUser() {
    const user = localStorage.getItem('auth-user');
    return user ? JSON.parse(user) : null;
  }
};