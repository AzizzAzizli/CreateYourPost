import React from 'react'
import viewIcon from '../../assets/icons/viewIcon.svg'

const PostCard = ({title,description,views,_id,userId}) => {
  return (
      <div className='border-2 border-black w-full sm:w-1/2  sm:-mx-4 p-3 cursor-pointer '>
          <p className='font-bold text-2xl ' >{title}</p>
          <p className='font-semibold text-xl'>{description}</p>
      <div className='flex justify-end gap-4'><div className='flex gap-2 items-center'>{views }<img className='h-6' src={viewIcon} alt="" /></div> <p className='hover:text-blue-700'>Read more</p></div>
    </div>
  )
}

export default PostCard