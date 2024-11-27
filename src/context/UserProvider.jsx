import { useState } from "react";
import PropTypes from "prop-types"; // Importar prop-types
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Validar las props
UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'children' debe ser un nodo React válido
};