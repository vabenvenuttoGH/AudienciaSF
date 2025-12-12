import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Audiencias.css';

const Audiencias = () => {
  const [audiencias] = useState([
    { id: 1, fecha: '15/10/2025', hora: '09:00', causa: 'Exp 204/25 - Daños', sala: 'Sala 1', estado: 'Programada' },
    { id: 2, fecha: '15/10/2025', hora: '11:30', causa: 'Exp 330/25 - Sucesión', sala: 'Sala 2', estado: 'Realizada' },
  ]);

  return (
    <div className="dashboard-container">
      {/* Header con botón Volver */}
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <div style={{marginBottom: '2rem'}}>
            <Link to="/dashboard" className="back-btn" style={{textDecoration:'none', display:'flex', alignItems:'center', gap:'5px'}}>
               ← Volver al Panel
            </Link>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
            <div>
                <h2 style={{margin:0}}>Agenda de Audiencias</h2>
                <p className="subtext">Listado completo de expedientes</p>
            </div>
            <button className="btn-black" style={{width:'auto', padding:'10px 20px'}}>
                + Nueva Audiencia
            </button>
        </div>

        {/* Tabla estilo "Card" */}
        <div className="dashboard-card" style={{padding: '0', overflow: 'hidden'}}>
            <table style={{width:'100%', borderCollapse:'collapse', textAlign:'left'}}>
                <thead style={{backgroundColor:'#f9fafb', borderBottom:'1px solid #eaeaea'}}>
                    <tr>
                        <th style={thStyle}>Fecha</th>
                        <th style={thStyle}>Causa</th>
                        <th style={thStyle}>Sala</th>
                        <th style={thStyle}>Estado</th>
                        <th style={thStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {audiencias.map((aud) => (
                        <tr key={aud.id} style={{borderBottom:'1px solid #f1f1f1'}}>
                            <td style={tdStyle}>
                                <strong>{aud.fecha}</strong> <br/>
                                <span style={{fontSize:'0.8rem', color:'#777'}}>{aud.hora} hs</span>
                            </td>
                            <td style={tdStyle}>{aud.causa}</td>
                            <td style={tdStyle}>{aud.sala}</td>
                            <td style={tdStyle}>
                                <span style={getEstadoBadge(aud.estado)}>{aud.estado}</span>
                            </td>
                            <td style={tdStyle}>
                                <button style={{border:'none', background:'none', cursor:'pointer', marginRight:'10px'}}>✏️</button>
                                <button style={{border:'none', background:'none', cursor:'pointer'}}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

// Estilos rápidos para la tabla
const thStyle = { padding: '15px 20px', fontSize: '0.85rem', color: '#555', fontWeight: '600' };
const tdStyle = { padding: '15px 20px', fontSize: '0.9rem', color: '#333' };

const getEstadoBadge = (estado) => {
    const base = { padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '500' };
    if (estado === 'Programada') return { ...base, backgroundColor: '#e3f2fd', color: '#0d47a1' }; // Azul suave
    if (estado === 'Realizada') return { ...base, backgroundColor: '#e8f5e9', color: '#1b5e20' };  // Verde suave
    return base;
};

export default Audiencias;