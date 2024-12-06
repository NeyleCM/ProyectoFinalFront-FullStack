import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductsByCategory, deleteProduct } from '../services/api';
import ProductDetails from './ProductDetails';

const CategoryPage = () => {
  const { category } = useParams();  
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProductsByCategory = async () => {
      setError('');
      try {
        const data = await fetchProductsByCategory(category);
        setProducts(data);
      } catch (err) {
        setError('Error al cargar productos de la categoría');
        console.error('Error:', err);
      }
    };
    getProductsByCategory();
  }, [category]);

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      if (!productId) {
        throw new Error('El ID del producto no es válido');
      }
      await deleteProduct(productId); 
      setProducts(products.filter(product => product._id !== productId)); 
      setMessage("Producto eliminado con éxito");
    } catch (err) {
      setError('Error al eliminar producto');
      console.error('Error:', err);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Productos en la categoría: {category}</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {products.length === 0 ? (
        <p>No se encontraron productos en esta categoría.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <ProductDetails 
                product={product} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;