import React from 'react'
import ProfileBox from '../components/ProfileBox'
import Calendar from '../components/Calendar'
import Favorite from '../components/Favorite'

export default function Dashboard() {
  return (
    <div className='mt-24 max-sm:mt-1'>
      <div className='flex gap-4 max-lg:flex-col max-sm:flex-wrap'>
      <ProfileBox/>
      <Calendar/>
      </div>
      <div className='flex flex-col gap-5 mt-20'>
   
      <Favorite/>
      </div>
    </div>
  )
}
