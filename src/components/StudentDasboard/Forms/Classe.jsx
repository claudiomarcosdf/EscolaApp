import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { currentStudent } from '../../../views/Student/studentActions';
import moment from 'moment';

export default function Classe() {
  const nowDate = moment().format('YYYY-MM-DD');
  const student = useSelector((state) => state.student.student);
  const dispatch = useDispatch();

  const handleChangeClassValue = (event) => {
    //name is the fieldName
    const { name, value } = event.target;
    const classe = student.classe;

    const newClasse = {
      ...classe,
      [name]: value,
    };
    const alteredStudent = {
      ...student,
      classe: newClasse,
    };

    dispatch(currentStudent(alteredStudent));
  };

  const classes = useStyles();
  return (
    <>
      <form
        className={classes.root}
        onSubmit={(event) => event.preventDefault()}
      >
        <div>
          <div className={classes.formatLayout}>
            <TextField
              id="data_matricula"
              label="Data de matricula"
              type="date"
              name="data_matricula"
              value={student.classe.data_matricula}
              onChange={handleChangeClassValue}
              defaultValue={nowDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl className={classes.formControlAno}>
              <InputLabel id="select-ano">Ano</InputLabel>
              <Select
                labelId="select-ano"
                id="ano"
                name="ano"
                value={student.classe.ano}
                onChange={handleChangeClassValue}
              >
                {anos.map((ano, index) => {
                  return (
                    <MenuItem value={ano} key={index}>
                      {ano}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControlSerie}>
              <InputLabel id="select-serie">Série</InputLabel>
              <Select
                labelId="select-serie"
                id="serie"
                name="serie"
                value={student.classe.serie}
                onChange={handleChangeClassValue}
              >
                {series.map((serie, index) => {
                  return (
                    <MenuItem value={serie} key={index}>
                      {serie}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              id="turma"
              label="Turma"
              name="turma"
              value={student.classe.turma}
              onChange={handleChangeClassValue}
              style={{ width: '19ch' }}
            />
          </div>
          <div>
            <FormControl className={classes.formControlTurno}>
              <InputLabel id="select-turno">Turno</InputLabel>
              <Select
                labelId="select-turno"
                id="turno"
                name="turno"
                value={student.classe.turno}
                onChange={handleChangeClassValue}
              >
                {turnos.map((turno, index) => {
                  return (
                    <MenuItem value={turno} key={index}>
                      {turno}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
      </form>
    </>
  );
}

const series = [
  'Ensino fundamental I',
  'Ensino fundamental II',
  'Ensino médio',
];

const anos = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º'];

const turnos = ['Matutino', 'Vespertino', 'Integral'];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
  formatLayout: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: '30px',
  },
  formControl: {
    margin: theme.spacing(1),
  },
  formControlAno: {
    margin: theme.spacing(1),
    width: '15ch',
  },
  formControlSerie: {
    margin: theme.spacing(1),
    width: '50ch',
  },
  formControlTurno: {
    margin: theme.spacing(1),
    width: '19ch',
  },
}));
