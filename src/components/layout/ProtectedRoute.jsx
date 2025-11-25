// src/components/layout/ProtectedRoute.jsx

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Componente ProtectedRoute
 * Protege rutas que requieren autenticación y/o rol de admin
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componente a renderizar
 * @param {boolean} props.requireAdmin - Requiere administrador (default: true)
 */
const ProtectedRoute = ({ children, requireAdmin = true }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  // Mientras carga el usuario (cuando refrescas el navegador)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si NO está autenticado → redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si la ruta requiere admin, pero el usuario no lo es
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // Todo bien → renderizar contenido
  return children;
};

export default ProtectedRoute;
