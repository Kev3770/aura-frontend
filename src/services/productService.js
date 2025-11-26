// src/services/productService.js
import api from './api';

export const productService = {
  // Obtener todos los productos
  async getAll(params = {}) {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Obtener producto por slug
  async getBySlug(slug) {
    const response = await api.get(`/products/slug/${slug}`);
    return response.data;
  },

  // Obtener productos destacados
  async getFeatured() {
    const response = await api.get('/products/featured');
    return response.data;
  },

  // Obtener productos nuevos
  async getNew() {
    const response = await api.get('/products/new');
    return response.data;
  },

  // Obtener productos por categoría
  async getByCategory(categorySlug) {
    const response = await api.get(`/products/category/${categorySlug}`);
    return response.data;
  }
};