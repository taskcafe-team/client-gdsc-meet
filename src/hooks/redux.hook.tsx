
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store'
import { AnyAction, ThunkDispatch, combineReducers } from '@reduxjs/toolkit';
// Use throughout your app instead of plain `useDispatch` and `useSelector`
type AppState = ReturnType<typeof combineReducers>;
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector