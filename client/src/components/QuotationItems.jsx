import React, { useState, useEffect } from 'react';

const QuotationItems = ({ onItemsChange, initialItems = [] }) => {
  const [items, setItems] = useState(initialItems || []);

  // Actualizar items cuando cambian los initialItems
  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      const formattedItems = initialItems.map(item => ({
        item: item.item || '',
        cantidad: item.cantidad || 0,
        descripcion: item.descripcion || '',
        entrega: item.entrega || '',
        precioUnitario: item.precioUnitario || 0,
        precioTotal: item.precioTotal || 0,
      }));
      setItems(formattedItems);
    }
  }, [initialItems]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Recalcular el precio total si cambia la cantidad o precio unitario
    if (field === 'cantidad' || field === 'precioUnitario') {
      const cantidad = field === 'cantidad' ? value : newItems[index].cantidad;
      const precioUnitario = field === 'precioUnitario' ? value : newItems[index].precioUnitario;
      newItems[index].precioTotal = cantidad * precioUnitario;
    }
    
    setItems(newItems);
    onItemsChange(newItems);
  };

  const addItem = () => {
    const newItem = {
      item: '',
      cantidad: 0,
      descripcion: '',
      entrega: '',
      precioUnitario: 0,
      precioTotal: 0,
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
          <div key={index} className="grid grid-cols-6 gap-4 p-4 border rounded-lg">
            <div className="col-span-6 md:col-span-1">
              <label className="block text-sm font-medium mb-1">Item</label>
              <input
                type="text"
                value={item.item || ''}
                onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="col-span-6 md:col-span-1">
              <label className="block text-sm font-medium mb-1">Cantidad</label>
              <input
                type="number"
                value={item.cantidad || 0}
                onChange={(e) => handleItemChange(index, 'cantidad', Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="col-span-6 md:col-span-2">
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <input
                type="text"
                value={item.descripcion || ''}
                onChange={(e) => handleItemChange(index, 'descripcion', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="col-span-6 md:col-span-1">
              <label className="block text-sm font-medium mb-1">Precio Unitario</label>
              <input
                type="number"
                value={item.precioUnitario || 0}
                onChange={(e) => handleItemChange(index, 'precioUnitario', Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="col-span-5 md:col-span-1">
              <label className="block text-sm font-medium mb-1">Precio Total</label>
              <input
                type="number"
                value={item.precioTotal || 0}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
              />
            </div>
            <div className="col-span-1 flex items-end">
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