// src/components/features/AdminTable.jsx

import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';
import { getTotalStock, getStockStatus } from '../../utils/adminHelpers';

/**
 * Componente AdminTable - Tabla de productos para administración
 * @param {Object} props
 * @param {Array} props.products - Array de productos
 * @param {Function} props.onEdit - Callback para editar
 * @param {Function} props.onDelete - Callback para eliminar
 * @param {Function} props.onSort - Callback para ordenar
 * @param {string} props.sortBy - Campo actual de ordenamiento
 */
const AdminTable = ({ products, onEdit, onDelete, onSort, sortBy }) => {
  const handleDelete = (product) => {
    if (window.confirm(`¿Estás seguro de eliminar "${product.name}"? Esta acción no se puede deshacer.`)) {
      onDelete(product.id);
    }
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field && sortBy !== `${field}-desc`) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    const isDesc = sortBy.includes('-desc');
    return (
      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isDesc ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        )}
      </svg>
    );
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No hay productos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('id')}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-primary"
                >
                  ID
                  <SortIcon field="id" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">Imagen</th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-primary"
                >
                  Nombre
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">Categoría</th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('price')}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-primary"
                >
                  Precio
                  <SortIcon field="price" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('stock')}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-primary"
                >
                  Stock
                  <SortIcon field="stock" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => {
              const totalStock = getTotalStock(product);
              const stockStatus = getStockStatus(product);

              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  {/* ID */}
                  <td className="px-4 py-3 text-sm font-mono text-gray-600">
                    {product.id.substring(0, 8)}...
                  </td>

                  {/* Imagen */}
                  <td className="px-4 py-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>

                  {/* Nombre */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 line-clamp-1">
                        {product.name}
                      </span>
                      <div className="flex gap-1 mt-1">
                        {product.isNew && (
                          <span className="text-xs bg-accent text-white px-2 py-0.5 rounded">
                            Nuevo
                          </span>
                        )}
                        {product.featured && (
                          <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">
                            Destacado
                          </span>
                        )}
                        {product.discount > 0 && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Categoría - ✅ CORREGIDO */}
                  <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                    {typeof product.category === 'object' 
                      ? product.category.name 
                      : product.category}
                  </td>

                  {/* Precio */}
                  <td className="px-4 py-3">
                    <span className="font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${stockStatus.color}`}>
                      {totalStock}
                    </span>
                  </td>

                  {/* Estado */}
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      stockStatus.status === 'out' ? 'bg-red-100 text-red-800' :
                      stockStatus.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {stockStatus.label}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/productos/${product.slug}`}
                        target="_blank"
                        className="p-2 text-gray-600 hover:text-primary transition-colors"
                        title="Ver en tienda"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 text-gray-600 hover:text-primary transition-colors"
                        title="Editar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                        title="Eliminar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;