// src/pages/Cart/Cart.jsx

import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/features/CartItem';
import Button from '../../components/ui/Button';
import { formatPrice } from '../../utils/formatters';

const Cart = () => {
  const {
    cartItems,
    isLoading,
    clearCart,
    getSubtotal,
    getTotalDiscount,
    getTotalItems,
  } = useCart();

  const subtotal = getSubtotal();
  const discount = getTotalDiscount();
  const total = subtotal;
  const itemCount = getTotalItems();
  const isEmpty = cartItems.length === 0;

  const shippingThreshold = 150000;
  const shipping = subtotal >= shippingThreshold ? 0 : 10000;
  const finalTotal = total + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-gray-700 text-lg font-medium">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container-custom section-padding">
          <div className="max-w-2xl mx-auto text-center">
            {/* Icono */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
              <svg
                className="w-40 h-40 mx-auto text-gray-400 relative"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>

            {/* Mensaje */}
            <h1 className="text-display-md mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tu carrito está vacío
            </h1>
            <p className="text-gray-600 text-xl mb-10 leading-relaxed">
              Aún no has agregado productos.<br />
              Explora nuestra colección y encuentra tu estilo.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/productos">
                <Button variant="primary" size="lg">
                  Ver Productos
                </Button>
              </Link>
              <Link to="/productos?nuevos=true">
                <Button variant="secondary" size="lg">
                  Ver Novedades
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-display-lg mb-3 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Carrito de Compras
          </h1>
          <p className="text-gray-600 text-lg">
            <span className="font-bold text-gray-900">{itemCount}</span>
            {' '}
            {itemCount === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header de lista */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
              <h2 className="text-xl font-display uppercase tracking-wider text-gray-900">Productos</h2>
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-700 transition-all duration-300 underline decoration-2 underline-offset-4 hover:decoration-red-700 font-medium"
                aria-label="Vaciar carrito"
              >
                Vaciar carrito
              </button>
            </div>

            {/* Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="transform transition-all duration-300 hover:scale-[1.01]">
                  <CartItem item={item} />
                </div>
              ))}
            </div>

            {/* Link para seguir comprando */}
            <div className="pt-8">
              <Link
                to="/productos"
                className="inline-flex items-center gap-3 text-primary hover:text-accent transition-all duration-300 group font-medium text-lg"
              >
                <svg
                  className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="relative">
                  Seguir comprando
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sticky top-24 transform transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display uppercase mb-8 tracking-wider border-b-2 border-primary pb-4">
                Resumen del Pedido
              </h2>

              {/* Desglose */}
              <div className="space-y-5 mb-8">
                <div className="flex justify-between text-gray-700 text-base">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 bg-green-50 rounded-lg p-3 -mx-2">
                    <span className="font-medium">Descuentos</span>
                    <span className="font-bold">-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700 text-base">
                  <span className="font-medium">Envío</span>
                  <span className="font-bold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      <span className="text-gray-900">{formatPrice(shipping)}</span>
                    )}
                  </span>
                </div>

                {/* Mensaje de envío gratis */}
                {subtotal < shippingThreshold && (
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
                    <p className="text-sm text-yellow-900 font-medium">
                      ¡Agrega {formatPrice(shippingThreshold - subtotal)} más para envío gratis!
                    </p>
                  </div>
                )}

                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2" />

                {/* Total */}
                <div className="flex justify-between text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pt-2">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Botón de checkout */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => alert('Checkout no implementado en el MVP. Esta función estará disponible próximamente.')}
              >
                Proceder al Pago
              </Button>

              {/* Información de seguridad */}
              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <div className="flex items-start gap-4 text-sm text-gray-700 bg-green-50 rounded-xl p-4">
                  <svg
                    className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Compra 100% Segura</p>
                    <p className="text-xs text-gray-600">Tus datos están protegidos</p>
                  </div>
                </div>
              </div>

              {/* Métodos de pago aceptados */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest font-bold">
                  Métodos de pago
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {['Visa', 'Mastercard', 'PSE', 'Efecty'].map((method) => (
                    <div
                      key={method}
                      className="px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg text-xs font-bold text-gray-800 text-center border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;