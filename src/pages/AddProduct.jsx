import { useState } from 'react';
import { createProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '', 
    stock:''
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
      // Llamada a la función para crear el producto
      const successMessage = await createProduct(product);
      
      // Muestra el mensaje de éxito si la creación fue exitosa
      alert(successMessage); // Puedes cambiarlo por un mensaje en el UI de tu app, no solo un alert.
      
      navigate('/dashboard'); // Redirige al Dashboard después de la creación
  
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
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="Zarcillos">Zarcillos</option>
            <option value="Bufandas">Bufandas</option>
            <option value="Anillos">Anillos</option>
            <option value="Collares">Collares</option>
          </select>
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
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
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