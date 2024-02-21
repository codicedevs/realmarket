import { HttpBase } from "./http-base";

class Http extends HttpBase {
  constructor() {
    super('http://localhost:8000')
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }
  saveRefreshToken(refreshToken: string | null): void {
    return localStorage.setItem('refresh', refreshToken ?? '');
  }
  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }
  saveAccessToken(accessToken: string | null): void {
    return localStorage.setItem('access', accessToken ?? '');
  }
  //Comment
  async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken()
      if (!refreshToken) throw new Error("Cannot get refresh token");
      const resp = await this.post<{ accessToken: string; }>('auth/refresh', undefined, { headers: { 'refresh-token': refreshToken } })
      return resp.data.accessToken
    } catch (error) {
      console.error(error)
      return null
    }
  }

  protected onUnauthorized(): void | Promise<void> {
    alert("Se cerró sesión")
  }

}

export const httpService = new Http()