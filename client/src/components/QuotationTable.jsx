import React from 'react';

const QuotationTable = ({ items, onItemChange, onAddItem }) => {
  const handleChange = (index, field, value) => {
    onItemChange(index, field, value);
  };

  const calculateTotal = (cantidad, precioUnitario) => {
    const cant = parseFloat(cantidad) || 0;
    const precio = parseFloat(precioUnitario) || 0;
    return (cant * precio).toFixed(2);
  };

  return (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entrega</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">P.Unitario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">P.Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    className="w-16 px-2 py-1 text-sm border rounded-lg"
                    value={item.item}
                    onChange={(e) => handleChange(index, 'item', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border rounded-lg"
                    value={item.cantidad}
                    onChange={(e) => handleChange(index, 'cantidad', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4">
                  <textarea
                    className="w-full px-2 py-1 text-sm border rounded-lg"
                    rows="5"
                    value={item.descripcion}
                    onChange={(e) => handleChange(index, 'descripcion', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    className="w-24 px-2 py-1 text-sm border rounded-lg"
                    value={item.entrega}
                    onChange={(e) => handleChange(index, 'entrega', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    className="w-24 px-2 py-1 text-sm border rounded-lg"
                    value={item.precioUnitario}
                    onChange={(e) => {
                      handleChange(index, 'precioUnitario', e.target.value);
                      handleChange(index, 'precioTotal', 
                        calculateTotal(item.cantidad, e.target.value)
                      );
                    }}
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    className="w-24 px-2 py-1 text-sm border rounded-lg"
                    value={item.precioTotal}
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4">
        <button
          type="button"
          onClick={onAddItem}
          className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Agregar Item
        </button>
      </div>
    </div>
  );
};

export default QuotationTable;