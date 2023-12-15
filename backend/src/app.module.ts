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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.develop.env',
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
  providers: [AppService],
})
export class AppModule {}
