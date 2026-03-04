import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogTitle, Box, Typography, Button, Grid, Rating, Chip, IconButton, Divider } from '@mui/material';
import { Close, ShoppingCart, FavoriteBorder, Favorite } from '@mui/icons-material';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { NotificationContext } from '../context/NotificationContext';
import { formatCurrency } from '../utils/formatCurrency';

const QuickViewModal = ({ open, product, onClose }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { showNotification } = useContext(NotificationContext);

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product);
      showNotification(`${product.name} added to cart`, 'success');
    }
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showNotification(
      isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist',
      'success'
    );
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px'
        }
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 3,
        fontWeight: '600'
      }}>
        Quick View
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>

          {/* Product Info */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h5" sx={{ fontWeight: '700', mb: 1 }}>
              {product.name}
            </Typography>
            
            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
              <Rating value={product.rating} readOnly precision={0.1} size="small" />
              <Typography variant="body2" color="textSecondary">
                {product.rating} ({product.reviews_count} reviews)
              </Typography>
            </Box>

            {/* Price and Stock */}
            <Typography variant="h4" color="primary" sx={{ fontWeight: '700', mb: 1 }}>
              {formatCurrency(product.price)}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Chip
                label={product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                color={product.stock > 0 ? 'success' : 'error'}
                variant="outlined"
                size="small"
              />
            </Box>

            {/* Description */}
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3, lineHeight: 1.6 }}>
              {product.description}
            </Typography>

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: '600', mb: 1 }}>
                  Specifications:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {product.specs.map((spec, idx) => (
                    <Chip key={idx} label={spec} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                sx={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
                  textTransform: 'none',
                  fontWeight: '600',
                  py: 1.5
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                onClick={handleToggleWishlist}
                sx={{
                  borderColor: '#ddd',
                  color: inWishlist ? '#d32f2f' : 'inherit',
                  px: 2
                }}
              >
                {inWishlist ? (
                  <Favorite sx={{ color: '#d32f2f' }} />
                ) : (
                  <FavoriteBorder />
                )}
              </Button>
            </Box>

            {/* Additional Info */}
            <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                ✓ Free shipping on orders over KES 5,000
              </Typography>
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                ✓ 30-day money back guarantee
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
