import { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    } else {
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
    }
  }, [navigate]);

/*
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
*/

  const handleEdit = (productId) => {
    console.log('Editando producto con ID:', productId);
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

    <>
    <div className="container">
      <h1 className="my-4">Dashboard</h1>      
      {error && <p className="text-danger">{error}</p>}
      
      {products.length === 0 ? (
        <p>No hay productos disponibles</p> 
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <div className="card mb-4">
                <img src={product.image} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Precio: {product.price}€</p>
                  <p className="card-text">Categoría: {product.category}</p>
                  <p className="card-text">Stock: {product.stock}</p>
                  <button className="btn btn-info mr-2" onClick={() => handleEdit(product._id)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
    /*
    <>
    <div>
      <h1>Dashboard</h1>
        <button onClick={handleCreate}>Crear Producto</button>
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
    </>
*/
  )
};

export default Dashboard;

/*
import { useEffect, useState } from 'react';
import { fetchProducts, createProduct } from '../services/api';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    getProducts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name: newProductName, price: Number(newProductPrice) };
      const { data } = await createProduct(newProduct);
      setProducts([...products, data]);
      setNewProductName('');
      setNewProductPrice('');
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Nombre del Producto"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
          required
        />
        <button type="submit">Agregar Producto</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
*/