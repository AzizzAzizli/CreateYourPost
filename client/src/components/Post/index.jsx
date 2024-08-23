import React from 'react'
import viewIcon from '../../assets/icons/viewIcon.svg'
import { useNavigate } from 'react-router-dom';
import { updateViews } from '../../services';

const PostCard = ({ title, description, views, _id, userId }) => {
const navigate = useNavigate();
  
  async function postClick() {
    const resData = await updateViews(_id);
    console.log(resData);
    if (resData.status === 200) {
      navigate(`/user/posts/postId=${_id}`);
      return;
    } else {
      toast.error(resData.message);
      return;
    }
  }
  
  return (
      <div onClick={postClick}  className='border-2 border-black w-full sm:w-1/2  sm:-mx-4 p-3 cursor-pointer '>
          <p className='font-bold text-2xl ' >{title}</p>
          <p className='font-semibold text-xl'>{description}</p>
      <div className='flex justify-end gap-4'><div className='flex gap-2 items-center'>{views }<img className='h-6' src={viewIcon} alt="" /></div> <p className='hover:text-blue-700'>Read more</p></div>
    </div>
  )
}

export default PostCard