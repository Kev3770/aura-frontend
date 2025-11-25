// src/context/CartContext.jsx

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { saveCart, loadCart, clearCart as clearLocalStorage } from '../utils/localStorage';
import { canAddToCart, getStockForSize } from '../data/helpers/validateStock';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

/**
 * Provider del carrito de compras
 */
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    const savedCart = loadCart();
    setCartItems(savedCart);
    setIsLoading(false);
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (!isLoading) {
      saveCart(cartItems);
    }
  }, [cartItems, isLoading]);

  /**
   * Agrega un producto al carrito
   * @param {Object} product - Producto a agregar
   * @param {string} selectedSize - Talla seleccionada
   * @param {number} quantity - Cantidad a agregar (default: 1)
   */
  const addToCart = useCallback((product, selectedSize, quantity = 1) => {
    // Validar stock disponible
    const availableStock = getStockForSize(product, selectedSize);
    
    // Verificar si el producto ya está en el carrito
    const existingItem = cartItems.find(
      (item) => item.productId === product.id && item.size === selectedSize
    );
    
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    
    // Validar si se puede agregar
    const validation = canAddToCart(currentQuantity, quantity, availableStock);
    
    if (!validation.valid) {
      showError(validation.error);
      return false;
    }

    // Agregar o actualizar item
    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === product.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem = {
        productId: product.id,
        size: selectedSize,
        quantity,
        name: product.name,
        price: product.price,
        discount: product.discount,
        image: product.images[0],
      };
      
      setCartItems((prev) => [...prev, newItem]);
    }

    showSuccess('Producto agregado al carrito');
    return true;
  }, [cartItems, showSuccess, showError]);

  /**
   * Actualiza la cantidad de un item en el carrito
   * @param {string} productId - ID del producto
   * @param {string} size - Talla del producto
   * @param {number} newQuantity - Nueva cantidad
   */
  const updateQuantity = useCallback((productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, []);

  /**
   * Incrementa la cantidad de un item
   * @param {string} productId - ID del producto
   * @param {string} size - Talla del producto
   */
  const incrementQuantity = useCallback((productId, size) => {
    const item = cartItems.find(
      (item) => item.productId === productId && item.size === size
    );
    
    if (item) {
      updateQuantity(productId, size, item.quantity + 1);
    }
  }, [cartItems, updateQuantity]);

  /**
   * Decrementa la cantidad de un item
   * @param {string} productId - ID del producto
   * @param {string} size - Talla del producto
   */
  const decrementQuantity = useCallback((productId, size) => {
    const item = cartItems.find(
      (item) => item.productId === productId && item.size === size
    );
    
    if (item) {
      updateQuantity(productId, size, item.quantity - 1);
    }
  }, [cartItems, updateQuantity]);

  /**
   * Elimina un item del carrito
   * @param {string} productId - ID del producto
   * @param {string} size - Talla del producto
   */
  const removeFromCart = useCallback((productId, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === size)
      )
    );
    showSuccess('Producto eliminado del carrito');
  }, [showSuccess]);

  /**
   * Limpia todo el carrito
   */
  const clearCart = useCallback(() => {
    setCartItems([]);
    clearLocalStorage();
    showSuccess('Carrito vaciado');
  }, [showSuccess]);

  /**
   * Obtiene la cantidad total de items en el carrito
   */
  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  /**
   * Calcula el subtotal del carrito
   */
  const getSubtotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price - (item.price * item.discount / 100);
      return total + itemPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  /**
   * Obtiene el descuento total aplicado
   */
  const getTotalDiscount = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const discountAmount = (item.price * item.discount / 100) * item.quantity;
      return total + discountAmount;
    }, 0);
  }, [cartItems]);

  /**
   * Verifica si un producto está en el carrito
   * @param {string} productId - ID del producto
   * @param {string} size - Talla del producto
   */
  const isInCart = useCallback((productId, size) => {
    return cartItems.some(
      (item) => item.productId === productId && item.size === size
    );
  }, [cartItems]);

  /**
   * Obtiene la cantidad de un producto específico en el carrito
   * @param {string} productId - ID del producto
   * @param {string} size - Talla del producto
   */
  const getItemQuantity = useCallback((productId, size) => {
    const item = cartItems.find(
      (item) => item.productId === productId && item.size === size
    );
    return item ? item.quantity : 0;
  }, [cartItems]);

  const value = {
    cartItems,
    isLoading,
    addToCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getSubtotal,
    getTotalDiscount,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook para usar el carrito
 * @returns {Object} API del carrito
 */
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  
  return context;
};

export default CartContext;