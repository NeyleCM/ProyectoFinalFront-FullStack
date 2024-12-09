import axios from 'axios';
import { getAuth } from 'firebase/auth';

const API_URL = 'https://proyectofinal-fullstackdev.onrender.com/api';

export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials)
    .then(response => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        }
      return response.data; 
    })
    .catch(error => {
      throw error; 
    });
};

export const fetchProducts = async () => {
    try {

    const response = await axios.get(`${API_URL}/products`);
    return response.data; 

  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    throw error; 
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error.message);
    throw error;
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/products/category/${category}`);
    return response.data;

  } catch (error) {
    console.error("Error al obtener productos por categoría:", error.message);
    throw error;
  }
};

export const createProduct = async (product) => { 
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    const token = await user.getIdToken();

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    };

    const response = await axios.post(`${API_URL}/products`, product, { headers });
    
    if (response.status === 201) {
      return "Producto creado exitosamente"; 
    } else {
      throw new Error('Error al crear el producto');
    }

  } catch (error) {
    console.error("Error al crear el producto:", error.message);
    throw error; 
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const token = await user.getIdToken(); 

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    };

    const response = await axios.put(`${API_URL}/products/${id}`, updatedProduct, { headers });
    if (response.status === 201) {
      return "Producto creado exitosamente";
    } else {
      throw new Error('Error al crear el producto');
    }

  } catch (error) {
    console.error("Error al actualizar producto:", error.message);
    throw error;
  }
}; 

export const deleteProduct = async (id) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    const token = await user.getIdToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(`${API_URL}/products/${id}`, { headers });
    return response.data;

  } catch (error) {
    console.error("Error al eliminar producto:", error.message);
    throw new Error("Error en la eliminación del producto");
  }
};



