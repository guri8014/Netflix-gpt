import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[25%] px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='py-6 w-1/3'>{overview}</p>
      <div>
        <button className='bg-white mx-2 p-2 px-8 text-black font-normal text-base rounded-lg hover:bg-opacity-80'>Play</button>
        <button className='bg-gray-400 text-white p-2 px-8 font-normal text-base bg-opacity-50 rounded-lg'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
