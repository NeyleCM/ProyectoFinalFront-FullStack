import { useState } from 'react';
import PropTypes from 'prop-types';
import { useWishlist } from '../context/WishlistContext';
import { useUser } from '../context/useUser'; 

const ProductDetails = ({ product, onEdit, onDelete }) => {
  const { addToWishlist } = useWishlist();
  const { user } = useUser();
  const [message, setMessage] = useState(null);

  const handleAddToWishlist = () => {
    addToWishlist(product);
    setMessage('Producto agregado a la lista de deseos');
  };

  return (
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
        
        {message && <p style={{ color: 'green' }}>{message}</p>}
        
        <div className="d-flex justify-content-between">
            { user && (
                <>
                   <button className="btn btn-info" onClick={() => onEdit(product._id)}>
                   Editar
                 </button>
                 <button className="btn btn-danger" onClick={() => onDelete(product._id)}>
                   Eliminar
                 </button>
                </>
            )}
          <button className="btn btn-warning" onClick={handleAddToWishlist}>
            Agregar a la lista de deseos
          </button>
        </div>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductDetails;