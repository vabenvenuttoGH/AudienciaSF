// frontend-react/src/pages/Login/Login.jsx (CÓDIGO COMPLETO FUNCIONAL)
import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import "./Login.css";


export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    jurisdiccion: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        // Enviar datos al endpoint de Login
        const response = await fetch('http://localhost:5000/api/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // LOGIN EXITOSO: Redirigir al Dashboard (ruta '/')
            alert('Inicio de sesión exitoso. Redirigiendo al Dashboard.'); 
            navigate('/'); 
        } else {
            // Error de credenciales, etc.
            setError(data.message || 'Error al iniciar sesión. Inténtelo de nuevo.');
        }
    } catch (err) {
        console.error('Error de conexión:', err);
        setError('No se pudo conectar con el servidor.');
    } finally {
        setLoading(false);
    }
  };


  return (
    <div className="login-container">
      {/* ... (Header estático) ... */}
      <div className="header">
        <h1>Poder Judicial de Santa Fe</h1>
        <h3 className="subtitle">Sistema de Gestión de Audiencias</h3>
        <p className="subtext">
          Acceso exclusivo para personal autorizado del sistema judicial
        </p>
      </div>

      <div className="login-card">
        <button className="back-btn">← Volver</button>
        <h2>Acceso Seguro</h2>
        <p className="instruction">
          Ingrese sus credenciales institucionales
        </p>

        <div className="alert">
          ⚠️ Este sistema es de uso exclusivo del personal del Poder Judicial.
          El acceso no autorizado está penado por ley.
        </div>
        
        {/* Mostrar mensaje de error */}
        {error && <div className="alert error-alert">{error}</div>} 

        {/* Formulario que usa el handler handleSubmit */}
        <form onSubmit={handleSubmit}> 
          
          <div className="form-group">
            <label>Usuario (Correo Electrónico)</label>
            <input
              type="email"
              name="email" // <-- Nombre para el formData
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingrese su correo institucional"
              className="input"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password" // <-- Nombre para el formData
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label>Jurisdicción</label>
            <select 
                name="jurisdiccion"
                value={formData.jurisdiccion}
                onChange={handleChange}
                className="input"
                required
            >
              <option value="">Seleccionar jurisdicción</option>
              <option value="santafe">Santa Fe</option>
              <option value="rosario">Rosario</option>
            </select>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Verificando...' : 'Iniciar sesión'}
          </button>
          
          {/* Enlace al Registro */}
          <div className="register-link-container">
              <p>¿Aún no tienes cuenta institucional?
                  <Link to="/register" className="register-link">
                      Regístrate aquí
                  </Link>
              </p>
          </div>
        </form>
      </div>
    </div>
  );
}