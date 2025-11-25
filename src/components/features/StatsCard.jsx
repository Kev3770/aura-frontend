// src/components/features/StatsCard.jsx

/**
 * Componente StatsCard - Muestra una estadística en formato card
 * @param {Object} props
 * @param {string} props.title - Título de la estadística
 * @param {string|number} props.value - Valor numérico
 * @param {React.ReactNode} props.icon - Icono SVG
 * @param {string} props.color - Color del tema (primary, success, warning, error)
 * @param {string} props.trend - Tendencia (up, down, neutral)
 * @param {string} props.trendValue - Valor de la tendencia (ej: "+12%")
 */
const StatsCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary',
  trend,
  trendValue 
}) => {
  const colorClasses = {
    primary: 'bg-primary text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-card-hover transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {title}
        </h3>
        {icon && (
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-gray-900">
          {value}
        </p>

        {trend && trendValue && (
          <span className={`text-sm font-medium ${trendColors[trend]}`}>
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;