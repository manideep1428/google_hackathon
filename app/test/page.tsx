'use client'
import Dropdown from '@/app/components/ui/RoleDropdown';
import ChatInput from '@/app/components/ui/SearchBox'
import { Arrow } from '@/app/components/ui/Svgs';
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileInput from '../components/ui/ImageInput';
import Image from 'next/image';
import { GeminiImage } from '../lib/actions/GetImageAiResponse';
import ImagePreview from '../components/ImagePreview';
import { run } from '../lib/actions/GetAIData';


export default function Chatpage ()  {
    const [question,setQuestion]  = useState<String>("")
    const [response,setRespose]= useState("");
    const [loading, setLoading] = useState<Boolean>(false);
    const [role,setRole] = useState('');
    const [selectedImage ,setSelectedImage] = useState("")
    const [image,setImage]= useState<any>()
      
     
    const handleRoleSelection = (roleData:string)=>{
      setRole(roleData)
    }
    const handleResponse =  async () =>{
      setLoading(true)
      console.log(`Send to Server : ${question}`)
      console.log(`Image for this: ${image}`)
      // setQuestion("")
     try{
      if(question === ""  || question.trim() === "" ){
      throw new Error("Input should not be empty")
     }
    if(image === ""){
      const res = await run(question, role)
      setRespose(res)
      setLoading(false)
    }
    const res = await GeminiImage(question , image)
    setRespose(res)
    setLoading(false)
    }
    catch(error:any){
      toast.error(error.message)
      console.log(error.message)
      setLoading(false)
     } 
    }
    
    //image selection and image render to modek
    const handleImageChange = async (event:any) => {
      const {id} = event.target
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
          //@ts-ignore
        setSelectedImage(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
        }   
      const fileInputEl:any = document.querySelector(`#${id}`);
      const imageParts = await Promise.all(
      [...fileInputEl.files].map(fileToGenerativePart)
  );    
     setImage(imageParts)
}; 

   // imahge 
   const removeImage = ()=>{
      setSelectedImage("");
      setImage("")
   }

   async function fileToGenerativePart(file:any) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      //@ts-ignore
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };

  }
  return (
    <div className='flex flex-col w-full h-screen'>
       <div className='w-5/7 flex flex-col justify-center items-start m-auto'>
       <ReactMarkdown>{response}</ReactMarkdown>
       </div>
      <div className='flex flex-col fixed h-full w-6/7 justify-end'>
        {selectedImage ? 
             ( 
              <div className='w-100 h-100'>
              <ImagePreview imageSrc={selectedImage} onclick={removeImage}/> 
              </div>  
            )   
        :""}
          <div className='flex flex-col justify-center items-center'>
              <Dropdown 
              options={["Teacher" , "Frontend dev" , "General" , "Doctor"]} 
              ondataChange={handleRoleSelection} 
              />
            <div className='flex m-3'>
             <div className='flex items-center justify-evenly mr-2 w-12 h-12 bg-white text-black rounded-lg'>
              <FileInput 
                onchange={handleImageChange}
              />
             </div>
             <div className="w-full text-center">
              <ChatInput btnName={<Arrow/>}
                onclick={handleResponse} className={`text-black ${loading ? "hidden" : "" }`} 
                inputValue={question}
                onchange={(e)=>setQuestion(e.target.value)}
              />  
             </div> 
            </div> 
            </div>
          </div>   
     </div>
  )
}
