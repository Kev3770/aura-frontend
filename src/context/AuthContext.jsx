// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  // Cargar usuario al montar el componente
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = authService.getCurrentUser();
        const token = localStorage.getItem('auth-token');
        
        if (storedUser && token) {
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        showSuccess('Inicio de sesión exitoso');
        return { success: true, user: response.data.user };
      } else {
        showError(response.message || 'Error al iniciar sesión');
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
      showError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Register
  const register = async (name, email, password) => {
    try {
      setIsLoading(true);
      const response = await authService.register(name, email, password);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        showSuccess('Registro exitoso');
        return { success: true, user: response.data.user };
      } else {
        showError(response.message || 'Error al registrarse');
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al registrarse';
      showError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    showSuccess('Sesión cerrada exitosamente');
  };

  // Verificar si el usuario es admin
  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};