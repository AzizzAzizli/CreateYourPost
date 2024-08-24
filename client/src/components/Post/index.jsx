import React from 'react'
import viewIcon from '../../assets/icons/viewIcon.svg'
import { useNavigate } from 'react-router-dom';
import { updateViews } from '../../services';
import { truncateTitle } from '../../utils';

const PostCard = ({ title, description, views, _id, userId }) => {
const navigate = useNavigate();
  
  async function postClick() {
    const resData = await updateViews(_id);
    if (resData.status === 200) {
      navigate(`/user/posts/postId=${_id}`);
      return;
    } else {
      toast.error(resData.message);
      return;
    }
  }
  
  return (
      <div   className='border-2 border-black w-full sm:w-1/2  sm:-mx-4 p-3 cursor-pointer '>
          <p className='font-bold text-2xl  ' >{truncateTitle(title,15)}</p>
          <p className='font-semibold text-xl max-h-16 overflow-y-auto'>{truncateTitle(description,30)}</p>
      <div className='flex justify-end gap-4'><div className='flex gap-2 items-center'>{views }<img className='h-6' src={viewIcon} alt="" /></div> <p onClick={postClick} className='hover:text-blue-700'>Read more</p></div>
    </div>
  )
}

export default PostCard