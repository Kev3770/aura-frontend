// src/data/helpers/validateStock.js

import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from '../constants';

/**
 * Verifica si una talla específica tiene stock disponible
 * @param {Object} product - Producto a verificar
 * @param {string} size - Talla a verificar
 * @returns {boolean} true si hay stock, false si no
 */
export const hasStockForSize = (product, size) => {
  if (!product || !product.sizes) return false;
  
  const sizeData = product.sizes.find(s => s.size === size);
  return sizeData ? sizeData.stock > 0 : false;
};

/**
 * Obtiene el stock disponible para una talla específica
 * @param {Object} product - Producto
 * @param {string} size - Talla
 * @returns {number} Cantidad en stock (0 si no existe)
 */
export const getStockForSize = (product, size) => {
  if (!product || !product.sizes) return 0;
  
  const sizeData = product.sizes.find(s => s.size === size);
  return sizeData ? sizeData.stock : 0;
};

/**
 * Valida si se puede agregar una cantidad al carrito
 * @param {number} currentQuantity - Cantidad actual en el carrito
 * @param {number} requestedQuantity - Cantidad que se quiere agregar
 * @param {number} availableStock - Stock disponible del producto
 * @returns {Object} { valid: boolean, error: string|null, maxAllowed: number }
 */
export const canAddToCart = (currentQuantity, requestedQuantity, availableStock) => {
  const totalQuantity = currentQuantity + requestedQuantity;
  
  // Validar stock disponible
  if (availableStock === 0) {
    return {
      valid: false,
      error: 'Producto agotado',
      maxAllowed: 0
    };
  }
  
  // Validar cantidad mínima
  if (requestedQuantity < MIN_CART_QUANTITY) {
    return {
      valid: false,
      error: `La cantidad mínima es ${MIN_CART_QUANTITY}`,
      maxAllowed: availableStock
    };
  }
  
  // Validar cantidad máxima por producto
  if (totalQuantity > MAX_CART_QUANTITY) {
    return {
      valid: false,
      error: `Máximo ${MAX_CART_QUANTITY} unidades por producto`,
      maxAllowed: MAX_CART_QUANTITY - currentQuantity
    };
  }
  
  // Validar stock disponible
  if (totalQuantity > availableStock) {
    return {
      valid: false,
      error: `Solo quedan ${availableStock} unidades disponibles`,
      maxAllowed: availableStock - currentQuantity
    };
  }
  
  return {
    valid: true,
    error: null,
    maxAllowed: Math.min(MAX_CART_QUANTITY - currentQuantity, availableStock - currentQuantity)
  };
};

/**
 * Obtiene todas las tallas con stock disponible
 * @param {Object} product - Producto
 * @returns {Array} Array de tallas disponibles
 */
export const getAvailableSizes = (product) => {
  if (!product || !product.sizes) return [];
  
  return product.sizes
    .filter(size => size.stock > 0)
    .map(size => size.size);
};

/**
 * Verifica si un producto tiene algún stock disponible
 * @param {Object} product - Producto
 * @returns {boolean} true si tiene stock en al menos una talla
 */
export const hasAnyStock = (product) => {
  if (!product || !product.sizes) return false;
  
  return product.sizes.some(size => size.stock > 0);
};

/**
 * Calcula el stock total de un producto (todas las tallas)
 * @param {Object} product - Producto
 * @returns {number} Stock total
 */
export const getTotalStock = (product) => {
  if (!product || !product.sizes) return 0;
  
  return product.sizes.reduce((total, size) => total + size.stock, 0);
};