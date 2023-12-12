import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '300s'}
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
  exports: [AuthService],
})
export class AuthModule {}
