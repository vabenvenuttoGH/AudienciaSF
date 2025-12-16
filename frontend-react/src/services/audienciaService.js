const API_URL = 'http://localhost:5000/api/audiencias';

// Obtener todas (Ya lo tenías)
export const getAllAudiencias = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error('Error en getAllAudiencias:', error);
    throw error;
  }
};

// Crear (Ya lo tenías)
export const createAudiencia = async (audienciaData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(audienciaData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear');
    }
    return response.json();
  } catch (error) {
    console.error('Error en createAudiencia:', error);
    throw error;
  }
};

// --- NUEVAS FUNCIONES ---

// Obtener una por ID (Necesario para cargar el formulario al editar)
export const getAudienciaById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Error al obtener la audiencia');
    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error('Error en getAudienciaById:', error);
    throw error;
  }
};

// Actualizar (PUT)
export const updateAudiencia = async (id, audienciaData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(audienciaData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar');
    }
    return response.json();
  } catch (error) {
    console.error('Error en updateAudiencia:', error);
    throw error;
  }
};

// Eliminar (DELETE)
export const deleteAudiencia = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar');
    }
    return response.json();
  } catch (error) {
    console.error('Error en deleteAudiencia:', error);
    throw error;
  }
};