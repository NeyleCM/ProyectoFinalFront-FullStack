import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/useUser"; 
import { getAuth, signOut } from "firebase/auth"; 
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons';
import '../index.css'
import '../styles/Navbar.css'


const categories = ['Zarcillos', 'Bufandas', 'Anillos', 'Collares'];

const Navbar = () => {
  const { user, logout } = useUser(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth); 
      logout(); 
      localStorage.removeItem("token");
      navigate("/"); 
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);


  return (
    <>
    <nav className="navbar">
      <Link to="/" className="logo">
          <img src="https://images.vexels.com/media/users/3/300009/isolated/preview/03c91ecbc7d2d5089b09956037e5fa0d-letra-n-colorida-pintada.png?width=960" alt="Logo" className="logo-image" />
          <span className="logo-text">SHOP</span>
      </Link>

        <div className="menu-toggle" 
        onClick={toggleMenu}>
          <span className="menu-icon">
            ☰
          </span>
        </div>

        <div className={`menu-links ${isMenuOpen ? 'open' : ''}`}>
          {!user && categories.map((category) => (
            <Link 
            key={category} 
            to={`/category/${category}`}
            >
              {category}
            </Link>
          ))}

        <div className="menu-right">
          {!user && (
            <Link 
            to="/wishlist" 
            className="wishlist-link">
              <FontAwesomeIcon icon={faHeart} />
            </Link>
          )}
          {!user && 
            <Link 
            to="/login" 
            className="login-link">
            <FontAwesomeIcon icon={faUser} />
            </Link>}
            </div>
      
        {user ? (
          <>
           {location.pathname !== '/dashboard' && (
              <Link to="/dashboard">Dashboard</Link>
            )}
            {location.pathname !== '/add-product' && (
                <Link to="/add-product">Crear Producto</Link>
            )}
              <button onClick={handleLogout}>Logout</button>
          </>
          ) :  null 
        }
        </div>
    </nav>
    </>
  );
};

export default Navbar;
