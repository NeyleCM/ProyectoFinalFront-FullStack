import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductsByCategory, deleteProduct } from '../services/api';
import { useUser } from '../context/useUser'

const CategoryPage = () => {
  const { category } = useParams();  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser(); 

  useEffect(() => {
    const getProductsByCategory = async () => {
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
      } catch (err) {
      setError('Error al eliminar producto');
      console.error('Error:', err);
      }
  };

  return (
    <div className="container">
      <h1 className="my-4">Productos en la categoría: {category}</h1>
      {error && <p className="text-danger">{error}</p>}

      {products.length === 0 ? (
        <p>No se encontraron productos en esta categoría.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <div className="card mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="card-img-top" 
                  style={{ height: '250px', objectFit: 'cover' }} 
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>                  
                  <p className="card-text">Precio: {product.price}€</p>
                  <p className="card-text">Stock: {product.stock}</p>
                  {user && (
                    <>
                      <button className="btn btn-info" onClick={() => handleEdit(product._id)}>Editar</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Eliminar</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;