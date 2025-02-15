import React, { useState, useEffect } from 'react';

const QuotationDetails = ({ onDetailsChange, initialData = {} }) => {
  const [details, setDetails] = useState({
    validezOferta: initialData.validezOferta || '',
    condicionPago: initialData.condicionPago || '',
    moneda: initialData.moneda || 'soles',
    impuestos: initialData.impuestos || '',
    saludo: initialData.saludo || 'Es grato saludarlo...'
  });

  // Actualizar el estado cuando cambian los datos iniciales
  useEffect(() => {
    setDetails({
      validezOferta: initialData.validezOferta || '',
      condicionPago: initialData.condicionPago || '',
      moneda: initialData.moneda || 'soles',
      impuestos: initialData.impuestos || '',
      saludo: initialData.saludo || 'Es grato saludarlo...'
    });
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedDetails = {
      ...details,
      [name]: value
    };
    setDetails(updatedDetails);
    onDetailsChange(updatedDetails);
  };

  return (
    <div className="font-Ubuntu bg-white p-4 rounded-lg shadow">
      {/* Bloque de términos generales */}
      <h2 className="text-lg font-medium mb-4">Términos Generales</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Validez de Oferta</label>
          <input
            type="text"
            name="validezOferta"
            value={details.validezOferta || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Condición de Pago</label>
          <input
            type="text"
            name="condicionPago"
            value={details.condicionPago || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Moneda</label>
          <select
            name="moneda"
            value={details.moneda || 'soles'}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="soles">Soles</option>
            <option value="dolares">Dólares</option>
           
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Impuestos</label>
          <input
            type="text"
            name="impuestos"
            value={details.impuestos || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default QuotationDetails;
