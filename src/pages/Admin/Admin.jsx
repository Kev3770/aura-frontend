// src/pages/Admin/Admin.jsx

import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import StatsCard from '../../components/features/StatsCard';
import { formatPrice } from '../../utils/formatters';

const Admin = () => {
  const { products, getStats } = useAdmin();
  const stats = getStats();

  // Calcular estadísticas adicionales que no vienen de getStats()
  const byCategory = products.reduce((acc, product) => {
    const category = typeof product.category === 'object' 
      ? product.category.name 
      : product.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const withDiscount = products.filter(p => p.discount > 0).length;

  const averagePrice = products.length > 0
    ? products.reduce((sum, p) => sum + p.price, 0) / products.length
    : 0;

  const totalValue = products.reduce((sum, product) => {
    const stock = product.sizes?.reduce((s, size) => s + (size.stock || 0), 0) || 0;
    return sum + (product.price * stock);
  }, 0);

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-display-lg mb-2">Panel de Administración</h1>
          <p className="text-gray-600">
            Gestiona tu inventario y visualiza estadísticas en tiempo real
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/admin/productos"
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-card-hover transition-shadow group"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display uppercase text-lg">Productos</h3>
              <svg className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm">Ver y gestionar todos los productos</p>
          </Link>

          <Link
            to="/admin/productos/nuevo"
            className="bg-primary text-white p-6 rounded-lg hover:bg-primary-light transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display uppercase text-lg">Nuevo Producto</h3>
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-white/80 text-sm">Agregar un nuevo producto al catálogo</p>
          </Link>

          <Link
            to="/admin/estadisticas"
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-card-hover transition-shadow group"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display uppercase text-lg">Estadísticas</h3>
              <svg className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm">Ver análisis detallado del inventario</p>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Productos"
            value={stats.totalProducts}
            color="primary"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
          />

          <StatsCard
            title="Stock Total"
            value={stats.totalStock}
            color="success"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
          />

          <StatsCard
            title="Sin Stock"
            value={stats.outOfStock}
            color="error"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />

          <StatsCard
            title="Stock Bajo"
            value={stats.lowStock}
            color="warning"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            }
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Destacados"
            value={stats.featured}
            color="info"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            }
          />

          <StatsCard
            title="Nuevos"
            value={stats.newProducts}
            color="success"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
          />

          <StatsCard
            title="Con Descuento"
            value={withDiscount}
            color="error"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        {/* Categories Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-display uppercase mb-6">Productos por Categoría</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(byCategory).map(([category, count]) => (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <p className="text-2xl font-bold text-primary mb-1">{count}</p>
                <p className="text-sm text-gray-600 capitalize">{category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Value Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
              Precio Promedio
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {formatPrice(averagePrice)}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
              Valor Total Inventario
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {formatPrice(totalValue)}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex gap-4">
          <Link to="/" className="text-primary hover:text-accent transition-colors">
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;