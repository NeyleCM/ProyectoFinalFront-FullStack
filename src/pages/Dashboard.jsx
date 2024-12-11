import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api'; 
import { useNavigate } from 'react-router-dom';
import '../index.css'
import '../styles/Dashboard.css';

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
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard - Categorías</h1>
        {error && <p className="dashboard-error">{error}</p>}
  
        {categories.length === 0 ? (
          <p>No hay categorías disponibles</p>
        ) : (
          <div className="dashboard-grid">
            {categories.map((category, index) => (
              <div className="dashboard-card" key={index}>
                <img 
                  src={`https://via.placeholder.com/300x200?text=${category}`}
                  alt={category} 
                  className="dashboard-card-img" 
                />
                <div className="dashboard-card-body">
                  <h5 className="dashboard-card-title">{category}</h5>
                  <button className="dashboard-btn" onClick={() => handleCategoryClick(category)}>
                    Ver productos
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Dashboard;
