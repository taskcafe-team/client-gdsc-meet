import { RootState } from "@/redux/store";

export const selectorUSer = (state:RootState)=> state.auth.info;

export const selectorAccessToken = (state:RootState)=> state.auth.accessToken;
export const selectorRefreshTokent = (state:RootState)=> state.auth.refreshToken;
export const selectorIsLogin = (state:RootState)=> state.auth.isLogin;
export const selectorLoading = (state:RootState)=> state.auth.loading;

