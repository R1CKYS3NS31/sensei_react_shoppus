import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Badge, Box, Button, IconButton, Menu, MenuItem, Avatar, InputBase, Divider } from '@mui/material';
import { ShoppingCart, Favorite, Search, ExpandMore } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { UserContext } from '../context/UserContext';
import { ProductContext } from '../context/ProductContext';

const Header = () => {
  const { getTotalItems } = useContext(CartContext);
  const { getWishlistCount } = useContext(WishlistContext);
  const { user, isAuthenticated, logout } = useContext(UserContext);
  const { getCategories } = useContext(ProductContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categoryAnchorEl, setCategoryAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryOpen = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <AppBar position="static" sx={{ 
      background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '12px 24px', gap: 3 }}>
        {/* Logo */}
        <Typography 
          variant="h5" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            textDecoration: 'none', 
            color: 'white', 
            fontWeight: '800',
            letterSpacing: '0.5px',
            fontSize: { xs: '1.3rem', md: '1.5rem' },
            whiteSpace: 'nowrap',
            '&:hover': {
              opacity: 0.9,
              transition: 'opacity 0.3s ease'
            }
          }}
        >
          🛍️ Shoppus
        </Typography>
        
        {/* Search Bar */}
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: '24px',
          padding: '8px 16px',
          flex: 1,
          maxWidth: '400px',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.25)',
          },
          transition: 'background-color 0.3s ease'
        }}>
          <Search sx={{ color: 'white', mr: 1, opacity: 0.7 }} />
          <InputBase
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
            sx={{
              color: 'white',
              flex: 1,
              '& ::placeholder': {
                color: 'rgba(255,255,255,0.6)',
                opacity: 1,
              },
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 0, alignItems: 'center' }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{
              fontSize: '0.95rem',
              textTransform: 'none',
              fontWeight: '600',
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '4px'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Home
          </Button>

          {/* Category Dropdown */}
          <Button
            color="inherit"
            onClick={handleCategoryOpen}
            endIcon={<ExpandMore />}
            sx={{
              fontSize: '0.95rem',
              textTransform: 'none',
              fontWeight: '600',
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '4px'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Categories
          </Button>
          <Menu
            anchorEl={categoryAnchorEl}
            open={Boolean(categoryAnchorEl)}
            onClose={handleCategoryClose}
            PaperProps={{ sx: { borderRadius: '8px', mt: 1.5 } }}
          >
            <MenuItem 
              component={RouterLink} 
              to="/products"
              onClick={handleCategoryClose}
              sx={{ fontWeight: '500' }}
            >
              All Products
            </MenuItem>
            <Divider />
            {getCategories().map(cat => (
              <MenuItem 
                key={cat}
                component={RouterLink} 
                to={`/products?category=${cat}`}
                onClick={handleCategoryClose}
                sx={{ fontWeight: '500' }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ))}
          </Menu>

          {/* Wishlist */}
          <IconButton 
            color="inherit" 
            component={RouterLink} 
            to="/wishlist"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '50%'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Badge badgeContent={getWishlistCount()} color="error" sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff6b6b', fontSize: '0.7rem', fontWeight: '600' } }}>
              <Favorite />
            </Badge>
          </IconButton>

          {/* Cart */}
          <IconButton 
            color="inherit" 
            component={RouterLink} 
            to="/cart" 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '50%'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Badge badgeContent={getTotalItems()} color="error" sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff6b6b', fontSize: '0.7rem', fontWeight: '600' } }}>
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* User Menu */}
          {isAuthenticated && user ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ p: 0, ml: 1 }}
              >
                <Avatar
                  alt={user.name}
                  src={user.avatar}
                  sx={{ width: 36, height: 36, border: '2px solid white', cursor: 'pointer', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { 
                    borderRadius: '12px',
                    mt: 1.5,
                    minWidth: '200px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    '& .MuiMenuItem-root': {
                      fontWeight: '500'
                    }
                  }
                }}
              >
                <MenuItem disabled sx={{ fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>
                  👤 {user.name}
                </MenuItem>
                <MenuItem disabled sx={{ fontSize: '0.75rem', color: '#999' }}>
                  {user.email}
                </MenuItem>
                <Divider />
                <MenuItem
                  component={RouterLink}
                  to="/account"
                  onClick={handleMenuClose}
                >
                  My Account
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{ color: '#d32f2f', fontWeight: '600' }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/login"
              sx={{
                textTransform: 'none',
                fontWeight: '700',
                ml: 1,
                backgroundColor: 'rgba(255,255,255,0.2)',
                px: 2.5,
                py: 1,
                borderRadius: '6px',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.3)',
                }
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
