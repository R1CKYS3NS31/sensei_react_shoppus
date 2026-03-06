import React, { useContext } from 'react';
import { Container, Box, Typography, Button, Card, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { FavoriteBorderOutlined, ShoppingCart, Close } from '@mui/icons-material';

const Wishlist = () => {
  const { wishlistItems, clearWishlist } = useContext(WishlistContext);

  if (wishlistItems.length === 0) {
    return (
      <Box sx={{ backgroundColor: '#fafafa', minHeight: 'calc(100vh - 64px - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          p: 5,
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <FavoriteBorderOutlined sx={{ fontSize: '5rem', color: '#ddd', mb: 2, opacity: 0.7 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: '700', color: '#1a1a1a' }}>
            Your wishlist is empty
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Add items to your wishlist to save them for later and get notified when they go on sale!
          </Typography>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/products"
            startIcon={<ShoppingCart />}
            sx={{
              background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
              textTransform: 'none',
              fontWeight: '600',
              padding: '10px 30px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(13, 71, 161, 0.3)'
              }
            }}
          >
            Continue Shopping
          </Button>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#fafafa', minHeight: 'calc(100vh - 64px - 200px)', paddingY: 6 }}>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: '700', color: '#1a1a1a', mb: 1 }}>
              ❤️ My Wishlist
            </Typography>
            <Chip 
              label={`${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} saved`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Close />}
            onClick={clearWishlist}
            sx={{ 
              textTransform: 'none', 
              fontWeight: '600',
              borderColor: '#ef5350',
              color: '#ef5350',
              '&:hover': {
                backgroundColor: '#ffebee',
                borderColor: '#ef5350'
              }
            }}
          >
            Clear Wishlist
          </Button>
        </Box>

        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: '24px',
            width: '100%'
          }}
        >
          {wishlistItems.map(product => (
            <Box key={product.id} sx={{ display: 'flex' }}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Wishlist;
