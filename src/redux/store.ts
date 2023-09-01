import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./app";


// this is roots store 
export const Store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
