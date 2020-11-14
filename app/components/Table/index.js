import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import LinearProgress from '@material-ui/core/LinearProgress';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables({pages, loading, frames}) {
  const classes = useStyles();

  pages = pages.split("-") // convert to array

  return (
    <TableContainer component={Paper}>
      {loading && <LinearProgress />}
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            {pages.map((data, key) => {
                return (<StyledTableCell key={key}>{data}</StyledTableCell>)
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {frames.map((data,key) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row">
                { frames.length !== key+1 ? "F"+(key+1) : "" } 
              </StyledTableCell>
              {data.row.map((row,key) => (
                <StyledTableCell key={key}>
                  {row}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {loading && <LinearProgress />}
    </TableContainer>
  );
}