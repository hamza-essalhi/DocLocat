import React from 'react'
import { FaLink, FaMapMarkerAlt } from 'react-icons/fa'
import {  FaKitMedical,   FaPhone, FaUserDoctor } from 'react-icons/fa6'
import { Link } from 'react-router-dom'


export default function Doctor({ doctor,color }) {
  return (
    <div className={` flex flex-col justify-center items-center doctor-box  flex-1 ${color} max-md:!min-w-full`}>
       <Link to={`/doctor/${doctor._id}`} className='flex justify-end w-full' >  <FaLink className='icon' /></Link>
      <img className=' rounded-full !w-32 !h-32' src={doctor.profilePicture || "/img/doctor.png"} alt="" />
      <div className={`m-3 flex flex-col justify-center items-center w-11/12 flex-1 col gap-3 max-md:gap-1`}>
        <span className='w-7/12 max-md:w-10/12 flex items-center gap-3 max-sm:text-sm'><FaUserDoctor/>Dr {doctor.firstName} {doctor.lastName}</span>
        <span className='w-7/12 max-md:w-10/12 flex items-center gap-3 max-sm:text-sm'><FaPhone/>{doctor.phone}</span>
        <span className='w-7/12 max-md:w-10/12 flex items-center gap-3 max-sm:text-sm'><FaMapMarkerAlt/>{doctor.address}</span>
        <span className='w-7/12 max-md:w-10/12 flex items-center gap-3 max-sm:text-sm'><FaKitMedical/>{doctor.category}</span>
        <Link className='my-5 max-sm:text-sm' to={`/doctor/${doctor._id}`}>See Profile</Link>
      </div>
    </div>
  )
}
