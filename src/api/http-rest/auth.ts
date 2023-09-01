import axiosClient from '../../configs/axiosClient';
import TokenService from '../http-rest/token';

class AuthService {
  login({ username, password }: { username: string; password: string }) {
    return axiosClient
      .post('/auth/signin', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, email, password }: { username: string; email: string; password: string }) {
    return axiosClient.post('/auth/signup', {
      username,
      email,
      password,
    });
  }

  
}

export default new AuthService();
