import axiosClient from '../../../configs/axiosClient';
import { apiEndpoint } from './apiEndpoint';

export class RoomService {
  static createRoom = () => {
    return axiosClient.get(apiEndpoint.createRoom);
  };

  static getUserDetail(friendlyId: string) {
    return axiosClient.get(apiEndpoint.detailRoom({ friendlyId }));
  }

  static getRoomAccessToken(friendlyId: string) {
    return axiosClient.get(apiEndpoint.getRoom({ friendlyId }));
  }
}
