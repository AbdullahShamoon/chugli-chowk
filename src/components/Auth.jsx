import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase-config.jsx'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Auth = (props) => {

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      cookies.set('auth-token', result.user.refreshToken)
      props.setIsAuth(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center text-2xl font-bold h-[50vh]">

        <button onClick={googleSignIn} className="justify-center items-center px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-400 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
          <span>Sign In with Google</span>
        </button>

      </div>
    </>
  )
}

export default Auth