// src/services/categoryService.js
import api from './api';

export const categoryService = {
  // Obtener todas las categorías
  async getAll() {
    const response = await api.get('/categories');
    return response.data;
  },

  // Obtener categoría por ID
  async getById(id) {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Obtener categoría por slug
  async getBySlug(slug) {
    const response = await api.get(`/categories/slug/${slug}`);
    return response.data;
  }
};