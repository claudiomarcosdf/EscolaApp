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
import IconAdd from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import IconDelete from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconWatcherPerson from '@material-ui/icons/SupervisorAccountOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

import _ from 'lodash';
import * as format from '../../helpers/formatHelpers';
import { visibleModal, actualModal } from '../../views/Modal/modalActions';
import { deleteOccurrence } from '../../views/Occurrence/occurrenceActions';
import ReactModal from '../Modal/ReactModal';
import CustomDialog from '../Dialog/CustomDialog';
import SimpleDialog from '../Dialog/SimpleDialog';
import RegisterOccurrence from './occurrence/RegisterOccurrence';

export default function StudentOccurrences(props) {
  const { ocorrencias } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [idOccurrence, setIdOccurrence] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [simpleDialog, setSimpleDialog] = useState({ open: false, text: '' });
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
    <>
      <TableContainer>
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
        <Table size="small" aria-label="tabela de ocorrências">
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
                    <StyledTableCell
                      component="th"
                      scope="ocorrencia"
                      style={{ width: '50px' }}
                    >
                      {format.formatDateBr(ocorrencia.data)}
                    </StyledTableCell>
                    <StyledTableCell
                      className={condutaStyle}
                      style={{ width: '50px' }}
                    >
                      {ocorrencia.conduta}
                    </StyledTableCell>
                    <StyledTableCell>
                      {ocorrencia.fato_observado}
                    </StyledTableCell>
                    {/* <StyledTableCell style={{ whiteSpace: 'nowrap' }}> */}
                    <StyledTableCell>{ocorrencia.medida}</StyledTableCell>
                    <StyledTableCell align="right">
                      {ocorrencia.valor}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div style={{ display: 'flex' }}>
                        <IconButton
                          onClick={(event) =>
                            hadleDelete(event, ocorrencia._id)
                          }
                        >
                          <IconDelete color="error" fontSize="small" />
                        </IconButton>
                        <Tooltip title="Observador">
                          <IconButton
                            onClick={() =>
                              setSimpleDialog({
                                open: true,
                                text: ocorrencia.observador
                              })
                            }
                          >
                            <IconWatcherPerson
                              color="primary"
                              fontSize="small"
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
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
      </TableContainer>

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
      <SimpleDialog
        open={simpleDialog.open}
        onClose={() => setSimpleDialog({ open: false, text: '' })}
        title="Observador do fato"
        message={simpleDialog.text}
      />
    </>
  );
}

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: '#1976d2' }
    }
  },
  ptBR
);

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  greatColor: {
    color: '#079992'
  },
  badColor: {
    color: '#eb3b5a'
  },
  button: {
    // margin: theme.marginBotton(1),
    margin: 0,
    marginBottom: '6px',
    width: '165px'
  },
  messageEmpty: {
    fontSize: '0.9rem',
    marginLeft: '15px'
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: '#82ccdd',
    color: theme.palette.common.black
  },
  body: {
    width: '100%',
    fontSize: 13
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const myStyle = {
  messageEmpty: {
    fontSize: '0.9rem',
    marginLeft: '15px'
  }
};
