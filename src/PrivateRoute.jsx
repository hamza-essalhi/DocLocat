
import { Outlet, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { useIsAuthenticated } from './authentication/Authentication';
import PhoneSideNav from './components/doctorPage/PhoneSideNav';
import DashboardNav from './components/doctorPage/DashboardNav';
import SideNav from './components/doctorPage/SideNav';

export default function PrivateRoute() {
    const isAuthenticated = useIsAuthenticated(); // Replace this with your actual selector

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
    if (!isAuthenticated) {
        // If not authenticated, redirect to login page or any other page
        return <Navigate to="/login" replace />;
        // You can also return a 404 page if needed:
        // return <NotFoundPage />;
    }
    

    return (
        <>
           {
            isAuthenticated  && <div className='dashboard'> 
            {openSideNav && <PhoneSideNav openSideNav={openSideNav} handellOpenSideNav={handellOpenSideNav} />}
            <SideNav />
            <main className={'flex flex-col gap-1 ml-44 max-sm:ml-0 '}>
                <DashboardNav handellOpenSideNav={handellOpenSideNav} openSideNav={openSideNav}/>
                <div className='flex flex-col gap-1  mx-5 max-sm:my-32'>
                    <Outlet />
                </div>
            </main>
            </div>
           }
        </>
    )
}
