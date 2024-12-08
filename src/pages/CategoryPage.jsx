import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductsByCategory, deleteProduct } from '../services/api';
import { useUser } from '../context/useUser';
import { useWishlist } from '../context/WishlistContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import '../styles/CategoryPage.css'

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { user } = useUser(); 
  const { wishlist, addToWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        setLoading(true); 
        const data = await fetchProductsByCategory(category);
        setProducts(data);
      } catch (err) {
        setError('Error al cargar productos de la categoría');
        console.error('Error:', err);
      } finally {
        setLoading(false); 
      }
    };
    getProductsByCategory();
  }, [category]);

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = async (productId) => {
    if (!productId) {
      console.error("El ID del producto no es válido");
      return;
    }
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product._id !== productId));
      setMessage("Producto eliminado con éxito");
    } catch (err) {
      setError('Error al eliminar producto');
      console.error('Error:', err);
    }
  };

  const handleAddToWishlist = (product) => {
    const isProductInWishlist = wishlist.some((item) => item._id === product._id);
  
    isProductInWishlist 
      ? setMessage('Este producto ya está en tu lista de deseos') 
      : (addToWishlist(product), setMessage('Producto agregado a la lista de deseos'));
  };

  return (
    <div className="container">
      <h1 className="my-4">Productos en la categoría: {category}</h1>
      
      {loading && <p>Cargando productos...</p>} 
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
                  
                  {user ? (
                    <>
                      <button className="btn btn-info" onClick={() => handleEdit(product._id)}>
                        Editar
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>
                        Eliminar
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-warning" onClick={() => handleAddToWishlist(product)}>
                     <FontAwesomeIcon icon={faHeart} /> Agregar a mi lista de deseos
                    </button>
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
/*
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
              {product ? (
                <ProductDetails 
                  product={product} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
              ) : (
                <p>Cargando producto...</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
*/