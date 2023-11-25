import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(morgan('dev'));

  const configService = app.get(ConfigService);

  app.enableCors(CORS);
  app.setGlobalPrefix('api');

  await app.listen(configService.get('PORT'));
  console.log(`Application running on:${await app.getUrl()}`);
}
bootstrap();
