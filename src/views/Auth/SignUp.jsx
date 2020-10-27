import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../../assets/img/neo-final.png';

import GlobalMessages from '../../components/GlobalMessages/GlobalMessages';
import SignIn from './SignIn';
import { openSignup, signup } from './authActions';
import _ from 'lodash';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Sistema Escolar
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const user = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirm_password: '',
  };
  const [newUser, setNewUser] = useState(user);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChangeValue = (event) => {
    const { name, value } = event.target;

    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = () => {
    const { name, lastName, email, password, confirm_password } = newUser;
    if (
      !_.isEmpty(name) &&
      !_.isEmpty(lastName) &&
      !_.isEmpty(email) &&
      !_.isEmpty(password) &&
      !_.isEmpty(confirm_password)
    ) {
      dispatch(signup(newUser));
    }
  };

  const handleSignin = () => {
    dispatch(openSignup(false));
  };

  return auth.openSignup ? (
    <Container component="main" maxWidth="xs">
      <GlobalMessages />
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="" />
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => event.preventDefault()}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                autoFocus
                value={newUser.name}
                onChange={handleChangeValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                name="lastName"
                autoComplete="lname"
                value={newUser.lastName}
                onChange={handleChangeValue}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={newUser.email}
                onChange={handleChangeValue}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={newUser.password}
                onChange={handleChangeValue}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm_password"
                label="Senha"
                type="password"
                id="confirm_password"
                autoComplete="current-password"
                value={newUser.confirm_password}
                onChange={handleChangeValue}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#signin"
                variant="body2"
                onClick={() => handleSignin()}
              >
                Possui uma conta? Entrar
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  ) : (
    <SignIn />
  );
}
