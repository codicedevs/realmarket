import { Injectable, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { formatRosvalDate } from 'src/utils/date';
import { Posicion } from './entities/posicion.entity';

export interface Dolar {
  usd: number[];
  usdb: number[];
}

const logger = new Logger(RosvalHttpService.name);

@Injectable()
export class PosicionesService extends RosvalHttpService {
  private readonly logger = new Logger();

  async getDolar(date: string): Promise<Dolar> {
    try {
      const { data: apiDolar } = await this.get('unidades/cotizaciones', {
        params: { fecha: date, moneda: 'ARS' },
      });

      return {
        usd: apiDolar
          .filter(
            (resp) => resp.moneda === 'ARS' && resp.codigoUnidad === 'USD',
          )
          .map((e) => e.cierre),
        usdb: apiDolar
          .filter(
            (resp) => resp.moneda === 'ARS' && resp.codigoUnidad === 'USDB',
          )
          .map((e) => e.cierre),
      };
    } catch (err) {
      console.log('Error', err.message);
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
      { params: { fecha: from } },
    );
    if (especie) {
      const res = response.data.filter((pos) => pos.especie === especie)
      return res
    }
    this.logger.log('Aca termino de llamar posiciones ' + new Date());
    return response.data;
  }

  async getTotalPosition(accountId: string) {
    const posiciones = await this.findByDate(
      accountId,
      formatRosvalDate(dayjs()),
    );
    const fechaDolar = formatRosvalDate(dayjs().subtract(1, 'day'));
    const pruebaDolar = await this.getDolar(fechaDolar);
    const usdPrice = pruebaDolar?.usd[0];
    const usdPriceBcra = pruebaDolar?.usdb[0];

    posiciones.forEach((p) => {
      if (p.tipoTitulo == "ECHEQ" && p.informacion) {
        const match = p.informacion.match(/Liq\.\s(\d{2}\/\d{2}\/\d{4})/);
        p.vencimiento = match ? match[1] : 'Desconocido'
        const matchde = p.informacion.match(/\]\s.*\s\[/);
        p.de = matchde ? matchde[0].slice(2, -2) : "Desconocido";
      }
      if (p.tipoTitulo === 'Moneda') {
        if (p.monedaCotizacion === 'USD' || 'USDB' || 'USDC') {
          p.simboloLocal = p.nombreEspecie;
        } else if (!p.cantidadLiquidada) {
          p.simboloLocal = '$ por liquidar';
        } else {
          p.simboloLocal = '$ liquidados';
        }
      }
    });

    const totalPosiciones = posiciones.reduce((acum, pos) => {
      if (pos.monedaCotizacion === 'USD' || pos.monedaCotizacion === 'USDC') {
        acum += pos.cantidadLiquidada * pos.precioUnitario * usdPrice;
      } else if (pos.monedaCotizacion === 'USDB') {
        acum += pos.cantidadLiquidada * pos.precioUnitario * usdPriceBcra;
      } else
        acum +=
          pos.cantidadLiquidada * pos.precioUnitario +
          pos.cantidadPendienteLiquidar * pos.precioUnitario;
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

    const posicionesHoy = await this.findByDate(accountId, formatRosvalDate(dayjs()))

    const posiciones24 = await this.findByDate(accountId, formatRosvalDate(dayjs().add(1, 'day')))

    // const posicionesHoy = await this.findByDate(
    //   accountId,
    //   formatRosvalDate(dayjs()),
    //   'ARS',
    // );
    // const posiciones24 = await this.findByDate(
    //   accountId,
    //   formatRosvalDate(dayjs().add(1, 'day')),
    //   'ARS',
    // );
    // const posicionesHoyUsd = await this.findByDate(
    //   accountId,
    //   formatRosvalDate(dayjs()),
    //   'USD',
    // );
    // const posiciones24Usd = await this.findByDate(
    //   accountId,
    //   formatRosvalDate(dayjs()),
    //   'USD',
    // );

    const dispoHoy = posicionesHoy.filter(p => p.especie === 'ARS').reduce((acum, p) => {
      acum += p.cantidadLiquidada;
      return acum;
    }, 0);

    const dispoHoyUsd = posicionesHoy.filter(p => p.especie === 'USD').reduce((acum, p) => {
      acum += p.cantidadLiquidada;
      return acum;
    }, 0);

    const dispo24 = posiciones24.filter(p => p.especie === 'ARS').reduce((acum, p) => {
      acum += p.cantidadLiquidada;
      return acum;
    }, 0);

    const dispo24Usd = posiciones24.filter(p => p.especie === 'ARS').reduce((acum, p) => {
      acum += p.cantidadLiquidada;
      return acum;
    }, 0);

    return {
      dispoHoy: dispoHoy,
      dispoHoy2: posicionesHoy[0].cantidadPendienteLiquidar * -1,
      dispo24: dispo24,
      dispoHoyUsd: dispoHoyUsd,
      dispo24Usd: dispo24Usd,
    };
  }
}
