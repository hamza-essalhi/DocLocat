import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { useIsAuthenticated } from './authentication/Authentication';
import PhoneTopNav from './components/PhoneTopNav';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';

export default function VerificationRoute() {
    // State for controlling the side navigation
    const isAuthenticated = useIsAuthenticated(); 
    // Function to toggle the side navigation
    const [openSideNav, setOpenSideNav] = useState(false);
    const handellOpenSideNav = () => {
        setOpenSideNav(!openSideNav);
      };

    useEffect(() => {
      if(openSideNav){
        document.body.style.overflow = 'hidden';
      }
      else{
        document.body.style.overflow = 'auto';
      }
    }, [openSideNav])

    // If not authenticated, redirect to login page or any other page
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
       
    }
    // Render the components
    return (
        <>
        {openSideNav && <PhoneTopNav openSideNav={openSideNav} handellOpenSideNav={handellOpenSideNav} />}
            <TopNavBar handellOpenSideNav={handellOpenSideNav} openSideNav={openSideNav} />
            <main className='flex flex-col gap-1'>
                <div className='flex flex-col gap-1 '>
                    <Outlet />
                </div>
            </main>
            <Footer/>
        </>
    );
}
