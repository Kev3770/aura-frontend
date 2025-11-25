// src/pages/ProductDetail/ProductDetail.jsx

import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { getProductBySlug, getRelatedProducts } from '../../data/helpers/getProductBySlug';
import { formatPrice, formatPriceWithDiscount, formatDiscount, capitalizeWords } from '../../utils/formatters';
import { hasAnyStock } from '../../data/helpers/validateStock';
import { useCart } from '../../context/CartContext';
import SizeSelector from '../../components/features/SizeSelector';
import ProductCard from '../../components/features/ProductCard';
import Button from '../../components/ui/Button';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useAdmin();
  const product = getProductBySlug(products, slug);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display-lg mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Producto no encontrado
          </h1>
          <p className="text-gray-600 mb-10 text-lg">
            El producto que buscas no existe o fue removido
          </p>
          <Link to="/productos">
            <Button variant="primary">Ver Todos los Productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasStock = hasAnyStock(product);
  const hasDiscount = product.discount > 0;
  const finalPrice = formatPriceWithDiscount(product.price, product.discount);
  const relatedProducts = getRelatedProducts(products, product.id, product.category, 4);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      return;
    }

    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const success = addToCart(product, selectedSize);
    if (success) {
      setSelectedSize(null);
    }
    setIsAddingToCart(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container-custom section-padding">
        {/* Breadcrumb */}
        <nav className="mb-10 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-3 text-gray-600 font-medium">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li>
              <Link to="/productos" className="hover:text-primary transition-colors">
                Productos
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li>
              <Link
                to={`/productos?categoria=${product.category}`}
                className="hover:text-primary transition-colors"
              >
                {capitalizeWords(product.category)}
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li className="text-primary font-bold" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Galería de imágenes */}
          <div>
            {/* Imagen principal */}
            <div className="aspect-product bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mb-6 shadow-xl border-2 border-gray-200 transform transition-all duration-300 hover:shadow-2xl">
              <img
                src={product.images[selectedImageIndex]}
                alt={`${product.name} - Vista ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Miniaturas */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-3 transition-all duration-300 transform hover:scale-105 ${
                      selectedImageIndex === index
                        ? 'border-primary shadow-lg ring-4 ring-primary/20'
                        : 'border-gray-300 hover:border-gray-400 shadow'
                    }`}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div>
            {/* Badges */}
            <div className="flex gap-3 mb-6">
              {product.isNew && <span className="badge-new shadow-lg">Nuevo</span>}
              {hasDiscount && <span className="badge-discount shadow-lg">{formatDiscount(product.discount)}</span>}
              {!hasStock && (
                <span className="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase shadow-lg">
                  Agotado
                </span>
              )}
            </div>

            {/* Nombre */}
            <h1 className="text-display-md mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {product.name}
            </h1>

            {/* Categoría */}
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 capitalize">
               {typeof product.category === 'object' 
               ? product.category.name 
               : product.category}
            </p>

            {/* Precio */}
            <div className="mb-10 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-200">
              {hasDiscount ? (
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {finalPrice}
                  </span>
                  <span className="text-2xl text-gray-400 line-through font-medium">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-green-600 font-bold text-lg bg-green-50 px-4 py-2 rounded-lg">
                    Ahorras {formatPrice(product.price * product.discount / 100)}
                  </span>
                </div>
              ) : (
                <span className="text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Descripción */}
            <div className="mb-10 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-900 border-b-2 border-primary pb-3">
                Descripción
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
            </div>

            {/* Colores */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                  Colores disponibles
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className="px-5 py-3 border-2 border-gray-300 rounded-xl text-sm font-medium hover:border-primary transition-all duration-300 transform hover:scale-105 shadow"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Selector de tallas */}
            {hasStock && (
              <div className="mb-10">
                <SizeSelector
                  product={product}
                  selectedSize={selectedSize}
                  onSizeSelect={setSelectedSize}
                />
              </div>
            )}

            {/* Botones de acción */}
            <div className="space-y-4 mb-10">
              {hasStock ? (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleAddToCart}
                    disabled={!selectedSize || isAddingToCart}
                    loading={isAddingToCart}
                    ariaLabel="Agregar al carrito"
                  >
                    Agregar al Carrito
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onClick={() => navigate('/carrito')}
                  >
                    Ver Carrito
                  </Button>
                </>
              ) : (
                <Button variant="primary" size="lg" fullWidth disabled>
                  Producto Agotado
                </Button>
              )}
            </div>

            {/* Información adicional */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border-2 border-green-200 space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1 text-base">Envío gratis</p>
                  <p className="text-sm text-gray-700 font-medium">En compras superiores a $150,000</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1 text-base">Devoluciones fáciles</p>
                  <p className="text-sm text-gray-700 font-medium">30 días para cambios y devoluciones</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1 text-base">Calidad garantizada</p>
                  <p className="text-sm text-gray-700 font-medium">100% materiales premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="text-center mb-12">
              <h2 className="text-display-sm mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                También te puede interesar
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="transform transition-all duration-300 hover:scale-105">
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;