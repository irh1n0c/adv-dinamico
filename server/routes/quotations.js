const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Quotation = require('../models/Quotation');

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuración de multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: 'uploads',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      public_id: (req, file) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return file.fieldname + '-' + uniqueSuffix;
      }
    };
  },
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // límite de 5MB
  }
});

// Ruta para subir imágenes
router.post('/uploads', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha proporcionado ninguna imagen' });
    }

    // Usa el resultado de Cloudinary para obtener la URL y public_id
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'uploads', // Carpeta en Cloudinary
      resource_type: 'image',
      use_filename: true // Mantiene el nombre original del archivo
    });

    res.json({
      url: result.secure_url, 
      public_id: result.public_id // public_id de Cloudinary
    });
  } catch (error) {
    console.error('Error al subir imagen:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Error al subir la imagen', 
      error: error.message 
    });
  }
});

router.delete('/uploads/:filename(*)', async (req, res) => {
  try {
    // Extrae solo el nombre del archivo, sin la carpeta
    const filename = req.params.filename;
    const publicId = `uploads/${filename}`; // Ahora el publicId incluye la carpeta correctamente

    console.log('Intentando eliminar:', publicId);

    const result = await cloudinary.uploader.destroy(publicId, {
      type: 'upload', // Especifica que es un recurso de tipo carga
      resource_type: 'image' // Especifica que es un recurso de imagen
    });
    
    if (result.result === 'ok') {
      res.json({ message: 'Imagen eliminada con éxito' });
    } else {
      res.status(404).json({ 
        message: `No se pudo eliminar la imagen ${publicId}` 
      });
    }
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    res.status(500).json({ 
      message: 'Error al eliminar la imagen',
      details: error.message
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