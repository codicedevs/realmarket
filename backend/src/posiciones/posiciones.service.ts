import { Injectable, Logger } from '@nestjs/common';

import * as dayjs from 'dayjs';
import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { formatRosvalDate } from 'src/utils/date';
import { getDolar, getDolarBcra } from 'src/utils/dolar';
import { Posicion } from './entities/posicion.entity';

const logger = new Logger(RosvalHttpService.name);

@Injectable()
export class PosicionesService extends RosvalHttpService {
  private readonly logger = new Logger();
  async findByDate(
    accountId: string,
    from: string,
    especie?: string,
  ): Promise<Posicion[]> {
    const timeLabel = Date.now().toString();
    this.logger.log('arranco el logger a las ' + timeLabel);
    const response = await this.get<Posicion[]>(
      `cuentas/${accountId}/posiciones`,
      { params: { from, especie } },
    );
    this.logger.log('Aca termino de llamar posiciones ' + new Date());
    return response.data;
  }

  async getTotalPosition(accountId: string) {
    const posiciones = await this.findByDate(
      accountId,
      formatRosvalDate(dayjs()),
    );

    const pruebaDolar = await getDolar();
    const pruebaDolarBcra = await getDolarBcra();

    const usdPrice = pruebaDolar.venta;
    const usdPriceBcra = pruebaDolarBcra.v;

    const totalPosiciones = posiciones.reduce((acum, pos) => {
      if (pos.monedaCotizacion === 'USD') {
        acum += pos.cantidadLiquidada * pos.precioUnitario * usdPrice;
      } else if (pos.monedaCotizacion === 'USDB') {
        acum += pos.cantidadLiquidada * pos.precioUnitario * usdPriceBcra;
      } else acum += pos.cantidadLiquidada * pos.precioUnitario;
      return acum;
    }, 0);

    return { totalPosiciones, usdPrice, usdPriceBcra, posiciones };
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

    return {
      dispoHoy:
        (posicionesHoy[0].cantidadLiquidada -
          posicionesHoy[0].cantidadPendienteLiquidar) *
        -1,
      dispo24:
        (posiciones24[0].cantidadLiquidada -
          posiciones24[0].cantidadPendienteLiquidar) *
        -1,
      dispo48:
        (posiciones48[0].cantidadLiquidada -
          posiciones48[0].cantidadPendienteLiquidar) *
        -1,
      dispoHoyUsd:
        (posicionesHoyUsd[0].cantidadLiquidada -
          posicionesHoyUsd[0].cantidadPendienteLiquidar) *
        -1,
      dispo24Usd:
        (posiciones24Usd[0].cantidadLiquidada -
          posiciones24Usd[0].cantidadPendienteLiquidar) *
        -1,
      dispo48Usd:
        (posiciones48Usd[0].cantidadLiquidada -
          posiciones48Usd[0].cantidadPendienteLiquidar) *
        -1,
    };
  }
}
