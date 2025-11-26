// src/pages/Home/Home.jsx

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Hero from '../../components/layout/Hero';
import ProductCard from '../../components/features/ProductCard';
import CategoryTile from '../../components/features/CategoryTile';
import Button from '../../components/ui/Button';
import BackendWakeup from '../../components/ui/BackendWakeup';
import { useAdmin } from '../../context/AdminContext';
import { useTheme } from '../../context/ThemeContext';
import { categoriesMetadata } from '../../data/categories';
import { filterByCategory } from '../../data/helpers/filterProducts';

const Home = () => {
  const { products, isLoading } = useAdmin();
  const { isDark } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  
  // Efecto parallax en scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (isLoading && products.length === 0) {
    return <BackendWakeup />;
  }

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  
  const categoriesWithCount = categoriesMetadata.map(category => ({
    ...category,
    productCount: filterByCategory(products, category.id).length
  }));

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-zinc-950' : 'bg-white'
    }`}>
      <Hero />

      {/* Productos Destacados */}
      <section className={`relative py-24 md:py-32 overflow-hidden transition-colors duration-500 ${
        isDark 
          ? 'bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950' 
          : 'bg-gradient-to-b from-white via-zinc-50 to-white'
      }`}>
        <div className="absolute inset-0 opacity-20" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
          <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
            isDark ? 'bg-amber-600/20' : 'bg-amber-600/30'
          }`} />
          <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
            isDark ? 'bg-orange-600/20' : 'bg-orange-600/30'
          }`} style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex flex-col items-center">
              <span className="text-sm tracking-[0.3em] uppercase text-amber-600 font-light mb-4 animate-fade-in">
                Selección Premium
              </span>
              <h2 className={`text-5xl md:text-7xl font-light tracking-tight mb-6 animate-fade-in-up transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}>
                Destacados
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent animate-fade-in" />
            </div>
            <p className={`max-w-2xl mx-auto mt-8 text-lg leading-relaxed font-light animate-fade-in-up transition-colors duration-500 ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`} style={{ animationDelay: '0.2s' }}>
              Calidad excepcional. Estilo atemporal. Nuestra selección curada de prendas masculinas premium.
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="group animate-fade-in-up hover:scale-[1.02] transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 animate-fade-in">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-colors duration-500 ${
                isDark ? 'bg-zinc-900' : 'bg-zinc-100'
              }`}>
                <svg className={`w-10 h-10 transition-colors duration-500 ${
                  isDark ? 'text-zinc-700' : 'text-zinc-400'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className={`text-lg font-light transition-colors duration-500 ${
                isDark ? 'text-zinc-500' : 'text-zinc-600'
              }`}>No hay productos destacados disponibles</p>
            </div>
          )}

          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/productos">
              <Button variant="primary" size="lg">
                Explorar Colección Completa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className={`relative py-24 md:py-32 overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-zinc-950' : 'bg-zinc-50'
      }`}>
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex flex-col items-center">
              <span className="text-sm tracking-[0.3em] uppercase text-amber-600 font-light mb-4 animate-fade-in">
                Encuentra tu estilo
              </span>
              <h2 className={`text-5xl md:text-7xl font-light tracking-tight mb-6 animate-fade-in-up transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}>
                Categorías
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent animate-fade-in" />
            </div>
            <p className={`max-w-2xl mx-auto mt-8 text-lg leading-relaxed font-light animate-fade-in-up transition-colors duration-500 ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`} style={{ animationDelay: '0.2s' }}>
              Cada categoría cuidadosamente curada. Descubre el universo completo de estilos masculinos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesWithCount.slice(0, 6).map((category, index) => (
              <div 
                key={category.id} 
                className="group animate-fade-in-up hover:scale-[1.02] transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
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

      {/* Novedades */}
      <section className={`relative py-24 md:py-32 overflow-hidden transition-colors duration-500 ${
        isDark 
          ? 'bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950' 
          : 'bg-gradient-to-b from-white via-zinc-50 to-white'
      }`}>
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
            isDark ? 'bg-green-600/20' : 'bg-green-600/30'
          }`} />
          <div className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
            isDark ? 'bg-teal-600/20' : 'bg-teal-600/30'
          }`} style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex flex-col items-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm tracking-[0.3em] uppercase text-green-500 font-light animate-fade-in">
                  Recién Llegados
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <h2 className={`text-5xl md:text-7xl font-light tracking-tight mb-6 animate-fade-in-up transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}>
                Novedades
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent animate-fade-in" />
            </div>
            <p className={`max-w-2xl mx-auto mt-8 text-lg leading-relaxed font-light animate-fade-in-up transition-colors duration-500 ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`} style={{ animationDelay: '0.2s' }}>
              Las últimas tendencias. Sé el primero en descubrir nuestras nuevas colecciones.
            </p>
          </div>

          {newProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {newProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="group animate-fade-in-up hover:scale-[1.02] transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 mb-16 animate-fade-in">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-colors duration-500 ${
                isDark ? 'bg-zinc-900' : 'bg-zinc-100'
              }`}>
                <svg className={`w-10 h-10 transition-colors duration-500 ${
                  isDark ? 'text-zinc-700' : 'text-zinc-400'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <p className={`text-lg font-light transition-colors duration-500 ${
                isDark ? 'text-zinc-500' : 'text-zinc-600'
              }`}>No hay productos nuevos disponibles</p>
            </div>
          )}

          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/productos?nuevos=true">
              <Button variant="secondary" size="lg">
                Ver Todas las Novedades
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}} />
        
        <div className="container-custom text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm tracking-[0.3em] uppercase text-amber-100 font-light mb-6 block animate-fade-in">
              Estamos aquí para ti
            </span>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-8 animate-fade-in-up">
              ¿Necesitas Ayuda?
            </h2>
            <div className="w-24 h-px bg-white/40 mx-auto mb-8 animate-fade-in" />
            <p className="text-amber-50 text-xl font-light mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Nuestro equipo está listo para asesorarte. Encuentra el estilo perfecto que se adapte a tu personalidad.
            </p>
            <Link to="/contacto" className="animate-fade-in-up inline-block" style={{ animationDelay: '0.3s' }}>
              <Button variant="secondary" size="lg" className="shadow-2xl hover:shadow-white/20">
                Contactar Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Beneficios */}
      <section className={`relative py-24 md:py-32 transition-colors duration-500 ${
        isDark ? 'bg-zinc-950' : 'bg-white'
      }`}>
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="inline-flex flex-col items-center">
              <span className="text-sm tracking-[0.3em] uppercase text-amber-600 font-light mb-4 animate-fade-in">
                Comprometidos contigo
              </span>
              <h2 className={`text-4xl md:text-5xl font-light tracking-tight mb-6 animate-fade-in-up transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}>
                ¿Por Qué Elegirnos?
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent animate-fade-in" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                ),
                title: 'Envío Gratis',
                description: 'En compras superiores a',
                highlight: '$150,000',
                extra: 'Recibe tus productos sin costo adicional.'
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                ),
                title: 'Devoluciones Fáciles',
                description: 'Hasta',
                highlight: '30 días',
                extra: 'para cambios. Sin preguntas, sin complicaciones.'
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ),
                title: 'Soporte 24/7',
                description: 'Asistencia personalizada',
                highlight: 'cuando la necesites',
                extra: 'Siempre aquí para ayudarte.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20 blur-xl" />
                  <div className="relative w-full h-full bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {feature.icon}
                    </svg>
                  </div>
                </div>
                <h3 className={`text-2xl font-light tracking-wide mb-4 transition-colors duration-500 ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}>
                  {feature.title}
                </h3>
                <div className="w-12 h-px bg-amber-600/40 mx-auto mb-4" />
                <p className={`text-base leading-relaxed font-light max-w-xs mx-auto transition-colors duration-500 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {feature.description} <span className="text-amber-600 font-normal">{feature.highlight}</span>. {feature.extra}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;