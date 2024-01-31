import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let user = useSelector(store => store.user)
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView())
  }

  const handleSignOut = () => {
    signOut(auth).then(() => { }).catch((error) => {
      navigate('/error')
    });
    //   user = false;
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });

    // unsubscribe when component unmount
    return () => unsubscribe();
  }, [])


  return (
    <div
      className='flex justify-between absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10'>
      <img className='w-44 max-sm:w-14 object-contain max-sm:mr-10' src={LOGO} alt="Logo" />
      {user && <div className='flex items-center'>

        {showGptSearch && <select
          className='p-2 bg-gray-900 text-white m-2 max-sm:text-xs max-sm:m-0 max-sm:py-0 '
          onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>}

        <button onClick={handleGptSearchClick}
          className='py-2 px-4 m-2 bg-purple-800 text-white text-sm rounded-lg max-sm:px-0.5 max-sm:text-[0.4rem] max-sm:py-0 max-sm:rounded-sm'>
          {showGptSearch ? "Homepage" : "Gpt Search"}
        </button>

        <img className='object-cover w-8' src={user?.photoURL} alt="" />
        <button onClick={handleSignOut} className='ml-2 font-bold text-white max-sm:text-[0.7rem] max-sm:w-20 max-sm:ml-0'>(Sign Out)</button>
      </div>}
    </div>
  )
}

export default Header
