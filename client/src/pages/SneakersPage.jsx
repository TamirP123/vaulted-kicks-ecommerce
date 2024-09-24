import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_SNEAKERS } from '../utils/queries';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Grid,
  Container,
  CircularProgress,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Button,
  Divider,
  Collapse,
} from "@mui/material";
import { Favorite, FavoriteBorder, FilterList } from "@mui/icons-material";
import '../styles/SneakersPage.css';
import '../styles/RecommendedSection.css';

const SneakerCard = ({ sneaker }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <Card className="sneaker-card">
      {sneaker.onSale && (
        <Typography className="sale-label" variant="body2">
          Sale
        </Typography>
      )}
      <IconButton
        className="favorite-button"
        aria-label="add to favorites"
        onClick={() => setIsFavorite(!isFavorite)}
      >
        {isFavorite ? <Favorite className="favorite-icon" /> : <FavoriteBorder className="favorite-icon" />}
      </IconButton>
      <CardMedia
        component="img"
        image={sneaker.imageUrl}
        alt={sneaker.name}
        className="card-media"
      />
      <CardContent className="card-content">
        <Typography className="sneaker-brand" variant="body2">
          {sneaker.brand}
        </Typography>
        <Typography className="sneaker-name" variant="subtitle2" component="h3">
          {sneaker.name}
        </Typography>
        <Box className="price-container">
          {sneaker.onSale ? (
            <Box className="price-row">
              <Typography className="sale-price" variant="h6">
                ${sneaker.salePrice.toFixed(2)}
              </Typography>
              <Typography className="original-price" variant="body2">
                ${sneaker.price.toFixed(2)}
              </Typography>
            </Box>
          ) : (
            <Typography className="price" variant="h6">
              ${sneaker.price.toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const SneakersPage = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_SNEAKERS);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [filters, setFilters] = useState({
    brands: [],
    models: [],
    usMenSizes: [],
    usWomenSizes: [],
    priceRange: [0, 1000],
  });
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    if (data && data.allSneakers) {
      setFilteredSneakers(data.allSneakers);
    }
  }, [data]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const applyFilters = () => {
    if (data && data.allSneakers) {
      const filtered = data.allSneakers.filter(sneaker => {
        return (
          (filters.brands.length === 0 || filters.brands.includes(sneaker.brand)) &&
          (filters.models.length === 0 || filters.models.includes(sneaker.model)) &&
          (sneaker.price >= filters.priceRange[0] && sneaker.price <= filters.priceRange[1]) &&
          (filters.usMenSizes.length === 0 || sneaker.sizes.some(size => filters.usMenSizes.includes(size.size))) &&
          (filters.usWomenSizes.length === 0 || sneaker.sizes.some(size => filters.usWomenSizes.includes(size.size - 1.5)))
        );
      });
      setFilteredSneakers(filtered);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const sneakers = data?.allSneakers || [];
  const brands = [...new Set(sneakers.map(sneaker => sneaker.brand))];
  const models = [...new Set(sneakers.map(sneaker => sneaker.model))];
  const sizes = [...new Set(sneakers.flatMap(sneaker => sneaker.sizes.map(size => size.size)))].sort((a, b) => a - b);

  return (
    <Box component="section" className="sneakers-page">
      <Box className="header-container">
        <Container maxWidth="xl">
          <Typography variant="h" component="h1" className="page-title" gutterBottom>
            Shop For Sneakers
          </Typography>
        </Container>
        <Typography variant="subtitle1" className="welcome-message">
          Welcome to our exclusive collection. Find your perfect pair with ease using our smart filters.
        </Typography>
      </Box>
      <Container maxWidth="xl">
        <Box className="sneakers-content">
          <Box className="filters-container">
            <Button
              variant="contained"
              color="primary"
              startIcon={<FilterList />}
              onClick={() => setShowFilters(!showFilters)}
              className="filter-toggle-button"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <Collapse in={showFilters}>
              <Box className="filters">
                <Typography variant="h6" gutterBottom>Filters</Typography>
                <Divider />
                <FormGroup>
                  <Typography variant="subtitle1">Brands</Typography>
                  {brands.map(brand => (
                    <FormControlLabel
                      key={brand}
                      control={<Checkbox 
                        checked={filters.brands.includes(brand)}
                        onChange={(e) => handleFilterChange('brands', 
                          e.target.checked 
                            ? [...filters.brands, brand]
                            : filters.brands.filter(b => b !== brand)
                        )}
                      />}
                      label={brand}
                    />
                  ))}
                </FormGroup>
                <Divider />
                <FormGroup>
                  <Typography variant="subtitle1">Models</Typography>
                  {models.map(model => (
                    <FormControlLabel
                      key={model}
                      control={<Checkbox 
                        checked={filters.models.includes(model)}
                        onChange={(e) => handleFilterChange('models', 
                          e.target.checked 
                            ? [...filters.models, model]
                            : filters.models.filter(m => m !== model)
                        )}
                      />}
                      label={model}
                    />
                  ))}
                </FormGroup>
                <Divider />
                <Box>
                  <Typography variant="subtitle1">US Men Sizes</Typography>
                  <Box display="flex" flexWrap="wrap">
                    {sizes.map(size => (
                      <Button
                        key={size}
                        variant={filters.usMenSizes.includes(size) ? "contained" : "outlined"}
                        size="small"
                        onClick={() => handleFilterChange('usMenSizes', 
                          filters.usMenSizes.includes(size)
                            ? filters.usMenSizes.filter(s => s !== size)
                            : [...filters.usMenSizes, size]
                        )}
                        style={{ margin: '4px' }}
                      >
                        {size}
                      </Button>
                    ))}
                  </Box>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle1">US Women Sizes</Typography>
                  <Box display="flex" flexWrap="wrap">
                    {sizes.map(size => (
                      <Button
                        key={size}
                        variant={filters.usWomenSizes.includes(size - 1.5) ? "contained" : "outlined"}
                        size="small"
                        onClick={() => handleFilterChange('usWomenSizes', 
                          filters.usWomenSizes.includes(size - 1.5)
                            ? filters.usWomenSizes.filter(s => s !== size - 1.5)
                            : [...filters.usWomenSizes, size - 1.5]
                        )}
                        style={{ margin: '4px' }}
                      >
                        {size - 1.5}
                      </Button>
                    ))}
                  </Box>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle1">Price Range</Typography>
                  <Slider
                    value={filters.priceRange}
                    onChange={(_, newValue) => handleFilterChange('priceRange', newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                  />
                  <Typography>
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={applyFilters} fullWidth style={{ marginTop: '16px' }}>
                  Apply Filters
                </Button>
              </Box>
            </Collapse>
          </Box>
          <Box className="sneaker-grid-container">
            <Grid container spacing={4} className="sneaker-grid">
              {filteredSneakers.length > 0 ? (
                filteredSneakers.map((sneaker) => (
                  <Grid item key={sneaker._id} xs={12} sm={6} md={4} lg={3}>
                    <SneakerCard sneaker={sneaker} />
                  </Grid>
                ))
              ) : (
                <Typography>No sneakers found matching the current filters.</Typography>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SneakersPage;
