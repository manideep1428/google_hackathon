'use client'
import React, { useState } from 'react';
import { Arrow, ArrowUp } from './Svgs';

interface Props {
    options : string[]
    ondataChange : (data:string)=>void
}

const Dropdown: React.FC <Props> = ({ options , ondataChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data,setData] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option:any) => {
    setSelectedOption(option);
    ondataChange(option);
    setIsOpen(false);
    setData(option)
  };

  return (
    <div className="relative">
      <button className="bg-blue-500 hover:bg-blue-600 flex  text-white font-bold py-2 px-4 rounded" onClick={toggleDropdown}>
        {selectedOption || `Select AI Role`} <ArrowUp/>
      </button>
      {isOpen && (
        <div className="absolute bottom-full left-0 bg-white text-black shadow-md rounded-lg mt-1">
          <ul>
            {options.map((option) => (
              <li key={option} className="cursor-pointer hover:bg-gray-100" onClick={() => handleOptionClick(option)}>
                <p className="py-2 px-4">{option}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
