import React, { useContext } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Grid, Typography, Button, Card, CardContent, Rating, Chip, Divider, Breadcrumbs, Link } from '@mui/material';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import { NotificationContext } from '../context/NotificationContext';
import ProductCard from '../components/ProductCard';
import { formatCurrency } from '../utils/formatCurrency';
import { ShoppingCart, ArrowBack, NavigateNext } from '@mui/icons-material';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getRelatedProducts } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { showNotification } = useContext(NotificationContext);

  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(id);

  if (!product) {
    return (
      <Box sx={{ backgroundColor: '#fafafa', minHeight: 'calc(100vh - 64px - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Product not found
          </Typography>
          <Button variant="contained" onClick={() => navigate('/products')} sx={{ mt: 2 }}>
            Back to Products
          </Button>
        </Card>
      </Box>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    showNotification(`${product.name} added to cart!`, 'success');
  };

  return (
    <Box sx={{ backgroundColor: '#fafafa', minHeight: 'calc(100vh - 64px - 200px)', paddingY: 6 }}>
      <Container>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 4, '& a': { textDecoration: 'none', color: '#0d47a1', fontWeight: '500', '&:hover': { textDecoration: 'underline' } } }}
        >
          <Link component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            Home
          </Link>
          <Link component={RouterLink} to="/products" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            Products
          </Link>
          <Link component={RouterLink} to={`/products?category=${product.category}`} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {product.category}
          </Link>
          <Typography sx={{ color: '#666' }}>
            {product.name}
          </Typography>
        </Breadcrumbs>

        {/* Back button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/products')}
          sx={{ mb: 4, textTransform: 'none', fontWeight: '600' }}
        >
          Back to Products
        </Button>

        {/* Product Details */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {/* Image Gallery */}
          <Grid size={{ xs: 12, md: 5}}>
            <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Card>
            {/* Image thumbnails placeholder */}
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              {[0, 1, 2].map((i) => (
                <Card 
                  key={i}
                  sx={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      border: '2px solid #0d47a1',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={`thumbnail-${i}`}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Details */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box>
              <Chip 
                label={product.category} 
                sx={{ 
                  mb: 2, 
                  backgroundColor: '#0d47a1', 
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.85rem'
                }} 
              />
              <Typography variant="h3" gutterBottom sx={{ fontWeight: '800', mb: 2, color: '#1a1a1a' }}>
                {product.name}
              </Typography>

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Rating value={product.rating} readOnly precision={0.1} size="large" />
                <Typography variant="body2" color="textSecondary" sx={{ fontWeight: '500' }}>
                  {product.rating} ({product.reviews} reviews)
                </Typography>
              </Box>

              {/* Price */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>Price</Typography>
                <Typography variant="h3" color="primary" sx={{ fontWeight: '800' }}>
                  {formatCurrency(product.price)}
                </Typography>
              </Box>

              {/* Stock */}
              <Box sx={{ mb: 3, p: 2, backgroundColor: product.stock > 5 ? '#e8f5e9' : '#fff3e0', borderRadius: '8px', border: `1px solid ${product.stock > 5 ? '#c8e6c9' : '#ffe0b2'}` }}>
                <Typography variant="body2" sx={{ fontWeight: '600', color: product.stock > 5 ? '#2e7d32' : '#e65100' }}>
                  {product.stock > 5 ? '✓ In Stock' : `⚠ Only ${product.stock} left`}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Description */}
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: '#555' }}>
                {product.fullDescription}
              </Typography>

              {/* Specs */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', color: '#1a1a1a' }}>
                  ✓ Key Features
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {product.specs.map((spec, idx) => (
                    <Chip 
                      key={idx} 
                      label={spec} 
                      variant="outlined"
                      sx={{
                        borderColor: '#0d47a1',
                        color: '#0d47a1',
                        fontWeight: '500',
                        '&:hover': {
                          backgroundColor: '#e3f2fd'
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Add to Cart */}
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                sx={{
                  background: product.stock === 0 
                    ? '#ccc' 
                    : 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
                  padding: '14px 40px',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  fontWeight: '600',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(13, 71, 161, 0.3)'
                  }
                }}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Reviews */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: '700', mb: 3, color: '#1a1a1a', fontSize: '1.8rem' }}>
            💬 Customer Reviews
          </Typography>
          <Grid container spacing={2}>
            {product.reviews_data && product.reviews_data.length > 0 ? (
              product.reviews_data.map(review => (
                <Grid size={{ xs: 12 }} key={review.id}>
                  <Card sx={{ 
                    borderRadius: '12px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                    }
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: '700', color: '#1a1a1a' }}>
                            {review.author}
                          </Typography>
                          <Rating value={review.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                        </Box>
                      </Box>
                      <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.6 }}>
                        {review.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12 }}>
                <Card sx={{ p: 4, textAlign: 'center', backgroundColor: '#f5f5f5', border: 'none' }}>
                  <Typography color="textSecondary">
                    No reviews yet. Be the first to review this product!
                  </Typography>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: '700', mb: 4, color: '#1a1a1a', fontSize: '1.8rem' }}>
              🔗 Related Products
            </Typography>
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gap: '24px',
                width: '100%'
              }}
            >
              {relatedProducts.slice(0, 4).map(prod => (
                <Box key={prod.id} sx={{ display: 'flex' }}>
                  <ProductCard product={prod} />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductDetail;
