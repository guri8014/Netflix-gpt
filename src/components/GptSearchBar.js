import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { addGptMovieResult } from '../utils/gptSlice';
import searchMovieTMDB from '../hooks/useSearchMovieTMDB';

const GptSearchBar = () => {
  const langKey = useSelector(store=>store.config.lang);
  const searchText = useRef(null);
  const movieData = useSelector(store => store.movie) 
  console.log(movieData)
  const dispatch = useDispatch();

  searchMovieTMDB();

  const handleGptSearchClick = async()=>{
    console.log(searchText.current.value)
    // make an api call to GPT API and get movie results

    const gptQuery = 
    "Act as a Movie Recommendation system and suggest some movies for the query" + 
    searchText.current.value + 
    "only give me names of 5 movies, comma seperated like the example result given ahead, Example Result: Don, Dil, Raone, Sholay, Golmaal, Koi Mil Gya"; // it is because gpt is so dumb it didnot gives us a exact result
  
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    console.log(gptResults.choices[0]?.message?.content);

    // "Andaz Apna Apna, Hera Pheri, Welcome, Chupke Chupke, Queen"

    const gptMovies = gptResults.choices[0]?.message?.content.split(",");

    // ["Andaz Apna Apna", "Hera Pheri", "Welcome", "Chupke Chupke", "Queen"]

    // for each movie i will search TMDB API

    const promiseArray = gptMovies.map(movie=> searchMovieTMDB(movie)) // it will take some time to json.results to come up, it will not happen immidiately so it will gives us the Promise not the result
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray); // the tmdbResults resolve all the promises and get me a data

    console.log(tmdbResults)

    dispatch(addGptMovieResult({movieNames: gptMovies ,movieResults: tmdbResults}))
    
  }

  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='w-1/2 bg-black grid grid-cols-12 max-sm:mt-9 max-sm:w-full' onSubmit={(e)=> e.preventDefault()}>
        <input ref={searchText} type="text" className='p-4 m-4 col-span-9 max-sm:w-full max-sm:py-0 max-sm:text-lg'
         placeholder={lang[langKey].gptSearchPlaceHolder} 
         />
        <button className='py-2 px-4 col-span-3 m-4 bg-red-700 text-white rounder-lg max-sm:py-0 max-sm:text-xs'
        onClick={handleGptSearchClick}
        >{lang[langKey].Search} </button>
      </form>
    </div>
  )
}

export default GptSearchBar
