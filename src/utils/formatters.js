// src/utils/formatters.js

import { CURRENCY } from '../data/constants';

/**
 * Formatea un precio en pesos colombianos
 * @param {number} price - Precio a formatear
 * @param {boolean} includeDecimals - Si incluir decimales
 * @returns {string} Precio formateado
 */
export const formatPrice = (price, includeDecimals = false) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0';
  }
  
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  });
  
  return formatter.format(price);
};

/**
 * Calcula el precio final después de aplicar descuento
 * @param {number} price - Precio original
 * @param {number} discount - Descuento en porcentaje (0-100)
 * @returns {number} Precio final
 */
export const calculateFinalPrice = (price, discount = 0) => {
  if (discount <= 0) return price;
  return price - (price * discount / 100);
};

/**
 * Formatea el precio con descuento aplicado
 * @param {number} price - Precio original
 * @param {number} discount - Descuento en porcentaje
 * @returns {string} Precio final formateado
 */
export const formatPriceWithDiscount = (price, discount = 0) => {
  const finalPrice = calculateFinalPrice(price, discount);
  return formatPrice(finalPrice);
};

/**
 * Calcula el ahorro en dinero por descuento
 * @param {number} price - Precio original
 * @param {number} discount - Descuento en porcentaje
 * @returns {number} Dinero ahorrado
 */
export const calculateSavings = (price, discount) => {
  return price * discount / 100;
};

/**
 * Convierte un string a slug (URL friendly)
 * @param {string} text - Texto a convertir
 * @returns {string} Slug generado
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Reemplazar espacios con -
    .replace(/[^\w\-]+/g, '')    // Remover caracteres no válidos
    .replace(/\-\-+/g, '-')      // Reemplazar múltiples - con uno solo
    .replace(/^-+/, '')          // Remover - al inicio
    .replace(/-+$/, '');         // Remover - al final
};

/**
 * Formatea un número a string con separadores de miles
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number' || isNaN(num)) {
    return '0';
  }
  
  return new Intl.NumberFormat('es-CO').format(num);
};

/**
 * Trunca un texto a cierta longitud
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @param {string} suffix - Sufijo a agregar (ej: '...')
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength).trim() + suffix;
};

/**
 * Capitaliza la primera letra de un string
 * @param {string} str - String a capitalizar
 * @returns {string} String capitalizado
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitaliza cada palabra de un string
 * @param {string} str - String a capitalizar
 * @returns {string} String con cada palabra capitalizada
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Formatea una fecha a formato legible
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatDate = (date) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj)) {
    return 'Fecha inválida';
  }
  
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
};

/**
 * Formatea el porcentaje de descuento
 * @param {number} discount - Descuento (0-100)
 * @returns {string} Porcentaje formateado (ej: "-20%")
 */
export const formatDiscount = (discount) => {
  if (!discount || discount <= 0) return '';
  return `-${discount}%`;
};