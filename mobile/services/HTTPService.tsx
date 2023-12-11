/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios, {
	AxiosHeaderValue,
	AxiosHeaders,
	AxiosInstance,
	AxiosRequestHeaders,
	InternalAxiosRequestConfig,
} from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { eventEmitter } from '../app'
import { AsyncStorageKeys } from '../constants/async-storage'
import { EventNames } from '../constants/events'
import { API_URL } from '../utils/config'
import { AuthService } from './AuthService'
export type HttpCustomResponse<T = any> = {
	data: T
	hasError: boolean | null
	msg: string
	statusCode: number
}

interface HttpMethodInterface<T = any> {
	(url: string, param1?: object, param2?: object): Promise<HttpCustomResponse<T>>
}

interface HTTPServiceInterface {
	http: AxiosInstance
	get: HttpMethodInterface
	post: HttpMethodInterface
	put: HttpMethodInterface
	patch: HttpMethodInterface
	delete: HttpMethodInterface
}

function responseIsSuccessful({ status }: { status: number }) {
	let successful = false
	if (status >= 200 && status < 300) {
		successful = true
	}
	return successful
}

class HTTPService implements HTTPServiceInterface {
	static defaultHeader: null | AxiosHeaders = null
	http: AxiosInstance
	get: HttpMethodInterface
	post: HttpMethodInterface
	put: HttpMethodInterface
	patch: HttpMethodInterface
	delete: HttpMethodInterface
	constructor(baseRouteUrl: string) {
		this.http = axios.create()
		this.http.defaults.baseURL = API_URL + (baseRouteUrl || '')
		const defaultHeader = HTTPService.defaultHeader
		if (defaultHeader) this.setDefaultHeader(defaultHeader.header, defaultHeader.value)
		this.http.interceptors.request.use(this.handleRequestInterceptor)
		// this.http.interceptors.request.use((e)=>e);
		this.http.interceptors.response.use(null, this.handleErrorInterceptor)
		this.get = this.createRequestHandler('get')
		this.post = this.createRequestHandler('post')
		this.put = this.createRequestHandler('put')
		this.patch = this.createRequestHandler('patch')
		this.delete = this.createRequestHandler('delete')
	}

	createRequestHandler(verb: string) {
		return async (...args: any[]) => {
			let hasError = null
			let data = null
			let statusCode = null
			const msg = ''
			try {
				const response = await (this.http as any)[verb](...args)
				if (!responseIsSuccessful(response)) {
					hasError = true
				} else {
					data = response.data
				}
				statusCode = response.status
			} catch (err) {
				console.error(err)
				throw err
			}
			return { data, hasError, msg, statusCode }
		}
	}

	/**
	 * Setea cabecera por defecto, únicamente de la instancia
	 * @param {*} header
	 * @param {*} value
	 */
	setDefaultHeader(header: string, value: AxiosHeaderValue) {
		this.http.defaults.headers.common[header] = value
	}

	handleErrorInterceptor = async (error: any) => {
		const originalRequest = error.config
		//Si el status no es de no authorizado (401) el handler no se ocupa del error
		if (error.response?.status !== 401) throw error
		//get refreshToken
		const refreshToken = await AsyncStorage.getItem(AsyncStorageKeys.REFRESH_TOKEN)
		// Condiciones para el reintento
		const retryCondition =
			originalRequest &&
			!originalRequest._retry && //No se reintenta si viene de un reintento(Es decir si es un segundo reintento).
			originalRequest.url !== '/refresh' && //No se reintenta si viene de refresh
			refreshToken //Tiene que haber un refresh token para poder renovar el access token
		//Si no se cumplen con las condiciones de reintento se termina emitiendo un evento de no autorizado.
		if (!retryCondition) return eventEmitter.emit(EventNames.UNAUTHORIZED)
		//Se refresca el accesToken
		const res = await new AuthService().refresh(refreshToken)
		//Se almacena nuevo accesToken
		await AsyncStorage.setItem(AsyncStorageKeys.ACCESS_TOKEN, res.data.accessToken)
		//Se setea campo custom para identificar el reintento.
		originalRequest._retry = true
		// Se setea la cabecera de authenticación con el nuevo accesToken guardado
		const newRequest = await this.setAuthHeaderToConfig(originalRequest)
		//Se reintenta la request
		return this.http(newRequest)
	}

	handleRequestInterceptor = async (config: InternalAxiosRequestConfig<any>) => {
		return await this.setAuthHeaderToConfig(config)
	}

	/**
	 * Asigna cabecera de authenticación a una `requestConfig` de `axios`. Toma el accesToken del `asyncStorage`
	 * @param {*} config
	 * @returns
	 */
	setAuthHeaderToConfig = async (config: InternalAxiosRequestConfig<any>) => {
		const accessToken = await this.getAccessToken()
		if (accessToken) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${accessToken}`,
			} as AxiosRequestHeaders
		}
		return config
	}

	getAccessToken(): Promise<null | string> {
		return AsyncStorage.getItem(AsyncStorageKeys.ACCESS_TOKEN)
	}
}

export default HTTPService
