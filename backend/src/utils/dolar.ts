import axios from 'axios';

const bearerBcra =
  'BEARER ' +
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDE3OTkzMjMsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJtdHJvdmFudEBnbWFpbC5jb20ifQ.LAJPY8vNUSNPJ0SfzC4TrSfg5oIjZO1E8KQ0kfq8wPkcFng-PqqFOMoGaXN1SkPt4K64nELxp1-NcfBHstmXdg';

// Consultado a https://dolarapi.com/docs/operations/get-dolar-oficial.html  -- API GRATUITA y DIARIA
export const getDolar = async () => {
  const response = await axios.get('https://dolarapi.com/v1/dolares/oficial');
  return response.data;
};

// Consultado a https://estadisticasbcra.com/api/documentacion -- TIENE 100 CONSULTAS DIARIAS LIBRES y el BEARER TOKEN VENCE AL AÑO

export const getDolarBcra = async () => {
  const response = await axios.get('https://api.estadisticasbcra.com/usd_of', {
    headers: { Authorization: bearerBcra },
  });
  return response.data[response.data.length - 1];
};
