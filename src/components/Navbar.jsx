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
      navigate("/"); 
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };
  return (
    <>
    <nav className="navbar">
        {location.pathname  !== '/' &&
          <Link to="/">Home</Link>
        }

        {!user && categories.map((category) => (
          <Link key={category} to={`/category/${category}`}>{category}</Link>
        ))}

        {!user && <Link to="/wishlist">Mi Lista de Deseos</Link>}
      
        {user ? (
          <>
           {location.pathname !== '/dashboard' && 
              <Link to="/dashboard">Dashboard</Link>
            }
              <Link to="/add-product">Crear Producto</Link>
              <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <div>
            <Link to="/login">Login</Link>
          </div>
        )}
    </nav>
    </>
  );
};

export default Navbar;
