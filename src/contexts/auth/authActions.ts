import { CommonError } from "../types";
import { IAuth } from "./authTypes";
import {
  AUTH_DETAIL_FETCH,
  AUTH_DETAIL_DATA,
  AUTH_DETAIL_ERROR,
  AUTH_LOGOUT,
} from "./authConstants";
import { createAction } from "@reduxjs/toolkit";

// interface of action
export interface AuthDetailFetch {
  type: typeof AUTH_DETAIL_FETCH;
}

export interface AuthDetailData {
  type: typeof AUTH_DETAIL_DATA;
  payload: IAuth;
}

export interface AuthDetailError {
  type: typeof AUTH_DETAIL_ERROR;
  payload: CommonError;
}

export interface AuthLogout {
  type: typeof AUTH_LOGOUT;
}

// action
export type AuthDetailActions =
  | AuthDetailFetch
  | AuthDetailData
  | AuthDetailError
  | AuthLogout;

export const authDetailFetch = createAction(AUTH_DETAIL_FETCH);
export const authDetailData =
  createAction<AuthDetailData["payload"]>(AUTH_DETAIL_DATA);
export const authDetailError =
  createAction<AuthDetailError["payload"]>(AUTH_DETAIL_ERROR);
export const authLogout = createAction(AUTH_LOGOUT);
