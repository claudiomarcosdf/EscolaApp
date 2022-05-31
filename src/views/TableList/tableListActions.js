import * as api from '../../services/apiTablesService';

import {
  FETCH_MEASURES_REQUEST,
  FETCH_MEASURES_SUCCESS,
  FETCH_MEASURES_FAILURE,
  FETCH_BEHAVIORS_REQUEST,
  FETCH_BEHAVIORS_SUCCESS,
  FETCH_BEHAVIORS_FAILURE,
  FETCH_TRANSGRESSIONS_REQUEST,
  FETCH_TRANSGRESSIONS_SUCCESS,
  FETCH_TRANSGRESSIONS_FAILURE,
} from './tableListTypes';

export const fetchMeasuresRequest = () => {
  return {
    type: FETCH_MEASURES_REQUEST,
  };
};

export const fetchMeasuresSuccess = (measures) => {
  return {
    type: FETCH_MEASURES_SUCCESS,
    payload: measures,
  };
};

export const fetchMeasuresFailure = (errors) => {
  return {
    type: FETCH_MEASURES_FAILURE,
    payload: errors,
  };
};

export const fetchBehaviorsRequest = () => {
  return {
    type: FETCH_BEHAVIORS_REQUEST,
  };
};

export const fetchBehaviorsSuccess = (behaviors) => {
  return {
    type: FETCH_BEHAVIORS_SUCCESS,
    payload: behaviors,
  };
};
export const fetchBehaviorsFailure = (errors) => {
  return {
    type: FETCH_BEHAVIORS_FAILURE,
    payload: errors,
  };
};

export const fetchTransgressionsRequest = () => {
  return {
    type: FETCH_TRANSGRESSIONS_REQUEST,
  };
};

export const fetchTransgressionsSuccess = (behaviors) => {
  return {
    type: FETCH_TRANSGRESSIONS_SUCCESS,
    payload: behaviors,
  };
};
export const fetchTransgressionsFailure = (errors) => {
  return {
    type: FETCH_TRANSGRESSIONS_FAILURE,
    payload: errors,
  };
};

//####### Above Async Actions ########
//localeCompare
export const fetchMeasures = () => {
  return (dispatch) => {
    dispatch(fetchMeasuresRequest);

    api
      .getTableMeasure()
      .then((response) => {
        const measures = response.data.sort((a, b) => {
          if (a.tipo_conduta === b.tipo_conduta) {
            return a.valor - b.valor;
          } else {
            return a.tipo_conduta.localeCompare(b.tipo_conduta);
          }
        });

        dispatch(fetchMeasuresSuccess(measures));
      })
      .catch((error) => {
        const errors = [];
        errors.push('Falha na requisição [' + error + ']');
        dispatch(fetchMeasuresFailure);
      });
  };
};

export const fetchBehaviors = () => {
  return (dispatch) => {
    dispatch(fetchBehaviorsRequest);

    api
      .getTableBehavior()
      .then((response) => {
        dispatch(fetchBehaviorsSuccess(response.data));
      })
      .catch((error) => {
        const errors = [];
        errors.push('Falha na requisição [' + error + ']');
        dispatch(fetchBehaviorsFailure);
      });
  };
};

export const fetchTransgressions = () => {
  return (dispatch) => {
    dispatch(fetchTransgressionsRequest);

    api
      .getTableTransgression()
      .then((response) => {
        dispatch(fetchTransgressionsSuccess(response.data));
      })
      .catch((error) => {
        const errors = [];
        errors.push('Falha na requisição [' + error + ']');
        dispatch(fetchTransgressionsFailure);
      });
  };
};
