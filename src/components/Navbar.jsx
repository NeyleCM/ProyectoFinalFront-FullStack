import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/useUser"; 
import { getAuth, signOut } from "firebase/auth"; 

const categories = ['Zarcillos', 'Bufandas', 'Anillos', 'Collares'];

const Navbar = () => {
  const { user, logout } = useUser(); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth); 
      logout(); 
      localStorage.removeItem("token");
      navigate("/login"); 
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };
  return (
    <>
    <nav className="navbar">
        {/*{window.location.pathname*/} 
        {location.pathname  !== '/' &&
          <Link to="/">Home</Link>
        }
        
        <Link to="/wishlist">Mi Lista de Deseos</Link>

        {categories.map((category) => (
          <Link key={category} to={`/category/${category}`}>{category}</Link>
        ))}
      
        {user ? (
          <>
           {/*{window.location.pathname*/}
           {location.pathname !== '/dashboard' && 
              <Link to="/dashboard">Dashboard</Link>
            }
              <Link to="/add-product">Crear Producto</Link>
              <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
    </nav>
    </>
  );
};

export default Navbar;
/*
import { Link, useNavigate } from "react-router-dom"; // Para navegación
import { useContext } from "react"; // Para consumir el UserContext
import { UserContext } from "../context/UserContext"; // Contexto del usuario
import "../App.css"; // Estilos específicos del Navbar

const Navbar = () => {
  const { user, setUser } = useContext(UserContext); // Acceso al estado del usuario
  const navigate = useNavigate(); // Para redirigir al usuario

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setUser(null); // Reseteamos el estado del usuario
    localStorage.removeItem("token"); // Removemos el token almacenado
    navigate("/login"); // Redirigimos a la página de inicio de sesión
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          MyApp
        </Link>

        {/* Opciones del menú de navegación *//*}
        <ul className="navbar__menu">
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              Home
            </Link>
          </li>
          {user ? (
            <>
              {/* Si el usuario está autenticado *//*}
              <li className="navbar__item">
                <Link to="/dashboard" className="navbar__link">
                  Dashboard
                </Link>
              </li>
              <li className="navbar__item">
                <button className="navbar__link navbar__button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Si el usuario no está autenticado *//*}
              <li className="navbar__item">
                <Link to="/login" className="navbar__link">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

*/