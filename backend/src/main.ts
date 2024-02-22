import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { CORS } from './constants';
import { GlobalExceptionFilter } from './exception-filters/global.exception.filter';
import { serverSettings } from './settings';
import { getProtocolConfig } from './utils/ssl';

async function bootstrap() {
  const { key, cert, protocol } = getProtocolConfig();
  const app = await NestFactory.create(
    AppModule,
    protocol == 'https' ? { httpsOptions: { key, cert } } : undefined,
  );

  /** En las siguientes lineas cargo y seteo Swagger para mostrar la documentacion de los Endpoints */

  const config = new DocumentBuilder()
    .setTitle('Real Market API')
    .setDescription('Endpoints')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(morgan('dev'));

  app.enableCors(CORS);

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(serverSettings.SERVER_PORT);

  console.log(`Application running on:${await app.getUrl()}`);
}
bootstrap();
