import React, { useState } from 'react';
import { FileSvg } from './Svgs';



const FileInput= ({onchange}:{onchange:(e:React.ChangeEvent<HTMLInputElement>)=>void , }) => {
  return (
    <label className="custom-file-input ml-[12px] mt-4 text-center h-12 w-12 hover:cursor-pointer">
      <FileSvg/>
      <input type="file" id='photoselector'
       onChange={onchange} accept="image/*" 
       className="flex justify-center items-center"
       style={{ display: 'none' }} />
    </label>
  );
};

export default FileInput;
