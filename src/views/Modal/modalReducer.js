const VISIBLE_MODAL = 'VISIBLE_MODAL';
const ACTUAL_MODAL = 'ACTUAL_MODAL';

const initialState = {
  visible: false,
  modalName: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case VISIBLE_MODAL:
      return {
        ...state,
        visible: action.payload,
      };

    case ACTUAL_MODAL:
      return {
        ...state,
        modalName: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
