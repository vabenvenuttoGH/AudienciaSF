// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'; 
// Ajusta la ruta del logo si es necesario (aquí se asume que se llama logo.png)
import LogoPoderJudicial from './logo.png'; 

const Header = () => {
  return (
    <header className="header-institucional">
      <div className="header-left">
        <div className="logo-container"> 
            <img 
              src={LogoPoderJudicial} 
              alt="Logo Poder Judicial Santa Fe" 
              className="logo-imagen"
            />
        </div> 
        
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
        {/* Botón Iniciar Sesión */}
        <Link 
            to="/login" 
            style={{
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '5px', 
                color: 'white',
            }}
        >
            Iniciar Sesion
        </Link>
      </div>
    </header>
  );
};

export default Header;