const express = require('express');
const router = express.Router();
const Quotation = require('../models/Quotation');

// Obtener cotización por número, letra y año
router.get('/:number/:letter/:year', async (req, res) => {
  try {
    const { number, letter, year } = req.params;
    
    if (!number || !letter || !year) {
      return res.status(400).json({ 
        message: 'Se requieren número, letra y año de la cotización' 
      });
    }

    const quotation = await Quotation.findOne({
      'quotationNumber.number': number,
      'quotationNumber.letter': letter.toUpperCase(),
      'quotationNumber.year': year
    });
    
    if (!quotation) {
      return res.status(404).json({ 
        message: `Cotización ${number}${letter}-${year} no encontrada` 
      });
    }
    
    res.json(quotation);
  } catch (error) {
    console.error('Error al buscar cotización:', error);
    res.status(500).json({ 
      message: 'Error al buscar la cotización', 
      error: error.message 
    });
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
    
    if (!quotation) {
      return res.status(404).json({ 
        message: 'Cotización no encontrada para actualizar' 
      });
    }
    
    res.json(quotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;