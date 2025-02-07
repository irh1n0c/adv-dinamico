const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  quotationNumber: {
    number: { type: String, required: true },
    letter: { type: String, required: true, match: /^[A-Z]$/ },
    year: { type: Number, required: true }
  },
  date: { type: Date, default: Date.now },
  clientInfo: {
    razonSocial: { type: String, required: true },
    ruc: { type: String, required: true },
    area: String,
    atencion: String,
    direccion: String
  },
  quotationDetails: {
    validezOferta: String,
    condicionPago: String,
    moneda: {
      type: String,
      enum: ['soles', 'dolares'],
      default: 'soles'
    },
    impuestos: String,
    saludo: { type: String, default: 'Es grato saludarlo...' }
  },
  items: [{
    item: String,
    cantidad: String,
    descripcion: String,
    images: [{
      url: { type: String, required: true },
      caption: { type: String },
      order: { type: Number, default: 0 }
    }],
    entrega: String,
    precioUnitario: Number,
    precioTotal: Number
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

quotationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Quotation', quotationSchema);