import React from "react";

interface ChatInputProps {
  className?: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  btnName: React.ReactNode;
}

const ChatInput: React.FC<ChatInputProps> = ({
  className,
  onchange,
  inputValue,
  onclick,
  btnName,
}) => {
  return (
    <div className='flex flex-row items-center justify-between h-12 bg-slate-200 text-black rounded-lg w-full'>
      <input
        type="text"
        value={inputValue}
        onChange={onchange}
        placeholder="Type your message..."
        className="flex-grow rounded-md py-2 bg-slate-200 px-4 mr-4 outline-none text-sm md:text-base lg:text-lg w-full"
      />
      <button
        onClick={onclick}
        className={`flex items-center justify-center w-16 h-12 ${className} text-sm md:text-base lg:text-lg`}
      >
        {btnName}
      </button>
    </div>
  );
};

export default ChatInput;
