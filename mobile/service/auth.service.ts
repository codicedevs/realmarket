// import HttpService from "./http.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStorageState } from "../hooks/useStorageState";
import { HttpService } from "./http.service";

interface loginProps {
    token: string,
    refreshToken: string,
    user: any
}

export class AuthService extends HttpService {
    constructor() {
        super("auth")
    }

    async login(username: string, password: string) {
        try{
            const res = await this.post<loginProps>(`/login`, { username: username, pass: password })
            this.saveAccessToken(res.data.token)
            // setSession('hola')
            return res.data
        }
        catch(err){
            console.error(err)
        }
    }

    async signOut() {
        return AsyncStorage.removeItem('access')
    }
}

export default new AuthService()