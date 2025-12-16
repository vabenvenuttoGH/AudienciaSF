// src/components/Header/Header.jsx
import React from 'react';
import './Header.css';
import LogoPoderJudicial from './LogoWhitePJ.png';
import { Link } from 'react-router-dom';

// ELIMINAMOS LA LÍNEA QUE CAUSABA EL ERROR PORQUE NO SE USABA:
// import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

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
         {/* Asegúrate que la ruta coincida con tu App.js (usualmente minúsculas: /login) */}
         <Link to="/login" className="back-btn" style={{textDecoration:'none', display:'flex', alignItems:'center', gap:'5px'}}>
               Iniciar Sesión
         </Link>
      </div>
    </header>
  );
};

export default Header;