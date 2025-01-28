// src/config/api.js
export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    getImageUrl: (imageUrl) => {
      if (!imageUrl) return '';
      if (imageUrl.startsWith('http')) return imageUrl;
      
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      // Asegurarse de que no haya dobles slashes
      const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
      return `${baseUrl}${cleanImageUrl}`;
    }
  };