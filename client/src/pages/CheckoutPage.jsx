import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_PAYMENT_INTENT, ADD_ORDER } from "../utils/mutations";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Auth from "../utils/auth";
import {
  Box,
  Typography,
  Container,
  Grid,
  Divider,
  Button,
  Paper,
  CircularProgress,
  TextField,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import "../styles/CheckoutPage.css";

const stripePromise = loadStripe(
  "pk_test_51Pss2CC5VCV0wby5OZ2mDA4Y7UXCzQZxp50KhC6wxYYcovcPV76x1eABHWwHU2DBr8BeFNoV5dVbLfA8d7418Pl400ncMpKkjH"
);

const PaymentForm = ({ total, shippingInfo, isFormValid, sneaker, selectedSize, handleOrderCreation }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements || !isFormValid) {
      setProcessing(false);
      return;
    }

    try {
      const { data } = await createPaymentIntent({
        variables: { amount: Math.round(total * 100) },
      });
      const clientSecret = data.createPaymentIntent.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: shippingInfo.fullName,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zipCode,
            },
          },
        },
      });

      if (result.error) {
        setError(`Payment failed: ${result.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setSucceeded(true);
        // Call handleOrderCreation after successful payment
        await handleOrderCreation();
      }
    } catch (err) {
      setError("An error occurred while processing your payment.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <Typography variant="h6" gutterBottom>
        Payment Details
      </Typography>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!stripe || processing || succeeded || !isFormValid}
        className="pay-button"
      >
        {processing ? (
          <CircularProgress size={24} />
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </Button>
      {succeeded && (
        <div className="payment-success">
          Payment succeeded! Thank you for your purchase.
        </div>
      )}
    </form>
  );
};

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sneaker, selectedSize } = location.state || {};
  const [shippingOption, setShippingOption] = useState("lowest");
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isGuest, setIsGuest] = useState(!Auth.loggedIn());

  const [addOrder] = useMutation(ADD_ORDER);

  const handleOrderCreation = async () => {
    if (Auth.loggedIn()) {
      try {
        const { data } = await addOrder({
          variables: {
            input: {
              items: [{
                sneakerId: sneaker._id,
                size: parseFloat(selectedSize),
                quantity: 1,
                price: sneaker.salePrice || sneaker.price
              }],
              total: total,
              shippingAddress: {
                fullName: shippingInfo.fullName,
                address: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                zipCode: shippingInfo.zipCode
              }
            }
          }
        });
        console.log('Order added:', data.addOrder);
        // Redirect to the orders page after successful order creation
        navigate('/orders');
      } catch (err) {
        console.error('Error adding order:', err);
      }
    } else {
      console.log('User not logged in, order not saved');
      // Redirect to the confirmation page for guest users
      navigate('/checkout-confirmation', {
        state: {
          orderDetails: {
            orderNumber: 'G-' + Math.random().toString(36).substr(2, 9),
            total: total,
            estimatedDelivery: '3-5 business days',
            shippingAddress: shippingInfo,
            sneaker: {
              ...sneaker,
              selectedSize: selectedSize
            }
          }
        }
      });
    }
  };

  useEffect(() => {
    const checkFormValidity = () => {
      const requiredFields = ['fullName', 'address', 'city', 'state', 'zipCode'];
      if (isGuest) {
        requiredFields.push('email');
      }
      
      const allFieldsFilled = requiredFields.every(field => shippingInfo[field].trim() !== '');
      setIsFormValid(allFieldsFilled);
    };

    checkFormValidity();
  }, [shippingInfo, isGuest]);

  if (!sneaker) {
    return (
      <Typography>
        No sneaker selected. Please go back and select a sneaker.
      </Typography>
    );
  }

  const subtotal = sneaker.salePrice || sneaker.price;
  const shipping = shippingOption === "lowest" ? 5.99 : 14.99;
  const tax = subtotal * 0.08; // Assuming 8% tax rate
  const total = subtotal + shipping + tax;

  const handleShippingInfoChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGuestCheckout = () => {
    setIsGuest(true);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Container maxWidth="lg" className="checkout-page">
      <Typography variant="h4" component="h1" gutterBottom className="checkout-title">
        Checkout
      </Typography>
      <Stepper activeStep={1} alternativeLabel className="checkout-stepper">
        <Step><StepLabel>Cart</StepLabel></Step>
        <Step><StepLabel>Shipping & Payment</StepLabel></Step>
        <Step><StepLabel>Confirmation</StepLabel></Step>
      </Stepper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="checkout-paper">
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            <Divider className="summary-divider" />
            <Box className="sneaker-summary">
              <img
                src={sneaker.imageUrl}
                alt={sneaker.name}
                className="sneaker-image"
              />
              <Box className="sneaker-details">
                <Typography variant="h6">{sneaker.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  US {sneaker.gender} Size {selectedSize}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {sneaker.brand}
                </Typography>
                <Typography variant="h6" className="sneaker-price">
                  ${(sneaker.salePrice || sneaker.price).toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Divider className="summary-divider" />
            <Typography variant="h6" gutterBottom>
              Shipping Options
            </Typography>
            <Box className="shipping-options">
              <Paper
                elevation={2}
                className={`shipping-option ${
                  shippingOption === "lowest" ? "selected" : ""
                }`}
                onClick={() => setShippingOption("lowest")}
              >
                <Typography variant="subtitle1">Standard Shipping</Typography>
                <Typography variant="h6">$5.99</Typography>
                <Typography variant="body2" color="textSecondary">
                  Delivery in 5-7 business days
                </Typography>
              </Paper>
              <Paper
                elevation={2}
                className={`shipping-option fastest ${
                  shippingOption === "fastest" ? "selected" : ""
                }`}
                onClick={() => setShippingOption("fastest")}
              >
                <Typography variant="subtitle1">Express Shipping</Typography>
                <Typography variant="h6">$14.99</Typography>
                <Typography variant="body2" color="textSecondary">
                  Delivery in 1-3 business days
                </Typography>
              </Paper>
            </Box>
            <Divider className="summary-divider" />
            <Box className="cost-summary">
              <Box className="cost-item">
                <Typography>Subtotal</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box className="cost-item">
                <Typography color="textSecondary">Shipping</Typography>
                <Typography color="textSecondary">
                  ${shipping.toFixed(2)}
                </Typography>
              </Box>
              <Box className="cost-item">
                <Typography color="textSecondary">Estimated Tax</Typography>
                <Typography color="textSecondary">${tax.toFixed(2)}</Typography>
              </Box>
              <Divider className="summary-divider" />
              <Box className="cost-item total">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="checkout-paper">
            {isGuest || Auth.loggedIn() ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Shipping Information
                </Typography>
                <Divider className="summary-divider" />
                {isGuest && (
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={handleShippingInfoChange}
                    margin="normal"
                  />
                )}
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleShippingInfoChange}
                  margin="normal"
                />
                <TextField
                  required
                  fullWidth
                  label="Address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingInfoChange}
                  margin="normal"
                />
                <TextField
                  required
                  fullWidth
                  label="City"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingInfoChange}
                  margin="normal"
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      label="State"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingInfoChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      label="ZIP Code"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingInfoChange}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Billing address same as shipping"
                  className="billing-checkbox"
                />
                <Divider className="summary-divider" />
                
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    total={total}
                    shippingInfo={shippingInfo}
                    isFormValid={isFormValid}
                    sneaker={sneaker}
                    selectedSize={selectedSize}
                    handleOrderCreation={handleOrderCreation}
                  />
                </Elements>
              </>
            ) : (
              <Box className="guest-options">
                <Typography variant="h6" gutterBottom>
                  Checkout Options
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSignUp}
                  className="signup-button"
                >
                  Sign Up
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleGuestCheckout}
                  className="guest-button"
                >
                  Continue as Guest
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
