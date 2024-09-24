import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import '../styles/Navbar.css';
import SearchDropdown from './SearchDropdown';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleSearchClick = () => {
    console.log("Search clicked"); // Add this line
    setIsSearchActive(true);
  };

  const handleSearchClose = () => {
    console.log("Search closed"); // Add this line
    setIsSearchActive(false);
  };

  console.log("isSearchActive:", isSearchActive); // Add this line

  return (
    <AppBar position="fixed" className={`navbar ${scrolled ? 'scrolled' : ''}`} elevation={0}>
      <Toolbar className="toolbar">
        {!isSearchActive ? (
          <>
            <Box className="navbar-section">
              <Search onClick={handleSearchClick}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Box>

            <Typography variant="h4" className="navbar-title navbar-section">
              Vaulted Kicks
            </Typography>

            <Box className="navbar-links navbar-section">
              <a href="#" className="nav-link">Men</a>
              <a href="#" className="nav-link">Women</a>
              <a href="#" className="nav-link">Kids</a>
              <a href="#" className="nav-link">Sale</a>
              <a href="#" className="nav-link">Login</a>
            </Box>
          </>
        ) : (
          <SearchDropdown onClose={handleSearchClose} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
