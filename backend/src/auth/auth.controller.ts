import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/auth.dto';
import { RefreshAuthGuard } from './guards/refresh.guards';
import { Public } from './skip-auth';
import { getJwtPayload } from './utils/jwt.utils';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

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

  @Get('whoami')
  async whoamiUser(@Req() request: Request) {
    const { username } = getJwtPayload(request);
    return this.userService.findByUsername(username);
  }
  // @Get('users')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
