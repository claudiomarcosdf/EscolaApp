import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import GlobalMessages from '../../components/GlobalMessages/GlobalMessages';
import SignUp from './SignUp';
import { openSignup, login } from './authActions';

import logo from '../../assets/img/neo-final.png';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [loginUser, setLoginUser] = useState({ email: '', password: '' });
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleNewUser = () => {
    dispatch(openSignup(true));
  };

  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleSubmit = () => {
    if (loginUser.email && loginUser.password) {
      dispatch(login(loginUser));
    }
  };

  return !auth.openSignup ? (
    <Container component="main" maxWidth="xs">
      <GlobalMessages />
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="" />
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(event) => event.preventDefault()}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={loginUser.email}
            onChange={handleChangeValue}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginUser.password}
            onChange={handleChangeValue}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Relembrar"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                href="#signup"
                variant="body2"
                onClick={() => handleNewUser()}
              >
                {'Não tem uma conta? Cadastre-se'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  ) : (
    <SignUp />
  );
}
