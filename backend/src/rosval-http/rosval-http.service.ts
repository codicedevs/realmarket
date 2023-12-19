import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';


@Injectable()
export class RosvalHttpService {
  constructor(){
    if(!RosvalHttpService.http) {
      RosvalHttpService.http = axios.create({baseURL: 'https://agentes.rosval.com.ar/Irmo/api/'})
    RosvalHttpService.http.interceptors.response.use(null, this.handleErrorInterceptor)
  }
  this.http = RosvalHttpService.http;
}
  
private static http: AxiosInstance 
http: AxiosInstance

tokenRosval: string | undefined;

 handleErrorInterceptor  = async (error: any) => {
    const originalRequest = error.config;
    //Si el status no es de no authorizado (401) el handler no se ocupa del error
    if (error.response?.status !== 401) throw error;
    // Condiciones para el reintento
    const retryCondition = originalRequest && !originalRequest._retry; //No se reintenta si viene de un reintento(Es decir si es un segundo reintento).
    //Si no se cumplen con las condiciones de reintento se termina emitiendo un evento de no autorizado.
    if (!retryCondition) throw error;
    //Obtenemos y almacenamos el NUEVO access Token
    this.tokenRosval = await this.getBearerToken();
    //Se setea campo custom para identificar el reintento.
    originalRequest._retry = true;
    // Se setea la cabecera de authenticación con el nuevo accesToken guardado
    const newRequest = await this.setAuthHeaderToConfig(originalRequest);
    //Se reintenta la request
    return this.http(newRequest);
  };
  
  /**
   * Asigna cabecera de authenticación a una `requestConfig` de `axios`. Toma el accesToken del `asyncStorage`
   * @param {*} config
   * @returns
   */
  async setAuthHeaderToConfig(config: InternalAxiosRequestConfig<any>) {
    this.http.defaults.headers.common['Authorization'] =`Bearer ${this.tokenRosval}`
    return config;
  }
  
  async getBearerToken(): Promise<string> {
    const response = await this.http.post(`login`, {
      clientId: '423000005',
      username: 'API_Resumen',
      password: 'API_Resumen',
    });
    
    return response.data.token;
  }
  
}