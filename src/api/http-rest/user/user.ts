import axiosClient from '../../../configs/axiosClient';
import { apiEndpoint } from './apiEndpoint';

export class UserService {
  static getUserDetail() {
    return axiosClient
      .get(apiEndpoint.getDetail)
      .then((response: any) => {     
        return response.code == 200 ? response.data : null;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
