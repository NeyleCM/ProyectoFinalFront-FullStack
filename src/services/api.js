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