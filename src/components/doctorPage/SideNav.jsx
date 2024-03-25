import React from 'react'
import { Link } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import {FaCalendarCheck, FaHeart, FaUser} from "react-icons/fa6"
import { IoLogOut } from "react-icons/io5";
import { logout } from '../../STORE/AUTH/authActions';
import { useDispatch } from 'react-redux';

export default function SideNav() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
      };
    
    return (
        <div className='side-nav max-sm:hidden'>
            <Link className='mt-20' to="/"><img src="/img/logo.png" alt="" /></Link>
            <div className="links flex flex-col gap-5">
                <Link className='flex items-center gap-4' to="/">
                    <GoHomeFill />
                    <span>Home</span>
                </Link>
                <Link className='flex items-center gap-4' to="/dashboard">
                <MdDashboard />
                    <span>Dashboard</span>
                </Link>
                <Link to="/profile" className='flex items-center gap-4' >
                    <FaUser />
                    <span>Profile</span>
                </Link>
                <Link to="/favorites" className='flex items-center gap-4' >
                    <FaHeart />
                    <span>Favorites</span>
                </Link>
                <Link to="/appointments" className='flex items-center gap-4' >
                    <FaCalendarCheck />
                    <span>Appointments</span>
                </Link>
                
            </div>
            <div className="links flex flex-col gap-5 justify-end h-1/6 mt-10">
                <button className='flex items-center gap-4 mt-10' onClick={handleLogout}>
                    <IoLogOut  className='icon' />
                    <span>Logout</span>
                </button>
            </div>
            
        </div>
    )
}
