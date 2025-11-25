// src/context/AdminContext.jsx

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';
import { productService } from '../services/productService';

const AdminContext = createContext(null);

/**
 * Provider del panel de administración conectado al backend
 */
export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  // Cargar productos desde el backend al montar
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const response = await productService.getAll();
        if (response.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error('Error al cargar productos:', error);
        showError('Error al cargar productos');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [showError]);

  /**
   * Agregar nuevo producto (llama al backend)
   */
  const addProduct = useCallback(async (productData) => {
    setIsLoading(true);
    
    try {
      const response = await productService.create(productData);
      
      if (response.success) {
        setProducts(prev => [...prev, response.data.product]);
        showSuccess('Producto creado exitosamente');
        return { success: true, product: response.data.product };
      }
    } catch (error) {
      console.error('Error al crear producto:', error);
      const errorMessage = error.response?.data?.message || 'Error al crear producto';
      showError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  /**
   * Actualizar producto existente (llama al backend)
   */
  const editProduct = useCallback(async (productId, productData) => {
    setIsLoading(true);
    
    try {
      const response = await productService.update(productId, productData);
      
      if (response.success) {
        setProducts(prev => 
          prev.map(p => p.id === productId ? response.data.product : p)
        );
        showSuccess('Producto actualizado exitosamente');
        return { success: true, product: response.data.product };
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      const errorMessage = error.response?.data?.message || 'Error al actualizar producto';
      showError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  /**
   * Eliminar producto (llama al backend)
   */
  const removeProduct = useCallback(async (productId) => {
    setIsLoading(true);
    
    try {
      const response = await productService.delete(productId);
      
      if (response.success) {
        setProducts(prev => prev.filter(p => p.id !== productId));
        showSuccess('Producto eliminado exitosamente');
        return { success: true };
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      const errorMessage = error.response?.data?.message || 'Error al eliminar producto';
      showError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError]);

  /**
   * Obtener producto por ID
   */
  const getProductById = useCallback((productId) => {
    return products.find(p => p.id === productId) || null;
  }, [products]);

  /**
   * Actualizar stock de una talla específica
   */
  const updateStock = useCallback(async (productId, size, newStock) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) return { success: false };

      const updatedSizes = product.sizes.map(s => 
        s.size === size ? { ...s, stock: newStock } : s
      );

      const response = await productService.update(productId, {
        ...product,
        sizes: updatedSizes
      });

      if (response.success) {
        setProducts(prev => 
          prev.map(p => p.id === productId ? response.data.product : p)
        );
        showSuccess('Stock actualizado');
        return { success: true };
      }
    } catch (error) {
      console.error('Error al actualizar stock:', error);
      showError('Error al actualizar stock');
      return { success: false };
    }
  }, [products, showSuccess, showError]);

  /**
   * Obtener estadísticas (desde el backend)
   */
  const getStats = useCallback(() => {
    // Calcular stats desde los productos en memoria
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => 
      sum + p.sizes.reduce((s, size) => s + (size.stock || 0), 0), 0
    );
    const lowStock = products.filter(p => 
      p.sizes.some(s => s.stock > 0 && s.stock <= 5)
    ).length;
    const outOfStock = products.filter(p => 
      p.sizes.every(s => s.stock === 0)
    ).length;
    const featured = products.filter(p => p.featured).length;
    const newProducts = products.filter(p => p.isNew).length;

    return {
      totalProducts,
      totalStock,
      lowStock,
      outOfStock,
      featured,
      newProducts
    };
  }, [products]);

  const value = {
    products,
    isLoading,
    addProduct,
    editProduct,
    removeProduct,
    getProductById,
    updateStock,
    getStats,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

/**
 * Hook para usar el AdminContext
 */
export const useAdmin = () => {
  const context = useContext(AdminContext);
  
  if (!context) {
    throw new Error('useAdmin debe usarse dentro de AdminProvider');
  }
  
  return context;
};

export default AdminContext;
