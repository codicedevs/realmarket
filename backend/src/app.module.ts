import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { InitialDataModule } from './initial-data/initial-data.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { PosicionesModule } from './posiciones/posiciones.module';
import { UserModule } from './users/user.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      url: 'mongodb+srv://admin:Codice1925@realmarkettest.nzdpe9p.mongodb.net/',
      database: 'RealMarketTest',
      useNewUrlParser: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      entities: [join(__dirname, '**/**.entity{.ts, .js}')],
    }),
    UserModule,
    AuthModule,
    MovimientosModule,
    PosicionesModule,
    InitialDataModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    //Esto Bindea a Nivel Global el AUTHGUARD para todos los endpoints a menos que se decoren con @Public()],
  ],
})
export class AppModule {}
