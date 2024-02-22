import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/auth.dto';
import { RefreshAuthGuard } from './guards/refresh.guards';
import { Public } from './skip-auth';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  //TODO: Ver si es necesario hacer un DTO con validación
  signIn(@Body() signInDto: SignInUserDto) {
    return this.authService.signIn(signInDto.username, signInDto.pass);
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Headers('refresh-token') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }

  @Get('users')
  getProfile(@Request() req) {
    return req.user;
  }
}
