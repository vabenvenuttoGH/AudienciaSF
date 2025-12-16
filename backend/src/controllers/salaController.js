const Sala = require('../models/Sala');

// Crear Sala
exports.createSala = async (req, res) => {
  try {
    const sala = new Sala(req.body);
    await sala.save();
    res.status(201).json({ success: true, data: sala });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Obtener todas las salas
exports.getAllSalas = async (req, res) => {
  try {
    const salas = await Sala.find().sort({ nombre: 1 });
    res.status(200).json({ success: true, data: salas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener una sala por ID
exports.getSalaById = async (req, res) => {
  try {
    const sala = await Sala.findById(req.params.id);
    if (!sala) return res.status(404).json({ success: false, message: 'Sala no encontrada' });
    res.status(200).json({ success: true, data: sala });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Actualizar sala
exports.updateSala = async (req, res) => {
  try {
    const sala = await Sala.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!sala) return res.status(404).json({ success: false, message: 'Sala no encontrada' });
    res.status(200).json({ success: true, data: sala });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Eliminar sala
exports.deleteSala = async (req, res) => {
  try {
    const sala = await Sala.findByIdAndDelete(req.params.id);
    if (!sala) return res.status(404).json({ success: false, message: 'Sala no encontrada' });
    res.status(200).json({ success: true, message: 'Sala eliminada' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};