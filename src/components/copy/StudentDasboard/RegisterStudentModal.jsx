import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import _ from 'lodash';

import newStudent from '../../services/studentModel.js';
import BasicInformations from './Forms/BasicInformations';
import Classe from './Forms/Classe';
import PersonalData from './Forms/PersonalData';
import {
  currentStudent,
  addStudent,
  editStudent,
} from '../../views/Student/studentActions';

Modal.setAppElement('#root');

export default function RegisterStudentModal({ onClose, open }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const student = useSelector((state) => state.student.student);
  // guardo o estado caso o usuário cancele a operação devolvo o objeto original (novo ou edição)
  const [originalStudent, setOriginalStudent] = useState(student);
  const dispatch = useDispatch();

  if (_.isEmpty(student)) {
    dispatch(currentStudent(newStudent));
  }

  const closeModalAfterSave = () => {
    onClose(null);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleModalClose = () => {
    dispatch(currentStudent(originalStudent));

    onClose(null);
  };

  const handleSave = () => {
    if (!student._id) {
      dispatch(addStudent(student));
    } else {
      dispatch(editStudent(student));
    }

    handleBack();
  };

  const classes = useStyles();
  return (
    <div>
      <Modal style={styles} isOpen={open}>
        <div style={styles.flexRow}>
          <Typography variant="h5">Cadastro de aluno</Typography>
        </div>

        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>{handleSave()}</div>
            ) : (
              <div>
                <div className={classes.fixedSizeBody}>
                  {/* #### Componentes do Cadastro #### */}
                  {getStepContent(activeStep)}
                </div>
                <div className={classes.adjustMargins}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? 'Salvar' : 'Próximo'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={styles.flexRow}>
          <span style={styles.errorMessage}>{errorMessage}</span>
          <Button color="primary" onClick={handleModalClose}>
            Sair
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function getSteps() {
  return ['Informações básicas', 'Classe', 'Dados pessoais'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <BasicInformations />;
    case 1:
      return <Classe />;
    case 2:
      return <PersonalData />;
    default:
      return '';
  }
}

const styles = {
  content: {
    width: '800px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
  },

  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'right',
    justifyContent: 'space-between',
    marginBottom: '0px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  errorMessage: {
    color: '#ff5252',
    fontWeight: 'bold',
    width: '500px',
    marginTop: '8px',
  },
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
    width: '10px',
  },
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  adjustMargins: {
    marginTop: '40px',
  },
  fixedSizeBody: {
    height: '300px',
  },
}));
