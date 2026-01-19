import React, { useContext, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, CardMedia, Chip, Rating, IconButton } from '@mui/material';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { NotificationContext } from '../context/NotificationContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Link as RouterLink } from 'react-router-dom';
import { ShoppingCart, FavoriteBorder, Favorite, Visibility } from '@mui/icons-material';
import QuickViewModal from './QuickViewModal';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);
  const { showNotification } = useContext(NotificationContext);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    showNotification(`${product.name} added to cart!`, 'success');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    showNotification(
      inWishlist ? 'Removed from wishlist' : 'Added to wishlist!',
      'info'
    );
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    setQuickViewOpen(true);
  };

  return (
    <Card 
      component={RouterLink}
      to={`/product/${product.id}`}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        border: '1px solid #f0f0f0',
        '&:hover': {
          transform: 'translateY(-12px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        }
      }}
    >
      {/* Wishlist button */}
      <IconButton
        onClick={handleToggleWishlist}
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          backgroundColor: 'rgba(255,255,255,0.9)',
          zIndex: 10,
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,1)',
            transform: 'scale(1.1)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        {inWishlist ? (
          <Favorite sx={{ color: '#d32f2f' }} />
        ) : (
          <FavoriteBorder sx={{ color: '#999' }} />
        )}
      </IconButton>

      <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f5f5f5', height: '280px' }}>
        <CardMedia
          component="img"
          height="280"
          image={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          sx={{
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0.7,
            '&:hover': {
              transform: 'scale(1.08)',
            }
          }}
        />
        {/* Stock Badge Overlay */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: product.stock > 5 ? '#4caf50' : '#ff9800',
          color: 'white',
          px: 1.5,
          py: 0.5,
          fontSize: '0.75rem',
          fontWeight: '700',
          borderBottomLeftRadius: '8px'
        }}>
          {product.stock > 0 ? `${product.stock} left` : 'Out'}
        </Box>
        <Chip 
          label={product.category} 
          size="small" 
          variant="filled"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: '#0d47a1',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.75rem'
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: '600', mb: 1 }}>
          {product.name}
        </Typography>
        
        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Rating value={product.rating} readOnly size="small" />
          <Typography variant="caption" color="textSecondary">
            ({product.reviews})
          </Typography>
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ minHeight: '40px', mb: 2, fontSize: '0.9rem' }}>
          {product.description}
        </Typography>
        
        {/* Stock indicator */}
        <Typography variant="caption" sx={{ color: product.stock > 5 ? '#4caf50' : '#ff9800', fontWeight: '600', mb: 1, display: 'block' }}>
          {product.stock > 5 ? '✓ In Stock' : `Only ${product.stock} left`}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: '700', fontSize: '1.25rem' }}>
            {formatCurrency(product.price)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ pt: 0, gap: 1, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<ShoppingCart />}
          sx={{
            background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
            color: 'white',
            fontWeight: '700',
            flex: 1,
            textTransform: 'none',
            fontSize: '0.95rem',
            minWidth: '150px',
            py: 1.2,
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 16px rgba(13, 71, 161, 0.3)'
            },
            '&:disabled': {
              background: '#ccc',
              color: '#666'
            }
          }}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Visibility />}
          onClick={handleQuickView}
          sx={{
            textTransform: 'none',
            fontWeight: '700',
            flex: 1,
            minWidth: '100px',
            py: 1.2,
            borderRadius: '8px',
            borderColor: '#0d47a1',
            color: '#0d47a1',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#f0f7ff',
              borderColor: '#0d47a1',
              transform: 'translateY(-2px)'
            }
          }}
        >
          Quick View
        </Button>
      </CardActions>
      <QuickViewModal 
        open={quickViewOpen} 
        product={product} 
        onClose={() => setQuickViewOpen(false)} 
      />
    </Card>
  );
};

export default React.memo(ProductCard);
