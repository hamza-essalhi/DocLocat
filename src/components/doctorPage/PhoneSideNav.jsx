import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import {FaCalendarCheck, FaHeart, FaUser, FaX} from "react-icons/fa6"
import { IoLogOut } from "react-icons/io5";


import { useDispatch } from 'react-redux';


import { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import { logout } from '../../STORE/AUTH/authActions';

export default function PhoneSideNav({ openSideNav, handellOpenSideNav }) {
    const [beForClose, setBeforClose] = useState(false)
    const dispatch = useDispatch();
    const sideNavRef = useRef(null);
   
    /**
     * Handles the click event on a navigation link.
     * @param {string} to - The target URL for the navigation link.
     */

    const handleVisibilityClick = (ref, visibilitySetter, timeoutDuration) => {
        let timeoutId;

        return (event) => {
            clearTimeout(timeoutId);

            if (ref.current && !ref.current.contains(event.target)) {
                setBeforClose(true);
                // Wait for the specified timeout before setting visibility to false
                timeoutId = setTimeout(() => {
                    visibilitySetter(false);
                }, timeoutDuration);
            }
        };
    };
    const handleNavLinkClick = () => {
        setBeforClose(true);
        if (openSideNav) {
          setTimeout(() => {
            handellOpenSideNav(false);
          }, animationDuration);
        }
      };
    useEffect(() => {
        const timeoutDuration = 500; // Adjust this based on your timeout duration
        const handleClickOutsideSideNav = handleVisibilityClick(sideNavRef, handellOpenSideNav, timeoutDuration);

        document.addEventListener('mousedown', handleClickOutsideSideNav);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideSideNav);
        };
    }, [handellOpenSideNav]);

    const handleLogout = () => {
        dispatch(logout());
    };
    const animationDuration = 100




    const handleOpenSideNav = () => {
        setBeforClose(true);
       
        if (openSideNav) {
            setTimeout(() => {
                handellOpenSideNav(false);
            }, animationDuration);
            
        } else {
            handellOpenSideNav(true);
        }
    };

    return (

        <motion.div

            className="slide-container phone-slide-container"
            initial={{ x: -300, width: 0 }}
            animate={{ x: !beForClose ? 0 : -300, width: !beForClose ? "100%" : 0, transition: { ease: "easeIn" } }}
            exit={{ x: -300, width: 0, transition: { ease: "easeInOut", delay: animationDuration / 1000 } }}
        >

            <motion.div >
                <nav className={`phone-side-nav side-nav-active flex flex-col  p-4`} ref={sideNavRef}>
               <div className='flex w-full justify-end'>
               <FaX className=' text-white m-3 text-xl' onClick={handleOpenSideNav} />
               </div>
                <Link className='mt-10 ' to="/"><img src="/img/logo.png" alt="" onClick={handleNavLinkClick} /></Link>
                
                <div className="links flex flex-col  my-10">
                <Link className='flex items-center gap-4 p-4' to="/" onClick={handleNavLinkClick}>
                    <GoHomeFill />
                    <span>Home</span>
                </Link>
                <Link className='flex items-center gap-4 p-4' to="/dashboard" onClick={handleNavLinkClick}>
                <MdDashboard />
                    <span>Dashboard</span>
                </Link>
                <Link to="/profile" className='flex items-center gap-4 p-4' onClick={handleNavLinkClick} >
                    <FaUser />
                    <span>Profile</span>
                </Link>
                <Link to="/favorites" className='flex items-center gap-4 p-4' onClick={handleNavLinkClick}>
                    <FaHeart />
                    <span>Favorites</span>
                </Link>
                <Link to="/appointments" className='flex items-center gap-4 p-4'  onClick={handleNavLinkClick} >
                    <FaCalendarCheck />
                    <span>Appointments</span>
                </Link>
               
            </div>
            <div className="links flex flex-col gap-5 justify-end h-full mt-10 mb-20">
                <button className='flex items-center gap-4 p-4 mt-10' onClick={handleLogout}>
                    <IoLogOut  className='icon' />
                    <span>Logout</span>
                </button>
            </div>



                </nav>
            </motion.div>



        </motion.div>

    );
}