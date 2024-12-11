import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../services/api'; 
import '../styles/AddProduct.css'
import '../index.css'

const EditProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    talla:'',
    category:''
  });
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(id); 
        setProduct(productData);
      } catch (err) {
        setError('Error al obtener el producto');
        console.error('Error:', err);
      }
    };
    getProduct();
  }, [id]);

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
      const updatedProduct = await updateProduct(id, product); 
      console.log('Producto actualizado:', updatedProduct);
      navigate('/dashboard'); 
    } catch (err) {
      setError('Error al actualizar el producto');
      console.error('Error:', err);
    }
  };

  return (
    <div className="page-container">
      <h1>Editar Producto</h1>
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
          <button type="submit" className="btn-submit">Guardar cambios</button>
          <button type="button" className="btn-back" onClick={() => navigate(-1)}>Volver</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

