import React, { useEffect, useState } from 'react'
import Navigation from '../../components/Nav'
import Posts from '../../components/Posts'
import { getUserPosts } from '../../services'
import { toast } from 'react-toastify'

const Profile = () => {
  const [posts, setPosts] = useState([])
  const [userId, setUserId] = useState(JSON?.parse(localStorage?.getItem('user'))?.userId)
  
  async function getPosts() {

    const resData = await getUserPosts(userId)
    if (resData.status === 200) {
      setPosts(resData.data)
      return
    } else {
      toast.error(resData.message)
      return
    }
  }
  console.log(posts);
  
  
  useEffect(() => {
    getPosts()
  },[])

  return (
      <div className='h-screen'>
          <Navigation marginB={"mb-8"} />
          <div className='text-center mb-4  font-bold text-2xl '><p>Your Posts</p></div>
          <Posts data={posts}/>
    </div>
  )
}

export default Profile