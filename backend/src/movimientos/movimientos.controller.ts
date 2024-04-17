import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { getJwtPayload } from 'src/auth/utils/jwt.utils';
import { Movimiento } from './entities/movimiento.entity';
import { MovimientosService } from './movimientos.service';

@ApiTags('movimientos')
@ApiBearerAuth()
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

  @Get('comprobante')
  public async comprobanteOperacion(
    @Res() res: Response,
    @Query('id') idComprobante: string,
  ) {
    const rosvalRes =
      await this.movimientosService.comprobanteOperacion(idComprobante);
    res.set({
      'Content-Type': 'application/pdf',
    });
    return rosvalRes.data.pipe(res); //
  }
}
