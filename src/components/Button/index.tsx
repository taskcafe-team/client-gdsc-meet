import React, { ReactNode } from 'react';

interface IButton {
  onClick: any;
  children?: ReactNode;
  icon?: ReactNode;
  title?: string;
  className?: string;
  disabled?: boolean;
  type?: string;
}

const Button: React.FC<IButton> = ({ onClick, type, children, className, disabled }) => {
  return (
    <button
      className={`flex items-center justify-center rounded-lg gap-2
       
        hover:opacity-90
        px-6 py-4 font-bold text-xm cursor-pointer
        ${className ? className : ''}`}
      onClick={onClick}
      disabled={disabled}
   
    >
      {children}
    </button>
  );
};

Button.propTypes = {};

export default Button;
