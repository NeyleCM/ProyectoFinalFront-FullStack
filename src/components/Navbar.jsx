import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser"; // Importa el hook personalizado
import "../App.css"; // Estilos específicos del Navbar

const Navbar = () => {
  const { user, logout } = useUser(); // Accede al estado y las funciones del contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Cerrar sesión utilizando el contexto
    localStorage.removeItem("token"); // Eliminar token si existe
    navigate("/login"); // Redirigir a la página de login
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          MyApp
        </Link>

        <ul className="navbar__menu">
          <li className="navbar__item">
            <Link to="/" className="navbar__link">Home</Link>
          </li>
          {user ? (
            <>
              <li className="navbar__item">
                <Link to="/dashboard" className="navbar__link">Dashboard</Link>
              </li>
              <li className="navbar__item">
                <button className="navbar__link navbar__button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="navbar__item">
              <Link to="/login" className="navbar__link">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
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