// src/context/ToastContext.jsx

import { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/ui/Toast';
import { announceToScreenReader } from '../utils/accessibility';

const ToastContext = createContext(null);

/**
 * Provider del sistema de notificaciones Toast
 */
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success',
  });

  /**
   * Muestra un toast
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - 'success' | 'error' | 'info' | 'warning'
   */
  const showToast = useCallback((message, type = 'success') => {
    setToast({
      isVisible: true,
      message,
      type,
    });

    // Anunciar a lectores de pantalla
    announceToScreenReader(message, type === 'error' ? 'assertive' : 'polite');
  }, []);

  /**
   * Muestra un toast de éxito
   */
  const showSuccess = useCallback((message) => {
    showToast(message, 'success');
  }, [showToast]);

  /**
   * Muestra un toast de error
   */
  const showError = useCallback((message) => {
    showToast(message, 'error');
  }, [showToast]);

  /**
   * Muestra un toast de información
   */
  const showInfo = useCallback((message) => {
    showToast(message, 'info');
  }, [showToast]);

  /**
   * Muestra un toast de advertencia
   */
  const showWarning = useCallback((message) => {
    showToast(message, 'warning');
  }, [showToast]);

  /**
   * Cierra el toast actual
   */
  const closeToast = useCallback(() => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  const value = {
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    closeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </ToastContext.Provider>
  );
};

/**
 * Hook para usar el sistema de toasts
 * @returns {Object} Funciones del toast
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast debe usarse dentro de ToastProvider');
  }
  
  return context;
};

export default ToastContext;