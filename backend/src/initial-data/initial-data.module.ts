import { Module } from '@nestjs/common';
import { InitialDataService } from './initial-data.service';
import { InitialDataController } from './initial-data.controller';
import { PosicionesModule } from 'src/posiciones/posiciones.module';

@Module({
  imports: [PosicionesModule],
  controllers: [InitialDataController],
  providers: [InitialDataService],
})
export class InitialDataModule {}
