import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// import { useLoginMutation } from '../redux/slices/userApiSlice'
// import { setCredentials } from '../redux/slices/authSlice'

import { toast } from 'react-toastify'
import { Loading } from '../components/app/loading'

export const Login = () => {

  // const navigate = useNavigate()
  // const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const [ login, { isLoading } ] = useLoginMutation()

  // const {userInfo} = useSelector(state => state.auth)

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  // if there is a redirect query param, use that, otherwise use '/'
  const redirect = searchParams.get('redirect') || '/';


  // redirect if user is already logged in
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect)
  //   }
  // }, [navigate, redirect, userInfo])
  

  const loginSubmitHandler = async (e) => {
    e.preventDefault()
    try {

      // here we call the login mutation and pass in the email and password, 
      // unwrap the promise and set the credentials in the auth slice
      // const res = await login({email, password}).unwrap();

      // set the credentials in the auth slice and redirect to the redirect path
      // dispatch(setCredentials({...res,}));
      // navigate(redirect)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <div className="mx-auto pt-20">
    <div className=" flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">

      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div className='text-center'>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
                Or{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="font-medium text-pink-600 hover:text-orange-700">
                  register for a new account
                </Link>
              </p>
        </div>

        <div className="mt-8">
          <div>
            <div>
              <p className="text-sm font-medium text-gray-700">Sign in with</p>

              <div className="mt-1">
                <div>
                  <a
                    href="/auth"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000" stroke="#000000">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.096"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path>
                            <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path>
                            <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path>
                            <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path>
                        </g>
                    </svg>
                    </svg>
                    <span className="ml-2">Google</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-pink-600 focus:outline-none focus:ring-pink-600 sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-pink-600 focus:outline-none focus:ring-pink-600 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    defaultChecked={true}
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-orange-700 focus:ring-pink-600"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                {/* <div className="text-sm">
                  <a href="#" className="font-medium text-orange-700 hover:text-pink-600">
                    Forgot your password?
                  </a>
                </div> */}
              </div>

              <div>
                <button
                  onClick={loginSubmitHandler}
                  // disabled={isLoading}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </div>

            {/* { isLoading && <Loading /> } */}

          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
