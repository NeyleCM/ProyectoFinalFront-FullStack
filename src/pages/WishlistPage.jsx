import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; 
import '../index.css'
import '../styles/Wishlist.css'; 

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const toggleWishlist = (productId) => {
    removeFromWishlist(productId); 
  };

  return (
    <div className="wishlist-container">
      <h1>Deseos</h1>
      {wishlist.length === 0 ? (
        <p>No tienes productos en tu lista de deseos.</p>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <div className="card" key={product._id}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="card-img-top" 
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-price">{product.price}€</p>
                <button 
                  className="wishlist-heart" 
                  onClick={() => toggleWishlist(product._id)}
                >
                  <FontAwesomeIcon icon={solidHeart} style={{ color: 'pink' }} />
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  Ver producto
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;