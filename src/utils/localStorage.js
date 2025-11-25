// src/utils/localStorage.js

import { CART_STORAGE_KEY } from '../data/constants';

/**
 * Verifica si localStorage está disponible
 * @returns {boolean}
 */
const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Guarda el carrito en localStorage
 * @param {Array} cartItems - Array de items del carrito
 * @returns {boolean} true si se guardó exitosamente
 */
export const saveCart = (cartItems) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage no está disponible');
    return false;
  }
  
  try {
    const cartData = {
      items: cartItems,
      timestamp: new Date().toISOString(),
      version: '1.0' // Por si necesitas migrar el schema en el futuro
    };
    
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    return true;
  } catch (error) {
    console.error('Error al guardar el carrito:', error);
    
    // Si es error de cuota excedida, intentar limpiar el carrito
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage lleno, limpiando carrito...');
      clearCart();
    }
    
    return false;
  }
};

/**
 * Carga el carrito desde localStorage
 * @returns {Array} Array de items del carrito (vacío si no existe o hay error)
 */
export const loadCart = () => {
  if (!isLocalStorageAvailable()) {
    return [];
  }
  
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    
    if (!cartData) {
      return [];
    }
    
    const parsed = JSON.parse(cartData);
    
    // Validar estructura
    if (!parsed.items || !Array.isArray(parsed.items)) {
      console.warn('Estructura de carrito inválida, limpiando...');
      clearCart();
      return [];
    }
    
    // Validar cada item del carrito
    const validItems = parsed.items.filter(item => {
      return (
        item.productId &&
        item.size &&
        item.quantity &&
        item.quantity > 0 &&
        item.name &&
        item.price >= 0
      );
    });
    
    // Si se filtraron items inválidos, guardar la versión limpia
    if (validItems.length !== parsed.items.length) {
      console.warn('Se encontraron items inválidos, limpiando...');
      saveCart(validItems);
    }
    
    return validItems;
  } catch (error) {
    console.error('Error al cargar el carrito:', error);
    clearCart();
    return [];
  }
};

/**
 * Limpia el carrito de localStorage
 * @returns {boolean} true si se limpió exitosamente
 */
export const clearCart = () => {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error al limpiar el carrito:', error);
    return false;
  }
};

/**
 * Obtiene el tamaño del carrito guardado (en bytes)
 * @returns {number} Tamaño en bytes
 */
export const getCartSize = () => {
  if (!isLocalStorageAvailable()) {
    return 0;
  }
  
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? new Blob([cartData]).size : 0;
  } catch (error) {
    return 0;
  }
};

/**
 * Verifica si el carrito está vacío
 * @returns {boolean}
 */
export const isCartEmpty = () => {
  const cart = loadCart();
  return cart.length === 0;
};

/**
 * Exporta el carrito como JSON (para debugging)
 * @returns {string} JSON del carrito
 */
export const exportCart = () => {
  const cart = loadCart();
  return JSON.stringify(cart, null, 2);
};