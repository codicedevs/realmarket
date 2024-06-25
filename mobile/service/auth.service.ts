import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config";
import { HttpService } from "./http.service";

interface LoginProps {
    token: string,
    refreshToken: string,
    user: IUser
}

export class AuthService extends HttpService {
    constructor() {
        super("auth")
    }

    async login(username: string, password: string) {
        let loginProps: LoginProps | null = null
        try {
            const res = await axios.post<LoginProps>(`${BASE_URL}/auth/login`, { username: username, pass: password })
            this.saveAccessToken(res.data.token)
            this.saveRefreshToken(res.data.refreshToken)
            loginProps = res.data
        }
        catch (err) {
            // if (err.response.status === 401) Alert.alert("CREDENCIALES INVALIDAS")
            // else Alert.alert("HA OCURRIDO UN ERROR", err.message + " - " + err.config.url)
            console.error(err)
        } finally {
            return loginProps
        }
    }

    async signOut() {
        AsyncStorage.removeItem('access')
        AsyncStorage.removeItem('refresh')
    }

    async whoami() {
        return this.get("whoami")
    }
}

export default new AuthService()