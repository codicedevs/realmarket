// import HttpService from "./http.service";
import { HttpService } from "./http.service";

export class UserService extends HttpService {
  constructor() {
    super("users")
  }

  async ChangePassword({ currentPass, newPass }: { currentPass: string, newPass: string }) {
    console.log(currentPass)
    console.log(newPass)
    return this.post(`/changePass`, {
      currentPass: currentPass,
      newPass: newPass
    })
  }
}

export default new UserService()