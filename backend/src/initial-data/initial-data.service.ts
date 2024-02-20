import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { PosicionesService } from 'src/posiciones/posiciones.service';

// const baseURL = 'https://agentes.rosval.com.ar/Irmo/api/';
// const fecha24 = moment().add(1, 'days').format('DD/MM/YYYY');
// const fecha48 = moment().add(2, 'days').format('DD/MM/YYYY');

@Injectable()
export class InitialDataService {
  constructor(private posicionesService: PosicionesService) {}

  async getSaldos() {
    /**Esta pantalla muestra el SALDO en Efvo PESOS de la cuenta HOY/24Hs/48Hs */
    const fechaHoy = dayjs().format('DD/MM/YYYY');
    const fecha24 = dayjs().add(1, 'day').format('DD/MM/YYYY');
    const fecha48 = dayjs().add(2, 'day').format('DD/MM/YYYY');
    const posicionesHoy = await this.posicionesService.findByDate(
      '42300005',
      fechaHoy,
    );
    const posiciones24 = await this.posicionesService.findByDate(
      '42300005',
      fecha24,
    );
    const posiciones48 = await this.posicionesService.findByDate(
      '42300005',
      fecha48,
    );
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
