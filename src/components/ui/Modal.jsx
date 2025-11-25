// src/components/ui/Modal.jsx

import { useEffect, useRef } from 'react';
import { trapFocus } from '../../utils/accessibility';

/**
 * Componente Modal accesible
 * @param {Object} props
 * @param {boolean} props.isOpen - Si el modal está abierto
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {string} props.title - Título del modal
 * @param {React.ReactNode} props.children - Contenido del modal
 * @param {string} props.size - 'sm' | 'md' | 'lg' | 'xl'
 * @param {boolean} props.closeOnOverlayClick - Si se cierra al hacer clic en el overlay
 */
const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Tamaños del modal
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  useEffect(() => {
    if (!isOpen) return;

    // Guardar el elemento activo antes de abrir el modal
    previousActiveElement.current = document.activeElement;

    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';

    // Configurar trampa de foco
    const releaseFocusTrap = trapFocus(modalRef.current);

    // Manejar tecla Escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
      releaseFocusTrap();

      // Restaurar foco al elemento anterior
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Contenedor del modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          ref={modalRef}
          className={`
            relative bg-white rounded-lg shadow-xl
            w-full ${sizes[size]}
            animate-fade-in
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2
              id="modal-title"
              className="text-xl font-display uppercase"
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contenido */}
          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;