import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  const handleClearWishlist = () => {
    clearWishlist();
  };

  return (
    <div>
      <h1>Mi Lista de Deseos</h1>
      {wishlist.length === 0 ? (
        <p>No tienes productos en tu lista de deseos.</p>
      ) : (
        <>
        <ul>
          {wishlist.map((product) => (
            <li key={product._id} style={{ marginBottom: '20px' }}>
              <img src={product.image} alt={product.name} style={{ width: '100px' }} />
              <h3>{product.name}</h3>
              <p>{product.price}€</p>
              <button onClick={() => handleRemove(product._id)}>Eliminar</button>
              <button onClick={() => navigate(`/products/${product._id}`)}>Ver producto</button>
            </li>
          ))}
        </ul>
        <button onClick={handleClearWishlist}>Eliminar lista de deseos</button>
        </>
      )}
    </div>
  );
};

export default WishlistPage;