// src/components/features/ProductCard.jsx

import { Link } from 'react-router-dom';
import { formatPrice, formatPriceWithDiscount, formatDiscount } from '../../utils/formatters';
import { hasAnyStock } from '../../data/helpers/validateStock';

/**
 * Componente ProductCard - Muestra un producto en formato tarjeta
 * @param {Object} props
 * @param {Object} props.product - Objeto del producto
 * @param {Function} props.onAddToCart - Función para agregar al carrito
 */
const ProductCard = ({ product, onAddToCart }) => {
  // ✅ FUNCIÓN HELPER PARA OBTENER IMAGEN PRINCIPAL
  const getMainImage = () => {
    // Validar que images exista y sea un array
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      const imageData = product.images[0];
      
      // Si es un objeto con propiedad 'url' (modelo ProductImage)
      if (imageData && typeof imageData === 'object' && imageData.url) {
        return imageData.url;
      }
      
      // Si es un string directo
      if (typeof imageData === 'string') {
        if (imageData.startsWith('https://') || imageData.startsWith('http://') || imageData.startsWith('data:image')) {
          return imageData;
        }
      }
    }
    
    // Placeholder SVG inline
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23e5e7eb" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="20" fill="%239ca3af"%3ESin Imagen%3C/text%3E%3C/svg%3E';
  };

  const mainImage = getMainImage();
  const hasStock = hasAnyStock(product);
  const finalPrice = formatPriceWithDiscount(product.price, product.discount);
  const hasDiscount = product.discount > 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasStock && onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <article className="card group relative hover:shadow-xl transition-all duration-300">
      <Link
        to={`/productos/${product.slug}`}
        className="block"
        aria-label={`Ver detalles de ${product.name}`}
      >
        {/* Imagen del producto */}
        <div className="relative aspect-product bg-secondary overflow-hidden rounded-t-lg">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              // Si la imagen falla al cargar, mostrar placeholder SVG
              console.error(`Error cargando imagen de "${product.name}":`, e.target.src);
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23fee2e2" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="%23dc2626"%3EError al Cargar%3C/text%3E%3C/svg%3E';
            }}
          />

          {/* Badges mejorados */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.isNew && (
              <span className="badge-new shadow-md animate-pulse">
                Nuevo
              </span>
            )}
            {hasDiscount && (
              <span className="badge-discount shadow-md font-bold">
                {formatDiscount(product.discount)}
              </span>
            )}
          </div>

          {/* Badge de agotado mejorado */}
          {!hasStock && (
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <span className="block text-white font-bold uppercase tracking-widest text-lg mb-1">
                  Agotado
                </span>
                <span className="text-white/80 text-xs">
                  Vuelve pronto
                </span>
              </div>
            </div>
          )}

          {/* Overlay hover para productos con stock */}
          {hasStock && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>

        {/* Información del producto */}
        <div className="p-5">
          {/* Categoría - ✅ CORREGIDO */}
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
            {typeof product.category === 'object' 
              ? product.category.name 
              : product.category}
          </p>

          {/* Nombre */}
          <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-accent transition-colors leading-snug min-h-[3rem]">
            {product.name}
          </h3>

          {/* Precio mejorado */}
          <div className="flex items-baseline gap-2 mb-4">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-gray-900">{finalPrice}</span>
                <span className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            )}
          </div>

          {/* Tallas disponibles mejoradas */}
          {hasStock && (
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Tallas disponibles
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {product.sizes
                  .filter(size => size.stock > 0)
                  .slice(0, 5)
                  .map((size, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300 transition-colors"
                    >
                      {size.size}
                    </span>
                  ))}
                {product.sizes.filter(size => size.stock > 0).length > 5 && (
                  <span className="text-xs text-gray-400 font-medium ml-1">
                    +{product.sizes.filter(size => size.stock > 0).length - 5}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Botón Agregar al Carrito - Mejorado y más visible */}
      {hasStock && (
        <div className="absolute bottom-5 right-5">
          <button
            onClick={handleAddToCart}
            className="relative w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300 flex items-center justify-center group/btn hover:scale-110 active:scale-95"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {/* Icono del carrito con animación */}
            <svg 
              className="w-6 h-6 transition-transform group-hover/btn:scale-110" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            
            {/* Plus badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
              +
            </span>

            {/* Tooltip mejorado */}
            <div className="absolute bottom-full mb-2 right-0 bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-xl">
              Agregar al carrito
              <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </button>
        </div>
      )}
    </article>
  );
};

export default ProductCard;