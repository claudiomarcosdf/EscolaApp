/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import avatarAluno from 'assets/img/faces/3.jpg';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import {
  fetchStudents,
  currentStudent
} from '../../views/Student/studentActions';
import { visibleModal, actualModal } from '../../views/Modal/modalActions';
import ReactModal from 'components/Modal/ReactModal';
import RegisterStudent from '../StudentDasboard/RegisterStudent';

export default function FindStudent() {
  const classes = useStyles();

  const modal = useSelector((state) => state.modal);
  const student = useSelector((state) => state.student);
  const dispatch = useDispatch();

  const handleClick = (student) => {
    document.getElementById('searchName').value = '';
    dispatch(currentStudent(student));
  };

  // const resetState = () => {
  //   dispatch(currentStudent({}));
  //   document.getElementById('searchName').value = '';
  // };

  const handlerChange = (event) => {
    event.preventDefault();
    dispatch(currentStudent({}));

    const newName = event.target.value;

    if (newName) {
      dispatch(fetchStudents(newName));
    } else {
      dispatch(fetchStudents());
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleCloseModal = () => {
    dispatch(visibleModal(false));
  };

  const handlerCreateNewStudent = (event) => {
    dispatch(currentStudent({}));
    dispatch(actualModal('Student'));
    dispatch(visibleModal(true));
  };

  return (
    <>
      <div>
        <Paper
          component="form"
          className={classes.root}
          onSubmit={handleFormSubmit}
        >
          <IconButton className={classes.iconButton} aria-label="menu">
            <AssignmentInd />
          </IconButton>
          <InputBase
            id="searchName"
            className={classes.input}
            placeholder="Nome do aluno"
            inputProps={{ list: 'hidden' }}
            onChange={handlerChange}
          />
          <Tooltip title="Buscar">
            <IconButton
              alt="Buscar"
              className={classes.iconButton}
              aria-label="search"
              onClick={() => handleClick(student.students[0])}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Divider className={classes.divider} orientation="vertical" />

          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.iconButton}
            startIcon={<AddIcon />}
            onClick={handlerCreateNewStudent}
          >
            Novo aluno
          </Button>
        </Paper>

        <List component="nav" className={classes.list}>
          {student.students.map((student) => {
            const subtitle = `${student.classe.ano} ${student.classe.turma} - ${student.classe.serie}`;
            return (
              <ListItem
                key={student._id}
                button
                onClick={() => handleClick(student)}
              >
                <ListItemAvatar>
                  <Avatar alt={student.nome} src={avatarAluno} />
                </ListItemAvatar>
                <ListItemText primary={student.nome} secondary={subtitle} />
              </ListItem>
            );
          })}
        </List>
      </div>

      {modal.modalName === 'Student' && (
        <ReactModal open={modal.visible}>
          {console.log('FIND')}
          <RegisterStudent onClose={handleCloseModal} />
        </ReactModal>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 0px',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    marginLeft: '10px',
    marginRight: '15px'
  },
  divider: {
    height: 28,
    margin: 4
  },
  span: {
    marginLeft: '8px',
    marginRight: '5px',
    fontSize: '0.9rem',
    color: '#0984e3'
  },
  palette: {
    primary: '#03a9f4'
  },
  list: {
    padding: '0px 4px',
    width: '100%',
    maxWidth: 750,
    backgroundColor: theme.palette.background.paper,
    marginTop: '10px'
  },
  addButton: {
    fontSize: 35,
    marginRight: '10px',
    marginLeft: '15px'
  }
}));
