import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { Public } from './SkipAuth';
import { RefreshAuthGuard } from './guards/refresh.guards';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>){
        return this.authService.signIn(signInDto.username, signInDto.pass)
    }

    @Public()
    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    async refreshToken(@Request() req){
       const token =  RefreshAuthGuard.extractTokenFromHeader(req)
        return await this.authService.refreshToken(token)
    }

    @UseGuards(AuthGuard)
    @Get('users')
    getProfile(@Request() req){
        return req.user
    }
}
