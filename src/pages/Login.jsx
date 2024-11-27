import { useEffect, useState } from 'react';
import { fetchProducts, createProduct } from '../services/api';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    getProducts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name: newProductName, price: Number(newProductPrice) };
      const { data } = await createProduct(newProduct);
      setProducts([...products, data]);
      setNewProductName('');
      setNewProductPrice('');
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Nombre del Producto"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
          required
        />
        <button type="submit">Agregar Producto</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

/*
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { loginUser } from '../services/api';

const Login = () => {
  const { login } = useUser();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(credentials); // Simula el login con el backend.
      login(data.user);
      navigate('/dashboard'); // Redirige al Dashboard después del login.
    } catch (err) {
      setError('Credenciales inválidas', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Iniciar Sesión</h1>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        required
      />
      <button type="submit">Iniciar Sesión</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
*/