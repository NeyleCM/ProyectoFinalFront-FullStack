import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api'; 
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchProducts(); 
        const uniqueCategories = [
          ...new Set(data.map(product => product.category)) 
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Error al cargar categorías');
        console.error('Error:', err);
      }
    };
    getCategories();
  }, []);

 
  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="container">
      <h1 className="my-4">Dashboard - Categorías</h1>
      {error && <p className="text-danger">{error}</p>}

      {categories.length === 0 ? (
        <p>No hay categorías disponibles</p>
      ) : (
        <div className="row">
          {categories.map((category, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img 
                  src={`https://via.placeholder.com/300x200?text=${category}`}
                  alt={category} 
                  className="card-img-top" 
                  style={{ objectFit: 'cover', height: '200px' }} 
                />
                <div className="card-body">
                  <h5 className="card-title">{category}</h5>
                  <button className="btn btn-info" onClick={() => handleCategoryClick(category)}>
                    Ver productos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
/*
import { useEffect, useState } from 'react';
import { fetchProducts, createProduct, deleteProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null); 
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
    }, [navigate]);

  const handleCreate = async () => {
    try {
      const newProduct = { name: 'Producto Nuevo', price: 100 };
      const data = await createProduct(newProduct);
      setProducts([...products, data]); 
    } catch (err) {
      setError('Error al agregar producto');
      console.error('Error:', err);
    }
  };

  const handleEdit = (productId) => {
    console.log('Editando producto con ID:', productId);
    navigate(`/edit-product/${productId}`);  
  };

  const handleDelete = async (productId) => {
    if (!productId) {
      console.error("El ID del producto no es válido");
      return;
    }
    try {
      await deleteProduct(productId); 
      setProducts(products.filter(product => product._id !== productId));
      setMessage("Producto eliminado con éxito"); 
 
    } catch (err) {
      setError('Error al eliminar producto');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleCreate}>Agregar Producto</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p>{error}</p>}
      <ul>
        {products.length === 0 ? (
          <li>No hay productos disponibles</li> 
        ) : (
          products.map((product) => (
            <li key={product._id}>
              {product.name} - {product.price}€ - {product.image} - {product.size}
              <button onClick={() => handleEdit(product.id)}>Editar</button>
              <button onClick={() => handleDelete(product._id)}>Eliminar</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
*/