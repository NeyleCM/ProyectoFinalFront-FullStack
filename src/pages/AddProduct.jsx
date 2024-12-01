import { useState } from 'react';
import { createProduct } from '../services/api'; // Función para crear un producto
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '', 
    size: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const newProduct = await createProduct(product);
      console.log('Producto creado:', newProduct);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al crear el producto');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Producto</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Categoría</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tamaño</label>
          <input
            type="text"
            name="size"
            value={product.size}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default AddProduct;

/*
import { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId); 
      setProducts(products.filter(product => product.id !== productId)); 
    } catch (err) {
      setError('Error al eliminar producto');
      console.error('Error:', err);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`); 
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      {error && <p>{error}</p>}
      <ul>
        {products.length === 0 ? (
          <li>No hay productos disponibles</li>
        ) : (
          products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price}€
              <button onClick={() => handleEdit(product.id)}>Editar</button>
              <button onClick={() => handleDelete(product.id)}>Eliminar</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AddProduct;
*/