import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { getJwtPayload } from 'src/auth/utils/jwt.utils';
import { Posicion } from './entities/posicion.entity';
import { Dolar, PosicionesService } from './posiciones.service';

@ApiTags('posiciones')
@ApiBearerAuth()
@Controller('posiciones')
export class PosicionesController {
  constructor(private readonly posicionesService: PosicionesService) { }

  @Get('')
  @ApiQuery({ name: 'from', required: true, type: String })
  @ApiQuery({ name: 'especie', required: false, type: String })
  public async getPosiciones(
    @Query('from') from: string,
    @Query('especie') especie: string,
    @Req() request: Request,
  ): Promise<Array<Posicion>> {
    const { accountId } = getJwtPayload(request);
    return this.posicionesService.findByDate(accountId, from, especie);
  }

  @Get('cash-position-by-dates')
  public async getCashPositionByDates(@Req() request: Request) {
    const { accountId } = getJwtPayload(request);
    return this.posicionesService.getCashPositionByDates(accountId);
  }

  @Get('total-position')
  public async totalPosition(@Req() request: Request) {
    const { accountId } = getJwtPayload(request);
    return this.posicionesService.getTotalPosition(accountId);
  }

  @Get('dolar')
  public async getDolar(@Req() request: Request, @Query('date') date: string): Promise<Dolar> {
    const res = this.posicionesService.getDolar(date)
    return res
  }
}
