const express = require('express');
const router = express.Router();
const Quotation = require('../models/Quotation');

// Obtener cotización por número
router.get('/:number/:year', async (req, res) => {
  try {
    const quotation = await Quotation.findOne({
      'quotationNumber.number': req.params.number,
      'quotationNumber.year': req.params.year
    });
    
    if (!quotation) {
      return res.status(404).json({ message: 'Cotización no encontrada' });
    }
    
    res.json(quotation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear nueva cotización
router.post('/', async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    const savedQuotation = await quotation.save();
    res.status(201).json(savedQuotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar cotización
router.put('/:id', async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(quotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;