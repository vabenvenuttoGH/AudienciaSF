// src/components/Header.jsx
import React from 'react';
import './Header.css'; // Ahora crearemos este CSS
import LogoPoderJudicial from './LogoWhitePJ.png';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header-institucional">
      <div className="header-left">
        {/* Aquí iría tu logo.svg si lo tienes, por ahora usamos un emoji o texto */}
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
         <Link to="/Login" className="back-btn" style={{textDecoration:'none', display:'flex', alignItems:'center', gap:'5px'}}>
               Iniciar Sesion
            </Link>
      </div>
    </header>
  );
};

export default Header;
