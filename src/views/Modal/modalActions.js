const VISIBLE_MODAL = 'VISIBLE_MODAL';
const ACTUAL_MODAL = 'ACTUAL_MODAL';

export const visibleModal = (value) => {
  return {
    type: VISIBLE_MODAL,
    payload: value
  };
};

export const actualModal = (value) => {
  return {
    type: ACTUAL_MODAL,
    payload: value
  };
};
