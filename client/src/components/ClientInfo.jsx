import React, { useState, useEffect } from 'react';

const ClientInfo = ({ onClientInfoChange, initialData = {} }) => {
  const [clientInfo, setClientInfo] = useState({
    razonSocial: initialData.razonSocial || '',
    ruc: initialData.ruc || '',
    area: initialData.area || '',
    atencion: initialData.atencion || '',
    direccion: initialData.direccion || '' // New field added
  });

  // Update state when initial data changes
  useEffect(() => {
    setClientInfo({
      razonSocial: initialData.razonSocial || '',
      ruc: initialData.ruc || '',
      area: initialData.area || '',
      atencion: initialData.atencion || '',
      direccion: initialData.direccion || '' // New field added
    });
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedInfo = { ...clientInfo, [name]: value };
    setClientInfo(updatedInfo);
    onClientInfoChange(updatedInfo);
  };

  return (
    <div className="font-Ubuntu bg-white p-4 rounded-lg shadow">
      <h2 className="font-medium text-lg mb-4">Datos del Cliente</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Razón Social</label>
          <input 
            type="text" 
            name="razonSocial" 
            value={clientInfo.razonSocial || ''} 
            onChange={handleInputChange} 
            className="w-full px-3 py-1 border rounded-md" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">RUC</label>
          <input 
            type="text" 
            name="ruc" 
            value={clientInfo.ruc || ''} 
            onChange={handleInputChange} 
            className="w-full px-3 py-1 border rounded-md" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Área</label>
          <input 
            type="text" 
            name="area" 
            value={clientInfo.area || ''} 
            onChange={handleInputChange} 
            className="w-full px-3 py-1 border rounded-md" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Atención</label>
          <input 
            type="text" 
            name="atencion" 
            value={clientInfo.atencion || ''} 
            onChange={handleInputChange} 
            className="w-full px-3 py-1 border rounded-md" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dirección</label>
          <input 
            type="text" 
            name="direccion" 
            value={clientInfo.direccion || ''} 
            onChange={handleInputChange} 
            className="w-full px-3 py-1 border rounded-md" 
          />
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;