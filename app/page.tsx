import React from 'react';
import MainPage from './components/Main';
import ImagePage from './components/Image';

const Page = () => {
  return (
    <div className='flex flex-row w-full h-full'>
      <div className='h-full w-1/2'>
        <MainPage />
      </div>
      <div className='hidden sm:w-1/2 h-full flex justify-center items-center'>
       <ImagePage/>
      </div>
    </div>
  );
};

export default Page;
