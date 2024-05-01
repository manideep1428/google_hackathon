import React, { ChangeEvent } from 'react';

interface InputProps {
  value: string | undefined;
  onChange: (e:ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  htmlFor?: string;
  labelName: string;
  className?: string;
  name:string;
  type:string;
}

const Input: React.FC<InputProps> = ({ value, placeholder, type, className, onChange ,htmlFor,labelName,name}) => {

  return (
   <div className='mt-4'>
     <label htmlFor={htmlFor} className="block text-gray-700 text-sm font-bold mb-2 ">
    {labelName}
  </label>
    <input
      type={type}
      value={value}
      required
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded w-[300px] h-10 px-3 text-black py-2${className}`}
    />
   </div>

  );
};

export default Input;
