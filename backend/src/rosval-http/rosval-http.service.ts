import { HttpBase } from '@codice-arg/http-service/dist/index';
import { Injectable } from '@nestjs/common';
import { rosvalSettings } from 'src/settings';

@Injectable()
export class RosvalHttpService extends HttpBase {
  constructor() {
    super(rosvalSettings.ROSVAL_BASE_URL);
  }
  getAccessToken(): string | null {
    return rosvalSettings.ROSVAL_ACCESS_TOKEN || null;
  }
  saveAccessToken(accessToken: string): void | Promise<void> {
    rosvalSettings.ROSVAL_ACCESS_TOKEN = accessToken;
  }
  async refreshAccessToken(): Promise<string> {
    const response = await this.post(`login`, {
      clientId: rosvalSettings.ROSVAL_USER_ID,
      username: rosvalSettings.ROSVAL_USER_NAME,
      password: rosvalSettings.ROSVAL_USER_PASS,
    });

    return response.data.token;
  }
}
