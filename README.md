# 🛍️ Aura - Plataforma de Moda Masculina Premium

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Aura** es una plataforma web de comercio electrónico exclusivamente dedicada a ropa masculina premium. Diseñada para ofrecer una experiencia de usuario pulida, accesible y visualmente distintiva.

---

## 🎯 Características Principales

### ✨ MVP (Minimum Viable Product)
- 🏠 **Página de inicio** con hero, productos destacados y categorías
- 📦 **Catálogo de productos** con filtros por categoría y precio
- 🔍 **Detalles del producto** con selector de tallas y galería de imágenes
- 🛒 **Carrito persistente** guardado en localStorage
- 🔔 **Notificaciones contextuales** con feedback inmediato
- ♿ **Accesibilidad WCAG 2.1 AA** - navegable por teclado y lector de pantalla
- 📱 **100% Responsive** - diseño mobile-first

### 🎨 Diseño
- **Tipografía**: Bebas Neue (display) + Inter (body)
- **Paleta de colores**: Negro premium (#1a1a1a), Dorado elegante (#d4af37)
- **Animaciones suaves** y transiciones fluidas
- **Minimalista** y orientado a conversión

---

## 🚀 Inicio Rápido

### Prerequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/aura-ecommerce.git

# Entrar al directorio
cd aura-ecommerce

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 📂 Estructura del Proyecto

```
aura/
├── docs/                    # Documentación técnica
│   ├── IEEE_SRS.md
│   ├── DATA_MODEL.md
│   ├── USER_STORIES.md
│   ├── BUSINESS_RULES.md
│   └── DESIGN_SYSTEM.md
│
├── public/                  # Assets estáticos
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── assets/              # Imágenes, fuentes
│   ├── components/
│   │   ├── ui/              # Componentes primitivos (Button, Modal, Toast)
│   │   ├── layout/          # Layout global (Header, Footer, Hero)
│   │   └── features/        # Componentes de dominio
│   ├── context/             # Estado global (CartContext, ToastContext)
│   ├── data/                # Datos mock y helpers
│   ├── hooks/               # Hooks personalizados
│   ├── pages/               # Páginas de la app
│   ├── styles/              # CSS global
│   ├── utils/               # Utilidades
│   ├── App.jsx              # Componente raíz
│   └── main.jsx             # Punto de entrada
│
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en localhost:3000

# Producción
npm run build        # Construye la app para producción en /dist
npm run preview      # Preview del build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

---

## 🧪 Tecnologías Utilizadas

### Core
- **React 18.3** - Biblioteca de UI
- **Vite 5.4** - Build tool ultrarrápido
- **React Router 6.28** - Enrutamiento SPA

### Estilos
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **PostCSS** - Transformaciones CSS
- **Autoprefixer** - Compatibilidad cross-browser

### Estado y Contexto
- **React Context API** - Estado global sin librerías externas
- **localStorage API** - Persistencia del carrito

### Calidad
- **ESLint** - Linter de JavaScript/React
- **WCAG 2.1 AA** - Estándares de accesibilidad

---

## 📋 Historias de Usuario (Top 5)

### HU-1: Explorar productos por categoría
Como hombre moderno que busca ropa de calidad, quiero poder navegar por categorías masculinas para encontrar rápidamente lo que necesito.

### HU-2: Ver detalles con claridad
Como comprador que valora la transparencia, quiero ver toda la información relevante de una prenda para tomar una decisión informada.

### HU-3: Agregar al carrito con feedback
Como usuario impaciente, quiero agregar prendas al carrito y recibir confirmación visual en <1 segundo.

### HU-4: Carrito persistente
Como usuario multitarea, quiero que mi carrito se mantenga incluso si cierro la página.

### HU-5: Navegación accesible
Como usuario que usa lector de pantalla o teclado, quiero explorar productos sin obstáculos.

---

## ♿ Accesibilidad

Aura cumple con **WCAG 2.1 nivel AA**:

- ✅ Navegación completa por teclado (Tab, Enter, Esc)
- ✅ Atributos ARIA en todos los componentes interactivos
- ✅ Contraste de color 4.5:1 mínimo
- ✅ Anuncios a lectores de pantalla (aria-live)
- ✅ Focus visible en elementos interactivos
- ✅ Textos alternativos en imágenes
- ✅ Skip links para navegación rápida

---

## 🎨 Sistema de Diseño

### Colores
```css
--primary: #1a1a1a      /* Negro premium */
--secondary: #f5f5f5    /* Gris claro */
--accent: #d4af37       /* Dorado elegante */
```

### Tipografía
```css
--font-display: 'Bebas Neue'   /* Títulos, uppercase */
--font-body: 'Inter'            /* Cuerpo, 16px */
```

### Breakpoints
```css
sm:  640px   /* Tablet pequeña */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Desktop grande */
```

---

## 🗺️ Roadmap

### ✅ Fase 1 - MVP (Actual)
- Catálogo de productos
- Carrito de compras
- Persistencia local
- Accesibilidad

### 🚧 Fase 2 - Siguiente
- [ ] Autenticación de usuarios
- [ ] Checkout completo
- [ ] Favoritos persistentes
- [ ] Búsqueda avanzada
- [ ] Integración con pasarela de pagos

### 🔮 Fase 3 - Futuro
- [ ] Aura Women (línea femenina)
- [ ] Sistema de reseñas
- [ ] Programa de lealtad
- [ ] API REST backend
- [ ] Panel de administración

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👤 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

---

## 🙏 Agradecimientos

- Fuentes: Google Fonts (Bebas Neue, Inter)
- Imágenes: Unsplash
- Iconos: Heroicons

---

**Hecho con ❤️ y ☕ en Popayán, Colombia**