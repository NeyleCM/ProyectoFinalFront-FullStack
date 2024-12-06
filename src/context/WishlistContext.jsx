import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const addToWishlist = (product) => {
    const isAlreadyInWishlist = wishlist.some((item) => item._id === product._id);

    if (!isAlreadyInWishlist) {
      setWishlist((prev) => [...prev, product]);
    } else {
      console.log('El producto ya está en la lista de deseos');
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((product) => product._id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]); 
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
