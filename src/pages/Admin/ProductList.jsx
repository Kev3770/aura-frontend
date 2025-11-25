// src/pages/Admin/ProductList.jsx

import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import AdminTable from '../../components/features/AdminTable';
import AdminProductCard from '../../components/features/AdminProductCard';
import { searchAdminProducts, sortAdminProducts } from '../../data/helpers/productHelpers';
import { exportProductsToJSON } from '../../utils/adminHelpers';
import { CATEGORIES } from '../../data/constants';

const ProductList = () => {
  const { products, removeProduct } = useAdmin();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' o 'grid'
  const [sortBy, setSortBy] = useState('id-asc');

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Buscar
    if (searchQuery) {
      result = searchAdminProducts(result, searchQuery);
    }

    // Filtrar por categoría - ✅ CORREGIDO
    if (categoryFilter !== 'all') {
      result = result.filter(p => {
        const category = typeof p.category === 'object' 
          ? p.category.slug 
          : p.category;
        return category === categoryFilter;
      });
    }

    // Ordenar
    result = sortAdminProducts(result, sortBy);

    return result;
  }, [products, searchQuery, categoryFilter, sortBy]);

  const handleEdit = (product) => {
    navigate(`/admin/productos/editar/${product.id}`);
  };

  const handleDelete = (productId) => {
    removeProduct(productId);
  };

  const handleSort = (field) => {
    // Toggle entre asc y desc
    if (sortBy === `${field}-asc`) {
      setSortBy(`${field}-desc`);
    } else {
      setSortBy(`${field}-asc`);
    }
  };

  const handleExport = () => {
    exportProductsToJSON(filteredProducts);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-display-lg mb-2">Gestión de Productos</h1>
              <p className="text-gray-600">
                {filteredProducts.length} productos encontrados
              </p>
            </div>
            <Link
              to="/admin/productos/nuevo"
              className="btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Producto
            </Link>
          </div>

          <Link to="/admin" className="text-primary hover:text-accent transition-colors text-sm">
            ← Volver al dashboard
          </Link>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar producto
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nombre, ID, categoría..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filtro de Categoría */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="all">Todas</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat} className="capitalize">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Ordenamiento */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="id-asc">ID (Menor a Mayor)</option>
                <option value="id-desc">ID (Mayor a Menor)</option>
                <option value="name-asc">Nombre (A-Z)</option>
                <option value="name-desc">Nombre (Z-A)</option>
                <option value="price-asc">Precio (Menor a Mayor)</option>
                <option value="price-desc">Precio (Mayor a Menor)</option>
                <option value="stock-asc">Stock (Menor a Mayor)</option>
                <option value="stock-desc">Stock (Mayor a Menor)</option>
              </select>
            </div>
          </div>

          {/* Acciones y Vista */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Exportar JSON
              </button>
            </div>

            {/* Toggle Vista */}
            <div className="flex gap-2 border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 text-sm transition-colors ${
                  viewMode === 'table'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-sm transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Vista de Productos */}
        {viewMode === 'table' ? (
          <AdminTable
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSort={handleSort}
            sortBy={sortBy}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <AdminProductCard
                key={product.id}
                product={product}
                onEdit={() => handleEdit(product)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Estado vacío */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
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
            <p className="text-gray-600 mb-2">No se encontraron productos</p>
            <p className="text-sm text-gray-500">
              Intenta ajustar tus filtros o{' '}
              <Link to="/admin/productos/nuevo" className="text-primary hover:underline">
                crea un nuevo producto
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;