import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

export const rows = [
  {
    id: 1,
    name: '1 Event',
    price: 1500,
    breakout: 500,
    postEvent: 350,
  },
  {
    id: 2,
    name: '2 Events',
    price: 2900
  },
  {
    id: 3,
    name: '3 Events',
    price: 4300
  },
  {
    id: 4,
    name: '4 Events',
    price: 5700
  },
  {
    id: 5,
    name: '5 Events',
    price: 7100
  },
  {
    id: 6,
    name: '6 Events',
    price: 8500
  },
  {
    id: 7,
    name: '7 Events',
    price: 9900
  },
  {
    id: 8,
    name: '8 Events',
    price: 11000
  },
];

export default function BasicTable() {

  return (
    <TableContainer component={Paper} elevation={3} sx={{ bgcolor: "whitesmoke" }}>
      <Table size={'small'}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="h6">Virtual Expo</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Breakout Session</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Post-Event Lead Nurturing Webinar</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" sx={{ borderRight: 'solid 1px #DCDCDC' }}>
                <Typography variant="subtitle1">{row.name}</Typography>
              </TableCell>
              <TableCell component="th" scope="row" sx={{ borderRight: 'solid 1px #DCDCDC' }}>
                <Typography variant="subtitle1">$ {row.price}</Typography>
              </TableCell>
              {row.breakout && (
                <TableCell rowSpan={8} align="center" sx={{ borderRight: 'solid 1px #DCDCDC' }}>
                  <Typography variant="subtitle1">$ {row.breakout} per event</Typography>
                </TableCell>
              )}
              {row.postEvent && (
                <TableCell rowSpan={8} align="center">
                  <Typography variant="subtitle1">${row.postEvent} per event</Typography>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}