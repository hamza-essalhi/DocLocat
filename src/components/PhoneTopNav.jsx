import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';


// Imported Icons

import { FaX } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { useDispatch } from 'react-redux';


import { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import { logout } from '../STORE/AUTH/authActions';
import { useIsAuthenticated, useUser } from '../authentication/Authentication';

export default function PhoneTopNav({ openSideNav, handellOpenSideNav }) {

    const [beForClose, setBeforClose] = useState(false)
    const dispatch = useDispatch();
    const sideNavRef = useRef(null);
    const isAuthenticated = useIsAuthenticated();
    const user = useUser()
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

    const handleNavLinkClick = () => {
        setBeforClose(true);
        if (openSideNav) {
          setTimeout(() => {
            handellOpenSideNav(false);
          }, animationDuration);
        }
      };


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
                <nav className={`phone-side-nav side-nav-active flex flex-col  p-2`} ref={sideNavRef}>
                    <div className='flex w-full justify-end '>
                        <FaX className=' text-white m-3 text-xl' onClick={handleOpenSideNav} />
                    </div>
                    <div className='mt-5 flex justify-between items-center  p-5'>

                        <Link to="/" onClick={handleNavLinkClick}><img className='' src="/img/logo.png" alt=""  /></Link>

                    </div>
                    {isAuthenticated &&
                        <div className='flex gap-3 items-center user-box'>
                            <img
                                className={'user rounded-full'}
                                src={user.profilePicture || "/img/doctor.png"}
                                alt=""
                            />
                            <span className=' text-white max-sm:text-sm'>{user.firstName} {user.lastName}</span>
                        </div>}

                    <NavLink
                        className={`side-nav-icon `}
                        to={'/'}
                        onClick={handleNavLinkClick}
                    >
                        <span className='max-sm:text-sm'>Home</span>
                    </NavLink>
                    <NavLink
                        className={`side-nav-icon `}
                        to={'/about-us'}
                        onClick={handleNavLinkClick}
                    >

                        <span className='max-sm:text-sm'>About Us</span>
                    </NavLink>
                    <NavLink
                        className={`side-nav-icon `}
                        to={'/contact-us'}
                        onClick={handleNavLinkClick}
                    >
                        <span className='max-sm:text-sm'>Contact Us</span>
                    </NavLink>

                    {isAuthenticated ?
                        <>
                            <NavLink
                                className={`side-nav-icon `}
                                to={'/profile'}
                                onClick={handleNavLinkClick}
                            >
                                <span className='max-sm:text-sm'>My Profile</span>
                            </NavLink>
                            <NavLink
                                className={`side-nav-icon `}
                                to={'/Dashboard'}
                                onClick={handleNavLinkClick}
                            >
                                <span className='max-sm:text-sm'>Dashboard</span>
                            </NavLink>
                            <div className="links flex flex-col gap-5 justify-end h-full mt-10 mb-20">
                                <button className='flex items-center gap-4 p-4 mt-10 text-white' onClick={handleLogout}>
                                    <IoLogOut className='icon' />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </>
                        : <>  <NavLink
                            className={`side-nav-icon `}
                            to={'/Login'}
                            onClick={handleNavLinkClick}
                        >
                            <span className='max-sm:text-sm'>Login</span>
                        </NavLink>
                            <NavLink
                                className={`side-nav-icon `}
                                to={'/sign-up'}
                                onClick={handleNavLinkClick}

                            >
                                <span className='max-sm:text-sm'>Sign up</span>
                            </NavLink></>}




                </nav>
            </motion.div>



        </motion.div>

    );
}