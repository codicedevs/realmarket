import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { MovimientosModule } from './movimientos/movimientos.module';
import { PosicionesModule } from './posiciones/posiciones.module';
import { dbSettings } from './settings';
import { UserModule } from './users/user.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      url: dbSettings.DB_URL,
      database: dbSettings.DB_NAME,
      synchronize: true,
      useNewUrlParser: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      entities: [join(__dirname, '**/**.entity{.ts, .js}')],
    }),
    UserModule,
    AuthModule,
    MovimientosModule,
    PosicionesModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    EmailService,
  ],
})
export class AppModule { }
