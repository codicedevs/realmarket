import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { CORS } from './constants';
import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export const baseURL = 'https://agentes.rosval.com.ar/Irmo/api/';

export let tokenRosval: string | undefined;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  /**Aca declaro el interceptor de AXIOS para actualizar el access token */

  axios.interceptors.response.use(null, handleErrorInterceptor);

  await app.listen(configService.get('PORT'));

  console.log(`Application running on:${await app.getUrl()}`);
}
bootstrap();

/**Logica para el Interceptor de la response en Axios  */


const handleErrorInterceptor = async (error: any) => {
  const originalRequest = error.config;
  //Si el status no es de no authorizado (401) el handler no se ocupa del error
  if (error.response?.status !== 401) throw error;
  // Condiciones para el reintento
  const retryCondition = originalRequest && !originalRequest._retry; //No se reintenta si viene de un reintento(Es decir si es un segundo reintento).
  //Si no se cumplen con las condiciones de reintento se termina emitiendo un evento de no autorizado.
  if (!retryCondition) throw error;
  //Obtenemos y almacenamos el NUEVO access Token
  tokenRosval = await getBearerToken();
  //Se setea campo custom para identificar el reintento.
  originalRequest._retry = true;
  // Se setea la cabecera de authenticación con el nuevo accesToken guardado
  const newRequest = await setAuthHeaderToConfig(originalRequest);
  //Se reintenta la request
  return axios(newRequest);
};

/**
 * Asigna cabecera de authenticación a una `requestConfig` de `axios`. Toma el accesToken del `asyncStorage`
 * @param {*} config
 * @returns
 */
async function setAuthHeaderToConfig(config: InternalAxiosRequestConfig<any>) {
  if (tokenRosval) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${tokenRosval}`,
    } as AxiosRequestHeaders;
  }
  return config;
}

async function getBearerToken(): Promise<string> {
  const response = await axios.post(`${baseURL}login`, {
    clientId: '423000005',
    username: 'API_Resumen',
    password: 'API_Resumen',
  });
  
  return response.data.token;
}
