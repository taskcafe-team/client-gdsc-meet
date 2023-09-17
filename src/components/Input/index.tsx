import React, { ReactNode } from 'react';
import { BiDialpad } from 'react-icons/bi';
interface IInput {
  id?: string;
  value: any;
  onChange?: any;
  icon?: ReactNode;
  type?: string;
  placeholder?: string;
  className?: string;
}
export const Input: React.FC<IInput> = ({className, placeholder, id, value, onChange, icon, type }) => {
  return (
    <div className={`Connect__Group flex items-center max-sm:w-full ${className}`}>
      {icon && <div className="mx-8">{icon}</div>}

      <input
        id={id}
        value={value}
        onChange={onChange}
        type={type ? type : 'text'}
        placeholder={placeholder}
        className="block outline-none px-4 py-4 w-full rounded-md max-sm:w-full"
      />
    </div>
  );
};
