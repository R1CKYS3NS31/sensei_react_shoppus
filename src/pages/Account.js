import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Card, CardContent, Grid, Avatar, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Chip } from '@mui/material';
import { UserContext } from '../context/UserContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Logout, Edit } from '@mui/icons-material';

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, orderHistory, updateProfile } = useContext(UserContext);
  const [tabValue, setTabValue] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');

  if (!isAuthenticated || !user) {
    return (
      <Box sx={{ backgroundColor: '#fafafa', minHeight: 'calc(100vh - 64px - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ p: 4, textAlign: 'center', maxWidth: '500px', borderRadius: '12px' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: '600', mb: 3 }}>
            Please log in
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            You need to be logged in to access your account
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/login')}
            sx={{
              background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
              textTransform: 'none',
              fontWeight: '600'
            }}
          >
            Go to Login
          </Button>
        </Card>
      </Box>
    );
  }

  const handleSaveProfile = () => {
    updateProfile({ name: editName });
    setOpenEditDialog(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ backgroundColor: '#fafafa', minHeight: 'calc(100vh - 64px - 200px)', paddingY: 6 }}>
      <Container>
        {/* Profile Header */}
        <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', mb: 4, background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)' }}>
          <CardContent sx={{ p: 4, color: 'white' }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  src={user.avatar}
                  sx={{ width: 100, height: 100, border: '4px solid white' }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: true }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: '800', color: 'white' }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255,255,255,0.9)' }}>
                  {user.email}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Member since {user.joinDate}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: "auto" }}>
                <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Button
                    startIcon={<Edit />}
                    variant="contained"
                    onClick={() => setOpenEditDialog(true)}
                    sx={{ 
                      textTransform: 'none', 
                      fontWeight: '600',
                      backgroundColor: 'white',
                      color: '#0d47a1',
                      '&:hover': {
                        backgroundColor: '#f0f0f0'
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    startIcon={<Logout />}
                    variant="outlined"
                    onClick={handleLogout}
                    sx={{ 
                      textTransform: 'none', 
                      fontWeight: '600',
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderColor: 'white'
                      }
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Paper sx={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', mb: 4, overflow: 'hidden' }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            indicatorColor="primary"
            textColor="primary"
            sx={{ 
              backgroundColor: '#f5f5f5',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: '700',
                fontSize: '1rem',
                color: '#666'
              },
              '& .MuiTab-textColorPrimary.Mui-selected': {
                color: '#0d47a1'
              }
            }}
          >
            <Tab label="📦 Order History" />
            <Tab label="⚙️ Account Settings" />
          </Tabs>

          {/* Order History Tab */}
          {tabValue === 0 && (
            <Box sx={{ p: 3 }}>
              {orderHistory.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h6" color="textSecondary" gutterBottom sx={{ fontWeight: '600' }}>
                    No orders yet
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                    Start shopping to see your orders here
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
                    Shop Now
                  </Button>
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: '700', color: '#1a1a1a' }}>Order ID</TableCell>
                        <TableCell sx={{ fontWeight: '700', color: '#1a1a1a' }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: '700', color: '#1a1a1a' }}>Total</TableCell>
                        <TableCell sx={{ fontWeight: '700', color: '#1a1a1a' }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderHistory.map(order => (
                        <TableRow key={order.id} sx={{ 
                          '&:hover': { backgroundColor: '#f9f9f9' },
                          borderBottom: '1px solid #e0e0e0'
                        }}>
                          <TableCell sx={{ fontWeight: '600' }}>{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell sx={{ fontWeight: '600' }}>{formatCurrency(order.total)}</TableCell>
                          <TableCell>
                            <Chip
                              label={order.status}
                              size="small"
                              color={order.status === 'Delivered' ? 'success' : 'warning'}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}

          {/* Account Settings Tab */}
          {tabValue === 1 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card sx={{ p: 3, backgroundColor: '#e3f2fd', border: '1px solid #90caf9', borderRadius: '12px' }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', color: '#0d47a1' }}>
                      📧 Email Address
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: '600', mb: 1, color: '#1a1a1a' }}>
                      {user.email}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Contact support to change your email address
                    </Typography>
                  </Card>
                  
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card sx={{ p: 3, backgroundColor: '#e8f5e9', border: '1px solid #81c784', borderRadius: '12px' }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', color: '#2e7d32' }}>
                      ✓ Account Status
                    </Typography>
                    <Chip 
                      label="Active" 
                      color="success" 
                      variant="outlined"
                      size="small" 
                      sx={{ mb: 1, fontWeight: '700' }} 
                    />
                    <Typography variant="caption" color="textSecondary">
                      Your account is in good standing
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>

      {/* Edit Profile Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: '600' }}>Edit Profile</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={user.email}
            disabled
            helperText="Contact support to change your email"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveProfile}
            sx={{
              background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
              textTransform: 'none'
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Account;
