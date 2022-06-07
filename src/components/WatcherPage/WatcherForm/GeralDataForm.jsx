import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
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
import Button from '@material-ui/core/Button';

import { currentWatcher } from '../../../views/Watcher/watcherActions';
import { makeStyles } from '@material-ui/core/styles';
import PhoneMask from '../../../helpers/PhoneMask';
import * as format from '../../../helpers/formatHelpers';

function GeralDataForm({ handleNextPage }) {
  const watcher = useSelector((state) => state.watcher.watcher);
  const dispatch = useDispatch();

  const handleChangeValue = (event) => {
    const { name, value } = event.target;

    dispatch(currentWatcher({ ...watcher, [name]: value }));
  };

  const handleChangeChecked = (event) => {
    //switch
    const { name, checked } = event.target;
    let situacao;

    if (checked) {
      situacao = 'ativo';
    } else {
      situacao = 'inativo';
    }

    dispatch(currentWatcher({ ...watcher, [name]: situacao }));
  };

  const nextPage = (event, page) => {
    handleNextPage(event, page);
  };

  const classes = useStyles();
  return (
    <>
      <form
        onSubmit={(event) => event.preventDefault()}
        className={classes.root}
      >
        <Grid container>
          <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.labelControl}>
                Gênero
              </FormLabel>
              <RadioGroup
                row
                aria-label="genero"
                name="genero"
                value={watcher.genero}
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="nome"
              required
              id="nome"
              label="Nome"
              fullWidth
              value={watcher.nome}
              onChange={handleChangeValue}
            />{' '}
            <br />
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={4} sm={4} xs={6}>
              <TextField
                name="matricula"
                required
                id="matricula"
                label="Matrícula"
                fullWidth
                // style={{ width: '30ch' }}
                value={watcher.matricula}
                onChange={handleChangeValue}
              />
            </Grid>
            <Grid item md={4} sm={4} xs={6}>
              <TextField
                name="data_nascimento"
                id="data_nascimento"
                label="Data de nascimento"
                style={{ minWidth: '23ch' }}
                type="date"
                fullWidth
                value={format.formatDateToField(watcher.data_nascimento)}
                onChange={handleChangeValue}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item md={4} sm={4} xs={12}>
              <TextField
                name="telefone"
                id="telefone"
                label="Telefone"
                type="text"
                fullWidth
                // style={{ width: '30ch' }}
                value={watcher.telefone}
                onChange={handleChangeValue}
                InputProps={{
                  inputComponent: PhoneMask,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={6} zeroMinWidth>
            <FormControl className={classes.formControlFuncao}>
              <InputLabel id="select-label">Função</InputLabel>
              <Select
                labelId="select-label"
                id="funcao"
                name="funcao"
                value={watcher.funcao}
                defaultValue=""
                onChange={handleChangeValue}
              >
                {funcoes.map((funcao, index) => {
                  return (
                    <MenuItem value={funcao} key={index}>
                      {funcao}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.componentCenter}>
            <FormControlLabel
              control={
                <Switch
                  checked={watcher.situacao === 'ativo'}
                  onChange={handleChangeChecked}
                  name="situacao"
                  color="secondary"
                />
              }
              label="Ativo"
            />
          </Grid>
        </Grid>

        <Button
          style={{ marginBottom: '20px' }}
          variant="contained"
          color="primary"
          onClick={(event) => nextPage(event, 1)}
        >
          Próximo
        </Button>
      </form>
    </>
  );
}

const funcoes = ['', 'Diretor', 'Professor', 'Monitor'];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2)
    }
  },
  formControlFuncao: {
    marginTop: theme.spacing(0),
    width: '100%'
  },
  componentCenter: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '15px',
    marginBottom: '50px'
  },
  formControl: {
    marginTop: theme.spacing(3)
  },
  labelControl: {
    marginBottom: '0px'
  }
}));

export default GeralDataForm;
