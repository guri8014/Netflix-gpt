import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title, movies}) => {
    if(!movies) return
  return (
    <div>
            <h1 className='text-3xl  text-white max-sm:text-sm'>{title}</h1>
        <div className='flex overflow-x-scroll'>
            <div className='flex'>
                {movies.map(movie=> <MovieCard key={movie.id} posterPath={movie.poster_path} />)}
            </div>
        </div>
    </div>
  )
}

export default MovieList
