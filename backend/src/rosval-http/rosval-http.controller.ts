import { Controller } from '@nestjs/common';
import { RosvalHttpService } from './rosval-http.service';

@Controller('rosval-http')
export class RosvalHttpController {
  constructor(private readonly rosvalHttpService: RosvalHttpService) {}
}
