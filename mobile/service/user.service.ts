// import HttpService from "./http.service";
import { HttpService } from "./http.service";

export class UserService extends HttpService {
  constructor() {
    super("users")
  }

  async ChangePassword({ currentPass, newPass }: { currentPass: string, newPass: string }) {
    return this.post(`/changePass`, {
      currentPass: currentPass,
      newPass: newPass
    })
  }

  async editUser({ id, body }: EditUserParams) {
    return this.put(`/edit/${id}`, body)
  }

  async recoverPassword(userInfo) {
    return this.post(`/recover-password`, userInfo)
  }

  async resetPassword(userInfo) {
    return this.post(`reset-password`, userInfo)
  }
}

export default new UserService()