import axios from 'axios';
import * as dayjs from 'dayjs';

export const getDolar = async (fechaDolar: string) => {
  try {
    const date = dayjs(fechaDolar).format('YYYY/MM/DD');
    console.log('fechas', fechaDolar, date);
    const response = await axios.get(
      `https://api.argentinadatos.com/v1/cotizaciones/dolares/oficial/${date}`,
      {
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
      },
    );

    return response.data;
  } catch (err) {
    console.log('erro de la nueva api', err);
  }
};

export const getDolarBcraNew = async (fechaDolar: string) => {
  try {
    const response = await axios.get(
      `https://api.bcra.gob.ar/estadisticas/v2.0/DatosVariable/5/${fechaDolar}/${fechaDolar}`,
      {
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
      },
    );
    return response.data.results[0].valor;
  } catch (err) {
    console.log(err);
  }
};
