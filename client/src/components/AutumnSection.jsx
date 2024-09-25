import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_AUTUMN_SNEAKERS, QUERY_USER_FAVORITES } from "../utils/queries";
import SneakerCard from "./SneakerCard";
import {
  Box,
  Typography,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";
import Auth from "../utils/auth";
import "../styles/AutumnSection.css";

const AutumnSection = () => {
  const { loading, error, data } = useQuery(QUERY_AUTUMN_SNEAKERS);
  const { data: favoritesData, refetch: refetchFavorites } = useQuery(QUERY_USER_FAVORITES, {
    skip: !Auth.loggedIn(),
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const autumnSneakers = data.autumnSneakers;
  const userFavorites = favoritesData?.me?.favorites || [];
  const favoriteIds = new Set(userFavorites.map(fav => fav._id));

  return (
    <Box component="section" className="autumn-section">
      <Container maxWidth="lg">
        <Typography variant="h5" component="h2" className="section-title">
          Autumn Collection
        </Typography>
        <Grid sx={{ mt: 2 }} container spacing={4} className="sneaker-grid">
          {autumnSneakers.map((sneaker) => (
            <Grid item key={sneaker._id} xs={12} sm={6} md={3}>
              <SneakerCard 
                sneaker={sneaker} 
                isFavorite={favoriteIds.has(sneaker._id)}
                refetchFavorites={refetchFavorites}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AutumnSection;
