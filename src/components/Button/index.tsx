import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
  title?: string;
  loading?: boolean;
  className?: string;
}

const Button: React.FC<IButton> = ({ children, className, loading = false, ...rest }) => {
  return (
    <button
      className={`flex items-center justify-center rounded-lg gap-2
       
        hover:opacity-90
        px-6 py-4 font-bold text-xm cursor-pointer
        relative
        ${className ? className : ''}`}
      {...rest} // Spread các props còn lại vào thẻ button
    >
      {children}
      <div className="absolute right-0">
        {loading ? (
          <svg
            className=" animate-spin h-5 w-5 mr-3 bg-white text-transparent rounded-md"
            viewBox="0 0 24 24"
          ></svg>
        ) : null}
      </div>
    </button>
  );
};

Button.propTypes = {};

export default Button;
