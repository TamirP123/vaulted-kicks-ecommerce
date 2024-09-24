import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_LATEST_PICKS } from '../utils/queries';
import { Link } from 'react-router-dom'; // Add this import
import {
  Box,
  Typography,
  InputBase,
  Grid,
  IconButton,
} from '@mui/material';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../styles/SearchDropdown.css';

const SearchDropdown = ({ onClose }) => {
  const { data: latestPicksData } = useQuery(QUERY_LATEST_PICKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSneakers, setFilteredSneakers] = useState([]);

  const latestPicks = latestPicksData?.latestPicks || [];

  useEffect(() => {
    if (latestPicks.length > 0) {
      const filtered = latestPicks.filter(sneaker => 
        sneaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sneaker.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSneakers(filtered);
    }
  }, [searchTerm, latestPicks]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box className="search-dropdown">
      <Box className="search-input-container">
        <FaSearch className="search-icon" />
        <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          autoFocus
        />
        <IconButton onClick={onClose} className="close-button">
          <FaTimes />
        </IconButton>
      </Box>
      <Box className="search-content">
        <Typography variant="h6" className="section-title">
          {searchTerm ? 'Search Results' : 'Latest Picks'}
        </Typography>
        <Grid container spacing={2}>
          {(searchTerm ? filteredSneakers : latestPicks).slice(0, 8).map((sneaker) => (
            <Grid item xs={6} sm={4} md={3} key={sneaker._id}>
              <Link to={`/sneaker/${sneaker._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box className="dropdown-sneaker-item">
                  <img
                    src={sneaker.imageUrl}
                    alt={sneaker.name}
                    className="dropdown-sneaker-image"
                  />
                  <Typography variant="body2" className="dropdown-sneaker-name">
                    {sneaker.name}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
        {searchTerm && filteredSneakers.length === 0 && (
          <Typography variant="body1" className="no-results">
            No sneakers found matching your search.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchDropdown;