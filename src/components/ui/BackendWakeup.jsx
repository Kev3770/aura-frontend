// src/components/ui/BackendWakeup.jsx

import { useEffect, useState } from 'react';

const BackendWakeup = () => {
  const [dots, setDots] = useState('');
  const [tip, setTip] = useState(0);

  const tips = [
    '💡 Estamos despertando el servidor...',
    '⏰ El backend gratuito se pausa tras 15 minutos de inactividad',
    '🚀 Solo tomará unos segundos más...',
    '☕ Momento perfecto para un café',
    '✨ Cargando tus productos favoritos...'
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

    return () => {
      clearInterval(dotsInterval);
      clearInterval(tipInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-primary-dark to-gray-900 z-50 flex items-center justify-center">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-4 max-w-md">
        {/* Logo animado */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto relative">
            {/* Círculos pulsantes */}
            <div className="absolute inset-0 rounded-full bg-accent opacity-20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-accent opacity-40 animate-pulse"></div>
            
            {/* Logo central */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
              <span className="text-white font-display text-3xl font-bold">A</span>
            </div>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-3xl font-display uppercase text-white mb-2 tracking-wider">
          AURA
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          Moda Masculina Premium
        </p>

        {/* Barra de progreso */}
        <div className="mb-6">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        {/* Mensaje con animación */}
        <p className="text-white text-base mb-2 font-medium min-h-[24px] transition-all duration-300">
          {tips[tip]}{dots}
        </p>

        {/* Tips adicionales */}
        <p className="text-gray-400 text-sm">
          Esto solo sucede la primera vez después de un período de inactividad
        </p>

        {/* Indicador visual adicional */}
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-accent"
              style={{
                animation: `bounce 1.4s infinite ease-in-out ${i * 0.16}s`
              }}
            />
          ))}
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
            opacity: 0.5;
          }
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default BackendWakeup;