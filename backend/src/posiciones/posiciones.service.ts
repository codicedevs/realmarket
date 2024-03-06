import { Injectable } from '@nestjs/common';

import * as dayjs from 'dayjs';
import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { formatRosvalDate } from 'src/utils/date';
import { Posicion } from './entities/posicion.entity';

@Injectable()
export class PosicionesService extends RosvalHttpService {
  async findByDate(accountId: string, from: string): Promise<Posicion[]> {
    const response = await this.get<Posicion[]>(
      `cuentas/${accountId}/posiciones?fecha=${from}&tipoTitulo=Acciones`,
    );
    return response.data;
  }

  async getCashPositionByDates(accountId: string) {
    /**Esta pantalla muestra el SALDO en Efvo PESOS de la cuenta HOY/24Hs/48Hs */
    const posicionesHoy = await this.findByDate(
      accountId,
      formatRosvalDate(dayjs()),
    );
    const posiciones24 = await this.findByDate(
      accountId,
      formatRosvalDate(dayjs().add(1, 'day')),
    );
    // const posiciones48 = await this.findByDate(
    //   accountId,
    //   formatRosvalDate(dayjs().add(2, 'day')),
    // );
    const dispoHoy = posicionesHoy.find((e) => e.tipoTitulo === 'Moneda');
    const dispo24 = posiciones24.find((e) => e.tipoTitulo === 'Moneda');
    // const dispo48 = posiciones48.find((e) => e.tipoTitulo === 'Moneda');
    return {
      dispoHoy: dispoHoy.cantidadLiquidada * -1,
      dispo24: dispo24.cantidadLiquidada * -1,
      // dispo48: dispo48.cantidadLiquidada * -1,
    };
  }
}
