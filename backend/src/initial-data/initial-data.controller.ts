import { Controller, Get } from '@nestjs/common';
import { InitialDataService } from './initial-data.service';

@Controller('initial-data')
export class InitialDataController {
  constructor(private readonly initialDataService: InitialDataService) {}

  @Get('/saldos')
  public async getInitialData() {
    return this.initialDataService.getSaldos();
  }
}
