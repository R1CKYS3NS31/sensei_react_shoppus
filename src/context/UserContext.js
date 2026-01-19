import React, { createContext, useState, useCallback, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedOrders = localStorage.getItem('orderHistory');
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }

    if (savedOrders) {
      try {
        setOrderHistory(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Error loading order history:', error);
      }
    }
    
    setInitialized(true);
  }, []);

  const login = useCallback((email, password) => {
    // Simulate login
    const userData = {
      id: 'user_' + Date.now(),
      email,
      name: email.split('@')[0],
      joinDate: new Date().toLocaleDateString(),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return { success: true, message: 'Login successful!' };
  }, []);

  const signup = useCallback((email, password, name) => {
    // Simulate signup
    const userData = {
      id: 'user_' + Date.now(),
      email,
      name,
      joinDate: new Date().toLocaleDateString(),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return { success: true, message: 'Account created successfully!' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  }, []);

  const addOrder = useCallback((orderData) => {
    const order = {
      id: 'ORD_' + Date.now(),
      ...orderData,
      date: new Date().toLocaleDateString(),
      status: 'Processing'
    };
    
    setOrderHistory(prev => [order, ...prev]);
    localStorage.setItem('orderHistory', JSON.stringify([order, ...orderHistory]));
    
    return order;
  }, [orderHistory]);

  const updateProfile = useCallback((updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        orderHistory,
        login,
        signup,
        logout,
        addOrder,
        updateProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
