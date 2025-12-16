const express = require('express');
const router = express.Router();
const {
  createSala,
  getAllSalas,
  getSalaById,
  updateSala,
  deleteSala,
} = require('../controllers/salaController');

router.post('/', createSala);
router.get('/', getAllSalas);
router.get('/:id', getSalaById);
router.put('/:id', updateSala);
router.delete('/:id', deleteSala);

module.exports = router;