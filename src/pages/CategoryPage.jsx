import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductsByCategory, deleteProduct } from '../services/api';
import { useUser } from '../context/useUser';
import { useWishlist } from '../context/WishlistContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; 
import '../index.css'
import '../styles/CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { user } = useUser(); 
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
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
    } catch (err) {
      setError('Error al eliminar producto');
      console.error('Error:', err);
    }
  };

  const toggleWishlist = (product) => {
    const isProductInWishlist = wishlist.some((item) => item._id === product._id);

    if (isProductInWishlist) {
      removeFromWishlist(product._id); 
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="container">
      <h1 className="categories-h1">{category}</h1>
      {loading && <p>Cargando productos...</p>} 
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {products.length === 0 ? (
        <p>No se encontraron productos en esta categoría.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => {
            const isInWishlist = wishlist.some((item) => item._id === product._id);

            return (
              <div className="card" key={product._id}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="card-img-top" 
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-price">{product.price}€</p>
                  
                  {/* Mostrar stock si el usuario está autenticado */}
                  {user && (
                    <p className="card-stock">Stock: {product.stock}</p>
                  )}

                  <div className="card-actions">
                    {/* Mostrar wishlist solo si el usuario NO está autenticado */}
                    {!user && (
                      <button 
                        className="wishlist-heart" 
                        onClick={() => toggleWishlist(product)}
                      >
                        <FontAwesomeIcon 
                          icon={isInWishlist ? solidHeart : regularHeart} 
                          style={{ color: isInWishlist ? 'pink' : 'gray' }}
                        />
                      </button>
                    )}
                    
                    {/* Mostrar botones de editar/eliminar si el usuario está autenticado */}
                    {user && (
                      <>
                        <button 
                          className="btn btn-info" 
                          onClick={() => handleEdit(product._id)}
                        >
                          Editar
                        </button>
                        <button 
                          className="btn btn-danger" 
                          onClick={() => handleDelete(product._id)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;