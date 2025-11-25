// src/data/helpers/productHelpers.js

import { slugify } from '../../utils/formatters';
import { CATEGORIES } from '../constants';

/**
 * Valida los datos de un producto
 */
export const validateProductData = (productData) => {
  const errors = [];

  // Nombre
  if (!productData.name || productData.name.trim() === '') {
    errors.push('El nombre es obligatorio');
  }

  // Precio
  if (!productData.price || productData.price <= 0) {
    errors.push('El precio debe ser mayor a 0');
  }

  // Descuento
  if (productData.discount < 0 || productData.discount > 100) {
    errors.push('El descuento debe estar entre 0 y 100');
  }

  // Categoría
  if (!productData.category || !CATEGORIES.includes(productData.category)) {
    errors.push('Categoría inválida');
  }

  // Descripción
  if (!productData.description || productData.description.trim() === '') {
    errors.push('La descripción es obligatoria');
  }

  // Imágenes
  if (!productData.images || productData.images.length === 0) {
    errors.push('Debe haber al menos una imagen');
  }

  // Tallas
  if (!productData.sizes || productData.sizes.length === 0) {
    errors.push('Debe haber al menos una talla');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Genera un ID único para un nuevo producto
 */
export const generateProductId = (existingProducts) => {
  const ids = existingProducts.map(p => parseInt(p.id)).filter(id => !isNaN(id));
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  return String(maxId + 1);
};

/**
 * Genera un slug único para un producto
 */
export const generateUniqueSlug = (name, existingProducts, currentProductId = null) => {
  let baseSlug = slugify(name);
  let slug = baseSlug;
  let counter = 1;

  // Verificar si el slug ya existe (excluyendo el producto actual si es edición)
  while (existingProducts.some(p => p.slug === slug && p.id !== currentProductId)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

/**
 * Crea un nuevo producto
 */
export const createProduct = (productData, existingProducts) => {
  // Validar datos
  const validation = validateProductData(productData);
  if (!validation.isValid) {
    throw new Error(validation.errors.join(', '));
  }

  // Generar ID y slug únicos
  const id = generateProductId(existingProducts);
  const slug = generateUniqueSlug(productData.name, existingProducts);

  // Crear objeto producto
  const newProduct = {
    id,
    slug,
    name: productData.name.trim(),
    price: Number(productData.price),
    discount: Number(productData.discount) || 0,
    description: productData.description.trim(),
    category: productData.category,
    isNew: productData.isNew || false,
    featured: productData.featured || false,
    images: productData.images.filter(img => img.trim() !== ''),
    sizes: productData.sizes.map(size => ({
      size: size.size,
      stock: Number(size.stock) || 0
    })),
    colors: productData.colors || []
  };

  return newProduct;
};

/**
 * Actualiza un producto existente
 */
export const updateProduct = (productId, productData, existingProducts) => {
  // Validar datos
  const validation = validateProductData(productData);
  if (!validation.isValid) {
    throw new Error(validation.errors.join(', '));
  }

  // Verificar que el producto existe
  const existingProduct = existingProducts.find(p => p.id === productId);
  if (!existingProduct) {
    throw new Error('Producto no encontrado');
  }

  // Generar slug único (puede haber cambiado el nombre)
  const slug = generateUniqueSlug(productData.name, existingProducts, productId);

  // Actualizar producto
  const updatedProduct = {
    ...existingProduct,
    slug,
    name: productData.name.trim(),
    price: Number(productData.price),
    discount: Number(productData.discount) || 0,
    description: productData.description.trim(),
    category: productData.category,
    isNew: productData.isNew || false,
    featured: productData.featured || false,
    images: productData.images.filter(img => img.trim() !== ''),
    sizes: productData.sizes.map(size => ({
      size: size.size,
      stock: Number(size.stock) || 0
    })),
    colors: productData.colors || []
  };

  return updatedProduct;
};

/**
 * Elimina un producto
 */
export const deleteProduct = (productId, existingProducts) => {
  const product = existingProducts.find(p => p.id === productId);
  
  if (!product) {
    throw new Error('Producto no encontrado');
  }

  return true;
};

/**
 * Obtiene estadísticas de productos
 */
export const getProductStats = (products) => {
  const stats = {
    total: products.length,
    byCategory: {},
    totalStock: 0,
    outOfStock: 0,
    lowStock: 0, // Stock <= 5
    featured: 0,
    new: 0,
    withDiscount: 0,
    averagePrice: 0,
    totalValue: 0
  };

  // Calcular estadísticas
  products.forEach(product => {
    // Por categoría
    stats.byCategory[product.category] = (stats.byCategory[product.category] || 0) + 1;

    // Stock
    const productTotalStock = product.sizes.reduce((sum, size) => sum + size.stock, 0);
    stats.totalStock += productTotalStock;

    if (productTotalStock === 0) {
      stats.outOfStock++;
    } else if (productTotalStock <= 5) {
      stats.lowStock++;
    }

    // Características
    if (product.featured) stats.featured++;
    if (product.isNew) stats.new++;
    if (product.discount > 0) stats.withDiscount++;

    // Valor
    stats.totalValue += product.price * productTotalStock;
  });

  // Precio promedio
  stats.averagePrice = products.length > 0 
    ? products.reduce((sum, p) => sum + p.price, 0) / products.length 
    : 0;

  return stats;
};

/**
 * Filtra productos por búsqueda
 */
export const searchAdminProducts = (products, query) => {
  if (!query || query.trim() === '') {
    return products;
  }

  const lowerQuery = query.toLowerCase().trim();

  return products.filter(product => {
    return (
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.id === lowerQuery
    );
  });
};

/**
 * Ordena productos
 */
export const sortAdminProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    
    case 'stock-asc':
      return sorted.sort((a, b) => {
        const stockA = a.sizes.reduce((sum, s) => sum + s.stock, 0);
        const stockB = b.sizes.reduce((sum, s) => sum + s.stock, 0);
        return stockA - stockB;
      });
    
    case 'stock-desc':
      return sorted.sort((a, b) => {
        const stockA = a.sizes.reduce((sum, s) => sum + s.stock, 0);
        const stockB = b.sizes.reduce((sum, s) => sum + s.stock, 0);
        return stockB - stockA;
      });
    
    case 'id-asc':
      return sorted.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    
    case 'id-desc':
      return sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    
    default:
      return sorted;
  }
};