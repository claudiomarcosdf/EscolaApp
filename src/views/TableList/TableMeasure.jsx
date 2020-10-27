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

export default function TableMeasure() {
  const tableMeasures = useSelector((state) => state.table.tableMeasures);

  const classes = useStyles();
  return (
    <div>
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
                Tabela de medidas disciplinares
              </Typography>
            </TableRow>
            <TableRow>
              <StyledTableCell>Medida</StyledTableCell>
              <StyledTableCell align="left">Conduta</StyledTableCell>
              <StyledTableCell align="right">Valor</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableMeasures.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.descricao}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.tipo_conduta}
                </StyledTableCell>
                <StyledTableCell align="right">{row.valor}</StyledTableCell>
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
    // alignItems: 'top',
    justifyContent: 'center',
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
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
