import { HttpBase } from "@codice-arg/http-service/dist";
import axios from "axios";
import { BASE_URL } from "../utils/config";

export class HttpService extends HttpBase {

    constructor(recurso = "") {
        super(`${BASE_URL}/${recurso}`)
    }

    getAccessToken(): string | null {
        return localStorage.getItem('access');
    }

    protected getRefreshToken(): string | null {

        return localStorage.getItem('refresh');
    }

    saveRefreshToken(refreshToken: string | null): void | Promise<void> {
        return localStorage.setItem('refresh', refreshToken ?? '');
    }


    saveAccessToken(accessToken: string | null): void | Promise<void> {
        return localStorage.setItem('access', accessToken ?? '');
    }

    async refreshAccessToken(): Promise<string | null> {
        try {
            const refreshToken = await this.getRefreshToken()
            const resp = await axios.post<{ accessToken: string }>(`${BASE_URL}/auth/refresh`, undefined, { headers: { "refresh-token": refreshToken } })
            return resp.data.accessToken
        }
        catch (err) {
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