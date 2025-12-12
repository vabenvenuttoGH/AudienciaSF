// src/components/Header.jsx
import React from 'react';
import './Header.css'; // Ahora crearemos este CSS

const Header = () => {
  return (
    <header className="header-institucional">
      <div className="header-left">
        {/* Aquí iría tu logo.svg si lo tienes, por ahora usamos un emoji o texto */}
        <div className="logo-placeholder">⚖️</div> 
        <div className="texto-institucional">
            <h1>Poder Judicial</h1>
            <h2>Provincia de Santa Fe</h2>
        </div>
      </div>

      <div className="header-center">
        <div className="buscador-container">
            <input type="text" placeholder="Buscar..." />
            <button>🔍</button>
        </div>
      </div>

      <div className="header-right">
        <span>| Iniciar Sesion |</span>
      </div>
    </header>
  );
};

export default Header;
