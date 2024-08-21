import React from 'react'
import Navigation from '../../components/Nav'
import Posts from '../../components/Posts'

const Profile = () => {
  return (
      <div className='h-screen'>
          <Navigation marginB={"mb-8"} />
          <div className='text-center mb-4  font-bold text-2xl '><p>Your Posts</p></div>
          <Posts/>
    </div>
  )
}

export default Profile