import { useState } from 'react';
import { createProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../index.css'
import '../styles/AddProduct.css'
const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '', 
    stock:''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const successMessage = await createProduct(product);
      
      alert(successMessage); 
      
      navigate('/dashboard');
  
    } catch (err) {
      setError('Error al crear el producto');
      console.error('Error:', err);
    }
  };

  return (
    <div className="page-container">
      <h1>Crear Producto</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Producto</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <label>Categoría</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="Zarcillos">Zarcillos</option>
            <option value="Bufandas">Bufandas</option>
            <option value="Anillos">Anillos</option>
            <option value="Collares">Collares</option>
          </select>
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-submit">Crear Producto</button>
          <button type="button" className="btn-back" onClick={() => navigate(-1)}>Volver</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

