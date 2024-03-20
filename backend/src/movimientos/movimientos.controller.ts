import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { getJwtPayload } from 'src/auth/utils/jwt.utils';
import { Movimiento } from './entities/movimiento.entity';
import { MovimientosService } from './movimientos.service';

@ApiTags('movimientos')
@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Get('')
  public async getMovimientos(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('especie') especie: string,
    @Req() request: Request,
  ): Promise<Array<Movimiento>> {
    const { accountId } = getJwtPayload(request);
    return this.movimientosService.findByDate(accountId, from, to, especie);
  }

  @Get('pesos')
  public async movimientosPesos(@Req() request: Request) {
    const { accountId } = getJwtPayload(request);
    return this.movimientosService.getMovimientosPesos(accountId);
  }
  @Get('usd')
  public async movimientosUsd(@Req() request: Request) {
    const { accountId } = getJwtPayload(request);
    return this.movimientosService.movimientosUsd(accountId);
  }
}
