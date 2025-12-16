// src/services/salaService.js
const API_URL = 'http://localhost:5000/api/salas';

// Función auxiliar para manejar la respuesta
const handleResponse = async (response, errorMessage) => {
  if (!response.ok) throw new Error(errorMessage);
  
  // Verifica si la respuesta tiene contenido JSON
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  // Si no hay JSON (ej. éxito sin contenido), devuelve un objeto vacío para evitar errores
  return {};
};


export const getAllSalas = async () => {
  const response = await fetch(API_URL);
  const result = await response.json();
  return result.data || [];
};

export const getSalaById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const result = await response.json();
  return result.data;
};

export const createSala = async (data) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  // Usamos la función auxiliar
  return handleResponse(response, 'Error al crear sala');
};

export const updateSala = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  // Usamos la función auxiliar
  return handleResponse(response, 'Error al actualizar sala');
};

export const deleteSala = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  // Usamos la función auxiliar
  return handleResponse(response, 'Error al eliminar sala');
};