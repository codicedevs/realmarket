import { HttpBase } from "@codice-arg/http-service/dist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config";

export class HttpService extends HttpBase {

    constructor(recurso = "") {
        super(`${BASE_URL}/${recurso}`)
    }
    
    getAccessToken(): string | Promise<string> {
        return AsyncStorage.getItem('access');
    }

    protected getRefreshToken(): string | Promise<string> {
        
        return AsyncStorage.getItem('refresh');
    }

    saveRefreshToken(refreshToken: string | null): void | Promise<void> {
        return AsyncStorage.setItem('refresh', refreshToken ?? '');
    }
    

    saveAccessToken(accessToken: string | null): void | Promise<void> {
        return AsyncStorage.setItem('access', accessToken ?? '');
    }

    async refreshAccessToken(): Promise<string | null> {
        try{
            const refreshToken = await this.getRefreshToken()
            const resp = await axios.post<{ accessToken: string }>(`${BASE_URL}/auth/refresh`, undefined, { headers: { "refresh-token": refreshToken } })
            return resp.data.accessToken
        }
        catch(err) {
            console.error(err)
            return null
        }
    }

    // protected onUnauthorized(err: any): void | Promise<void> {

    //     if(err.response.data.url === 'auth/login') Alert.alert(err.response.data.message)
    //     // this.refreshAccessToken()
    //     Alert.alert("Se cerro sesion")
    // }

    //REVISAR ERROR DE 401

}