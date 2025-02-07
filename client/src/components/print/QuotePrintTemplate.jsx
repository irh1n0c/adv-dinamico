import React from 'react';
import { API_CONFIG } from "../../config/api";

const QuotePrintTemplate = ({ quoteData = {} }) => {
  const {
    saludo,
    quotationNumber,
    clientInfo,
    quotationDetails,
    items = [],
  } = quoteData;

  return (
    <div className="print-container p-4 max-w-4xl mx-auto bg-white">
      {/* Header section */}
      <header className="mb-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center justify-center">
            <img src="/images/logo-horizontal.png" alt="Logo ADV" className="h-20 object-cover" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="ubiquitous-font company-info text-center">
              <h1 className="text-center font-bold text-rose-900">Fismet Biomedica</h1>
              <p className="text-xs">RUC: 20605699317</p>
              <p className="text-xs">Dirección Fiscal: Av. Lima N° 100 int. 507 edificio Nasya II Yanahuara , Arequipa (Ref: Comisaria de Yanahuara)</p>
              <p className="text-center text-[11px]  text-blue-900">Correo: ventas@fismetbiomedica.com o metrologia@fismetbiomedica.com</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img src="/images/LOGO-INACAL-ok.png" alt="ISO Logo" className="h-20 object-cover" />
          </div>
        </div>
        <div className="text-right mt-2">
          <h2 className="text-lg font-bold">
            Cotización N° {quotationNumber?.number}{quotationNumber?.letter}-{quotationNumber?.year}
          </h2>
        </div>
      </header>

      {/* Client Info and Terms sections */}
      <div className="ubiquitous-font grid grid-cols-2 gap-4 mb-4">
        <section className="bordes terms-section border p-3">
          <h3 className="bold-line text-lg  mb-2 text-center">DATOS DEL CLIENTE</h3>
          <div className="space-y-1">
            <p className="text-sm"><strong>Razón Social:</strong> {clientInfo?.razonSocial}</p>
            <p className="text-sm"><strong>RUC:</strong> {clientInfo?.ruc}</p>
            <p className="text-sm"><strong>Área:</strong> {clientInfo?.area}</p>
            <p className="text-sm"><strong>Atención:</strong> {clientInfo?.atencion}</p>
            <p className="text-sm"><strong>Dirección:</strong> {clientInfo?.direccion}</p>
          </div>
        </section>

        <section className="bordes p-3">
          <h3 className="bold-line text-lg mb-2 text-center">TÉRMINOS GENERALES</h3>
          <div className="space-y-1">
            <p className="text-sm"><strong>Validez de Oferta:</strong> {quotationDetails?.validezOferta}</p>
            <p className="text-sm"><strong>Condición de Pago:</strong> {quotationDetails?.condicionPago}</p>
            <p className="text-sm"><strong>Moneda:</strong> {quotationDetails?.moneda}</p>
            <p className="text-sm"><strong>Impuestos:</strong> {quotationDetails?.impuestos}</p>
          </div>
        </section>
      </div>
      <div className=" ubiquitous-font bold-line">
        <p className="ml-4">{quoteData.quotationDetails.saludo}</p>
      </div>
      <br />
      {/* Items with detailed description */}
      <section className="items">
        {items.map((item, index) => (
          <div key={index} className="ubiquitous-font mb-4 border-b pb-2">
            <div className="grid grid-cols-12 gap-2 p-2 print-bg-blue">
              <div className="col-span-1 font-bold text-sm">ITEM</div>
              <div className="col-span-1 font-bold text-sm">CANT.</div>
              <div className="col-span-6 font-bold text-sm">DESCRIPCIÓN</div>
              <div className="col-span-2 font-bold text-sm text-right">P. UNIT.</div>
              <div className="col-span-2 font-bold text-sm text-right">P. TOTAL</div>
            </div>
            <div className="grid grid-cols-12 gap-2 p-2">
              <div className="col-span-1 text-sm">{index + 1}</div>
              <div className="col-span-1 text-sm">{item.cantidad}</div>
              <div className="col-span-6">
                <div className="text-sm whitespace-pre-line">{item.descripcion}</div>
                {item.images && item.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {item.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={API_CONFIG.getImageUrl(image.url)}
                      alt={`Producto ${index + 1}`}
                      className="w-full h-40 object-cover rounded"
                    />
                  ))}
                </div>
                
                )}
              </div>
              <div className="col-span-2 text-sm text-right">{parseFloat(item.precioUnitario).toFixed(2)}</div>
              <div className="col-span-2 text-sm text-right">{parseFloat(item.precioTotal).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-4 text-sm space-y-2">
        <div className="ubiquitous-font border-t pt-2">
          <h4 className="font-bold mb-2">CONDICIONES DE VENTA</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Garantía: 12 meses por defecto de fabricación, no incluye accesorios ni suministros</li>
            <li>Contamos con servicio de post venta inmediata</li>
            <li>No se aceptan devoluciones que no sean por defectos de fábrica</li>
            <li>Consultar stock antes de emitir la orden de compra</li>
          </ul>
        </div>
        <div className="text-center text-gray-500">
          <p>Gracias por su preferencia</p>
        </div>
      </footer>
    </div>
  );
};

export default QuotePrintTemplate;