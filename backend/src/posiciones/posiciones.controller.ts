import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { getJwtPayload } from 'src/auth/utils/jwt.utils';
import { Posicion } from './entities/posicion.entity';
import { PosicionesService } from './posiciones.service';

@ApiTags('posiciones')
@Controller('posiciones')
export class PosicionesController {
  constructor(private readonly posicionesService: PosicionesService) {}

  @Get('byDate')
  public async getMovimientos(
    @Query('from') from: string,
    @Req() request: Request,
  ): Promise<Array<Posicion>> {
    const { accountId } = getJwtPayload(request);
    return this.posicionesService.findByDate(accountId, from);
  }
}
