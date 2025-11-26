// src/pages/Products/Products.jsx
// ... imports ...

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products: allProducts, isLoading: globalLoading, getProductsByCategory } = useProducts();
  
  const categoryFromUrl = searchParams.get('categoria') || 'all';
  const newFromUrl = searchParams.get('nuevos') === 'true';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [showNewOnly, setShowNewOnly] = useState(newFromUrl);
  const [sortBy, setSortBy] = useState('recent');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterLoading, setIsFilterLoading] = useState(false); // ← NUEVO

  // Efecto para cargar productos cuando cambia la categoría
  useEffect(() => {
    const loadProducts = async () => {
      setIsFilterLoading(true); // ← ACTIVAR LOADING
      
      try {
        if (selectedCategory && selectedCategory !== 'all') {
          const categoryProducts = await getProductsByCategory(selectedCategory);
          setFilteredProducts(categoryProducts);
        } else {
          setFilteredProducts(allProducts);
        }
      } finally {
        setIsFilterLoading(false); // ← DESACTIVAR LOADING
      }
    };

    loadProducts();
  }, [selectedCategory, allProducts, getProductsByCategory]);

  // ... resto del código igual ...

  const isLoading = globalLoading || isFilterLoading;

  if (isLoading && filteredProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* ... resto del JSX ... */}
        
        {/* Grid de Productos con loading overlay */}
        <div className="lg:col-span-3 relative">
          {/* Loading Overlay */}
          {isFilterLoading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Filtrando productos...</p>
              </div>
            </div>
          )}

          {/* Ordenamiento */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">
              Mostrando {productsToShow.length} productos
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              disabled={isFilterLoading}
            >
              <option value="recent">Más recientes</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>

          {/* Productos */}
          {productsToShow.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsToShow.map(product => (
                <ProductCard 
                  key={`${product.id}-${product.slug}`} // ← KEY MÁS ESPECÍFICO
                  product={product} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No se encontraron productos con los filtros seleccionados
              </p>
              <Button variant="primary" onClick={clearFilters}>
                Ver Todos los Productos
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;