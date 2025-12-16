import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllAudiencias } from '../../services/audienciaService'; // <-- Nuevo: Importar el servicio
import './Audiencias.css';

// Función auxiliar para formatear la fecha que viene del backend (ISO Date) a DD/MM/YYYY
const formatFecha = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    // Verificar si la fecha es válida. Usamos getUTCDate para evitar problemas de zona horaria con la fecha.
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

  // Usamos useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    const fetchAudiencias = async () => {
      setLoading(true);
      try {
        // Usamos la función centralizada del servicio
        const data = await getAllAudiencias();
        setAudiencias(data); 
        setError(null);
      } catch (err) {
        console.error("Error al obtener audiencias:", err);
        // Mensaje de error más general ya que la lógica HTTP está en el service
        setError("Error al cargar las audiencias. Revisa la consola y la conexión del servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchAudiencias();
  }, []); 

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
            {/* Aquí deberías usar <Link to="/nueva-audiencia"> si tienes la ruta configurada */}
            <Link to="/nueva-audiencia" className="btn-black" style={{width:'auto', padding:'10px 20px', textDecoration: 'none'}}>
                +  Nueva Audiencia
            </Link>
        </div>

        {/* Mensajes de Carga y Error */}
        {loading && <p style={{textAlign: 'center'}}>Cargando audiencias...</p>}
        {error && <p style={{textAlign: 'center', color: 'red', padding: '20px', border: '1px solid red', borderRadius: '5px'}}>{error}</p>}
        
        {/* Tabla estilo "Card" - Solo se muestra si hay datos y no hay error */}
        {!loading && audiencias.length === 0 && !error && (
            <p style={{textAlign: 'center', color: '#777', padding: '20px'}}>No hay audiencias programadas en la base de datos.</p>
        )}

        {audiencias.length > 0 && (
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
                                    <button style={{border:'none', background:'none', cursor:'pointer', marginRight:'10px'}}>✏️</button>
                                    <button style={{border:'none', background:'none', cursor:'pointer'}}>🗑️</button>
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