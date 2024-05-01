
interface ChatInputProps {
  className?:string
  onchange:(e:any)=>void
  inputValue: any
  onclick : (e:any)=>void
  btnName:Element | any
}


const ChatInput: React.FC<ChatInputProps> = ({className,onchange,inputValue,onclick,btnName}) => {
  return (
    <div className='flex flex-row items-center justify-between h-12 bg-slate-200  text-black rounded-lg'>
      <input
        type="text"
        value={inputValue}
        onChange={onchange}
        placeholder="Type your message..."
        className="flex-grow rounded-md py-2 bg-slate-200 px-4 mr-4 outline-none "
      />
      <button onClick={onclick} className={`flex items-center justify-center w-16 h-12 ${className}`}>
        {btnName}
      </button>
     </div> 
  );
};

export default ChatInput;
