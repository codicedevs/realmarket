import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getJwtPayload } from 'src/auth/utils/jwt.utils';
import { Posicion } from 'src/types/posicion';
import { CreatePosicioneDto } from './dto/create-posicione.dto';
import { UpdatePosicioneDto } from './dto/update-posicione.dto';
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
  @Post()
  create(@Body() createPosicioneDto: CreatePosicioneDto) {
    return this.posicionesService.create(createPosicioneDto);
  }

  @Get()
  findAll() {
    return this.posicionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posicionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePosicioneDto: UpdatePosicioneDto,
  ) {
    return this.posicionesService.update(+id, updatePosicioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posicionesService.remove(+id);
  }
}
