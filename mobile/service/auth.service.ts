import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
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

    async login(username: string, password: string){
        let loginProps : LoginProps | null = null
        try{
            const res = await axios.post<LoginProps>(`${BASE_URL}/auth/login`, { username: username, pass: password })
            console.log(res, "Respuesta Login")
            this.saveAccessToken(res.data.token)
            loginProps = res.data
        }
        catch(err){
            if(err.response.status===401) Alert.alert("CREDENCIALES INVALIDAS")
            else Alert.alert("HA OCURRIDO UN ERROR",err.message+" - "+err.config.url)
            console.error(err)           
        } finally {
            return loginProps
        }
    }

    async signOut() {
        return AsyncStorage.removeItem('access')
    }
}

export default new AuthService()