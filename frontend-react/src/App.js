import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // <-- AÑADIR useLocation
import './App.css';

// Pages
import Login from './pages/Login/Login';
import Audiencias from './pages/Audiencias/Audiencias';
import Dashboard from './pages/Dashboard/Dashboard';
import FormularioAudiencia from './pages/FormularioAudiencia/FormularioAudiencia';
import Register from './pages/Register/Register';

// Components
import Header from './components/Header/Header';

// ----------------------------------------------------
// Nuevo Componente: Lógica para mostrar/ocultar el Header
// Debe ser declarado fuera del componente que usa <Router>
const HeaderWrapper = () => {
    const location = useLocation();
    // Definimos la ruta donde NO queremos que se muestre el Header
    const hideHeader = location.pathname === '/login'; 

    // Renderiza el Header solo si no estamos en /login
    return !hideHeader ? <Header /> : null;
};
// ----------------------------------------------------


function App() {
  return (
    <Router>
      {/* 1. Usamos el componente que tiene la lógica condicional */}
      <HeaderWrapper />
      <Routes>
        
        {/* Dashboard como principal */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Login y demás rutas */}
        <Route path="/login" element={<Login />} />
        <Route path="/audiencias" element={<Audiencias />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-audiencia" element={<FormularioAudiencia />} />
        <Route path="/nueva-audiencia" element={<FormularioAudiencia />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App; 