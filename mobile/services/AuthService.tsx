import { eventEmitter } from '../app/index'
import { AsyncStorageKeys } from '../constants/async-storage'
import { EventNames } from '../constants/events'
import { User } from '../types/models/user.model'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HTTPService from './HTTPService'

export class AuthService extends HTTPService {
	currentUser: User | null = null
	constructor() {
		super('authentication')
	}

	async login(email: string, password: string) {
		try {
			const params = { email: email.replace(/\s/g, ''), password: password.replace(/\s/g, '') }
			const session = await this.http.post('/refresh-login', params)
			await AsyncStorage.setItem(AsyncStorageKeys.ACCESS_TOKEN, session.data.accessToken)
			await AsyncStorage.setItem(AsyncStorageKeys.REFRESH_TOKEN, session.data.refreshToken)
			const user = await this.http.get('/whoAmI')
			AsyncStorage.setItem(
				AsyncStorageKeys.CURRENT_USER,
				JSON.stringify({ ...user.data, password: params.password }),
			)
			return user.data
		} catch (err) {
			console.error(err)
		}
	}

	async refresh(refreshToken: string) {
		return await this.post('/refresh', { refreshToken })
	}

	logout() {
		AsyncStorage.removeItem(AsyncStorageKeys.CURRENT_USER)
		AsyncStorage.removeItem(AsyncStorageKeys.ACCESS_TOKEN)
		AsyncStorage.removeItem(AsyncStorageKeys.REFRESH_TOKEN)
		eventEmitter.emit(EventNames.LOGOUT)
	}

	async getStoredUser() {
		const res = await AsyncStorage.getItem(AsyncStorageKeys.CURRENT_USER)
		if (typeof res === 'string') return JSON.parse(res) as User
		return null
	}

	async getCurrentUser() {
		if (!this.currentUser) {
			this.currentUser = await this.getStoredUser()
		}

		return this.currentUser
	}
}

export default new AuthService()
