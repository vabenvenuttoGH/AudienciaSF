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
        <Link to="/" className="logout-btn">Cerrar Sesión</Link>
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

        {/* Tarjeta Autoridades */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>⚖️ Autoridades</h3>
            <p className="subtext">Jueces y secretarios</p>
          </div>
          <div className="card-body">
            <p className="instruction">Administración de personal judicial.</p>
            <button className="btn-disabled">Próximamente</button>
          </div>
        </div>

        {/* Tarjeta Salas */}
        <div className="dashboard-card">
           <div className="card-header">
            <h3>🚪 Salas</h3>
            <p className="subtext">Disponibilidad física</p>
          </div>
          <div className="card-body">
            <p className="instruction">Gestión de ocupación de salas.</p>
            <button className="btn-disabled">Próximamente</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;