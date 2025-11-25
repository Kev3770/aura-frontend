// src/components/features/AdminProductCard.jsx

import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';
import { getTotalStock, getStockStatus } from '../../utils/adminHelpers';

/**
 * Componente AdminProductCard - Card de producto para vista admin
 * @param {Object} props
 * @param {Object} props.product - Producto a mostrar
 * @param {Function} props.onEdit - Callback para editar
 * @param {Function} props.onDelete - Callback para eliminar
 */
const AdminProductCard = ({ product, onEdit, onDelete }) => {
  const totalStock = getTotalStock(product);
  const stockStatus = getStockStatus(product);

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar "${product.name}"? Esta acción no se puede deshacer.`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-card-hover transition-shadow">
      {/* Imagen */}
      <div className="relative aspect-square bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="badge-new">Nuevo</span>
          )}
          {product.featured && (
            <span className="inline-block bg-accent text-white px-2 py-1 rounded text-xs font-bold uppercase">
              Destacado
            </span>
          )}
          {product.discount > 0 && (
            <span className="badge-discount">-{product.discount}%</span>
          )}
        </div>

        {/* Stock status badge */}
        <div className="absolute top-2 right-2">
          <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase ${
            stockStatus.status === 'out' ? 'bg-red-100 text-red-800' :
            stockStatus.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {stockStatus.label}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Categoría */}
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
          {product.category}
        </p>

        {/* Nombre */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Precio e ID */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-gray-500">
            ID: {product.id}
          </span>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2 mb-3 text-sm">
          <span className="text-gray-600">Stock total:</span>
          <span className={`font-semibold ${stockStatus.color}`}>
            {totalStock} unidades
          </span>
        </div>

        {/* Tallas */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Tallas disponibles:</p>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((size, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded ${
                  size.stock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {size.size}: {size.stock}
              </span>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-2">
          <Link
            to={`/productos/${product.slug}`}
            target="_blank"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-center"
          >
            👁️ Ver
          </Link>
          <button
            onClick={onEdit}
            className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded hover:bg-primary-light transition-colors"
          >
            ✏️ Editar
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;