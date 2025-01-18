import React, { useState, useEffect } from "react";
import axios from "axios";

const QuotationForm = () => {
  const [formData, setFormData] = useState({
    quotationNumber: {
      number: "",
      year: new Date().getFullYear(),
    },
    clientInfo: {
      razonSocial: "",
      ruc: "",
      area: "",
      atencion: "",
    },
    quotationDetails: {
      validezOferta: "",
      condicionPago: "",
      moneda: "soles",
      impuestos: "",
      saludo: "Es grato saludarlo...",
    },
    items: [],
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e, section, field) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field || name]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const searchQuotation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/quotations/${formData.quotationNumber.number}/${formData.quotationNumber.year}`
      );

      if (response.data) {
        setFormData(response.data);
        setIsEditing(true);
      } else {
        alert("Cotización no encontrada");
      }
    } catch (error) {
      alert("Error al buscar la cotización");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:5000/api/quotations/${formData._id}`,
          formData
        );
        alert("Cotización actualizada con éxito");
      } else {
        await axios.post("http://localhost:5000/api/quotations", formData);
        alert("Cotización guardada con éxito");
      }
    } catch (error) {
      alert("Error al guardar la cotización");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center justify-center">
          <img
            src="/images/logo_adv.jpg"
            alt="Logo ADV"
            className="h-24 object-cover"
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="text-center font-bold">GRUPO ADV SAC.</div>
          <div className="text-center text-xs">
            Dirección Fiscal: Mza. H Lote 5 P.J. El Triunfo Zn. A – La
            Joya-Arequipa
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

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Número de cotización y búsqueda */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/3 space-y-4">
            <div className="flex items-center">
              <label className="w-1/4 text-sm font-medium">Cotización N°</label>
              <div className="w-1/2 flex gap-2">
                <input
                  type="number"
                  value={formData.quotationNumber.number}
                  onChange={(e) => handleInputChange(e, "quotationNumber", "number")}
                  className="w-1/2 px-3 py-2 border rounded-md"
                  placeholder="000"
                />
                <input
                  type="number"
                  value={formData.quotationNumber.year}
                  onChange={(e) => handleInputChange(e, "quotationNumber", "year")}
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

        {/* Información del cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-1/6 text-sm font-medium">Razón Social</label>
              <input
                type="text"
                name="razonSocial"
                value={formData.clientInfo.razonSocial}
                onChange={(e) => handleInputChange(e, "clientInfo", "razonSocial")}
                className="w-2/3 px-3 py-2 border rounded-md"
                placeholder="Ingrese Razón Social"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/6 text-sm font-medium">RUC</label>
              <input
                type="text"
                name="ruc"
                value={formData.clientInfo.ruc}
                onChange={(e) => handleInputChange(e, "clientInfo", "ruc")}
                className="w-2/3 px-3 py-2 border rounded-md"
                placeholder="Ingrese RUC"
              />
            </div>
            {/* Otros campos */}
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-1/6 text-sm font-medium">Validez</label>
              <input
                type="text"
                name="validezOferta"
                value={formData.quotationDetails.validezOferta}
                onChange={(e) =>
                  handleInputChange(e, "quotationDetails", "validezOferta")
                }
                className="w-2/3 px-3 py-2 border rounded-md"
                placeholder="Ingrese validez de oferta"
              />
            </div>
            {/* Otros campos */}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {isEditing ? "Actualizar" : "Guardar"} Cotización
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuotationForm;
