// backend/src/routes/authRoutes.js

const express = require('express');
// CORRECCIÓN CLAVE: Importar authUser junto a registerUser
const { registerUser, authUser } = require('../controllers/authController'); 

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser); // Ahora authUser está definido

module.exports = router;