// backend/src/controllers/authController.js
const User = require('../models/User'); // Asume que el modelo User.js está en /models

// @route   POST /api/register
// @desc    Registrar un nuevo usuario
// @access  Public
exports.registerUser = async (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ success: false, message: 'Por favor, complete todos los campos.' });
    }

    try {
        // 1. Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({ success: false, message: 'Ya existe un usuario con este correo electrónico.' });
        }

        // 2. Crear el nuevo usuario (el middleware se encarga de hashear la contraseña)
        const user = await User.create({
            nombre,
            apellido,
            email,
            password,
        });

        if (user) {
            // 3. Respuesta exitosa (podrías generar un token aquí si fuera Login)
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente.',
                _id: user._id,
                nombre: user.nombre,
                email: user.email,
            });
        } else {
            res.status(400).json({ success: false, message: 'Datos de usuario inválidos.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
};