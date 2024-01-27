import React, { useEffect } from 'react';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let user = useSelector(store=> store.user)

    const handleSignOut = () => {
        signOut(auth).then(() => {}).catch((error) => {
            navigate('/error')
          });
        //   user = false;
    }

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          navigate("/browse")
        } else {
          dispatch(removeUser());
          navigate("/")
        }
      });

      // unsubscribe when component unmount
      return ()=> unsubscribe();
    },[])


    return (
        <div className='flex justify-between absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10'>
            <img className='w-44' src={LOGO} alt="Logo" />
          {user && <div className='flex items-center'>
           <img className='object-cover w-8' src={user?.photoURL} alt="" />
            <button onClick={handleSignOut} className='ml-2 font-bold text-white'>(Sign Out)</button>
            </div>}
        </div>
    )
}

export default Header
