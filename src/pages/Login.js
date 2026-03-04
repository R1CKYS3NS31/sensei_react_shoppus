import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Card, CardContent, Tabs, Tab, Grid, Divider, InputAdornment, IconButton } from '@mui/material';
import { UserContext } from '../context/UserContext';
import { NotificationContext } from '../context/NotificationContext';
import { Email, Lock, Person, Visibility, VisibilityOff, ArrowRight, CheckCircle } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const { login, signup } = useContext(UserContext);
  const { showNotification } = useContext(NotificationContext);
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) newErrors.email = 'Invalid email format';
    if (!loginData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.name.trim()) newErrors.name = 'Name is required';
    if (!signupData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) newErrors.email = 'Invalid email format';
    if (!signupData.password.trim()) newErrors.password = 'Password is required';
    if (signupData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (signupData.password !== signupData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateLogin()) {
      setIsLoading(true);
      setTimeout(() => {
        const result = login(loginData.email, loginData.password);
        showNotification(result.message, 'success');
        setIsLoading(false);
        if (result.success) {
          setTimeout(() => navigate('/'), 1000);
        }
      }, 600);
    }
  };

  const handleSignup = () => {
    if (validateSignup()) {
      setIsLoading(true);
      setTimeout(() => {
        const result = signup(signupData.email, signupData.password, signupData.name);
        showNotification(result.message, 'success');
        setIsLoading(false);
        if (result.success) {
          setTimeout(() => navigate('/'), 1000);
        }
      }, 600);
    }
  };

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
    setErrors({});
    setLoginData({ email: '', password: '' });
    setSignupData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: 'calc(100vh - 64px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingY: 4,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(13, 71, 161, 0.1)',
        zIndex: 0
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'rgba(255, 111, 0, 0.05)',
        zIndex: 0
      }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Card sx={{
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Header with gradient */}
          <Box sx={{
            background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #42a5f5 100%)',
            color: 'white',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)'
            }
          }}>
            <Typography variant="h3" sx={{ 
              fontWeight: '800', 
              mb: 0.5,
              fontSize: { xs: '2rem', sm: '2.5rem' },
              position: 'relative',
              zIndex: 1
            }}>
              🛍️ Shoppus
            </Typography>
            <Typography variant="body1" sx={{ 
              opacity: 0.95,
              fontSize: '0.95rem',
              fontWeight: '500',
              position: 'relative',
              zIndex: 1
            }}>
              Premium Tech Shopping Experience
            </Typography>
          </Box>

          <CardContent sx={{ p: 0 }}>
            {/* Custom Tab Navigation */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
              backgroundColor: '#fafafa',
              borderBottom: '2px solid #f0f0f0'
            }}>
              {[
                { label: '🔐 Login', icon: Lock },
                { label: '📝 Sign Up', icon: Person }
              ].map((tab, index) => (
                <Button
                  key={index}
                  onClick={() => handleTabChange(null, index)}
                  sx={{
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: tabValue === index ? '700' : '600',
                    padding: '16px 20px',
                    borderRadius: 0,
                    color: tabValue === index ? '#0d47a1' : '#999',
                    background: tabValue === index ? 'white' : 'transparent',
                    borderBottom: tabValue === index ? '3px solid #0d47a1' : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#0d47a1',
                      backgroundColor: 'rgba(13, 71, 161, 0.02)'
                    }
                  }}
                >
                  {tab.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ p: 4 }}>
              {/* Login Tab */}
              {tabValue === 0 && (
                <Box
                  sx={{
                    animation: 'fadeIn 0.3s ease-in',
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'translateY(10px)' },
                      to: { opacity: 1, transform: 'translateY(0)' }
                    }
                  }}
                >
                  <Typography variant="h5" gutterBottom sx={{ 
                    fontWeight: '700', 
                    mb: 1, 
                    color: '#1a1a1a',
                    textAlign: 'center'
                  }}>
                    Welcome Back!
                  </Typography>
                  <Typography variant="body2" sx={{
                    textAlign: 'center',
                    color: '#999',
                    mb: 3,
                    fontSize: '0.9rem'
                  }}>
                    Sign in to access your account
                  </Typography>
                  
                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        value={loginData.email}
                        onChange={(e) => {
                          setLoginData({ ...loginData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        error={!!errors.email}
                        helperText={errors.email}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email sx={{ color: '#0d47a1', mr: 1 }} />
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            backgroundColor: '#f9f9f9',
                            transition: 'all 0.3s ease',
                            '&:hover fieldset': {
                              borderColor: '#0d47a1',
                              borderWidth: '2px'
                            },
                            '&.Mui-focused': {
                              backgroundColor: 'white'
                            }
                          },
                          '& .MuiOutlinedInput-input': {
                            fontSize: '0.95rem'
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => {
                          setLoginData({ ...loginData, password: e.target.value });
                          if (errors.password) setErrors({ ...errors, password: '' });
                        }}
                        error={!!errors.password}
                        helperText={errors.password}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: '#0d47a1', mr: 1 }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                sx={{ color: '#999' }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            backgroundColor: '#f9f9f9',
                            transition: 'all 0.3s ease',
                            '&:hover fieldset': {
                              borderColor: '#0d47a1',
                              borderWidth: '2px'
                            },
                            '&.Mui-focused': {
                              backgroundColor: 'white'
                            }
                          },
                          '& .MuiOutlinedInput-input': {
                            fontSize: '0.95rem'
                          }
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }} sx={{ mt: 1 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleLogin}
                        disabled={isLoading}
                        endIcon={isLoading ? null : <ArrowRight />}
                        sx={{
                          background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
                          color: 'white',
                          padding: '12px 24px',
                          fontSize: '1rem',
                          fontWeight: '700',
                          textTransform: 'none',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(13, 71, 161, 0.3)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(13, 71, 161, 0.4)'
                          },
                          '&:active': {
                            transform: 'translateY(0)'
                          },
                          '&:disabled': {
                            opacity: 0.7
                          }
                        }}
                      >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                      </Button>
                    </Grid>
                  </Grid>

                  {/* Demo credentials hint */}
                  <Box sx={{
                    mt: 3,
                    p: 2,
                    backgroundColor: 'rgba(13, 71, 161, 0.05)',
                    borderRadius: '10px',
                    border: '1px solid rgba(13, 71, 161, 0.1)'
                  }}>
                    <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1, fontWeight: '600' }}>
                      Demo Account:
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      Email: demo@example.com | Password: password
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Sign Up Tab */}
              {tabValue === 1 && (
                <Box
                  sx={{
                    animation: 'fadeIn 0.3s ease-in',
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'translateY(10px)' },
                      to: { opacity: 1, transform: 'translateY(0)' }
                    }
                  }}
                >
                  <Typography variant="h5" gutterBottom sx={{ 
                    fontWeight: '700', 
                    mb: 1, 
                    color: '#1a1a1a',
                    textAlign: 'center'
                  }}>
                    Create Account
                  </Typography>
                  <Typography variant="body2" sx={{
                    textAlign: 'center',
                    color: '#999',
                    mb: 3,
                    fontSize: '0.9rem'
                  }}>
                    Join Shoppus for the best shopping experience
                  </Typography>
                  
                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        placeholder="John Doe"
                        value={signupData.name}
                        onChange={(e) => {
                          setSignupData({ ...signupData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        error={!!errors.name}
                        helperText={errors.name}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person sx={{ color: '#0d47a1', mr: 1 }} />
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            backgroundColor: '#f9f9f9',
                            transition: 'all 0.3s ease',
                            '&:hover fieldset': {
                              borderColor: '#0d47a1',
                              borderWidth: '2px'
                            },
                            '&.Mui-focused': {
                              backgroundColor: 'white'
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        value={signupData.email}
                        onChange={(e) => {
                          setSignupData({ ...signupData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        error={!!errors.email}
                        helperText={errors.email}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email sx={{ color: '#0d47a1', mr: 1 }} />
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            backgroundColor: '#f9f9f9',
                            transition: 'all 0.3s ease',
                            '&:hover fieldset': {
                              borderColor: '#0d47a1',
                              borderWidth: '2px'
                            },
                            '&.Mui-focused': {
                              backgroundColor: 'white'
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 6 characters"
                        value={signupData.password}
                        onChange={(e) => {
                          setSignupData({ ...signupData, password: e.target.value });
                          if (errors.password) setErrors({ ...errors, password: '' });
                        }}
                        error={!!errors.password}
                        helperText={errors.password}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: '#0d47a1', mr: 1 }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                sx={{ color: '#999' }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            backgroundColor: '#f9f9f9',
                            transition: 'all 0.3s ease',
                            '&:hover fieldset': {
                              borderColor: '#0d47a1',
                              borderWidth: '2px'
                            },
                            '&.Mui-focused': {
                              backgroundColor: 'white'
                            }
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Re-enter your password"
                        value={signupData.confirmPassword}
                        onChange={(e) => {
                          setSignupData({ ...signupData, confirmPassword: e.target.value });
                          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                        }}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: '#0d47a1', mr: 1 }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                                sx={{ color: '#999' }}
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            backgroundColor: '#f9f9f9',
                            transition: 'all 0.3s ease',
                            '&:hover fieldset': {
                              borderColor: '#0d47a1',
                              borderWidth: '2px'
                            },
                            '&.Mui-focused': {
                              backgroundColor: 'white'
                            }
                          }
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }} sx={{ mt: 1 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSignup}
                        disabled={isLoading}
                        endIcon={isLoading ? null : <CheckCircle />}
                        sx={{
                          background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
                          color: 'white',
                          padding: '12px 24px',
                          fontSize: '1rem',
                          fontWeight: '700',
                          textTransform: 'none',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(13, 71, 161, 0.3)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(13, 71, 161, 0.4)'
                          },
                          '&:active': {
                            transform: 'translateY(0)'
                          },
                          '&:disabled': {
                            opacity: 0.7
                          }
                        }}
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </Grid>
                  </Grid>

                  {/* Terms notice */}
                  <Typography variant="caption" sx={{
                    display: 'block',
                    textAlign: 'center',
                    color: '#999',
                    mt: 3,
                    lineHeight: '1.6'
                  }}>
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Footer note */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
            🔒 Your data is encrypted and secure | 100% Safe & Private
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
