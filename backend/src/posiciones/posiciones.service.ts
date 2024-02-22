import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as dayjs from 'dayjs';
import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { Posicion } from './entities/posicion.entity';

@Injectable()
export class PosicionesService extends RosvalHttpService {
  async findByDate(accountId: string, from: string): Promise<Posicion[]> {
    try {
      const response = await this.get<Posicion[]>(
        `cuentas/${accountId}/posiciones?fecha=${from}&tipoTitulo=Acciones`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new HttpException('Invalid response', HttpStatus.CONFLICT);
    }
  }

  async getSaldos() {
    /**Esta pantalla muestra el SALDO en Efvo PESOS de la cuenta HOY/24Hs/48Hs */
    const fechaHoy = dayjs().format('DD/MM/YYYY');
    const fecha24 = dayjs().add(1, 'day').format('DD/MM/YYYY');
    const fecha48 = dayjs().add(2, 'day').format('DD/MM/YYYY');
    const posicionesHoy = await this.findByDate('42300005', fechaHoy);
    const posiciones24 = await this.findByDate('42300005', fecha24);
    const posiciones48 = await this.findByDate('42300005', fecha48);
    const saldoHoy = posicionesHoy.find((e) => e.tipoTitulo === 'Moneda');
    const saldo24 = posiciones24.find((e) => e.tipoTitulo === 'Moneda');
    const saldo48 = posiciones48.find((e) => e.tipoTitulo === 'Moneda');
    return {
      saldoHoy: saldoHoy.cantidadLiquidada * -1,
      saldo24: saldo24.cantidadLiquidada * -1,
      saldo48: saldo48.cantidadLiquidada * -1,
    };
  }
}
