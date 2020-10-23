import { toastr } from 'react-redux-toastr';
import axios from 'axios';

const BASE_AUTH_URL = process.env.REACT_APP_AUTH_BASE_URL;

export function login(values) {
  return submit(values, `${BASE_AUTH_URL}/login`);
}

export function signup(values) {
  return submit(values, `${BASE_AUTH_URL}/signup`);
}

function submit(values, url) {
  console.log(values);
  return (dispatch) => {
    axios
      .post(url, values)
      .then((resp) => {
        console.log(resp.data);
        dispatch([{ type: 'USER_FETCHED', payload: resp.data }]);
      })
      .catch((err) => {
        console.log(err.response);
        err.response.data.errors.forEach((error) => {
          toastr.error('Erro', error);
        });
      });
  };
}

export function logout() {
  return { type: 'TOKEN_VALIDATED', payload: false };
}

export function validateToken(token) {
  return (dispatch) => {
    if (token) {
      axios
        .post(`${BASE_AUTH_URL}/validateToken`, { token })
        .then((resp) => {
          dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data.valid });
        })
        .catch((err) => dispatch({ type: 'TOKEN_VALIDATED', payload: false }));
    } else {
      dispatch({ type: 'TOKEN_VALIDATED', payload: false });
    }
  };
}

export function openSignup(value) {
  return {
    type: 'OPEN_SIGNUP',
    payload: value,
  };
}
