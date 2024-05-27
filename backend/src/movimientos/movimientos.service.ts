import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as dayjs from 'dayjs';
import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { formatRosvalDate } from 'src/utils/date';
import { Movimiento } from './entities/movimiento.entity';

const logger = new Logger(RosvalHttpService.name);

@Injectable()
export class MovimientosService extends RosvalHttpService {
  async findByDate(
    accountId: string,
    from: string,
    to: string,
    especie?: string,
  ): Promise<Movimiento[]> {
    logger.debug('Empezo a llamar a movimientos ' + new Date());
    const response = await this.get<Movimiento[]>(
      `cuentas/${accountId}/movimientos`,
      { params: { fechaDesde: from, fechaHasta: to, especie } },
    );
    logger.debug('Termino ' + new Date());
    return response.data;
  }

  //esta funcion recibe el objeto con los movimientos agrupados por INFORMACION y lo transforma en un array de objetos listos para el front (y le calcula los saldos para mostrar)
  formatArray(objectList: {}, from: string) {
    const array = Object.keys(objectList).map((key) => ({
      description: key,
      comprobante: objectList[key].comprobante,
      date: objectList[key].fecha.slice(0, 10),
      amount: objectList[key].cantidad,
      balance: 0,
    }));

    let saldo = 0;
    if (!array.find((elem) => elem.description === 'Acumulado'))
      array.unshift({
        description: 'Acumulado',
        comprobante: 'S/N',
        amount: 0,
        balance: 0,
        date: from,
      });
    for (const [i, m] of array.entries()) {
      if (m.description === 'Acumulado') m.description = 'Saldo Inicial';
      saldo += array[i].amount;
      array[i].balance = saldo;
    }
    return array;
  }
  //

  async getMovimientosPesos(accountId: string) {
    const from = formatRosvalDate(dayjs().subtract(15, 'day'));
    const to = formatRosvalDate(dayjs().add(2, 'day'));
    const movimientosOrdenados = {};
    const movimientosPesos = await this.findByDate(accountId, from, to, 'ARS');

    for (const mov of movimientosPesos) {
      mov.cantidad *= -1;
      if (movimientosOrdenados[mov.informacion])
        movimientosOrdenados[mov.informacion].cantidad += mov.cantidad;
      else {
        movimientosOrdenados[mov.informacion] = mov;
      }
    }
    const res = this.formatArray(movimientosOrdenados, from);
    return res;
  }

  async movimientosUsd(accountId: string) {
    const from = formatRosvalDate(dayjs().subtract(15, 'day'));
    const to = formatRosvalDate(dayjs());
    const movimientosOrdenados = {};
    const movimientosUsd = await this.findByDate(accountId, from, to, 'USD');

    for (const mov of movimientosUsd) {
      if (movimientosOrdenados[mov.informacion])
        movimientosOrdenados[mov.informacion].cantidad += mov.cantidad;
      else {
        movimientosOrdenados[mov.informacion] = mov;
      }
    }

    return this.formatArray(movimientosOrdenados, from);
  }

  async comprobanteOperacion(
    idComprobante: string,
  ): Promise<AxiosResponse<any, any>> {
    const resp = await this.get(`/comprobantes/${idComprobante}`, {
      params: { formato: 'PDF' },
      responseType: 'stream',
    });
    return resp;
  }
}
