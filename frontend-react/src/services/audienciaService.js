// La URL base del backend, que está corriendo en el puerto 5000 (según server.js)
const API_URL = 'http://localhost:5000/api/audiencias';

/**
 * Función para obtener todas las audiencias.
 * Esto es una buena práctica para centralizar la lógica de la API.
 */
export const getAllAudiencias = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data; // Retorna el array de audiencias
  } catch (error) {
    console.error('Error en getAllAudiencias:', error);
    throw error;
  }
};

/**
 * Función para crear una nueva audiencia (Método POST).
 */
export const createAudiencia = async (audienciaData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        // Necesario para enviar datos en formato JSON
        'Content-Type': 'application/json',
      },
      // Convertimos el objeto de datos a una cadena JSON
      body: JSON.stringify(audienciaData),
    });

    if (!response.ok) {
      // Intenta leer el mensaje de error del backend si la respuesta no es OK
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido al crear la audiencia');
    }

    return response.json(); // Retorna la audiencia recién creada
  } catch (error) {
    console.error('Error en createAudiencia:', error);
    throw error;
  }
};