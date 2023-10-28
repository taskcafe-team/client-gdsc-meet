import type { AxiosPromise } from "axios";
import Api from "../api";

export interface LoginUserRequest {
  email: string;
  password: string;
}

export class AuthApi extends Api {
  private static authUrl = "auth";
  private static emailLoginlUrl = `${AuthApi.authUrl}/email/login`;

  static async loginWithEmail(
    request: LoginUserRequest,
  ): Promise<AxiosPromise<any>> {
    return this.post(this.emailLoginlUrl, request);
  }
}

export default AuthApi;
