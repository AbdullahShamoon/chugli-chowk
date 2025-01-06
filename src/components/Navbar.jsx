import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className='flex justify-center text-center p-3 bg-[#94949433] text-white text-3xl font-bold m-3 rounded-full shadow-lg relative gap-2'>
            <img src="public/images/chat.png" alt="" className='absolute top-4 left-4 w-9'/>
        <span>Chugli Chowk </span> <span><img src="/images/speak.png" alt="" width={31} /></span>
        </nav>
    </>
  )
}

export default Navbar