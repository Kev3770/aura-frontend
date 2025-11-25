// src/components/features/CartItem.jsx

import { Link } from 'react-router-dom';
import { formatPrice, calculateFinalPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { MAX_CART_QUANTITY } from '../../data/constants';

/**
 * Componente CartItem - Representa un item en el carrito
 * @param {Object} props
 * @param {Object} props.item - Item del carrito (CartItem)
 */
const CartItem = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();
  
  const finalPrice = calculateFinalPrice(item.price, item.discount);
  const subtotal = finalPrice * item.quantity;
  const hasDiscount = item.discount > 0;

  const handleIncrement = () => {
    if (item.quantity < MAX_CART_QUANTITY) {
      incrementQuantity(item.productId, item.size);
    }
  };

  const handleDecrement = () => {
    decrementQuantity(item.productId, item.size);
  };

  const handleRemove = () => {
    removeFromCart(item.productId, item.size);
  };

  return (
    <article className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-card transition-shadow">
      {/* Imagen del producto */}
      <Link
        to={`/productos/${item.productId}`}
        className="flex-shrink-0 w-24 h-24 bg-secondary rounded overflow-hidden group"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Información del producto */}
      <div className="flex-1 min-w-0">
        {/* Nombre y precio */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <Link
              to={`/productos/${item.productId}`}
              className="text-base font-medium text-gray-900 hover:text-accent transition-colors line-clamp-2"
            >
              {item.name}
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              Talla: <span className="font-medium text-gray-700">{item.size}</span>
            </p>
          </div>

          {/* Botón eliminar */}
          <button
            onClick={handleRemove}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 transition-colors"
            aria-label={`Eliminar ${item.name} del carrito`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        {/* Precio y controles de cantidad */}
        <div className="flex items-center justify-between gap-4 mt-3">
          {/* Precio unitario */}
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-base font-bold text-gray-900">
                  {formatPrice(finalPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(item.price)}
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-gray-900">
                {formatPrice(item.price)}
              </span>
            )}
          </div>

          {/* Controles de cantidad */}
          <div className="flex items-center gap-2">
            {/* Botón decrementar */}
            <button
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:border-primary hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Disminuir cantidad"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>

            {/* Cantidad */}
            <span
              className="w-12 text-center text-sm font-medium"
              aria-label={`Cantidad: ${item.quantity}`}
            >
              {item.quantity}
            </span>

            {/* Botón incrementar */}
            <button
              onClick={handleIncrement}
              disabled={item.quantity >= MAX_CART_QUANTITY}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:border-primary hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Aumentar cantidad"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Subtotal:</span>
            <span className="text-lg font-bold text-primary">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartItem;