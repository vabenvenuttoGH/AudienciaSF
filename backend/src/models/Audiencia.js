const mongoose = require('mongoose');

const audienciaSchema = new mongoose.Schema(
  {
    fecha: {
      type: Date,
      required: [true, 'La fecha es obligatoria'],
    },
    hora: {
      type: String,
      required: [true, 'La hora es obligatoria'],
      match: [/^\d{2}:\d{2}$/, 'Formato de hora debe ser HH:mm'],
    },
    causa: {
      type: String,
      required: [true, 'La causa es obligatoria'],
      trim: true,
    },
    expediente: {
      type: String,
      required: [true, 'El expediente es obligatorio'],
      unique: true,
      trim: true,
    },
    sala: {
      type: String,
      required: [true, 'La sala es obligatoria'],
      trim: true,
    },
    demandante: {
      type: String,
      trim: true,
    },
    demandado: {
      type: String,
      trim: true,
    },
    juez: {
      type: String,
      trim: true,
    },
    estado: {
      type: String,
      enum: ['Programada', 'En Curso', 'Realizada', 'Suspendida', 'Cancelada'],
      default: 'Programada',
    },
    observaciones: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Índice para búsquedas rápidas
audienciaSchema.index({ fecha: 1, sala: 1 });
audienciaSchema.index({ expediente: 1 });

module.exports = mongoose.model('Audiencia', audienciaSchema);
