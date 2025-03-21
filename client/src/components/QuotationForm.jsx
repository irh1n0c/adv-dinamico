import { jsPDF } from "jspdf";
import React, { useState } from 'react';
import ClientInfo from './ClientInfo';
import QuotationDetails from './QuotationDetails';
import QuotationItems from './QuotationItems';
import QuotePrintTemplate from './print/QuotePrintTemplate';
import PrintQuoteButton from './print/PrintQuoteButton';
import './print/QuotePrintTemplate.css';


const QuotationForm = () => {
  const handlePrint = () => {//PARA IMPRMIR 
    window.print();
  };
  const [formData, setFormData] = useState({
    quotationNumber: {
      number: '',
      letter: '',
      year: new Date().getFullYear(),
    },
    clientInfo: {
      razonSocial: '',
      ruc: '',
      area: '',
      atencion: '',
      direccion: '' 
    },
    quotationDetails: {
      validezOferta: '',
      condicionPago: '',
      moneda: 'soles',
      impuestos: '',
      saludo: 'Es muy grato saludarlo.'
    },
    items: []
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleClientInfoChange = (clientInfo) => {
    setFormData(prev => ({ ...prev, clientInfo }));
  };

  const handleDetailsChange = (quotationDetails) => {
    setFormData(prev => ({ ...prev, quotationDetails }));
  };

  const handleItemsChange = (items) => {
    // Asegurarse de que las imágenes se mantengan al actualizar los items
    const updatedItems = items.map(item => ({
      ...item,
      images: item.images || [] // Mantener las imágenes existentes o inicializar array vacío
    }));
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const handleQuotationNumberChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (name === 'letter') {
      processedValue = value.toUpperCase().slice(0, 1);
    }

    setFormData(prev => ({
      ...prev,
      quotationNumber: {
        ...prev.quotationNumber,
        [name]: processedValue
      }
    }));
  };

  const searchQuotation = async () => {
    if (!formData.quotationNumber.number || !formData.quotationNumber.letter || !formData.quotationNumber.year) {
      alert('Por favor ingrese el número, letra y año de la cotización');
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/quotations/${formData.quotationNumber.number}/${formData.quotationNumber.letter}/${formData.quotationNumber.year}`
      );    
      if (!response.ok) {
        throw new Error('Cotización no encontrada');
      }

      const data = await response.json();
      
      if (data) {
        const formattedData = {
          ...data,
          quotationNumber: {
            number: data.quotationNumber?.number || '',
            letter: data.quotationNumber?.letter || '',
            year: data.quotationNumber?.year || new Date().getFullYear()
          },
          clientInfo: {
            razonSocial: data.clientInfo?.razonSocial || '',
            ruc: data.clientInfo?.ruc || '',
            area: data.clientInfo?.area || '',
            atencion: data.clientInfo?.atencion || '',
            direccion: data.clientInfo?.direccion || ''
          },
          quotationDetails: {
            validezOferta: data.quotationDetails?.validezOferta || '',
            condicionPago: data.quotationDetails?.condicionPago || '',
            moneda: data.quotationDetails?.moneda || 'soles',
            impuestos: data.quotationDetails?.impuestos || '',
            saludo: data.quotationDetails?.saludo || 'Es grato saludarlo...'
          },
          items: data.items?.map(item => ({
            ...item,
            images: item.images || [] // Asegurarse de incluir las imágenes
          })) || []
        };

        setFormData(formattedData);
        setIsEditing(true);
      }
    } catch (error) {
      alert(error.message);
      setFormData(prev => ({
        quotationNumber: {
          number: prev.quotationNumber.number,
          letter: prev.quotationNumber.letter,
          year: prev.quotationNumber.year
        },
        clientInfo: {
          razonSocial: '',
          ruc: '',
          area: '',
          atencion: '',
          direccion: ''
        },
        quotationDetails: {
          validezOferta: '',
          condicionPago: '',
          moneda: 'soles',
          impuestos: '',
          saludo: 'Es grato saludarlo...'
        },
        items: []
      }));
      setIsEditing(false);
    }
  };

  const validateForm = () => {
    if (!formData.quotationNumber.number || !formData.quotationNumber.letter || !formData.quotationNumber.year) {
      alert('Por favor complete el número, letra y año de la cotización');
      return false;
    }
    if (!formData.clientInfo.razonSocial || !formData.clientInfo.ruc) {
      alert('Por favor complete la información del cliente');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const url = isEditing
        ? `${import.meta.env.VITE_API_URL}/api/quotations/${formData._id}`
        : `${import.meta.env.VITE_API_URL}/api/quotations`;
      
      const method = isEditing ? 'PUT' : 'POST';

      const dataToSend = {
        ...formData,
        quotationNumber: {
          ...formData.quotationNumber,
          letter: formData.quotationNumber.letter.toUpperCase()
        },
        date: new Date().toISOString()
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Error en la operación');
      }

      const savedData = await response.json();
      
      if (response.ok) {
        alert(isEditing ? 'Cotización actualizada con éxito' : 'Cotización guardada con éxito');
        setFormData(savedData);
      }
    } catch (error) {
      alert('Error al guardar la cotización: ' + error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <br />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center justify-center">
          <img src="/images/logo-horizontal.png" alt="Logo fismet" className="h-24 object-cover" />
        </div>
        <div className="font-Ubuntu flex flex-col items-center justify-center">
        <div className=" text-center font-bold text-rose-900">Fismet Biomedica</div>
          <div className="text-center text-xs">
            Dirección Fiscal: Av. Lima N° 100 int. 507 edificio Nasya II Yanahuara , Arequipa (Ref: Comisaria de Yanahuara)
            <br />
            RUC: 20605699317
          </div>
          <div className="text-center text-[11px] bg-gradient-to-r from-blue-900 via-blue-600 to-red-700 bg-clip-text text-transparent">
            Correo: ventas@fismetbiomedica.com o metrologia@fismetbiomedica.com
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img src="" alt="" className="h-24 object-cover" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-end">
          <div className="w-full md:w-1/3 space-y-4">
            <div className="font-Ubuntu flex items-center">
              <label className="w-1/4 text-sm font-medium">Cotización N°</label>
              <div className="flex justify-end gap-2">
                <input
                  type="number"
                  name="number"
                  value={formData.quotationNumber.number}
                  onChange={handleQuotationNumberChange}
                  className="w-1/3 px-3 py-2 border rounded-md"
                  placeholder="000"
                  required
                />
                <input
                  type="text"
                  name="letter"
                  value={formData.quotationNumber.letter}
                  onChange={handleQuotationNumberChange}
                  className="w-1/5 px-3 py-2 border rounded-md uppercase"
                  maxLength="1"
                  placeholder="A"
                  required
                />
                <input
                  type="number"
                  name="year"
                  value={formData.quotationNumber.year}
                  onChange={handleQuotationNumberChange}
                  className="w-1/3 px-2 py-2 border rounded-md"
                  placeholder="2025"
                  required
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
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-1/2">
            <ClientInfo 
              onClientInfoChange={handleClientInfoChange}
              initialData={formData.clientInfo}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <QuotationDetails 
              onDetailsChange={handleDetailsChange}
              initialData={formData.quotationDetails}
            />
          </div>
        </div>
        <div className="font-Ubuntu bg-white p-4 rounded-lg shadow w-full md:w-1/1 mx-auto">
          <label className="block text-sm font-medium mb-1">Saludo</label>
          <textarea
            type="text"
            value={formData.quotationDetails.saludo}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quotationDetails: {
                  ...prev.quotationDetails,
                  saludo: e.target.value,
                },
              }))
            }
            className="w-full px-0 py-2 pl-2 border rounded-md" /* Agregar pl-2 aquí */
          />
        </div>
        <QuotationItems 
          onItemsChange={handleItemsChange}
          initialItems={formData.items}/>
        <div className="flex flex-col items-center w-full gap-4">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            {isEditing ? 'Actualizar' : 'Guardar'} Cotización
          </button>
          {/* COD para imprmir en el navegador */}
          <div>
            <PrintQuoteButton quoteData={formData} />
            <div className="hidden print:block">
              <QuotePrintTemplate quoteData={formData} />
            </div>
          </div>
        </div>
        <br />
        </form>
      </div>
    );
  };
  
  export default QuotationForm;