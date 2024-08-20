import React from 'react'
import Navigation from '../../components/Nav'
import Posts from '../../components/Posts'

const Home = () => {
  return (
      <div className='h-screen'>
          <Navigation />
          <Posts/>
      </div>
  )
}

export default Home