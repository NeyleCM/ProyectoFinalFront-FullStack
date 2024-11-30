import { useEffect, useState } from 'react';
import { fetchProducts, createProduct } from '../services/api';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(); 
        setProducts(data);
      } catch (err) {
        setError('Error al cargar productos');
        console.error('Error:', err);
      }
    };
    getProducts();
  }, []);

  const handleCreate = async () => {
    try {
      const newProduct = { name: 'Producto Nuevo', price: 100 };
      const data = await createProduct(newProduct);
      setProducts([...products, data]); 
    } catch (err) {
      setError('Error al agregar producto');
      console.error('Error:', err);
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleCreate}>Agregar Producto</button>
      {error && <p>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;

/*
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
*/