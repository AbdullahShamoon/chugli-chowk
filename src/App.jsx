import React, { useRef , useState } from 'react'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'
import Chat from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(null)

  const roomRef = useRef(null)

  const signOutUser = async() => {
    await signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    )
  }

  return (
    <>
      {room ? <Chat room={room} /> : <div>
        <label htmlFor="">Enter Room Name : </label>
        <input type="text" ref={roomRef} />
        <button onClick={() => setRoom(roomRef.current.value)}>Join Chat</button>
      </div>
      }

      <div>
        <button onClick={signOutUser}>Logout</button>
      </div>
    </>
  )
}

export default App