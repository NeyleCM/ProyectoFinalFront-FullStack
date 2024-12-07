import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext"; 
import axiosConfig from "../services/axiosConfig"; 

const Profile = () => {
  const { user, logout } = useContext(UserContext);  
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserDetails = async () => {
        try {
          const response = await axiosConfig.get("/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
            },
          });
          setUserDetails(response.data);  
        } catch (err) {
          setError("Error al obtener los detalles del usuario", err);
        }
      };
      fetchUserDetails();
    }
  }, [user]);

  if (!user) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }

  return (
    <div>
      <h2>Mi Perfil</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userDetails ? (
        <div>
          <h3>Nombre: {userDetails.name}</h3>
          <p>Email: {userDetails.email}</p>
        </div>
      ) : (
        <p>Cargando detalles...</p>
      )}
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;