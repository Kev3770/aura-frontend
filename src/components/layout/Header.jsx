import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES } from '../../data/constants';
import { capitalizeWords } from '../../utils/formatters';
import { 
  FaShoppingCart, 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaSignOutAlt,
  FaChevronDown,
  FaHome,
  FaBox,
  FaTags,
  FaEnvelope,
  FaTachometerAlt
} from 'react-icons/fa';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemCount = getTotalItems();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  // 🔥 FUNCIÓN CORREGIDA - Navegar al dashboard del admin
  const handleAdminDashboard = () => {
    navigate('/admin');
    setIsMobileMenuOpen(false);
  };

  // 🔥 FUNCIÓN PARA IR AL INICIO COMO ADMIN
  const handleGoToStore = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="container-custom" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary hover:text-accent transition-colors duration-200"
            aria-label="Aura - Ir al inicio"
          >
            AURA
          </Link>

          {/* ======== NAV DESKTOP ======== */}
          <div className="hidden md:flex items-center space-x-8">

            {/* Inicio */}
            <Link
              to="/"
              className={`flex items-center gap-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                isActive('/') ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
              }`}
            >
              <FaHome className="text-xs" />
              Inicio
            </Link>

            {/* Productos */}
            <Link
              to="/productos"
              className={`flex items-center gap-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                isActive('/productos') ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
              }`}
            >
              <FaBox className="text-xs" />
              Productos
            </Link>

            {/* Categorías - Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-600 hover:text-primary transition-colors duration-200"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <FaTags className="text-xs" />
                Categorías
                <FaChevronDown className={`text-xs transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoriesOpen && (
                <div 
                  className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50"
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      to={`/productos?categoria=${category}`}
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      {capitalizeWords(category)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contacto */}
            <Link
              to="/contacto"
              className={`flex items-center gap-2 text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                isActive('/contacto') ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
              }`}
            >
              <FaEnvelope className="text-xs" />
              Contacto
            </Link>

            {/* ============================
                 MENÚ USUARIO DESKTOP - CORREGIDO
            ============================ */}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-500 text-sm" />
                    <span className="text-sm text-gray-700 font-medium">
                      {user?.name || 'Usuario'}
                    </span>
                  </div>
                  
                  {/* BOTÓN ADMINISTRADOR CORREGIDO */}
                  {isAdmin() && (
                    <button
                      onClick={handleAdminDashboard}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors duration-200"
                    >
                      <FaTachometerAlt className="text-xs" />
                      Zona administración
                    </button>
                  )}


                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    <FaSignOutAlt />
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  <FaUser className="text-xs" />
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>

          {/* ======== CARRITO + MENÚ MÓVIL ======== */}
          <div className="flex items-center space-x-4">

            {/* Carrito */}
            <Link
              to="/carrito"
              className="relative p-2 text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <FaShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Botón menú móvil */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors duration-200"
            >
              {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ======== MENÚ MÓVIL ======== */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white animate-slide-down">
            <div className="flex flex-col space-y-3">

              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="flex items-center gap-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                <FaHome className="text-sm" />
                Inicio
              </Link>

              <Link 
                to="/productos" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="flex items-center gap-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                <FaBox className="text-sm" />
                Productos
              </Link>

              {/* Categorías Móvil */}
              <div className="py-2">
                <button 
                  onClick={toggleCategories}
                  className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-primary transition-colors"
                >
                  <FaTags className="text-sm" />
                  <span>Categorías</span>
                  <FaChevronDown className={`text-xs ml-auto transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCategoriesOpen && (
                  <div className="mt-2 ml-6 space-y-2 animate-slide-down">
                    {CATEGORIES.map((category) => (
                      <Link
                        key={category}
                        to={`/productos?categoria=${category}`}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsCategoriesOpen(false);
                        }}
                        className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {capitalizeWords(category)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to="/contacto" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="flex items-center gap-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                <FaEnvelope className="text-sm" />
                Contacto
              </Link>

              {/* Usuario Móvil - CORREGIDO */}
              <div className="border-t border-gray-200 pt-4 mt-2">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <FaUser className="text-sm" />
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    
                    {/* BOTÓN ADMIN MÓVIL CORREGIDO */}
                    {isAdmin() && (
                      <button
                        onClick={handleAdminDashboard}
                        className="w-full flex items-center gap-3 py-2 text-primary font-medium hover:text-primary-dark transition-colors"
                      >
                        <FaTachometerAlt className="text-sm" />
                        Zona Administrador
                      </button>
                    )}


                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 py-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FaSignOutAlt />
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <FaUser className="text-sm" />
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;