import React from 'react'
import { FaLink, FaPhoneAlt, FaUser } from 'react-icons/fa'
import { FaMapLocation } from 'react-icons/fa6'
import { IoMdMail } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useUser } from '../authentication/Authentication';


export default function ProfileBox() {
  const user = useUser()
  return (
    <div className='dashboard-element flex flex-col flex-1 items-center max-sm:!p-0'>
      <div className='flex justify-between items-center w-full mx-5 p-4'>
        <h1 className='flex gap-3 items-center text-3xl max-sm:!text-lg  my-5'><FaUser />My Profile</h1>
        <Link to="/profile"><FaLink className='icon' /></Link>
      </div>

      <img className='w-20 h-20 mt-16 rounded-full my-5' src={user.profilePicture || "/img/doctor.png"} alt="" />

      <div className='flex flex-col gap-4 my-5'>
        <span className='flex items-center gap-4 max-sm:text-sm'><FaUser />{user.firstName} {user.lastName}</span>
        <span className='flex items-center gap-4 max-sm:text-sm'><IoMdMail />{user.email}</span>
        <span className='flex items-center gap-4 max-sm:text-sm'><FaMapLocation />{user.address}</span>
        <span className='flex items-center gap-4 max-sm:text-sm'><FaPhoneAlt />{user.phone}</span>
      </div>
    </div>
  )
}
