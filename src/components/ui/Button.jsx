// src/components/ui/Button.jsx

import { forwardRef } from 'react';

/**
 * Componente Button reutilizable
 * @param {Object} props
 * @param {string} props.variant - 'primary' | 'secondary' | 'ghost'
 * @param {string} props.size - 'sm' | 'md' | 'lg'
 * @param {boolean} props.fullWidth - Si el botón ocupa todo el ancho
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {boolean} props.loading - Si el botón está en estado de carga
 * @param {string} props.type - 'button' | 'submit' | 'reset'
 * @param {Function} props.onClick - Función al hacer clic
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {string} props.className - Clases CSS adicionales
 * @param {string} props.ariaLabel - Label para accesibilidad
 */
const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  children,
  className = '',
  ariaLabel,
  ...rest
}, ref) => {
  // Clases base
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium uppercase tracking-wider
    rounded transition-all duration-fast
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  // Variantes de estilo
  const variants = {
    primary: `
      bg-primary text-white
      hover:bg-primary-light
      focus:ring-primary
    `,
    secondary: `
      border-2 border-primary text-primary bg-transparent
      hover:bg-primary hover:text-white
      focus:ring-primary
    `,
    ghost: `
      text-primary bg-transparent
      hover:bg-secondary
      focus:ring-primary
    `,
  };

  // Tamaños
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  };

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...rest}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="sr-only">Cargando...</span>
          Cargando...
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;