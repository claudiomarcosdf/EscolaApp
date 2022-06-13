import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from 'components/Card/Card';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import IconDelete from '@material-ui/icons/DeleteForever';
import IconEdit from '@material-ui/icons/EditOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconAdd from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';
import _ from 'lodash';
import CustomDialog from '../../Dialog/CustomDialog';
import * as format from '../../../helpers/formatHelpers';

import {
  fetchWatchers,
  currentWatcher,
  fetchNewWatcher
} from '../../../views/Watcher/watcherActions';

function WatcherList() {
  const watchers = useSelector((state) => state.watcher.watchers);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchWatchers());
  }, []);

  const handleDelete = (event, id) => {
    setOpenDialog(true);
    //
  };

  const handleEdit = (watcher) => {
    dispatch(currentWatcher(watcher));
  };

  const handleNew = () => {
    dispatch(fetchNewWatcher());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDialog = () => {
    setOpenDialog(false);
    //dispatch(deleteOccurrence(idOccurrence));
  };

  const classes = useStyles();
  return (
    <Card>
      <div className={classes.boxButton}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<IconAdd />}
          onClick={handleNew}
        >
          Novo observador
        </Button>
      </div>
      <div className={classes.boxTable}>
        <TableContainer>
          <Table size="small" aria-label="tabela de ocorrências">
            <TableHead>
              <TableRow>
                <StyledTableCell>Matrícula</StyledTableCell>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell>Função</StyledTableCell>
                <StyledTableCell>Situação</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.isEmpty(watchers) && (
                <Typography variant="inherit" style={myStyle.messageEmpty}>
                  Nenhum observador cadastrado
                </Typography>
              )}
              {watchers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((watcher) => {
                  return (
                    <StyledTableRow key={watcher._id}>
                      <StyledTableCell
                        component="th"
                        scope="watcher"
                        style={{ width: '5%' }}
                      >
                        {watcher.matricula}
                      </StyledTableCell>
                      <StyledTableCell style={{ width: '35%' }}>
                        {watcher.nome}
                      </StyledTableCell>
                      <StyledTableCell style={{ width: '10%' }}>
                        {watcher.funcao}
                      </StyledTableCell>
                      <StyledTableCell style={{ width: '5%' }} align="center">
                        <Chip
                          variant="outlined"
                          size="small"
                          label={format.capitalize(watcher.situacao)}
                          color={
                            watcher.situacao !== 'ativo'
                              ? 'secondary'
                              : 'default'
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: '25%' }}>
                        <div>
                          <Tooltip title="Excluir">
                            <IconButton
                              aria-label="deletar"
                              onClick={(event) =>
                                handleDelete(event, watcher._id)
                              }
                            >
                              <IconDelete color="error" fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar">
                            <IconButton
                              aria-label="editar"
                              onClick={() => handleEdit(watcher)}
                            >
                              <IconEdit color="primary" fontSize="small" />
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
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={watchers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </ThemeProvider>
        </TableContainer>
      </div>
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
        title="Exclusão de observador"
        message="Confirma exclusão do observador?"
        position="custom"
      />
    </Card>
  );
}

const useStyles = makeStyles(() => ({
  button: {
    width: '170px'
  },
  boxButton: {
    display: 'flex',
    margin: 10,
    marginBottom: 5
  },
  boxTable: {
    display: 'flex',
    margin: 10
  }
}));

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: '#1976d2' }
    }
  },
  ptBR
);

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
  },
  groupButtons: {
    display: 'flex'
  }
};

export default WatcherList;
