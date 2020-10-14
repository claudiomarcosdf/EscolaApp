import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconAdd from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import IconDelete from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';

import _ from 'lodash';
import moment from 'moment';
import * as format from '../../helpers/formatHelpers';
import { visibleModal } from '../../views/Modal/modalActions';
import RegisterOccurrenceModal from './occurrence/RegisterOccurrenceModal';

export default function StudentOccurrences(props) {
  const { ocorrencias } = props;
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const ocorrenciasSorted = ocorrencias.sort((a, b) => {
    const aData = moment(a.data, 'DD-MM-YYYY').toDate();
    const bData = moment(b.data, 'DD-MM-YYYY').toDate();

    return bData - aData;
  });

  const hadleDelete = (event, id) => {
    const value = id;
    console.log(value);
  };

  const handleNewOccurrence = () => {
    dispatch(visibleModal(true));
  };

  const handleCloseModal = () => {
    dispatch(visibleModal(false));
  };

  const classes = useStyles();
  return (
    <div id="main-occurrence">
      <Grid item xs={12} sm={12} md={12}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<IconAdd />}
          onClick={handleNewOccurrence}
        >
          Nova ocorrência
        </Button>

        <div className={classes.body}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Data</StyledTableCell>
                  <StyledTableCell>Conduta</StyledTableCell>
                  <StyledTableCell>Fato observado</StyledTableCell>
                  <StyledTableCell>Medida</StyledTableCell>
                  <StyledTableCell align="right">Valor</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_.isEmpty(ocorrencias) && <span>Não há ocorrências</span>}
                {ocorrencias.map((ocorrencia) => {
                  const condutaStyle =
                    ocorrencia.conduta === 'NEGATIVA'
                      ? classes.badColor
                      : classes.greatColor;
                  return (
                    <StyledTableRow key={ocorrencia._id}>
                      <StyledTableCell component="th" scope="ocorrencia">
                        {format.formatDateBr(ocorrencia.data)}
                      </StyledTableCell>
                      <StyledTableCell className={condutaStyle}>
                        {ocorrencia.conduta}
                      </StyledTableCell>
                      <StyledTableCell>
                        {ocorrencia.fato_observado}
                      </StyledTableCell>
                      <StyledTableCell>{ocorrencia.medida}</StyledTableCell>
                      <StyledTableCell align="right">
                        {ocorrencia.valor}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          onClick={(event) =>
                            hadleDelete(event, ocorrencia._id)
                          }
                        >
                          <IconDelete color="error" />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
      {/* Modal here! */}
      <div>
        {modal.visible && (
          <RegisterOccurrenceModal
            onClose={handleCloseModal}
            open={modal.visible}
          />
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
    // minWidth: 640,
  },
  greatColor: {
    color: '#079992',
  },
  badColor: {
    color: '#eb3b5a',
  },
  button: {
    // margin: theme.marginBotton(1),
    margin: 0,
    marginBottom: '6px',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#82ccdd',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
