// src/utils/accessibility.js

/**
 * Anuncia un mensaje a lectores de pantalla usando aria-live
 * @param {string} message - Mensaje a anunciar
 * @param {string} priority - 'polite' o 'assertive'
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  // Buscar o crear el contenedor de anuncios
  let liveRegion = document.getElementById('aria-live-region');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'aria-live-region';
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only'; // Clase CSS para ocultar visualmente
    document.body.appendChild(liveRegion);
  }
  
  // Actualizar el mensaje
  liveRegion.setAttribute('aria-live', priority);
  liveRegion.textContent = message;
  
  // Limpiar después de 1 segundo
  setTimeout(() => {
    liveRegion.textContent = '';
  }, 1000);
};

/**
 * Mueve el foco a un elemento específico
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {Object} options - Opciones adicionales
 */
export const moveFocusTo = (element, options = {}) => {
  const {
    preventScroll = false,
    delay = 0
  } = options;
  
  const targetElement = typeof element === 'string' 
    ? document.querySelector(element) 
    : element;
  
  if (!targetElement) {
    console.warn('Elemento no encontrado para mover el foco');
    return;
  }
  
  // Si el elemento no es naturalmente enfocable, hacerlo focusable temporalmente
  if (targetElement.tabIndex === -1) {
    targetElement.setAttribute('tabindex', '-1');
  }
  
  setTimeout(() => {
    targetElement.focus({ preventScroll });
  }, delay);
};

/**
 * Trampa de foco para modales (mantiene el foco dentro del modal)
 * @param {HTMLElement} containerElement - Elemento contenedor (modal)
 * @returns {Function} Función para liberar la trampa
 */
export const trapFocus = (containerElement) => {
  if (!containerElement) return () => {};
  
  // Obtener todos los elementos enfocables dentro del contenedor
  const getFocusableElements = () => {
    return containerElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  };
  
  const handleKeyDown = (e) => {
    if (e.key !== 'Tab') return;
    
    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Si se presiona Tab + Shift en el primer elemento, ir al último
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
    // Si se presiona Tab en el último elemento, ir al primero
    else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };
  
  containerElement.addEventListener('keydown', handleKeyDown);
  
  // Mover foco al primer elemento enfocable
  const focusableElements = getFocusableElements();
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
  
  // Retornar función para limpiar el event listener
  return () => {
    containerElement.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Genera un ID único para aria-describedby o aria-labelledby
 * @param {string} prefix - Prefijo del ID
 * @returns {string} ID único
 */
export const generateAriaId = (prefix = 'aria') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Valida si un elemento cumple con el contraste mínimo WCAG AA
 * @param {string} foreground - Color de texto (hex)
 * @param {string} background - Color de fondo (hex)
 * @returns {Object} { passes: boolean, ratio: number, level: string }
 */
export const checkColorContrast = (foreground, background) => {
  // Convertir hex a RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  // Calcular luminancia relativa
  const getLuminance = (rgb) => {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  
  if (!fg || !bg) {
    return { passes: false, ratio: 0, level: 'invalid' };
  }
  
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  
  return {
    passes: ratio >= 4.5, // WCAG AA para texto normal
    ratio: ratio.toFixed(2),
    level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'fail'
  };
};

/**
 * Hook personalizado para detectar si el usuario está usando teclado
 * @returns {boolean}
 */
export const detectKeyboardUser = () => {
  let isKeyboardUser = false;
  
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      isKeyboardUser = true;
      document.body.classList.add('keyboard-user');
    }
  };
  
  const handleMouseDown = () => {
    isKeyboardUser = false;
    document.body.classList.remove('keyboard-user');
  };
  
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('mousedown', handleMouseDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('mousedown', handleMouseDown);
  };
};

/**
 * Crea un skip link para navegación por teclado
 * @param {string} targetId - ID del elemento al que saltar
 * @param {string} text - Texto del link
 */
export const createSkipLink = (targetId, text = 'Saltar al contenido principal') => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link'; // Estilizar en CSS
  
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
};