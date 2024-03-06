import { HttpBase } from "@codice-arg/http-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { BASE_URL } from "../config";

export class HttpService extends HttpBase {
    constructor(recurso = "") {
        super(`${BASE_URL}/${recurso}`)
    }

    loadRefreshToken(): string | Promise<string | null> | null {
        return AsyncStorage.getItem('refresh');
    }

    saveRefreshToken(refreshToken: string | null): void | Promise<void> {
        return AsyncStorage.setItem('refresh', refreshToken ?? '');
    }

    loadAccessToken(): string | Promise<string | null> | null {
        return AsyncStorage.getItem('access');
    }

    saveAccessToken(accessToken: string | null): void | Promise<void> {
        return AsyncStorage.setItem('access', accessToken ?? '');
    }

    async refreshAccessToken(refreshToken: string): Promise<string | null> {
        try {
            const resp = await this.post<{ accessToken: string }>(`${BASE_URL}/auth/refresh`, undefined, { headers: { "refresh-token": refreshToken } })
            return resp.data.accessToken
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    protected onUnauthorized(): void | Promise<void> {
        Alert.alert("Se cerro sesion")
    }

}