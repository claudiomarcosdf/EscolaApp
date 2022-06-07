import {
  WATCHER_OBJ,
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

const initialState = {
  loading: false,
  watcher: WATCHER_OBJ,
  watchers: [],
  errors: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEW_WATCHER:
      return {
        ...state,
        loading: false,
        watcher: WATCHER_OBJ
      };

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

    case ADD_WATCHER_REQUEST:
      return {
        ...state,
        loading: true
      };

    case ADD_WATCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        watcher: action.payload,
        errors: []
      };

    case ADD_WATCHER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case EDIT_WATCHER_REQUEST:
      return {
        ...state,
        loading: true
      };

    case EDIT_WATCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        watcher: action.payload,
        errors: []
      };

    case EDIT_WATCHER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
