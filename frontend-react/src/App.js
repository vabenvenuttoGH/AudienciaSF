import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import './App.css';

// Pages
import Login from './pages/Login/Login';
import Audiencias from './pages/Audiencias/Audiencias';
import Dashboard from './pages/Dashboard/Dashboard';
import FormularioAudiencia from './pages/FormularioAudiencia/FormularioAudiencia';
import Register from './pages/Register/Register';
import Salas from './pages/Salas/Salas';
import FormularioSala from './pages/FormularioSala/FormularioSala';
// <-- AÑADIR ESTA IMPORTACIÓN (Asumo esta ruta de archivo)

// Components
import Header from './components/Header/Header';

// Componente para manejar la lógica condicional del Header
const HeaderWrapper = () => {
    const location = useLocation();
    // Ocultar Header si estamos en /login O /register
    const hideHeader = location.pathname === '/login' || location.pathname === '/register'; 

    return !hideHeader ? <Header /> : null;
};


function App() {
  return (
    <Router>
      <HeaderWrapper />
      <Routes>
        
        {/* RUTA PRINCIPAL (Dashboard) */}
        <Route path="/" element={<Dashboard />} />
        
        {/* RUTAS SIN HEADER */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 

        {/* RUTAS CON DATOS DINÁMICOS Y AUDIENCIAS */}
        <Route path="/editar-audiencia/:id" element={<FormularioAudiencia />} /> 
        
        {/* <-- RUTA FALTANTE AÑADIDA (Descomentar cuando el componente Salas exista) */}
        
        {/* RUTAS DE AUDIENCIAS Y FORMULARIO */}
        <Route path="/audiencias" element={<Audiencias />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-audiencia" element={<FormularioAudiencia />} />
        <Route path="/nueva-audiencia" element={<FormularioAudiencia />} />

        {/* RUTAS DE SALAS */}
        <Route path="/salas" element={<Salas />} />
        <Route path="/nueva-sala" element={<FormularioSala />} /> {/* <-- USO DE FORMULARIOSALA */}
        <Route path="/editar-sala/:id" element={<FormularioSala />} /> {/* <-- USO DE FORMULARIOSALA */}
        
      </Routes>
        
    </Router>
  );
}

export default App;