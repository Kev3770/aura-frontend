// src/components/layout/Hero.jsx

import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

const Hero = () => {
  const { isDark } = useTheme();
  
  return (
    <section className={`relative overflow-hidden min-h-screen flex items-center transition-colors duration-500 ${
      isDark ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'
    }`}>
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1920&q=80"
          alt=""
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isDark ? 'opacity-25' : 'opacity-10'
          }`}
          aria-hidden="true"
        />
        {/* Overlay gradiente sofisticado */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          isDark 
            ? 'bg-gradient-to-br from-zinc-950 via-zinc-950/95 to-zinc-900/90' 
            : 'bg-gradient-to-br from-zinc-50 via-white/95 to-zinc-100/90'
        }`} />
        
        {/* Elementos de luz sutiles */}
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${
          isDark ? 'bg-amber-600/10' : 'bg-amber-600/20'
        }`} />
        <div className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${
          isDark ? 'bg-orange-600/10' : 'bg-orange-600/20'
        }`} />
      </div>

      {/* Grid pattern sutil */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Contenido */}
      <div className="relative container-custom py-32 md:py-40 lg:py-48 z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-block mb-8 animate-fade-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <span className="relative inline-flex items-center gap-2 px-6 py-2 bg-zinc-900/80 backdrop-blur-sm border border-amber-600/30 rounded-full text-amber-500 text-xs tracking-[0.2em] uppercase font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Nueva Colección
              </span>
            </div>
          </div>

          {/* Título */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.9] mb-10 animate-fade-in-up">
            <span className="block mb-2">Estilo que</span>
            <span className="block mb-2">Define</span>
            <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Tu esencia
            </span>
          </h1>

          {/* Línea decorativa */}
          <div className="w-32 h-px bg-gradient-to-r from-amber-600 to-transparent mb-10 animate-fade-in" />

          {/* Descripción */}
          <p className={`text-xl md:text-2xl font-light mb-12 max-w-2xl leading-relaxed animate-fade-in-up transition-colors duration-500 ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`} style={{ animationDelay: '0.2s' }}>
            Ropa masculina. Cada prenda cuenta una historia de calidad, 
            confianza y estilo atemporal.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 mb-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
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
          <div className={`grid grid-cols-3 gap-12 pt-12 border-t animate-fade-in-up transition-colors duration-500 ${
            isDark ? 'border-zinc-800/50' : 'border-zinc-300/50'
          }`} style={{ animationDelay: '0.4s' }}>
            <div className="group">
              <p className="text-4xl md:text-5xl font-light tracking-tight bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </p>
              <p className={`text-xs md:text-sm uppercase tracking-[0.2em] font-light transition-colors duration-500 ${
                isDark ? 'text-zinc-500' : 'text-zinc-600'
              }`}>
                Productos
              </p>
            </div>
            <div className="group">
              <p className="text-4xl md:text-5xl font-light tracking-tight bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                100%
              </p>
              <p className={`text-xs md:text-sm uppercase tracking-[0.2em] font-light transition-colors duration-500 ${
                isDark ? 'text-zinc-500' : 'text-zinc-600'
              }`}>
                Premium
              </p>
            </div>
            <div className="group">
              <p className="text-4xl md:text-5xl font-light tracking-tight bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </p>
              <p className={`text-xs md:text-sm uppercase tracking-[0.2em] font-light transition-colors duration-500 ${
                isDark ? 'text-zinc-500' : 'text-zinc-600'
              }`}>
                Soporte
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="flex flex-col items-center gap-2">
          <span className={`text-xs uppercase tracking-[0.2em] font-light transition-colors duration-500 ${
            isDark ? 'text-zinc-500' : 'text-zinc-600'
          }`}>Scroll</span>
          <svg
            className={`w-6 h-6 transition-colors duration-500 ${
              isDark ? 'text-amber-600/60' : 'text-amber-600/80'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className={`absolute top-20 right-20 w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ${
        isDark ? 'bg-amber-600/40' : 'bg-amber-600/60'
      }`} />
      <div className={`absolute bottom-32 right-32 w-1 h-1 rounded-full animate-pulse transition-colors duration-500 ${
        isDark ? 'bg-orange-600/40' : 'bg-orange-600/60'
      }`} style={{ animationDelay: '0.5s' }} />
      <div className={`absolute top-1/3 left-20 w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-500 ${
        isDark ? 'bg-amber-600/30' : 'bg-amber-600/50'
      }`} style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Hero;