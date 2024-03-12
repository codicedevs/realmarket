import axios from 'axios';

const bearer =
  'BEARER ' +
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDE3OTkzMjMsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJtdHJvdmFudEBnbWFpbC5jb20ifQ.LAJPY8vNUSNPJ0SfzC4TrSfg5oIjZO1E8KQ0kfq8wPkcFng-PqqFOMoGaXN1SkPt4K64nELxp1-NcfBHstmXdg';

export const getDolar = async () => {
  const response = await axios.get('https://dolarapi.com/v1/dolares/oficial');
  return response.data;
};

export const getDolarBcra = async () => {
  const response = await axios.get('https://api.estadisticasbcra.com/usd_of', {
    headers: { Authorization: bearer },
  });
  return response.data[response.data.length - 1];
};
