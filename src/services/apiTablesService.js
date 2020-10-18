import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

async function submit(method, table) {
  const response = await axios[method](`${BASE_URL}/${table}`);

  if (response.status !== 200) {
    throw Error(response.Error);
  }

  return response;
}

//table Medida
export function getTableMeasure() {
  return submit('get', 'tabela-medida');
}

//table comportamento
export function getTableBehavior() {
  return submit('get', 'tabela-comportamento');
}

//table transgressão
export function getTableTransgression() {
  return submit('get', 'tabela-transgressao');
}
