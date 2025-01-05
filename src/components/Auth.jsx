import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase-config.jsx'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Auth = (props) => {

    const googleSignIn = async() => {
      try{
        const result = await signInWithPopup(auth, provider)
        cookies.set('auth-token', result.user.refreshToken)
        props.setIsAuth(true)
      }catch(err){
        console.log(err)
      }
    }

  return (
    <div>
        <h2>Sign In with Google</h2>
        <button onClick={googleSignIn}>Sign In</button>
    </div>
  )
}

export default Auth