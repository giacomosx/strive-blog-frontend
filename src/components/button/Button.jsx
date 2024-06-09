import React from 'react'

const Button = ({titleBtn, onClick, onSubmit, type, addingClass, disabled}) => {
  return (
    <button type={type} className={`disabled:cursor-not-allowed disabled:opacity-50 font-mono grow-0 p-2 text-sm bg-[#02FF84] text-zinc-800 shadow-retro hover:rotate-2 transition-all md:w-fit ${addingClass}`} onClick={onClick} onSubmit={onSubmit} disabled={disabled}>{titleBtn}</button>
  )
}

export default Button