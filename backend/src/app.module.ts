import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TypeOrmModule} from '@nestjs/typeorm'
import {join} from 'path'
import { UserModule } from './users/user.module';
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.develop.env',
    isGlobal: true,
  }), TypeOrmModule.forRoot({
    name: 'default',
    type: 'mongodb',
    url: 'mongodb+srv://admin:Codice1925@realmarkettest.nzdpe9p.mongodb.net/',
    database: 'RealMarketTest',
    useNewUrlParser: true,
    autoLoadEntities: true,
    useUnifiedTopology: true,
    entities: [join(__dirname, '**/**.entity{.ts, .js}')]
  }), UserModule, AuthModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
