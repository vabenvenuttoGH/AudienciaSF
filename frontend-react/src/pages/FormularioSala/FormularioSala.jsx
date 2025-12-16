import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// Asegúrate de que salaService exista en esta ruta
import { createSala, getSalaById, updateSala } from '../../services/salaService';
// Reutilizamos el CSS de Audiencias para que se vea igual
import './FormularioSala.css'; 

const FormularioSala = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    capacidad: '',
    ubicacion: '',
    equipamiento: '',
    estado: 'Disponible'
  });
  
  const navigate = useNavigate();
  const { id } = useParams(); // Para saber si estamos editando (viene de la URL)

  // Cargar datos si estamos editando
  useEffect(() => {
    if (id) {
      const fetchSala = async () => {
        try {
          const data = await getSalaById(id);
          if (data) setFormData(data);
        } catch (error) {
          console.error("Error al cargar la sala:", error);
        }
      };
      fetchSala();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateSala(id, formData); // Editar
      } else {
        await createSala(formData); // Crear
      }
      navigate('/salas'); // Volver al listado
    } catch (error) {
      alert("Error al guardar: " + error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/salas" className="back-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
            ← Volver a Salas
          </Link>
        </div>

        <h2>{id ? '✏️ Editar Sala' : '📝 Nueva Sala'}</h2>

        <div className="dashboard-card" style={{ padding: '30px' }}>
          <form onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label>Nombre de la Sala *</label>
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                required 
                placeholder="Ej: Sala de Conferencias 1"
              />
            </div>

            <div className="form-group-grid">
              <div className="form-group">
                <label>Capacidad (Pers.) *</label>
                <input 
                  type="number" 
                  name="capacidad" 
                  value={formData.capacidad} 
                  onChange={handleChange} 
                  required 
                  min="1"
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select 
                  name="estado" 
                  value={formData.estado} 
                  onChange={handleChange}
                  style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Ocupada">Ocupada</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Ubicación</label>
              <input 
                type="text" 
                name="ubicacion" 
                value={formData.ubicacion} 
                onChange={handleChange} 
                placeholder="Ej: Planta Baja, Ala Norte"
              />
            </div>

            <div className="form-group">
              <label>Equipamiento</label>
              <textarea 
                name="equipamiento" 
                value={formData.equipamiento} 
                onChange={handleChange} 
                rows="3" 
                placeholder="Proyector, Pantalla, Sistema de Audio..."
              ></textarea>
            </div>

            <button type="submit" className="btn-black" style={{ width: '100%', marginTop: '20px' }}>
              {id ? 'Guardar Cambios' : 'Crear Sala'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioSala;