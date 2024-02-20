import { HttpBase } from '@codice-arg/http-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from 'navigation/root-navigation';
import { Alert } from 'react-native';


class HttpService extends HttpBase{
  constructor() {
   super('http://192.168.1.2:8000',) }

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
      const resp = await this.post<{ accessToken: string; }>('auth/refresh', undefined, { headers: { 'refresh-token': refreshToken } })
      return resp.data.accessToken
    } catch (error) {
      console.error(error)
      return null
    }
  }

  protected onUnauthorized(): void | Promise<void> {
    Alert.alert("Se cerró sesión")
  }

}

export const httpService = new HttpService()