import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_ORDERS } from "../utils/queries";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import "../styles/OrdersPage.css";

// Add this utility function
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return format(parseISO(dateString), "MMMM d, yyyy");
  } catch (error) {
    console.error("Error parsing date:", error);
    return "Invalid Date";
  }
};

const OrdersPage = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_USER_ORDERS);

  useEffect(() => {
    refetch();
  }, [refetch]);

  console.log("OrdersPage Query Result:", { loading, error, data });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const { userOrders } = data || {};

  console.log("User Orders:", userOrders);

  if (!userOrders || userOrders.length === 0) {
    return (
      <Container maxWidth="lg" className="orders-page">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          className="page-title"
        >
          My Orders
        </Typography>
        <Paper elevation={3} className="no-orders-paper">
          <Typography variant="h6" align="center">
            No orders have been placed yet.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="orders-page">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="page-title"
      >
        My Orders
      </Typography>
      {userOrders.map((order) => (
        <Paper key={order._id} elevation={3} className="order-paper">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Order #{order._id.slice(-6)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Placed on {formatDate(order.orderDate)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className="order-status">
              <Chip
                label={order.status}
                color={order.status === "Delivered" ? "success" : "primary"}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Items:
              </Typography>
              {order.items.map((item, index) => (
                <Box key={index} className="order-item">
                  {item.sneaker ? (
                    <>
                      <img
                        src={item.sneaker.imageUrl}
                        alt={item.sneaker.name}
                        className="order-item-image"
                      />
                      <Box>
                        <Typography variant="body1">
                          {item.sneaker.name} - Size {item.size}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Quantity: {item.quantity} x ${item.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Typography variant="body1">
                      Item no longer available - Size {item.size}, Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                    </Typography>
                  )}
                </Box>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Shipping Address:
              </Typography>
              <Typography variant="body2">
                {order.shippingAddress.fullName}
                <br />
                {order.shippingAddress.address}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zipCode}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className="order-total">
              <Typography variant="h6">
                Total: ${order.total.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
};

export default OrdersPage;
