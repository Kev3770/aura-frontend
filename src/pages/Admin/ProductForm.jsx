// src/pages/Admin/ProductForm.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { getSizesByCategory } from '../../utils/adminHelpers';
import Button from '../../components/ui/Button';
import { categoryService } from '../../services/categoryService';
import { uploadService } from '../../services/uploadService';

const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addProduct, editProduct, getProductById } = useAdmin();
  const isEdit = !!productId;

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [uploadingImageIndex, setUploadingImageIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '0',
    description: '',
    category: '',
    isNew: false,
    featured: false,
    images: [''],
    sizes: [],
    colors: ['']
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAll();
        if (response.success) {
          setCategories(response.data.categories);
          if (!formData.category && response.data.categories.length > 0) {
            setFormData(prev => ({
              ...prev,
              category: response.data.categories[0].id
            }));
          }
        }
      } catch (error) {
        console.error('Error cargando categorías:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Cargar producto si es edición
  useEffect(() => {
    if (isEdit) {
      const product = getProductById(productId);
      if (product) {
        const categoryId = typeof product.category === 'object' 
          ? product.category.id 
          : product.category;

        setFormData({
          name: product.name,
          price: String(product.price),
          discount: String(product.discount),
          description: product.description,
          category: categoryId,
          isNew: product.isNew,
          featured: product.featured,
          images: product.images.length > 0 ? product.images : [''],
          sizes: product.sizes.map(s => ({ size: s.size, stock: String(s.stock) })),
          colors: product.colors.length > 0 ? product.colors : ['']
        });
      } else {
        navigate('/admin/productos');
      }
    }
  }, [isEdit, productId, getProductById, navigate]);

  // Inicializar tallas
  useEffect(() => {
    if (!isEdit || formData.sizes.length === 0) {
      const categorySlug = categories.find(c => c.id === formData.category)?.slug || formData.category;
      const availableSizes = getSizesByCategory(categorySlug);
      setFormData(prev => ({
        ...prev,
        sizes: availableSizes.map(size => ({ size, stock: '0' }))
      }));
    }
  }, [formData.category, isEdit, categories]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // ✅ FUNCIÓN PARA SUBIR IMAGEN
  const handleImageFileChange = async (index, file) => {
    if (!file) return;

    try {
      setUploadingImageIndex(index);

      // Subir a Cloudinary
      const imageUrl = await uploadService.uploadImage(file);

      // Actualizar el array de imágenes
      const newImages = [...formData.images];
      newImages[index] = imageUrl;
      setFormData(prev => ({ ...prev, images: newImages }));

      // Limpiar errores
      if (errors.images) {
        setErrors(prev => ({ ...prev, images: null }));
      }
    } catch (error) {
      console.error('Error al cargar imagen:', error);
      alert(error.message || 'Error al cargar la imagen. Intenta de nuevo.');
    } finally {
      setUploadingImageIndex(null);
    }
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSizeStockChange = (size, stock) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.map(s => 
        s.size === size ? { ...s, stock } : s
      )
    }));
  };

  const handleColorChange = (index, value) => {
    const newColors = [...formData.colors];
    newColors[index] = value;
    setFormData(prev => ({ ...prev, colors: newColors }));
  };

  const addColorField = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, '']
    }));
  };

  const removeColorField = (index) => {
    if (formData.colors.length > 1) {
      setFormData(prev => ({
        ...prev,
        colors: prev.colors.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    if (parseFloat(formData.discount) < 0 || parseFloat(formData.discount) > 100) {
      newErrors.discount = 'El descuento debe estar entre 0 y 100';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }

    if (!formData.category) {
      newErrors.category = 'La categoría es obligatoria';
    }

    const validImages = formData.images.filter(img => img.trim() !== '');
    if (validImages.length === 0) {
      newErrors.images = 'Debe haber al menos una imagen';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount),
      categoryId: formData.category,
      isNew: formData.isNew,
      featured: formData.featured,
      images: formData.images.filter(img => img.trim() !== ''),
      sizes: formData.sizes.map(s => ({
        size: s.size,
        stock: parseInt(s.stock) || 0
      })),
      colors: formData.colors.filter(color => color.trim() !== '')
    };

    let result;
    if (isEdit) {
      result = await editProduct(productId, productData);
    } else {
      result = await addProduct(productData);
    }

    setIsSubmitting(false);

    if (result && result.success) {
      navigate('/admin/productos');
    }
  };

  if (loadingCategories) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando formulario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-display-lg mb-2">
            {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
          </h1>
          <Link to="/admin/productos" className="text-primary hover:text-accent transition-colors text-sm">
            ← Volver a productos
          </Link>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="max-w-4xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            {/* Información Básica */}
            <div>
              <h2 className="text-xl font-display uppercase mb-4 pb-2 border-b border-gray-200">
                Información Básica
              </h2>

              <div className="space-y-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Producto <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ej: Camisa Oxford Blanca"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Categoría */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                  )}
                </div>

                {/* Precio y Descuento */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                      Precio (COP) <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="100"
                      className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="89900"
                    />
                    {errors.price && (
                      <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
                      Descuento (%)
                    </label>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none ${
                        errors.discount ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0"
                    />
                    {errors.discount && (
                      <p className="text-red-600 text-sm mt-1">{errors.discount}</p>
                    )}
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none resize-none ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe el producto, materiales, corte, uso ideal..."
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ✅ SECCIÓN DE IMÁGENES - ACTUALIZADA */}
            <div>
              <h2 className="text-xl font-display uppercase mb-4 pb-2 border-b border-gray-200">
                Imágenes del Producto
              </h2>

              <div className="space-y-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start gap-4">
                      {/* Preview de la imagen */}
                      <div className="flex-shrink-0">
                        {image ? (
                          <div className="relative w-24 h-24 border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {uploadingImageIndex === index && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Input de archivo */}
                      <div className="flex-1">
                        <label className="block">
                          <span className="text-sm font-medium text-gray-700 mb-2 block">
                            Imagen #{index + 1} {index === 0 && <span className="text-red-600">*</span>}
                          </span>
                          <div className="flex gap-2">
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/jpg, image/webp"
                              onChange={(e) => handleImageFileChange(index, e.target.files[0])}
                              disabled={uploadingImageIndex === index}
                              className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark file:cursor-pointer disabled:opacity-50"
                            />
                            {formData.images.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeImageField(index)}
                                disabled={uploadingImageIndex === index}
                                className="px-3 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50 disabled:opacity-50"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, WEBP (máximo 10MB). La imagen se optimizará automáticamente.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addImageField}
                  disabled={uploadingImageIndex !== null}
                  className="text-sm text-primary hover:text-accent transition-colors font-medium disabled:opacity-50"
                >
                  + Agregar otra imagen
                </button>

                {errors.images && (
                  <p className="text-red-600 text-sm">{errors.images}</p>
                )}
              </div>
            </div>

            {/* Tallas y Stock */}
            <div>
              <h2 className="text-xl font-display uppercase mb-4 pb-2 border-b border-gray-200">
                Tallas y Stock
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.sizes.map((sizeData) => (
                  <div key={sizeData.size}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Talla {sizeData.size}
                    </label>
                    <input
                      type="number"
                      value={sizeData.stock}
                      onChange={(e) => handleSizeStockChange(sizeData.size, e.target.value)}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Colores */}
            <div>
              <h2 className="text-xl font-display uppercase mb-4 pb-2 border-b border-gray-200">
                Colores Disponibles
              </h2>

              <div className="space-y-3">
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      placeholder="Ej: Negro, Azul Marino, Blanco"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    {formData.colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeColorField(index)}
                        className="px-3 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addColorField}
                  className="text-sm text-primary hover:text-accent transition-colors"
                >
                  + Agregar otro color
                </button>
              </div>
            </div>

            {/* Opciones */}
            <div>
              <h2 className="text-xl font-display uppercase mb-4 pb-2 border-b border-gray-200">
                Opciones
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={formData.isNew}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">
                    Marcar como <strong>Nuevo</strong>
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">
                    Marcar como <strong>Destacado</strong>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-4 mt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              disabled={isSubmitting || uploadingImageIndex !== null}
            >
              {isEdit ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
            <Link to="/admin/productos">
              <Button type="button" variant="secondary" size="lg">
                Cancelar
              </Button>
            </Link>
          </div>

          {uploadingImageIndex !== null && (
            <p className="text-sm text-gray-600 mt-4">
              ⏳ Subiendo imagen... Por favor espera.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductForm;