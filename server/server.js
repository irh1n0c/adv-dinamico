require('dotenv').config();
console.log('Verificación MONGO_URI:', process.env.MONGODB_URI);

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const quotationRoutes = require('./routes/quotations');

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/quotations', quotationRoutes);
// En tu app.js o index.js
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});