import React from 'react'
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useIsAuthenticated } from '../authentication/Authentication';

export default function Footer() {
    const isAuthenticated = useIsAuthenticated();
    return (
        <footer className=''>
            <div className='flex justify-between my-10 mb-20 mx-10 flex-col max-md:mx-3 max-md:items-center '>
                <Link className='no-hover' to="/"><img src="/img/logo.png" alt="" className='!w-52' /></Link>
                <div className='flex justify-between gap-2 w-full'>
                    <div className='flex flex-col gap-5'>
                        <Link to="patient-privacy-policy">Patient Privacy Policy</Link>
                        <Link to="doctor-privacy-policy">Docotor Privacy Policy</Link>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <Link to="about-us">About Us</Link>
                        <Link to="contact-us">Contact Us</Link>
                        <Link to="privacy-policy">Privacy Policy</Link>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <Link to="/">Find Doctor</Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" >My Profile</Link>
                                <Link to="/Dashboard" >Dashboard</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="sign-up">Sign up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex justify-between mx-10'>
                <span>© 2024 DocLocat</span>
                <div className='flex items-end gap-3 text-2xl'>
                    <Link to="https://www.instagram.com/hamtech.solutions/" target='blanck'><FaInstagram /></Link>
                    <Link to="https://twitter.com/hamzaessalhi_" target='blanck'><FaLinkedin /></Link>
                    <Link to="https://twitter.com/hamzaessalhi_" target='blanck'><FaXTwitter /></Link>
                    <Link to="https://github.com/hamza-essalhi" target='blanck'><FaGithub /></Link>
                </div>
            </div>
        </footer>
    )
}
