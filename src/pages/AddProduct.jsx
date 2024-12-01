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