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
        const uniqueCategories = [...new Set(data.map(product => product.category))];
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
    <>
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
    </>
  );
};

export default Dashboard;
