/* eslint-disable no-unused-vars */
import React from 'react';
import axios from "axios";
import shortid from 'shortid';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import { rows as mainEventData } from './DataComponent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TableContainer from '@material-ui/core/TableContainer';
import DialogContentText from '@material-ui/core/DialogContentText';

function createData(name, disabledToggle, breakoutCheckbox, webinarCheckbox) {
  return { name, disabledToggle, breakoutCheckbox, webinarCheckbox };
}

const rows = [
  createData('GHEE 2021 logo (September 25, 2021)', true, false, false),
  createData('GADEE 2021 logo (November 13, 2021', true, false, false),
  createData('STEM 2022 logo Spring Edition (January 29, 2022)', true, false, false),
  createData('GADEE 2022 logo (March 26, 2022)', true, false, false),
  createData('GLAEE 2022 logo (April 23, 2022)', true, false, false),
  createData('GBMEE 2022 logo (June 25, 2022)', true, false, false),
  createData('GEEE 2022 logo (August 06, 2022)', true, false, false),
  createData('GHEE 2022 logo (September 24, 2022)', true, false, false),
  createData('GADEE 2022 logo Fall Edition (October 15, 2022)', true, false, false),
  createData('STEM 2022 logo Fall Edition (November 13, 2022)', true, false, false),
];

const headCells = [
  { id: 'name', numeric: false, label: 'Event Name' },
  { id: 'expo', numeric: true, label: 'Main Expo' },
  { id: 'breakout', numeric: true, label: 'Breakout Session' },
  { id: 'webinars', numeric: true, label: 'Post-Event Webinar' },
];

function EnhancedTableHead(props) {
  return (
    <TableHead sx={{ pt: 5 }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.id === 'name' ? 'left' : 'center'}>
            <Typography variant="h6">{headCell.label}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EventSelection() {
  const [selected, setSelected] = React.useState([]);
  const [breakoutPrice, setBreakoutPrice] = React.useState(0);
  const [webinarPrice, setWebinarPrice] = React.useState(0);
  const [mainEventPrice, setMainEventPrice] = React.useState(0);

  React.useEffect(() => {
    console.log(`breakoutPrice`, breakoutPrice)
  }, [breakoutPrice])
  React.useEffect(() => {
    console.log(`webinarPrice`, webinarPrice)
  }, [webinarPrice])
  React.useEffect(() => {
    console.log(`mainEventPrice`, mainEventPrice)
  }, [mainEventPrice])

  const handleBreakoutPrice = (event, name) => {
    let result = rows.find(obj => {
      return obj.name === name;
    })
    result.breakoutCheckbox = !result.breakoutCheckbox;
    if (result.breakoutCheckbox) {
      setBreakoutPrice(prev => prev + 500);
    } else {
      setBreakoutPrice(prev => prev - 500);
    }
  }

  const handleWebinarPrice = (event, name) => {
    let result = rows.find(obj => {
      return obj.name === name;
    })
    result.webinarCheckbox = !result.webinarCheckbox;
    if (result.webinarCheckbox) {
      setWebinarPrice(prev => prev + 350);
    } else {
      setWebinarPrice(prev => prev - 350);
    }
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let result = rows.find(obj => {
      return obj.name === name;
    })
    result.disabledToggle = !result.disabledToggle;
    if (result.disabledToggle) {
      if (result.webinarCheckbox) {
        setWebinarPrice(prev => prev - 350);
      }
      if (result.breakoutCheckbox) {
        setBreakoutPrice(prev => prev - 500);
      }
      result.webinarCheckbox = false;
      result.breakoutCheckbox = false;

    }
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    const newSelectedLength = newSelected.length;
    let check = mainEventData.find(obj => {
      return obj.id === newSelectedLength;
    })
    setMainEventPrice(check?.price);
  };

  const isSelected = (name) => {
    return selected.indexOf(name) !== -1;
  }

  const razorpayPayment = (event) => {
    console.log('Hi')
    let id = shortid.generate();
    let orders = {
      amount: (mainEventPrice + webinarPrice + breakoutPrice)*100,
      currency: "USD",
      receipt: id,
    }

    axios.post('http://localhost:5000/order', orders)
      .then(response => {
        console.log(`response`, response);
        let options = {
          "key": "rzp_test_lJJR8GoVGaIpBa",
          "amount": response.data.amount,
          "currency": response.data.currency,
          "name": "ZistaEdu",
          "description": "Test Transaction",
          "image": "https://image.shutterstock.com/image-vector/ninja-assassin-mascot-logo-vector-260nw-1760442626.jpg",
          "order_id": response.data.id,
          "callback_url": "http://localhost:5000/order_complete",
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#424242"
          }
        };

        let rzp = new window.Razorpay(options);
        rzp.open();
      }
    );
  }

  const [open, setOpen] = React.useState(false);
  const [emptyCartError, setEmptyCartError] = React.useState(false);

  const handleClickOpen = () => {
    if (mainEventPrice + webinarPrice + breakoutPrice === 0) {
      setEmptyCartError(true);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEmptyCart = () => {
    setEmptyCartError(false);
  };

  return (
    <div>
      <Paper elevation={3}>
        <TableContainer>
          <Table size={'small'}>
            <EnhancedTableHead
              numSelected={selected.length}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" sx={{ borderRight: 'solid 1px #DCDCDC' }}>{row.name}</TableCell>
                    <TableCell align="center" sx={{ borderRight: 'solid 1px #DCDCDC' }}>
                      <Checkbox
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, row.name)}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderRight: 'solid 1px #DCDCDC' }}>
                      <Checkbox
                        checked={row.breakoutCheckbox}
                        disabled={row.disabledToggle}
                        onChange={(event) => handleBreakoutPrice(event, row.name)}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={row.webinarCheckbox}
                        disabled={row.disabledToggle}
                        onChange={(event) => handleWebinarPrice(event, row.name)}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box mt={6} display="flex" justifyContent="center">
        <Button sx={{ width: "250px", height: "45px" }} variant="contained" color="primary" onClick={(event) => handleClickOpen(event)}>
          Submit Order
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText id="razorpayDialogDescription">
            <Typography variant='h5' mb={3} mt={3}>ORDER SUMMARY:</Typography>
            <Paper elevation={3}>
              <Box display='flex' justifyContent='center' flexDirection='column' p={2}>
                <Typography variant="h6">Main Events Total Price: ${mainEventPrice}</Typography>
                <Typography variant="h6">Breakout Session Total Price: ${breakoutPrice}</Typography>
                <Typography variant="h6">Post-Event Webinar Total Price: ${webinarPrice}</Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />
                <Typography variant="h6">All Items Total Price: ${mainEventPrice + webinarPrice + breakoutPrice}</Typography>
              </Box>
            </Paper>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{pr:'24px'}}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={razorpayPayment} variant="contained" color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={emptyCartError}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You haven't selected any event. Select atleast one event to checkout.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmptyCart} color="primary" variant="contained" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
