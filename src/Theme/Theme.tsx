'use client';
import React, { ReactNode } from 'react'
  
import { ThemeProvider } from 'next-themes';

interface IThemeProvider{
    children:ReactNode
}

const Theme:React.FC<IThemeProvider> = ({children}) => {
  return (
    <ThemeProvider attribute='class'>{children}</ThemeProvider>
  )
}



export default Theme