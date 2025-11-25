// src/pages/Products/Products.jsx

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/features/ProductCard';
import { useAdmin } from '../../context/AdminContext'; // ← CAMBIO
import { filterByCategory, filterNewProducts, sortByPrice } from '../../data/helpers/filterProducts';
import { CATEGORIES } from '../../data/constants';
import { capitalizeWords } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading } = useAdmin(); // ← CAMBIO: usar AdminContext
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState(null);
  
  const { addToCart } = useCart();
  
  const categoryFromUrl = searchParams.get('categoria') || 'all';
  const newFromUrl = searchParams.get('nuevos') === 'true';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [sortOrder, setSortOrder] = useState('');
  const [showNewOnly, setShowNewOnly] = useState(newFromUrl);

  useEffect(() => {
    const categoryParam = searchParams.get('categoria') || 'all';
    const newParam = searchParams.get('nuevos') === 'true';
    
    setSelectedCategory(categoryParam);
    setShowNewOnly(newParam);
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = filterByCategory(result, selectedCategory);
    }

    if (showNewOnly) {
      result = filterNewProducts(result);
    }

    if (sortOrder) {
      result = sortByPrice(result, sortOrder);
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortOrder, showNewOnly]);

  const handleAddToCart = (product) => {
    const availableSize = product.sizes.find(size => size.stock > 0);
    
    if (!availableSize) {
      return;
    }

    const success = addToCart(product, availableSize.size, 1);

    if (success) {
      setNotificationProduct(product);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category === 'all') {
      params.delete('categoria');
    } else {
      params.set('categoria', category);
    }
    setSearchParams(params);
  };

  const handleNewToggle = () => {
    const newValue = !showNewOnly;
    setShowNewOnly(newValue);
    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set('nuevos', 'true');
    } else {
      params.delete('nuevos');
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSortOrder('');
    setShowNewOnly(false);
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== 'all' || sortOrder !== '' || showNewOnly;

  // ✅ AGREGADO: Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Notificación de producto agregado */}
      {showNotification && notificationProduct && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-white rounded-lg shadow-2xl p-4 flex items-center gap-3 border-l-4 border-green-500 max-w-sm">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">¡Agregado al carrito!</p>
              <p className="text-xs text-gray-600 line-clamp-1">{notificationProduct.name}</p>
            </div>
          </div>
        </div>
      )}

      <div className="container-custom section-padding">
        {/* Header mejorado */}
        <div className="mb-10 text-center">
          <h1 className="text-display-lg mb-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Nuestra Colección
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre nuestra colección completa de ropa masculina premium. Calidad y estilo en cada prenda.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="inline-block w-20 h-1 bg-accent rounded"></span>
            <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
            <span className="inline-block w-20 h-1 bg-accent rounded"></span>
          </div>
        </div>

        {/* Resto del código igual... */}
        {/* Filtros mejorados con mejor UI */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
            {/* Filtros principales */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {/* Categorías con icono */}
              <div className="flex-1">
                <label htmlFor="category-filter" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Categoría
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all bg-gray-50 hover:bg-white font-medium"
                >
                  <option value="all">Todas las categorías</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {capitalizeWords(category)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ordenar con icono */}
              <div className="flex-1">
                <label htmlFor="sort-filter" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  Ordenar por
                </label>
                <select
                  id="sort-filter"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all bg-gray-50 hover:bg-white font-medium"
                >
                  <option value="">Destacados</option>
                  <option value="asc">Precio: Menor a Mayor</option>
                  <option value="desc">Precio: Mayor a Menor</option>
                </select>
              </div>
            </div>

            {/* Filtro de nuevos y limpiar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <label className="flex items-center gap-3 cursor-pointer group px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={showNewOnly}
                  onChange={handleNewToggle}
                  className="w-5 h-5 text-primary border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors">
                  Solo nuevos
                </span>
              </label>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-accent hover:text-white text-gray-700 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full font-semibold shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>{filteredProducts.length}</span>
            </div>
            <p className="text-gray-600 font-medium">
              {filteredProducts.length === 1 ? 'producto disponible' : 'productos disponibles'}
            </p>
          </div>

          {/* Filtros activos */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-shadow">
                  {capitalizeWords(selectedCategory)}
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    aria-label="Remover filtro de categoría"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {showNewOnly && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-orange-500 text-white text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Nuevos
                  <button
                    onClick={handleNewToggle}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    aria-label="Remover filtro de nuevos"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Grid de productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        ) : (
          /* Estado vacío mejorado */
          <div className="text-center py-20 px-4">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No encontramos productos
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Intenta ajustar tus filtros o explora otras categorías para descubrir productos increíbles
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Ver Todos los Productos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;