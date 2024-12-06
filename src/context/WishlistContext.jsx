import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Al cargar la página, obtener la lista de deseos desde el localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  // Guardar la lista de deseos en el localStorage cuando cambie
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Función para agregar productos a la lista de deseos
  const addToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
  };

  // Función para eliminar productos de la lista de deseos
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};