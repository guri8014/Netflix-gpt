import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMesage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            displayName: name.current.value, photoURL: "https://ih1.redbubble.net/image.3036212104.2350/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg"
          }).then(() => {
            // Profile updated!
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
            navigate('/browse')
            // ...
          }).catch((error) => {
            // An error occurred
            setErrorMesage(error.message)
          });

          console.log(user);
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
          console.log(user)
          navigate('/browse')
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
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/a449fabb-05e4-4c8a-b062-b0bec7d03085/IN-en-20240115-trifectadaily-perspective_alpha_website_medium.jpg" alt="" />
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
