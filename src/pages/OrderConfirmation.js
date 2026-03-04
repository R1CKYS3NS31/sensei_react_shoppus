import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Card, CardContent, Grid, Divider } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { formatCurrency } from '../utils/formatCurrency';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const orderDetails = {
    orderNumber: '#ORD-2026-001',
    orderDate: new Date().toLocaleDateString('en-KE'),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-KE'),
    total: 28497,
    trackingId: 'TRK-2026-KE-001'
  };

  return (
    <Box sx={{ backgroundColor: '#fafafa', minHeight: 'calc(100vh - 64px - 200px)', paddingY: 6 }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CheckCircle sx={{ fontSize: '5rem', color: '#4caf50', mb: 2, filter: 'drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))' }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: '800', mb: 1, color: '#1a1a1a' }}>
            ✓ Order Confirmed!
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
            Thank you for your purchase. Your order has been placed successfully and is being prepared for shipment.
          </Typography>
        </Box>

        <Card sx={{ 
          borderRadius: '16px', 
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)', 
          mb: 3,
          border: '2px solid #e8f5e9'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Box sx={{ textAlign: 'center', mb: 2, p: 2, backgroundColor: '#f0f7ff', borderRadius: '10px' }}>
                  <Typography variant="h6" sx={{ fontWeight: '700', color: '#0d47a1', mb: 0.5 }}>
                    {orderDetails.orderNumber}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: '500' }}>
                    Order placed on {orderDetails.orderDate}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Divider />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1, fontWeight: '700', textTransform: 'uppercase' }}>
                  💰 Order Total
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: '800', color: '#0d47a1' }}>
                  {formatCurrency(orderDetails.total)}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1, fontWeight: '700', textTransform: 'uppercase' }}>
                  📦 Estimated Delivery
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: '800', color: '#4caf50' }}>
                  {orderDetails.estimatedDelivery}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Divider />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Box sx={{ p: 3, backgroundColor: '#f0f7ff', borderRadius: '10px', borderLeft: '4px solid #0d47a1' }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1, fontWeight: '700', textTransform: 'uppercase' }}>
                    🔍 Tracking Number
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: '700', fontFamily: 'monospace', fontSize: '1.05rem', letterSpacing: '1px', color: '#0d47a1' }}>
                    {orderDetails.trackingId}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ 
          borderRadius: '16px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
          mb: 4,
          backgroundColor: '#f5f5f5'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', mb: 3, color: '#1a1a1a' }}>
              🎯 What's Next?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: '500' }}>
                ✓ You will receive an order confirmation email shortly
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: '500' }}>
                ✓ Track your package using your tracking number
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: '500' }}>
                ✓ Standard delivery takes 2-3 business days
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: '500' }}>
                ✓ Contact support for any questions
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, mb: 4 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
              textTransform: 'none',
              fontWeight: '700',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(13, 71, 161, 0.3)'
              }
            }}
          >
            Back to Home
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/products')}
            sx={{
              textTransform: 'none',
              fontWeight: '700',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '1rem',
              borderColor: '#0d47a1',
              color: '#0d47a1',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#e3f2fd',
                borderColor: '#0d47a1'
              }
            }}
          >
            Continue Shopping
          </Button>
        </Box>

        <Box sx={{ p: 3, backgroundColor: '#e3f2fd', borderRadius: '12px', border: '2px solid #90caf9', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2, fontWeight: '600' }}>
            Need help? Contact our support team
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '700', color: '#0d47a1' }}>
            📧 support@shophub.ke | 📱 +254 (0) 712 345678
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default OrderConfirmation;
