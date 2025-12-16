// frontend-react/src/pages/Register/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"; // Importar CSS específico

export default function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    // Función para manejar el cambio en los inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            setLoading(false);
            return;
        }

        try {
            // Asume que tu backend está corriendo en el puerto 5000 (por defecto en server.js)
            const response = await fetch('http://localhost:5000/api/register', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Registro exitoso
                alert('¡Registro exitoso! Por favor, inicia sesión.');
                navigate('/login'); // Redirige al Login
            } else {
                // Manejo de errores (ej: email duplicado)
                setError(data.message || 'Error en el registro. Verifique sus datos.');
            }
        } catch (err) {
            console.error('Error de conexión:', err);
            setError('No se pudo conectar con el servidor. Asegúrese de que el backend esté corriendo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="header">
                {/* Puedes usar el mismo logo o uno nuevo */}
                <img
                    src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                    alt="Logo Justicia"
                    className="logo"
                />
                <h1>Poder Judicial de Santa Fe</h1>
                <h3 className="subtitle">Sistema de Gestión de Audiencias</h3>
            </div>

            <div className="register-card">
                <h2>Crear una Cuenta</h2>
                <p className="instruction">
                    Acceso para personal público y autorizado
                </p>

                {/* Mensaje de Error */}
                {error && <div className="alert error-alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Su nombre"
                            className="input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Apellido</label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            placeholder="Su apellido"
                            className="input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ejemplo@justiciasantafe.gov.ar"
                            className="input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Mínimo 8 caracteres"
                            className="input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Repita la contraseña"
                            className="input"
                            required
                        />
                    </div>

                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrar Cuenta'}
                    </button>
                </form>

                <p className="register-link-text">
                    ¿Ya tienes una cuenta? <Link to="/login" className="login-link">Iniciar Sesión</Link>
                </p>
            </div>
        </div>
    );
}