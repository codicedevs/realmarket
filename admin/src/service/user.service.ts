// import HttpService from "./http.service";
import { user } from "../types/user.type";
import { HttpService } from "./http.service";

export class UserService extends HttpService {
  constructor() {
    super("users")
  }

  async getAll() {
    return this.get(`/`)
  }

  async getUserById(id: string) {
    return this.get(`/${id}`)
  }

  async createUser(body: user) {
    return this.post(`/register`, body)
  }

  async editUser(id: string, body: user) {
    return this.put(`/edit/${id}`, body)
  }

  async ChangePassword({ currentPass, newPass }: { currentPass: string, newPass: string }) {
    return this.post(`/changePass`, {
      currentPass: currentPass,
      newPass: newPass
    })
  }
}

export default new UserService()