import React from 'react';
import {signOut} from 'firebase/auth';
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    let user = useSelector(store=> store.user)

    const handleSignOut = () => {
        signOut(auth).then(() => {
           navigate('/')
          }).catch((error) => {
            navigate('/error')
          });
        //   user = false;
    }
    return (
        <div className='flex justify-between absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10'>
            <img className='w-44' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="Logo" />
          {user && <div className='flex items-center'>
           <img className='object-cover w-8' src={user?.photoURL} alt="" />
            <button onClick={handleSignOut} className='ml-2 font-bold text-white'>(Sign Out)</button>
            </div>}
        </div>
    )
}

export default Header
