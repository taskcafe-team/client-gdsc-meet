import axiosClient from '../../../configs/axiosClient';
import { apiEndpoint } from './apiEndpoint';

export class AuthService {
  static EmailLogin({ username, password }: { username: string; password: string }) {
    return axiosClient
      .post(apiEndpoint.loginWithEmail, {
        email: username,
        password:password,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static register({ email, password }: { email: string; password: string }) {
    return axiosClient
      .post(apiEndpoint.register, {
        email,
        password,
      })
      .then((response: any) => {
        return response.code == 200 ? response.data : null;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static confirmEmail({ token }: { token: string }) {
    return axiosClient
      .get(`${apiEndpoint.confirmEmail}?token=${token}`)
      .then((response: any) => {
        return response.code == 200 ? response.data : null;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static resendVerication({ email }: { email: string }) {
    return axiosClient
      .post(`${apiEndpoint.resendVerification}?email=${email}`)
      .then((response: any) => {
        return response.code == 200 ? response.data : null;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static forgotPassword({ email }: { email: string }) {
    return axiosClient
      .get(`${apiEndpoint.forgotPassword}`,{
        params: { email: email },
      })
      .then((response: any) => {
        return response.code == 200 ? response.data : null;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static resetPassword({ token }: { token: string }) {
    return axiosClient
      .post(apiEndpoint.resetPassword, {
        token,
      })
      .then((response: any) => {
        return response.code == 200 ? response.data : null;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static reAccessToken({ token }: { token: string }) {
    return axiosClient
      .get(`${apiEndpoint.reAccessToken}?refreshToken=${token}`)
      .then((response: any) => {
        return response.code == 200 ? response.data : null;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
