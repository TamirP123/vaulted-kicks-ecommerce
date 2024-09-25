import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Divider,
  Button,
  Grid
} from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/CheckoutConfirmation.css';

const CheckoutConfirmation = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return (
      <Container maxWidth="md" className="checkout-confirmation">
        <Typography variant="h4" gutterBottom>Order Confirmation Unavailable</Typography>
        <Typography>Sorry, we couldn't retrieve your order details.</Typography>
        <Button component={Link} to="/" variant="contained" color="primary" className="home-button">
          Return to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="checkout-confirmation">
      <Paper elevation={3} className="confirmation-paper">
        <Box className="confirmation-header">
          <FaCheckCircle className="confirmation-icon" />
          <Typography variant="h4" gutterBottom>Order Confirmed!</Typography>
          <Typography variant="subtitle1">Thank you for your purchase</Typography>
        </Box>
        <Divider className="confirmation-divider" />
        <Box className="confirmation-details">
          <Typography variant="h6" gutterBottom>Order Summary</Typography>
          <Box className="order-summary">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <img src={orderDetails.sneaker.imageUrl} alt={orderDetails.sneaker.name} className="order-sneaker-image" />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">{orderDetails.sneaker.name}</Typography>
                <Typography>Brand: {orderDetails.sneaker.brand}</Typography>
                <Typography>Size: US {orderDetails.sneaker.gender} {orderDetails.selectedSize}</Typography>
                <Typography>Price: ${orderDetails.sneaker.salePrice || orderDetails.sneaker.price}</Typography>
              </Grid>
            </Grid>
            <Divider className="confirmation-divider" />
            <Typography>Order Number: <strong>{orderDetails.orderNumber}</strong></Typography>
            <Typography>Total Amount: <strong>${orderDetails.total.toFixed(2)}</strong></Typography>
            <Typography>Estimated Delivery: <strong>{orderDetails.estimatedDelivery}</strong></Typography>
          </Box>
        </Box>
        <Divider className="confirmation-divider" />
        <Box className="shipping-details">
          <Typography variant="h6" gutterBottom>Shipping Information</Typography>
          <Typography>{orderDetails.shippingAddress.fullName}</Typography>
          <Typography>{orderDetails.shippingAddress.address}</Typography>
          <Typography>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}</Typography>
        </Box>
        <Box className="confirmation-actions">
          <Button variant="contained" color="primary" className="track-order-button">
            Track Your Order
          </Button>
          <Button component={Link} to="/" variant="outlined" color="primary" className="continue-shopping-button">
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CheckoutConfirmation;
