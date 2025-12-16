// backend/src/controllers/authController.js
const User = require('../models/User'); 

// @route   POST /api/register
// @desc    Registrar un nuevo usuario
// @access  Public
exports.registerUser = async (req, res) => {
    // CORRECCIÓN CLAVE 1: Extraer jurisdiccion del body
    const { nombre, apellido, email, password, jurisdiccion } = req.body; 

    // CORRECCIÓN CLAVE 2: Validar que la jurisdiccion exista
    if (!nombre || !apellido || !email || !password || !jurisdiccion) { 
        return res.status(400).json({ success: false, message: 'Por favor, complete todos los campos.' });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({ success: false, message: 'Ya existe un usuario con este correo electrónico.' });
        }

        const user = await User.create({
            nombre,
            apellido,
            email,
            password,
            jurisdiccion, // <-- CORRECCIÓN CLAVE 3: Pasar jurisdiccion a Mongoose
        });

        if (user) {
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
        res.status(500).json({ success: false, message: 'Error interno del servidor. (Verificar la base de datos)' });
    }
};


// @route   POST /api/login 
// @desc    Autenticar usuario y obtener datos
// @access  Public
exports.authUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Por favor, ingrese email y contraseña.' });
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // Login exitoso
            res.json({
                success: true,
                message: 'Inicio de sesión exitoso.',
                _id: user._id,
                nombre: user.nombre,
                email: user.email,
            });
        } else {
            // Credenciales incorrectas
            res.status(401).json({ success: false, message: 'Credenciales inválidas (usuario o contraseña incorrectos).' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
};