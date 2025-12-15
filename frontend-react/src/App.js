import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Login from './pages/Login/Login';
import Audiencias from './pages/Audiencias/Audiencias';
import Dashboard from './pages/Dashboard/Dashboard';
import FormularioAudiencia from './pages/FormularioAudiencia/FormularioAudiencia';

// Components
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/audiencias" element={<Audiencias />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-audiencia" element={<FormularioAudiencia />} />
        <Route path="/nueva-audiencia" element={<FormularioAudiencia />} />
      </Routes>
    </Router>
  );
}

export default App;
