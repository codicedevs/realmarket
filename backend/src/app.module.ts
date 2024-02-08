import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { InitialDataModule } from './initial-data/initial-data.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { PosicionesModule } from './posiciones/posiciones.module';
import { DirectionsModule } from './directions/directions.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

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
    DirectionsModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    //Esto Bindea a Nivel Global el AUTHGUARD para todos los endpoints a menos que se decoren con @Public()],
  ]
})
export class AppModule {}
