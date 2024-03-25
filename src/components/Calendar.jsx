import React from 'react'
import { FaCalendar } from 'react-icons/fa'
import CustomCalendar from './CustomCalendar'

export default function Calendar() {
  const date = new Date().toISOString().slice(0, 10);
  return (
    <div className='dashboard-element flex flex-col flex-1 items-center max-sm:!p-0'>
      <div className='flex justify-between items-center w-full mx-5 p-4'>
        <h1 className='flex gap-3 items-center'><FaCalendar/>Calendar</h1>
      </div>
      <div>
        <CustomCalendar initialDate={date}/>
      </div>
    </div>
  )
}
