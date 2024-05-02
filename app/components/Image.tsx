import React from 'react'
import Image from 'next/image'

const ImagePage = () => {
  return (
    <div className='max-w-full h-full relative'>
    <Image src={"https://ibb.co/YQ6BDVd"} layout="fill" objectFit="cover" alt='Image' />
  </div>
  )
}

export default ImagePage;