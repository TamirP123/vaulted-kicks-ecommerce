import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  Drawer,
} from "@mui/material";
import { IoMdClose } from 'react-icons/io'; // Import the close icon from React Icons
import '../styles/SingleSneakerPage.css';

const SingleSneakerPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_SNEAKER, {
    variables: { id },
  });
  const [selectedSize, setSelectedSize] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;
  if (!data || !data.sneaker) return <Typography>Sneaker not found</Typography>;

  const sneaker = data.sneaker;
  const currentPrice = sneaker.salePrice || sneaker.price;

  const handlePurchase = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { sneaker, selectedSize } });
    handleCloseDrawer();
  };

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
            {sneaker.salePrice ? (
              <>
                <span className="original-price">${sneaker.price.toFixed(2)}</span>
                <span className="sale-price">${sneaker.salePrice.toFixed(2)}</span>
              </>
            ) : (
              `$${sneaker.price.toFixed(2)}`
            )}
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
            onClick={handlePurchase}
          >
            {selectedSize ? `Purchase for $${currentPrice.toFixed(2)}` : 'Select Size'}
          </Button>
          
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
            className="purchase-drawer"
          >
            <Box className="purchase-drawer-content">
              <Box className="purchase-drawer-header">
                <Typography variant="h6" className="purchase-drawer-title">
                  {sneaker.name}
                </Typography>
                <Typography variant="subtitle1" className="purchase-drawer-size">
                  US {sneaker.gender} Size {selectedSize}
                </Typography>
                <button
                  aria-label="close"
                  onClick={handleCloseDrawer}
                  className="purchase-drawer-close"
                >
                  <IoMdClose />
                </button>
              </Box>
              <Divider />
              <Box className="purchase-drawer-details">
                <Box className="purchase-drawer-price-box">
                  <Typography variant="h5" className="purchase-drawer-price">
                    ${currentPrice.toFixed(2)}
                  </Typography>
                  {sneaker.salePrice && (
                    <Typography variant="body2" className="purchase-drawer-original-price">
                      Original price: ${sneaker.price.toFixed(2)}
                    </Typography>
                  )}
                  <Typography variant="body2" className="purchase-drawer-tax-info">
                    Tax not included. Shipping calculated at checkout.
                  </Typography>
                </Box>
                <Typography variant="body2" className="purchase-drawer-policy">
                  All sales are final. Please review our return policy for more information.
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="purchase-drawer-checkout-button"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Drawer>
        </div>
      </div>
    </Container>
  );
};

export default SingleSneakerPage;
