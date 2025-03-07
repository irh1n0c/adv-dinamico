require('dotenv').config();
console.log('Verificación MONGO_URI:', process.env.MONGODB_URI);
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const quotationRoutes = require('./routes/quotations');
const path = require('path'); 
const app = express();

app.use(cors({
  origin: ['https://fismetventas.up.railway.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json());

// Conectar a MongoDB (mover esto antes de las rutas)
try {
  connectDB();
} catch (error) {
  console.error('Error al conectar con la base de datos:', error);
}

// Rutas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/quotations', quotationRoutes);

// Manejo de errores para archivos estáticos
app.use('/uploads', (err, req, res, next) => {
  if (err) {
    console.error('Error serving static file:', err);
    return res.status(404).json({ message: 'Imagen no encontrada' });
  }
  next();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});