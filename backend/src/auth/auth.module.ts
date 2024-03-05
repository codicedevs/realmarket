import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtSettings } from 'src/settings';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtSettings.JWT_ACCESS_SECRET,
      //TODO: Podríamos mover esto a un settings y a un .env para que no nos afecte en los entornos de prueba
      signOptions: { expiresIn: jwtSettings.JWT_ACCESS_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
