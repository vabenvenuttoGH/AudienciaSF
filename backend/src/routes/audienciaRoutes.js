const express = require('express');
const router = express.Router();
const {
  createAudiencia,
  getAllAudiencias,
  getAudienciaById,
  updateAudiencia,
  deleteAudiencia,
} = require('../controllers/audienciaController');

// Rutas CRUD
router.post('/', createAudiencia);           // POST /api/audiencias - Crear
router.get('/', getAllAudiencias);           // GET /api/audiencias - Obtener todas
router.get('/:id', getAudienciaById);        // GET /api/audiencias/:id - Obtener una
router.put('/:id', updateAudiencia);         // PUT /api/audiencias/:id - Actualizar
router.delete('/:id', deleteAudiencia);      // DELETE /api/audiencias/:id - Eliminar

module.exports = router;
