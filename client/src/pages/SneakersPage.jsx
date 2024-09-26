import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_SNEAKERS, QUERY_USER_FAVORITES } from "../utils/queries";
import { useLocation } from "react-router-dom";
import Auth from "../utils/auth";
import {
  Box,
  Typography,
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
import { FilterList } from "@mui/icons-material";
import SneakerCard from "../components/SneakerCard"; // Import SneakerCard component
import "../styles/SneakersPage.css";
import "../styles/RecommendedSection.css";
import Footer from "../components/Footer";

const SneakersPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const saleFilter = queryParams.get("sale") === "true";
  const searchQuery = queryParams.get("search") || "";

  const isLoggedIn = Auth.loggedIn();
  const { loading, error, data } = useQuery(QUERY_ALL_SNEAKERS, {
    onError: (error) => {
      console.error("Error fetching sneakers:", error);
    },
  });
  const {
    loading: loadingFavorites,
    error: favoritesError,
    data: favoritesData,
    refetch: refetchFavorites,
  } = useQuery(QUERY_USER_FAVORITES, {
    skip: !isLoggedIn,
  });
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [filters, setFilters] = useState({
    brands: [],
    models: [],
    usMenSizes: [],
    usWomenSizes: [],
    priceRange: [0, 1000],
    onSale: saleFilter,
    search: searchQuery,
  });
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    if (data && data.allSneakers) {
      setFilteredSneakers(data.allSneakers);
    }
  }, [data]);

  useEffect(() => {
    // Reset filters when the location changes
    setFilters((prevFilters) => ({
      ...prevFilters,
      onSale: queryParams.get("sale") === "true",
      search: queryParams.get("search") || "",
    }));
  }, [location.search]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const applyFilters = () => {
    if (data && data.allSneakers) {
      const filtered = data.allSneakers.filter((sneaker) => {
        const matchesSearch = filters.search
          ? sneaker.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            sneaker.brand
              .toLowerCase()
              .includes(filters.search.toLowerCase()) ||
            sneaker.model.toLowerCase().includes(filters.search.toLowerCase())
          : true;

        return (
          matchesSearch &&
          (filters.brands.length === 0 ||
            filters.brands.includes(sneaker.brand)) &&
          (filters.models.length === 0 ||
            filters.models.includes(sneaker.model)) &&
          sneaker.price >= filters.priceRange[0] &&
          sneaker.price <= filters.priceRange[1] &&
          (filters.usMenSizes.length === 0 ||
            sneaker.sizes.some((size) =>
              filters.usMenSizes.includes(size.size)
            )) &&
          (filters.usWomenSizes.length === 0 ||
            sneaker.sizes.some((size) =>
              filters.usWomenSizes.includes(size.size - 1.5)
            )) &&
          (!filters.onSale || sneaker.onSale)
        );
      });
      setFilteredSneakers(filtered);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [data, filters]);

  if (loading || (isLoggedIn && loadingFavorites)) return <CircularProgress />;
  if (error) {
    console.error("Error details:", error);
    return (
      <Typography color="error">
        Error fetching sneakers: {error.message}
      </Typography>
    );
  }
  if (favoritesError) {
    console.error("Error fetching favorites:", favoritesError);
    // Don't return here, we can still show sneakers without favorites
  }

  const sneakers = data?.allSneakers || [];
  const userFavorites = favoritesData?.me?.favorites || [];
  const favoriteIds = new Set(userFavorites.map((fav) => fav._id));
  const brands = [...new Set(sneakers.map((sneaker) => sneaker.brand))];
  const models = [...new Set(sneakers.map((sneaker) => sneaker.model))];
  const sizes = [
    ...new Set(
      sneakers.flatMap((sneaker) => sneaker.sizes.map((size) => size.size))
    ),
  ].sort((a, b) => a - b);

  return (
    <Box component="section" className="sneakers-page">
      <Box className="header-container">
        <Container maxWidth="xl">
          <Typography
            variant="h"
            component="h1"
            className="page-title"
            gutterBottom
          >
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "Shop For Sneakers"}
          </Typography>
        </Container>
        <Typography variant="subtitle1" className="welcome-message">
          {searchQuery
            ? `Showing results for "${searchQuery}". Use our smart filters to refine your search.`
            : "Welcome to our exclusive collection. Find your perfect pair with ease using our smart filters."}
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
                <Typography variant="h6" gutterBottom>
                  Filters
                </Typography>
                <Divider />
                <FormGroup>
                  <Typography variant="subtitle1">Brands</Typography>
                  {brands.map((brand) => (
                    <FormControlLabel
                      key={brand}
                      control={
                        <Checkbox
                          checked={filters.brands.includes(brand)}
                          onChange={(e) =>
                            handleFilterChange(
                              "brands",
                              e.target.checked
                                ? [...filters.brands, brand]
                                : filters.brands.filter((b) => b !== brand)
                            )
                          }
                        />
                      }
                      label={brand}
                    />
                  ))}
                </FormGroup>
                <Divider />
                <FormGroup>
                  <Typography variant="subtitle1">Models</Typography>
                  {models.map((model) => (
                    <FormControlLabel
                      key={model}
                      control={
                        <Checkbox
                          checked={filters.models.includes(model)}
                          onChange={(e) =>
                            handleFilterChange(
                              "models",
                              e.target.checked
                                ? [...filters.models, model]
                                : filters.models.filter((m) => m !== model)
                            )
                          }
                        />
                      }
                      label={model}
                    />
                  ))}
                </FormGroup>
                <Divider />
                <Box>
                  <Typography variant="subtitle1">US Men Sizes</Typography>
                  <Box display="flex" flexWrap="wrap">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={
                          filters.usMenSizes.includes(size)
                            ? "contained"
                            : "outlined"
                        }
                        size="small"
                        onClick={() =>
                          handleFilterChange(
                            "usMenSizes",
                            filters.usMenSizes.includes(size)
                              ? filters.usMenSizes.filter((s) => s !== size)
                              : [...filters.usMenSizes, size]
                          )
                        }
                        style={{ margin: "4px" }}
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
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={
                          filters.usWomenSizes.includes(size - 1.5)
                            ? "contained"
                            : "outlined"
                        }
                        size="small"
                        onClick={() =>
                          handleFilterChange(
                            "usWomenSizes",
                            filters.usWomenSizes.includes(size - 1.5)
                              ? filters.usWomenSizes.filter(
                                  (s) => s !== size - 1.5
                                )
                              : [...filters.usWomenSizes, size - 1.5]
                          )
                        }
                        style={{ margin: "4px" }}
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
                    onChange={(_, newValue) =>
                      handleFilterChange("priceRange", newValue)
                    }
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                  />
                  <Typography>
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </Typography>
                </Box>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.onSale}
                        onChange={(e) =>
                          handleFilterChange("onSale", e.target.checked)
                        }
                      />
                    }
                    label="On Sale"
                  />
                </FormGroup>
                <Divider />
                <FormGroup>
                  <Typography variant="subtitle1">Search</Typography>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    placeholder="Search sneakers..."
                  />
                </FormGroup>
                <Divider />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={applyFilters}
                  fullWidth
                  style={{ marginTop: "16px" }}
                >
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
                    <SneakerCard
                      sneaker={sneaker}
                      isFavorite={favoriteIds.has(sneaker._id)}
                      refetchFavorites={refetchFavorites}
                    />
                  </Grid>
                ))
              ) : (
                <Typography>
                  No sneakers found matching the current filters.
                </Typography>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SneakersPage;
