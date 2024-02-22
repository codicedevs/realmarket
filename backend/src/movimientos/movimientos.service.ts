import { Injectable } from '@nestjs/common';
import { RosvalHttpService } from 'src/rosval-http/rosval-http.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { Movimiento } from './entities/movimiento.entity';

@Injectable()
export class MovimientosService extends RosvalHttpService {
  async findByDate(from: string, to: string): Promise<Movimiento[]> {
    const response = await this.http.get<Movimiento[]>(
      `cuentas/423000005/movimientos?fechaDesde=${from}&fechaHasta=${to}`,
    );
    return response.data;
  }

  create(createMovimientoDto: CreateMovimientoDto) {
    return 'This action adds a new movimiento';
  }

  findAll() {
    return `This action returns all movimientos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimiento`;
  }

  update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    return `This action updates a #${id} movimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimiento`;
  }
}
