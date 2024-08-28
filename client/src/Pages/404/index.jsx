import React from 'react'
import Navigation from '../../components/Nav'

const Page404 = () => {
  return (
      <div className='h-screen'>
          <Navigation />
          <div className="flex  h-full w-full  justify-center">
              <div className='border-red-600 border-4 w-4/5 h-3/4 '>
                  <h1 className='text-7xl lg:text-9xl font-bold text-gray-600 text-center mt-10'>404</h1> 
              <h1 className='text-3xl lg:text-5xl font-bold text-gray-600 text-center mt-10'>Page not found</h1> 
                  
              </div>
          </div>
      </div>
  )
}

export default Page404