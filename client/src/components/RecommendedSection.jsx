import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RECOMMENDED_SNEAKERS } from '../utils/queries';
import { Box, Typography, Card, CardMedia, CardContent, IconButton, Grid, Container } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import '../styles/RecommendedSection.css';

const SneakerCard = ({ sneaker }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <Card className="sneaker-card">
      <div className="card-media-container">
        <CardMedia
          component="img"
          image={sneaker.imageUrl}
          alt={sneaker.name}
          className="card-media"
        />
        <IconButton
          className="favorite-button"
          aria-label="add to favorites"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </div>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {sneaker.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {sneaker.brand}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="text.primary">
            ${sneaker.price.toFixed(2)}
          </Typography>
          {sneaker.onSale && (
            <Typography variant="body2" color="error">
              Sale: ${sneaker.salePrice.toFixed(2)}
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
        <Grid container spacing={4}>
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