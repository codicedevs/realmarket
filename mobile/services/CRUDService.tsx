/* eslint-disable  @typescript-eslint/no-explicit-any */
import { API_URL } from '../utils/config'
import HTTPService, { HttpCustomResponse } from './HTTPService'

class CRUDService<T> extends HTTPService {
	nombreRecurso = ''

	constructor(recurso = '') {
		super(API_URL)
		this.nombreRecurso = recurso
		this.http.defaults.baseURL = API_URL + '/' + this.nombreRecurso
	}

	async find(filter = {}): Promise<HttpCustomResponse<T[]>> {
		return await this.get('', {
			params: {
				filter,
			},
		})
	}
	async findById(id: number, filter = {}): Promise<HttpCustomResponse<T>> {
		return await this.get(`/${id}`, {
			params: {
				filter,
			},
		})
	}
	async create(data: any): Promise<HttpCustomResponse<T>> {
		return await this.post('', data)
	}
	async update(id: number, data: any): Promise<HttpCustomResponse<void>> {
		return await this.patch('/' + id, data)
	}
	async updateAll(data: any, where = {}): Promise<HttpCustomResponse<void>> {
		return await this.patch('/', data, { params: { where } })
	}
	async count(where = {}): Promise<HttpCustomResponse<{ count: number }>> {
		return await this.get(`/count`, {
			params: {
				where,
			},
		})
	}
	async removeById(id: number): Promise<HttpCustomResponse<void>> {
		return await this.delete('/' + id)
	}
}

export default CRUDService
