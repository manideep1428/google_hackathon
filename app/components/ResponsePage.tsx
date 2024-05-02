'use client'
import { useState } from "react";
import Markdown from 'markdown-to-jsx';


interface Props {
  response: string;
}

const ResponsePage: React.FC<Props> = ({ response }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className='bg-black text-white border-slate-500 border-2'>
      <div className='flex max-w-6/7 flex-col'>
        <div className="flex justify-between m-2">
          <h1 className='text-center font-bold font-serif text-xl md:text-2xl lg:text-3xl'>Gemini</h1>
        </div>
        <p className='text-sm m-4 md:text-lg lg:text-xl'>
        <Markdown>{response}</Markdown>
        </p>
      </div>
    </div>
  );
};

export default ResponsePage;
