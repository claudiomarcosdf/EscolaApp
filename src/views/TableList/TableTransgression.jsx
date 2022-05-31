import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

export default function TableTransgression() {
  const tableTransgressions = useSelector(
    (state) => state.table.tableTransgressions
  );
  const classes = useStyles();
  return (
    <div>
      {' '}
      <TableContainer className={classes.content}>
        <Table
          className={classes.table}
          size="small"
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Tabela de transgressões disciplinares
              </Typography>
            </TableRow>
            <TableRow>
              <StyledTableCell align="left">Transgressão</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableTransgressions.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="left">
                  {index + 1}&nbsp;&nbsp;&nbsp;&nbsp;{row.transgressao}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const useStyles = makeStyles({
  table: {
    width: '95%'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '50px'
  },
  title: {
    width: '500px'
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: '#2c3e50',
    backgroundColor: '#82ccdd',
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);
