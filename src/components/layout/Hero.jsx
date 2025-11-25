// src/components/layout/Hero.jsx

import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <section className="relative bg-primary text-white overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative container-custom py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-block mb-4">
            <span className="badge-new">Nueva Colección</span>
          </div>

          {/* Título */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display uppercase leading-none mb-6">
            Estilo que
            <br />
            Define
            <br />
            <span className="text-accent">Tu esencia</span>
          </h1>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
            Ropa masculina premium. Cada prenda cuenta una historia de calidad, 
            confianza y estilo atemporal.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/productos">
              <Button variant="primary" size="lg" fullWidth={false}>
                Ver Colección
              </Button>
            </Link>
            <Link to="/productos?nuevos=true">
              <Button variant="secondary" size="lg" fullWidth={false}>
                Novedades
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-700">
            <div>
              <p className="text-3xl font-display text-accent">500+</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide">Productos</p>
            </div>
            <div>
              <p className="text-3xl font-display text-accent">100%</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide">Premium</p>
            </div>
            <div>
              <p className="text-3xl font-display text-accent">24/7</p>
              <p className="text-sm text-gray-400 uppercase tracking-wide">Soporte</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;