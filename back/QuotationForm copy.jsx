import React, { useState } from 'react';

const QuotationForm = () => {
  const [formData, setFormData] = useState({
    quotationNumber: {
      number: '',
      year: new Date().getFullYear(),
    },
    clientInfo: {
      razonSocial: '',
      ruc: '',
      area: '',
      atencion: '',
    },
    quotationDetails: {
      validezOferta: '',
      condicionPago: '',
      moneda: 'soles',
      impuestos: '',
      saludo: 'Es grato saludarlo...',
    },
    items: [],
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e, section, field) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field || name]: value,
      },
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      
      if (field === 'cantidad' || field === 'precioUnitario') {
        const cantidad = field === 'cantidad' ? value : newItems[index].cantidad;
        const precioUnitario = field === 'precioUnitario' ? value : newItems[index].precioUnitario;
        newItems[index].precioTotal = cantidad * precioUnitario;
      }
      
      return { ...prev, items: newItems };
    });
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          item: '',
          cantidad: 0,
          descripcion: '',
          entrega: '',
          precioUnitario: 0,
          precioTotal: 0,
        },
      ],
    }));
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const searchQuotation = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/quotations/${formData.quotationNumber.number}/${formData.quotationNumber.year}`
      );
      const data = await response.json();
      
      if (data) {
        setFormData(data);
        setIsEditing(true);
      } else {
        alert('Cotización no encontrada');
      }
    } catch (error) {
      alert('Error al buscar la cotización');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `http://localhost:5000/api/quotations/${formData._id}`
        : 'http://localhost:5000/api/quotations';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(isEditing ? 'Cotización actualizada con éxito' : 'Cotización guardada con éxito');
      } else {
        throw new Error('Error en la operación');
      }
    } catch (error) {
      alert('Error al guardar la cotización');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center justify-center">
          <img src="/images/logo_adv.jpg" alt="Logo ADV" className="h-24 object-cover" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-center font-bold">GRUPO ADV SAC.</div>
          <div className="text-center text-xs">
            Dirección Fiscal: Mza. H Lote 5 P.J. El Triunfo Zn. A – La Joya-Arequipa
            <br />
            Almacén: Cal. Rodriguez Ballón 711-Miraflores-Arequipa
            <br />
            RUC 20605967729
          </div>
          <div className="text-center text-[10px] text-blue-500">
            Correo: ventas@grupo-adv.com o gerencia@grupo-adv.com
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/iso_logo.png" alt="ISO Logo" className="h-24 object-cover" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Quotation Number and Search */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/3 space-y-4">
            <div className="flex items-center">
              <label className="w-1/4 text-sm font-medium">Cotización N°</label>
              <div className="w-1/2 flex gap-2">
                <input
                  type="number"
                  value={formData.quotationNumber.number}
                  onChange={(e) => handleInputChange(e, 'quotationNumber', 'number')}
                  className="w-1/2 px-3 py-2 border rounded-md"
                  placeholder="000"
                />
                <input
                  type="number"
                  value={formData.quotationNumber.year}
                  onChange={(e) => handleInputChange(e, 'quotationNumber', 'year')}
                  className="w-1/2 px-3 py-2 border rounded-md"
                  placeholder="2024"
                />
              </div>
              <button
                type="button"
                onClick={searchQuotation}
                className="ml-2 px-3 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Información del Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Razón Social</label>
              <input
                type="text"
                value={formData.clientInfo.razonSocial}
                onChange={(e) => handleInputChange(e, 'clientInfo', 'razonSocial')}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">RUC</label>
              <input
                type="text"
                value={formData.clientInfo.ruc}
                onChange={(e) => handleInputChange(e, 'clientInfo', 'ruc')}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Área</label>
              <input
                type="text"
                value={formData.clientInfo.area}
                onChange={(e) => handleInputChange(e, 'clientInfo', 'area')}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Atención</label>
              <input
                type="text"
                value={formData.clientInfo.atencion}
                onChange={(e) => handleInputChange(e, 'clientInfo', 'atencion')}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Quotation Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Detalles de la Cotización</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Validez de Oferta</label>
              <input
                type="text"
                value={formData.quotationDetails.validezOferta}
                onChange={(e) => handleInputChange(e, 'quotationDetails', 'validezOferta')}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Condición de Pago</label>
              <input
                type="text"
                value={formData.quotationDetails.condicionPago}
                onChange={(e) => handleInputChange(e, 'quotationDetails', 'condicionPago')}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Moneda</label>
              <select
                value={formData.quotationDetails.moneda}
                onChange={(e) => handleInputChange(e, 'quotationDetails', 'moneda')}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="soles">Soles</option>
                <option value="dolares">Dólares</option>
                <option value="euros">Euros</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Impuestos</label>
              <input
                type="text"
                value={formData.quotationDetails.impuestos}
                onChange={(e) => handleInputChange(e, 'quotationDetails', 'impuestos')}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Items */}
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
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 p-4 border rounded-lg">
                <div className="col-span-6 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Item</label>
                  <input
                    type="text"
                    value={item.item}
                    onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="col-span-6 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Cantidad</label>
                  <input
                    type="number"
                    value={item.cantidad}
                    onChange={(e) => handleItemChange(index, 'cantidad', Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="col-span-6 md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Descripción</label>
                  <input
                    type="text"
                    value={item.descripcion}
                    onChange={(e) => handleItemChange(index, 'descripcion', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="col-span-6 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Precio Unitario</label>
                  <input
                    type="number"
                    value={item.precioUnitario}
                    onChange={(e) => handleItemChange(index, 'precioUnitario', Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="col-span-5 md:col-span-1">
                  <label className="block text-sm font-medium mb-1">Precio Total</label>
                  <input
                    type="number"
                    value={item.precioTotal}
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

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {isEditing ? 'Actualizar' : 'Guardar'} Cotización
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuotationForm;