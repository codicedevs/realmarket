import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Real Market API')
    .setDescription('Endpoints')
    .setVersion('1.0')
    .addTag('users')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  
  app.useGlobalPipes(new ValidationPipe({

    whitelist: true,
    forbidNonWhitelisted: true, 
    transform: true,
  }
  ))

  app.use(morgan('dev'))

  const configService = app.get(ConfigService)
  
  app.enableCors(CORS)


  await app.listen(configService.get('PORT'));

  console.log(`Application running on:${await app.getUrl()}`)

}
bootstrap();
