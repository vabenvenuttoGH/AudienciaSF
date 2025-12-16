const mongoose = require('mongoose');

const salaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la sala es obligatorio'],
      unique: true,
      trim: true,
    },
    capacidad: {
      type: Number,
      required: [true, 'La capacidad es obligatoria'],
      min: [1, 'La capacidad debe ser al menos 1 persona'],
    },
    ubicacion: {
      type: String, // Ej: "Planta Baja", "Piso 1"
      trim: true,
    },
    equipamiento: {
      type: String, // Ej: "Proyector, Videoconferencia, Microfonos"
      trim: true,
    },
    estado: {
      type: String,
      enum: ['Disponible', 'Mantenimiento', 'Ocupada'],
      default: 'Disponible',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Sala', salaSchema);