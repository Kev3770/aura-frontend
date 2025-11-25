// src/pages/Admin/ProductStats.jsx

import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { formatPrice } from '../../utils/formatters';
import { generateInventoryReport, exportProductsToJSON } from '../../utils/adminHelpers';

const ProductStats = () => {
  const { products, getStats } = useAdmin();
  const stats = getStats();

  const handleExportReport = () => {
    const report = generateInventoryReport(products);
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `aura-inventory-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Calcular porcentajes
  const outOfStockPercent = stats.total > 0 ? ((stats.outOfStock / stats.total) * 100).toFixed(1) : 0;
  const lowStockPercent = stats.total > 0 ? ((stats.lowStock / stats.total) * 100).toFixed(1) : 0;
  const featuredPercent = stats.total > 0 ? ((stats.featured / stats.total) * 100).toFixed(1) : 0;
  const discountPercent = stats.total > 0 ? ((stats.withDiscount / stats.total) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-display-lg mb-2">Estadísticas e Informes</h1>
              <p className="text-gray-600">
                Análisis detallado del inventario y productos
              </p>
            </div>
            <button
              onClick={handleExportReport}
              className="btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exportar Reporte
            </button>
          </div>

          <Link to="/admin" className="text-primary hover:text-accent transition-colors text-sm">
            ← Volver al dashboard
          </Link>
        </div>

        {/* Resumen General */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-display uppercase mb-6">Resumen General</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-primary text-white rounded-lg">
              <p className="text-4xl font-bold mb-2">{stats.total}</p>
              <p className="text-sm uppercase tracking-wide">Total Productos</p>
            </div>

            <div className="text-center p-4 bg-green-500 text-white rounded-lg">
              <p className="text-4xl font-bold mb-2">{stats.totalStock}</p>
              <p className="text-sm uppercase tracking-wide">Unidades en Stock</p>
            </div>

            <div className="text-center p-4 bg-accent text-white rounded-lg">
              <p className="text-4xl font-bold mb-2">{formatPrice(stats.averagePrice)}</p>
              <p className="text-sm uppercase tracking-wide">Precio Promedio</p>
            </div>

            <div className="text-center p-4 bg-blue-500 text-white rounded-lg">
              <p className="text-4xl font-bold mb-2">{formatPrice(stats.totalValue)}</p>
              <p className="text-sm uppercase tracking-wide">Valor Total</p>
            </div>
          </div>
        </div>

        {/* Estado del Stock */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-display uppercase mb-6">Estado del Stock</h2>
          
          <div className="space-y-6">
            {/* Productos agotados */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Productos Agotados</span>
                <span className="text-sm font-bold text-red-600">{stats.outOfStock} ({outOfStockPercent}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-red-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${outOfStockPercent}%` }}
                />
              </div>
            </div>

            {/* Stock bajo */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Stock Bajo (≤5 unidades)</span>
                <span className="text-sm font-bold text-yellow-600">{stats.lowStock} ({lowStockPercent}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${lowStockPercent}%` }}
                />
              </div>
            </div>

            {/* Stock disponible */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Stock Disponible</span>
                <span className="text-sm font-bold text-green-600">
                  {stats.total - stats.outOfStock - stats.lowStock} ({(100 - parseFloat(outOfStockPercent) - parseFloat(lowStockPercent)).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${100 - parseFloat(outOfStockPercent) - parseFloat(lowStockPercent)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Distribución por Categoría */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-display uppercase mb-6">Distribución por Categoría</h2>
          
          <div className="space-y-4">
            {Object.entries(stats.byCategory)
              .sort(([, a], [, b]) => b - a)
              .map(([category, count]) => {
                const percentage = ((count / stats.total) * 100).toFixed(1);
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                      <span className="text-sm font-bold text-primary">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Características Especiales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Destacados */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.featured}</p>
                <p className="text-sm text-gray-600">Destacados</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {featuredPercent}% del catálogo
              </p>
            </div>
          </div>

          {/* Nuevos */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
                <p className="text-sm text-gray-600">Nuevos</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Productos de la nueva colección
              </p>
            </div>
          </div>

          {/* Con descuento */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.withDiscount}</p>
                <p className="text-sm text-gray-600">Con Descuento</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {discountPercent}% del catálogo
              </p>
            </div>
          </div>
        </div>

        {/* Alertas y Recomendaciones */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-display uppercase mb-6">Alertas y Recomendaciones</h2>
          
          <div className="space-y-4">
            {stats.outOfStock > 0 && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="font-medium text-red-800 mb-1">Productos agotados</p>
                  <p className="text-sm text-red-700">
                    Tienes {stats.outOfStock} productos sin stock. Considera reabastecer o marcarlos como no disponibles.
                  </p>
                </div>
              </div>
            )}

            {stats.lowStock > 0 && (
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-yellow-800 mb-1">Stock bajo</p>
                  <p className="text-sm text-yellow-700">
                    {stats.lowStock} productos tienen 5 o menos unidades. Planifica reabastecimiento pronto.
                  </p>
                </div>
              </div>
            )}

            {stats.outOfStock === 0 && stats.lowStock === 0 && (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-green-800 mb-1">Inventario saludable</p>
                  <p className="text-sm text-green-700">
                    Todos los productos tienen stock adecuado. ¡Excelente gestión!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductStats;