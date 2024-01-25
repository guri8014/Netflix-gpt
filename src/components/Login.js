import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div>
        <Header/>
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/a449fabb-05e4-4c8a-b062-b0bec7d03085/IN-en-20240115-trifectadaily-perspective_alpha_website_medium.jpg" alt="" />
      </div>
      <form className='absolute p-8 w-3/12 m-auto left-0 right-0 my-36 text-white rounded-lg bg-opacity-80 bg-black'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        
        {!isSignInForm && <input
         type="text" placeholder='Full Name' className='p-3 my-4 w-full bg-gray-700' 
         />}

        <input
         type="text" placeholder='Email Address' className='p-3 my-4 w-full bg-gray-700' 
         />

        <input
         type="password" placeholder='Password' className='p-3 my-4 w-full bg-gray-700'
         />

        <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
            {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now..."}
            </p>
      </form>
    </div>
  )
}

export default Login
