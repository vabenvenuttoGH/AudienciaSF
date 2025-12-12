const Audiencia = require('../models/Audiencia');

// Crear una nueva audiencia
exports.createAudiencia = async (req, res) => {
  try {
    const audiencia = new Audiencia(req.body);
    await audiencia.save();
    res.status(201).json({
      success: true,
      message: 'Audiencia creada exitosamente',
      data: audiencia,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Obtener todas las audiencias
exports.getAllAudiencias = async (req, res) => {
  try {
    const { fecha, sala, estado } = req.query;
    const filter = {};

    if (fecha) filter.fecha = new Date(fecha);
    if (sala) filter.sala = sala;
    if (estado) filter.estado = estado;

    const audiencias = await Audiencia.find(filter).sort({ fecha: 1 });
    res.status(200).json({
      success: true,
      count: audiencias.length,
      data: audiencias,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Obtener una audiencia por ID
exports.getAudienciaById = async (req, res) => {
  try {
    const audiencia = await Audiencia.findById(req.params.id);
    if (!audiencia) {
      return res.status(404).json({
        success: false,
        message: 'Audiencia no encontrada',
      });
    }
    res.status(200).json({
      success: true,
      data: audiencia,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Actualizar una audiencia
exports.updateAudiencia = async (req, res) => {
  try {
    const audiencia = await Audiencia.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!audiencia) {
      return res.status(404).json({
        success: false,
        message: 'Audiencia no encontrada',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Audiencia actualizada exitosamente',
      data: audiencia,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Eliminar una audiencia
exports.deleteAudiencia = async (req, res) => {
  try {
    const audiencia = await Audiencia.findByIdAndDelete(req.params.id);
    if (!audiencia) {
      return res.status(404).json({
        success: false,
        message: 'Audiencia no encontrada',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Audiencia eliminada exitosamente',
      data: audiencia,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
