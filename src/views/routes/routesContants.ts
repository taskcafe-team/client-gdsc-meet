// const { match } = require("path-to-regexp");

export const BASE_URL = "/";
export const PAGE_NOT_FOUND_URL = "/404";
export const SERVER_ERROR_URL = "/500";

export const AUTH_URL = "/auth";
export const USERS_URL = "/users";
export const FORGOT_PASSWORD_URL = `${AUTH_URL}/forgotPassword`;
export const RESET_PASSWORD_URL = `${AUTH_URL}/resetPassword`;
export const SIGN_UP_URL = `${AUTH_URL}/signup`;
export const AUTH_LOGIN_URL = `${AUTH_URL}/login`;
export const SIGNUP_SUCCESS_URL = `${AUTH_URL}/signup-success`;
