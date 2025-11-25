// src/utils/adminHelpers.js

import { SIZES_CLOTHING, SIZES_PANTS, SIZES_SHOES } from '../data/constants';

/**
 * Obtiene las tallas disponibles según la categoría
 */
export const getSizesByCategory = (category) => {
  const clothingCategories = ['camisas', 'chaquetas', 'blazers', 'sueters'];
  const pantsCategories = ['pantalones'];
  const shoesCategories = ['zapatos'];

  if (clothingCategories.includes(category)) {
    return SIZES_CLOTHING;
  } else if (pantsCategories.includes(category)) {
    return SIZES_PANTS;
  } else if (shoesCategories.includes(category)) {
    return SIZES_SHOES;
  } else {
    // Accesorios u otros
    return ['Única', 'S', 'M', 'L'];
  }
};

/**
 * Valida una URL de imagen
 */
export const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

/**
 * Valida múltiples URLs de imágenes
 */
export const validateImageUrls = (urls) => {
  if (!Array.isArray(urls) || urls.length === 0) {
    return { isValid: false, error: 'Debe haber al menos una imagen' };
  }

  const invalidUrls = urls.filter(url => !isValidImageUrl(url));
  
  if (invalidUrls.length > 0) {
    return { 
      isValid: false, 
      error: `URLs inválidas: ${invalidUrls.join(', ')}` 
    };
  }

  return { isValid: true };
};

/**
 * Formatea el stock total de un producto
 */
export const getTotalStock = (product) => {
  if (!product || !product.sizes) return 0;
  return product.sizes.reduce((total, size) => total + (size.stock || 0), 0);
};

/**
 * Obtiene el estado del stock de un producto
 */
export const getStockStatus = (product) => {
  const totalStock = getTotalStock(product);
  
  if (totalStock === 0) {
    return { status: 'out', label: 'Agotado', color: 'text-red-600' };
  } else if (totalStock <= 5) {
    return { status: 'low', label: 'Stock bajo', color: 'text-yellow-600' };
  } else {
    return { status: 'ok', label: 'Disponible', color: 'text-green-600' };
  }
};

/**
 * Calcula el precio final con descuento
 */
export const calculateFinalPriceAdmin = (price, discount) => {
  if (!discount || discount === 0) return price;
  return price - (price * discount / 100);
};

/**
 * Exporta productos a JSON
 */
export const exportProductsToJSON = (products) => {
  const dataStr = JSON.stringify(products, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `aura-products-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Importa productos desde JSON
 */
export const importProductsFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const products = JSON.parse(e.target.result);
        
        // Validar estructura básica
        if (!Array.isArray(products)) {
          reject(new Error('El archivo debe contener un array de productos'));
          return;
        }

        // Validar cada producto
        const invalidProducts = products.filter(p => 
          !p.id || !p.name || !p.category || !p.sizes
        );

        if (invalidProducts.length > 0) {
          reject(new Error('Algunos productos tienen estructura inválida'));
          return;
        }

        resolve(products);
      } catch (error) {
        reject(new Error('Error al parsear el archivo JSON'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };

    reader.readAsText(file);
  });
};

/**
 * Genera un reporte de inventario
 */
export const generateInventoryReport = (products) => {
  const report = {
    date: new Date().toISOString(),
    totalProducts: products.length,
    totalStock: 0,
    products: []
  };

  products.forEach(product => {
    const totalStock = getTotalStock(product);
    const stockStatus = getStockStatus(product);

    report.totalStock += totalStock;
    report.products.push({
      id: product.id,
      name: product.name,
      category: product.category,
      totalStock,
      status: stockStatus.label,
      sizes: product.sizes,
      price: product.price
    });
  });

  return report;
};

/**
 * Valida el formato de precio
 */
export const validatePrice = (price) => {
  const numPrice = Number(price);
  
  if (isNaN(numPrice)) {
    return { isValid: false, error: 'El precio debe ser un número' };
  }

  if (numPrice <= 0) {
    return { isValid: false, error: 'El precio debe ser mayor a 0' };
  }

  if (numPrice > 10000000) {
    return { isValid: false, error: 'El precio es demasiado alto' };
  }

  return { isValid: true };
};

/**
 * Valida el formato de descuento
 */
export const validateDiscount = (discount) => {
  const numDiscount = Number(discount);
  
  if (isNaN(numDiscount)) {
    return { isValid: false, error: 'El descuento debe ser un número' };
  }

  if (numDiscount < 0 || numDiscount > 100) {
    return { isValid: false, error: 'El descuento debe estar entre 0 y 100' };
  }

  return { isValid: true };
};

/**
 * Formatea fecha para el admin
 */
export const formatAdminDate = (date) => {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};