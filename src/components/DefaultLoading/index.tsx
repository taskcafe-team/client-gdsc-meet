import React from 'react';
import '@/scss/components/Loading.scss'
export const DefaultLoading:React.FC = () => {
  return (
    <div className="music-waves-2 max-w-[200px] max-h-[100px]">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
  );
};
