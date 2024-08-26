import React from 'react'

const Comment = ({comment,name,date,userId}) => {
  return (
    <div className="border-b border-black pb-2 mb-2">
          <div className='flex justify-between items-center '><p className="break-all  text-gray-600 text-sm ">Name: <span className='font-semibold'>{name}</span></p> <p className="text-sm">{ date}</p></div>
          <p className="break-all text-gray-700">{ comment}</p>
  </div>
  )
}

export default Comment