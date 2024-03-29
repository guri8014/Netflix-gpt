import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { BG_URL, USER_AVTAR } from '../utils/constants';
import { addUser } from '../utils/userSlice';
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMesage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);


  const handleButtonClick = () => {
    const message = checkValidateData(email.current.value, password.current.value);
    setErrorMesage(message)

    // if(message === null){
    // sign in sign up Logic
    // }

    // OR

    if (message) return;

    // sign in sign up Logic

    if (!isSignInForm) {
      // Sign Up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value, photoURL: USER_AVTAR,
          }).then(() => {
            // Profile updated!
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
            // ...
          }).catch((error) => {
            // An error occurred
            setErrorMesage(error.message)
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMesage(errorCode + "-" + errorMessage)
        });
    }

    else {
      // Sign In logic

      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMesage(errorCode + "-" + errorMessage)
        });
    }

  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src={BG_URL} alt="" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='absolute p-8 w-3/12 m-auto left-0 right-0 my-36 text-white rounded-lg bg-opacity-80 bg-black'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && <input
          ref={name} type="text" placeholder='Full Name' className='p-3 my-4 w-full bg-gray-700'
        />}

        <input
          ref={email} type="text" placeholder='Email Address' className='p-3 my-4 w-full bg-gray-700'
        />

        <input
          ref={password} type="password" placeholder='Password' className='p-3 my-4 w-full bg-gray-700'
        />
        <p className='text-red-600 font-bold text-lg py-2'>{errorMessage}</p>

        <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now..."}
        </p>
      </form>
    </div>
  )
}

export default Login
