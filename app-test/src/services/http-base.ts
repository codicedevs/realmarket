import axios, { Axios, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export abstract class HttpBase {
  protected axiosInstance: Axios
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL })
    this.axiosInstance.interceptors.response.use(null, this.handleErrorInterceptor)
    this.axiosInstance.interceptors.request.use(this.handleRequestInterceptor);
  }
  request<T = any, R = AxiosResponse<T, any>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.request(config);
  }
  get<T = any, R = AxiosResponse<T, any>, D = any>(url: string, config?: AxiosRequestConfig<D> | undefined): Promise<R> {
    return this.axiosInstance.get(url, config);
  }
  delete<T = any, R = AxiosResponse<T, any>, D = any>(url: string, config?: AxiosRequestConfig<D> | undefined): Promise<R> {
    return this.delete(url, config);
  }
  head<T = any, R = AxiosResponse<T, any>, D = any>(url: string, config?: AxiosRequestConfig<D> | undefined): Promise<R> {
    return this.axiosInstance.head(url, config)
  }
  options<T = any, R = AxiosResponse<T, any>, D = any>(url: string, config?: AxiosRequestConfig<D> | undefined): Promise<R> {
    return this.axiosInstance.options(url, config);
  }
  post<T = any, R = AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined): Promise<R> {
    return this.axiosInstance.post(url, data, config);
  }
  put<T = any, R = AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined): Promise<R> {
    return this.axiosInstance.put(url, data, config);
  }
  patch<T = any, R = AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined): Promise<R> {
    return this.axiosInstance.patch(url, data, config);
  }
  postForm<T = any, R = AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined): Promise<R> {
    return this.axiosInstance.postForm(url, data, config);
  }
  putForm<T = any, R = AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined): Promise<R> {
    return this.axiosInstance.putForm(url, data, config);
  }
  patchForm<T = any, R = AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined): Promise<R> {
    return this.axiosInstance.patchForm(url, data, config);
  }
  /**Recupero del access token del storage */
  abstract loadRefreshToken(): Promise<string | null> | string | null
  /**Recupero del access token del storage */
  abstract loadAccessToken(): Promise<string | null> | string | null
  /**Guardado de accesstoken en storage */
  abstract saveAccessToken(accessToken: string | null): Promise<void> | void
  /**Metodo para el refresco del accessToken*/
  abstract refreshAccessToken(refreshToken: string): Promise<string | null> | string | null
  /**Callback que se ejecuta cuando se agotan los intentes de refresco del token */
  protected onUnauthorized?(): void | Promise<void>

  protected handleRequestInterceptor = async (config: InternalAxiosRequestConfig<any>) => {
    return this.setAuthHeaderToConfig(config);
  };

  /**
   * Asigna cabecera a una configuración de request de axios `InternalAxiosRequestConfig`
   * @param config 
   * @returns 
   */
  protected setAuthHeaderToConfig = async (config: InternalAxiosRequestConfig<any>) => {
    const accessToken = await this.loadAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      } as AxiosRequestHeaders
    }
    return config
  }


  protected handleErrorInterceptor = async (error: any) => {
    const originalRequest = error.config;
    //Si el status no es de no authorizado (401) el handler no se ocupa del error
    if (error.response?.status !== 401) throw error;
    //get refreshToken
    const refreshToken = await this.loadRefreshToken()
    // Condiciones para el reintento
    const retryCondition =
      originalRequest &&
      !originalRequest._retry &&      //No se reintenta si viene de un reintento(Es decir si es un segundo reintento).
      refreshToken                    //Tiene que haber un refresh token para poder renovar el access token
    //Si no se cumplen con las condiciones de reintento se termina emitiendo un evento de no autorizado o tirando la excepción.
    if (!retryCondition) {
      if (this.onUnauthorized) return this.onUnauthorized()
      throw error
    }
    //Se refresca el accesToken
    const accessToken = await this.refreshAccessToken(refreshToken)
    //Se almacena nuevo accesToken
    await this.saveAccessToken(accessToken)
    //Se setea campo custom para identificar el reintento.
    originalRequest._retry = true;
    // Se setea la cabecera de authenticación con el nuevo accesToken guardado
    const newRequest = await this.setAuthHeaderToConfig(originalRequest)
    //Se reintenta la request
    return this.request(newRequest)
  }
}