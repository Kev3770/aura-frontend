// src/services/uploadService.js

import api from './api';

/**
 * Convertir archivo a base64
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Validar imagen
 */
const validateImage = (file) => {
  // Validar tipo
  if (!file.type.startsWith('image/')) {
    throw new Error('El archivo debe ser una imagen (PNG, JPG, WEBP)');
  }

  // Validar tamaño (máximo 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('La imagen no debe superar 10MB');
  }

  return true;
};

export const uploadService = {
  /**
   * Subir imagen a Cloudinary
   */
  async uploadImage(file) {
    try {
      // Validar archivo
      validateImage(file);

      console.log('📤 Subiendo imagen:', file.name, `(${(file.size / 1024).toFixed(2)} KB)`);

      // Convertir a base64
      const base64 = await fileToBase64(file);

      // Enviar al backend
      const response = await api.post('/upload/image', {
        image: base64
      });

      console.log('✅ Imagen subida:', response.data.data.imageUrl);

      return response.data.data.imageUrl; // URL de Cloudinary
    } catch (error) {
      console.error('❌ Error subiendo imagen:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      
      throw error;
    }
  },

  /**
   * Eliminar imagen de Cloudinary (futuro)
   */
  async deleteImage(publicId) {
    try {
      const response = await api.delete('/upload/image', {
        data: { publicId }
      });
      return response.data;
    } catch (error) {
      console.error('Error eliminando imagen:', error);
      throw error;
    }
  }
};