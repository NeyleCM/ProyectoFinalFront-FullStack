import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";
import axiosConfig from "../services/axiosConfig"; 

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const response = await axiosConfig.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
          setUser(null); 
        }
      } else {
        setUser(null); 
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = (userData) => setUser(userData); 
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null); 
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/*
import { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import { UserContext } from "./UserContext";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    
    const token = localStorage.getItem("token");

    if (token) {
      auth.currentUser?.getIdToken().then(() => {
        setUser(auth.currentUser); 
      });
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); 
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
*/

/*
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

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
*/