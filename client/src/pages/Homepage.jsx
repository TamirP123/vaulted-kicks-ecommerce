import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Hero from "../components/Hero.jsx";
import useMediaQuery from '@mui/material/useMediaQuery';

const Homepage = () => {


  return (
    <Box>
     <Hero/>
    </Box>
  );
};

export default Homepage;
