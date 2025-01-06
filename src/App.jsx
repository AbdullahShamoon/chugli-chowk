import React, { useRef, useState } from 'react'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'
import Chat from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Background from './components/Background';

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(null)

  const roomRef = useRef(null)

  const signOutUser = async () => {
    await signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }

  if (!isAuth) {
    return (
      <div>
        <Background />
        <Auth setIsAuth={setIsAuth} />
      </div>
    )
  }

  return (
    <>
      <Background />

      <div className="wrapper flex flex-col justify-center items-center mx-auto text-blue-900 py-5 mt-7 rounded-xl text-lg w-2/5 bg-[#ffffffe3] ">

        {room ? <Chat room={room} setRoom={setRoom} /> : <div className='flex flex-col gap-2 justify-center items-center pb-6'>
          <label htmlFor="" className='font-bold text-3xl'>Enter Room Name : </label>
          <div>
            <input placeholder='Room Name' type="text" ref={roomRef} className='rounded-full bg-[#5f5f5f33] border border-gray-400 px-3 py-1 mr-2' />
            <button onClick={() => setRoom(roomRef.current.value)} className="relative inline-flex items-center px-7 py-1 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
              <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span className="absolute -right-1 flex items-center justify-start w-7 h-7 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span className="relative">Join Chat</span>
            </button>
          </div>
        </div>
        }

        <div className='absolute bottom-7 right-7'>
          <button onClick={signOutUser} className="relative mt-2 px-3 py-1 overflow-hidden font-medium text-white bg-red-600 border border-gray-100 rounded-lg shadow-inner group">
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">SignOut</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default App