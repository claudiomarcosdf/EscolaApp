import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

async function getWatchers() {
  let response;
  response = await axios.get(`${BASE_URL}/observadores`);

  if (response.status !== 200) {
    throw Error(response.Error);
  }

  return response;
}

export { getWatchers };
