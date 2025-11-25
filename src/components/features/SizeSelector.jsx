// src/components/features/SizeSelector.jsx

import { useState } from 'react';
import { hasStockForSize } from '../../data/helpers/validateStock';

/**
 * Componente SizeSelector - Selector de tallas con indicación de stock
 * @param {Object} props
 * @param {Object} props.product - Producto con array de sizes
 * @param {string} props.selectedSize - Talla seleccionada actualmente
 * @param {Function} props.onSizeSelect - Callback cuando se selecciona una talla
 * @param {string} props.label - Label del selector (para accesibilidad)
 */
const SizeSelector = ({
  product,
  selectedSize = null,
  onSizeSelect,
  label = 'Selecciona una talla',
}) => {
  const [focusedSize, setFocusedSize] = useState(null);

  const handleSizeClick = (size) => {
    const hasStock = hasStockForSize(product, size);
    
    if (hasStock) {
      onSizeSelect(size);
    }
  };

  const handleKeyDown = (e, size) => {
    const hasStock = hasStockForSize(product, size);
    
    if (!hasStock) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSizeClick(size);
    }
  };

  return (
    <div className="space-y-3">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-900">
          {label}
        </label>
        {selectedSize && (
          <span className="text-sm text-gray-500">
            Talla: <span className="font-semibold text-primary">{selectedSize}</span>
          </span>
        )}
      </div>

      {/* Grid de tallas */}
      <div
        className="grid grid-cols-4 sm:grid-cols-6 gap-2"
        role="radiogroup"
        aria-label={label}
      >
        {product.sizes.map((sizeData) => {
          const { size, stock } = sizeData;
          const isSelected = selectedSize === size;
          const isAvailable = stock > 0;
          const isFocused = focusedSize === size;
          const isLowStock = stock > 0 && stock <= 2;

          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`Talla ${size}${!isAvailable ? ' - Agotada' : isLowStock ? ' - Pocas unidades' : ''}`}
              disabled={!isAvailable}
              onClick={() => handleSizeClick(size)}
              onKeyDown={(e) => handleKeyDown(e, size)}
              onFocus={() => setFocusedSize(size)}
              onBlur={() => setFocusedSize(null)}
              className={`
                relative
                px-4 py-3
                border-2 rounded
                text-sm font-medium uppercase
                transition-all duration-fast
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${
                  isSelected
                    ? 'border-primary bg-primary text-white'
                    : isAvailable
                    ? 'border-gray-300 bg-white text-gray-900 hover:border-primary'
                    : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                }
                ${isFocused && isAvailable ? 'ring-2 ring-primary ring-offset-2' : ''}
              `}
            >
              {/* Talla */}
              <span className="block">{size}</span>

              {/* Indicador de stock bajo */}
              {isLowStock && !isSelected && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              )}

              {/* Línea diagonal para agotado */}
              {!isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gray-400 rotate-45 transform origin-center" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border-2 border-primary rounded" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border-2 border-gray-300 rounded relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-gray-400 rotate-45" />
            </div>
          </div>
          <span>Agotado</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="relative">
            <div className="w-3 h-3 border-2 border-gray-300 rounded" />
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          </div>
          <span>Pocas unidades</span>
        </div>
      </div>

      {/* Mensaje de error si no hay talla seleccionada */}
      {!selectedSize && (
        <p className="text-xs text-gray-500 italic" role="status">
          Por favor selecciona una talla para continuar
        </p>
      )}
    </div>
  );
};

export default SizeSelector;