import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_FAVORITES } from "../utils/queries";
import SneakerCard from "../components/SneakerCard";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import "../styles/FavoritesPage.css";

const FavoritesPage = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_USER_FAVORITES, {
    fetchPolicy: "network-only" // This ensures we always fetch from the server
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <CircularProgress className="loading-spinner" />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  const favorites = data?.me?.favorites || [];
  console.log("Favorites:", favorites);

  return (
    <Box className="favorites-page">
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          component="h1"
          className="page-title"
          sx={{ marginBottom: 3 }}
        >
          Your Favorites
        </Typography>
        {favorites.length === 0 ? (
          <Typography variant="body1" className="no-favorites">
            You haven't added any favorites yet. Start shopping and add some
            sneakers to your favorites!
          </Typography>
        ) : (
          <Grid container spacing={4} className="favorites-grid">
            {favorites.map((sneaker) => (
              <Grid
                item
                key={sneaker._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ marginBottom: 3 }}
              >
                <SneakerCard
                  sneaker={sneaker}
                  isFavorite={true}
                  refetchFavorites={refetch}
                  cardClassName="favorite-sneaker-card"
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default FavoritesPage;
