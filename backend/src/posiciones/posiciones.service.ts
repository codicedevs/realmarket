import { Injectable } from '@nestjs/common';

import * as dayjs from 'dayjs';
import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { formatRosvalDate } from 'src/utils/date';
import { Posicion } from './entities/posicion.entity';

@Injectable()
export class PosicionesService extends RosvalHttpService {
  async findByDate(
    accountId: string,
    from: string,
    especie: string = '',
  ): Promise<Posicion[]> {
    const response = await this.get<Posicion[]>(
      `cuentas/${accountId}/posiciones?fecha=${from}&especie=${especie}`,
    );
    return response.data;
  }

  async getCashPositionByDates(accountId: string) {
    /**Esta pantalla muestra el SALDO en Efvo PESOS de la cuenta HOY/24Hs/48Hs */
    const posicionesHoy = await this.findByDate(
      accountId,
      formatRosvalDate(dayjs()),
      'ARS',
    );
    const posiciones24 = await this.findByDate(
      accountId,
      formatRosvalDate(dayjs().add(1, 'day')),
      'ARS',
    );
    const posiciones48 = await this.findByDate(
      accountId,
      formatRosvalDate(dayjs().add(2, 'day')),
      'ARS',
    );
    const posicionesHoyUsd = await this.findByDate(
      accountId,
      formatRosvalDate(dayjs()),
      'USD',
    );
    const posiciones24Usd = await this.findByDate(
      accountId,
      formatRosvalDate(dayjs().add(1, 'day')),
      'USD',
    );
    const posiciones48Usd = await this.findByDate(
      accountId,
      formatRosvalDate(dayjs().add(2, 'day')),
      'USD',
    );

    const posiciones = await this.findByDate(
      accountId,
      formatRosvalDate(dayjs()),
    );

    console.log(posiciones24Usd);
    const usdPrice = 865;
    const usdPriceBcra = 846.35;

    const totalPosiciones = posiciones.reduce((acum, pos) => {
      if (pos.monedaCotizacion === 'USD') {
        acum += pos.cantidadLiquidada * pos.precioUnitario * usdPrice;
      } else if (pos.monedaCotizacion === 'USDB') {
        acum += pos.cantidadLiquidada * pos.precioUnitario * usdPriceBcra;
      } else acum += pos.cantidadLiquidada * pos.precioUnitario;
      return acum;
    }, 0);

    return {
      dispoHoy: posicionesHoy[0].cantidadLiquidada * -1,
      dispo24: posiciones24[0].cantidadLiquidada * -1,
      dispo48: posiciones48[0].cantidadLiquidada * -1,
      dispoHoyUsd: posicionesHoyUsd[0].cantidadLiquidada * -1,
      dispo24Usd: posiciones24Usd[0].cantidadLiquidada * -1,
      dispo48Usd: posiciones48Usd[0].cantidadLiquidada * -1,
      totalPosiciones: totalPosiciones,
    };
  }
}
