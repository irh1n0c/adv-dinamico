require('dotenv').config();
console.log('Verificación MONGO_URI:', process.env.MONGODB_URI);
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const quotationRoutes = require('./routes/quotations');
const path = require('path'); 

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors('*'));
//app.use(cors({ origin: "https://tu-frontend.com" })); PARA MAYOR SEGURIDAD
app.use(express.json());

// Rutas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/quotations', quotationRoutes);
// En tu app.js o index.js
//app.use('/uploads', express.static('uploads'));

app.use('/uploads', (err, req, res, next) => {
  if (err) {
    console.error('Error serving static file:', err);
    return res.status(404).json({ message: 'Imagen no encontrada' });
  }
  next();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

