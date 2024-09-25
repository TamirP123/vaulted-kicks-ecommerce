import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_LATEST_PICKS } from '../utils/queries';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  InputBase,
  Grid,
  IconButton,
} from '@mui/material';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../styles/SearchDropdown.css';

const SearchDropdown = ({ onClose, onSubmit, searchQuery, setSearchQuery }) => {
  const { data: latestPicksData } = useQuery(QUERY_LATEST_PICKS);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const navigate = useNavigate();

  const latestPicks = latestPicksData?.latestPicks || [];

  useEffect(() => {
    if (latestPicks.length > 0) {
      const filtered = latestPicks.filter(sneaker => 
        sneaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sneaker.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSneakers(filtered);
    }
  }, [searchQuery, latestPicks]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/sneakers?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const handleSneakerClick = () => {
    onClose();
  };

  return (
    <Box className="search-dropdown">
      <Box className="search-header">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <FaSearch className="search-icon" />
          <InputBase
            placeholder="Search…"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            autoFocus
          />
        </form>
        <IconButton onClick={onClose} className="close-button">
          <FaTimes />
        </IconButton>
      </Box>
      <Box className="search-content">
        <Typography variant="h6" className="section-title">
          {searchQuery ? 'Search Results' : 'Latest Picks'}
        </Typography>
        <Grid container spacing={2}>
          {(searchQuery ? filteredSneakers : latestPicks).slice(0, 8).map((sneaker) => (
            <Grid item xs={6} sm={4} md={3} key={sneaker._id}>
              <Link 
                to={`/sneaker/${sneaker._id}`} 
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={handleSneakerClick}
              >
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
        {searchQuery && filteredSneakers.length === 0 && (
          <Typography variant="body1" className="no-results">
            No sneakers found matching your search.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchDropdown;