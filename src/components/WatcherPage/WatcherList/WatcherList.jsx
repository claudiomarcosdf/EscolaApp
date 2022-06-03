import React, { useState } from 'react';
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

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';
import _ from 'lodash';

const watcherList = [
  {
    _id: '384dufu476434787',
    matricula: '7859',
    nome: 'FRED GRUGUER',
    funcao: 'MONITOR'
  },
  {
    _id: '224du445457h6733g',
    matricula: '1258',
    nome: 'JÁSPION NOR',
    funcao: 'PROFESSOR'
  },
  {
    _id: '144dyyp4764347j55',
    matricula: '3558',
    nome: 'CHU LEE',
    funcao: 'MONITOR'
  },
  {
    _id: '098dufu476434t532',
    matricula: '0899',
    nome: 'RIGHT LANDER',
    funcao: 'DIRETOR'
  }
];

function WatcherList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [idWatcher, setIdWatcher] = useState(0);

  const hadleDelete = (event, id) => {
    setOpenDialog(true);
    setIdWatcher(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles();
  return (
    <Card>
      <TableContainer>
        <Table size="small" aria-label="tabela de ocorrências">
          <TableHead>
            <TableRow>
              <StyledTableCell>Matrícula</StyledTableCell>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Função</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.isEmpty(watcherList) && (
              <Typography variant="inherit" style={myStyle.messageEmpty}>
                Não há ocorrências
              </Typography>
            )}
            {watcherList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((watcher) => {
                return (
                  <StyledTableRow key={watcher._id}>
                    <StyledTableCell
                      component="th"
                      scope="watcher"
                      style={{ width: '10%' }}
                    >
                      {watcher.matricula}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: '45%' }}>
                      {watcher.nome}
                    </StyledTableCell>
                    <StyledTableCell style={{ width: '15%' }}>
                      {watcher.funcao}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: '50px' }}>
                      <div>
                        <Tooltip title="Excluir">
                          <IconButton
                            aria-label="deletar"
                            onClick={(event) => hadleDelete(event, watcher._id)}
                          >
                            <IconDelete color="error" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton aria-label="editar">
                            <IconEdit color="primary" />
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
              count={watcherList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </ThemeProvider>
      </TableContainer>
    </Card>
  );
}

const useStyles = makeStyles(() => ({}));

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
