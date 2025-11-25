// src/data/helpers/getProductBySlug.js

/**
 * Obtiene un producto por su slug
 * @param {Array} products - Array de productos
 * @param {string} slug - Slug del producto
 * @returns {Object|null} Producto encontrado o null
 */
export const getProductBySlug = (products, slug) => {
  if (!slug) return null;
  
  const product = products.find(p => p.slug === slug);
  return product || null;
};

/**
 * Obtiene un producto por su ID
 * @param {Array} products - Array de productos
 * @param {string|number} id - ID del producto
 * @returns {Object|null} Producto encontrado o null
 */
export const getProductById = (products, id) => {
  if (!id) return null;
  
  const product = products.find(p => p.id === String(id));
  return product || null;
};

/**
 * Obtiene productos relacionados (misma categoría, excluyendo el actual)
 * @param {Array} products - Array de productos
 * @param {string} currentProductId - ID del producto actual
 * @param {string} category - Categoría del producto
 * @param {number} limit - Cantidad máxima de productos relacionados
 * @returns {Array} Array de productos relacionados
 */
export const getRelatedProducts = (products, currentProductId, category, limit = 4) => {
  return products
    .filter(p => p.category === category && p.id !== currentProductId)
    .slice(0, limit);
};

/**
 * Valida si un slug existe
 * @param {Array} products - Array de productos
 * @param {string} slug - Slug a validar
 * @returns {boolean} true si existe, false si no
 */
export const slugExists = (products, slug) => {
  return products.some(p => p.slug === slug);
};