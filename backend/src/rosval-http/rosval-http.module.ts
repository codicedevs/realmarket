import { Module } from '@nestjs/common';
import { RosvalHttpService } from './rosval-http.service';
import { RosvalHttpController } from './rosval-http.controller';

@Module({
  controllers: [RosvalHttpController],
  providers: [RosvalHttpService],
})
export class RosvalHttpModule {}
