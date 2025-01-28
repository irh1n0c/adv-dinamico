const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
//const fs = require('fs').promises;
const Quotation = require('../models/Quotation');

// Configuración de multer para almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // límite de 5MB
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png)'));
  }
});

// Ruta para subir imágenes
router.post('/uploads', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha proporcionado ninguna imagen' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({
      url: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ 
      message: 'Error al subir la imagen', 
      error: error.message 
    });
  }
});

// Eliminar imagen
// Modificar la ruta DELETE en quotations.js
router.delete('/uploads/:filename', async (req, res) => {
  try {
    const filepath = path.join(__dirname, '../uploads', req.params.filename);
    
    // Verificar si el archivo existe antes de intentar eliminarlo
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ 
        message: `El archivo ${req.params.filename} no existe` 
      });
    }

    await fs.promises.unlink(filepath);
    res.json({ message: 'Imagen eliminada con éxito' });
  } catch (error) {
    console.error('Error detallado al eliminar imagen:', error);
    res.status(500).json({ 
      message: 'Error al eliminar la imagen',
      details: error.message,
      path: req.params.filename
    });
  }
});

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