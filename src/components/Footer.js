import React from 'react';
import { Box, Typography, Container, Grid, Link as MuiLink } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1a1a1a', color: 'white', paddingY: 6, marginTop: 8 }}>
      <Container>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: '700', mb: 2 }}>
              🛍️ Shoppus
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.7)">
              Your trusted online store for premium electronics and accessories in Kenya.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>Quick Links</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink href="/" sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: '#fff' } }}>Home</MuiLink>
              <MuiLink href="/products" sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: '#fff' } }}>Products</MuiLink>
              <MuiLink href="/cart" sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: '#fff' } }}>Cart</MuiLink>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>Support</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" color="rgba(255,255,255,0.7)">Email: info@shoppus.ke</Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.7)">Phone: +254 (0) 712 345678</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>Follow Us</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Facebook sx={{ cursor: 'pointer', '&:hover': { color: '#1976d2' } }} />
              <Twitter sx={{ cursor: 'pointer', '&:hover': { color: '#1976d2' } }} />
              <Instagram sx={{ cursor: 'pointer', '&:hover': { color: '#1976d2' } }} />
              <LinkedIn sx={{ cursor: 'pointer', '&:hover': { color: '#1976d2' } }} />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="rgba(255,255,255,0.6)">
            © 2026 Shoppus Kenya. All rights reserved. | Privacy Policy | Terms of Service
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
