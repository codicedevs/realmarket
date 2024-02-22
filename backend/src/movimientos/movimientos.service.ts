import { Injectable } from '@nestjs/common';
import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { Movimiento } from './entities/movimiento.entity';

@Injectable()
export class MovimientosService extends RosvalHttpService {
  async findByDate(from: string, to: string): Promise<Movimiento[]> {
    const response = await this.http.get<Movimiento[]>(
      `cuentas/423000005/movimientos?fechaDesde=${from}&fechaHasta=${to}`,
    );
    return response.data;
  }
}
