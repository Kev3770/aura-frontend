import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
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
  FaTachometerAlt,
  FaMoon,
  FaSun
} from 'react-icons/fa';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemCount = getTotalItems();

  // Refs y timeout para dropdown
  const categoriesButtonRef = useRef(null);
  const categoriesDropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
    setIsMobileMenuOpen(false);
  };

  // Funciones para manejar el dropdown con delay
  const handleCategoriesMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsCategoriesOpen(true);
  };

  const handleCategoriesMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 300);
  };

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className={`${
      isDark 
        ? 'bg-zinc-950 border-zinc-900/50' 
        : 'bg-white border-zinc-200'
    } border-b sticky top-0 z-50 backdrop-blur-xl bg-opacity-95 transition-colors duration-500`}>
      <nav className="container-custom" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl md:text-3xl font-light tracking-tighter transition-all duration-300 flex items-center gap-2 ${
              isDark ? 'text-white hover:text-amber-500' : 'text-zinc-900 hover:text-amber-600'
            }`}
            aria-label="Aura - Ir al inicio"
          >
            <span className="relative group">
              <span className="absolute -inset-2 bg-gradient-to-r from-amber-600 to-orange-600 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <span className="relative">AURA</span>
            </span>
          </Link>

          {/* ======== NAV DESKTOP ======== */}
          <div className="hidden md:flex items-center space-x-10">

            {/* Inicio */}
            <Link
              to="/"
              className={`group flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 font-light ${
                isActive('/') 
                  ? 'text-amber-500' 
                  : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <FaHome className={`text-[10px] transition-transform duration-300 ${isActive('/') ? 'scale-110' : 'group-hover:scale-110'}`} />
              Inicio
              {isActive('/') && <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />}
            </Link>

            {/* Productos */}
            <Link
              to="/productos"
              className={`group flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 font-light relative ${
                isActive('/productos') 
                  ? 'text-amber-500' 
                  : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <FaBox className={`text-[10px] transition-transform duration-300 ${isActive('/productos') ? 'scale-110' : 'group-hover:scale-110'}`} />
              Productos
              {isActive('/productos') && <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />}
            </Link>

            {/* Categorías - Dropdown MEJORADO */}
            <div 
              className="relative"
              ref={categoriesButtonRef}
            >
              <button 
                className={`group flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 font-light ${
                  isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                }`}
                onMouseEnter={handleCategoriesMouseEnter}
                onMouseLeave={handleCategoriesMouseLeave}
              >
                <FaTags className="text-[10px] group-hover:scale-110 transition-transform duration-300" />
                Categorías
                <FaChevronDown className={`text-[10px] transition-all duration-300 ${isCategoriesOpen ? 'rotate-180 text-amber-500' : ''}`} />
              </button>

              {/* Dropdown con mejor UX */}
              {isCategoriesOpen && (
                <div 
                  ref={categoriesDropdownRef}
                  className={`absolute left-0 mt-2 w-64 backdrop-blur-xl border rounded-2xl shadow-2xl py-3 z-50 animate-fade-in ${
                    isDark 
                      ? 'bg-zinc-900/95 border-zinc-800/50' 
                      : 'bg-white/95 border-zinc-200/50 shadow-xl'
                  }`}
                  onMouseEnter={handleCategoriesMouseEnter}
                  onMouseLeave={handleCategoriesMouseLeave}
                >
                  {CATEGORIES.map((category, index) => (
                    <Link
                      key={category}
                      to={`/productos?categoria=${category}`}
                      className={`flex items-center px-6 py-3 text-sm transition-all duration-200 font-light group ${
                        isDark 
                          ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/50' 
                          : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/50'
                      }`}
                      onClick={() => setIsCategoriesOpen(false)}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600/40 mr-3 group-hover:bg-amber-500 group-hover:scale-150 transition-all duration-300" />
                      {capitalizeWords(category)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contacto */}
            <Link
              to="/contacto"
              className={`group flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 font-light relative ${
                isActive('/contacto') 
                  ? 'text-amber-500' 
                  : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <FaEnvelope className={`text-[10px] transition-transform duration-300 ${isActive('/contacto') ? 'scale-110' : 'group-hover:scale-110'}`} />
              Contacto
              {isActive('/contacto') && <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />}
            </Link>

            {/* ============================
                 MENÚ USUARIO DESKTOP
            ============================ */}
            <div className={`flex items-center gap-5 ml-6 pl-6 border-l transition-colors duration-500 ${
              isDark ? 'border-zinc-800/50' : 'border-zinc-300'
            }`}>
              {/* BOTÓN TEMA - NUEVO */}
              <button
                onClick={toggleTheme}
                className={`relative group p-2.5 rounded-xl transition-all duration-500 ${
                  isDark 
                    ? 'bg-zinc-900/50 hover:bg-zinc-800/50 text-amber-500' 
                    : 'bg-zinc-100 hover:bg-zinc-200 text-amber-600'
                }`}
                aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              >
                <div className="relative w-5 h-5">
                  <FaSun 
                    className={`absolute inset-0 transition-all duration-500 ${
                      isDark 
                        ? 'opacity-0 rotate-90 scale-0' 
                        : 'opacity-100 rotate-0 scale-100'
                    }`} 
                  />
                  <FaMoon 
                    className={`absolute inset-0 transition-all duration-500 ${
                      isDark 
                        ? 'opacity-100 rotate-0 scale-100' 
                        : 'opacity-0 -rotate-90 scale-0'
                    }`} 
                  />
                </div>
                <span className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-600/30">
                      <FaUser className="text-white text-xs" />
                    </div>
                    <span className={`text-sm font-light transition-colors duration-500 ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}>
                      {user?.name || 'Usuario'}
                    </span>
                  </div>
                  
                  {/* BOTÓN ADMINISTRADOR */}
                  {isAdmin() && (
                    <button
                      onClick={handleAdminDashboard}
                      className="relative group flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-light uppercase tracking-[0.1em] transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                      <FaTachometerAlt className="text-[10px] relative z-10 text-white" />
                      <span className="relative z-10 text-white">Administración</span>
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors duration-300 font-light uppercase tracking-[0.1em]"
                  >
                    <FaSignOutAlt className="text-[10px]" />
                    Salir
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-light uppercase tracking-[0.1em] border transition-all duration-300 ${
                    isDark 
                      ? 'text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800/50 border-zinc-800/50 hover:border-zinc-700/50' 
                      : 'text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <FaUser className="text-[10px] group-hover:scale-110 transition-transform duration-300" />
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
              className={`relative p-3 transition-all duration-300 group ${
                isDark ? 'text-zinc-400 hover:text-amber-500' : 'text-zinc-600 hover:text-amber-600'
              }`}
            >
              <FaShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-amber-600 to-orange-600 text-white text-[10px] font-light rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg shadow-amber-600/50">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Botón menú móvil */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-3 transition-colors duration-300 ${
                isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ======== MENÚ MÓVIL ======== */}
        {isMobileMenuOpen && (
          <div className={`md:hidden py-6 border-t backdrop-blur-xl animate-fade-in transition-colors duration-500 ${
            isDark 
              ? 'border-zinc-900/50 bg-zinc-950/95' 
              : 'border-zinc-200 bg-white/95'
          }`}>
            <div className="flex flex-col space-y-1">

              {/* BOTÓN TEMA MÓVIL */}
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-4 py-3 px-4 rounded-xl text-sm font-light transition-all duration-300 ${
                  isDark 
                    ? 'text-amber-500 bg-zinc-900/50 hover:bg-zinc-800/50' 
                    : 'text-amber-600 bg-zinc-100 hover:bg-zinc-200'
                }`}
              >
                {isDark ? <FaSun className="text-xs" /> : <FaMoon className="text-xs" />}
                {isDark ? 'Tema Claro' : 'Tema Oscuro'}
              </button>

              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`flex items-center gap-4 py-3 px-4 rounded-xl text-sm font-light transition-all duration-300 ${
                  isActive('/') 
                    ? isDark ? 'text-amber-500 bg-zinc-900/50' : 'text-amber-600 bg-zinc-100'
                    : isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900/30' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <FaHome className="text-xs" />
                Inicio
              </Link>

              <Link 
                to="/productos" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`flex items-center gap-4 py-3 px-4 rounded-xl text-sm font-light transition-all duration-300 ${
                  isActive('/productos') 
                    ? isDark ? 'text-amber-500 bg-zinc-900/50' : 'text-amber-600 bg-zinc-100'
                    : isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900/30' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <FaBox className="text-xs" />
                Productos
              </Link>

              {/* Categorías Móvil */}
              <div className="py-1">
                <button 
                  onClick={toggleCategories}
                  className={`flex items-center gap-4 w-full py-3 px-4 rounded-xl text-sm font-light transition-all duration-300 ${
                    isDark 
                      ? 'text-zinc-400 hover:text-white hover:bg-zinc-900/30' 
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <FaTags className="text-xs" />
                  <span>Categorías</span>
                  <FaChevronDown className={`text-xs ml-auto transition-all duration-300 ${isCategoriesOpen ? 'rotate-180 text-amber-500' : ''}`} />
                </button>
                
                {isCategoriesOpen && (
                  <div className="mt-2 ml-4 space-y-1 animate-fade-in">
                    {CATEGORIES.map((category, index) => (
                      <Link
                        key={category}
                        to={`/productos?categoria=${category}`}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsCategoriesOpen(false);
                        }}
                        className={`flex items-center gap-3 py-2.5 px-4 rounded-lg text-sm font-light transition-all duration-200 ${
                          isDark 
                            ? 'text-zinc-500 hover:text-white hover:bg-zinc-900/30' 
                            : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <span className="w-1 h-1 rounded-full bg-amber-600/40" />
                        {capitalizeWords(category)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to="/contacto" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`flex items-center gap-4 py-3 px-4 rounded-xl text-sm font-light transition-all duration-300 ${
                  isActive('/contacto') 
                    ? isDark ? 'text-amber-500 bg-zinc-900/50' : 'text-amber-600 bg-zinc-100'
                    : isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900/30' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <FaEnvelope className="text-xs" />
                Contacto
              </Link>

              {/* Usuario Móvil */}
              <div className={`border-t pt-4 mt-4 transition-colors duration-500 ${
                isDark ? 'border-zinc-900/50' : 'border-zinc-200'
              }`}>
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <div className={`flex items-center gap-3 py-3 px-4 ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-600/30">
                        <FaUser className="text-white text-xs" />
                      </div>
                      <span className="font-light text-sm">{user?.name}</span>
                    </div>
                    
                    {/* BOTÓN ADMIN MÓVIL */}
                    {isAdmin() && (
                      <button
                        onClick={handleAdminDashboard}
                        className="w-full flex items-center gap-4 py-3 px-4 rounded-xl text-sm font-light bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg hover:shadow-amber-600/30 transition-all duration-300"
                      >
                        <FaTachometerAlt className="text-xs" />
                        Zona Administrador
                      </button>
                    )}

                    <button 
                      onClick={handleLogout}
                      className={`flex items-center gap-4 py-3 px-4 rounded-xl text-sm font-light transition-all duration-300 w-full ${
                        isDark 
                          ? 'text-red-400 hover:text-red-300 hover:bg-red-900/10' 
                          : 'text-red-500 hover:text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <FaSignOutAlt className="text-xs" />
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 py-3 px-4 rounded-xl text-sm font-light transition-all duration-300 ${
                      isDark 
                        ? 'text-zinc-400 hover:text-white hover:bg-zinc-900/30' 
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                    }`}
                  >
                    <FaUser className="text-xs" />
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