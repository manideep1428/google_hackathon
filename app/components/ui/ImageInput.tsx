import React, { useState } from 'react';
import { FileSvg } from './Svgs';



const FileInput= ({onchange}:{onchange:(e:React.ChangeEvent<HTMLInputElement>)=>void , }) => {
  return (
    <label className="custom-file-input text-center hover:cursor-pointer">
      <FileSvg/>
      <input type="file" id='photoselector'
       onChange={onchange} accept="image/*" 
       className="flex justify-center items-center h-12 w-12"
       style={{ display: 'none' }} />
    </label>
  );
};

export default FileInput;
