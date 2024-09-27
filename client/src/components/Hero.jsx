import React from 'react';
import '../styles/Hero.css'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import heroSneaker from '/assets/heroSneaker.png';

const Hero = () => {
  return (
    <Box className="hero-container">
      <Box className="hero-content">
        <Box className="hero-text">
          <Typography variant="h1" className="hero-title">
            Jordan 4 Retro
          </Typography>
          <Typography variant="h2" className="hero-subtitle">
            'Black Cat' 2020
          </Typography>
          <Typography variant="body1" className="hero-description">
            Discover the exclusive collaboration today. Limited edition, premium quality.
          </Typography>
          <Link to="/sneakers" style={{ textDecoration: 'none', color: 'black' }}>
          <Button variant="contained" className="hero-button">
            Shop Now
          </Button>
          </Link>
        </Box>
        
        <Box className="hero-image-container">
          <img
            src={heroSneaker}
            alt="Jordan 4 Retro 'Black Cat'"
            className="hero-image"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
