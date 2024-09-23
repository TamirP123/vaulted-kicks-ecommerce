import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_RECOMMENDED_SNEAKERS } from "../utils/queries";
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
import "../styles/RecommendedSection.css";

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

const RecommendedSection = () => {
  const { loading, error, data } = useQuery(QUERY_RECOMMENDED_SNEAKERS);

  if (loading) return <Box className="loading">Loading...</Box>;
  if (error) return <Box className="error">Error: {error.message}</Box>;

  const recommendedSneakers = data.recommendedSneakers;

  return (
    <Box component="section" className="recommended-section">
      <Container maxWidth="lg">
        <Typography variant="h5" component="h2" className="section-title">
          Recommended For You
        </Typography>
        <Grid  sx={{mt:2}} container spacing={4} className="sneaker-grid">
          {recommendedSneakers.map((sneaker) => (
            <Grid item key={sneaker._id} xs={12} sm={6} md={3}>
              <SneakerCard sneaker={sneaker} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default RecommendedSection;
