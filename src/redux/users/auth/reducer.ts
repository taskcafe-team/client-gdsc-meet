import { IUser } from "@/model/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface IInitUser {
    loading: boolean,
    info:IUser | null,
    accessToken?:string|null,
    refreshToken?:string|null,
    isLogin:boolean,
}

export const initialState: IInitUser = {
    loading: false,
    info: null,
    isLogin: false,
    refreshToken:null,
    accessToken:null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        SIGN__IN:(state,action:PayloadAction<IUser>  )=>{
            state.info = action.payload;
            state.isLogin = true;
        },
        SIGN_OUT:(state,action)=>{
            const newInitialState: IInitUser = {
                loading: false,
                info: null,
                isLogin: false,
                refreshToken:null,
                accessToken:null,
            }
            state =  newInitialState;
        },
    }
});