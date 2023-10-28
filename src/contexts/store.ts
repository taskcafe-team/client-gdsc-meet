import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { noitificationReducer } from "./notification";

export const rootReducer = combineReducers({
  auth: authReducer,
  noitificatioin: noitificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
