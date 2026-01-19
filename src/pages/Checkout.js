import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, TextField, Grid, Card, CardContent, Divider, Stepper, Step, StepLabel, Alert, Chip } from '@mui/material';
import { CartContext } from '../context/CartContext';
import { NotificationContext } from '../context/NotificationContext';
import { DiscountContext } from '../context/DiscountContext';
import { UserContext } from '../context/UserContext';
import { formatCurrency } from '../utils/formatCurrency';
import { LocalOffer, Close } from '@mui/icons-material';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const { showNotification } = useContext(NotificationContext);
  const { appliedCoupon, discountAmount, applyCoupon, removeCoupon } = useContext(DiscountContext);
  const { addOrder, isAuthenticated } = useContext(UserContext);
  const [activeStep, setActiveStep] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'mpesa'
  });
  const [errors, setErrors] = useState({});

  const steps = ['Shipping', 'Payment', 'Review'];

  if (cartItems.length === 0) {
    return (
      <Box sx={{ backgroundColor: '#fafafa', minHeight: 'calc(100vh - 64px - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ p: 4, textAlign: 'center', maxWidth: '500px' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: '600', mb: 3 }}>
            Your cart is empty
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/products')}
            sx={{
              background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
              textTransform: 'none',
              fontWeight: '600'
            }}
          >
            Continue Shopping
          </Button>
        </Card>
      </Box>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && validateForm()) {
      setActiveStep(1);
    } else if (activeStep === 1) {
      setActiveStep(2);
    }
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      // Simulate order placement
      clearCart();
      showNotification('Order placed successfully! Your order number is #ORD-2026-001', 'success');
      setTimeout(() => {
        navigate('/order-confirmation', { state: { orderTotal: getTotalPrice() } });
      }, 1500);
    }
  };

  const handleApplyCoupon = () => {
    const subtotal = getTotalPrice();
    const result = applyCoupon(couponCode, subtotal);
    if (result.success) {
      showNotification(result.message, 'success');
      setCouponCode('');
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    showNotification('Coupon removed', 'info');
  };

  return (
    <Box sx={{ backgroundColor: '#fafafa', minHeight: 'calc(100vh - 64px - 200px)', paddingY: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: '700', mb: 1, color: '#1a1a1a' }}>
          🛍️ Complete Your Order
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
          You're {steps.length - activeStep} step{steps.length - activeStep !== 1 ? 's' : ''} away from completing your purchase
        </Typography>

        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            mb: 4,
            '& .MuiStepLabel-label': {
              fontWeight: '500',
              fontSize: '0.95rem'
            },
            '& .MuiStepIcon-root.Mui-active': {
              color: '#0d47a1'
            },
            '& .MuiStepIcon-root.Mui-completed': {
              color: '#4caf50'
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ p: 4 }}>
                {activeStep === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', mb: 3, color: '#1a1a1a' }}>
                      📍 Shipping Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          error={!!errors.firstName}
                          helperText={errors.firstName}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          error={!!errors.lastName}
                          helperText={errors.lastName}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          error={!!errors.phone}
                          helperText={errors.phone}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          error={!!errors.address}
                          helperText={errors.address}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          error={!!errors.city}
                          helperText={errors.city}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Postal Code"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          error={!!errors.postalCode}
                          helperText={errors.postalCode}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', mb: 3, color: '#1a1a1a' }}>
                      💳 Select Payment Method
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        { id: 'mpesa', label: 'M-Pesa', icon: '📱' },
                        { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                        { id: 'bank', label: 'Bank Transfer', icon: '🏦' }
                      ].map(method => (
                        <Grid size={{ xs: 12, sm: 6 }} key={method.id}>
                          <Card
                            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                            sx={{
                              cursor: 'pointer',
                              border: formData.paymentMethod === method.id ? '2px solid #0d47a1' : '2px solid #ddd',
                              backgroundColor: formData.paymentMethod === method.id ? '#f0f7ff' : '#fff',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <CardContent sx={{ textAlign: 'center', py: 4 }}>
                              <Typography variant="h3" sx={{ mb: 1 }}>
                                {method.icon}
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: '600' }}>
                                {method.label}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                    <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                      <Typography variant="body2" color="textSecondary">
                        💡 <strong>M-Pesa:</strong> Fastest and most convenient payment method
                      </Typography>
                    </Box>
                  </Box>
                )}

                {activeStep === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', mb: 3, color: '#1a1a1a' }}>
                      ✓ Review Your Order
                    </Typography>
                    <Box sx={{ mb: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
                      <Typography variant="body2" sx={{ fontWeight: '700', mb: 1, color: '#0d47a1' }}>
                        📍 Shipping To:
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.postalCode}<br />
                        {formData.email} | {formData.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 3, p: 2, backgroundColor: '#f3e5f5', borderRadius: '8px' }}>
                      <Typography variant="body2" sx={{ fontWeight: '700', mb: 1, color: '#7b1fa2' }}>
                        💳 Payment Method:
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {formData.paymentMethod === 'mpesa' && 'M-Pesa'}
                        {formData.paymentMethod === 'card' && 'Credit/Debit Card'}
                        {formData.paymentMethod === 'bank' && 'Bank Transfer'}
                      </Typography>
                    </Box>
                  </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                  {activeStep === 2 ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handlePlaceOrder}
                      sx={{ fontWeight: '600', textTransform: 'none' }}
                    >
                      Place Order
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
                        fontWeight: '600',
                        textTransform: 'none'
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', position: 'sticky', top: 80 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', mb: 2, color: '#1a1a1a' }}>
                  📦 Order Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 3 }}>
                  {cartItems.map(item => (
                    <Box key={item.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                      <Typography variant="body2" sx={{ fontWeight: '600', color: '#1a1a1a' }}>
                        {item.name}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="caption" color="textSecondary">
                          {item.quantity}x {formatCurrency(item.price)}
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: '700', color: '#0d47a1' }}>
                          {formatCurrency(item.price * item.quantity)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ mb: 2 }} />

                {/* Coupon Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: '700', mb: 1.5, color: '#1a1a1a' }}>
                    <LocalOffer sx={{ mr: 1, fontSize: '1rem', verticalAlign: 'middle' }} />
                    Promo Code
                  </Typography>
                  {appliedCoupon ? (
                    <Box sx={{ 
                      p: 2, 
                      backgroundColor: '#e8f5e9', 
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2
                    }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: '700', color: '#2e7d32' }}>
                          ✓ {appliedCoupon.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Code: {appliedCoupon.code}
                        </Typography>
                      </Box>
                      <Button 
                        size="small" 
                        onClick={handleRemoveCoupon}
                        sx={{ minWidth: 'unset' }}
                      >
                        <Close sx={{ fontSize: '1.2rem' }} />
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            fontSize: '0.9rem'
                          }
                        }}
                      />
                      <Button 
                        variant="outlined" 
                        onClick={handleApplyCoupon}
                        size="small"
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        Apply
                      </Button>
                    </Box>
                  )}
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                    💡 Try: SAVE10, SAVE20, WELCOME
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Subtotal:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: '600' }}>
                      {formatCurrency(getTotalPrice())}
                    </Typography>
                  </Box>
                  {discountAmount > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: '#d32f2f' }}>Discount:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: '600', color: '#d32f2f' }}>
                        -{formatCurrency(discountAmount)}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">Shipping:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: '600', color: '#4caf50' }}>
                      FREE
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: '700' }}>
                    Total:
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: '700' }}>
                    {formatCurrency(getTotalPrice() - discountAmount)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
