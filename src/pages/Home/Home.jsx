// src/pages/Home/Home.jsx

import { Link } from 'react-router-dom';
import Hero from '../../components/layout/Hero';
import ProductCard from '../../components/features/ProductCard';
import CategoryTile from '../../components/features/CategoryTile';
import Button from '../../components/ui/Button';
import { useAdmin } from '../../context/AdminContext'; // ← CAMBIO
import { categoriesMetadata } from '../../data/categories';
import { filterByCategory } from '../../data/helpers/filterProducts';

const Home = () => {
  const { products } = useAdmin(); // ← CAMBIO: Obtener productos del AdminContext
  
  // Filtrar productos destacados y nuevos
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  
  const categoriesWithCount = categoriesMetadata.map(category => ({
    ...category,
    productCount: filterByCategory(products, category.id).length
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero />

      {/* Productos Destacados */}
      <section className="section-padding bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          {/* Header de sección */}
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

          {/* Grid de productos */}
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredProducts.map(product => (
                <div key={product.id} className="transform transition-all duration-300 hover:scale-105">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No hay productos destacados</p>
          )}

          {/* CTA */}
          <div className="text-center">
            <Link to="/productos">
              <Button variant="primary" size="lg">
                Ver Todos los Productos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container-custom relative z-10">
          {/* Header de sección */}
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

          {/* Grid de categorías */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesWithCount.slice(0, 6).map(category => (
              <div key={category.id} className="transform transition-all duration-300 hover:scale-105">
                <CategoryTile
                  category={category}
                  productCount={category.productCount}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Novedades */}
      <section className="section-padding bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          {/* Header de sección */}
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

          {/* Grid de productos nuevos */}
          {newProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {newProducts.map(product => (
                <div key={product.id} className="transform transition-all duration-300 hover:scale-105">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mb-12">No hay productos nuevos</p>
          )}

          {/* CTA */}
          <div className="text-center">
            <Link to="/productos?nuevos=true">
              <Button variant="secondary" size="lg">
                Ver Todas las Novedades
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="bg-gradient-to-br from-primary via-primary to-accent text-white py-20 relative overflow-hidden">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        <div className="container-custom text-center relative z-10">
          <h2 className="text-display-md mb-6 drop-shadow-lg">
            ¿Necesitas Ayuda?
          </h2>
          <p className="text-gray-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Nuestro equipo está listo para asesorarte. 
            Contáctanos y encuentra el estilo perfecto para ti.
          </p>
          <Link to="/contacto">
            <Button variant="secondary" size="lg">
              Contactar Ahora
            </Button>
          </Link>
        </div>
      </section>

      {/* Features/Beneficios */}
      <section className="section-padding bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Envío gratis */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display uppercase mb-3 tracking-wider bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Envío Gratis
              </h3>
              <p className="text-gray-600 text-base font-medium">
                En compras superiores a $150,000
              </p>
            </div>

            {/* Devoluciones */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display uppercase mb-3 tracking-wider bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Devoluciones Fáciles
              </h3>
              <p className="text-gray-600 text-base font-medium">
                30 días para cambios y devoluciones
              </p>
            </div>

            {/* Soporte */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display uppercase mb-3 tracking-wider bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Soporte 24/7
              </h3>
              <p className="text-gray-600 text-base font-medium">
                Asistencia personalizada cuando la necesites
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;