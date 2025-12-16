// src/services/salaService.js
const API_URL = 'http://localhost:5000/api/salas';

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
  if (!response.ok) throw new Error('Error al crear sala');
  return response.json();
};

export const updateSala = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar sala');
  return response.json();
};

export const deleteSala = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar sala');
  return response.json();
};