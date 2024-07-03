import { Injectable, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { formatRosvalDate } from 'src/utils/date';
import { Posicion } from './entities/posicion.entity';

export interface Dolar {

  usd: number,
  usdb: number,

}

const logger = new Logger(RosvalHttpService.name);


@Injectable()
export class PosicionesService extends RosvalHttpService {
  private readonly logger = new Logger();

  async getDolar(date: string): Promise<Dolar> {

    try {

      const responseUSD = await this.get('unidades/cotizaciones', { params: { fecha: date, unidad: 'USD' } })
      const responseUSDB = await this.get('unidades/cotizaciones', { params: { fecha: date, unidad: 'USDB' } })

      return { usd: responseUSD.data[0].cierre, usdb: responseUSDB.data[0].cierre }

    } catch (err) {
      console.log('Error', err.message)
    }
  }

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
    const fechaDolar = formatRosvalDate(dayjs().subtract(1, 'day'));
    const pruebaDolar = await this.getDolar(fechaDolar)
    const usdPrice = pruebaDolar?.usd;
    const usdPriceBcra = pruebaDolar?.usdb;

    posiciones.forEach(p => {
      if (p.tipoTitulo === 'Moneda' && p.monedaCotizacion === 'USD') {
        console.log(p.tipoTitulo, p.monedaCotizacion, p.precio, usdPrice)
        p.precioUnitario = usdPrice
        p.simboloLocal = p.nombreEspecie
      }
    })


    const totalPosiciones = posiciones.reduce((acum, pos) => {
      if (pos.monedaCotizacion === 'USD') {
        acum += pos.cantidadLiquidada * pos.precioUnitario * usdPrice;
      } else if (pos.monedaCotizacion === 'USDB') {
        acum += pos.cantidadLiquidada * pos.precioUnitario * usdPriceBcra;
      } else acum += (pos.cantidadLiquidada * pos.precioUnitario) + (pos.cantidadPendienteLiquidar * pos.precioUnitario);
      return acum;
    }, 0);

    return {
      totalPosiciones,
      usdPrice,
      usdPriceBcra,
      posiciones,
    };
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
      dispoHoy: posicionesHoy[0].cantidadLiquidada * -1,
      dispoHoy2: posicionesHoy[0].cantidadPendienteLiquidar * -1,
      dispo24:
        (posiciones24[0].cantidadLiquidada +
          posiciones24[0].cantidadPendienteLiquidar) *
        -1,
      dispo48:
        (posiciones48[0].cantidadLiquidada +
          posiciones48[0].cantidadPendienteLiquidar) *
        -1,
      dispoHoyUsd:
        (posicionesHoyUsd[0].cantidadLiquidada +
          posicionesHoyUsd[0].cantidadPendienteLiquidar) *
        -1,
      dispo24Usd:
        (posiciones24Usd[0].cantidadLiquidada +
          posiciones24Usd[0].cantidadPendienteLiquidar) *
        -1,
      dispo48Usd:
        (posiciones48Usd[0].cantidadLiquidada +
          posiciones48Usd[0].cantidadPendienteLiquidar) *
        -1,
    };
  }
}
