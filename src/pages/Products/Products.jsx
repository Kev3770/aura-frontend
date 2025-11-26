// src/pages/Products/Products.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../../components/features/ProductCard';
import Button from '../../components/ui/Button';
import { useProducts } from '../../context/ProductContext'; // ← CAMBIO
import { categoriesMetadata } from '../../data/categories';
import { capitalizeWords } from '../../utils/formatters';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products: allProducts, isLoading, getProductsByCategory } = useProducts(); // ← CAMBIO
  
  const categoryFromUrl = searchParams.get('categoria') || 'all';
  const newFromUrl = searchParams.get('nuevos') === 'true';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [showNewOnly, setShowNewOnly] = useState(newFromUrl);
  const [sortBy, setSortBy] = useState('recent');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Efecto para cargar productos cuando cambia la categoría
  useEffect(() => {
    const loadProducts = async () => {
      if (selectedCategory && selectedCategory !== 'all') {
        const categoryProducts = await getProductsByCategory(selectedCategory);
        setFilteredProducts(categoryProducts);
      } else {
        setFilteredProducts(allProducts);
      }
    };

    loadProducts();
  }, [selectedCategory, allProducts, getProductsByCategory]);

  // Sincronizar con URL
  useEffect(() => {
    const categoryParam = searchParams.get('categoria') || 'all';
    const newParam = searchParams.get('nuevos') === 'true';
    
    setSelectedCategory(categoryParam);
    setShowNewOnly(newParam);
  }, [searchParams]);

  // Aplicar filtros adicionales
  const getFilteredAndSortedProducts = () => {
    let result = [...filteredProducts];

    // Filtro de nuevos
    if (showNewOnly) {
      result = result.filter(p => p.isNew);
    }

    // Ordenamiento
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        const priceA = a.price - (a.price * (a.discount || 0) / 100);
        const priceB = b.price - (b.price * (b.discount || 0) / 100);
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const priceA = a.price - (a.price * (a.discount || 0) / 100);
        const priceB = b.price - (b.price * (b.discount || 0) / 100);
        return priceB - priceA;
      });
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  };

  const productsToShow = getFilteredAndSortedProducts();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    if (category !== 'all') params.set('categoria', category);
    if (showNewOnly) params.set('nuevos', 'true');
    setSearchParams(params);
  };

  const handleToggleNew = () => {
    const newValue = !showNewOnly;
    setShowNewOnly(newValue);
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('categoria', selectedCategory);
    if (newValue) params.set('nuevos', 'true');
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setShowNewOnly(false);
    setSortBy('recent');
    setSearchParams({});
  };

  if (isLoading && filteredProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-display-lg mb-4">
            {selectedCategory === 'all' ? 'Todos los Productos' : capitalizeWords(selectedCategory)}
          </h1>
          <p className="text-gray-600 text-lg">
            {productsToShow.length} {productsToShow.length === 1 ? 'producto encontrado' : 'productos encontrados'}
          </p>
        </div>

        {/* Filtros y Ordenamiento */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filtros */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-display uppercase mb-4">Filtros</h2>
              
              {/* Categorías */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Categoría</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Todas
                  </button>
                  {categoriesMetadata.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {capitalizeWords(cat.name)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtro Nuevos */}
              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showNewOnly}
                    onChange={handleToggleNew}
                    className="w-4 h-4 text-primary rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm">Solo productos nuevos</span>
                </label>
              </div>

              {/* Botón Limpiar */}
              {(selectedCategory !== 'all' || showNewOnly) && (
                <Button
                  variant="secondary"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Limpiar Filtros
                </Button>
              )}
            </div>
          </aside>

          {/* Grid de Productos */}
          <div className="lg:col-span-3">
            {/* Ordenamiento */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Mostrando {productsToShow.length} productos
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="recent">Más recientes</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>

            {/* Productos */}
            {productsToShow.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsToShow.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  No se encontraron productos con los filtros seleccionados
                </p>
                <Button variant="primary" onClick={clearFilters}>
                  Ver Todos los Productos
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;