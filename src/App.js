/* eslint-disable no-unused-vars */
import "./App.css";
import React from "react";
import axios from "axios";
import "react-awesome-button/dist/styles.css";
import Box from '@material-ui/core/Box';
import DataComponent from "./DataComponent";
import { BrowserRouter as Router } from 'react-router-dom';
import { Typography } from "@material-ui/core";
import EventSelection from "./EventSelection";

export function App() {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Router>
        <Box display='flex' justifyContent='center' flexDirection='column' m={4}>
          <Typography variant='h5' mb={3} sx={{ fontFamily: 'Play sansSerif' }}>PARTICIPATION FEE DETAILS:</Typography>
          <DataComponent />
        </Box>
        <Box display='flex' justifyContent='center' flexDirection='column' m={4}>
          <Typography variant='h5' mb={3} sx={{ fontFamily: 'Play sansSerif' }}>EVENTS SELECTION DETAILS:</Typography>
          <EventSelection />
        </Box>
      </Router>
    </>
  );
}
