// src/components/ui/BackendWakeup.jsx

import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const BackendWakeup = () => {
  const [dots, setDots] = useState('');
  const [tip, setTip] = useState(0);
  const [progress, setProgress] = useState(0);
  const { isDark } = useTheme();

  const tips = [
    { icon: '💡', text: 'Estamos despertando el servidor' },
    { icon: '⏰', text: 'El backend se pausa tras inactividad' },
    { icon: '🚀', text: 'Solo tomará unos segundos más' },
    { icon: '☕', text: 'Momento perfecto para un café' },
    { icon: '✨', text: 'Cargando productos premium' }
  ];

  useEffect(() => {
    // Animación de puntos
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    // Cambiar tips cada 3 segundos
    const tipInterval = setInterval(() => {
      setTip(prev => (prev + 1) % tips.length);
    }, 3000);

    // Simular progreso
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return 90;
        return prev + Math.random() * 10;
      });
    }, 400);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(tipInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950' 
        : 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100'
    }`}>
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} 
        />
      </div>

      {/* Efectos de luz */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          isDark ? 'bg-amber-600/10' : 'bg-amber-600/20'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          isDark ? 'bg-orange-600/10' : 'bg-orange-600/20'
        }`} style={{ animationDelay: '1s' }} />
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-4 max-w-lg">
        {/* Logo animado premium */}
        <div className="mb-12 relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Anillos pulsantes */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-600/20 animate-ping" />
            <div className="absolute inset-4 rounded-full border border-amber-600/30 animate-pulse" />
            
            {/* Logo central con gradiente */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-600/30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 blur-xl opacity-50 animate-pulse" />
              <span className="relative text-white font-light text-5xl tracking-tighter">A</span>
            </div>
          </div>
        </div>

        {/* Título */}
        <div className="mb-8">
          <h2 className={`text-4xl md:text-5xl font-light tracking-tighter mb-3 transition-colors duration-500 ${
            isDark ? 'text-white' : 'text-zinc-900'
          }`}>
            AURA
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-4" />
          <p className={`text-sm tracking-[0.2em] uppercase font-light transition-colors duration-500 ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            Moda Masculina Premium
          </p>
        </div>

        {/* Barra de progreso moderna */}
        <div className="mb-8">
          <div className={`h-1 rounded-full overflow-hidden transition-colors duration-500 ${
            isDark ? 'bg-zinc-900' : 'bg-zinc-200'
          }`}>
            <div 
              className="h-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 transition-all duration-300 ease-out"
              style={{ 
                width: `${progress}%`,
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite linear'
              }}
            />
          </div>
          <p className={`text-xs mt-2 font-light transition-colors duration-500 ${
            isDark ? 'text-zinc-600' : 'text-zinc-500'
          }`}>
            {Math.round(progress)}%
          </p>
        </div>

        {/* Mensaje con animación y transición */}
        <div className="mb-8 min-h-[60px]">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl border transition-all duration-500 ${
            isDark 
              ? 'bg-zinc-900/50 border-amber-600/30' 
              : 'bg-white border-amber-600/20 shadow-lg'
          }`}>
            <span className="text-2xl animate-pulse">{tips[tip].icon}</span>
            <p className={`text-base font-light transition-colors duration-500 ${
              isDark ? 'text-zinc-200' : 'text-zinc-700'
            }`}>
              {tips[tip].text}{dots}
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <p className={`text-sm font-light leading-relaxed transition-colors duration-500 ${
          isDark ? 'text-zinc-500' : 'text-zinc-600'
        }`}>
          Esto solo sucede la primera vez después de un período de inactividad.
          <br />
          Tu experiencia premium está a punto de comenzar.
        </p>

        {/* Indicador visual de carga */}
        <div className="mt-12 flex justify-center gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                isDark ? 'bg-amber-600' : 'bg-amber-600'
              }`}
              style={{
                animation: `bounce 1.4s infinite ease-in-out ${i * 0.16}s`
              }}
            />
          ))}
        </div>

        {/* Texto motivacional */}
        <div className="mt-12">
          <p className={`text-xs tracking-[0.15em] uppercase font-light transition-colors duration-500 ${
            isDark ? 'text-zinc-600' : 'text-zinc-500'
          }`}>
            Preparando tu experiencia de compra
          </p>
        </div>
      </div>

      {/* CSS personalizado para animaciones */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
            opacity: 0.3;
          }
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default BackendWakeup;