import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className=' w-screen aspect-video pt-[17%] px-24 absolute text-white bg-gradient-to-r from-black max-sm:px-4'>
      <h1 className='text-6xl font-bold max-sm:text-sm'>{title}</h1>
      <p className='py-6 w-1/3 max-sm:w-3/6 max-sm:overflow-y-scroll max-sm:text-xs max-sm:h-14 max-sm:py-2'>{overview}</p>
      <div>
        <button
        className='bg-white mx-2 p-2 px-8 text-black font-normal text-base rounded-lg hover:bg-opacity-80 max-sm:text-[10px] max-sm:px-4 max-sm:py-0 max-sm:rounded-sm mt-2'>
          Play
          </button>
        <button className='bg-gray-400 text-white p-2 px-8 font-normal text-base bg-opacity-50 rounded-lg max-sm:text-[10px] max-sm:px-2 max-sm:py-0 max-sm:rounded-sm'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
