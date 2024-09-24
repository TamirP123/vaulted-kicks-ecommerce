import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_AUTUMN_SNEAKERS } from "../utils/queries";
import { Link } from "react-router-dom"; // Add this import
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Grid,
  Container,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import "../styles/AutumnSection.css";

const SneakerCard = ({ sneaker }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <Card className="sneaker-card">
      <Link to={`/sneaker/${sneaker._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {sneaker.onSale && (
          <Typography className="sale-label" variant="body2">
            Sale
          </Typography>
        )}
        <IconButton
          className="favorite-button"
          aria-label="add to favorites"
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
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
                <Typography className="sale-price" variant="body1">
                  ${sneaker.salePrice.toFixed(2)}
                </Typography>
                <Typography className="original-price" variant="body2">
                  ${sneaker.price.toFixed(2)}
                </Typography>
              </Box>
            ) : (
              <Typography className="price" variant="body1">
                ${sneaker.price.toFixed(2)}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
};

const AutumnSection = () => {
  const { loading, error, data } = useQuery(QUERY_AUTUMN_SNEAKERS);

  if (loading) return <Box className="loading">Loading...</Box>;
  if (error) {
    console.error('Error fetching autumn sneakers:', error);
    return <Box className="error">Error: {error.message}</Box>;
  }

  const autumnSneakers = data?.autumnSneakers || [];

  if (autumnSneakers.length === 0) {
    return <Box className="no-data">No autumn sneakers available</Box>;
  }

  return (
    <Box component="section" className="autumn-section">
      <Container maxWidth="lg">
        <Typography variant="h5" component="h2" className="section-title">
          Autumn Collection
        </Typography>
        <Grid sx={{mt:2}} container spacing={4} className="sneaker-grid">
          {autumnSneakers.map((sneaker) => (
            <Grid item key={sneaker._id} xs={12} sm={6} md={3}>
              <SneakerCard sneaker={sneaker} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AutumnSection;
