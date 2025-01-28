import React from 'react';
import { API_CONFIG } from "../../config/api";

const QuotePrintTemplate = ({ quoteData = {} }) => {
  const {
    quotationNumber,
    clientInfo,
    quotationDetails,
    items = [],
  } = quoteData;

  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.precioTotal) || 0), 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  return (
    <div className="print-container p-8 max-w-4xl mx-auto bg-white">
      {/* Header section remains the same */}
      <header className="mb-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center justify-center">
            <img src="/images/logo-horizontal.png" alt="Logo ADV" className="h-24 object-cover" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="company-info text-center">
              <h1 className="text-xl font-bold mb-2">GRUPO ADV SAC.</h1>
              <p className="text-xs">RUC 20605967729</p>
              <p className="text-xs">Dirección Fiscal: Mza. H Lote 5 P.J. El Triunfo Zn. A – La Joya-Arequipa</p>
              <p className="text-xs">Almacén: Cal. Rodriguez Ballón 711- Miraflores-Arequipa</p>
              <p className="text-xs text-blue-500">Email: ventas@grupo-adv.com</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img src="/images/LOGO-INACAL-ok.png" alt="ISO Logo" className="h-24 object-cover" />
          </div>
        </div>
        <div className="text-right mt-4">
          <h2 className="text-lg font-bold">
            Cotización N° {quotationNumber?.number}{quotationNumber?.letter}-{quotationNumber?.year}
          </h2>
        </div>
      </header>

      {/* Client Info and Terms sections */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <section className="border p-4">
          <h3 className="text-lg font-semibold mb-2">DATOS DEL CLIENTE</h3>
          <div className="space-y-2">
            <p className="text-sm"><strong>Razón Social:</strong> {clientInfo?.razonSocial}</p>
            <p className="text-sm"><strong>RUC:</strong> {clientInfo?.ruc}</p>
            <p className="text-sm"><strong>Área:</strong> {clientInfo?.area}</p>
            <p className="text-sm"><strong>Atención:</strong> {clientInfo?.atencion}</p>
          </div>
        </section>

        <section className="border p-4">
          <h3 className="text-lg font-semibold mb-2">TÉRMINOS GENERALES</h3>
          <div className="space-y-2">
            <p className="text-sm"><strong>Validez de Oferta:</strong> {quotationDetails?.validezOferta}</p>
            <p className="text-sm"><strong>Condición de Pago:</strong> {quotationDetails?.condicionPago}</p>
            <p className="text-sm"><strong>Moneda:</strong> {quotationDetails?.moneda}</p>
            <p className="text-sm"><strong>Impuestos:</strong> INCLUYE EL 18% DEL IGV</p>
          </div>
        </section>
      </div>

      {/* Greeting */}
      <section className="mb-8">
        <p className="text-sm">Es grato saludarlo (a) y hacerle llegar la cotización solicitada:</p>
      </section>

      {/* Items with detailed description */}
      <section className="items mb-8">
        {items.map((item, index) => (
          <div key={index} className="mb-8 border-b pb-4">
            <div className="grid grid-cols-5 gap-4 bg-gray-50 p-2">
              <div className="font-bold">ITEM</div>
              <div className="font-bold">CANTIDAD</div>
              <div className="font-bold">DESCRIPCIÓN</div>
              <div className="font-bold text-right">P. UNIT.</div>
              <div className="font-bold text-right">P. TOTAL</div>
            </div>
            <div className="grid grid-cols-5 gap-4 p-2">
              <div>{index + 1}</div>
              <div>{item.cantidad}</div>
              <div className="col-span-3">
                <div className="font-bold mb-2">{item.descripcion}</div>
                {item.images && item.images.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {item.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={API_CONFIG.getImageUrl(image.url)}
                        alt={`Producto ${index + 1}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
                <div className="text-sm mt-2">
                  {item.aplicaciones && <div><strong>APLICACIONES:</strong><br/>{item.aplicaciones}</div>}
                  {item.caracteristicas && (
                    <div className="mt-2">
                      <strong>CARACTERÍSTICAS GENERALES:</strong><br/>
                      {item.caracteristicas}
                    </div>
                  )}
                  {item.datosTecnicos && (
                    <div className="mt-2">
                      <strong>DATOS TÉCNICOS:</strong><br/>
                      {item.datosTecnicos}
                    </div>
                  )}
                  {item.accesorios && (
                    <div className="mt-2">
                      <strong>ACCESORIOS ESTÁNDAR:</strong><br/>
                      {item.accesorios}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">{parseFloat(item.precioUnitario).toFixed(2)}</div>
              <div className="text-right">{parseFloat(item.precioTotal).toFixed(2)}</div>
            </div>
          </div>
        ))}

        {/* Totals */}
        <div className="mt-4 flex flex-col items-end">
          <div className="w-48 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>IGV (18%):</span>
              <span>{igv.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 text-sm space-y-4">
        <div className="border-t pt-4">
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