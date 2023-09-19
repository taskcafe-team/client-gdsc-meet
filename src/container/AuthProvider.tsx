'use client';
import { UserService } from '@/api/http-rest/user';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { AUTH_RELOGIN, authDetail } from '@/redux/auth';
import { USER_DETAIL } from '@/redux/users';
import React from 'react'
const AuthProvider =({ children }: { children: React.ReactNode }) => {
  const isLogin = useAppSelector(authDetail);
  const dispatch = useAppDispatch();
  React.useEffect(()=>{
    const handleUser = async()=>{
       const user = await UserService.getUserDetail();
       if(user){
        if(!isLogin){
            dispatch(AUTH_RELOGIN())
        }
        dispatch(USER_DETAIL(user))
       }
    }
    handleUser();
  },[isLogin])
  return (
    <div>{children}</div>
  )
}



export default AuthProvider