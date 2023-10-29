import { AxiosPromise } from "axios";

import Api from "../api";
import { LoginUserRequest } from "./userApi";

export class AuthApi extends Api {
  private static authUrl = "auth";
  private static emailLoginlUrl = `${this.authUrl}/email/login`;

  static async loginWithEmail(
    request: LoginUserRequest,
  ): Promise<AxiosPromise<any>> {
    return this.post(this.emailLoginlUrl, request);
  }
}

export default AuthApi;
