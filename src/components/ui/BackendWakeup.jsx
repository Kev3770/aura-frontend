import { useEffect, useState, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Zap, TrendingUp, Package, Star } from 'lucide-react';
import AuraLogo from '../../assets/aura-logo.svg';

const BackendWakeup = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { isDark } = useTheme();

  const tips = [
    { icon: Sparkles, text: 'Conectando con nuestro catálogo premium', color: 'text-amber-500' },
    { icon: Zap, text: 'Cargando las últimas tendencias', color: 'text-orange-500' },
    { icon: TrendingUp, text: 'Actualizando inventario en tiempo real', color: 'text-amber-600' },
    { icon: Package, text: 'Preparando recomendaciones personalizadas', color: 'text-orange-600' },
    { icon: Star, text: 'Verificando disponibilidad de productos', color: 'text-amber-500' }
  ];

  const CurrentIcon = tips[currentTip].icon;

  // Progreso más realista con aceleración inicial y desaceleración al final
  const calculateProgress = useCallback((elapsed) => {
    const duration = 8000; // 8 segundos estimados
    const percentage = Math.min((elapsed / duration) * 100, 95);
    
    // Curva ease-out para progreso más natural
    return Math.floor(percentage - (percentage * 0.1 * Math.cos(percentage * 0.02)));
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrame;
    let tipTimer;
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = calculateProgress(elapsed);
      
      setProgress(newProgress);
      
      if (newProgress < 95) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        setIsComplete(true);
      }
    };

    // Cambiar tips cada 2.5 segundos
    tipTimer = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 2500);

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (tipTimer) clearInterval(tipTimer);
    };
  }, [calculateProgress, tips.length]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-700 ${
      isDark 
        ? 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950' 
        : 'bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50'
    }`}>
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div 
          className={`absolute inset-0 ${isDark ? 'bg-white' : 'bg-zinc-900'}`}
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/3 -left-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 animate-pulse ${
          isDark ? 'bg-amber-600' : 'bg-amber-500'
        }`} style={{ animationDuration: '4s' }} />
        <div className={`absolute bottom-1/3 -right-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 animate-pulse ${
          isDark ? 'bg-orange-600' : 'bg-orange-500'
        }`} style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-6">
        
        {/* Logo container */}
        <div className="mb-12 relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Pulsing rings */}
            <div className="absolute inset-0 animate-ping opacity-10">
              <div className={`w-full h-full rounded-full border-2 ${
                isDark ? 'border-amber-600' : 'border-amber-500'
              }`} />
            </div>
            <div className="absolute -inset-2 animate-pulse opacity-20">
              <div className={`w-full h-full rounded-full border ${
                isDark ? 'border-amber-600/50' : 'border-amber-500/50'
              }`} />
            </div>
            
            {/* Logo */}
            <div className="relative w-full h-full flex items-center justify-center animate-fade-in">
              <img 
                src={AuraLogo} 
                alt="Aura" 
                className="w-28 h-28 transition-transform duration-500 hover:scale-105"
                style={{ 
                  filter: isDark 
                    ? 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.2))' 
                    : 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.15))'
                }}
              />
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="mb-10 text-center">
          <h1 className={`text-5xl font-extralight tracking-tighter mb-3 transition-colors duration-700 ${
            isDark ? 'text-white' : 'text-zinc-900'
          }`}>
            AURA
          </h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`h-px w-8 ${isDark ? 'bg-amber-600/40' : 'bg-amber-600/30'}`} />
            <span className={`text-xs tracking-[0.3em] uppercase font-light ${
              isDark ? 'text-zinc-500' : 'text-zinc-600'
            }`}>
              Premium Men's Fashion
            </span>
            <div className={`h-px w-8 ${isDark ? 'bg-amber-600/40' : 'bg-amber-600/30'}`} />
          </div>
        </div>

        {/* Progress section */}
        <div className="space-y-6">
          
          {/* Progress bar */}
          <div className="space-y-2">
            <div className={`relative h-1.5 rounded-full overflow-hidden ${
              isDark ? 'bg-zinc-800/50' : 'bg-zinc-200/80'
            }`}>
              <div 
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out ${
                  isDark 
                    ? 'bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600' 
                    : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500'
                }`}
                style={{ 
                  width: `${progress}%`,
                  boxShadow: isDark 
                    ? '0 0 20px rgba(251, 191, 36, 0.3)' 
                    : '0 0 15px rgba(251, 191, 36, 0.2)'
                }}
              />
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite linear'
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium tracking-wide ${
                isDark ? 'text-zinc-600' : 'text-zinc-500'
              }`}>
                {isComplete ? 'Casi listo' : 'Conectando'}
              </span>
              <span className={`text-xs font-mono ${
                isDark ? 'text-amber-600' : 'text-amber-600'
              }`}>
                {progress}%
              </span>
            </div>
          </div>

          {/* Status message with icon */}
          <div className={`flex items-start gap-4 p-5 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
            isDark 
              ? 'bg-zinc-900/40 border-amber-600/20' 
              : 'bg-white/60 border-amber-600/15 shadow-lg shadow-amber-500/5'
          }`}>
            <div className={`mt-0.5 transition-transform duration-500 ${
              tips[currentTip].color
            }`}>
              <CurrentIcon className="w-5 h-5 animate-pulse" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-h-[3rem] flex items-center">
              <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                {tips[currentTip].text}
              </p>
            </div>
          </div>

          {/* Info text */}
          <div className="text-center pt-2">
            <p className={`text-xs leading-relaxed transition-colors duration-700 ${
              isDark ? 'text-zinc-600' : 'text-zinc-500'
            }`}>
              Primer acceso después de inactividad.
              <br />
              <span className={isDark ? 'text-zinc-500' : 'text-zinc-600'}>
                Tu experiencia premium comienza en unos instantes
              </span>
            </p>
          </div>

          {/* Loading dots indicator */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-700 ${
                  isDark ? 'bg-amber-600' : 'bg-amber-600'
                }`}
                style={{
                  animation: `bounce 1.4s infinite ease-in-out ${i * 0.15}s both`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes bounce {
          0%, 60%, 100% { 
            transform: translateY(0) scale(0.8);
            opacity: 0.4;
          }
          30% { 
            transform: translateY(-10px) scale(1);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BackendWakeup;