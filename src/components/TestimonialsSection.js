import React from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Avatar, Rating } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Kariuki',
      role: 'Tech Enthusiast',
      city: 'Nairobi',
      image: 'https://api.avataaars.io/?avatarStyle=Circle&topType=LongHairBun&facialHairType=Blank&clotheType=ShirtScoopNeck&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=light',
      rating: 5,
      text: 'ShopHub Kenya offers the best prices and fastest delivery in Kenya. I\'ve ordered multiple times and never been disappointed!',
    },
    {
      id: 2,
      name: 'James Mwangi',
      role: 'Business Owner',
      city: 'Kisumu',
      image: 'https://api.avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggy&facialHairType=BeardMedium&clotheType=Hoodie&eyeType=WinkWacky&eyebrowType=RaisedExcited&mouthType=Serious&skinColor=brown',
      rating: 5,
      text: 'Excellent customer service and product quality. The M-Pesa payment option made it super convenient. Highly recommended!',
    },
    {
      id: 3,
      name: 'Patricia Ochieng',
      role: 'University Student',
      city: 'Mombasa',
      image: 'https://api.avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&facialHairType=Blank&clotheType=ShirtVNeck&eyeType=EyeRoll&eyebrowType=SadConcerned&mouthType=Disbelief&skinColor=dark',
      rating: 5,
      text: 'Got my wireless earbuds within 2 days in Mombasa. Great quality and the price was unbeatable compared to other stores.',
    },
    {
      id: 4,
      name: 'David Kipchoge',
      role: 'Corporate Executive',
      city: 'Nairobi',
      image: 'https://api.avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&facialHairType=BeardMajestic&clotheType=BlazerShirt&eyeType=Default&eyebrowType=FlatNatural&mouthType=Smile&skinColor=tan',
      rating: 5,
      text: 'I appreciate the 30-day money-back guarantee. That shows confidence in their products. Will definitely shop here again!',
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', py: 10 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            fontWeight: '800',
            marginBottom: 1,
            color: '#1a1a1a',
            fontSize: '2.2rem'
          }}
        >
          💬 What Our Customers Say
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center',
            color: '#666',
            marginBottom: 6,
            fontSize: '1.05rem',
            maxWidth: '600px',
            mx: 'auto',
            fontWeight: '500'
          }}
        >
          Thousands of satisfied customers trust ShopHub Kenya for their tech purchases and reliable service
        </Typography>

        <Grid container spacing={3}>
          {testimonials.map((testimonial) => (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={testimonial.id}>
              <Card sx={{
                height: '100%',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: 'none',
                position: 'relative',
                overflow: 'visible',
                '&:hover': {
                  boxShadow: '0 16px 32px rgba(0,0,0,0.15)',
                  transform: 'translateY(-8px)'
                }
              }}>
                {/* Quote Icon */}
                <Box sx={{
                  position: 'absolute',
                  top: -20,
                  left: 20,
                  backgroundColor: '#0d47a1',
                  borderRadius: '50%',
                  p: 1.2,
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(13, 71, 161, 0.3)'
                }}>
                  <FormatQuote sx={{ fontSize: '1.8rem' }} />
                </Box>

                <CardContent sx={{ pt: 6, pb: 3 }}>
                  {/* Rating */}
                  <Box sx={{ mb: 2 }}>
                    <Rating value={testimonial.rating} readOnly size="medium" />
                  </Box>

                  {/* Testimonial Text */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontStyle: 'italic',
                      mb: 3,
                      color: '#555',
                      lineHeight: 1.7,
                      minHeight: '80px',
                      fontWeight: '500'
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>

                  {/* Author Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={testimonial.image}
                      alt={testimonial.name}
                      sx={{ width: 50, height: 50, border: '2px solid #0d47a1' }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: '700', color: '#1a1a1a' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" sx={{ fontWeight: '500' }}>
                        {testimonial.role}, {testimonial.city}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Stats Section */}
        <Grid container spacing={4} sx={{ mt: 8 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ 
              textAlign: 'center', 
              p: 4,
              backgroundColor: '#e3f2fd',
              borderRadius: '16px',
              border: '2px solid #90caf9',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 20px rgba(13, 71, 161, 0.2)',
                transform: 'translateY(-4px)'
              }
            }}>
              <Typography variant="h3" sx={{ fontWeight: '800', color: '#0d47a1', mb: 1 }}>
                15,000+
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: '600' }}>
                Happy Customers
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ 
              textAlign: 'center', 
              p: 4,
              backgroundColor: '#fff3e0',
              borderRadius: '16px',
              border: '2px solid #ffe0b2',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 20px rgba(255, 111, 0, 0.2)',
                transform: 'translateY(-4px)'
              }
            }}>
              <Typography variant="h3" sx={{ fontWeight: '800', color: '#ff6f00', mb: 1 }}>
                4.8★
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: '600' }}>
                Average Rating
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ 
              textAlign: 'center', 
              p: 4,
              backgroundColor: '#e8f5e9',
              borderRadius: '16px',
              border: '2px solid #c8e6c9',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 20px rgba(76, 175, 80, 0.2)',
                transform: 'translateY(-4px)'
              }
            }}>
              <Typography variant="h3" sx={{ fontWeight: '800', color: '#4caf50', mb: 1 }}>
                98%
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: '600' }}>
                Satisfaction Rate
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ 
              textAlign: 'center', 
              p: 4,
              backgroundColor: '#f3e5f5',
              borderRadius: '16px',
              border: '2px solid #e1bee7',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 20px rgba(123, 31, 162, 0.2)',
                transform: 'translateY(-4px)'
              }
            }}>
              <Typography variant="h3" sx={{ fontWeight: '800', color: '#7b1fa2', mb: 1 }}>
                2-24hr
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: '600' }}>
                Average Delivery
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
