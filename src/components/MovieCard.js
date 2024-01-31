import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='w-48 m-2 max-sm:w-20 max-sm:mx-1 max-sm:mt-0'>
      <img className='rounded-lg max-sm:w-20 max-sm:rounded-sm' src={IMG_CDN_URL + posterPath} alt="Movie" />
    </div>
  )
}

export default MovieCard
