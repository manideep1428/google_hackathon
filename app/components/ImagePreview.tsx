import Image from "next/image";
import { Remove } from "./ui/Svgs";

interface Improps{
    onclick: ()=>void
    imageSrc : string
}

export default function ImagePreview({imageSrc, onclick}:Improps){
    return(
        <div className="flex justify-center mt-5">
          <div className="relative h-48">
             <Image src={imageSrc}
              width={100} height={100}
              alt="image"
              className="blur-xs"
              />
          </div>
           <div className="flex absolute ml-[100px]">
           <button onClick={onclick} 
                className="absolute text-white bg-black hover:bg-opacity-75 focus:outline-none hover:bg-slate-600"
               >
                <Remove/>
              </button>
           </div>   
        </div>
    )
}

