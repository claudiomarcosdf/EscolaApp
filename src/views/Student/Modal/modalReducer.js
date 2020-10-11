const { actions } = require('react-redux-toastr');

const VISIBLE_MODAL = 'VISIBLE_MODAL';

const initialState = {
  visible: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case VISIBLE_MODAL:
      return {
        ...state,
        visible: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
