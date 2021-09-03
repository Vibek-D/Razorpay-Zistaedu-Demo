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

  return (
    <>
      <Router>
        <Box display='flex' justifyContent='center' flexDirection='column' m={4}>
          <Typography variant='h5' mb={3}>PARTICIPATION FEE DETAILS:</Typography>
          <DataComponent />
        </Box>
        <Box display='flex' justifyContent='center' flexDirection='column' m={4}>
          <Typography variant='h5' mb={3}>EVENT SELECTION DATATABLE:</Typography>
          <EventSelection />
        </Box>
      </Router>
    </>
  );
}
