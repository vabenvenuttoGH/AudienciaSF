import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Importamos useParams
// Importamos funciones nuevas
import { createAudiencia, getAudienciaById, updateAudiencia } from '../../services/audienciaService'; 
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
  estado: 'Programada'
};

const FormularioAudiencia = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el ID de la URL

  // Efecto: Si hay ID, cargamos los datos para editar
  useEffect(() => {
    if (id) {
        const cargarDatos = async () => {
            try {
                setLoading(true);
                const data = await getAudienciaById(id);
                // Ajuste fecha: MongoDB devuelve ISO completo, el input date necesita YYYY-MM-DD
                if(data.fecha) {
                    data.fecha = new Date(data.fecha).toISOString().split('T')[0];
                }
                setFormData(data);
            } catch (err) {
                setError('Error al cargar la audiencia para editar');
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (id) {
        // MODO EDICIÓN
        await updateAudiencia(id, formData);
        setSuccess('Audiencia actualizada correctamente');
      } else {
        // MODO CREACIÓN
        await createAudiencia(formData);
        setSuccess('Audiencia creada correctamente');
        setFormData(initialFormState);
      }
      
      setTimeout(() => {
        navigate('/audiencias');
      }, 1500); 

    } catch (err) {
      console.error("Error:", err);
      setError(err.message || 'Error al guardar');
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

        {/* Título cambia según el modo */}
        <h2>{id ? '✏️ Editar Audiencia' : '📝 Nueva Audiencia'}</h2>
        
        {loading && !formData.causa && <p>Cargando datos...</p>}
        {error && <p style={{ color: 'red', padding: '10px', border: '1px solid red' }}>{error}</p>}
        {success && <p style={{ color: 'green', padding: '10px', border: '1px solid green' }}>{success}</p>}

        <div className="dashboard-card" style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit}>
            
            {/* ... TUS CAMPOS DEL FORMULARIO ... */}
            {/* Copia aquí los mismos inputs que ya tenías (Fecha, Hora, Causa, etc.) */}
            {/* Lo único nuevo es que ahora se llenarán solos si estás editando */}
            
            <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Datos de la Agenda</h3>
            <div className="form-group-grid">
                <div>
                    <label htmlFor="fecha">Fecha (*)</label>
                    <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="hora">Hora (*)</label>
                    <input type="time" id="hora" name="hora" value={formData.hora} onChange={handleChange} required />
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

             {/* CAMPOS OPCIONALES */}
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

            <div className="form-group">
              <label htmlFor="observaciones">Observaciones</label>
              <textarea id="observaciones" name="observaciones" rows="3" value={formData.observaciones} onChange={handleChange}></textarea>
            </div>

            {/* Campo Estado (visible solo al editar) */}
            {id && (
                <div className="form-group">
                    <label htmlFor="estado">Estado</label>
                    <select id="estado" name="estado" value={formData.estado} onChange={handleChange} style={{width:'100%', padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}>
                        <option value="Programada">Programada</option>
                        <option value="Realizada">Realizada</option>
                        <option value="En Curso">En Curso</option>
                        <option value="Suspendida">Suspendida</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>
            )}

            <button type="submit" className="btn-black" disabled={loading} style={{marginTop:'20px'}}>
              {loading ? 'Guardando...' : (id ? 'Actualizar Audiencia' : 'Crear Audiencia')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioAudiencia;