import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; 
import './App.css';

// Pages
import Login from './pages/Login/Login';
import Audiencias from './pages/Audiencias/Audiencias';
import Dashboard from './pages/Dashboard/Dashboard';
import FormularioAudiencia from './pages/FormularioAudiencia/FormularioAudiencia';
import Register from './pages/Register/Register';

// IMPORTAR LAS PÁGINAS DE SALAS (Asegúrate de haber creado estos archivos)
import Salas from './pages/Salas/Salas'; 

import FormularioSala from './pages/FormularioSala/FormularioSala';

// Components
import Header from './components/Header/Header';

// Componente para manejar la visibilidad del Header
const HeaderWrapper = () => {
    const location = useLocation();
    // Ocultar Header en Login y Register
    const hideHeader = location.pathname === '/login' || location.pathname === '/register'; 

    return !hideHeader ? <Header /> : null;
};

function App() {
  return (
    <Router>
      <HeaderWrapper />
      <Routes>
        {/* Rutas Principales */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* GESTIÓN DE AUDIENCIAS */}
        <Route path="/audiencias" element={<Audiencias />} />
        <Route path="/crear-audiencia" element={<FormularioAudiencia />} />
        <Route path="/nueva-audiencia" element={<FormularioAudiencia />} />
        <Route path="/editar-audiencia/:id" element={<FormularioAudiencia />} />
        
        {/* GESTIÓN DE SALAS (NUEVAS RUTAS) */}
        <Route path="/salas" element={<Salas />} />
        <Route path="/nueva-sala" element={<FormularioSala />} />
        <Route path="/editar-sala/:id" element={<FormularioSala />} />
        
      </Routes>
    </Router>
  );
}

export default App;