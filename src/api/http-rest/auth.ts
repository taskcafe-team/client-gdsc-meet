import { apiEndpoint } from '@/configs/apiEndpoint';
import axiosClient from '../../configs/axiosClient';
import TokenService from '../http-rest/token';

export class AuthService {
  static login({ username, password }: { username: string; password: string }) {
    return axiosClient
      .post(apiEndpoint.loginWithEmail, {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.accessToken) {
        }
        return response.data;
      });
  }

  static logout() {
    TokenService.removeUser();
  }

  static register({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    return axiosClient.post('/auth/signup', {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
