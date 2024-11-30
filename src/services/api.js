import axios from 'axios';
import { getAuth } from 'firebase/auth';

const API_URL = 'https://proyectofinal-fullstackdev.onrender.com/api';

// Función de autenticación
export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials)
    .then(response => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data; // Devuelve la respuesta con el token
    })
    .catch(error => {
      throw error; // Lanza el error para manejarlo en el frontend
    });
};

// Función para obtener productos
export const fetchProducts = async () => {
  const auth = getAuth(); // Obtén la instancia de autenticación de Firebase
  const user = auth.currentUser; // Obtiene el usuario autenticado actualmente

  if (!user) {
    throw new Error('Usuario no autenticado');
  }

  // Obtén el token de autenticación del usuario
  const token = await user.getIdToken();

  const headers = {
    Authorization: token ? `Bearer ${token}` : '',
  };

  return axios.get(`${API_URL}/products`, { headers })
    .then(response => response.data) // Devuelve los productos
    .catch(error => {
      throw error; // Lanza el error si ocurre
    });
};

// Función para crear un producto
export const createProduct = (product) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };

  return axios.post(`${API_URL}/products`, product, { headers })
    .then(response => response.data) // Devuelve el producto creado
    .catch(error => {
      throw error; // Lanza el error si ocurre
    });
};
/*
import axios from 'axios';

const API_URL = 'https://proyectofinal-fullstackdev.onrender.com/api';

// Autenticación
export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

// Productos
export const fetchProducts = () => {
  return axios.get(`${API_URL}/products`);
};

export const createProduct = (product) => {
  return axios.post(`${API_URL}/products`, product);
};
*/

/*
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://proyectofinal-fullstackdev.onrender.com/api', // URL de tu API
});

export const fetchProducts = () => API.get('/products');
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const loginUser = (credentials) => API.post('/auth/login', credentials);
*/