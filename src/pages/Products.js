import React, { useContext, useState, useMemo } from 'react';
import { Container, Grid, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Chip, Slider, Pagination, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { Search } from '@mui/icons-material';

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const { products, loading, getCategories } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const categories = getCategories();
  const maxPrice = Math.max(...products.map(p => p.price), 50000);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy, priceRange, minRating]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 300);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)', backgroundColor: '#fafafa' }}>
        <CircularProgress sx={{ color: '#0d47a1' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#fafafa', minHeight: 'calc(100vh - 64px - 200px)', paddingY: 6 }}>
      <Container>
        {/* Header */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: '700',
              color: '#1a1a1a',
              mb: 2,
              fontSize: isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.5rem'
            }}
          >
            Our Products
          </Typography>
          <Typography 
            variant="h6" 
            color="textSecondary"
            sx={{
              fontWeight: '400',
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}
          >
            Discover our curated selection of {products.length} premium electronics and accessories
          </Typography>
        </Box>

        {/* Filters Section */}
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: 4 }}>
          {/* Search */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth
              placeholder="🔍 Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 8px 20px rgba(13, 71, 161, 0.15)'
                  }
                }
              }}
            />
          </Grid>

          {/* Category */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{ 
                  borderRadius: '10px', 
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Sort */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                sx={{ 
                  borderRadius: '10px', 
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="popularity">Most Popular</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Min Rating */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Min Rating</InputLabel>
              <Select
                value={minRating}
                label="Min Rating"
                onChange={(e) => setMinRating(e.target.value)}
                sx={{ 
                  borderRadius: '10px', 
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <MenuItem value={0}>All Ratings</MenuItem>
                <MenuItem value={3}>⭐ 3+</MenuItem>
                <MenuItem value={4}>⭐⭐ 4+</MenuItem>
                <MenuItem value={4.5}>⭐⭐⭐ 4.5+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Price Range Filter */}
        <Box sx={{ mb: 4, p: 3, backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <Typography variant="body2" sx={{ fontWeight: '700', mb: 2, fontSize: '1rem' }}>
            💰 Price Range: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            min={0}
            max={maxPrice}
            step={100}
            valueLabelDisplay="off"
            sx={{
              '& .MuiSlider-thumb': {
                backgroundColor: '#0d47a1'
              },
              '& .MuiSlider-track': {
                backgroundColor: '#0d47a1'
              }
            }}
          />
        </Box>

        {/* Active Filters */}
        {(searchQuery || selectedCategory !== 'all' || minRating > 0 || sortBy !== 'relevance') && (
          <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {searchQuery && (
              <Chip
                label={`Search: "${searchQuery}"`}
                onDelete={() => setSearchQuery('')}
                color="primary"
                variant="outlined"
              />
            )}
            {selectedCategory !== 'all' && (
              <Chip
                label={`Category: ${selectedCategory}`}
                onDelete={() => setSelectedCategory('all')}
                color="primary"
                variant="outlined"
              />
            )}
            {minRating > 0 && (
              <Chip
                label={`Rating: ${minRating}+`}
                onDelete={() => setMinRating(0)}
                color="primary"
                variant="outlined"
              />
            )}
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            {/* Results Info */}
            <Box sx={{ mb: 3, textAlign: 'right' }}>
              <Typography variant="body2" color="textSecondary">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </Typography>
            </Box>

            {/* Products Grid - Mobile Responsive */}
            <Grid 
              container 
              spacing={{ xs: 1.5, sm: 2, md: 3 }}
              sx={{ mb: 5 }}
            >
              {paginatedProducts.map(product => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange}
                  sx={{
                    '& .MuiPaginationItem-root': {
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#0d47a1',
                        backgroundColor: 'rgba(13, 71, 161, 0.05)'
                      }
                    },
                    '& .MuiPaginationItem-page.Mui-selected': {
                      backgroundColor: '#0d47a1',
                      color: 'white',
                      border: '1px solid #0d47a1',
                      fontWeight: '600',
                      '&:hover': {
                        backgroundColor: '#1565c0'
                      }
                    }
                  }}
                />
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Try adjusting your search or filters
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

// Helper function for currency formatting
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default Products;
