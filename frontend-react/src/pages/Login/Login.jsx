// frontend-react/src/pages/Login/Login.jsx
import React from "react";
import { Link } from "react-router-dom"; 
import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Logo Justicia"
          className="logo"
        />
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

        <form>
          {/* ... (campos de formulario) ... */}

          {/* --- CAMPO USUARIO/EMAIL --- */}
          <div className="form-group">
            <label>Usuario </label>
            <input
              type="email"
              placeholder="Ingrese su correo institucional"
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              className="input"
            />
          </div>

          <div className="form-group">
            <label>Jurisdicción</label>
            <select className="input">
              <option value="">Seleccionar jurisdicción</option>
              <option value="santafe">Santa Fe</option>
              <option value="rosario">Rosario</option>
            </select>
          </div>

          <button type="submit" className="btn">
            Iniciar sesión
          </button>
          
          {/* --- AÑADIR EL ENLACE DE REGISTRO AQUÍ --- */}
          <div className="register-link-container">
              <p>¿Aún no tienes cuenta institucional?
                  <Link to="/register" className="register-link">
                      Regístrate aquí
                  </Link>
              </p>
          </div>
          {/* ----------------------------------------- */}
        </form>
      </div>
    </div>
  );
}