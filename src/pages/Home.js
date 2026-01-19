import React, { useContext, useState } from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent, TextField, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LocalShipping, Lock, Headset, Email, ArrowRight, LocalFireDepartment, Star, TrendingUp } from '@mui/icons-material';
import { ProductContext } from '../context/ProductContext';
import { NotificationContext } from '../context/NotificationContext';
import ProductCard from '../components/ProductCard';
import TestimonialsSection from '../components/TestimonialsSection';

const Home = () => {
  const { products } = useContext(ProductContext);
  const { showNotification } = useContext(NotificationContext);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSignup = () => {
    if (!email.trim()) {
      showNotification('Please enter a valid email address', 'warning');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification('Please enter a valid email address', 'warning');
      return;
    }
    
    setIsSubscribing(true);
    setTimeout(() => {
      showNotification('✓ You have been subscribed to our newsletter!', 'success');
      setEmail('');
      setIsSubscribing(false);
    }, 800);
  };

  return (
    <Box sx={{ backgroundColor: '#fafafa' }}>
      {/* Flash Banner */}
      <Box sx={{
        background: 'linear-gradient(90deg, #ff6f00 0%, #ff8f00 100%)',
        color: 'white',
        padding: '12px 20px',
        textAlign: 'center',
        animation: 'slideDown 0.5s ease-out',
        '@keyframes slideDown': {
          from: { transform: 'translateY(-100%)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 }
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <LocalFireDepartment sx={{ fontSize: '1.2rem' }} />
          <Typography variant="body1" sx={{ fontWeight: '600', fontSize: { xs: '0.9rem', md: '1rem' } }}>
            🎉 Limited Time: Free shipping on orders over 5,000 KES! Use code: SAVE2026
          </Typography>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #42a5f5 100%)',
        color: 'white',
        padding: { xs: '80px 20px', md: '120px 20px' },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '500px',
          height: '500px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-50%',
          left: '-30%',
          width: '400px',
          height: '400px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite 1s',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' }
        }
      }}>
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Chip 
            label="✨ Welcome to ShopHub Kenya" 
            variant="outlined"
            sx={{ 
              color: 'white',
              borderColor: 'rgba(255,255,255,0.5)',
              mb: 3,
              fontSize: '0.9rem'
            }}
          />
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: '900',
              fontSize: { xs: '2.5rem', md: '3.8rem' },
              mb: 2,
              letterSpacing: '-1px',
              animation: 'fadeInUp 0.8s ease-out',
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            Tech Shopping Reimagined
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              marginBottom: 5,
              fontSize: { xs: '1rem', md: '1.4rem' },
              fontWeight: '300',
              letterSpacing: '0.5px',
              opacity: 0.95,
              animation: 'fadeInUp 0.8s ease-out 0.2s both',
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            Premium tech products with fast delivery, secure payment & 24/7 support
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
            <Button 
              variant="contained" 
              color="warning" 
              size="large" 
              component={RouterLink} 
              to="/products"
              endIcon={<ArrowRight />}
              sx={{
                padding: '14px 45px',
                fontSize: '1.1rem',
                fontWeight: '600',
                textTransform: 'none',
                borderRadius: '50px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                }
              }}
            >
              Shop Now
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{
                padding: '14px 45px',
                fontSize: '1.1rem',
                fontWeight: '600',
                textTransform: 'none',
                borderRadius: '50px',
                borderColor: 'white',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white'
                }
              }}
            >
              Browse Categories
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container sx={{ paddingY: 8 }}>
        <Grid container spacing={3}>
          {[
            { number: '50+', label: 'Premium Products', icon: '📦' },
            { number: '10K+', label: 'Happy Customers', icon: '😊' },
            { number: '99%', label: 'Satisfaction Rate', icon: '⭐' },
            { number: '2H', label: 'Avg Delivery', icon: '🚚' }
          ].map((stat, index) => (
            <Grid size={{ xs: 6, sm: 3 }} key={index}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" sx={{ fontSize: '2rem', mb: 1 }}>
                  {stat.icon}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: '700', color: '#0d47a1', mb: 0.5 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', fontWeight: '500' }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container sx={{ paddingY: 8 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            fontWeight: '700',
            marginBottom: 6,
            color: '#1a1a1a'
          }}
        >
          Why Choose ShopHub
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{
              height: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              border: 'none',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #0d47a1, #42a5f5)',
              },
              '&:hover': {
                boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                transform: 'translateY(-4px)'
              }
            }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <LocalShipping sx={{ fontSize: '3rem', color: '#0d47a1', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
                  Fast Shipping
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Same-day delivery in Nairobi & express shipping across Kenya
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{
              height: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              border: 'none',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #1565c0, #42a5f5)',
              },
              '&:hover': {
                boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                transform: 'translateY(-4px)'
              }
            }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Lock sx={{ fontSize: '3rem', color: '#0d47a1', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
                  Secure Payment
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  M-Pesa, card, bank transfer & more payment options available
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{
              height: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              border: 'none',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #42a5f5, #ff6f00)',
              },
              '&:hover': {
                boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                transform: 'translateY(-4px)'
              }
            }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Headset sx={{ fontSize: '3rem', color: '#0d47a1', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
                  24/7 Support
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Dedicated customer service team ready to help anytime
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Flash Sale Banner */}
      <Box sx={{
        background: 'linear-gradient(135deg, #ff6f00 0%, #ff8f00 50%, #ff6f00 100%)',
        color: 'white',
        padding: '40px 20px',
        marginY: 6,
        borderRadius: '12px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
              <LocalFireDepartment sx={{ fontSize: '2rem' }} />
              <Typography variant="h5" sx={{ fontWeight: '700' }}>
                Flash Sale This Week
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2, opacity: 0.95 }}>
              Save up to 40% on selected tech products. Hurry, limited stock!
            </Typography>
            <Button 
              variant="contained" 
              sx={{
                backgroundColor: 'white',
                color: '#ff6f00',
                fontWeight: '700',
                textTransform: 'none',
                borderRadius: '50px',
                padding: '12px 35px',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              View Deals
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Recommended Products Section */}
      <Container sx={{ paddingY: 8 }}>
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
            <TrendingUp sx={{ color: '#ff6f00' }} />
            <Typography variant="caption" sx={{ color: '#ff6f00', fontWeight: '700', textTransform: 'uppercase' }}>
              Popular This Season
            </Typography>
          </Box>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              fontWeight: '700',
              marginBottom: 1,
              color: '#1a1a1a'
            }}
          >
            Trending Now
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center',
              color: '#666',
              marginBottom: 4,
              fontSize: '1rem'
            }}
          >
            Discover the most loved tech products by our community
          </Typography>
        </Box>
        
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
            width: '100%',
            mb: 4
          }}
        >
          {products.slice(0, 8).map((product) => (
            <Box key={product.id} sx={{ display: 'flex' }}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button 
            variant="outlined" 
            component={RouterLink} 
            to="/products"
            endIcon={<ArrowRight />}
            sx={{
              padding: '12px 40px',
              fontSize: '1rem',
              fontWeight: '600',
              textTransform: 'none',
              borderRadius: '8px',
              borderColor: '#0d47a1',
              color: '#0d47a1',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#0d47a1',
                color: 'white',
                borderColor: '#0d47a1'
              }
            }}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Categories Showcase Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', paddingY: 8 }}>
        <Container>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              fontWeight: '700',
              marginBottom: 6,
              color: '#1a1a1a'
            }}
          >
            Shop by Category
          </Typography>
          <Grid container spacing={3}>
            {[
              { name: 'Electronics', icon: '📱', color: '#0d47a1', desc: 'Phones & Devices' },
              { name: 'Audio', icon: '🎧', color: '#1565c0', desc: 'Headphones & Speakers' },
              { name: 'Photography', icon: '📷', color: '#42a5f5', desc: 'Cameras & Lenses' },
              { name: 'Accessories', icon: '🎒', color: '#ff6f00', desc: 'Bags & Cases' }
            ].map((category, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card sx={{
                  height: '100%',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.12)'
                  },
                  background: `linear-gradient(135deg, ${category.color}10 0%, ${category.color}05 100%)`
                }}>
                  <CardContent sx={{ 
                    textAlign: 'center', 
                    py: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Box sx={{ fontSize: '3rem', mb: 1 }}>
                      {category.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: '700', color: '#1a1a1a', mb: 0.5 }}>
                      {category.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999', mb: 2 }}>
                      {category.desc}
                    </Typography>
                    <Button 
                      size="small" 
                      sx={{ 
                        textTransform: 'none',
                        color: category.color,
                        fontWeight: '600',
                        '&:hover': {
                          backgroundColor: `${category.color}10`
                        }
                      }}
                    >
                      Browse →
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Newsletter Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
        color: 'white',
        padding: '60px 20px'
      }}>
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: '700',
                  marginBottom: 2
                }}
              >
                Stay Updated
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  opacity: 0.95
                }}
              >
                Subscribe to our newsletter and get exclusive deals, new product launches, and tech tips delivered straight to your inbox
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNewsletterSignup()}
                  disabled={isSubscribing}
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'white', opacity: 0.8 }} />
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.3)'
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.5)'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white'
                      }
                    },
                    '& .MuiOutlinedInput-input': {
                      '&::placeholder': {
                        color: 'rgba(255,255,255,0.7)',
                        opacity: 1
                      }
                    }
                  }}
                />
                <Button 
                  variant="contained"
                  onClick={handleNewsletterSignup}
                  disabled={isSubscribing}
                  sx={{
                    backgroundColor: '#ff6f00',
                    color: 'white',
                    padding: '12px 30px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: '#e65100'
                    },
                    '&:disabled': {
                      backgroundColor: '#ff6f00',
                      opacity: 0.7
                    }
                  }}
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block',
                  mt: 1.5,
                  opacity: 0.8
                }}
              >
                ✓ No spam, unsubscribe anytime. Check our privacy policy.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
