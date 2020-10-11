const VISIBLE_MODAL = 'VISIBLE_MODAL';

export const visibleModal = (value) => {
  return {
    type: VISIBLE_MODAL,
    payload: value,
  };
};
