// src/data/helpers/filterProducts.js

/**
 * Filtra productos por categoría
 * @param {Array} products - Array de productos
 * @param {string} category - Categoría a filtrar
 * @returns {Array} Productos filtrados
 */
export const filterByCategory = (products, category) => {
  if (!category || category === 'all') {
    return products;
  }
  return products.filter(product => product.category === category);
};

/**
 * Filtra productos nuevos
 * @param {Array} products - Array de productos
 * @returns {Array} Solo productos marcados como nuevos
 */
export const filterNewProducts = (products) => {
  return products.filter(product => product.isNew === true);
};

/**
 * Filtra productos destacados
 * @param {Array} products - Array de productos
 * @returns {Array} Solo productos destacados
 */
export const filterFeaturedProducts = (products) => {
  return products.filter(product => product.featured === true);
};

/**
 * Filtra productos por rango de precio
 * @param {Array} products - Array de productos
 * @param {number} minPrice - Precio mínimo
 * @param {number} maxPrice - Precio máximo
 * @returns {Array} Productos dentro del rango
 */
export const filterByPriceRange = (products, minPrice, maxPrice) => {
  return products.filter(product => {
    const finalPrice = product.price - (product.price * product.discount / 100);
    return finalPrice >= minPrice && finalPrice <= maxPrice;
  });
};

/**
 * Filtra productos con descuento
 * @param {Array} products - Array de productos
 * @returns {Array} Solo productos con descuento > 0
 */
export const filterDiscountedProducts = (products) => {
  return products.filter(product => product.discount > 0);
};

/**
 * Filtra productos con stock disponible
 * @param {Array} products - Array de productos
 * @returns {Array} Productos con al menos una talla en stock
 */
export const filterAvailableProducts = (products) => {
  return products.filter(product => {
    return product.sizes.some(size => size.stock > 0);
  });
};

/**
 * Ordena productos por precio
 * @param {Array} products - Array de productos
 * @param {string} order - 'asc' o 'desc'
 * @returns {Array} Productos ordenados
 */
export const sortByPrice = (products, order = 'asc') => {
  return [...products].sort((a, b) => {
    const priceA = a.price - (a.price * a.discount / 100);
    const priceB = b.price - (b.price * b.discount / 100);
    return order === 'asc' ? priceA - priceB : priceB - priceA;
  });
};

/**
 * Búsqueda simple por nombre o descripción
 * @param {Array} products - Array de productos
 * @param {string} query - Término de búsqueda
 * @returns {Array} Productos que coinciden
 */
export const searchProducts = (products, query) => {
  if (!query || query.trim() === '') {
    return products;
  }
  
  const lowerQuery = query.toLowerCase().trim();
  
  return products.filter(product => {
    return (
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  });
};