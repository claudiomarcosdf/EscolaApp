import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconAdd from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import IconDelete from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

import _ from 'lodash';
import * as format from '../../helpers/formatHelpers';
import { visibleModal, actualModal } from '../../views/Modal/modalActions';
import { deleteOccurrence } from '../../views/Occurrence/occurrenceActions';
import ReactModal from '../Modal/ReactModal';
import RegisterOccurrence from './occurrence/RegisterOccurrence';
import CustomDialog from '../Dialog/CustomDialog';

export default function StudentOccurrences(props) {
  const { ocorrencias } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [idOccurrence, setIdOccurrence] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const ocorrenciasSorted = ocorrencias.sort((a, b) => {
    return new Date(b.data) - new Date(a.data);
  });

  const hadleDelete = (event, id) => {
    setOpenDialog(true);
    setIdOccurrence(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDialog = () => {
    setOpenDialog(false);
    dispatch(deleteOccurrence(idOccurrence));
  };

  const handleNewOccurrence = () => {
    dispatch(visibleModal(true));
    dispatch(actualModal('Occurrence'));
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
            <Table
              className={classes.table}
              size="small"
              aria-label="customized table"
            >
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
                {_.isEmpty(ocorrenciasSorted) && (
                  <Typography variant="inherit" style={myStyle.messageEmpty}>
                    Não há ocorrências
                  </Typography>
                )}
                {ocorrenciasSorted
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((ocorrencia) => {
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
                        <StyledTableCell style={{ width: 250 }}>
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
          <ThemeProvider theme={theme}>
            <Paper className={classes.paper}>
              <TablePagination
                style={{ fontSize: 11 }}
                rowsPerPageOptions={[6, 12, 24]}
                component="div"
                count={ocorrencias.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </ThemeProvider>
        </div>
      </Grid>
      {/* Modal here! */}
      {modal.modalName === 'Occurrence' && (
        <ReactModal open={modal.visible}>
          <RegisterOccurrence onClose={handleCloseModal} />
        </ReactModal>
      )}
      {/* Dialog here! */}
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
        title="Exclusão de ocorrência"
        message="Confirma exclusão da ocorrência selecionada?"
      />
    </div>
  );
}

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ptBR
);

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
    maxWidth: '750px',
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
  messageEmpty: {
    fontSize: '0.9rem',
    marginLeft: '15px',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#82ccdd',
    color: theme.palette.common.white,
  },
  body: {
    // display: 'flex',
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

const myStyle = {
  messageEmpty: {
    fontSize: '0.9rem',
    marginLeft: '15px',
  },
};
