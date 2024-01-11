import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { CORS } from './constants';
import * as fs from 'fs';

async function bootstrap() {
  
  const httpOptions = {
    key: fs.readFileSync('/root/real-market/backend/server.key'),
    cert: fs.readFileSync('/root/real-market/backend/server.rest'),
  }
  const app = await NestFactory.create(AppModule, {httpsOptions: httpOptions});


  /** En las siguientes lineas cargo y seteo Swagger para mostrar la documentacion de los Endpoints */

  const config = new DocumentBuilder()
    .setTitle('Real Market API')
    .setDescription('Endpoints')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  //

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

  await app.listen(configService.get('PORT'));

  console.log(`Application running on:${await app.getUrl()}`);
}
bootstrap();