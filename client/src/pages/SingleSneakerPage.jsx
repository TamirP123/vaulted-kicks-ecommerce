import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_SNEAKER } from '../utils/queries';
import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
  Breadcrumbs,
  Divider,
} from "@mui/material";
import '../styles/SingleSneakerPage.css';

const SingleSneakerPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_SNEAKER, {
    variables: { id },
  });
  const [selectedSize, setSelectedSize] = useState(null);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!data || !data.sneaker) return <Typography>Sneaker not found</Typography>;

  const sneaker = data.sneaker;

  return (
    <Container maxWidth="lg" className="single-sneaker-page-container">
      <div className="single-sneaker-grid">
        <div className="single-sneaker-image-container">
          <Box className="single-sneaker-breadcrumbs-wrapper">
            <Breadcrumbs aria-label="breadcrumb" className="single-sneaker-breadcrumbs">
              <Link to="/">Vaulted Kicks</Link>
              <Link to="/sneakers">{sneaker.brand}</Link>
              <Link to={`/sneakers?model=${sneaker.model}`}>{sneaker.model}</Link>
              <Typography>{sneaker.name}</Typography>
            </Breadcrumbs>
          </Box>
          <img src={sneaker.imageUrl} alt={sneaker.name} className="single-sneaker-image" />
        </div>
        <div className="single-sneaker-details-container">
          <Typography variant="subtitle2" className="single-sneaker-brand">
            {sneaker.brand}
          </Typography>
          <Typography variant="h4" component="h1" className="single-sneaker-name">
            {sneaker.name}
          </Typography>
          <Typography className="single-sneaker-price">
            ${sneaker.price.toFixed(2)}
          </Typography>
          <Typography className="single-sneaker-description">
            {sneaker.description || "Experience ultimate comfort and style with these premium sneakers."}
          </Typography>
          <Divider style={{ margin: '24px 0' }} />
          <Box className="single-sneaker-size-wrapper">
            <Typography variant="subtitle1" className="single-sneaker-size-label">
              Select US {sneaker.gender} Size
            </Typography>
            <Box className="single-sneaker-size-chart">
              {sneaker.sizes.map((size) => (
                <Button
                  key={size.size}
                  variant={selectedSize === size.size ? "contained" : "outlined"}
                  onClick={() => setSelectedSize(size.size)}
                  className={`single-sneaker-size-button ${size.quantity === 0 ? 'single-sneaker-size-button-disabled' : ''}`}
                  disabled={size.quantity === 0}
                >
                  {size.size}
                </Button>
              ))}
            </Box>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="single-sneaker-add-to-cart-button"
            disabled={!selectedSize}
          >
            {selectedSize ? 'Add to Cart' : 'Select Size'}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SingleSneakerPage;
