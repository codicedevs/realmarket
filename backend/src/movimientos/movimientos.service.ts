import { Injectable } from '@nestjs/common';
import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { Movimiento } from './entities/movimiento.entity';

@Injectable()
export class MovimientosService extends RosvalHttpService {
  async findByDate(
    accountId: string,
    from: string,
    to: string,
    especie?: string,
  ): Promise<Movimiento[]> {
    const response = await this.get<Movimiento[]>(
      `cuentas/${accountId}/movimientos`,
      { params: { fechaDesde: from, fechaHasta: to, especie } },
    );
    return response.data;
  }

  async movimientosPesos(accountId: string) {
    const from = '12/03/2024';
    // formatRosvalDate(dayjs().subtract(2, 'day'));
    const to = '14/03/2024';
    // formatRosvalDate(dayjs());
    const movimientosOrdenados = {};
    const movimientosPesos = await this.findByDate(accountId, from, to, 'ARS');
    let saldo: number = 0;

    for (const mov of movimientosPesos) {
      if (movimientosOrdenados[mov.informacion])
        movimientosOrdenados[mov.informacion].cantidad += mov.cantidad;
      else {
        movimientosOrdenados[mov.informacion] = mov;
      }
      saldo += mov.cantidad;
    }
    return { saldo, movimientosOrdenados };
  }
}
