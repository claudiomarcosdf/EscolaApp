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

const initialState = {
  loading: false,
  watcher: {},
  watchers: [],
  errors: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WATCHERS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_WATCHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        watchers: action.payload,
        errors: []
      };

    case FETCH_WATCHERS_FAILURE:
      return {
        ...state,
        loading: false,
        watchers: [],
        errors: action.payload
      };

    case CURRENT_WATCHER:
      return {
        ...state,
        loading: false,
        watcher: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
