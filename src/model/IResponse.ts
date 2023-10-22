import { IRoom } from './IRoom';
import { IUser } from './IUser';

export interface IResponse {
  code: number;
  data: any;
  message:string,
  timestamp:number;
}
