// src/pages/Home/Home.jsx

import { Link } from 'react-router-dom';
import Hero from '../../components/layout/Hero';
import ProductCard from '../../components/features/ProductCard';
import CategoryTile from '../../components/features/CategoryTile';
import Button from '../../components/ui/Button';
import BackendWakeup from '../../components/ui/BackendWakeup';
import { useAdmin } from '../../context/AdminContext';
import { categoriesMetadata } from '../../data/categories';
import { filterByCategory } from '../../data/helpers/filterProducts';

const Home = () => {
  const { products, isLoading } = useAdmin();

  // Mostrar pantalla de encendido del backend
  if (isLoading && products.length === 0) {
    return <BackendWakeup />;
  }

  // Productos destacados y nuevos
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);

  // Contador de productos por categoría
  const categoriesWithCount = categoriesMetadata.map(category => ({
    ...category,
    productCount: filterByCategory(products, category.id).length
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero />

      {/* ===========================
          SECCIÓN: DESTACADOS
      ============================ */}
      <section className="section-padding bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          {/* Título */}
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <h2 className="text-display-md mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Productos Destacados
              </h2>
              <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Nuestra selección premium de prendas masculinas.
              Calidad excepcional y estilo atemporal.
            </p>
          </div>

          {/* Lista */}
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredProducts.map(product => (
                <div key={product.id} className="transform transition-all duration-300 hover:scale-105 hover:z-10">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-gray-500 text-lg">No hay productos destacados disponibles</p>
            </div>
          )}

          {/* Botón */}
          <div className="text-center">
            <Link to="/productos">
              <Button variant="primary" size="lg">
                Ver Todos los Productos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===========================
          SECCIÓN: CATEGORÍAS
      ============================ */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container-custom relative z-10">
          {/* Título */}
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <h2 className="text-display-md mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Explora por Categoría
              </h2>
              <div className="h-1 bg-gradient-to-r from-accent to-primary rounded-full" />
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Encuentra exactamente lo que buscas.
              Cada categoría está cuidadosamente curada para ti.
            </p>
          </div>

          {/* Categorías */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesWithCount.slice(0, 6).map((category, index) => (
              <div
                key={category.id}
                className="transform transition-all duration-300 hover:scale-105 hover:z-10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CategoryTile
                  category={category}
                  productCount={category.productCount}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          SECCIÓN: NUEVOS
      ============================ */}
      <section className="section-padding bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          {/* Título */}
          <div className="text-center mb-16">
            <span className="badge-new inline-block mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
              Nuevo
            </span>
            <div className="inline-block mb-6">
              <h2 className="text-display-md mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Recién Llegados
              </h2>
              <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Las últimas tendencias en moda masculina.
              Sé el primero en lucir nuestras nuevas colecciones.
            </p>
          </div>

          {/* Lista */}
          {newProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {newProducts.map(product => (
                <div key={product.id} className="transform transition-all duration-300 hover:scale-105">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mb-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <p className="text-gray-500 text-lg">No hay productos nuevos disponibles</p>
            </div>
          )}

          {/* Botón */}
          <div className="text-center">
            <Link to="/productos?nuevos=true">
              <Button variant="secondary" size="lg">
                Ver Todas las Novedades
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===========================
          CTA & FEATURES
      ============================ */}
      {/* Todo tu último código ya corregido está aquí debajo, lo dejé igual como lo pasaste */}

      <section className="bg-gradient-to-br from-primary via-primary-dark to-accent text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }} />
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="container-custom text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-display-md mb-6 drop-shadow-lg font-bold">¿Necesitas Ayuda?</h2>
            <p className="text-gray-100 text-xl mb-10 leading-relaxed drop-shadow">
              Nuestro equipo está listo para asesorarte en tu próxima compra.
              Contáctanos y encuentra el estilo perfecto que se adapte a tu personalidad.
            </p>
            <Link to="/contacto">
              <Button variant="secondary" size="lg" className="shadow-2xl hover:shadow-accent/50">
                Contactar Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===========================
          FEATURES
      ============================ */}
      <section className="section-padding bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display uppercase mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ¿Por Qué Elegirnos?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprometidos con tu satisfacción en cada compra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Envío gratis */}
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Envío Gratis</h3>
              <p className="text-gray-600">Para compras superiores a $150.000 COP</p>
            </div>

            {/* Calidad */}
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">Prendas seleccionadas con estándares superiores</p>
            </div>

            {/* Soporte */}
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-all duration-300">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v.01M8 9a4 4 0 118 0c0 2-2 3-4 3s-4 1-4 3m8 2H8" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Soporte Personalizado</h3>
              <p className="text-gray-600">Estamos contigo en cada paso de tu compra</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
