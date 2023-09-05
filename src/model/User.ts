export interface IUser{
    user_id?: string;
    full_name?: string;
    ava_url?: string;
}

export interface IMeet {
    id: string;
    room_name?: string;
    user_id?: string;
    friendly_id?: string;
    created_at?: string;
    updated_at?: string;
  }