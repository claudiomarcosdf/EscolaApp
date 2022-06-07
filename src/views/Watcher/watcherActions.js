import * as api from '../../services/apiWatcherService';
import { toastr } from 'react-redux-toastr';

import {
  FETCH_NEW_WATCHER,
  FETCH_WATCHERS_REQUEST,
  FETCH_WATCHERS_SUCCESS,
  FETCH_WATCHERS_FAILURE,
  CURRENT_WATCHER,
  ADD_WATCHER_REQUEST,
  ADD_WATCHER_SUCCESS,
  ADD_WATCHER_FAILURE,
  EDIT_WATCHER_REQUEST,
  EDIT_WATCHER_SUCCESS,
  EDIT_WATCHER_FAILURE,
  ADD_WATCHER_AVATAR_REQUEST,
  ADD_WATCHER_AVATAR_SUCCESS,
  ADD_WATCHER_AVATAR_FAILURE
} from './watcherTypes';

export const fetchNewWatcher = () => {
  return {
    type: FETCH_NEW_WATCHER
  };
};

export const fetchWatchersRequest = () => {
  return {
    type: FETCH_WATCHERS_REQUEST
  };
};

export const fetchWatchersSuccess = (watchers) => {
  return {
    type: FETCH_WATCHERS_SUCCESS,
    payload: watchers
  };
};

export const fetchWatchersFailure = (errors) => {
  return {
    type: FETCH_WATCHERS_FAILURE,
    payload: errors
  };
};

export const currentWatcher = (watcher) => {
  return {
    type: CURRENT_WATCHER,
    payload: watcher
  };
};

export const addWatcherRequest = () => {
  return {
    type: ADD_WATCHER_REQUEST
  };
};

export const addWatcherSuccess = (watcher) => {
  return {
    type: ADD_WATCHER_SUCCESS,
    payload: watcher
  };
};

export const addWatcherFailure = (errors) => {
  return {
    type: ADD_WATCHER_FAILURE,
    payload: errors
  };
};

export const editWatcherRequest = () => {
  return {
    type: EDIT_WATCHER_REQUEST
  };
};

export const editWatcherSuccess = (watcher) => {
  return {
    type: EDIT_WATCHER_SUCCESS,
    payload: watcher
  };
};

export const editWatcherFailure = (errors) => {
  return {
    type: EDIT_WATCHER_FAILURE,
    payload: errors
  };
};

//####### Async Actions ########

export const newWatcher = () => {
  return (dispatch) => {
    dispatch(fetchNewWatcher);
  };
};

export const fetchWatchers = () => {
  return (dispatch) => {
    dispatch(fetchWatchersRequest);

    api
      .getWatchers()
      .then((response) => {
        const watchers = response.data;

        dispatch(fetchWatchersSuccess(watchers));
      })
      .catch((error) => {
        const errors = [];
        errors.push('Falha na requisição [' + error + ']');

        dispatch(fetchWatchersFailure(errors));
      });
  };
};

export const addWatcher = (newWatcher) => {
  return (dispatch) => {
    dispatch(addWatcherRequest);

    api
      .createWatcher(newWatcher)
      .then((response) => {
        const watcher = response.data;
        dispatch([addWatcherSuccess(watcher), fetchWatchers()]);
        toastr.success('Sucesso', 'Cadastro realizado com sucesso.');
      })
      .catch((error) => {
        const errors = error.response.data.errors;
        dispatch(addWatcherFailure(errors));
        errors.forEach((error) => toastr.error('Erro', error));
      });
  };
};

export const editWatcher = (watcherToUpdate) => {
  const { _id } = watcherToUpdate;
  return async (dispatch) => {
    dispatch(editWatcherRequest);

    try {
      const response = await api.updateWatcher(_id, watcherToUpdate);
      const watcher = response.data;

      dispatch([editWatcherSuccess(watcher), fetchWatchers()]);
      toastr.success('Sucesso', 'Atualização realizada com sucesso.');
    } catch (error) {
      const errors = error.response.data.errors;

      dispatch(editWatcherFailure(errors));
      errors.forEach((error) => toastr.error('Erro', error));
    }
  };
};
