import React from 'react';
import '@/scss/components/Loading.scss'
export const DefaultLoading:React.FC = () => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-black w-full h-[100vh] flex items-center justify-center'>
      <div className="music-waves-2">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
