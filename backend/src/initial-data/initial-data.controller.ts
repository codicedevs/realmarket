import { Controller, Get, Param, Post } from '@nestjs/common';
import { InitialDataService } from './initial-data.service';


@Controller('initial-data')
export class InitialDataController {
  constructor(
    private readonly initialDataService: InitialDataService
    ){}
 
  @Get('/saldos')
  public async getInitialData(): Promise<number> {
    return this.initialDataService.getSaldos()
}


}
