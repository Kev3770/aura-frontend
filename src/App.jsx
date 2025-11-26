// src/App.jsx — Versión corregida con ThemeProvider integrado

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Contextos
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { ThemeProvider } from './context/ThemeContext'; // 🔥 AGREGADO

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Páginas públicas
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';

// Páginas Admin
import Admin from './pages/Admin/Admin';
import ProductList from './pages/Admin/ProductList';
import ProductForm from './pages/Admin/ProductForm';
import ProductStats from './pages/Admin/ProductStats';

// Utilidades
import { detectKeyboardUser, createSkipLink } from './utils/accessibility';

// Manejo de scroll al cambiar ruta
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Página 404
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center max-w-md px-4">
      <h1 className="text-display-xl mb-4 text-primary">404</h1>
      <h2 className="text-display-sm mb-4">Página no encontrada</h2>
      <p className="text-gray-600 mb-8">La página que buscas no existe o fue movida.</p>
      <a href="/" className="btn-primary">Volver al Inicio</a>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    const cleanup = detectKeyboardUser();
    createSkipLink('main-content', 'Saltar al contenido principal');
    return cleanup;
  }, []);

  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <AdminProvider>
                {/* 🔥 ENVOLTORIO PRINCIPAL PARA EL NEO-THEME */}
                <ThemeProvider>
                  <div className="flex flex-col min-h-screen">

                    <Header />

                    <main id="main-content" className="flex-1" tabIndex="-1">
                      <ScrollToTop />

                      <Routes>
                        {/* RUTAS PUBLICAS */}
                        <Route path="/" element={<Home />} />
                        <Route path="/productos" element={<Products />} />
                        <Route path="/productos/:slug" element={<ProductDetail />} />
                        <Route path="/carrito" element={<Cart />} />
                        <Route path="/contacto" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin/login" element={<Login />} />

                        {/* ADMIN PROTEGIDO */}
                        <Route
                          path="/admin"
                          element={
                            <ProtectedRoute>
                              <Admin />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="/admin/productos"
                          element={
                            <ProtectedRoute>
                              <ProductList />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="/admin/productos/nuevo"
                          element={
                            <ProtectedRoute>
                              <ProductForm />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="/admin/productos/editar/:productId"
                          element={
                            <ProtectedRoute>
                              <ProductForm />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="/admin/estadisticas"
                          element={
                            <ProtectedRoute>
                              <ProductStats />
                            </ProtectedRoute>
                          }
                        />

                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>

                    <Footer />
                  </div>
                </ThemeProvider>

              </AdminProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;