import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneIcon from '@material-ui/icons/Phone';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';

import { currentStudent } from '../../../views/Student/studentActions';
import PhoneMask from '../../../helpers/PhoneMask';
import moment from 'moment';
import * as format from '../../../helpers/formatHelpers';

export default function BasicInformations() {
  // const nowDate = moment().format('YYYY-MM-DD');

  const student = useSelector((state) => state.student.student);
  const dispatch = useDispatch();

  const handleChangeValue = (event) => {
    //name is the fieldName
    const { name, value } = event.target;
    dispatch(currentStudent({ ...student, [name]: value }));
  };

  const handleChangeChecked = (event) => {
    const { name, checked } = event.target;
    let situacao;

    if (checked) {
      situacao = 'ativo';
    } else {
      situacao = 'inativo';
    }

    dispatch(currentStudent({ ...student, [name]: situacao }));
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
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.labelControl}>
                Gênero
              </FormLabel>
              <RadioGroup
                row
                aria-label="genero"
                name="genero"
                value={student.genero}
                onChange={handleChangeValue}
              >
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Feminino"
                />
                <FormControlLabel
                  value="M"
                  control={<Radio />}
                  label="Masculino"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <TextField
              name="nome"
              required
              id="nome"
              label="Nome"
              fullWidth
              value={student.nome}
              onChange={handleChangeValue}
            />{' '}
            <br />
            <TextField
              name="matricula"
              required
              id="matricula"
              label="Matrícula"
              value={student.matricula}
              onChange={handleChangeValue}
            />
            <TextField
              name="data_nascimento"
              id="data_nascimento"
              label="Data de nascimento"
              type="date"
              // defaultValue={nowDate}
              value={format.formatDateToField(student.data_nascimento)}
              onChange={handleChangeValue}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="telefone"
              id="telefone"
              label="Telefone"
              type="text"
              style={{ width: '25ch' }}
              value={student.telefone}
              onChange={handleChangeValue}
              InputProps={{
                inputComponent: PhoneMask,
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={classes.flexRow}>
            <FormControl className={classes.formControlPatente}>
              <InputLabel id="select-label">Patente</InputLabel>
              <Select
                labelId="select-label"
                id="patente"
                name="patente"
                value={student.patente}
                onChange={handleChangeValue}
              >
                {patentes.map((patente, index) => {
                  return (
                    <MenuItem value={patente} key={index}>
                      {patente}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={student.situacao === 'ativo'}
                  onChange={handleChangeChecked}
                  name="situacao"
                  color="secondary"
                />
              }
              label="Ativo"
            />
          </div>
        </div>
      </form>
    </>
  );
}

const patentes = [
  'Cabo aluno',
  '3º Sgt aluno',
  '2º Sgt aluno',
  '1º Sgt aluno',
  'Subtenente aluno',
  'Aspirante aluno',
  '2º tenente aluno',
  'Capitão aluno',
  'Major aluno',
  'Tenente coronel aluno',
  'Coronel aluno',
];

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
  formControlPatente: {
    margin: theme.spacing(1),
    width: '41ch',
  },
  labelControl: {
    marginBottom: '0px',
  },
  flexRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '0px',
  },
}));
