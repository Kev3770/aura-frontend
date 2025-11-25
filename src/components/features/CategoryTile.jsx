// src/components/features/CategoryTile.jsx

import { Link } from 'react-router-dom';

/**
 * Componente CategoryTile - Muestra una categoría como tile clickeable
 * @param {Object} props
 * @param {Object} props.category - Objeto de categoría con metadata
 * @param {number} props.productCount - Cantidad de productos en la categoría
 */
const CategoryTile = ({ category, productCount = 0 }) => {
  return (
    <Link
      to={`/productos?categoria=${category.id}`}
      className="block group relative overflow-hidden rounded-lg"
      aria-label={`Ver ${category.displayName} - ${productCount} productos`}
    >
      {/* Imagen de fondo */}
      <div className="aspect-square bg-secondary relative">
        <img
          src={category.image}
          alt=""
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          aria-hidden="true"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-2xl md:text-3xl font-display uppercase text-white mb-2 group-hover:text-accent transition-colors">
          {category.displayName}
        </h3>
        
        <p className="text-sm text-gray-300 mb-3">
          {category.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {productCount} {productCount === 1 ? 'producto' : 'productos'}
          </span>
          
          <span className="text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Ver más
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Indicador de hover */}
      <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>
    </Link>
  );
};

export default CategoryTile;