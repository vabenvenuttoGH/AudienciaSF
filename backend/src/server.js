require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const audienciaRoutes = require('./routes/audienciaRoutes');

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/audiencias', audienciaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'Servidor de Gestión de Audiencias - Poder Judicial Santa Fe',
    version: '1.0.0',
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
