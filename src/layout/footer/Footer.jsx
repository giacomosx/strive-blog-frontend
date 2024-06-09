import React from 'react'

const Footer = () => {
    const date = new Date();

  return (
    <footer className='mt-8 flex items-center justify-center font-mono py-4 border-t border-gray-200 md:container md:mx-auto'>
        <p className='text-zinc-700 text-sm'>&copy; {date.getFullYear()} - <a href={"https://github.com/giacomosx"}>🥷 @giacomosx</a></p>
    </footer>
  )
}

export default Footer