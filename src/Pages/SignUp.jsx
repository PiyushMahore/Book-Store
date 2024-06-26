import React, { useState, useEffect } from 'react'
import { useFirebase } from '../Context/FirebaseContext'
import {  Navigate, NavLink } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

function SignUp() {
    const Firebase = useFirebase()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirectToHome, setRedirectToHome] = useState(false)
    const [passwordtype, setPasswordType] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        Firebase.SignUp(email, password)
    }
    useEffect(() => {
      if (Firebase.isLogedIn) {
          setRedirectToHome(true)
      }
  }, [Firebase])

  const passwordType = () => {
    setPasswordType(!passwordtype)
  }

    if (redirectToHome) {
      return <Navigate to='/' />
    }

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
          <div className="flex w-full justify-end">
            <NavLink to='/login'>
              <button className="flex w-fit rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-1">Login</button>
            </NavLink>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2 flex justify-center items-center">
                <input
                  id="password"
                  name="password"
                  type={passwordtype ? "password" : "text"}
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className='absolute flex -mr-[19rem] sm:-mr-[22rem] cursor-pointer'>
                  {passwordtype ? <FaEye onClick={passwordType} /> : <FaEyeSlash onClick={passwordType} />}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
              <button
                onClick={Firebase.SignWithGoogle}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-1"
              >
                <FcGoogle className='mr-2' size={20} /> Sign in With Google
              </button>
              <button
                onClick={Firebase.GitSignIn}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-1"
              >
                <FaGithub className='mr-2' size={20} /> Sign in With GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
