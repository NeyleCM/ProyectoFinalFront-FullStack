const BASE_URL = 'https://proyectofinal-fullstackdev.onrender.com/api';

export const fetchData = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
