import React, { createContext, useState, useCallback, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
    setInitialized(true);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (initialized) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, initialized]);

  const addToWishlist = useCallback((product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.find(item => item.id === product.id);
      if (exists) return prevItems;
      return [...prevItems, { ...product }];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some(item => item.id === productId);
  }, [wishlistItems]);

  const toggleWishlist = useCallback((product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
        getWishlistCount: () => wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
