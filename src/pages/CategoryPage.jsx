import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory } from '../services/api';

const CategoryPage = () => {
  const { category } = useParams();  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1>Productos en la categoría: {category}</h1>
      {error && <p>{error}</p>}
      {products.length === 0 ? (
        <p>No se encontraron productos en esta categoría</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name} - ${product.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPage;