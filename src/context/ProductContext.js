import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products from JSON file
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  const getRelatedProducts = (productId, limit = 4) => {
    const product = getProductById(productId);
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  };

  const searchProducts = (query) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  };

  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  };

  const getCategories = () => {
    return [...new Set(products.map(p => p.category))];
  };

  return (
    <ProductContext.Provider value={{ 
      products,
      loading,
      getProductById,
      getRelatedProducts,
      searchProducts,
      getProductsByCategory,
      getCategories
    }}>
      {children}
    </ProductContext.Provider>
  );
};
