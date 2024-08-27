import React from 'react'
import { useNavigate } from 'react-router-dom'

const Comment = ({ comment, name, date, userId }) => {
  const navigate = useNavigate()
  return (
    <div className="border-b border-black pb-2 mb-2">
          <div className='flex justify-between items-center '><p className="break-all  text-gray-600 text-sm ">Name: <span onClick={()=>navigate(`/user/profile/userId=${userId}`)} className='font-semibold'>{name}</span></p> <p className="text-sm">{ date}</p></div>
          <p className="break-all text-gray-700">{ comment}</p>
  </div>
  )
}

export default Comment