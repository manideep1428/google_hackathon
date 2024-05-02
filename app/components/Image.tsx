import React from 'react'
import Image from 'next/legacy/image'

const ImagePage = () => {
  return (
    <div className='hidden sm:max-w-full h-full relative'>
    <Image src={"/gemini.jpg"} layout="fill" objectFit="cover" alt='Image' />
  </div>
  )
}

export default ImagePage;