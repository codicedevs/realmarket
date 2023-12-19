import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { CORS } from './constants';
<<<<<<< HEAD
import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { RosvalHttpController } from './rosval-http/rosval-http.controller';
=======
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
>>>>>>> 305a0ee844eb48586f091ce17d167e2e49f359ae


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

  await app.listen(configService.get('PORT'));

  console.log(`Application running on:${await app.getUrl()}`);
}
bootstrap();
<<<<<<< HEAD




=======
/* TODO: Mover esto  a un servicio por ejemplo RosvalHttpService dónde maneje una instancia de axios singleton 
con los interceptores, base URL y el manejo de token. Podemos después extender este servicio en los servicios de posiciones,
movimientos y demás servicios que dependan de Rosval
*/
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
const setAuthHeaderToConfig = async (config: InternalAxiosRequestConfig<any>)=> {
  axios.defaults.headers.common['Authorization'] =`Bearer ${tokenRosval}`
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
>>>>>>> 305a0ee844eb48586f091ce17d167e2e49f359ae
