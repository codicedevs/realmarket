import { Module } from '@nestjs/common';
import { PosicionesService } from './posiciones.service';
import { PosicionesController } from './posiciones.controller';
@Module({
  controllers: [PosicionesController],
  providers: [PosicionesService],
  exports: [PosicionesService],
})
export class PosicionesModule {}
