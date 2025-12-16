import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header simple y limpio */}
      <header className="top-bar">
        <div className="logo-section">
            <h2>Gestión Judicial</h2>
            <span className="subtitle">Panel de Control</span>
        </div>
      </header>

      <main className="content-grid">
        {/* Tarjeta Audiencias */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>📅 Audiencias</h3>
            <p className="subtext">Agenda diaria y programación</p>
          </div>
          <div className="card-body">
             <p className="instruction">Gestiona las fechas y estados de los expedientes.</p>
             <Link to="/audiencias" style={{textDecoration: 'none'}}>
                <button className="btn-black">Gestionar Agenda</button>
             </Link>
          </div>
        </div>
        
        {/* Tarjeta Salas - ACTUALIZADA */}
        <div className="dashboard-card">
           <div className="card-header">
            <h3>🚪 Salas</h3>
            <p className="subtext">Disponibilidad física</p>
          </div>
          <div className="card-body">
            <p className="instruction">Gestión de ocupación de salas.</p>
            {/* Cambiamos el botón deshabilitado por un Link funcional */}
            <Link to="/salas" style={{textDecoration: 'none'}}>
                <button className="btn-black">Gestionar Salas</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;