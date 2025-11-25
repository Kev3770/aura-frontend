import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaStore } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || (user?.role === 'ADMIN' ? '/admin' : '/');
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      // La redirección se maneja automáticamente en el useEffect
      // según el rol del usuario y la ubicación previa
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goToStore = () => {
    navigate('/');
  };

  // Si ya está autenticado, mostrar loading
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-primary to-primary-dark py-6 px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bebas tracking-wider text-white">
                  AURA ADMIN
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  Panel de Administración
                </p>
              </div>
              <FaStore className="text-white text-xl" />
            </div>
          </div>

          {/* Form Container */}
          <div className="px-8 py-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                    placeholder="admin@aura.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full flex items-center justify-center gap-2 py-3"
                disabled={isLoading}
                isLoading={isLoading}
              >
                {!isLoading && <FaSignInAlt className="w-4 h-4" />}
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>

            </form>

            {/* Credenciales de prueba */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2 text-center">
                Credenciales de prueba
              </h3>
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Email:</span>
                  <code className="font-mono bg-gray-200 px-2 py-1 rounded">admin@aura.com</code>
                </div>
                <div className="flex justify-between">
                  <span>Contraseña:</span>
                  <code className="font-mono bg-gray-200 px-2 py-1 rounded">admin123</code>
                </div>
              </div>
            </div>

            {/* Botón para ir a la tienda */}
            <div className="mt-6 text-center">
              <button
                onClick={goToStore}
                className="text-sm text-primary hover:text-primary-dark font-medium transition-colors duration-200"
              >
                ← Volver a la tienda
              </button>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Una vez iniciada la sesión, podrás acceder al dashboard sin necesidad de cerrar sesión
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;