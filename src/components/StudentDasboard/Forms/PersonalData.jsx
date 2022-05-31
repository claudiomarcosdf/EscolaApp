import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { currentStudent } from '../../../views/Student/studentActions';
import PhoneMask from '../../../helpers/PhoneMask';
import CepMask from '../../../helpers/CepMask';
import CpfMask from '../../../helpers/CpfMask';

export default function PersonalData() {
  const student = useSelector((state) => state.student.student);
  const dispatch = useDispatch();

  const handleChangePersonalDataValue = (event) => {
    //name is the fieldName
    const { name, value } = event.target;
    const personalData = student.dados_pessoais;

    const newPersonalData = {
      ...personalData,
      [name]: value
    };
    // const alteredStudent = {
    //   ...student,
    //   dados_pessoais: newPersonalData,
    // };

    // dispatch(currentStudent(alteredStudent));

    updateStudent('dados_pessoais', newPersonalData);
  };

  const handleChangeResidenceValue = (event) => {
    //name is the fieldName
    const { name, value } = event.target;
    const personalData = student.dados_pessoais;
    const residence = student.dados_pessoais.residencia;

    const newResidence = {
      ...residence,
      [name]: value
    };
    const alteredPersonalData = {
      ...personalData,
      residencia: newResidence
    };

    updateStudent('dados_pessoais', alteredPersonalData);
  };

  const handleChangeContactsValue = (event) => {
    //name is the fieldName
    const { name, value } = event.target;
    const personalData = student.dados_pessoais;
    const contacts = student.dados_pessoais.contatos;

    const newContact = {
      ...contacts,
      [name]: value
    };
    const alteredPersonalData = {
      ...personalData,
      contatos: newContact
    };

    updateStudent('dados_pessoais', alteredPersonalData);
  };

  const updateStudent = (fieldToChange, valueToChange) => {
    const alteredStudent = {
      ...student,
      [fieldToChange]: valueToChange
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
          <div className={classes.flexRow} style={{ marginTop: '30px' }}>
            <TextField
              required
              id="cpf"
              label="Cpf"
              type="text"
              name="cpf"
              value={student.dados_pessoais.cpf}
              onChange={handleChangePersonalDataValue}
              InputProps={{
                inputComponent: CpfMask
              }}
            />
            <TextField
              id="rg"
              label="Rg"
              name="rg"
              value={student.dados_pessoais.rg}
              onChange={handleChangePersonalDataValue}
            />

            <TextField
              id="input-with-icon-textfield"
              label="Email"
              type="email"
              name="email"
              value={student.dados_pessoais.email}
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
              value={student.dados_pessoais.residencia.endereco}
              onChange={handleChangeResidenceValue}
            />
          </div>
          <div className={classes.flexRow}>
            <TextField
              id="cidade"
              label="Cidade"
              style={{ width: '42ch' }}
              name="cidade"
              value={student.dados_pessoais.residencia.cidade}
              onChange={handleChangeResidenceValue}
            />

            <FormControl className={classes.formControlUF}>
              <InputLabel id="uf">UF</InputLabel>
              <Select
                labelId="select-label"
                id="uf"
                name="uf"
                value={student.dados_pessoais.residencia.uf}
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
              value={student.dados_pessoais.residencia.cep}
              onChange={handleChangeResidenceValue}
              InputProps={{
                inputComponent: CepMask
              }}
            />
          </div>
          <div className={classes.flexRow}>
            <TextField
              id="responsavel1"
              label="Responsável 1"
              name="responsavel1"
              value={student.dados_pessoais.contatos.responsavel1}
              onChange={handleChangeContactsValue}
              style={{ width: '60ch' }}
            />
            <TextField
              id="telefone1"
              label="Telefone 1"
              type="text"
              name="celular_resp1"
              value={student.dados_pessoais.contatos.celular_resp1}
              onChange={handleChangeContactsValue}
              style={{ width: '25ch' }}
              InputProps={{
                inputComponent: PhoneMask,
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div className={classes.flexRow}>
            <TextField
              id="responsavel2"
              label="Responsável 2"
              type="text"
              name="responsavel2"
              value={student.dados_pessoais.contatos.responsavel2}
              onChange={handleChangeContactsValue}
              style={{ width: '60ch' }}
            />
            <TextField
              id="telefone2"
              label="Telefone 2"
              type="text"
              name="celular_resp2"
              value={student.dados_pessoais.contatos.celular_resp2}
              onChange={handleChangeContactsValue}
              style={{ width: '25ch' }}
              InputProps={{
                inputComponent: PhoneMask,
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
      </form>
    </>
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
