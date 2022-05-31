const userKey = '_school_user';
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem(userKey)),
  validToken: false,
  openSignup: false,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOKEN_VALIDATED':
      if (action.payload) {
        return { ...state, validToken: true };
      } else {
        localStorage.removeItem(userKey);
        return { ...state, validToken: false, user: null };
      }

    case 'USER_LOADING': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'USER_FETCHED':
      localStorage.setItem(userKey, JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        validToken: true,
        loading: false,
      };

    case 'USER_FETCH_FAILURE': {
      return {
        ...state,
        loading: false,
      };
    }

    case 'OPEN_SIGNUP':
      return { openSignup: action.payload };

    default:
      return state;
  }
};
