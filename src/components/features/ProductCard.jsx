// src/components/features/ProductCard.jsx
import { Link } from 'react-router-dom';
import { memo } from 'react'; // ← AGREGAR
import { formatPrice } from '../../utils/formatters';

const ProductCard = memo(({ product }) => { // ← WRAP CON memo
  const finalPrice = product.price - (product.price * (product.discount || 0) / 100);
  const hasDiscount = product.discount > 0;
  
  // Obtener primera imagen
  const primaryImage = product.images?.[0]?.url || product.images?.[0] || '/placeholder.jpg';

  return (
    <Link
      to={`/productos/${product.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* Imagen */}
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy" // ← IMPORTANTE
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="badge-new shadow-lg">
              Nuevo
            </span>
          )}
          {hasDiscount && (
            <span className="badge-discount shadow-lg">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Categoría */}
        {product.category && (
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">
            {product.category.name}
          </p>
        )}

        {/* Nombre */}
        <h3 className="text-lg font-display uppercase mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-200">
          {product.name}
        </h3>

        {/* Precio */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(finalPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Stock */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {product.sizes.some(s => s.stock > 0) ? (
                <span className="text-green-600 font-medium">● En stock</span>
              ) : (
                <span className="text-red-600 font-medium">● Agotado</span>
              )}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}); // ← CERRAR memo

ProductCard.displayName = 'ProductCard';

export default ProductCard;