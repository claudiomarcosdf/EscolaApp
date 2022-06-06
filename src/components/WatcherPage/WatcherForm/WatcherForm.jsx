import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { currentWatcher } from '../../../views/Watcher/watcherActions';
import { makeStyles } from '@material-ui/core/styles';
import PhoneMask from '../../../helpers/PhoneMask';
import * as format from '../../../helpers/formatHelpers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function WatcherForm() {
  const [tab, setTab] = React.useState(0);

  const watcherObj = useSelector((state) => state.watcher.watcher);
  const dispatch = useDispatch();

  const [watcher, setWatcher] = useState(watcherObj);

  useEffect(() => {
    console.log('refresh form');
    setWatcher(watcherObj);
  }, [watcherObj]);

  const handleChangeTab = (event, newValue) => {
    console.log(newValue);
    setTab(newValue);
  };

  const handleChangeValue = (event) => {
    console.log('values');
    const { name, value } = event.target;
    setWatcher({ ...watcher, [name]: value });

    dispatch(currentWatcher(watcher));
  };

  const handleChangeChecked = (event) => {
    console.log('switch');
    const { name, checked } = event.target;
    let situacao;

    if (checked) {
      situacao = 'ativo';
    } else {
      situacao = 'inativo';
    }

    setWatcher({ ...watcher, [name]: situacao });
    dispatch(currentWatcher(watcher));
    // dispatch(currentWatcher({ ...watcher, [name]: situacao }));
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
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              indicatorColor="inherit"
              textColor="inherit"
              aria-label="simple tabs example"
            >
              <Tab label="Dados gerais" {...a11yProps(0)} />
              <Tab label="Dados pessoais" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={tab} index={0}>
            <form
              onSubmit={(event) => event.preventDefault()}
              className={classes.root}
            >
              <Grid container>
                <Grid item xs={12}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel
                      component="legend"
                      className={classes.labelControl}
                    >
                      Gênero
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="genero"
                      name="genero"
                      value={watcher?.genero ? watcher.genero : ''}
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
                    value={watcher?.nome ? watcher.nome : ''}
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
                      value={watcher?.matricula ? watcher.matricula : ''}
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
                      // defaultValue={nowDate}
                      value={
                        watcher?.data_nascimento
                          ? format.formatDateToField(watcher.data_nascimento)
                          : ''
                      }
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
                      value={watcher?.telefone ? watcher.telefone : ''}
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
                      value={watcher?.funcao ? watcher.funcao : ''}
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
                onClick={(event) => handleChangeTab(event, 1)}
              >
                Próximo
              </Button>
            </form>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Button
              style={{ marginBottom: '20px' }}
              variant="contained"
              color="primary"
              onClick={(event) => {}}
            >
              Salvar
            </Button>
          </TabPanel>
        </div>
      </Container>
    </Card>
  );
}

const funcoes = ['', 'Diretor', 'Professor', 'Monitor'];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2)
    },
    '& .MuiAppBar-colorPrimary': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent'
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
