import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser"; 
import "../App.css"; 

const Navbar = () => {
  const { user, logout } = useUser(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <>
    <nav className="navbar">
         <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-product">Agregar Producto</Link></li>
        {user ? (
          <li><button onClick={handleLogout}>Logout</button></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
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