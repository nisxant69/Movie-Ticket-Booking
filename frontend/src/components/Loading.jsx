import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-[80vh]'>
        <div className='animate-spin rounded-full h-24 w-24 border-2'></div>
    </div>
  )
}

export default Loading