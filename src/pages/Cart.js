import React, { useContext } from 'react';
import { Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Card, CardContent, Divider, Grid, Chip } from '@mui/material';
import { CartContext } from '../context/CartContext';
import { Link as RouterLink } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import { ShoppingCartOutlined, DeleteOutline, ArrowBack, LocalShipping } from '@mui/icons-material';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <Box sx={{ minHeight: 'calc(100vh - 64px - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa', py: 6 }}>
        <Card sx={{
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          p: 5,
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <ShoppingCartOutlined sx={{ fontSize: '5rem', color: '#ddd', mb: 2, opacity: 0.7 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: '700', color: '#1a1a1a' }}>
            Your cart is empty
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Looks like you haven't added any products yet. Start shopping to add items to your cart!
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={RouterLink} 
            to="/products"
            startIcon={<ArrowBack />}
            sx={{
              background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
              textTransform: 'none',
              fontWeight: '700',
              padding: '12px 40px',
              borderRadius: '8px',
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
    <Box sx={{ backgroundColor: '#fafafa', minHeight: 'calc(100vh - 64px - 200px)', paddingY: 5 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: '700', color: '#1a1a1a' }}>
            🛒 Shopping Cart
          </Typography>
          <Chip 
            label={`${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in cart`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
        
        <Grid container spacing={3}>
          {/* Products Table */}
          <Grid size={{ xs: 12, md: 8 }}>
            <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.95rem' }}>Product</TableCell>
                    <TableCell align="right" sx={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.95rem' }}>Price</TableCell>
                    <TableCell align="center" sx={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.95rem' }}>Qty</TableCell>
                    <TableCell align="right" sx={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.95rem' }}>Total</TableCell>
                    <TableCell align="right" sx={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.95rem' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map(item => (
                    <TableRow key={item.id} sx={{ 
                      '&:hover': { backgroundColor: '#f9f9f9' },
                      borderBottom: '1px solid #e0e0e0'
                    }}>
                      <TableCell sx={{ fontWeight: '500', py: 2 }}>{item.name}</TableCell>
                      <TableCell align="right" sx={{ py: 2 }}>{formatCurrency(item.price)}</TableCell>
                      <TableCell align="center" sx={{ py: 2 }}>
                        <TextField
                          type="number"
                          inputProps={{ min: 1, max: 100 }}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          size="small"
                          variant="outlined"
                          sx={{ width: '70px', textAlign: 'center' }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: '700', color: '#0d47a1', py: 2 }}>
                        {formatCurrency(item.price * item.quantity)}
                      </TableCell>
                      <TableCell align="right" sx={{ py: 2 }}>
                        <Button
                          variant="text"
                          color="error"
                          size="small"
                          startIcon={<DeleteOutline />}
                          onClick={() => removeFromCart(item.id)}
                          sx={{
                            textTransform: 'none',
                            fontWeight: '600',
                            '&:hover': {
                              backgroundColor: '#ffebee'
                            }
                          }}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Order Summary Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              position: 'sticky',
              top: 80
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', color: '#1a1a1a', mb: 2 }}>
                  Order Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Free Shipping Info */}
                <Box sx={{ 
                  mb: 2, 
                  p: 2, 
                  backgroundColor: '#e8f5e9', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1
                }}>
                  <LocalShipping sx={{ color: '#4caf50', fontSize: '1.2rem' }} />
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: '700', color: '#2e7d32', display: 'block' }}>
                      ✓ Free Shipping
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#2e7d32' }}>
                      On orders over KES 5,000
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>Subtotal:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: '600' }}>
                      {formatCurrency(getTotalPrice())}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="body2">Shipping:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: '600', color: '#4caf50' }}>
                      FREE
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, pb: 3, borderBottom: '2px solid #eee' }}>
                    <Typography variant="h6" sx={{ fontWeight: '700' }}>Total:</Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: '700', fontSize: '1.3rem' }}>
                      {formatCurrency(getTotalPrice())}
                    </Typography>
                  </Box>
                </Box>
                <Button 
                  variant="contained" 
                  color="success" 
                  fullWidth
                  component={RouterLink}
                  to="/checkout"
                  sx={{
                    fontWeight: '600',
                    padding: '12px',
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderRadius: '8px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 16px rgba(76, 175, 80, 0.3)'
                    }
                  }}
                >
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth
                  component={RouterLink} 
                  to="/products"
                  sx={{
                    mt: 2,
                    fontWeight: '600',
                    padding: '12px',
                    textTransform: 'none',
                    borderRadius: '8px'
                  }}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
