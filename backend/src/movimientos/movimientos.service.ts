import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Movimiento } from './entities/movimiento.entity';
import { baseURL, tokenRosval } from 'src/main';
import axios from 'axios';

@Injectable()
export class MovimientosService {
  async findByDate(from: string, to: string): Promise<Movimiento[]> {
    try {
      const response = await axios.get<Movimiento[]>(
        `${baseURL}cuentas/423000005/movimientos?fechaDesde=${from}&fechaHasta=${to}`);
      return response.data
        `${baseURL}cuentas/423000005/movimientos?fechaDesde=${from}&fechaHasta=${to}`,
        { headers: { Authorization: tokenRosval } },
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new HttpException('Invalid response', HttpStatus.CONFLICT);
    }
  }

  // create(createMovimientoDto: CreateMovimientoDto) {
  //   return 'This action adds a new movimiento';
  // }

  // findAll() {
  //   return `This action returns all movimientos`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} movimiento`;
  // }

  // update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
  //   return `This action updates a #${id} movimiento`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} movimiento`;
  // }
}
