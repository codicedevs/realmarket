import axios from 'axios';

export const getDolar = async () => {
  await axios
    .get('https://dolarapi.com/v1/dolares/oficial')
    .then((response) => response)
    .then((response) => console.log(response.data));
};
