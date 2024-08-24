import React, { useEffect, useState } from 'react'
import Navigation from '../../components/Nav'
import Posts from '../../components/Posts'
import { getUserPosts } from '../../services'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([])
  const [userId, setUserId] = useState("")
  
  async function getPosts(userId) {

    const resData = await getUserPosts(userId)
    if (resData.status === 200) {
      setPosts(resData)
      return
    } else {
      toast.error(resData.message)
      return
    }
    }
    
    
  useEffect(() => {
    const linkId = id.split("=")[1];
    setUserId(linkId);
  }, [id]);

  useEffect(() => {
    if (userId) {
      getPosts(userId);
    }
  }, [userId]);
  
  
//   useEffect(() => {
//     getPosts()
//   },[])

  return (
      <div className='h-screen'>
          <Navigation  />
          {/* <div className='text-center mb-4  font-bold text-2xl '><p>Your Posts</p></div> */}
          <Posts isProfile data={posts?.data} name={posts?.user } />
    </div>
  )
}

export default UserProfile