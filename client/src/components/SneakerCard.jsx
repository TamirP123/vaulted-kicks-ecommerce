import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import "../styles/SneakerCard.css"; // Import the new CSS file

const SneakerCard = ({ sneaker, isFavorite, refetchFavorites }) => {
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);
  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);
  const [removeFromFavorites] = useMutation(REMOVE_FROM_FAVORITES);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    if (!Auth.loggedIn()) {
      setSnackbarMessage("Please log in to manage favorites");
      setOpenSnackbar(true);
      return;
    }

    try {
      if (localIsFavorite) {
        await removeFromFavorites({ variables: { sneakerId: sneaker._id } });
        setSnackbarMessage("Removed from favorites");
      } else {
        await addToFavorites({ variables: { sneakerId: sneaker._id } });
        setSnackbarMessage("Added to favorites");
      }
      setLocalIsFavorite(!localIsFavorite);
      setOpenSnackbar(true);
      if (refetchFavorites) refetchFavorites();
    } catch (error) {
      console.error("Error updating favorites:", error);
      setSnackbarMessage("Error updating favorites");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Card className="sneaker-card">
        <Link
          to={`/sneaker/${sneaker._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {sneaker.onSale && (
            <Typography className="sale-label" variant="body2">
              Sale
            </Typography>
          )}
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
            <Typography
              className="sneaker-name"
              variant="subtitle2"
              component="h3"
            >
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
        </Link>
        <IconButton
          className="favorite-button"
          aria-label="toggle favorite"
          onClick={handleFavoriteClick}
        >
          {localIsFavorite ? (
            <Favorite className="favorite-icon" color="error" />
          ) : (
            <FavoriteBorder className="favorite-icon" />
          )}
        </IconButton>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SneakerCard;