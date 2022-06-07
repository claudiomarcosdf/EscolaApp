import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import {
  currentWatcher,
  addWatcher,
  editWatcher
} from '../../../views/Watcher/watcherActions';
import CepMask from '../../../helpers/CepMask';
import CpfMask from '../../../helpers/CpfMask';

function PersonalDataForm() {
  const watcher = useSelector((state) => state.watcher.watcher);
  const dispatch = useDispatch();

  const updateWatcher = (fieldToChange, valueToChange) => {
    const alteredWatcher = {
      ...watcher,
      [fieldToChange]: valueToChange
    };

    dispatch(currentWatcher(alteredWatcher));
  };

  const handleChangePersonalDataValue = (event) => {
    const { name, value } = event.target;
    const personalData = watcher.dados_pessoais;

    const newPersonalData = {
      ...personalData,
      [name]: value
    };

    updateWatcher('dados_pessoais', newPersonalData);
  };

  const handleChangeResidenceValue = (event) => {
    //name is the fieldName
    const { name, value } = event.target;
    const personalData = watcher.dados_pessoais;
    const residence = watcher.dados_pessoais.residencia;

    const newResidence = {
      ...residence,
      [name]: value
    };
    const alteredPersonalData = {
      ...personalData,
      residencia: newResidence
    };

    updateWatcher('dados_pessoais', alteredPersonalData);
  };

  const handleSave = () => {
    if (!watcher._id) {
      dispatch(addWatcher(watcher));
    } else {
      dispatch(editWatcher(watcher));
    }
  };

  const classes = useStyles();
  return (
    <div>
      <form
        className={classes.root}
        onSubmit={(event) => event.preventDefault()}
      >
        <div style={{ marginBottom: '50px' }}>
          <div className={classes.flexRow} style={{ marginTop: '30px' }}>
            <TextField
              required
              id="cpf"
              label="Cpf"
              type="text"
              name="cpf"
              value={watcher.dados_pessoais.cpf}
              onChange={handleChangePersonalDataValue}
              InputProps={{
                inputComponent: CpfMask
              }}
            />
            <TextField
              id="rg"
              label="Rg"
              name="rg"
              value={watcher.dados_pessoais.rg}
              onChange={handleChangePersonalDataValue}
            />

            <TextField
              id="input-with-icon-textfield"
              label="Email"
              type="email"
              name="email"
              value={watcher.dados_pessoais.email}
              onChange={handleChangePersonalDataValue}
              style={{ width: '40ch' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div className={classes.flexRow}>
            <TextField
              id="endereco"
              label="Endereço"
              fullWidth
              name="endereco"
              value={watcher.dados_pessoais.residencia.endereco}
              onChange={handleChangeResidenceValue}
            />
          </div>
          <div className={classes.flexRow}>
            <TextField
              id="cidade"
              label="Cidade"
              style={{ width: '42ch' }}
              name="cidade"
              value={watcher.dados_pessoais.residencia.cidade}
              onChange={handleChangeResidenceValue}
            />

            <FormControl className={classes.formControlUF}>
              <InputLabel id="uf">UF</InputLabel>
              <Select
                labelId="select-label"
                id="uf"
                name="uf"
                value={watcher.dados_pessoais.residencia.uf}
                onChange={handleChangeResidenceValue}
              >
                {ufs.map((uf, index) => {
                  return (
                    <MenuItem value={uf} key={index}>
                      {uf}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              id="cep"
              label="Cep"
              name="cep"
              value={watcher.dados_pessoais.residencia.cep}
              onChange={handleChangeResidenceValue}
              InputProps={{
                inputComponent: CepMask
              }}
            />
          </div>
        </div>
        <Button
          style={{ marginBottom: '20px' }}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Salvar
        </Button>
      </form>
    </div>
  );
}

const ufs = ['DF', 'GO', 'TO', 'RJ', 'SP', 'MG', 'PE'];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
      // width: '25ch',
    }
  },
  flexRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '0px'
  },
  formControlUF: {
    margin: theme.spacing(1),
    width: '9ch'
  }
}));

export default PersonalDataForm;
