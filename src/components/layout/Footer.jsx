// src/components/layout/Footer.jsx

import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { CATEGORIES } from '../../data/constants';
import { capitalizeWords } from '../../utils/formatters';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();

  return (
    <footer className={`mt-auto transition-colors duration-500 ${
      isDark 
        ? 'bg-zinc-950 border-t border-zinc-900/50' 
        : 'bg-white border-t border-zinc-200'
    }`}>
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Columna 1: Sobre Aura */}
          <div className="space-y-6">
            <div>
              <h3 className={`text-2xl md:text-3xl font-light tracking-tighter mb-4 transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}>
                AURA
              </h3>
              <div className="w-16 h-px bg-gradient-to-r from-amber-600 to-transparent mb-4" />
            </div>
            <p className={`text-sm leading-relaxed font-light transition-colors duration-500 ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Ropa masculina premium. Estilo, calidad y confianza en cada prenda que define tu esencia.
            </p>
            
            {/* Badge decorativo */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[0.2em] uppercase font-light border transition-colors duration-500 ${
              isDark 
                ? 'bg-zinc-900/50 border-amber-600/30 text-amber-500' 
                : 'bg-zinc-50 border-amber-600/30 text-amber-600'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Premium Quality
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className={`text-xs uppercase tracking-[0.2em] mb-6 font-light transition-colors duration-500 ${
              isDark ? 'text-zinc-500' : 'text-zinc-600'
            }`}>
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/productos', label: 'Productos' },
                { to: '/contacto', label: 'Contacto' },
                { to: '/carrito', label: 'Carrito' }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`group inline-flex items-center gap-2 text-sm font-light transition-all duration-300 ${
                      isDark 
                        ? 'text-zinc-400 hover:text-amber-500' 
                        : 'text-zinc-600 hover:text-amber-600'
                    }`}
                  >
                    <span className={`w-0 h-px transition-all duration-300 group-hover:w-4 ${
                      isDark ? 'bg-amber-500' : 'bg-amber-600'
                    }`} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Categorías */}
          <div>
            <h4 className={`text-xs uppercase tracking-[0.2em] mb-6 font-light transition-colors duration-500 ${
              isDark ? 'text-zinc-500' : 'text-zinc-600'
            }`}>
              Categorías
            </h4>
            <ul className="space-y-3">
              {CATEGORIES.slice(0, 5).map((category) => (
                <li key={category}>
                  <Link
                    to={`/productos?categoria=${category}`}
                    className={`group inline-flex items-center gap-2 text-sm font-light transition-all duration-300 ${
                      isDark 
                        ? 'text-zinc-400 hover:text-amber-500' 
                        : 'text-zinc-600 hover:text-amber-600'
                    }`}
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-600/40 group-hover:bg-amber-500 group-hover:scale-150 transition-all duration-300" />
                    {capitalizeWords(category)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className={`text-xs uppercase tracking-[0.2em] mb-6 font-light transition-colors duration-500 ${
              isDark ? 'text-zinc-500' : 'text-zinc-600'
            }`}>
              Contacto
            </h4>
            <ul className={`space-y-4 text-sm font-light transition-colors duration-500 ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              <li className="flex items-start gap-3 group">
                <svg
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                    isDark 
                      ? 'text-zinc-600 group-hover:text-amber-500' 
                      : 'text-zinc-400 group-hover:text-amber-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@aura.com"
                  className={`transition-colors duration-300 ${
                    isDark ? 'hover:text-amber-500' : 'hover:text-amber-600'
                  }`}
                >
                  info@aura.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <svg
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                    isDark 
                      ? 'text-zinc-600 group-hover:text-amber-500' 
                      : 'text-zinc-400 group-hover:text-amber-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+573001234567"
                  className={`transition-colors duration-300 ${
                    isDark ? 'hover:text-amber-500' : 'hover:text-amber-600'
                  }`}
                >
                  +57 300 123 4567
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <svg
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                    isDark 
                      ? 'text-zinc-600 group-hover:text-amber-500' 
                      : 'text-zinc-400 group-hover:text-amber-600'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Popayán, Cauca, Colombia</span>
              </li>
            </ul>

            {/* Redes sociales */}
            <div className="flex gap-4 mt-6">
              {[
                {
                  href: 'https://facebook.com',
                  label: 'Facebook',
                  icon: (
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  )
                },
                {
                  href: 'https://instagram.com',
                  label: 'Instagram',
                  icon: (
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  )
                },
                {
                  href: 'https://twitter.com',
                  label: 'Twitter',
                  icon: (
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  )
                }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-2 rounded-lg transition-all duration-300 ${
                    isDark 
                      ? 'bg-zinc-900/50 hover:bg-zinc-800/50 text-zinc-500 hover:text-amber-500' 
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-amber-600'
                  }`}
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg opacity-0 group-hover:opacity-10 blur transition-opacity duration-300" />
                  <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section - BONUS */}
        <div className={`mt-16 pt-12 border-t transition-colors duration-500 ${
          isDark ? 'border-zinc-900/50' : 'border-zinc-200'
        }`}>
          <div className="max-w-2xl mx-auto text-center">
            <h4 className={`text-xl md:text-2xl font-light tracking-tight mb-3 transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-zinc-900'
            }`}>
              Suscríbete a Nuestro Newsletter
            </h4>
            <p className={`text-sm font-light mb-6 transition-colors duration-500 ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Recibe las últimas novedades y ofertas exclusivas
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-light border focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300 ${
                  isDark 
                    ? 'bg-zinc-900/50 border-zinc-800 text-white placeholder-zinc-600' 
                    : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                }`}
              />
              <button className="group relative px-6 py-3 rounded-xl text-sm font-light uppercase tracking-[0.1em] transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                <span className="relative z-10 text-white">Suscribirse</span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-12 pt-8 border-t text-center transition-colors duration-500 ${
          isDark ? 'border-zinc-900/50' : 'border-zinc-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-xs font-light transition-colors duration-500 ${
              isDark ? 'text-zinc-500' : 'text-zinc-600'
            }`}>
              © {currentYear} Aura. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                to="/terminos"
                className={`text-xs font-light transition-colors duration-300 ${
                  isDark 
                    ? 'text-zinc-500 hover:text-amber-500' 
                    : 'text-zinc-600 hover:text-amber-600'
                }`}
              >
                Términos y Condiciones
              </Link>
              <Link
                to="/privacidad"
                className={`text-xs font-light transition-colors duration-300 ${
                  isDark 
                    ? 'text-zinc-500 hover:text-amber-500' 
                    : 'text-zinc-600 hover:text-amber-600'
                }`}
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;