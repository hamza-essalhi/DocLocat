import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopNavBar from './components/TopNavBar'


import Footer from './components/Footer'
import PhoneTopNav from './components/PhoneTopNav';

export default function RouteController() {
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
    )
}
