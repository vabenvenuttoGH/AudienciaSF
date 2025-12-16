// src/pages/Salas/Salas.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllSalas, deleteSala } from '../../services/salaService';
import './Salas.css'; 

const Salas = () => {
  const [salas, setSalas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarSalas();
  }, []);

  const cargarSalas = async () => {
    try {
        const data = await getAllSalas();
        setSalas(data);
    } catch (error) {
        console.error("Error al cargar salas:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta sala?')) {
      await deleteSala(id);
      cargarSalas();
    }
  };

  return (
    <div className="dashboard-container">
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <div style={{marginBottom: '2rem'}}>
            <Link to="/dashboard" className="back-btn" style={{textDecoration:'none', display:'flex', alignItems:'center', gap:'5px'}}>← Volver al Panel</Link>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
            <div>
                <h2 style={{margin:0}}>Gestión de Salas</h2>
                <p className="subtext">Espacios físicos disponibles</p>
            </div>
            <Link to="/nueva-sala" className="btn-black" style={{textDecoration:'none'}}>+ Nueva Sala</Link>
        </div>

        <div className="dashboard-card" style={{padding:0, overflow:'hidden'}}>
          <table style={{width:'100%', borderCollapse:'collapse', textAlign:'left'}}>
            <thead style={{backgroundColor:'#f9fafb', borderBottom:'1px solid #eaeaea'}}>
              <tr>
                <th style={{padding:'15px'}}>Nombre</th>
                <th style={{padding:'15px'}}>Capacidad</th>
                <th style={{padding:'15px'}}>Ubicación</th>
                <th style={{padding:'15px'}}>Estado</th>
                <th style={{padding:'15px'}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {salas.length === 0 && (
                  <tr><td colSpan="5" style={{padding:'20px', textAlign:'center'}}>No hay salas cargadas.</td></tr>
              )}
              {salas.map((sala) => (
                <tr key={sala._id} style={{borderBottom:'1px solid #f1f1f1'}}>
                  <td style={{padding:'15px'}}><strong>{sala.nombre}</strong></td>
                  <td style={{padding:'15px'}}>{sala.capacidad} personas</td>
                  <td style={{padding:'15px'}}>{sala.ubicacion}</td>
                  <td style={{padding:'15px'}}>{sala.estado}</td>
                  <td style={{padding:'15px'}}>
                    <button onClick={() => navigate(`/editar-sala/${sala._id}`)} style={{border:'none', background:'none', cursor:'pointer', marginRight:'10px', fontSize:'1.2rem'}}>✏️</button>
                    <button onClick={() => handleDelete(sala._id)} style={{border:'none', background:'none', cursor:'pointer', fontSize:'1.2rem'}}>🗑️</button>
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

export default Salas;