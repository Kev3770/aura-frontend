// src/context/ProductContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { useToast } from './ToastContext';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showError } = useToast();

  // Cargar productos al montar
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getAll();
      if (response.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
      setError(error.message);
      showError('Error al cargar productos');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      if (response.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Error cargando categorías:', error);
    }
  };

  // Obtener productos por categoría
  const getProductsByCategory = async (categorySlug) => {
    try {
      setIsLoading(true);
      const response = await productService.getByCategory(categorySlug);
      if (response.success) {
        return response.data.products;
      }
      return [];
    } catch (error) {
      console.error('Error obteniendo productos por categoría:', error);
      showError('Error al filtrar productos');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener productos destacados
  const getFeaturedProducts = async () => {
    try {
      const response = await productService.getFeatured();
      if (response.success) {
        return response.data.products;
      }
      return [];
    } catch (error) {
      console.error('Error obteniendo productos destacados:', error);
      return [];
    }
  };

  // Obtener productos nuevos
  const getNewProducts = async () => {
    try {
      const response = await productService.getNew();
      if (response.success) {
        return response.data.products;
      }
      return [];
    } catch (error) {
      console.error('Error obteniendo productos nuevos:', error);
      return [];
    }
  };

  // Obtener producto por slug
  const getProductBySlug = async (slug) => {
    try {
      const response = await productService.getBySlug(slug);
      if (response.success) {
        return response.data.product;
      }
      return null;
    } catch (error) {
      console.error('Error obteniendo producto:', error);
      showError('Producto no encontrado');
      return null;
    }
  };

  const value = {
    products,
    categories,
    isLoading,
    error,
    loadProducts,
    getProductsByCategory,
    getFeaturedProducts,
    getNewProducts,
    getProductBySlug
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};