const BASE_URL = 'https://proyectofinal-fullstackdev.onrender.com';

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};