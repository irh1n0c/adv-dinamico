import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../config/api';

const QuotationItems = ({ onItemsChange, initialItems = [] }) => {
  const [items, setItems] = useState(initialItems || []);

  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      const formattedItems = initialItems.map(item => ({
        item: item.item || '',
        cantidad: item.cantidad || 0,
        descripcion: item.descripcion || '',
        entrega: item.entrega || '',
        precioUnitario: item.precioUnitario || 0,
        precioTotal: item.precioTotal || 0,
        images: item.images || []
      }));
      setItems(formattedItems);
    }
  }, [initialItems]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'cantidad' || field === 'precioUnitario') {
      const cantidad = field === 'cantidad' ? value : newItems[index].cantidad;
      const precioUnitario = field === 'precioUnitario' ? value : newItems[index].precioUnitario;
      newItems[index].precioTotal = cantidad * precioUnitario;
    }
    
    setItems(newItems);
    onItemsChange(newItems);
  };

  const handleImageUpload = async (index, files) => {
    const newItems = [...items];
    const currentItem = newItems[index];
    
    if (!currentItem.images) {
      currentItem.images = [];
    }

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${API_CONFIG.baseURL}/api/quotations/uploads`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al subir la imagen');
        }

        const data = await response.json();
        currentItem.images.push({
          url: data.url,
          caption: file.name,
          order: currentItem.images.length
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        alert(error.message);
      }
    }

    setItems(newItems);
    onItemsChange(newItems);
  };

  const removeImage = async (itemIndex, imageIndex) => {
    try {
      const image = items[itemIndex].images[imageIndex];
      const filename = image.url.split('/').pop();
      
      console.log('Intentando eliminar archivo:', filename); // Debug
  
      const response = await fetch(`${API_CONFIG.baseURL}/api/quotations/uploads/${filename}`, {
        method: 'DELETE'
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar la imagen');
      }
  
      // Si la eliminación fue exitosa, actualizar el estado
      const newItems = [...items];
      newItems[itemIndex].images.splice(imageIndex, 1);
      setItems(newItems);
      onItemsChange(newItems);
  
    } catch (error) {
      console.error('Error completo:', error);
      alert(`Error al eliminar la imagen: ${error.message}`);
    }
  };

  const addItem = () => {
    const newItem = {
      item: '',
      cantidad: 0,
      descripcion: '',
      entrega: '',
      precioUnitario: 0,
      precioTotal: 0,
      images: []
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    onItemsChange(newItems);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onItemsChange(newItems);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Items</h2>
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Agregar Item
        </button>
      </div>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-6 md:col-span-1">
                <label className="block text-sm font-medium mb-1 bg-sky-900 text-white px-2 py-1 rounded">Item</label>
                <input
                  type="text"
                  value={item.item || '01'}
                  onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="col-span-6 md:col-span-1">
                <label className="block text-sm font-medium mb-1 bg-sky-900 text-white px-2 py-1 rounded">Cantidad</label>
                <input
                  type="text"
                  value={item.cantidad || ''}
                  onChange={(e) => handleItemChange(index, 'cantidad', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="col-span-6 md:col-span-2">
                <label className="block text-sm font-medium mb-1 bg-sky-900 text-white px-2 py-1 rounded">Descripción</label>
                <textarea
                  
                  type="text"
                  value={item.descripcion || ''}
                  onChange={(e) => handleItemChange(index, 'descripcion', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="col-span-6 md:col-span-1">
                <label className="block text-sm font-medium mb-1 bg-sky-900 text-white px-2 py-1 rounded">Precio Unitario</label>
                <input
                  type="number"
                  value={item.precioUnitario || ''}
                  onChange={(e) => handleItemChange(index, 'precioUnitario', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="col-span-5 md:col-span-1">
                <label className="block text-sm font-medium mb-1 bg-sky-900 text-white px-2 py-1 rounded">Precio Total</label>
                <input
                  type="number"
                  value={item.precioTotal || 0}
                  readOnly
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                />
              </div>
          </div>

          <div className="col-span-6">
              <label className="block text-sm font-medium mb-2 bg-sky-900 text-white px-2 py-1 rounded inline-block">Imágenes</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(index, e.target.files)}
                className="w-full px-3 py-2 border rounded-md"
              />
           
          <div className="mt-2 flex flex-wrap gap-4">
          {item.images?.map((image, imageIndex) => (
          <div key={imageIndex} className="relative group w-32 h-32">
            <img
              src={API_CONFIG.getImageUrl(image.url)}
              alt={image.caption}
              className="w-full h-full object-cover rounded-md border"
              onError={(e) => {
                console.error(`Error loading image: ${image.url}`);
                e.target.src = '/placeholder-image.png'; // Opcional: imagen de respaldo
              }}
            />
            <button
              type="button"
              onClick={() => removeImage(index, imageIndex)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="px-3 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotationItems;