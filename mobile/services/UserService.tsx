import { User } from '../types/models/user.model'
import CRUDService from './CRUDService'

class UserService extends CRUDService<User> {
	constructor() {
		super('users')
	}
}

export default new UserService()
