export interface IUser {
  uid: string | null;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
  roomMeeting?: string | null;
  roomName?: string | null;
  email?: string | null;
  id?: string | null;
  isValid?: boolean;
  role?: string | null;
  avatar?: string | null;
}
