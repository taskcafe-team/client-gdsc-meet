import { Action, AnyAction, configureStore, Dispatch} from "@reduxjs/toolkit";
import { rootReducer } from "./app";
import thunk, { ThunkActionDispatch, ThunkDispatch } from 'redux-thunk';


// this is roots store 
export const Store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk],  
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
> = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R