'use client'
import React, { useState } from 'react';
import ImagePreview from '@/app/components/ImagePreview';
import ResponsePage from '@/app/components/ResponsePage';
import FileInput from '@/app/components/ui/ImageInput';
import Dropdown from '@/app/components/ui/RoleDropdown';
import ChatInput from '@/app/components/ui/SearchBox';
import { Arrow } from '@/app/components/ui/Svgs';
import { run } from '@/app/lib/actions/GetAIData';
import { GeminiImage } from '@/app/lib/actions/GetImageAiResponse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Chatpage() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [image, setImage] = useState<any>();

  const handleRoleSelection = (roleData: string) => {
    setRole(roleData);
  };

  const handleResponse = async () => {
    setLoading(true);
    console.log(`Send to Server : ${question}`);
    console.log(`Image for this: ${image}`);
    console.log(`Role for this: ${role}`);

    try {
      if (question === '' || question.trim() === '') {
        throw new Error('Input should not be empty');
      }
      if (selectedImage !== '') {
        const res = await GeminiImage(question, image, role);
        setResponse(res);
        setLoading(false);
      }
      const res = await run(question, role);
      setResponse(res);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleImageChange = async (event: any) => {
    const { id } = event.target;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      //@ts-ignore
      setSelectedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    const fileInputEl: any = document.querySelector(`#${id}`);
    const imageParts = await Promise.all([...fileInputEl.files].map(fileToGenerativePart));
    setImage(imageParts);
  };

  const removeImage = () => {
    setSelectedImage('');
    setImage('');
  };

  async function fileToGenerativePart(file: any) {
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
    <div className='flex flex-col w-full h-full p-auto'>
      <div className='px-8 md:px-16 lg:px-24 mb-24 pb-12 mt-4'>
        <ResponsePage response={response} />
      </div>
      <div className='flex flex-col p-4 fixed h-full w-full md:w-4/5 justify-end'>
        {selectedImage ? (
          <div className='w-full -mb-24 md:ml-40 flex justify-center'>
            <ImagePreview imageSrc={selectedImage} onclick={removeImage} />
          </div>
        ) : (
          ''
        )}
        <div className='flex flex-col justify-center items-center w-full'>
          <Dropdown options={['Teacher', 'Frontend dev', 'General', 'Doctor']} ondataChange={handleRoleSelection} />
          <div className='w-full flex flex-col items-center md:flex-row md:items-start'>
            <div className='w-full md:w-auto md:mr-2 mb-2 md:mb-0'>
              <FileInput onchange={handleImageChange} />
            </div>
            <div className='w-full md:w-auto text-center'>
              <ChatInput
                btnName={<Arrow />}
                onclick={handleResponse}
                className={`text-black ${loading ? 'hidden' : ''}`}
                inputValue={question}
                onchange={(e) => setQuestion(e.target.value)}
              />
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
