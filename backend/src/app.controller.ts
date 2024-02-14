import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/SkipAuth';

@Controller()
@Public()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
