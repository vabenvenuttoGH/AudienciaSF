import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos useNavigate
// Importamos deleteAudiencia
import { getAllAudiencias, deleteAudiencia } from '../../services/audienciaService'; 
import './Audiencias.css';

// ... (MANTÉN TU FUNCIÓN formatFecha AQUÍ) ...
const formatFecha = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    if (isNaN(date)) return isoDate; 
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
};

const Audiencias = () => {
  const [audiencias, setAudiencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); // Hook para navegar

  const fetchAudiencias = async () => {
    setLoading(true);
    try {
      const data = await getAllAudiencias();
      setAudiencias(data); 
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError("Error al cargar las audiencias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudiencias();
  }, []); 

  // --- LÓGICA PARA ELIMINAR ---
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta audiencia?")) {
      try {
        await deleteAudiencia(id);
        // Actualizamos la lista visualmente quitando el elemento borrado
        setAudiencias(prev => prev.filter(a => a._id !== id));
      } catch (err) {
        alert("Hubo un error al intentar eliminar.");
      }
    }
  };

  // --- LÓGICA PARA EDITAR ---
  const handleEdit = (id) => {
    navigate(`/editar-audiencia/${id}`);
  };

  return (
    <div className="dashboard-container">
      {/* ... (TU HEADER Y BOTONES DE VOLVER SIGUEN IGUAL) ... */}
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <div style={{marginBottom: '2rem'}}>
            <Link to="/dashboard" className="back-btn" style={{textDecoration:'none', display:'flex', alignItems:'center', gap:'5px'}}>← Volver al Panel</Link>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
            <div>
                <h2 style={{margin:0}}>Agenda de Audiencias</h2>
                <p className="subtext">Listado completo de expedientes</p>
            </div>
            <Link to="/nueva-audiencia" className="btn-black" style={{width:'auto', padding:'10px 20px', textDecoration: 'none'}}>+ Nueva Audiencia</Link>
        </div>

        {loading && <p style={{textAlign: 'center'}}>Cargando...</p>}
        {error && <p style={{color: 'red', textAlign:'center'}}>{error}</p>}
        
        {!loading && !error && audiencias.length > 0 && (
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
                            <tr key={aud._id} style={{borderBottom:'1px solid #f1f1f1'}}>
                                <td style={tdStyle}>
                                    <strong>{formatFecha(aud.fecha)}</strong> <br/>
                                    <span style={{fontSize:'0.8rem', color:'#777'}}>{aud.hora} hs</span>
                                </td>
                                <td style={tdStyle}>{aud.causa}</td>
                                <td style={tdStyle}>{aud.sala}</td>
                                <td style={tdStyle}>
                                    <span style={getEstadoBadge(aud.estado)}>{aud.estado}</span>
                                </td>
                                <td style={tdStyle}>
                                    {/* BOTONES CON FUNCIONES CONECTADAS */}
                                    <button 
                                        onClick={() => handleEdit(aud._id)}
                                        style={{border:'none', background:'none', cursor:'pointer', marginRight:'10px', fontSize:'1.2rem'}} 
                                        title="Editar">
                                        ✏️
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(aud._id)}
                                        style={{border:'none', background:'none', cursor:'pointer', fontSize:'1.2rem'}} 
                                        title="Eliminar">
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
};

// ... (TUS ESTILOS Y HELPERS SIGUEN IGUAL) ...
const thStyle = { padding: '15px 20px', fontSize: '0.85rem', color: '#555', fontWeight: '600' };
const tdStyle = { padding: '15px 20px', fontSize: '0.9rem', color: '#333' };
const getEstadoBadge = (estado) => {
    const base = { padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '500' };
    if (estado === 'Programada') return { ...base, backgroundColor: '#e3f2fd', color: '#0d47a1' };
    if (estado === 'Realizada') return { ...base, backgroundColor: '#e8f5e9', color: '#1b5e20' };
    return base;
};

export default Audiencias;