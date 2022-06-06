import * as api from '../../services/apiWatcherService';
import { toastr } from 'react-redux-toastr';

import {
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

export const fetchWatchersRequest = () => {
  return {
    type: FETCH_WATCHERS_REQUEST
  };
};

export const fetchWatchersSuccess = (Watchers) => {
  return {
    type: FETCH_WATCHERS_SUCCESS,
    payload: Watchers
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

//####### Async Actions ########

export const fetchWatchers = () => {
  return (dispatch) => {
    dispatch(fetchWatchersRequest);

    console.log('here');

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
