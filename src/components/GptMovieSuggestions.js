import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
  const {movieResults, movieNames} = useSelector((store)=> store.gpt);
  if(!movieNames) return null;
  console.log(movieNames)
  console.log(movieResults)
  return (
    <div className='bg-black text-white p-4 m-4 bg-opacity-50'>
      <div>
        {movieNames.map((movieName,index)=> <MovieList title={movieName} movies={movieResults[index]} /> )}
      </div>
    </div>
  )
}

export default GptMovieSuggestions
