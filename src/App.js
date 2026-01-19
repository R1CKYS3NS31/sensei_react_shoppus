import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import { WishlistProvider } from './context/WishlistContext';
import { UserProvider } from './context/UserContext';
import { DiscountProvider } from './context/DiscountContext';
import Header from './components/Header';
import Footer from './components/Footer';
import NotificationStack from './components/NotificationStack';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <UserProvider>
            <DiscountProvider>
              <NotificationProvider>
                <Router>
                  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Header />
                    <Box sx={{ flex: 1 }}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/login" element={<Login />} />
                      </Routes>
                    </Box>
                    <Footer />
                  </Box>
                  <NotificationStack />
                </Router>
              </NotificationProvider>
            </DiscountProvider>
          </UserProvider>
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
