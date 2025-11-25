// src/services/productService.js
import api from './api';

export const productService = {
  // Obtener todos los productos
  async getAll(params = {}) {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Obtener producto por ID
  async getById(id) {
    const response = await api.get(`/products/${id}`);
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
  },

  // Crear producto (ADMIN)
  async create(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Actualizar producto (ADMIN)
  async update(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Eliminar producto (ADMIN)
  async delete(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};