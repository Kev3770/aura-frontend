// src/hooks/useCart.js

/**
 * Re-exporta el hook useCart del contexto
 * Este archivo permite tener una ubicación centralizada
 * para hooks personalizados del carrito en el futuro
 */
export { useCart } from '../context/CartContext';

/**
 * Hook personalizado para formatear información del carrito
 * (Ejemplo de cómo podrías extender la funcionalidad)
 */
import { useCart as useCartContext } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

export const useCartFormatted = () => {
  const cart = useCartContext();
  
  return {
    ...cart,
    subtotalFormatted: formatPrice(cart.getSubtotal()),
    discountFormatted: formatPrice(cart.getTotalDiscount()),
    totalFormatted: formatPrice(cart.getSubtotal()),
    itemCount: cart.getTotalItems(),
    isEmpty: cart.cartItems.length === 0,
  };
};