// src/components/features/CategoryTile.jsx

import { Link } from 'react-router-dom';

const CategoryTile = ({ category, productCount }) => {
  return (
    <Link
      to={`/productos?categoria=${category.id}`}
      className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
    >
      {/* Imagen de fondo */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={category.image}
          alt={category.displayName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      </div>

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-2xl font-display uppercase text-white mb-2 tracking-wider transform transition-transform duration-300 group-hover:translate-y-[-4px]">
          {category.displayName}
        </h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {category.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-accent font-semibold text-sm">
            {productCount} {productCount === 1 ? 'producto' : 'productos'}
          </span>
          <div className="flex items-center text-white text-sm font-medium group-hover:text-accent transition-colors">
            Ver más
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Badge de conteo (opcional) */}
      {productCount > 0 && (
        <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {productCount}
        </div>
      )}
    </Link>
  );
};

export default CategoryTile;