import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Movimiento } from './entities/movimiento.entity';
import { MovimientosService } from './movimientos.service';

@ApiTags('movimientos')
@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Get('byDate')
  public async getMovimientos(
    @Query('from') from: string,
    @Query('to') to: string,
  ): Promise<Array<Movimiento>> {
    return this.movimientosService.findByDate(from, to);
  }
}
