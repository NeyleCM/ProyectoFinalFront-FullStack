import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./UserContext";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
/*
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';
import { getAuth, signInWithCredential, EmailAuthProvider } from 'firebase/auth';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si el usuario ya está autenticado cuando la app se carga
  useEffect(() => {
    const checkUserAuth = async () => {
      const token = localStorage.getItem('token'); // Obtener el token desde localStorage
      const userData = localStorage.getItem('user'); // Obtener los datos del usuario si están disponibles

      if (token && userData) {
        // Si el token y el usuario existen, volvemos a autenticar el usuario
        const parsedUser = JSON.parse(userData); // Parsear los datos del usuario
        const auth = getAuth();

        try {
          const credential = EmailAuthProvider.credential(parsedUser.email, token); // Usar los datos del token para autenticar
          await signInWithCredential(auth, credential); // Autenticamos con Firebase
          setUser(parsedUser); // Actualizamos el estado del usuario
        } catch (error) {
          console.error('Error al autenticar al usuario con el token', error);
        }
      }
      setLoading(false); // Terminamos el proceso de carga
    };

    checkUserAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Guardamos los datos del usuario
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <div>Loading...</div> : children} {/* Muestra un indicador de carga mientras verificamos la sesión */
    
    /*
    }
    
      
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

*/

/*
import { createContext, useState, useEffect } from "react";
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
