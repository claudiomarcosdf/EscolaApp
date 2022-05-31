/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridItem from '../Grid/GridItem';
import GridContainer from '../Grid/GridContainer';
import Card from '../Card/Card.js';
import CardAvatar from '../Card/CardAvatar.js';
import CardBody from '../Card/CardBody.js';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';

import _ from 'lodash';
import avatarMen from 'assets/img/faces/avatar1.png';
import avatarWoman from 'assets/img/faces/avatar2.png';
import * as format from '../../helpers/formatHelpers';
import ReactModal from '../Modal/ReactModal';
import RegisterStudent from './RegisterStudent';
import StudentProfileAvatar from './StudentProfileAvatar';
import { visibleModal, actualModal } from '../../views/Modal/modalActions';

export default function StudentProfile(props) {
  const [avatar, setAvatar] = useState();
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const student = props.student;
  const classes = useStyles();

  let pontuacao = 0;
  let comportamentoColor;

  if (!_.isEmpty(student)) {
    pontuacao = student.comportamento.pontuacao;
    if (pontuacao >= 7) {
      comportamentoColor = classes.comportamentoGreat;
    } else if (pontuacao < 7 && pontuacao >= 5) {
      comportamentoColor = classes.comportamentoAlert;
    } else {
      comportamentoColor = classes.comportamentoBad;
    }
  }

  const handleCloseModal = () => {
    dispatch(visibleModal(false));
  };

  const handleUpdateStudent = (event) => {
    dispatch(visibleModal(true));
    dispatch(actualModal('Student'));
  };

  const handleUpdateAvatar = (event) => {
    dispatch(visibleModal(true));
    dispatch(actualModal('Avatar'));
  };

  useEffect(() => {
    getAvatar();
    // eslint-disable-next-line
  }, []);

  const getAvatar = () => {
    if (student.dados_pessoais.avatar_nome) {
      setAvatar(
        `${student.dados_pessoais.avatar_url}${student.dados_pessoais.avatar_nome}`
      );
    } else {
      if (student && student?.genero === 'M') {
        setAvatar(avatarMen);
      } else {
        setAvatar(avatarWoman);
      }
    }
  };

  return (
    <div>
      <Card profile>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <CardAvatar profile>
              <a href="#user" onClick={handleUpdateAvatar}>
                <img src={avatar} alt="Foto do aluno" />
              </a>
            </CardAvatar>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <div className={classes.divComportamento}>
              <div
                className={`${classes.comportamentoAlign} ${classes.description}`}
              >
                Comportamento:
              </div>
              <div
                className={`${classes.comportamentoAlign} ${comportamentoColor}`}
              >
                {student.comportamento.status}
              </div>
              <div
                className={`${classes.comportamentoAlign} ${classes.description} ${classes.divNota}`}
              >
                <Badge
                  badgeContent={format.formatNumber(
                    student.comportamento.pontuacao
                  )}
                  color="primary"
                >
                  Pontuação&nbsp;&nbsp;
                </Badge>
              </div>
            </div>
          </GridItem>
        </GridContainer>
        <CardBody profile>
          <Typography
            variant="h5"
            gutterBottom
            className={` ${classes.strong}`}
          >
            {student.nome}
          </Typography>
          <span className={`${classes.description}`}>
            Gênero: {student.genero == 'M' ? 'Masculino' : 'Feminino'}
          </span>
          <h5
            className={classes.cardTitle}
          >{`${student.classe.ano} ano - ${student.classe.serie}`}</h5>

          <GridContainer>
            <GridItem xs={12} sm={12} md={10}>
              <span className={classes.description}>
                {`${'Data de nascimento: '} ${format.formatDateBr(
                  student.data_nascimento
                )}`}
              </span>
              <br />
              <span className={classes.description}>
                {`${student.patente} | mat.: ${student.matricula}`}
              </span>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <div className={classes.editAlign}>
                <Tooltip title="Editar aluno">
                  <Fab size="small" color="secondary" aria-label="Editar">
                    <EditIcon onClick={handleUpdateStudent} />
                  </Fab>
                </Tooltip>
              </div>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>

      {modal.modalName === 'Student' && (
        <ReactModal open={modal.visible}>
          <RegisterStudent onClose={handleCloseModal} />
        </ReactModal>
      )}
      {modal.modalName === 'Avatar' && (
        <ReactModal open={modal.visible}>
          <StudentProfileAvatar onClose={handleCloseModal} />
        </ReactModal>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  comportamentoAlign: {
    float: 'right',
    paddingRight: '15px'
  },
  divComportamento: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  comportamentoGreat: {
    color: '#16a085',
    fontSize: '30px'
  },
  comportamentoAlert: {
    color: '#ff7675',
    fontSize: '30px'
  },
  comportamentoBad: {
    color: '#d63031',
    fontSize: '30px'
  },
  divNota: {
    marginTop: '20px',
    marginRight: '15px'
  },
  strong: {
    color: '#84817a',
    fontWeight: 'bold',
    marginBottom: '2px',
    marginTop: '15px'
  },
  editAlign: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    display: 'flex'
  }
}));
