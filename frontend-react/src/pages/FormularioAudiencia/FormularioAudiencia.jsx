import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createAudiencia } from '../../services/audienciaService'; // Importamos la función POST
import './FormularioAudiencia.css'; 

const initialFormState = {
  fecha: '',
  hora: '',
  causa: '',
  expediente: '',
  sala: '',
  demandante: '',
  demandado: '',
  juez: '',
  observaciones: '',
  // El estado se deja en 'Programada' por defecto (ver modelo)
};

const FormularioAudiencia = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Hook para la navegación (redireccionar al listado)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Mongoose requiere que la fecha sea un objeto Date, pero la API la acepta como string ISO.
    // Aquí solo enviamos los datos crudos. El backend (Audiencia.js) la manejará como Date.

    try {
      const response = await createAudiencia(formData);
      setSuccess(`Audiencia creada: ${response.data.expediente}`);
      setFormData(initialFormState); // Limpiar formulario
      
      // Redireccionar al listado después de un éxito
      setTimeout(() => {
        navigate('/audiencias');
      }, 1500); 

    } catch (err) {
      console.error("Error al crear la audiencia:", err);
      // El error del backend es capturado en audienciaService.js
      setError(err.message || 'Error desconocido al crear la audiencia.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/audiencias" className="back-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
            ← Volver a Audiencias
          </Link>
        </div>

        <h2>📝 Nueva Audiencia</h2>
        <p className="subtext">Completa los campos obligatorios (*)</p>

        {/* Mensajes de estado */}
        {loading && <p style={{ color: '#0d47a1' }}>Guardando audiencia...</p>}
        {error && <p style={{ color: 'red', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>Error: {error}</p>}
        {success && <p style={{ color: 'green', padding: '10px', border: '1px solid green', borderRadius: '4px' }}>¡Éxito! {success}</p>}

        <div className="dashboard-card" style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit}>
            
            {/* GRUPO DE DATOS OBLIGATORIOS */}
            <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Datos de la Agenda</h3>
            
            <div className="form-group-grid">
                <div>
                    <label htmlFor="fecha">Fecha (*)</label>
                    <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="hora">Hora (HH:mm) (*)</label>
                    <input type="time" id="hora" name="hora" pattern="^\d{2}:\d{2}$" value={formData.hora} onChange={handleChange} required />
                </div>
            </div>

            <div className="form-group">
              <label htmlFor="causa">Causa (*)</label>
              <input type="text" id="causa" name="causa" value={formData.causa} onChange={handleChange} required />
            </div>

            <div className="form-group-grid">
                <div>
                    <label htmlFor="expediente">Expediente (*)</label>
                    <input type="text" id="expediente" name="expediente" value={formData.expediente} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="sala">Sala (*)</label>
                    <input type="text" id="sala" name="sala" value={formData.sala} onChange={handleChange} required />
                </div>
            </div>

            {/* GRUPO DE DATOS OPCIONALES */}
            <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', margin: '30px 0 20px 0' }}>Partes y Juez</h3>

            <div className="form-group">
              <label htmlFor="demandante">Demandante</label>
              <input type="text" id="demandante" name="demandante" value={formData.demandante} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="demandado">Demandado</label>
              <input type="text" id="demandado" name="demandado" value={formData.demandado} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label htmlFor="juez">Juez</label>
              <input type="text" id="juez" name="juez" value={formData.juez} onChange={handleChange} />
            </div>

            {/* OBSERVACIONES */}
            <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', margin: '30px 0 20px 0' }}>Observaciones</h3>
            <div className="form-group">
              <label htmlFor="observaciones">Observaciones</label>
              <textarea id="observaciones" name="observaciones" rows="3" value={formData.observaciones} onChange={handleChange}></textarea>
            </div>


            <button type="submit" className="btn-black" disabled={loading} style={{marginTop:'20px'}}>
              {loading ? 'Guardando...' : 'Crear Audiencia'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioAudiencia;
