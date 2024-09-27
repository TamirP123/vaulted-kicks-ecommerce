import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Box,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slider,
  Icon,
  LinearProgress,
  useMediaQuery,
  Menu,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { Edit as EditIcon, Add as AddIcon, ExitToApp as LogoutIcon, Delete as DeleteIcon, TrendingUp, AttachMoney, Inventory, ShoppingCart } from "@mui/icons-material";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from "chart.js";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_SNEAKERS, QUERY_SNEAKER_COUNT, QUERY_TOTAL_SALES, QUERY_ALL_ORDERS, QUERY_ANALYTICS } from "../utils/queries";
import { UPDATE_SNEAKER, CREATE_SNEAKER, DELETE_SNEAKER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useTheme } from "@mui/material/styles";

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [editingSneaker, setEditingSneaker] = useState(null);
  const [newSneaker, setNewSneaker] = useState({
    brand: "",
    model: "",
    name: "",
    gender: "",
    sizes: [],
    price: "",
    description: "",
    imageUrl: "",
    category: "",
    releaseDate: "",
    recommended: false,
    onSale: false,
    salePrice: "",
    autumn: false,
  });
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [sneakerToDelete, setSneakerToDelete] = useState(null);

  const { data: sneakersData, refetch: refetchSneakers } = useQuery(QUERY_ALL_SNEAKERS);
  const { data: sneakerCountData } = useQuery(QUERY_SNEAKER_COUNT);
  const { data: totalSalesData } = useQuery(QUERY_TOTAL_SALES);
  const { data: ordersData } = useQuery(QUERY_ALL_ORDERS);
  const { data: analyticsData } = useQuery(QUERY_ANALYTICS);

  const [updateSneaker] = useMutation(UPDATE_SNEAKER);
  const [createSneaker] = useMutation(CREATE_SNEAKER);
  const [deleteSneaker] = useMutation(DELETE_SNEAKER);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleTabChange = (event, newValue) => setCurrentTab(newValue);

  const handleEditSneaker = (sneaker) => {
    setEditingSneaker({
      ...sneaker,
      price: sneaker.price.toString(),
      salePrice: sneaker.salePrice ? sneaker.salePrice.toString() : "",
      sizes: sneaker.sizes.map(s => ({ ...s, size: s.size.toString() }))
    });
    setCurrentTab(2);
  };

  const handleUpdateSneaker = async () => {
    try {
      const input = {
        brand: editingSneaker.brand,
        model: editingSneaker.model,
        name: editingSneaker.name,
        price: parseFloat(editingSneaker.price),
        description: editingSneaker.description,
        imageUrl: editingSneaker.imageUrl,
        sizes: editingSneaker.sizes.filter(s => s.quantity > 0).map(s => ({ size: parseFloat(s.size), quantity: parseInt(s.quantity, 10) })),
        gender: editingSneaker.gender,
        category: editingSneaker.category,
        releaseDate: editingSneaker.releaseDate,
        recommended: editingSneaker.recommended,
        onSale: editingSneaker.onSale,
        salePrice: editingSneaker.onSale ? parseFloat(editingSneaker.salePrice) : null,
        autumn: editingSneaker.autumn
      };
      await updateSneaker({ variables: { id: editingSneaker._id, input } });
      setNotification({ open: true, message: "Sneaker updated successfully", severity: "success" });
      refetchSneakers();
      setEditingSneaker(null);
      setCurrentTab(1);
    } catch (error) {
      setNotification({ open: true, message: "Error updating sneaker: " + error.message, severity: "error" });
    }
  };

  const handleCreateSneaker = async () => {
    try {
      const input = {
        brand: newSneaker.brand,
        model: newSneaker.model,
        name: newSneaker.name,
        price: parseFloat(newSneaker.price),
        description: newSneaker.description,
        imageUrl: newSneaker.imageUrl,
        sizes: newSneaker.sizes.filter(s => s.quantity > 0).map(s => ({ size: parseFloat(s.size), quantity: parseInt(s.quantity, 10) })),
        gender: newSneaker.gender,
        category: newSneaker.category,
        releaseDate: newSneaker.releaseDate,
        recommended: newSneaker.recommended,
        onSale: newSneaker.onSale,
        salePrice: newSneaker.onSale ? parseFloat(newSneaker.salePrice) : null,
        autumn: newSneaker.autumn
      };
      await createSneaker({ variables: { input } });
      setNotification({ open: true, message: "Sneaker created successfully", severity: "success" });
      refetchSneakers();
      setNewSneaker({
        brand: "",
        model: "",
        name: "",
        gender: "",
        sizes: [],
        price: "",
        description: "",
        imageUrl: "",
        category: "",
        releaseDate: "",
        recommended: false,
        onSale: false,
        salePrice: "",
        autumn: false,
      });
      setCurrentTab(1);
    } catch (error) {
      setNotification({ open: true, message: "Error creating sneaker: " + error.message, severity: "error" });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleDeleteSneaker = (sneaker) => {
    setSneakerToDelete(sneaker);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteSneaker = async () => {
    try {
      await deleteSneaker({ variables: { id: sneakerToDelete._id } });
      setNotification({ open: true, message: "Sneaker deleted successfully", severity: "success" });
      refetchSneakers();
    } catch (error) {
      setNotification({ open: true, message: "Error deleting sneaker: " + error.message, severity: "error" });
    }
    setDeleteConfirmOpen(false);
    setSneakerToDelete(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const renderDashboard = () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography color="textSecondary" variant="h6">Total Sneakers</Typography>
                <Icon component={Inventory} sx={{ fontSize: 40, color: '#4CAF50' }} />
              </Box>
              <Typography variant="h4" component="div" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                {sneakerCountData?.sneakerCount || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                +5% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography color="textSecondary" variant="h6">Total Sales</Typography>
                <Icon component={AttachMoney} sx={{ fontSize: 40, color: '#FFA000' }} />
              </Box>
              <Typography variant="h4" component="div" sx={{ color: '#FFA000', fontWeight: 'bold' }}>
                ${totalSalesData?.totalSales.toFixed(2) || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                +12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography color="textSecondary" variant="h6">Average Price</Typography>
                <Icon component={TrendingUp} sx={{ fontSize: 40, color: '#2196F3' }} />
              </Box>
              <Typography variant="h4" component="div" sx={{ color: '#2196F3', fontWeight: 'bold' }}>
                ${sneakerCountData?.sneakerCount && totalSalesData?.totalSales
                  ? (totalSalesData.totalSales / sneakerCountData.sneakerCount).toFixed(2)
                  : 0}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                -2% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography color="textSecondary" variant="h6">Processing Orders</Typography>
                <Icon component={ShoppingCart} sx={{ fontSize: 40, color: '#9C27B0' }} />
              </Box>
              <Typography variant="h4" component="div" sx={{ color: '#9C27B0', fontWeight: 'bold' }}>
                {ordersData?.allOrders.processingOrdersCount || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Active orders being processed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Sales</Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                      {
                        label: "Sales",
                        data: [65, 59, 80, 81, 56, 55, 40, 70, 75, 80, 90, 100],
                        fill: false,
                        borderColor: "#4CAF50",
                        tension: 0.1,
                      },
                      {
                        label: "Orders",
                        data: [28, 48, 40, 19, 86, 27, 90, 60, 70, 75, 85, 95],
                        fill: false,
                        borderColor: "#2196F3",
                        tension: 0.1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Sales by Category</Typography>
              <Box sx={{ height: 300 }}>
                <Pie
                  data={{
                    labels: ["Running", "Lifestyle", "Basketball", "Training"],
                    datasets: [{
                      data: [300, 50, 100, 80],
                      backgroundColor: ["#4CAF50", "#FFA000", "#2196F3", "#9C27B0"],
                    }],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Selling Products */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Top Selling Products</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Sold</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { name: "Nike Air Max 90", price: 120, sold: 200, revenue: 24000 },
                    { name: "Adidas Ultraboost", price: 180, sold: 150, revenue: 27000 },
                    { name: "Jordan 1 Retro High", price: 170, sold: 100, revenue: 17000 },
                    { name: "Puma RS-X", price: 110, sold: 80, revenue: 8800 },
                    { name: "New Balance 990", price: 175, sold: 70, revenue: 12250 },
                  ].map((product) => (
                    <TableRow key={product.name}>
                      <TableCell component="th" scope="row">{product.name}</TableCell>
                      <TableCell align="right">${product.price}</TableCell>
                      <TableCell align="right">{product.sold}</TableCell>
                      <TableCell align="right">${product.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Sales Target */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Sales Target</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress variant="determinate" value={70} sx={{ height: 10, borderRadius: 5 }} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">70%</Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 2 }}>
                $700,000 / $1,000,000
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderInventory = () => (
    <Paper elevation={3} sx={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>Sneaker Inventory</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              {!isMobile && <TableCell>Name</TableCell>}
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sneakersData?.allSneakers.map((sneaker) => (
              <TableRow key={sneaker._id}>
                <TableCell>{sneaker.brand}</TableCell>
                <TableCell>{sneaker.model}</TableCell>
                {!isMobile && <TableCell>{sneaker.name}</TableCell>}
                <TableCell>${sneaker.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Button startIcon={<EditIcon />} onClick={() => handleEditSneaker(sneaker)}>
                    {isMobile ? 'Edit' : 'Edit'}
                  </Button>
                  <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteSneaker(sneaker)} color="error">
                    {isMobile ? 'Del' : 'Delete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  const renderSneakerForm = (sneaker, isEditing) => (
    <Paper elevation={3} sx={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>{isEditing ? "Edit Sneaker" : "Add Sneaker"}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Brand"
            value={sneaker.brand}
            onChange={(e) => isEditing ? setEditingSneaker({ ...editingSneaker, brand: e.target.value }) : setNewSneaker({ ...newSneaker, brand: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Model"
            value={sneaker.model}
            onChange={(e) => isEditing ? setEditingSneaker({ ...editingSneaker, model: e.target.value }) : setNewSneaker({ ...newSneaker, model: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={sneaker.name}
            onChange={(e) => isEditing ? setEditingSneaker({ ...editingSneaker, name: e.target.value }) : setNewSneaker({ ...newSneaker, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={sneaker.gender}
              onChange={(e) => isEditing ? setEditingSneaker({ ...editingSneaker, gender: e.target.value }) : setNewSneaker({ ...newSneaker, gender: e.target.value })}
            >
              <MenuItem value="Men">Men</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
              <MenuItem value="Unisex">Unisex</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Price"
            value={sneaker.price}
            onChange={(e) => {
              const value = e.target.value;
              if (isEditing) {
                setEditingSneaker({ ...editingSneaker, price: value });
              } else {
                setNewSneaker({ ...newSneaker, price: value });
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={sneaker.description}
            onChange={(e) => isEditing ? setEditingSneaker({ ...editingSneaker, description: e.target.value }) : setNewSneaker({ ...newSneaker, description: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Image URL"
            value={sneaker.imageUrl}
            onChange={(e) => isEditing ? setEditingSneaker({ ...editingSneaker, imageUrl: e.target.value }) : setNewSneaker({ ...newSneaker, imageUrl: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Category"
            value={sneaker.category}
            onChange={(e) => isEditing ? setEditingSneaker({ ...editingSneaker, category: e.target.value }) : setNewSneaker({ ...newSneaker, category: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Release Date"
            InputLabelProps={{ shrink: true }}
            value={sneaker.releaseDate ? new Date(parseInt(sneaker.releaseDate)).toISOString().split('T')[0] : ""}
            onChange={(e) => isEditing ? setEditingSneaker({ ...editingSneaker, releaseDate: new Date(e.target.value).getTime().toString() }) : setNewSneaker({ ...newSneaker, releaseDate: new Date(e.target.value).getTime().toString() })}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>Sizes and Quantities</Typography>
          {[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12].map((size) => (
            <Grid container spacing={2} key={size} alignItems="center">
              <Grid item xs={2}>
                <Typography>{size}</Typography>
              </Grid>
              <Grid item xs={10}>
                <Slider
                  value={sneaker.sizes.find(s => parseFloat(s.size) === size)?.quantity || 0}
                  onChange={(e, newValue) => {
                    const newSizes = sneaker.sizes.filter(s => parseFloat(s.size) !== size);
                    if (newValue > 0) {
                      newSizes.push({ size: size.toString(), quantity: newValue });
                    }
                    if (isEditing) {
                      setEditingSneaker({ ...editingSneaker, sizes: newSizes });
                    } else {
                      setNewSneaker({ ...newSneaker, sizes: newSizes });
                    }
                  }}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={50}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={sneaker.recommended}
                onChange={(e) => {
                  const newValue = e.target.checked;
                  if (isEditing) {
                    setEditingSneaker({ ...editingSneaker, recommended: newValue });
                  } else {
                    setNewSneaker({ ...newSneaker, recommended: newValue });
                  }
                }}
              />
            }
            label="Recommended"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={sneaker.autumn}
                onChange={(e) => {
                  const newValue = e.target.checked;
                  if (isEditing) {
                    setEditingSneaker({ ...editingSneaker, autumn: newValue });
                  } else {
                    setNewSneaker({ ...newSneaker, autumn: newValue });
                  }
                }}
              />
            }
            label="Autumn Collection"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={sneaker.onSale}
                onChange={(e) => {
                  const newValue = e.target.checked;
                  if (isEditing) {
                    setEditingSneaker({ ...editingSneaker, onSale: newValue });
                  } else {
                    setNewSneaker({ ...newSneaker, onSale: newValue });
                  }
                }}
              />
            }
            label="On Sale"
          />
        </Grid>
        {(isEditing ? editingSneaker.onSale : newSneaker.onSale) && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Sale Price"
              value={isEditing ? editingSneaker.salePrice : newSneaker.salePrice}
              onChange={(e) => {
                const value = e.target.value;
                if (isEditing) {
                  setEditingSneaker({ ...editingSneaker, salePrice: value });
                } else {
                  setNewSneaker({ ...newSneaker, salePrice: value });
                }
              }}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={isEditing ? handleUpdateSneaker : handleCreateSneaker}
            sx={{ marginRight: 2 }}
          >
            {isEditing ? "Update Sneaker" : "Create Sneaker"}
          </Button>
          <Button variant="outlined" onClick={() => isEditing ? setEditingSneaker(null) : setNewSneaker({})}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderOrders = () => (
    <Paper elevation={3} sx={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>All Orders</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersData?.allOrders.orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{new Date(parseInt(order.orderDate)).toLocaleDateString()}</TableCell>
                <TableCell>{order.shippingAddress.fullName}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip 
                    label={order.status} 
                    color={order.status === 'Completed' ? 'success' : order.status === 'Processing' ? 'warning' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleViewOrderDetails(order)}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  const renderAnalytics = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Active Users</Typography>
            <Typography variant="h4">{analyticsData?.getAnalytics.activeUsers}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Page Views</Typography>
            <Typography variant="h4">{analyticsData?.getAnalytics.pageViews}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Avg. Session Duration</Typography>
            <Typography variant="h4">{analyticsData?.getAnalytics.averageSessionDuration.toFixed(2)} seconds</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Top Products</Typography>
            <List>
              {analyticsData?.getAnalytics.topProducts.map((product) => (
                <ListItem key={product._id}>
                  <ListItemText primary={`${product.brand} ${product.name}`} secondary={`Sales: ${product.sales}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const handleViewOrderDetails = (order) => {
    // Implement a modal or a new page to show order details
    console.log("View order details for:", order._id);
  };

  return (
    <div className="admin-dashboard">
      <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#4CAF50" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#4CAF50" }}>Admin Dashboard</Typography>
          {isMobile ? (
            <>
              <Button color="inherit" onClick={handleMobileMenuOpen}>
                Menu
              </Button>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
              >
                <MenuItem onClick={() => { setCurrentTab(0); handleMobileMenuClose(); }}>Dashboard</MenuItem>
                <MenuItem onClick={() => { setCurrentTab(1); handleMobileMenuClose(); }}>Inventory</MenuItem>
                <MenuItem onClick={() => { setCurrentTab(2); handleMobileMenuClose(); }}>{editingSneaker ? "Edit Sneaker" : "Add Sneaker"}</MenuItem>
                <MenuItem onClick={() => { setCurrentTab(3); handleMobileMenuClose(); }}>View Orders</MenuItem>
                <MenuItem onClick={() => { setCurrentTab(4); handleMobileMenuClose(); }}>Analytics</MenuItem>
                <MenuItem onClick={() => Auth.logout()}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={() => Auth.logout()}>
              <LogoutIcon /> Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {!isMobile && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={currentTab} onChange={handleTabChange} centered>
            <Tab label="Dashboard" />
            <Tab label="Sneaker Inventory" />
            <Tab label={editingSneaker ? "Edit Sneaker" : "Add Sneaker"} />
            <Tab label="View Orders" />
            <Tab label="Analytics" />
          </Tabs>
        </Box>
      )}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {currentTab === 0 && renderDashboard()}
        {currentTab === 1 && renderInventory()}
        {currentTab === 2 && renderSneakerForm(editingSneaker || newSneaker, !!editingSneaker)}
        {currentTab === 3 && renderOrders()}
        {currentTab === 4 && renderAnalytics()}
      </Container>
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the sneaker "{sneakerToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDeleteSneaker} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminDashboard;
