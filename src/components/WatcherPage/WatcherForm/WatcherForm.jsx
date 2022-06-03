import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from 'components/Card/Card';
import Typography from '@material-ui/core/Typography';
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

import { makeStyles } from '@material-ui/core/styles';
import PhoneMask from '../../../helpers/PhoneMask';
import * as format from '../../../helpers/formatHelpers';

function WatcherForm() {
  const [watcher, setWatcher] = useState({});

  const handleChangeValue = (event) => {
    //name is the fieldName
    const { name, value } = event.target;
    setWatcher({ ...watcher, [name]: value });
    //dispatch(currentStudent({ ...student, [name]: value }));
  };

  const handleChangeChecked = (event) => {
    const { name, checked } = event.target;
    let situacao;

    if (checked) {
      situacao = 'ativo';
    } else {
      situacao = 'inativo';
    }
    setWatcher({ ...watcher, [name]: situacao });

    //dispatch(currentStudent({ ...student, [name]: situacao }));
  };

  const classes = useStyles();
  return (
    <Card>
      <Container>
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ marginTop: '13px' }}
          gutterBottom
        >
          Dados do Observador
        </Typography>
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
              <Grid item xs={4} zeroMinWidth>
                <TextField
                  name="matricula"
                  required
                  id="matricula"
                  label="Matrícula"
                  style={{ width: '30ch' }}
                  value={watcher.matricula}
                  onChange={handleChangeValue}
                />
              </Grid>
              <Grid item xs={4} zeroMinWidth>
                <TextField
                  name="data_nascimento"
                  id="data_nascimento"
                  label="Data de nascimento"
                  style={{ width: '30ch' }}
                  type="date"
                  // defaultValue={nowDate}
                  value={format.formatDateToField(watcher.data_nascimento)}
                  onChange={handleChangeValue}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={4} zeroMinWidth>
                <TextField
                  name="telefone"
                  id="telefone"
                  label="Telefone"
                  type="text"
                  style={{ width: '30ch' }}
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
            onClick={(e) => e.preventDefault()}
          >
            Salvar
          </Button>
        </form>
      </Container>
    </Card>
  );
}

const funcoes = ['Diretor', 'Professor', 'Monitor'];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2)
    }
  },
  formControlFuncao: {
    marginTop: theme.spacing(0),
    width: '41ch'
  },
  componentCenter: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '50px'
  },
  formControl: {
    marginTop: theme.spacing(3)
  },
  labelControl: {
    marginBottom: '0px'
  }
}));

export default WatcherForm;
