import React from 'react'
import {useNavigate} from "react-router-dom";

export const Logo = ({src, alt, brandName}) => {
    const navigate = useNavigate();
  return (
    <button onClick={() => navigate('/')} className='flex items-center space-x-2 h-12 max-w-[50%] md:max-w-[30%]'>
        <img src={src} alt={alt} className='h-full object-contain' />
        <h1 className={'hidden'}>{brandName}</h1>
    </button>
  )
}
