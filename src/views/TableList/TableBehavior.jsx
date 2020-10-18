import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

export default function TableBehavior() {
  const tableBehaviors = useSelector((state) => state.table.tableBehaviors);
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
                Tabela de classificação de comportamento
              </Typography>
            </TableRow>
            <TableRow>
              <StyledTableCell>Classificação</StyledTableCell>
              <StyledTableCell align="right">Grau inicial</StyledTableCell>
              <StyledTableCell align="right">Grau final</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBehaviors.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.classificacao}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.grau_inicial}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.grau_final}
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
    width: '90%',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#2c3e50',
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
